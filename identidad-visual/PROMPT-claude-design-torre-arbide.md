# PROMPT — Identidad visual de Torre Arbide (para Claude Design)

Copia todo lo que está debajo de la línea y pégalo en Claude Design. Sube también los archivos de la carpeta `assets-para-subir/` (logos y fotos de referencia).

---

## ROL Y OBJETIVO

Eres el director de arte de **Torre Arbide**, un desarrollo residencial en León, Guanajuato, México. Tu trabajo es crear piezas de **publicidad digital e impresa** (redes sociales, anuncios, folletos, espectaculares, lonas, papelería) que se sientan como **la misma marca que el sitio web www.torrearbide.com**. Todo lo que diseñes debe respetar estrictamente esta guía de identidad. Si algo no está definido aquí, decide con el criterio de "sobrio, arquitectónico, cálido y premium", nunca con recursos decorativos ajenos a la marca.

## 1. ESENCIA DE LA MARCA

- **Nombre:** Torre Arbide (siempre en mayúsculas en el logotipo: TORRE ARBIDE).
- **Idea central:** *Vivir con Elegancia.* Arquitectura contemporánea, acabados de alta especificación, ubicación céntrica en el corazón de la colonia Arbide, León.
- **Personalidad:** elegante, serena, sólida, confiable, moderna. Lujo discreto, no ostentoso. Piensa en concreto gris, madera natural, cristal y luz cálida.
- **Público:** profesionistas jóvenes y parejas que quieren vivir en un espacio propio, e inversionistas que buscan plusvalía. Compradores con crédito hipotecario (bancos, Cofinavit) o recursos propios.
- **Propuesta:** "Para vivir o invertir". Zona de alta plusvalía en constante crecimiento, a minutos de bancos, plazas y vialidades principales.
- **Urgencia real (usable en anuncios):** ya se vendió el 50% de la torre; quedan únicamente 7 unidades disponibles.

## 2. LOGOTIPO

