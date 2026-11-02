# CLAUDE.md — Torre Arbide (sitio web)

Guía para continuar el proyecto sin reanalizar el código. **Responde siempre en español** (todo texto visible al usuario, incluidos avisos intermedios). Última actualización: 2026-11-02 (verificación de estado; HEAD previo `0e83c54`).

## 1. Qué es

Sitio web de **una sola página** (HTML/CSS/JS estático, sin framework ni build) para **Torre Arbide**, desarrollo residencial en León, Guanajuato (Tabasco 606, Bellavista, 37360 León de los Aldama). Comercializa **Du'an Bienes Raíces**; proyecto y construcción de **Constructora Simacon**. Dominio de producción: `https://www.torrearbide.com` (el apex redirige y funciona).

- Repositorio: `https://github.com/IEVN1001-22001664/TorreArbideWeb.git`, rama `main`, raíz local `C:\CLAUDECODE\TORREARBIDE.COM`.
- **El sitio real vive en `sitio/`.** La raíz del repo también contiene archivos antiguos de agosto (`index.html`, `css/`, `js/`, `assets/references`): son restos legados, **no editar ni desplegar**. Vercel debe tener Root Directory = `sitio` (no verificado desde aquí; el usuario revisa ahí y funciona).
- Otras carpetas: `identidad-visual/` (prompts para Claude Design + logos/fotos de referencia), `tools/` (scripts), `respaldo-modelos3d/` y `respaldo-originales/` (originales pesados, **en `.gitignore`**, nunca se suben).

## 2. Flujo de trabajo (reglas del usuario — obligatorias)

1. Se edita en local, se prueba en el navegador de vista previa, y **al terminar cada instrucción**: `git add .` → `git commit -m "<mensaje descriptivo en español>"` → `git push` (el usuario lo pidió explícitamente y de forma permanente). Añadir al commit la línea `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` como segundo `-m`.
2. Vercel despliega solo con el push (revisión del jefe). **SiteGround es la producción y se sube a mano** (File Manager, arrastrar/descomprimir en `public_html`). No se modifica nada directo en el servidor.
3. **Al final de cada respuesta, listar los archivos a sustituir en SiteGround**: ejecutar `python tools/cambios-para-siteground.py` (compara contra la etiqueta git local `siteground`, imprime nuevos/modificados/eliminados y arma `C:\CLAUDECODE\subir-a-siteground\cambios.zip` solo con esos archivos). Cuando el usuario avise "ya subí", mover la etiqueta: `git tag -f siteground HEAD`.
4. **Subir el `?v=YYYYMMDD` en `sitio/index.html`** (CSS, JS, iframe del visor) con cada cambio de CSS/JS/visor, porque el usuario despliega por git y hay cachés. Versión actual: `20261105`. Es un reemplazo global de la cadena (`sed -i 's/20261105/20261106/g' sitio/index.html`). Si se cambia un `.glb`, subir también `MODEL_VERSION` en `visor-3d.html`.
5. **No se manejan credenciales** (FTP/SiteGround/GitHub). No se sube a SiteGround automáticamente; se ofreció una GitHub Action por FTP (el usuario guardaría los secretos) y no se pidió.
6. Verificar en el navegador antes de dar algo por hecho; decir qué se probó y qué no. Datos de negocio (precios, m², claims) se toman del código/textos del usuario, **no se inventan**.

## 3. Comandos

```bash
# Vista previa local (definida en .claude/launch.json, nombre "torre-arbide", puerto 5173)
# usar la herramienta preview_start name="torre-arbide"  → http://localhost:5173
python -m http.server 5173 --directory C:\CLAUDECODE\TORREARBIDE.COM\sitio   # equivalente manual

# Validar sintaxis JS sin navegador
node -e "new Function(require('fs').readFileSync('sitio/js/script.js','utf8'))"

# Git (flujo habitual)
git add . && git commit -m "mensaje" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>" && git push

# Archivos pendientes de subir a SiteGround + ZIP
python tools/cambios-para-siteground.py          # contra la etiqueta "siteground"
python tools/cambios-para-siteground.py <commit>  # contra otro commit
git tag -f siteground HEAD                        # tras confirmar que se subió

# ¿Qué hay realmente publicado? (comparar versión y contenido)
curl -s https://www.torrearbide.com/ | grep -o 'css/style.css?v=[0-9]*'
# OJO: el working copy en Windows tiene CRLF y git guarda LF; para comparar contra un commit
# usar:  git show <commit>:sitio/<ruta> | sed 's/$/\r/' | md5sum

# Optimizar un .glb nuevo de Blender (genera escritorio + lite)
cd tools/optimizar-modelo3d && npm install
node optimizar-modelo3d.mjs <entrada.glb> <salida-escritorio.glb> <salida-lite.glb>
# variables opcionales para la versión lite: LITE_RATIO (0.3) LITE_ERROR (0.01) LITE_FLAGS (LockBorder,Prune) LITE_TEXTURE (512)
```

