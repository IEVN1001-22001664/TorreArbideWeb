(function () {
  "use strict";

  var modal = document.getElementById("ficha-modal");
  if (!modal) return;

  var closeBtn = document.getElementById("ficha-close");
  var refCodeEl = document.getElementById("ficha-ref-code");
  var titleEl = document.getElementById("ficha-title");
  var locationEl = document.getElementById("ficha-location");
  var pricingListEl = document.getElementById("ficha-pricing-list");
  var specsGridEl = document.getElementById("ficha-specs-grid");
  var descriptionSection = document.getElementById("ficha-description-section");
  var descriptionEl = document.getElementById("ficha-description");
  var equipmentSection = document.getElementById("ficha-equipment-section");
  var tagsEl = document.getElementById("ficha-tags");
  var whatsappBtn = document.getElementById("ficha-whatsapp-btn");

  var galleryStage = document.getElementById("ficha-gallery-stage");
  var galleryImg = document.getElementById("ficha-gallery-img");
  var thumbsEl = document.getElementById("ficha-thumbs");

  var levelsSection = document.getElementById("ficha-levels-section");
  var levelSlidesEl = document.getElementById("ficha-level-slides");
  var levelDotsEl = document.getElementById("ficha-level-dots");
  var levelPrevBtn = document.getElementById("ficha-level-prev");
  var levelNextBtn = document.getElementById("ficha-level-next");

  var lightbox = document.getElementById("ficha-lightbox");
  var lightboxImg = document.getElementById("ficha-lightbox-img");
  var lightboxCounter = document.getElementById("ficha-lightbox-counter");
  var lightboxClose = document.getElementById("ficha-lightbox-close");
  var lightboxPrev = document.getElementById("ficha-lightbox-prev");
  var lightboxNext = document.getElementById("ficha-lightbox-next");

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  function photoSet(prefix, count) {
    var list = [];
    for (var i = 1; i <= count; i++) list.push(prefix + "_" + pad(i) + ".jpg");
    return list;
  }
  var STUDIO_PHOTOS = photoSet("ficha_studio", 17);
  var LOFT_PHOTOS = photoSet("ficha_loft", 13);
  var STUDIOMAX_PHOTOS = photoSet("ficha_studiomax", 14);

  // Texto compartido: mismo contenido en los 3 modelos, cambiando solo el
  // nombre del modelo en la primera frase (indicación explícita: "por el
  // momento copia y pega la misma descripción y equipamiento").
  var EQUIPMENT_COMUN = [
    "Gran Isla de cocina equipada",
    "Terraza privada con vista al Este",
    "Cuarto de lavado cerrado",
    "Baño con lavabo de mármol",
    "1 Cajón de estacionamiento",
    "Pisos cerámicos gran formato",
    "Portón y acceso controlado",
    "Tanque e instalaciones independientes"
  ];
  function descripcionModelo(nombre) {
    return [
      "El <strong>Modelo " +
        nombre +
        "</strong> redefine el concepto residencial en la colonia Arbide: un departamento concebido sin muros innecesarios para optimizar cada metro cuadrado y lograr una fluidez visual completa entre cocina, estancia y área de descanso.",
      "El corazón del departamento es su <strong>isla monolítica central</strong> equipada con parrilla empotrada y campana suspendida, integrada armónicamente a la línea de cocina. La estancia conecta mediante cancelería corrediza de piso a techo hacia un <strong>amplio balcón/terraza privada</strong> con orientación lateral al este, garantizando iluminación matutina natural y un ambiente fresco durante la tarde.",
      "A diferencia de los estudios promedio, este modelo integra un <strong>cuarto de lavado cerrado e independiente</strong>, baño completo con separación de áreas húmedas y preparación para climatización. Es ideal tanto para profesionistas jóvenes o parejas sin hijos, como para inversionistas que buscan alta rentabilidad en renta ejecutiva patrimonial o plataformas de hospedaje."
    ];
  }

  function renderDe(archivo, titulo) {
    return { title: titulo + " • Planta Arquitectónica", img: "assets/fichas/renders/" + archivo + ".webp" };
  }

  /* ---------- datos de cada modelo ---------- */
  var FICHAS = {
    studio: {
      refCode: "Torre Arbide • Departamento Modelo Studio",
      title: "Modelo Studio",
      location: "Un espacio único para tí.",
      photosBase: "assets/fichas/mods/studio/",
      photos: STUDIO_PHOTOS,
      units: [
        {
          id: "103",
          name: "Studio - 103",
          sub: "70.12 m² • Balcón vista lateral Este",
          price: "$2,323,000.-",
          m2: "70.12 m²",
          nivel: "1er Piso",
          renders: [renderDe("Studio_103", "1er Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio - 103 en Torre Arbide"
        },
        {
          id: "301",
          name: "Studio - 301",
          sub: "70.90 m² • Balcón vista lateral Este",
          price: "$2,374,000.-",
          m2: "70.90 m²",
          nivel: "3er Piso",
          renders: [renderDe("Studio_301", "3er Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio - 301 en Torre Arbide"
        }
      ],
      staticSpecs: [
        { label: "Configuración", value: "1 Recámara Studio" },
        { label: "Baños", value: "1 Completo" },
        { label: "Lavandería", value: "Cuarto Cerrado" },
        { label: "Estacionamiento", value: "1 Cajón techado" }
      ],
      description: descripcionModelo("Studio"),
      equipment: EQUIPMENT_COMUN
    },

    "studio-max": {
      refCode: "Torre Arbide • Modelo Studio Max",
      title: "Modelo Studio Max",
      location: "Gran amplitud, hasta para 2 recámaras",
      photosBase: "assets/fichas/mods/studiomax/",
      photos: STUDIOMAX_PHOTOS,
      units: [
        {
          id: "204",
          name: "Studio Max - 204",
          sub: "88.80 m²",
          price: "$2,821,000.-",
          m2: "88.80 m²",
          nivel: "2do Piso",
          renders: [renderDe("StudioMax_204", "2do Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio Max - 204 en Torre Arbide"
        },
        {
          id: "303",
          name: "Studio Max - 303",
          sub: "88.80 m²",
          price: "$2,842,000.-",
          m2: "88.80 m²",
          nivel: "3er Piso",
          renders: [renderDe("StudioMax_303", "3er Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio Max - 303 en Torre Arbide"
        }
      ],
      staticSpecs: [
        { label: "Configuración", value: "1 Recámara Studio Max" },
        { label: "Baños", value: "1 Completo" },
        { label: "Lavandería", value: "Cuarto Cerrado" },
        { label: "Estacionamiento", value: "2 Cajones techados" }
      ],
      description: descripcionModelo("StudioMax"),
      equipment: EQUIPMENT_COMUN
    },

    loft: {
      refCode: "Torre Arbide • Modelo Loft",
      title: "Modelo Loft",
      location: "Un espacio con Doble Altura y un Gran Ventanal",
      photosBase: "assets/fichas/mods/loft/",
      photos: LOFT_PHOTOS,
      units: [
        {
          id: "201",
          name: "Loft - 201",
          sub: "100.80 m² • Unidad Muestra",
          price: "$3,061,000.-",
          m2: "100.80 m²",
          nivel: "2do y 3er Piso",
          renders: [renderDe("Loft201_down", "2do Piso"), renderDe("Loft201_up", "3er Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Loft - 201 en Torre Arbide"
        },
        {
          id: "401",
          name: "Loft - 401",
          sub: "100.80 m² • Dúplex",
          price: "$3,259,000.-",
          m2: "100.80 m²",
          nivel: "4to y 5to Piso",
          renders: [renderDe("Loft401_down", "4to Piso"), renderDe("Loft401_up", "5to Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Loft - 401 en Torre Arbide"
        },
        {
          id: "403",
          name: "Loft - 403",
          sub: "103.11 m² • Dúplex",
          price: "$3,333,000.-",
          m2: "103.11 m²",
          nivel: "4to y 5to Piso",
          renders: [renderDe("Loft403_down", "4to Piso"), renderDe("Loft403_up", "5to Piso")],
          waText: "Hola, me interesa información y agendar cita para el Modelo Loft - 403 en Torre Arbide"
        }
      ],
      staticSpecs: [
        { label: "Configuración", value: "1 Recámara Loft" },
        { label: "Baños", value: "1 Completo" },
        { label: "Lavandería", value: "Cuarto Cerrado" },
        { label: "Estacionamiento", value: "1 Cajón techado" }
      ],
      description: descripcionModelo("Loft"),
      equipment: EQUIPMENT_COMUN
    }
  };

  var WHATSAPP = "524775514226";

  /* ---------- estado ---------- */
  var currentData = null;
  var currentUnit = null;
  var galleryItems = [];
  var currentGalleryIndex = 0;
  var renderToken = 0;
  var renderIndex = 0;
  var renderTimer = null;
  var RENDER_ROTATE_MS = 3000;

  /* ---------- galería ---------- */
  function buildGalleryItems(data) {
    return (data.photos || []).map(function (p) {
      return { src: data.photosBase + p };
    });
  }

  function renderThumbs() {
    thumbsEl.innerHTML = "";
    galleryItems.forEach(function (item, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ficha-thumb" + (i === 0 ? " is-active" : "");
      btn.innerHTML = '<img src="' + item.src + '" alt="" loading="lazy">';
      btn.addEventListener("click", function () {
        showGalleryImage(i);
      });
      thumbsEl.appendChild(btn);
    });
  }

  function showGalleryImage(index) {
    if (index < 0 || index >= galleryItems.length) return;
    currentGalleryIndex = index;
    var item = galleryItems[index];
    var myToken = renderToken;
    galleryImg.style.opacity = "0.2";
    var temp = new Image();
    temp.onload = temp.onerror = function () {
      if (myToken !== renderToken) return; // la ficha se cerró/cambió antes de que la imagen cargara
      galleryImg.src = item.src;
      galleryImg.style.opacity = "1";
    };
    temp.src = item.src;

    thumbsEl.querySelectorAll(".ficha-thumb").forEach(function (t, i) {
      t.classList.toggle("is-active", i === index);
    });
  }

  /* ---------- especificaciones y precios ---------- */
  function renderSpecs(data, unit) {
    specsGridEl.innerHTML = "";
    var entries = [
      { label: "Superficie Total", value: unit.m2 },
      { label: "Nivel / Ubicación", value: unit.nivel }
    ].concat(data.staticSpecs || []);
    entries.forEach(function (s) {
      var item = document.createElement("div");
      item.className = "ficha-spec-item";
      item.innerHTML =
        '<span class="ficha-spec-label">' + s.label + '</span><span class="ficha-spec-value">' + s.value + "</span>";
      specsGridEl.appendChild(item);
    });
  }

  function renderPricing(data) {
    pricingListEl.innerHTML = "";
    data.units.forEach(function (unit, i) {
      var row = document.createElement("div");
      row.className = "ficha-price-row is-clickable";
      row.innerHTML =
        '<div><div class="ficha-unit-name">' +
        unit.name +
        '</div><div class="ficha-unit-sub">' +
        unit.sub +
        '</div></div><div class="ficha-unit-cost">' +
        unit.price +
        ' <span>MXN</span></div>';
      row.addEventListener("click", function () {
        selectUnit(i);
      });
      pricingListEl.appendChild(row);
    });
  }

  function selectUnit(index) {
    var unit = currentData.units[index];
    currentUnit = unit;

    pricingListEl.querySelectorAll(".ficha-price-row").forEach(function (r, i) {
      r.classList.toggle("is-selected", i === index);
    });

    renderSpecs(currentData, unit);
    renderUnitRenders(unit);
    whatsappBtn.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(unit.waText);
  }

  /* ---------- descripción / equipamiento ---------- */
  function renderDescription(data) {
    descriptionEl.innerHTML = data.description.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    descriptionSection.hidden = false;
  }

  function renderEquipment(data) {
    tagsEl.innerHTML = data.equipment
      .map(function (t) { return '<span class="ficha-tag">✓ ' + t + "</span>"; })
      .join("");
    equipmentSection.hidden = false;
  }

  /* ---------- render(s) del departamento seleccionado ---------- */
  function showRenderSlide(i) {
    var slides = levelSlidesEl.querySelectorAll(".ficha-level-slide");
    if (!slides.length) return;
    renderIndex = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) {
      s.classList.toggle("is-active", idx === renderIndex);
    });
    levelDotsEl.querySelectorAll(".ficha-level-dot").forEach(function (d, idx) {
      d.classList.toggle("is-active", idx === renderIndex);
    });
  }

  function stopRenderTimer() {
    if (renderTimer) {
      clearInterval(renderTimer);
      renderTimer = null;
    }
  }

  function startRenderTimer() {
    stopRenderTimer();
    if (!currentUnit || !currentUnit.renders || currentUnit.renders.length < 2) return;
    renderTimer = setInterval(function () {
      if (!modal.classList.contains("is-open") || lightbox.classList.contains("is-open")) return;
      showRenderSlide(renderIndex + 1);
    }, RENDER_ROTATE_MS);
  }

  function renderUnitRenders(unit) {
    stopRenderTimer();
    var renders = unit.renders || [];
    var multiple = renders.length > 1;
    renderIndex = 0;
    levelSlidesEl.innerHTML = "";
    levelDotsEl.innerHTML = "";
    levelPrevBtn.hidden = !multiple;
    levelNextBtn.hidden = !multiple;
    levelDotsEl.hidden = !multiple;
    levelsSection.hidden = !renders.length;

    renders.forEach(function (r, i) {
      var slide = document.createElement("div");
      slide.className = "ficha-level-slide" + (i === 0 ? " is-active" : "");
      var img = document.createElement("img");
      img.src = r.img;
      img.alt = r.title;
      img.addEventListener("click", function () {
        openLightbox("render", renders.map(function (x) { return { src: x.img }; }), i);
      });
      slide.appendChild(img);
      levelSlidesEl.appendChild(slide);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "ficha-level-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", r.title);
      dot.addEventListener("click", function () {
        showRenderSlide(i);
        startRenderTimer();
      });
      levelDotsEl.appendChild(dot);
    });
    startRenderTimer();
  }

  /* ---------- render principal de la ficha ---------- */
  function renderFicha(key) {
    var data = FICHAS[key];
    renderToken++;
    currentData = data;

    refCodeEl.textContent = data.refCode;
    titleEl.textContent = data.title;
    locationEl.textContent = data.location;

    renderPricing(data);
    renderDescription(data);
    renderEquipment(data);

    galleryItems = buildGalleryItems(data);
    renderThumbs();
    showGalleryImage(0);
  }

  /* ---------- apertura / cierre del modal ---------- */
  function openFicha(key, unitId) {
    if (!FICHAS[key]) return;
    renderFicha(key);
    var idx = 0;
    if (unitId) {
      var found = currentData.units.findIndex(function (u) { return u.id === unitId; });
      if (found !== -1) idx = found;
    }
    selectUnit(idx);
    // Si la ficha se abre desde el recorrido 3D, se libera el 3D: al cerrar la
    // ficha la página debe quedar desbloqueada (scroll y botones "Ver Ficha").
    if (typeof window.salirVisor3d === "function") window.salirVisor3d();
    modal.classList.add("is-open");
    document.body.classList.add("ficha-lock");
  }

  // Expuesta para que el visor 3D (que vive en un <iframe> aparte) pueda
  // abrir la ficha real de un departamento al hacer click en su tarjeta.
  window.openFicha = openFicha;

  function closeFicha() {
    renderToken++; // invalida cualquier carga de imagen pendiente de esta ficha
    stopRenderTimer();
    modal.classList.remove("is-open");
    document.body.classList.remove("ficha-lock");
    lightbox.classList.remove("is-open");
  }

  document.querySelectorAll("[data-ficha]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openFicha(btn.getAttribute("data-ficha"));
    });
  });

  closeBtn.addEventListener("click", closeFicha);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeFicha();
  });

  levelPrevBtn.addEventListener("click", function () {
    showRenderSlide(renderIndex - 1);
    startRenderTimer();
  });
  levelNextBtn.addEventListener("click", function () {
    showRenderSlide(renderIndex + 1);
    startRenderTimer();
  });

  /* ---------- lightbox de pantalla completa (fotos y renders) ---------- */
  var lightboxItems = [];
  var lightboxIndex = 0;
  var lightboxMode = "gallery";

  function updateLightbox() {
    var multiple = lightboxItems.length > 1;
    lightboxImg.src = lightboxItems[lightboxIndex].src;
    lightboxCounter.textContent = lightboxIndex + 1 + " / " + lightboxItems.length;
    lightboxCounter.hidden = !multiple;
    lightboxPrev.hidden = !multiple;
    lightboxNext.hidden = !multiple;
  }

  function openLightbox(mode, items, index) {
    lightboxMode = mode;
    lightboxItems = items;
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
  }

  function stepLightbox(dir) {
    if (lightboxItems.length < 2) return;
    lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
    updateLightbox();
    if (lightboxMode === "gallery") showGalleryImage(lightboxIndex);
    else showRenderSlide(lightboxIndex);
  }

  galleryStage.addEventListener("click", function () {
    openLightbox("gallery", galleryItems, currentGalleryIndex);
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function (e) {
    e.stopPropagation();
    stepLightbox(-1);
  });
  lightboxNext.addEventListener("click", function (e) {
    e.stopPropagation();
    stepLightbox(1);
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("ficha-lightbox-content")) closeLightbox();
  });

  // Deslizar con el dedo (izquierda / derecha) para cambiar de imagen.
  var swipeX = null;
  var swipeY = null;
  lightbox.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { swipeX = null; return; }
    swipeX = e.touches[0].clientX;
    swipeY = e.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (swipeX === null) return;
    var dx = e.changedTouches[0].clientX - swipeX;
    var dy = e.changedTouches[0].clientY - swipeY;
    swipeX = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) stepLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeFicha();
    }
  });
})();