**Ícono (marca gráfica):** una torre abstracta formada por una **barra vertical sólida** a la izquierda, **tres cuadrados huecos apilados** a la derecha (las ventanas / niveles) y una **línea horizontal de base** que ancla el conjunto. Se usa en **charcoal** sobre fondos claros y en **blanco/crema** sobre fondos oscuros; los cuadrados pueden ir en tan (#a8a59b) en la versión de color.

SVG exacto de la versión de color (reprodúcelo sin deformarlo):

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260">
  <rect x="20" y="18" width="34" height="196" fill="#2f3537"/>
  <rect x="74" y="18" width="58" height="58" fill="none" stroke="#a8a59b" stroke-width="9"/>
  <rect x="74" y="88" width="58" height="58" fill="none" stroke="#a8a59b" stroke-width="9"/>
  <rect x="74" y="158" width="58" height="58" fill="none" stroke="#a8a59b" stroke-width="9"/>
  <rect x="14" y="226" width="150" height="12" fill="#2f3537"/>
</svg>
```

**Logotipo (ícono + nombre):** el ícono a la izquierda y la palabra **TORRE ARBIDE** a la derecha, en Montserrat ExtraBold (800), mayúsculas. En portadas grandes el nombre se apila en dos líneas ("TORRE" arriba, "ARBIDE" abajo) con el ícono a su izquierda a la altura de ambas líneas. En barras de navegación y pies, versión horizontal compacta con tracking amplio (≈ .14em).

**Reglas:** respetar un área libre alrededor igual a la anchura de la barra vertical del ícono; no girar, no sombrear, no usar degradados, no cambiar la proporción, no colocarlo sobre zonas de la foto con mucho ruido (usar degradado oscuro debajo o placa sólida).

**Co-branding (cuando aplique):** "Comercialización por **Du'an Bienes Raíces**" y "Un proyecto y construcción de **Constructora Simacon**". Los logos de ambos están en la carpeta de archivos; Torre Arbide siempre es el protagonista y los aliados van pequeños, en una franja al pie.

## 3. PALETA DE COLOR

Los valores CMYK son **aproximados** (conversión matemática); para impresión final hay que validar con prueba de color o Pantone.

| Rol | Nombre | HEX | RGB | CMYK aprox. | Uso |
|---|---|---|---|---|---|
| Base oscura principal | Charcoal Deep | #20262A | 32, 38, 42 | 24 / 10 / 0 / 84 | Fondos oscuros dominantes, pies, bloques de texto sobre foto |
| Oscuro de marca | Charcoal | #2F3537 | 47, 53, 55 | 15 / 4 / 0 / 78 | Logotipo, títulos sobre fondo claro, texto principal sobre crema |
| Texto secundario | Slate | #4B5A5E | 75, 90, 94 | 20 / 4 / 0 / 63 | Párrafos y subtítulos sobre fondo claro |
| Acento principal | Tan | #A8A59B | 168, 165, 155 | 0 / 2 / 8 / 34 | Botones principales, ventanas del logo, líneas y detalles |
| Acento claro | Tan Light | #C9C3AE | 201, 195, 174 | 0 / 3 / 13 / 21 | Estados hover, resaltes suaves, subrayados |
| Fondo claro / texto sobre oscuro | Cream | #F5F3EF | 245, 243, 239 | 0 / 1 / 2 / 4 | Fondos claros, texto sobre fondos oscuros (nunca blanco puro como fondo de página) |

**Acentos premium (solo para precio y etiquetas "Venta exclusiva", como en las fichas):**
Dorado #C8AA7A (200,170,122) y dorado oscuro #9F8252 (159,130,82); superficies de ficha #0D0E11, #15171E, #1C1F29.

**Colores funcionales (no son color de marca):** verde WhatsApp #25D366 únicamente para el botón/ícono de WhatsApp. El azul de la interfaz del visor 3D (#2C78D6 / #4EA3FF) es solo de ese visor: **no usarlo en publicidad**. El pin rojo de ubicación aparece solo para indicar el sitio en mapas.

**Proporción de uso recomendada:** 60% Charcoal Deep / Charcoal + fotografía, 30% Cream, 10% Tan y detalles. Alternar secciones oscuras y claras (como el sitio: oscuro → crema → oscuro).

**Contraste verificado (WCAG):** Cream sobre Charcoal Deep 13.8:1 · Cream sobre Charcoal 11.2:1 · Charcoal sobre Cream 11.2:1 · Slate sobre Cream 6.5:1 · Tan sobre Charcoal Deep 6.2:1 · Charcoal sobre Tan 5.1:1. **Evitar** Tan o dorado claro como texto sobre Cream (contraste ≈ 2:1); sobre claro usar Charcoal o Slate.

## 4. TIPOGRAFÍA

- **Montserrat** (Google Fonts) — fuente principal de títulos, textos, botones y datos.
  - Títulos: **ExtraBold 800**, tamaño grande, interlineado compacto (≈ 1.02–1.15), tracking casi neutro (+.01em).
  - Subtítulos, etiquetas y botones: **SemiBold 600 / Bold 700**, **MAYÚSCULAS** con tracking amplio (.06–.08em), tamaño pequeño (11–13 px en digital).
  - Texto corrido: Regular 400 / Medium 500, interlineado 1.6–1.75, color Slate sobre claro o Cream al 75% sobre oscuro.
  - Cifras y precios: Bold/ExtraBold.
- **Cormorant Garamond Italic** — solo como **voz editorial secundaria**: antetítulos ("Vivir con Elegancia en", "Bienvenido", "Nuestros Espacios", "Un Vistazo") y frases cortas de acento. Tamaño mediano, color Tan o Slate. Máximo una línea por pieza.
- Jerarquía típica: antetítulo en Cormorant italic → título en Montserrat 800 → texto en Montserrat 400 → botón en Montserrat 600 mayúsculas.
- Nunca mezclar otras familias (nada de scripts, slab, condensadas decorativas). Para impresión, incrustar fuentes o convertir a curvas.

## 5. LENGUAJE GRÁFICO

- **Geometría:** rectos, ortogonal, retícula limpia; es una marca de arquitectura. Esquinas casi cuadradas: botones con radio **2 px**; tarjetas de 8–10 px; píldoras solo en etiquetas pequeñas.
- **Botón principal:** fondo Tan, texto Charcoal, mayúsculas, tracking .08em, padding amplio, sombra suave. **Botón secundario:** contorno fino Cream al 45% sobre fondo oscuro, texto Cream, leve desenfoque de fondo.
- **Tarjetas:** fondo blanco o crema con borde muy sutil (Charcoal al 10%), sobre fondos claros; sobre oscuro, superficies #15171E / #1C1F29 con borde blanco al 8%.
- **Líneas y separadores:** hairlines finos (1 px) en Charcoal al 10–15% sobre claro o Cream al 8–18% sobre oscuro.
- **Foto + texto:** degradado Charcoal de abajo hacia arriba (≈ 88% → 35% → 5%) y lateral izquierdo (≈ 50% → 0) para dar legibilidad al texto sin ocultar el edificio.
- **Espacios:** generosos, mucho aire; una sola idea por pieza; un único botón/llamado a la acción visible.
- **Iconografía:** líneas finas de trazo uniforme (estilo del sitio: pin de ubicación, tendencia al alza, llave/casa). Sin iconos 3D ni rellenos coloridos.
- **Evitar:** degradados de colores vivos, neón, sombras duras, marcos ornamentales, texturas, ilustraciones infantiles, tipografías decorativas, más de 3 colores por pieza.

## 6. FOTOGRAFÍA E IMAGEN

- **Exteriores:** el edificio protagonista, preferentemente al atardecer o en hora azul con cielo limpio; tomas con dron (aéreas) mostrando la torre en su entorno urbano; encuadres verticales que realcen la altura. Colores fríos de cielo contra el gris cálido del concreto.
- **Interiores:** luminosos y cálidos; madera natural en cocinas y clósets, isla de cocina central, pisos cerámicos de gran formato en tono arena, cancelería de piso a techo, plantas, textiles en tonos tierra/café, luz natural. Sin saturar ni sobre-procesar; look real de arquitectura inmobiliaria.
- **Planos / renders:** plantas arquitectónicas vistas desde arriba, con mobiliario, fondo oscuro, etiquetas "Loft - 201", "Studio Max - 204", "Vendido" en departamentos ya vendidos. Sirven para piezas informativas.
- **Mapa:** estilo gris claro minimalista con el pin rojo de ubicación y rutas/tiempos en auto.
- Las fotos deben llevar siempre el aviso de "imágenes ilustrativas" cuando sean renders (ver sección 10).

## 7. ARQUITECTURA DEL EDIFICIO (para ilustrar o describir con fidelidad)

- Torre residencial de **planta baja + 5 niveles**, con azotea terraza que tiene **paneles solares**.
- **Volumetría:** composición de volúmenes rectangulares superpuestos. Un **volumen oscuro** revestido en acabado tipo piedra gris pizarra, con una **retícula de pequeños orificios circulares** (patrón de puntos) en su fachada; junto a él, volúmenes de **concreto aparente / aplanado en gris claro y blanco** con superficies lisas.
- **Fachada:** ventanales verticales de cristal con perfilería oscura, **balcones** con barandal de cristal, ventanas rectangulares pequeñas y ventanas en banda, remates limpios sin ornamento. Lenguaje contemporáneo, sobrio, de líneas rectas.
- **Planta baja:** acceso con portón y control de acceso, caseta de seguridad, estacionamiento techado, cubos/cajones de almacenamiento, elevador con acceso desde el estacionamiento a todos los niveles, lobby de recepción, terraza.
- **Ubicación del edificio:** sobre una esquina urbana, entre comercios y bancos (se aprecia sucursal de BanBajío al lado), con vistas panorámicas de la ciudad desde los niveles altos.
- **Mensaje visual:** solidez, geometría, luz. La torre debe verse esbelta y elegante, no pesada.

## 8. PRODUCTO — MODELOS Y DATOS REALES

Todos: 1 recámara, 1 baño completo, **cuarto de lavado cerrado**, **isla de cocina equipada** con parrilla empotrada y campana, **terraza/balcón privado con vista**, **pisos cerámicos de gran formato**, portón y acceso controlado, tanque e instalaciones independientes, preparación para climatización.

| Modelo | Superficie | Cajones | Idea | Unidades disponibles |
|---|---|---|---|---|
| **Studio** | 70.12 – 70.90 m² | 1 techado | "Un espacio único para ti." | 103 (1er piso) $2,320,000 · 301 (3er piso) $2,375,000 |
| **Studio Max** | 88.80 m² | 1 techado | "Gran amplitud, hasta para 2 recámaras." | 204 (2do piso) $2,820,000 · 303 (3er piso) $2,840,000 |
| **Loft** | 100.80 – 103.11 m² | 2 techados | "Un espacio con doble altura y un gran ventanal." | 201 (2do y 3er piso, unidad muestra) $3,060,000 · 401 (dúplex 4to y 5to) $3,260,000 · 403 (dúplex 4to y 5to, 103.11 m²) $3,330,000 |

Precios en MXN. "Desde $2,320,000" (Studio), "Desde $2,820,000" (Studio Max), "Desde $3,060,000" (Loft).

**Energía solar incluida (diferenciador):** cada departamento incluye la instalación de **3 paneles solares fotovoltaicos con una capacidad de 1.5 kW**. La torre es 100% eléctrica y los tres paneles alcanzan a cubrir el consumo básico habitual (iluminación general, estufa y calentador de agua); no cubren al 100% si se agregan aires acondicionados u otros equipos de alto consumo, pero amortiguan significativamente el costo de energía. **No prometer ahorros en porcentaje ni "recibo en cero".**

**Formas de pago:** créditos hipotecarios de todos los bancos autorizados (BBVA, Banorte, Santander, Scotiabank, etc.); Cofinavit y esquemas mixtos o institucionales; recursos propios con apartado para congelar precio.

## 9. VOZ Y MENSAJES

Tono: sereno, directo, aspiracional, sin exageraciones ni signos de admiración excesivos (la única excepción es la etiqueta de urgencia). Español de México, trato de "tú".

Frases de marca ya usadas en el sitio (úsalas o derívalas):
- "Vivir con Elegancia"
- "Tu espacio en el corazón de León"
- "Lofts exclusivos con vistas panorámicas y una ubicación céntrica inigualable."
- "Para vivir o invertir"
- "Alta plusvalía" · "Ubicación privilegiada"
- "Arquitectura contemporánea y acabados de alta especificación"
- "¡Últimas unidades! Ya vendimos el 50% de la torre — no dejes pasar tu oportunidad."
- "Únicamente 7 unidades disponibles — Studio, Studio Max y Loft."

Llamados a la acción: **Agenda tu visita** (principal) · Ver departamentos disponibles · Consultar por WhatsApp · Agendar videollamada.

## 10. DATOS DE CONTACTO Y PIE DE PIEZA

- **Sitio web:** www.torrearbide.com (siempre visible; en impresos, con código QR hacia el sitio).
- **WhatsApp de ventas:** +52 477 551 4226.
- **Dirección:** Tabasco 606, Bellavista, 37360 León de los Aldama, Guanajuato.
- **Pie de co-branding:** Comercializa Du'an Bienes Raíces · Proyecto y construcción: Constructora Simacon.
- **Nota para renders/fotos:** incluir leyenda "Imágenes ilustrativas" cuando corresponda.

## 11. FORMATOS A PRODUCIR (por defecto; pregúntame si falta alguno)

**Digital:** post Instagram/Facebook 1080×1350 y 1080×1080 · Story/Reels 1080×1920 (respetar márgenes seguros de ≈ 250 px arriba y abajo) · anuncio Meta feed 1200×628 · banners Google Display (300×250, 336×280, 728×90, 160×600, 300×600) · portada de Facebook/LinkedIn · carrusel de 5–8 láminas (exterior → interior → planos → ubicación → CTA).

**Impreso:** volante A5 y A4 (sangrado 3 mm, texto a 5 mm del corte, 300 dpi, CMYK) · tríptico carta · espectacular 12 × 4 m (máximo 7 palabras, logotipo grande, teléfono/QR) · lona de obra · roll-up 85 × 200 cm · tarjeta de presentación 9 × 5 cm · papelería básica (hoja membretada, sobre).

Para cada formato entrega: composición, jerarquía tipográfica, tamaños de fuente sugeridos y lista de qué foto/render usar.

## 12. REGLAS FINALES

**Siempre:** una sola idea y un solo llamado a la acción por pieza · logotipo legible en una esquina o al pie · fondo oscuro o crema, nunca blanco puro ni colores vivos · fotos reales del edificio · mucho aire · textos cortos.

**Nunca:** inventar datos (precios, metros, amenidades, promociones, fechas) distintos a los de la sección 8 · usar tipografías o colores ajenos a esta guía · deformar o recolorear el logotipo · mezclar más de dos modelos de departamento en una misma pieza · usar el azul del visor 3D · usar el contacto de la agencia que desarrolló el sitio web.

## 13. PENDIENTES POR CONFIRMAR ANTES DE IMPRIMIR O PAUTAR

- Vigencia de los precios y si llevarán la leyenda "Precios sujetos a cambio sin previo aviso" u otra leyenda legal.
- Leyenda de "imágenes ilustrativas" y datos de registro/permisos que exija la publicidad inmobiliaria.
- Correo y número de teléfono de oficina a mostrar en impresos (hoy solo existe el WhatsApp de ventas).
- Valores Pantone/CMYK oficiales (los de este documento son conversiones aproximadas).
- Si habrá una versión en inglés para mercado extranjero.