Notas de entorno (Windows + Git Bash): en heredocs de Python con backslashes usar un archivo `.py` o `chr(92)`; las rutas de Python deben ir como `C:/...`. El panel del navegador de vista previa a veces se queda "oculto" (pausa animaciones/`requestAnimationFrame`), mantiene el historial de consola entre cargas y a veces captura la página escalada muy pequeña: verificar con `javascript_tool` (medidas, `getComputedStyle`, `elementFromPoint`) en lugar de depender solo de capturas. Navegar con `?t=algo` nuevo evita caché.

## 4. Estructura de `sitio/`

```
index.html                  página única (≈760 líneas): hero, bienvenida, departamentos, 3D, ficha (modal), galería, ubicación (mapa), nosotros, agenda, pie, banner de cookies
aviso-de-privacidad/index.html   página legal propia (+ css/legal.css); lleva GTM y canonical
404.html, robots.txt, sitemap.xml, favicon.ico, vercel.json (vercel.json NO se sube a SiteGround)
css/style.css               todo el CSS del sitio (≈2000 líneas); css/legal.css solo para el aviso
js/script.js                hero/bienvenida/carruseles, candado+carga del visor 3D, banner de cookies, nav, reveal, galería, lightbox, mapa Leaflet + POIs
js/ficha-modelo.js          modal de ficha: datos (FICHAS), galería, renders, lightbox con gestos
js/agenda.js                enlace de WhatsApp de la sección Agenda + loader de Cal.com + evento agendar_cita
assets/modelos3d/           visor-3d.html (iframe), torre-arbide-4niveles.glb (escritorio), ...-lite.glb (móvil), renders/*.webp (planos por nivel)
assets/fichas/mods/{studio,studiomax,loft,loft403}/   fotos de ficha por modelo; loft403 = fotos exclusivas del Loft 403
assets/fichas/renders/      planos por departamento (Loft201_down/up, Loft401…, Loft403…, StudioMax_204/303, Studio_103/301)
assets/dep-models/          fotos de las tarjetas de modelo (carrusel)
assets/galeria/{aereas,amenidades,areas-comunes,departamentos/{studio,studioMax,loft}}/   galería
assets/hero/                hero-escritorio.mp4 (2.9 MB), hero-movil.mp4 (1.3 MB, recorte vertical), poster-*.webp
assets/welcome/             welcome_01..05.webp (la 6.ª diapositiva es copia de la 1.ª)
assets/og-image-2.jpg       miniatura al compartir (1200×630, 148 KB; nombre nuevo para saltar caché de WhatsApp)
assets/nosotros/, assets/iconos/ (logos de bancos/POI), assets/Mapas/ (fotos de POIs)
assets/references/, assets/mapa-torre-arbideNUEVO.html, assets/*.svg de niveles: sin uso/prototipos (noindex; excluidos del ZIP de despliegue)
```

`tools/`: `optimizar-modelo3d/` (script Node + `LEEME.txt`), `cambios-para-siteground.py`, `optimizar-fotos.py/.bat` (original del proyecto), `siteground-cache-htaccess.txt` (fragmento opcional para **añadir** al final del `.htaccess` del servidor; nunca reemplazarlo).

## 5. Datos de negocio (fuente de verdad)

Inventario disponible (**7 unidades**; precios en MXN, **redondeados por instrucción del cliente**):

