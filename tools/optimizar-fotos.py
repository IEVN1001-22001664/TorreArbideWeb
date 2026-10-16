#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Optimizador de fotos - Torre Arbide

Redimensiona y comprime fotos para web usando el mismo estandar que ya
se usa en todo el sitio (hero, bienvenida, tarjetas de departamentos, fichas):

  - Maximo 1600px en el lado mas largo
  - JPG/JPEG -> calidad 82
  - PNG/WEBP con transparencia -> se mantienen con transparencia (no se
    convierten a JPG, para no perder el fondo transparente)
  - Corrige la rotacion de fotos de camara/celular (EXIF) y de paso
    limpia metadatos (ubicacion GPS, modelo de camara, etc.)

Sobrescribe los archivos originales en su lugar. Recorre subcarpetas.

USO
---
Con Python instalado, desde una terminal (cmd o PowerShell):

    python optimizar-fotos.py "C:\\ruta\\a\\la\\carpeta\\con\\fotos"

Si no le das una ruta, procesa la carpeta donde esta guardado este
mismo script:

    python optimizar-fotos.py

Tambien puedes usar optimizar-fotos.bat: dale doble clic (procesa la
carpeta donde este el .bat) o arrastra una carpeta encima del .bat.
"""

import io
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    print("Falta la libreria Pillow. Instalala una vez con:")
    print("    pip install Pillow")
    sys.exit(1)

MAX_DIMENSION = 1600
JPEG_QUALITY = 82
WEBP_QUALITY = 85
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MIN_SIZE_KB = 80  # si ya pesa menos que esto, se deja igual (evita reprocesar cosas ya optimizadas)


def has_alpha(im):
    if im.mode == "P" and "transparency" in im.info:
        return True
    if im.mode in ("RGBA", "LA"):
        alpha = im.split()[-1]
        return alpha.getextrema()[0] < 255
    return False


def optimize_image(path):
    original_size = os.path.getsize(path)
    if original_size < MIN_SIZE_KB * 1024:
        return None  # ya es chica, se deja igual

    try:
        im = Image.open(path)
        im = ImageOps.exif_transpose(im)  # corrige rotacion y descarta EXIF (GPS, etc.)
    except Exception as e:
        print("  [ERROR] No se pudo abrir: {}".format(e))
        return None

    transparent = has_alpha(im)
    ext = os.path.splitext(path)[1].lower()

    w, h = im.size
    scale = MAX_DIMENSION / max(w, h)
    if scale < 1:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

    buffer = io.BytesIO()
    if transparent:
        if im.mode != "RGBA":
            im = im.convert("RGBA")
        if ext == ".webp":
            im.save(buffer, "WEBP", quality=WEBP_QUALITY)
        else:
            im.save(buffer, "PNG", optimize=True)
    else:
        if ext in (".jpg", ".jpeg"):
            if im.mode != "RGB":
                im = im.convert("RGB")
            im.save(buffer, "JPEG", quality=JPEG_QUALITY, optimize=True)
        elif ext == ".webp":
            if im.mode != "RGB":
                im = im.convert("RGB")
            im.save(buffer, "WEBP", quality=WEBP_QUALITY)
        else:  # .png sin transparencia real
            im.save(buffer, "PNG", optimize=True)

    new_size = buffer.tell()
    if new_size >= original_size:
        return None  # ya estaba bien optimizada, no vale la pena tocarla

    with open(path, "wb") as fh:
        fh.write(buffer.getvalue())

    return original_size, new_size


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__))
    target = os.path.abspath(target)

    if not os.path.isdir(target):
        print("La carpeta no existe: {}".format(target))
        sys.exit(1)

    print("Optimizando fotos en: {}\n".format(target))

    total_before = 0
    total_after = 0
    count = 0
    skipped = 0

    for root, _dirs, files in os.walk(target):
        for f in sorted(files):
            ext = os.path.splitext(f)[1].lower()
            if ext not in EXTENSIONS:
                continue
            path = os.path.join(root, f)
            result = optimize_image(path)
            rel = os.path.relpath(path, target)
            if result is None:
                skipped += 1
                continue
            before, after = result
            total_before += before
            total_after += after
            count += 1
            print("  {}: {:.0f}KB -> {:.0f}KB".format(rel, before / 1024, after / 1024))

    print("\n" + "-" * 50)
    if count == 0:
        print("No se optimizo ninguna imagen (ya estaban chicas o no se encontraron).")
    else:
        ahorro = (1 - total_after / total_before) * 100 if total_before else 0
        print("{} imagenes optimizadas, {} ya estaban chicas y se dejaron igual.".format(count, skipped))
        print(
            "Total: {:.2f}MB -> {:.2f}MB  ({:.0f}% menos)".format(
                total_before / 1024 / 1024, total_after / 1024 / 1024, ahorro
            )
        )


if __name__ == "__main__":
    main()
