# PROMPT — Sistema de Diseño de Torre Arbide (para Claude Design)

Copia todo lo que está debajo de la línea. Úsalo para crear el **sistema de diseño** (design system) y, después, apóyate en el otro documento (`PROMPT-claude-design-torre-arbide.md`) para producir piezas de publicidad. Sube también los archivos de `assets-para-subir/`.

---

## OBJETIVO

Construye el **Sistema de Diseño de Torre Arbide**: la fuente única de verdad visual del desarrollo residencial Torre Arbide (León, Guanajuato, México). Debe documentar **fundamentos (tokens), componentes, patrones y plantillas**, derivados del sitio real www.torrearbide.com, y servir tanto para **interfaces digitales** (web, landing pages, anuncios) como para **piezas impresas** (volantes, folletos, espectaculares, papelería).

No inventes estilos nuevos: **extrae y formaliza** lo que ya existe en el sitio. Donde algo no exista y haga falta (por ejemplo, campos de formulario o plantillas impresas), márcalo explícitamente como **"Propuesto"** y derívalo de las mismas reglas.

**Prefijo y nomenclatura:** tokens con prefijo `ta-` en kebab-case (ej. `--ta-color-charcoal-deep`). Dos contextos de superficie: **`surface-dark`** y **`surface-light`**; cada componente debe definirse para ambos cuando aplique.

**Idioma de la documentación:** español de México.

## 1. FUNDAMENTOS (TOKENS)

### 1.1 Color

Tokens base (valores reales del sitio):

```
--ta-color-charcoal-deep: #20262A;   /* fondo oscuro principal, pies de página, nav al hacer scroll */
--ta-color-charcoal:      #2F3537;   /* logotipo, títulos sobre claro, texto principal sobre claro */
--ta-color-slate:         #4B5A5E;   /* texto secundario sobre claro */
--ta-color-tan:           #A8A59B;   /* acento principal: botón primario, detalles, ventanas del logo */
--ta-color-tan-light:     #C9C3AE;   /* acento claro: hover, antetítulos sobre oscuro */
--ta-color-cream:         #F5F3EF;   /* fondo claro y texto sobre oscuro */
--ta-color-white:         #FFFFFF;   /* solo tarjetas sobre crema y texto sobre foto */
```

Tokens semánticos (mapéalos a los base):
- `text-on-dark` = cream · `text-on-dark-muted` = cream al 75% · `text-on-light` = charcoal · `text-on-light-muted` = slate.
- `accent` = tan · `accent-hover` = tan-light.
- `border-on-light` = charcoal al 10% (hover 15%) · `border-on-dark` = cream al 8% (énfasis 18%, botón fantasma 45%).
- `bg-page-dark` = charcoal-deep · `bg-page-light` = cream · `bg-card-light` = white.

Acentos premium (solo en fichas de producto): dorado `#C8AA7A`, dorado oscuro `#9F8252`; superficies `#0D0E11`, `#15171E`, `#1C1F29`; texto `#F2F3F5`, secundario `#9DA3AF`.
Funcionales: `whatsapp` = `#25D366` (hover `#20BD5A`), solo para acciones de WhatsApp. **Fuera del sistema de marca:** azul `#2C78D6` / `#4EA3FF` (interfaz del visor 3D).

Estados: no hay rojo/verde de estado en la marca; si se necesitan (error/éxito en formularios) defínelos como **Propuestos** y sobrios, de baja saturación, verificados en contraste.

**Contraste obligatorio (WCAG AA):** cream/charcoal-deep 13.8:1 · cream/charcoal 11.2:1 · slate/cream 6.5:1 · tan/charcoal-deep 6.2:1 · charcoal/tan 5.1:1. Prohibido tan o dorado claro como texto sobre cream (≈ 2:1).

**Proporción:** 60% oscuro y fotografía · 30% cream · 10% tan/detalles. Las secciones alternan oscuro → crema → oscuro.

Impresión: documenta CMYK aproximado de cada token (charcoal-deep 24/10/0/84, charcoal 15/4/0/78, slate 20/4/0/63, tan 0/2/8/34, tan-light 0/3/13/21, cream 0/1/2/4, dorado 0/15/39/22) con nota de validar con prueba de color o Pantone.

### 1.2 Tipografía

- **Montserrat** (400, 500, 600, 700, 800) — principal. **Cormorant Garamond Italic** — solo antetítulos y frases de acento. Fuente de sistema (`-apple-system, Segoe UI, Roboto, Arial`) solo dentro del módulo de ficha de producto.

Escala (valores del sitio):