| Modelo | Depto | Nivel | m² | Precio | Cajones |
|---|---|---|---|---|---|
| Studio | 103 | 1er piso | 70.12 | $2,320,000 | 1 |
| Studio | 301 | 3er piso | 70.90 | $2,375,000 | 1 |
| Studio Max | 204 | 2do piso | 88.80 | $2,820,000 | 1 |
| Studio Max | 303 | 3er piso | 88.80 | $2,840,000 | 1 |
| Loft (unidad muestra) | 201 | 2do y 3er | 100.80 | $3,060,000 | 2 |
| Loft dúplex | 401 | 4to y 5to | 100.80 | $3,260,000 | 2 |
| Loft dúplex | 403 | 4to y 5to | 103.11 | $3,330,000 | 2 |

- **Solo los Loft tienen 2 cajones; Studio y Studio Max, 1.** Todos: 1 recámara, 1 baño completo, cuarto de lavado cerrado. (El Studio Max se describe "hasta para 2 recámaras" pero la configuración oficial es 1.)
- **Energía solar:** cada departamento incluye **3 paneles fotovoltaicos de 1.5 kW** (conjunto), torre 100% eléctrica; cubren el consumo básico (iluminación, estufa, boiler), no al 100% con minisplits. El usuario pidió **quitar** los puntos "áreas comunes" y "espacio asignado". No prometer % de ahorro.
- **Los precios viven en 4 sitios** (cambiarlos todos): `index.html` (3 "Desde", clase `.unit-price-value`), `js/script.js` (`MODEL_INFO.desde`, pie de la galería), `js/ficha-modelo.js` (`price` por unidad) y `assets/modelos3d/visor-3d.html` (`UNITS_BY_LEVEL[...].precio`). Los datos de cajones/recámaras/baños están en `ficha-modelo.js` (`staticSpecs`) y en las viñetas de `index.html`. Hay un `EQUIPMENT_COMUN` compartido y `EQUIPMENT_LOFT` (2 cajones).
- Contacto: WhatsApp de ventas `+52 477 551 4226` (`524775514226`, en `ficha-modelo.js`, `agenda.js` y el botón flotante). El de **HunterMKT** (`524771302581`, agencia que hizo el sitio, en el pie) **no** es contacto de la marca ni conversión.
- Cal.com: `informacion-du-an-bienes-raices-jfgxcn/visitas-torre-arbide` (visita) y `.../asesoria-para-torre-arbide` (videollamada). El botón del hero "Agenda tu Visita" apunta a **visitas** (corregido: antes apuntaba a asesoría).
- GTM: contenedor `GTM-KH5K446C` en `index.html` y `aviso-de-privacidad/index.html` (no en `visor-3d.html` ni `404.html`). `agenda.js` empuja `agendar_cita` (`tipo_cita` visita/videollamada) a `dataLayer`.
- Rastreo: atributos `data-track="whatsapp" | "agendar-visita" | "agendar-videollamada"` en los 7 botones/enlaces de conversión (hero, ficha, sección Agenda, botón flotante) y regla CSS `[data-track] *{pointer-events:none}` (los hijos svg/span no reciben el clic).

## 6. Arquitectura por módulo

### 6.1 Carga, versionado y caché
- CSS/JS locales se llaman con `?v=FECHA`. `vercel.json` define cabeceras: assets 1 día, modelos 3D 30 días, css/js 1 año `immutable` (por eso hay que subir `?v=`), `X-Robots-Tag: noindex` en hosts `*.vercel.app`, `nosniff` y `Referrer-Policy`.
- SiteGround no tiene reglas propias en el repo; el `.htaccess` del servidor es oculto (activar "Mostrar archivos ocultos") y **no se debe reemplazar**. Bloque de caché opcional en `tools/siteground-cache-htaccess.txt` (pendiente de que el usuario lo aplique).

