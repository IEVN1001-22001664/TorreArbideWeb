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
  var levelTitleEl = document.getElementById("ficha-level-title");
  var levelSlidesEl = document.getElementById("ficha-level-slides");
  var levelDotsEl = document.getElementById("ficha-level-dots");
  var levelPrevBtn = document.getElementById("ficha-level-prev");
  var levelNextBtn = document.getElementById("ficha-level-next");
  var levelWrapper = document.getElementById("ficha-level-wrapper");

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

  /* ---------- datos de cada modelo ---------- */
  var FICHAS = {
    studio: {
      refCode: "Torre Arbide • Modelo Studio",
      title: "Departamento Modelo Studio",
      location: "Tabasco 606, Col. Bellavista / Arbide, León, Gto.",
      photosBase: "assets/fichas/mods/studio/",
      photos: STUDIO_PHOTOS,
      units: [
        {
          id: "103",
          name: "Dpto. 103 • Nivel 1",
          sub: "70.12 m² • Balcón vista lateral Este",
          price: "$2,323,000",
          m2: "70.12 m²",
          nivel: "Nivel 1 (Piso 1)",
          levelIndex: 0,
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio Dpto 103 en Torre Arbide"
        },
        {
          id: "301",
          name: "Dpto. 301 • Nivel 3",
          sub: "70.90 m² • Balcón vista lateral Este",
          price: "$2,374,000",
          m2: "70.90 m²",
          nivel: "Nivel 3 (Piso 3)",
          levelIndex: 1,
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio Dpto 301 en Torre Arbide"
        }
      ],
      specsDefault: { superficie: "70.12 a 70.90 m²", nivel: "Piso 1 y Piso 3" },
      staticSpecs: [
        { label: "Configuración", value: "1 Recámara Studio" },
        { label: "Baños", value: "1 Completo" },
        { label: "Lavandería", value: "Cuarto Cerrado" },
        { label: "Estacionamiento", value: "1 Cajón techado" }
      ],
      description: descripcionModelo("Studio"),
      equipment: EQUIPMENT_COMUN,
      levels: [
        { title: "1er Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl1.webp" },
        { title: "3er Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl3.webp" }
      ],
      waDefaultText: "Hola, solicito información y disponibilidad del Modelo Studio en Torre Arbide"
    },

    "studio-max": {
      refCode: "Torre Arbide • Modelo Studio Max",
      title: "Departamento Modelo Studio Max",
      location: "Tabasco 606, Col. Bellavista / Arbide, León, Gto.",
      photosBase: "assets/fichas/mods/studiomax/",
      photos: STUDIOMAX_PHOTOS,
      units: [
        {
          id: "204",
          name: "Dpto. 204 • Nivel 2",
          sub: "88.80 m²",
          price: "$2,821,000",
          m2: "88.80 m²",
          nivel: "Nivel 2 (Piso 2)",
          levelIndex: 0,
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio Max Dpto 204 en Torre Arbide"
        },
        {
          id: "303",
          name: "Dpto. 303 • Nivel 3",
          sub: "88.80 m²",
          price: "$2,842,000",
          m2: "88.80 m²",
          nivel: "Nivel 3 (Piso 3)",
          levelIndex: 1,
          waText: "Hola, me interesa información y agendar cita para el Modelo Studio Max Dpto 303 en Torre Arbide"
        }
      ],
      specsDefault: { superficie: "88.80 m²", nivel: "Piso 2 y Piso 3" },
      staticSpecs: [
        { label: "Configuración", value: "1 Recámara Studio Max" },
        { label: "Baños", value: "1 Completo" },
        { label: "Lavandería", value: "Cuarto Cerrado" },
        { label: "Estacionamiento", value: "2 Cajones techados" }
      ],
      description: descripcionModelo("StudioMax"),
      equipment: EQUIPMENT_COMUN,
      levels: [
        { title: "2do Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl2.webp" },
        { title: "3er Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl3.webp" }
      ],
      waDefaultText: "Hola, quiero información del Modelo Studio Max en Torre Arbide"
    },

    loft: {
      refCode: "Torre Arbide • Modelo Loft",
      title: "Departamento Modelo Loft",
      location: "Tabasco 606, Col. Bellavista / Arbide, León, Gto.",
      photosBase: "assets/fichas/mods/loft/",
      photos: LOFT_PHOTOS,
      units: [
        {
          id: "201",
          name: "Dpto. 201 • Nivel 2",
          sub: "100.80 m² • Unidad Muestra",
          price: "$3,061,000",
          m2: "100.80 m²",
          nivel: "Nivel 2 (Piso 2)",
          levelIndex: 0,
          waText: "Hola, me interesa información y agendar cita para el Modelo Loft Dpto 201 en Torre Arbide"
        },
        {
          id: "401",
          name: "Dpto. 401 • Niveles 4-5",
          sub: "100.80 m² • Dúplex",
          price: "$3,259,000",
          m2: "100.80 m²",
          nivel: "Nivel 4 y 5 (Dúplex)",
          levelIndex: [1, 2],
          waText: "Hola, me interesa información y agendar cita para el Modelo Loft Dpto 401 en Torre Arbide"
        },
        {
          id: "403",
          name: "Dpto. 403 • Niveles 4-5",
          sub: "103.11 m² • Dúplex",
          price: "$3,333,000",
          m2: "103.11 m²",
          nivel: "Nivel 4 y 5 (Dúplex)",
          levelIndex: [1, 2],
          waText: "Hola, me interesa información y agendar cita para el Modelo Loft Dpto 403 en Torre Arbide"
        }
      ],
      specsDefault: { superficie: "100.80 a 103.11 m²", nivel: "Piso 2, 4 y 5" },
      staticSpecs: [
        { label: "Configuración", value: "1 Recámara Loft" },
        { label: "Baños", value: "1 Completo" },
        { label: "Lavandería", value: "Cuarto Cerrado" },
        { label: "Estacionamiento", value: "1 Cajón techado" }
      ],
      description: descripcionModelo("Loft"),
      equipment: EQUIPMENT_COMUN,
      levels: [
        { title: "2do Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl2.webp" },
        { title: "4to Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl4.webp" },
        { title: "5to Piso • Planta Arquitectónica", img: "assets/fichas/renders/RenderNvl5.webp" }
      ],
      waDefaultText: "Hola, quiero información del Modelo Loft en Torre Arbide"
    }
  };

  var WHATSAPP = "524775514226";

  /* ---------- estado ---------- */
  var currentData = null;
  var currentUnitIndex = -1;
  var galleryItems = [];
  var currentGalleryIndex = 0;
  var renderToken = 0;

  var levelTimer = null;
  var levelIndex = 0;
  var levelStatic = false;

  /* ---------- galería ---------- */
  function buildGalleryItems(data) {
    var items = [];
    (data.photos || []).forEach(function (p) {
      items.push({ src: data.photosBase + p, contain: false });
    });
    return items;
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
      galleryImg.classList.toggle("ficha-fit-contain", !!item.contain);
      galleryImg.style.opacity = "1";
    };
    temp.src = item.src;

    var thumbs = thumbsEl.querySelectorAll(".ficha-thumb");
    thumbs.forEach(function (t, i) {
      t.classList.toggle("is-active", i === index);
    });
  }

  /* ---------- especificaciones y precios ---------- */
  function renderSpecs(data, unit) {
    specsGridEl.innerHTML = "";
    var entries = [];
    if (data.specsDefault) {
      entries.push({ label: "Superficie Total", value: unit ? unit.m2 : data.specsDefault.superficie });
      entries.push({ label: "Nivel / Ubicación", value: unit ? unit.nivel : data.specsDefault.nivel });
    }
    (data.staticSpecs || []).forEach(function (s) {
      entries.push(s);
    });
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
    if (data.units && data.units.length) {
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
    } else {
      var row = document.createElement("div");
      row.className = "ficha-price-row";
      row.innerHTML =
        '<div><div class="ficha-unit-name">Precio de Referencia</div></div><div class="ficha-unit-cost">' +
        data.price +
        ' <span>MXN &bull; Desde</span></div>';
      pricingListEl.appendChild(row);
    }
  }

  function selectUnit(index) {
    currentUnitIndex = index;
    var data = currentData;
    var unit = data.units[index];

    var rows = pricingListEl.querySelectorAll(".ficha-price-row");
    rows.forEach(function (r, i) {
      r.classList.toggle("is-selected", i === index);
    });

    renderSpecs(data, unit);

    if (data.levels && data.levels.length && unit.levelIndex != null) {
      if (Array.isArray(unit.levelIndex)) {
        // Dúplex: dos niveles relevantes — se muestra el primero pero se
        // deja la navegación activa para que se pueda ver el segundo piso.
        levelStatic = false;
        stopLevelTimer();
        showLevelSlide(unit.levelIndex[0]);
        levelPrevBtn.style.display = "";
        levelNextBtn.style.display = "";
        levelDotsEl.style.display = "";
      } else {
        freezeLevelAt(unit.levelIndex);
      }
    }

    whatsappBtn.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(unit.waText);
  }

  /* ---------- descripción / equipamiento ---------- */
  function renderDescription(data) {
    if (data.description && data.description.length) {
      descriptionEl.innerHTML = data.description.map(function (p) { return "<p>" + p + "</p>"; }).join("");
      descriptionSection.hidden = false;
    } else {
      descriptionSection.hidden = true;
    }
  }

  function renderEquipment(data) {
    if (data.equipment && data.equipment.length) {
      tagsEl.innerHTML = data.equipment
        .map(function (t) { return '<span class="ficha-tag">✓ ' + t + "</span>"; })
        .join("");
      equipmentSection.hidden = false;
    } else {
      equipmentSection.hidden = true;
    }
  }

  /* ---------- carrusel de plantas / niveles ---------- */
  function showLevelSlide(i) {
    if (!currentData || !currentData.levels || !currentData.levels.length) return;
    var slides = levelSlidesEl.querySelectorAll(".ficha-level-slide");
    if (!slides.length) return;
    levelIndex = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) {
      s.classList.toggle("is-active", idx === levelIndex);
    });
    var dots = levelDotsEl.querySelectorAll(".ficha-level-dot");
    dots.forEach(function (d, idx) {
      d.classList.toggle("is-active", idx === levelIndex);
    });
    var level = currentData.levels[levelIndex];
    if (level) levelTitleEl.textContent = level.title;
  }

  function startLevelTimer() {
    if (levelStatic) return;
    stopLevelTimer();
    levelTimer = setInterval(function () {
      showLevelSlide(levelIndex + 1);
    }, 5500);
  }

  function stopLevelTimer() {
    if (levelTimer) {
      clearInterval(levelTimer);
      levelTimer = null;
    }
  }

  function freezeLevelAt(index) {
    levelStatic = true;
    stopLevelTimer();
    showLevelSlide(index);
    levelPrevBtn.style.display = "none";
    levelNextBtn.style.display = "none";
    levelDotsEl.style.display = "none";
  }

  function renderLevels(data) {
    stopLevelTimer();
    levelStatic = false;
    levelIndex = 0;
    levelSlidesEl.innerHTML = "";
    levelDotsEl.innerHTML = "";
    levelPrevBtn.style.display = "";
    levelNextBtn.style.display = "";
    levelDotsEl.style.display = "";

    if (!data.levels || !data.levels.length) {
      levelsSection.hidden = true;
      return;
    }
    levelsSection.hidden = false;

    data.levels.forEach(function (level, i) {
      var slide = document.createElement("div");
      slide.className = "ficha-level-slide" + (i === 0 ? " is-active" : "");
      slide.innerHTML = '<img src="' + level.img + '" alt="' + level.title + '">';
      levelSlidesEl.appendChild(slide);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "ficha-level-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", level.title);
      dot.addEventListener("click", function () {
        showLevelSlide(i);
        levelStatic = false;
        levelPrevBtn.style.display = "";
        levelNextBtn.style.display = "";
        levelDotsEl.style.display = "";
        startLevelTimer();
      });
      levelDotsEl.appendChild(dot);
    });

    levelTitleEl.textContent = data.levels[0].title;
    startLevelTimer();
  }

  /* ---------- render principal de la ficha ---------- */
  function renderFicha(key) {
    var data = FICHAS[key];
    if (!data) return;
    renderToken++;
    currentData = data;
    currentUnitIndex = -1;

    refCodeEl.textContent = data.refCode;
    titleEl.textContent = data.title;
    locationEl.textContent = data.location;

    renderPricing(data);
    renderSpecs(data, null);
    renderDescription(data);
    renderEquipment(data);
    renderLevels(data);

    galleryItems = buildGalleryItems(data);
    renderThumbs();
    showGalleryImage(0);

    whatsappBtn.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(data.waDefaultText);
  }

  /* ---------- apertura / cierre del modal ---------- */
  function openFicha(key, unitId) {
    if (!FICHAS[key]) return;
    renderFicha(key);
    if (unitId && currentData.units) {
      var idx = currentData.units.findIndex(function (u) { return u.id === unitId; });
      if (idx !== -1) selectUnit(idx);
    }
    modal.classList.add("is-open");
    document.body.classList.add("ficha-lock");
  }

  // Expuesta para que el visor 3D (que vive en un <iframe> aparte) pueda
  // abrir la ficha real de un departamento al hacer click en su tarjeta.
  window.openFicha = openFicha;

  function closeFicha() {
    renderToken++; // invalida cualquier carga de imagen pendiente de esta ficha
    modal.classList.remove("is-open");
    document.body.classList.remove("ficha-lock");
    lightbox.classList.remove("is-open");
    stopLevelTimer();
    levelStatic = false;
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
    showLevelSlide(levelIndex - 1);
    startLevelTimer();
  });
  levelNextBtn.addEventListener("click", function () {
    showLevelSlide(levelIndex + 1);
    startLevelTimer();
  });
  levelWrapper.addEventListener("mouseenter", stopLevelTimer);
  levelWrapper.addEventListener("mouseleave", function () {
    if (!levelStatic) startLevelTimer();
  });

  /* ---------- lightbox de pantalla completa ---------- */
  function updateLightbox() {
    lightboxImg.src = galleryItems[currentGalleryIndex].src;
    lightboxCounter.textContent = currentGalleryIndex + 1 + " / " + galleryItems.length;
  }

  galleryStage.addEventListener("click", function () {
    updateLightbox();
    lightbox.classList.add("is-open");
  });
  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("is-open");
  });
  lightboxPrev.addEventListener("click", function (e) {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
    showGalleryImage(currentGalleryIndex);
  });
  lightboxNext.addEventListener("click", function (e) {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateLightbox();
    showGalleryImage(currentGalleryIndex);
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("ficha-lightbox-content")) {
      lightbox.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") lightbox.classList.remove("is-open");
      if (e.key === "ArrowLeft") lightboxPrev.click();
      if (e.key === "ArrowRight") lightboxNext.click();
      return;
    }
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeFicha();
    }
  });
})();