| Token | Fuente / peso | Tamaño | Interlínea | Tracking | Uso |
|---|---|---|---|---|---|
| display-hero | Montserrat 800 | clamp(42px, 7.5vw, 88px) | 1.02 | .01em | Título de portada (TORRE ARBIDE) |
| title-section | Montserrat 800 | clamp(32px, 4.5vw, 52px) | 1.1 | .01em | H2 de sección |
| title-feature | Montserrat 800 | clamp(28px, 3.4vw, 42px) | 1.15 | .01em | Título de bloque (bienvenida) |
| eyebrow | Cormorant Garamond italic 500 | clamp(18px, 2vw, 22px) | 1.2 | normal | Antetítulo sobre H2 (tan-light en oscuro, slate en claro) |
| eyebrow-hero | Cormorant Garamond italic 500 | clamp(20px, 2.6vw, 30px) | 1.2 | normal | "Vivir con Elegancia en" |
| model-name | Cormorant Garamond italic 600 | 24px | 1.2 | normal | Nombre de modelo en tarjeta |
| body-lg | Montserrat 400 | clamp(14px, 1.4vw, 17px) | 1.6 | normal | Subtítulo de portada |
| body | Montserrat 400 | 15px | 1.7 | normal | Texto corrido |
| label | Montserrat 600/700 | 11–13px | 1.3 | .05–.08em, MAYÚSCULAS | Botones, etiquetas, navegación |
| price | Montserrat 800 | 1.15–1.6rem | 1.1 | normal | Precios (dorado en ficha) |

Nota técnica: el sitio carga de Google Fonts solo **Cormorant Garamond Italic en su peso regular**, así que los pesos 500/600 declarados en el CSS se muestran con ese mismo archivo. En el sistema usa Cormorant Garamond Italic 500 y 600 reales cuando estén disponibles (para impresión y publicidad), manteniendo el mismo diseño.

Reglas: máximo una línea de Cormorant por pieza; no mezclar otras familias; longitud de línea 45–75 caracteres; incrustar fuentes o convertir a curvas en impresión.

### 1.3 Espaciado y retícula