### 6.2 Visor 3D (la parte más compleja)
- **Carga bajo demanda**: el `<iframe>` de `index.html` **no tiene `src`**, solo `data-src="assets/modelos3d/visor-3d.html?v=…"`. `script.js` (bloque "visor 3D: carga bajo demanda") le pone el `src` **solo al pulsar "Toca para interactuar"**. Motivo: antes cada visita bajaba 44 MB y se agotó la cuota de transferencia (cerró el sitio).
- Al activarse: clase `.is-active` en `#visor-3d-frame` → `position:fixed; inset:clamp(8px,1.6vw,24px)` casi a pantalla completa con el resto atenuado (`box-shadow` 100vmax); en ≤900 px `inset:0` sin marco. `body.visor-3d-lock` bloquea el scroll. `history.pushState({visor3d:1})` hace que el botón atrás lo cierre. `window.salirVisor3d()` (expuesta) lo cierra; Esc también (también reenviado desde el iframe). `openFicha()` llama `salirVisor3d()`. `IntersectionObserver` manda `postMessage({visor3d:'visible'|'hidden'})` para pausar el dibujo.
- **Modelos**: `torre-arbide-4niveles.glb` (escritorio, ≈18 MB, 1.23 M triángulos, Meshopt + `join`/`dedup`/texturas ≤1024) y `torre-arbide-4niveles-lite.glb` (móvil/tablet, ≈13.7 MB, 637 k triángulos; simplificación **con `LockBorder`+`Prune`, ratio .3, error .01** — con error 0.05 deformaba paredes/pisos). Original sin optimizar en `respaldo-modelos3d/` (ignorado). Three.js r128 desde jsDelivr (+GLTFLoader + `MeshoptDecoder`; **sin Draco**).
- **Perfil**: `IS_LITE` = ancho ≤900 o `pointer:coarse` (o `?lite=1|0`). Lite: sin sombras, DPR ≤1.5, luz hemisférica más alta. Render **bajo demanda** (solo dibuja si la cámara se mueve o hay cambios), pausa si la pestaña/visor no se ve, gestos de un dedo (girar) y pellizco (zoom), `touch-action:none`, manejo de `webglcontextlost`, barra de progreso y botón "Reintentar".
- **Nodos del GLB** (no renombrar): `NIVEL01`, `NIVEL02`, `NIVEL03`, `PlantaBaja` (mallas) y Empties `cent_103`, `cent_201`, `cent_204`, `cent_301`, `cent_303`, `CASETA`, `CASILLEROS`, `ELEVADOR`, `TERRAZA`. Búsqueda insensible a mayúsculas. **Niveles 4 y 5 aún sin modelar** ("3D PENDIENTE": `LEVEL_GROUPS` vacío, `nodeName:null` en 401/403 → muestra el edificio completo).
- **Datos del visor** en `visor-3d.html`: `LEVELS` (con tamaño real de cada plano `w,h` para recortar miniaturas sin deformar), `LEVEL_BANDS` (rectángulos de cada depto sobre el plano, medidos a mano), `UNITS_BY_LEVEL`, `unitsAvailableText()` ("Loft - 201 y Studio Max - 204"). Plano x ↔ mundo x, plano y ↔ mundo z (verificado numéricamente).
- **Diseño responsive**: ≤1100 px usa el **diseño compacto** (barra fija `.m-topbar` con ✕ Salir / ↺ Ver todo, niveles como carrusel **Planta Baja → Nivel 5** ordenados por CSS `order`, modelo al centro, **panel inferior** `#renderSheet` con altura reservada `--peek-h:172px` que muestra los departamentos disponibles en tarjetas "Loft - 201" y se expande (`is-open`, 66 %) para ver plano; al abrirlo `applyViewShift()` desplaza la vista con `camera.setViewOffset`). >1100 px: lista de niveles | plano | visor. Nivel activo = tarjeta azul `#2c78d6`.
- **Encuadre de cámara móvil** (`isMobileLayout()`): `fitRadius()` calcula la distancia para que el nivel/huella del depto quepa (fill .94 niveles, .8 unidades) con ángulos elevados `MOBILE_LEVEL_PHI = .27π`, `MOBILE_UNIT_PHI = .22π`. En escritorio se conserva el encuadre original. Tocar una tarjeta solo centra; la ficha se abre solo con el texto "Ver ficha →" (`window.parent.openFicha(key, unitId)`).

