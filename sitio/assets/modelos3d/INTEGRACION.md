# Torre Arbide — Kit de integración del prototipo 3D

Este kit contiene lo necesario para llevar el prototipo 3D (probado aquí en Claude)
a tu sitio real en Claude Code.

## Contenido

- `models/piso-2.glb` — modelo real de Nivel 2, con texturas (162 KB)
- `models/planta-baja.glb` — modelo real de Planta Baja, con texturas (99 KB)
- `prototipo-referencia.html` — la versión funcional completa (HTML autocontenido)
  que ya viste en el chat. Úsala como **referencia de la lógica**, no la subas
  tal cual a producción (tiene los modelos embebidos en base64, lo cual está bien
  para probar pero no es lo ideal para un sitio real — ver más abajo).

## Dos formas de integrarlo

### Opción A — Rápida (iframe)
Si solo quieres probarlo YA en una sección de tu sitio, sin refactorizar nada:
```html
<iframe src="/ruta/a/prototipo-referencia.html" style="width:100%; height:600px; border:none;"></iframe>
```
Sirve para validar que se vea bien en el contexto real de tu página, pero no es la
forma final recomendada (aísla el 3D del resto del sitio, no comparte estilos/tema).

### Opción B — Integración nativa (recomendada para producción)
Pide a Claude Code que:
1. Copie `models/piso-2.glb` y `models/planta-baja.glb` a la carpeta de assets
   estáticos del sitio (ej. `public/models/` o `assets/models/`) — **no los
   embeba en base64** dentro del código; cargarlos como archivos reales permite
   que el navegador los cachee y no infla el bundle de JS.
2. Cree un componente/sección (ej. `Building3D.jsx` o `<section id="torre-3d">`)
   que cargue Three.js + GLTFLoader y replique la lógica de `prototipo-referencia.html`,
   pero usando `loader.load('/models/piso-2.glb', ...)` en vez de `loader.parse(base64,...)`.

## Números clave a preservar (ya calibrados)

- Altura de piso (Nivel 2): **~3.80 unidades** — úsalo como estimado para el
  Nivel 1 aún no modelado, hasta que exportes ese piso real.
- El hueco entre Planta Baja y Nivel 2 se calculó como:
  `techo_planta_baja = piso_nivel2.y - altura_piso_estandar * 1`
- Alineación horizontal: ambos pisos se centran en el mismo eje X/Z usando el
  centro de su propio bounding box (`new THREE.Box3().setFromObject(...)`) —
  asume que la huella del edificio es consistente entre pisos.
- Escala de las zonas de click (Nivel 2): se calcula dinámicamente comparando
  el tamaño del plano SVG vectorizado contra el tamaño real del modelo cargado
  (no es un número fijo — se recalcula cada vez con `modelSize / hitboxSize`).

## Nota sobre el error "Failed to fetch" que resolvimos

Si al integrarlo en tu sitio real las texturas SÍ cargan sin problema (lo más
probable, ya que ese error era una restricción específica del sandbox donde
corre el artifact de Claude, no de tu navegador), **puedes quitar esta línea**:
```js
window.createImageBitmap = undefined;
```
Está en `prototipo-referencia.html` justo antes de cargar los modelos. Si tu
sitio en producción no tiene ese problema, dejarla no hace daño (solo fuerza
un método de carga de textura ligeramente menos eficiente), pero si quieres
el rendimiento óptimo, pruébalo sin ella primero.

## Prompt sugerido para pegarle a Claude Code

```
Tengo un prototipo funcional de un mapa 3D interactivo del edificio (Three.js,
carga modelos .glb, cámara orbital con mouse, click en departamentos abre panel
de info). Está en /torre-arbide-3d-kit/prototipo-referencia.html como referencia,
con los modelos reales en /torre-arbide-3d-kit/models/.

Quiero integrarlo como una sección del sitio. Por favor:
1. Copia los .glb a la carpeta de assets estáticos del proyecto.
2. Crea un componente para esta sección que replique la lógica de
   prototipo-referencia.html, pero cargando los modelos desde archivos
   estáticos (no base64), y que herede el sistema de estilos del sitio.
3. Mantén las variables clave del apilado de pisos (altura de piso, alineación
   por bounding box) tal como están en el archivo de referencia.
```