- Escala base de 4 px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 120`. Valores reales del sitio: padding vertical de sección **100–120 px** en escritorio (menos en móvil), separación entre bloques **56 px**, gap de tarjetas **32 px**, padding de botón **15×30** (grande) y **13×22** (compacto).
- Contenedor: **max-width 1180 px**, márgenes laterales `clamp(20px, 4vw, 56px)`. Encabezados de sección centrados, max-width 640 px.
- Retícula: 12 columnas en escritorio; 3 columnas para tarjetas de modelo; 2 columnas para bloques de texto + imagen (50/50); 1 columna en móvil.
- Breakpoints: **1040**, **900** (corte principal a móvil), **640**, **520**.

### 1.4 Formas, bordes y elevación

- Radios: **2 px** (botones principales y outline), **6–8 px** (campos, botones de ficha, tarjetas pequeñas), **10–12 px** (tarjetas/modales de ficha), **999 px** (pills, etiquetas, CTA de navegación), **50%** (botón flotante).
- Bordes: hairline 1 px (ver tokens de borde).
- Sombras: botón primario `0 10px 30px -10px rgba(0,0,0,.5)` · barra superior al hacer scroll `0 8px 24px -12px rgba(0,0,0,.5)` · botón WhatsApp `0 8px 24px -6px rgba(0,0,0,.5)` · aviso flotante `0 12px 36px rgba(0,0,0,.4)`. Nada de sombras duras o de color.
- Capas (z-index): navegación 50 · botón WhatsApp 80 · aviso de cookies 850 · visor 3D a pantalla completa 900 · mapa a pantalla completa 1000 · ficha modal 10000 · lightbox 20000.

### 1.5 Movimiento

- Transiciones UI: **.2–.35 s `ease`** (color, fondo, borde, transform).
- Hover de botones y tarjetas: elevación `translateY(-2px)`.
- Aparición al hacer scroll: opacidad 0→1 y `translateY(26px)→0`, **.8 s** con `cubic-bezier(.19, 1, .22, 1)`, retraso escalonado de **120 ms** por elemento.
- Carruseles: deslizamiento horizontal de 1 s, cambio cada 4 s.
- Respetar siempre `prefers-reduced-motion` (sin animaciones).

### 1.6 Imagen y superposiciones

- Degradado de legibilidad sobre foto: de abajo hacia arriba `charcoal-deep` 88% → 35% (a 42%) → 5% (a 70%), más uno lateral izquierdo 50% → 0 (45%).
- Fotos de arquitectura sin sobre-procesar; exteriores al atardecer/aéreas; interiores cálidos con madera y piso cerámico arena.
- Iconografía: trazo lineal uniforme de 1.5–2 px, extremos redondeados, sin relleno de color.

## 2. COMPONENTES

Para cada uno entrega: anatomía, variantes, estados (reposo, hover, foco, activo, deshabilitado), tokens usados, reglas de uso y ejemplo en `surface-dark` y `surface-light`.

1. **Logotipo** — ícono (barra vertical + tres cuadrados huecos + base), versiones color / blanco / charcoal; horizontal y apilada ("TORRE" / "ARBIDE" con ícono a la izquierda); área libre = ancho de la barra; tamaño mínimo digital 24 px de alto del ícono (Propuesto).
2. **Barra de navegación** — fija; reposo: degradado oscuro translúcido sobre foto; con scroll: charcoal-deep al 92% + desenfoque 10 px + sombra, padding vertical 22→14 px. Enlaces 13 px, 500, mayúsculas, .06em. CTA "Contacto": pill (999 px) tan, texto charcoal, 13 px/600.
3. **Botones**
   - *Primario*: fondo tan, texto charcoal, 13 px/600, mayúsculas, .08em, padding 15×30, radio 2 px, sombra; hover tan-light + elevación.
   - *Fantasma* (sobre foto/oscuro): borde cream 45%, fondo cream 4%, desenfoque 4 px; hover fondo cream 14%.
   - *Outline oscuro* (sobre claro): borde 1 px charcoal, texto charcoal, 12 px/600, .06em, padding 13×22; hover invierte (fondo charcoal, texto cream).
   - *Outline claro* (sobre oscuro): borde 1 px cream, texto cream; hover invierte (fondo cream, texto charcoal).
   - *WhatsApp*: fondo #25D366, texto blanco, radio 8 px (ficha) o círculo de 60 px (flotante).
   - Tamaño táctil mínimo 44 px; foco visible con contorno 2 px tan-light y separación 3 px.
4. **Antetítulo + encabezado de sección** — eyebrow Cormorant + H2 Montserrat 800 + introducción 15 px slate; centrado, max-width 640.
5. **Portada (hero)** — foto/video a pantalla completa con degradado de legibilidad; bloque de texto abajo a la izquierda (max-width 680): eyebrow-hero, logotipo grande, subtítulo (max-width 480), dos botones (primario + fantasma), indicador "Desliza".
6. **Etiquetas / badges** — *escasez* (pill tan, texto charcoal, 11 px/700, mayúsculas); *tag de modelo sobre foto* (pill, fondo blanco 18%, texto blanco, 10 px/700); *tag de equipamiento* (fondo blanco 4%, borde 8%, radio 6 px, 12 px); *"Venta exclusiva"* (dorado, solo ficha).
7. **Tarjeta de modelo (unidad)** — tarjeta blanca con borde charcoal 10%; zona visual de 180 px con carrusel de fotos y degradado; nombre del modelo en Cormorant italic 24 px; datos (m², cajones) en 13 px; "Desde" + precio en Montserrat 800; botón outline oscuro "Ver Ficha de Modelo". Variante con etiqueta "N Disponibles" y "Muestra".
8. **Pills de filtro** (sobre oscuro) — padding 12×24, radio 999, borde cream 18%, texto cream 75% 12 px/600 mayúsculas; hover borde 40%; activo: fondo tan, texto charcoal.
9. **Galería** — vista previa 4:3 + miniaturas; lightbox a pantalla completa con flechas y contador.
10. **Ficha de producto (modal oscuro)** — superficies `#15171E`/`#1C1F29`, radio 12, precio dorado, galería con miniaturas en una fila, cuadrícula de especificaciones (etiqueta pequeña + valor), planos con carrusel, equipamiento en tags, botones WhatsApp (verde) y "Programa una Visita" (secundario).
11. **Mapa y puntos de interés** — mapa gris claro minimalista, marcadores circulares con ícono, lista con minutos en auto a la torre, tarjeta de detalle con descripción, foto y ruta.
12. **Fila de agenda** — opción de dos columnas (texto + botón), separada por hairline charcoal 14%; botones primario y outline oscuro.
13. **Bloques institucionales** — logotipo de Du'an Bienes Raíces y Constructora Simacon en 2 columnas, texto 15 px, galería de proyectos.
14. **Aviso de cookies** — tarjeta flotante charcoal-deep 97%, borde cream 18%, radio 4, texto 12.5 px cream 75%, botón "Entendido" (cream con texto charcoal).
15. **Botón flotante de WhatsApp** — círculo de 60 px, esquina inferior derecha a 24 px.
16. **Pie de página** — charcoal-deep, borde superior cream 8%, textos de 11 px al 70%, enlace "Aviso de Privacidad" subrayado.
17. **Página legal** — fondo cream, texto charcoal, columna de 780 px, H1 800, H2 700, listas con viñetas tan.
18. **Campos de formulario (Propuesto)** — altura 48 px, borde 1 px charcoal 20%, radio 2 px, etiqueta 12 px/600 mayúsculas, foco con borde tan y anillo tan-light; mensajes de error sobrios.

