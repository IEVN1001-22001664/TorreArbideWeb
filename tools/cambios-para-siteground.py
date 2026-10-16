"""Lista los archivos de la carpeta "sitio" que cambiaron desde la última subida a SiteGround
y arma un ZIP SOLO con esos archivos (con su estructura de carpetas), listo para extraer en public_html.

Uso (desde cualquier carpeta del repositorio):
    python tools/cambios-para-siteground.py            # compara contra la etiqueta git "siteground"
    python tools/cambios-para-siteground.py abc1234    # compara contra otro commit

Después de subir los archivos a SiteGround, marca el punto actual como "ya subido":
    git tag -f siteground HEAD

La etiqueta "siteground" es local (no se sube con git push).
"""
import os
import subprocess
import sys
import zipfile

sys.stdout.reconfigure(encoding="utf-8")

REPO = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True).stdout.strip()
BASE = sys.argv[1] if len(sys.argv) > 1 else "siteground"
OUT_DIR = os.path.join(os.path.dirname(REPO), "subir-a-siteground")
OUT_ZIP = os.path.join(OUT_DIR, "cambios.zip")
# archivos que existen en el repositorio pero NO deben ir al servidor
IGNORAR = {"vercel.json", "desktop.ini", ".BridgeSort", "Thumbs.db", ".DS_Store", "assets/mapa-torre-arbideNUEVO.html"}


def git(*args):
    return subprocess.run(["git", "-C", REPO, "-c", "core.quotepath=off", *args], capture_output=True, text=True, check=True).stdout


try:
    git("rev-parse", "--verify", BASE + "^{commit}")
except subprocess.CalledProcessError:
    sys.exit(f'No existe "{BASE}". Crea la etiqueta con:  git tag -f siteground <commit-que-ya-esta-en-SiteGround>')

cambios = []  # (estado, ruta relativa a sitio/)
for linea in git("diff", "--name-status", "--no-renames", BASE, "HEAD", "--", "sitio").splitlines():
    estado, ruta = linea.split("\t", 1)
    rel = ruta[len("sitio/"):]
    if os.path.basename(rel) in IGNORAR or rel in IGNORAR:
        continue
    cambios.append((estado, rel))

nuevos = sorted(r for e, r in cambios if e == "A")
editados = sorted(r for e, r in cambios if e == "M")
borrados = sorted(r for e, r in cambios if e == "D")

print(f"Comparando contra: {BASE} ({git('rev-parse', '--short', BASE).strip()})  ->  HEAD ({git('rev-parse', '--short', 'HEAD').strip()})\n")
for titulo, lista in (("NUEVOS (subir)", nuevos), ("MODIFICADOS (reemplazar)", editados), ("ELIMINADOS (borrar del servidor)", borrados)):
    print(f"{titulo}: {len(lista)}")
    for r in lista:
        print("   ", r)
    print()

subir = nuevos + editados
if subir:
    os.makedirs(OUT_DIR, exist_ok=True)
    with zipfile.ZipFile(OUT_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        for rel in subir:
            z.write(os.path.join(REPO, "sitio", rel), rel)
    print(f"ZIP con {len(subir)} archivo(s): {OUT_ZIP}  ({os.path.getsize(OUT_ZIP) / 1048576:.1f} MB)")
    print("Extráelo dentro de public_html (acepta sobrescribir).")
else:
    print("No hay archivos para subir.")
