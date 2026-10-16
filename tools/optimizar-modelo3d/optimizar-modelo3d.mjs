// Optimiza un .glb exportado de Blender para el visor 3D del sitio.
//
//   node optimizar-modelo3d.mjs <entrada.glb> <salida-escritorio.glb> <salida-lite.glb>
//
// Genera DOS archivos:
//   · escritorio: misma geometría, sin pérdida visible (une mallas por material,
//     elimina duplicados, texturas máx. 1024 px, compresión Meshopt alta).
//   · lite (móvil): ~50 % de los triángulos (sin deformar paredes) y texturas de 512 px.
//
// Respeta los nombres de nodo del modelo (NIVEL01, cent_201, CASETA…) y conserva
// los "Empties" que el visor usa como puntos de enfoque.
import { NodeIO, Primitive } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, weld, join, prune, textureCompress, meshopt, reorder } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const [, , input, outDesktop, outLite] = process.argv;
if (!input || !outDesktop || !outLite) {
  console.error('Uso: node optimizar-modelo3d.mjs <entrada.glb> <salida-escritorio.glb> <salida-lite.glb>');
  process.exit(1);
}

// Ajustes de la versión lite. Si algún piso se ve deforme en el celular, sube RATIO (0.25 → 0.4).
const LITE = {
  ratio: parseFloat(process.env.LITE_RATIO || '0.3'),
  error: parseFloat(process.env.LITE_ERROR || '0.01'),
  texture: parseInt(process.env.LITE_TEXTURE || '512', 10),
  flags: (process.env.LITE_FLAGS ?? 'LockBorder,Prune').split(',').filter(Boolean), // LockBorder, Prune, Sparse...
};
const DESKTOP = { texture: 1024 };

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });

function readAttr(acc) {
  const n = acc.getCount();
  const size = acc.getElementSize();
  const out = new Float32Array(n * size);
  const tmp = [];
  for (let i = 0; i < n; i++) {
    acc.getElement(i, tmp);
    for (let k = 0; k < size; k++) out[i * size + k] = tmp[k];
  }
  return out;
}

// prune/join pueden eliminar los Empties: se guardan y se vuelven a crear.
function saveEmpties(doc) {
  return doc.getRoot().listNodes()
    .filter((n) => !n.getMesh() && n.listChildren().length === 0)
    .map((n) => ({ name: n.getName(), t: n.getWorldTranslation(), r: n.getWorldRotation(), s: n.getWorldScale() }));
}
function restoreEmpties(doc, saved) {
  const root = doc.getRoot();
  const have = new Set(root.listNodes().map((n) => n.getName()));
  const scene = root.listScenes()[0];
  for (const e of saved) {
    if (have.has(e.name)) continue;
    scene.addChild(doc.createNode(e.name).setTranslation(e.t).setRotation(e.r).setScale(e.s));
  }
}

function simplifyAll(doc, ratio, error, flags) {
  let before = 0, after = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of [...mesh.listPrimitives()]) {
      if (prim.getMode() !== Primitive.Mode.TRIANGLES) continue;
      const idxAcc = prim.getIndices();
      const posAcc = prim.getAttribute('POSITION');
      if (!idxAcc || !posAcc) continue;
      const arr = idxAcc.getArray();
      const indices = arr instanceof Uint32Array ? arr : new Uint32Array(arr);
      before += indices.length / 3;
      if (indices.length < 60) { after += indices.length / 3; continue; }
      const target = Math.min(indices.length, Math.max(Math.floor((indices.length * ratio) / 3) * 3, 12));

      // Normales y UV cuentan en el cálculo: evita romper las caras con costuras de textura.
      const nv = posAcc.getCount();
      const normAcc = prim.getAttribute('NORMAL');
      const uvAcc = prim.getAttribute('TEXCOORD_0');
      const parts = [], weights = [];
      if (normAcc) { parts.push(readAttr(normAcc)); weights.push(0.5, 0.5, 0.5); }
      if (uvAcc) { parts.push(readAttr(uvAcc)); weights.push(0.5, 0.5); }
      const stride = weights.length;
      const attrs = new Float32Array(nv * stride);
      for (let v = 0; v < nv; v++) {
        let o = 0;
        for (const p of parts) {
          const sz = p.length / nv;
          for (let k = 0; k < sz; k++) attrs[v * stride + o++] = p[v * sz + k];
        }
      }
      const [result] = MeshoptSimplifier.simplifyWithAttributes(
        indices, readAttr(posAcc), 3, attrs, stride, weights, null, target, error, flags
      );
      after += result.length / 3;
      if (result.length < 3) { mesh.removePrimitive(prim); prim.dispose(); continue; }
      prim.setIndices(doc.createAccessor().setArray(result).setType('SCALAR').setBuffer(idxAcc.getBuffer()));
    }
  }
  console.log(`  triángulos: ${Math.round(before)} -> ${Math.round(after)}`);
}

async function build(label, out, { lite }) {
  console.log(`\n== ${label} ==`);
  const doc = await io.read(input);
  const empties = saveEmpties(doc);
  await doc.transform(dedup(), weld());
  if (lite) simplifyAll(doc, LITE.ratio, LITE.error, LITE.flags);
  await doc.transform(
    join({ keepMeshes: true }),
    prune({ keepLeaves: true }),
    textureCompress({ encoder: sharp, resize: lite ? [LITE.texture, LITE.texture] : [DESKTOP.texture, DESKTOP.texture] }),
    reorder({ encoder: MeshoptEncoder }),
    meshopt({ encoder: MeshoptEncoder, level: lite ? 'medium' : 'high' })
  );
  restoreEmpties(doc, empties);
  await io.write(out, doc);
  console.log('  escrito:', out);
}

if (!process.env.SKIP_DESKTOP) await build('Escritorio', outDesktop, { lite: false });
await build('Lite (móvil)', outLite, { lite: true });