Excluir del sistema de marca: la interfaz del visor 3D (chips azules, panel inferior), que es una herramienta de producto, no identidad.

## 3. PATRONES

- **Ritmo de página:** portada oscura → bienvenida oscura → modelos crema → recorrido 3D oscuro → galería oscura → ubicación crema → nosotros oscuro → agenda crema → pie oscuro.
- **Composición foto + texto:** foto dominante, degradado de legibilidad, bloque de texto anclado abajo-izquierda.
- **Jerarquía de llamado a la acción:** un botón primario por vista; el secundario en estilo fantasma/outline.
- **Datos de producto:** etiqueta pequeña en mayúsculas arriba, valor en negrita abajo; precios siempre en MXN con "Desde".
- **Prueba social/urgencia:** badge pill tan + frase corta ("Ya vendimos el 50% de la torre").
- **Co-branding:** franja al pie "Comercializa Du'an Bienes Raíces · Proyecto y construcción: Constructora Simacon", logos pequeños.

## 4. EXTENSIÓN A PUBLICIDAD E IMPRESIÓN (Propuesto)

Define plantillas editables que reutilicen los componentes anteriores:
- **Digital:** post 1080×1350 y 1080×1080, story 1080×1920 (márgenes seguros 250 px arriba/abajo), anuncio feed 1200×628, banners display (300×250, 336×280, 728×90, 160×600, 300×600), carrusel de 5–8 láminas.
- **Impreso:** volante A5/A4 (sangrado 3 mm, margen de seguridad 5 mm, 300 dpi, CMYK), tríptico carta, espectacular 12×4 m (≤ 7 palabras, QR), lona de obra, roll-up 85×200 cm, tarjeta 9×5 cm, hoja membretada.
- **Conversión de tipografía web→impresión (guía):** 16 px de texto web ≈ 10–11 pt en volante A5; título de portada 88 px ≈ 48–60 pt; etiquetas 12 px ≈ 7–8 pt (nunca menos de 7 pt).
- **Cuadrícula editorial:** 12 columnas con márgenes de 12 mm (A4) / 8 mm (A5); alinear siempre a la barra vertical del logotipo como eje visual.
- Cada plantilla indica qué foto o plano usar, jerarquía tipográfica, y dónde van logotipo, URL (www.torrearbide.com), WhatsApp (+52 477 551 4226), dirección (Tabasco 606, Bellavista, 37360 León de los Aldama, Gto.) y QR.

## 5. ACCESIBILIDAD Y CALIDAD

- Contraste AA mínimo en todo texto; texto pequeño (≤ 14 px) solo con ≥ 4.5:1.
- Tamaño táctil ≥ 44 px, foco visible en todos los elementos interactivos, no transmitir información solo con color.
- Texto alternativo descriptivo en fotos ("Departamento modelo Studio en Torre Arbide, León — foto 1"); decorativas con alt vacío.
- Animaciones desactivables (`prefers-reduced-motion`).

## 6. REGLAS DE USO (SÍ / NO)

**Sí:** respetar la paleta y la proporción 60/30/10 · un solo mensaje y un solo CTA por pieza · bordes finos y esquinas casi rectas · mucho espacio en blanco · fotografía real de la torre.
**No:** degradados de color, neón, sombras duras, iconos 3D, tipografías extra, más de 3 colores por pieza, azul del visor 3D, logotipo deformado o recoloreado, datos inventados (precios, metros, amenidades) distintos a los del sitio.

## 7. ENTREGABLES DEL SISTEMA

1. Página de **fundamentos** con todos los tokens (color con contraste, tipografía, espaciado, radios, sombras, movimiento) y su equivalente en variables CSS y JSON.
2. **Biblioteca de componentes** con variantes y estados en `surface-dark` y `surface-light`.
3. **Patrones** de página y de composición.
4. **Plantillas** de publicidad digital e impresa (marcadas como "Propuesto").
5. **Guía de uso** con SÍ/NO, accesibilidad y ejemplos correctos e incorrectos.
6. **Registro de pendientes**: valores Pantone/CMYK oficiales, leyendas legales de publicidad inmobiliaria ("imágenes ilustrativas", vigencia de precios), correo/teléfono de oficina para impresos, estados de error/éxito de formulario.