### 6.3 Ficha de modelo (`js/ficha-modelo.js` + `#ficha-modal`)
- `FICHAS` con claves `studio`, `studio-max`, `loft`; cada una: textos, `photosBase/photos`, `units[]` (id, name, sub, price, m2, nivel, `renders[]`, `waText`) y `staticSpecs`. Botones `[data-ficha]` abren la ficha; `window.openFicha(key, unitId)` también desde el visor.
- **Fotos por unidad**: si una unidad trae `photosBase`+`photos` (solo **Loft 403**: `assets/fichas/mods/loft403/`, 35 fotos), `applyGallery()` cambia la galería al seleccionarla; las demás usan las del modelo. La galería se arma en `selectUnit()`.
- Cada depto tiene sus renders (planos); los dúplex rotan 2 planos cada 3 s (pausa con modal cerrado/lightbox abierto). Lightbox a pantalla completa para fotos y renders con flechas, deslizar, **pellizco/pan/doble toque** táctil.
- Sección "Energía Solar Incluida" = bloque de párrafos **debajo de "Descripción"** (`#ficha-solar-section`, columna izquierda; el usuario rechazó la tarjeta lateral por romper la proporción cuadrada).
- **Cuidado con el bug de "no se puede volver a abrir"**: el modal cerrado debe ser `visibility:hidden` y ningún descendiente puede tener `pointer-events:auto` incondicional (`.ficha-modal`, `.ficha-lightbox`, `.ficha-level-slide.is-active` solo dentro de `.is-open`). `closeFicha()` invalida cargas (`renderToken++`), cierra lightbox y resetea zoom.

### 6.4 Resto de secciones
- **Hero**: video con `<script>` inline que elige `hero-movil` (≤700 px vertical) o `hero-escritorio`; con "ahorro de datos"/`prefers-reduced-motion` solo muestra el póster.
- **Bienvenida**: carrusel `.welcome-media-track` (slide horizontal, 4 s; clon final = foto 1). Las fotos verticales se detectan por JS (`.is-portrait`) y en móvil se muestran completas con fondo difuminado. Lista de 4 destacados (incluye energía solar).
- **Departamentos**: 3 tarjetas con carrusel de fotos, viñetas (m², cajones, 3 paneles), precio "Desde" y `data-ficha`.
- **Galería**: `GALLERY_IMAGES` generado con `galleryCategory(...)` (entorno 12, amenidades 7, cochera 24, studio 63, studioMax 35, loft 67); filtros Entorno/Amenidades/Cochera y Recepción/Departamentos(+subfiltros)/Todas; leyenda `MODEL_INFO` por modelo.
- **Mapa** (Leaflet 1.9 + Routing Machine + servidor público OSRM; teselas Esri gris claro): `PUNTOS_DE_INTERES` (20 POIs; **Clínica Dental Arbide eliminada** por cierre), `DESCRIPCIONES_POI` (OXXO y Parque Metropolitano con texto del usuario; el resto redactado genérico: pendiente de reemplazo si el usuario aporta textos), vista inicial `[21.1355,-101.6824]` zoom 13 (12 en pantallas <640), lista de POIs con minutos (OSRM `table`, respaldo haversine) **solo en escritorio**, botón ✕ en móvil.
- **Nosotros**: 2 columnas (Du'an / Simacon, en móvil Simacon primero), galería de proyectos con lightbox.
- **Agenda**: dos opciones con Cal.com (modal) + enlace de WhatsApp.
- **Legal/cookies**: `aviso-de-privacidad/` (texto del usuario; se cambió "Vercel" por **SiteGround**) y un banner **informativo** de cookies ("Entendido", `localStorage` `ta_aviso_cookies`) — no es Aceptar/Rechazar porque ese sí tendría que bloquear GTM (Consent Mode); el aviso dice que se pueden desactivar en el navegador.
- **SEO** hecho: título/description, canonical, robots, JSON-LD (`ApartmentComplex`, `RealEstateAgent`, `WebSite`), OG/Twitter, favicon.ico + iconos, un solo `<h1>`, alts, `sitemap.xml`, `robots.txt`, `noindex` en `visor-3d.html`/prototipos/404 y en `*.vercel.app`.

## 7. Decisiones tomadas (y por qué)

- Sitio estático sin build: simplicidad; el usuario edita/revisa en Vercel y sube a mano a SiteGround.
- Visor **bajo demanda** y **dos GLB**: evitar el agotamiento de transferencia y que el móvil truene; el `lite` no se simplificó más por deformaciones.
- Precios redondeados, cajones por modelo y texto solar: instrucciones directas del cliente.
- Banner de cookies informativo (no consentimiento real) por simplicidad y coherencia con el aviso; Consent Mode queda como opción.
- Imagen de compartir con **nombre nuevo** (`og-image-2.jpg`) para saltar la caché de WhatsApp/Facebook.
- Fotos de bienvenida/hero a WebP y video en dos versiones: la página pasó de ≈15.6 MB a ≈7 MB (≈5 MB en móvil) sin tocar el 3D.
- El enlace de créditos de HunterMKT no lleva `data-track`.

## 8. Estado actual (2026-11-02)

- Git: `main` sincronizado con `origin/main`, todo subido a GitHub/Vercel. Etiqueta local `siteground` = `0e83c54` (los commits posteriores solo tocan `CLAUDE.md`, que no se sube a SiteGround).
- **SiteGround (producción) está al día**: el usuario subió los cambios y se verificó por contenido que `index.html`, `css/style.css`, `css/legal.css`, `js/script.js`, `js/ficha-modelo.js`, `js/agenda.js`, `visor-3d.html` y `aviso-de-privacidad/index.html` son idénticos a los del repositorio (re-verificado el 2026-11-02 descargándolos de `www.torrearbide.com`). No hay archivos pendientes de subir. Apex, `sitemap.xml` y el `.glb` lite responden bien.
- Versión `?v=` actual: `20261105`.
- **GTM publicado** (versión 9 del contenedor `GTM-KH5K446C`, verificado descargando `gtm.js`): incluye GA4 `G-98VQ9M0J25` y activadores de clic por `[data-track="whatsapp"]`, `agendar-visita` y `agendar-videollamada`. **Falta** un activador de evento personalizado `agendar_cita` (no aparece en el contenedor).

## 9. Pendientes y preguntas abiertas

1. **Modelar niveles 4 y 5** en 3D (cuando llegue el Blender: nombres de nodo intactos, pasar por `tools/optimizar-modelo3d`, subir `MODEL_VERSION`, añadir grupos en `LEVEL_GROUPS` y Empties `cent_401/403`).
2. Aplicar (opcional) el fragmento de caché al `.htaccess` de SiteGround.
3. GTM: GA4 y clics `[data-track]` ya están publicados. Falta que el usuario cree en Tag Manager el activador de evento personalizado `agendar_cita` (con la variable de capa de datos `tipo_cita`), una etiqueta de evento GA4 que lo use, y vuelva a **publicar**. Así se miden citas realmente agendadas en Cal.com, no solo clics.
4. Confirmar con el equipo: vigencia de precios y leyendas legales ("imágenes ilustrativas"), si el Studio Max se promociona con 1 o 2 recámaras, claim de la energía solar, medios concretos para derechos ARCO y revisión legal del aviso de privacidad; correo/teléfono de oficina para impresos.
5. Ofrecidos y no pedidos: banner con consentimiento real (Consent Mode), GitHub Action de despliegue por FTP a SiteGround, un solo archivo de precios, textos reales para los POIs genéricos (parques Chapalita/Hidalgo, Hospital Aranda de la Parra, IMSS UMAE 1, Universidad de León, Plaza Mayor, Centro histórico), sección de energía solar adicional si el cliente quiere más detalle.
6. Mejoras menores conocidas: en ventanas de escritorio de ~1000×650 el área del modelo 3D queda baja (~290 px) por el panel inferior; el sitio carga solo Cormorant Garamond Italic regular (los pesos 500/600 del CSS usan ese mismo archivo); la versión lite elimina detalles muy pequeños (hojas de plantas).
7. Material de marca para publicidad: `identidad-visual/PROMPT-claude-design-torre-arbide.md` y `PROMPT-sistema-de-diseno-claude-design.md` (paleta, tipografías, componentes, datos de producto). **Actualizarlos si cambian precios, cajones o claims.**

## 10. Identidad visual en una línea (detalle en `identidad-visual/`)

Paleta: Charcoal Deep `#20262A`, Charcoal `#2F3537`, Slate `#4B5A5E`, Tan `#A8A59B`, Tan Light `#C9C3AE`, Cream `#F5F3EF` (dorado `#C8AA7A`/`#9F8252` solo en fichas; verde `#25D366` solo WhatsApp; azul `#2C78D6` solo interfaz del visor). Tipografía: **Montserrat** (400–800) + **Cormorant Garamond Italic** para antetítulos. Botones rectos (radio 2 px, MAYÚSCULAS con tracking .06–.08em), secciones que alternan oscuro/crema, logotipo = barra vertical + tres cuadrados huecos + base.
