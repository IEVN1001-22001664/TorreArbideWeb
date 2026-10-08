(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero video ---------- */
  var heroVideo = document.getElementById("hero-video");
  if (heroVideo && reduced) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  /* ---------- carrusel de bienvenida (slide horizontal, una imagen a la vez) ---------- */
  var welcomeTrack = document.getElementById("welcome-media-track");

  // Detecta la orientación real de cada foto: las verticales se marcan con
  // .is-portrait para que en móvil se muestren completas (ver style.css).
  if (welcomeTrack) {
    welcomeTrack.querySelectorAll(".welcome-slide img").forEach(function (img) {
      function mark() {
        if (img.naturalHeight > img.naturalWidth) img.parentNode.classList.add("is-portrait");
      }
      if (img.complete && img.naturalWidth) mark();
      else img.addEventListener("load", mark);
    });
  }

  if (welcomeTrack && !reduced) {
    var welcomeRealSlides = welcomeTrack.children.length - 1; // excluye la copia final de la primera imagen
    var welcomeIndex = 0;
    var WELCOME_TRANSITION_MS = 1000; // debe igualar la duration de .welcome-media-track en CSS

    function welcomeGoTo(i) {
      welcomeTrack.style.transform = "translateX(-" + (i * 100) + "%)";
    }

    // No depende de "transitionend" (se puede perder si la pestaña queda en
    // segundo plano) — el reinicio del loop se agenda con su propio temporizador.
    setInterval(function () {
      welcomeIndex++;
      welcomeGoTo(welcomeIndex);
      if (welcomeIndex >= welcomeRealSlides) {
        setTimeout(function () {
          welcomeTrack.classList.add("no-transition");
          welcomeIndex = 0;
          welcomeGoTo(welcomeIndex);
          welcomeTrack.offsetHeight; // fuerza a aplicar el salto sin transición antes de restaurarla
          welcomeTrack.classList.remove("no-transition");
        }, WELCOME_TRANSITION_MS);
      }
    }, 4000);
  }

  /* ---------- carruseles de fotos en las tarjetas de Departamentos ---------- */
  if (!reduced) {
    document.querySelectorAll(".unit-visual-track").forEach(function (track) {
      var realSlides = track.children.length - 1; // excluye la copia final de la primera imagen
      if (realSlides < 2) return;
      var index = 0;
      var TRANSITION_MS = 1000; // debe igualar la duration de .unit-visual-track en CSS

      function goTo(i) {
        track.style.transform = "translateX(-" + (i * 100) + "%)";
      }

      setInterval(function () {
        index++;
        goTo(index);
        if (index >= realSlides) {
          setTimeout(function () {
            track.classList.add("no-transition");
            index = 0;
            goTo(index);
            track.offsetHeight;
            track.classList.remove("no-transition");
          }, TRANSITION_MS);
        }
      }, 4000);
    });
  }

  /* ---------- visor 3D: carga bajo demanda + candado de interacción ----------
     El modelo pesa decenas de MB: el <iframe> NO recibe su src hasta que la persona
     toca "Toca para interactuar". Así, quien solo recorre la página no descarga nada
     del visor (antes cada visita bajaba ~44 MB aunque nunca llegara a esa sección).
     En celular, al activarlo el visor ocupa toda la pantalla (ver style.css). */
  var visorFrame = document.getElementById("visor-3d-frame");
  var visorActivate = document.getElementById("visor-3d-activate");
  var visorIframe = visorFrame ? visorFrame.querySelector("iframe[data-src]") : null;
  var visorNote = document.getElementById("visor-3d-note");
  var visorMovil = function () { return window.matchMedia("(max-width:900px)").matches; };

  if (visorFrame && visorActivate && visorIframe) {
    if (visorNote) visorNote.textContent = visorMovil() ? "Se descargan unos 9 MB" : "Se descargan unos 19 MB";

    var cargarVisor3d = function () {
      if (!visorIframe.getAttribute("src")) visorIframe.src = visorIframe.getAttribute("data-src");
    };
    var activarVisor3d = function () {
      cargarVisor3d();
      visorFrame.classList.add("is-active");
      document.body.classList.add("visor-3d-lock");
      // En celular el visor es pantalla completa: el botón "atrás" lo cierra en vez de salir del sitio.
      if (visorMovil()) {
        try { history.pushState({ visor3d: 1 }, ""); } catch (e) { /* sin historial: no es crítico */ }
      }
    };
    var salirVisor3d = function (desdeHistorial) {
      if (!visorFrame.classList.contains("is-active")) return;
      visorFrame.classList.remove("is-active");
      document.body.classList.remove("visor-3d-lock");
      if (desdeHistorial !== true && history.state && history.state.visor3d) history.back();
    };
    visorActivate.addEventListener("click", activarVisor3d);
    window.addEventListener("popstate", function () { salirVisor3d(true); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && visorFrame.classList.contains("is-active")) {
        salirVisor3d();
      }
    });
    // Expuesta para que el botón "Salir" dentro del <iframe> del visor 3D
    // (junto a "Ver edificio completo") pueda cerrarlo desde ahí.
    window.salirVisor3d = salirVisor3d;

    // Pausa el dibujo del visor cuando sale de pantalla (ahorra batería/CPU).
    if ("IntersectionObserver" in window) {
      var visorVisible = true;
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible === visorVisible) return;
        visorVisible = visible;
        try {
          if (visorIframe.contentWindow) {
            visorIframe.contentWindow.postMessage({ visor3d: visible ? "visible" : "hidden" }, window.location.origin);
          }
        } catch (e) { /* iframe aún sin cargar */ }
      }, { threshold: 0.05 }).observe(visorFrame);
    }
  }

  /* ---------- sticky nav background ---------- */
  var nav = document.getElementById("site-nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- reveal on scroll ---------- */
  var scrollEls = document.querySelectorAll(".reveal-scroll");
  if (scrollEls.length) {
    if (!reduced && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      scrollEls.forEach(function (el) { io.observe(el); });
    } else {
      scrollEls.forEach(function (el) { el.classList.add("in-view"); });
    }
  }

  /* ---------- galería interactiva (rueda circular) ---------- */
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function galleryCategory(folder, prefix, count, category, alt, ext) {
    var list = [];
    for (var i = 1; i <= count; i++) {
      list.push({ src: "assets/galeria/" + folder + "/" + prefix + "_" + pad2(i) + "." + (ext || "jpg"), category: category, alt: alt });
    }
    return list;
  }

  var GALLERY_IMAGES = []
    .concat(galleryCategory("aereas", "galeria_entorno", 12, "aereas", "Torre Arbide - Entorno"))
    .concat([
      { src: 'assets/galeria/amenidades/galeria_amenidades_01.jpeg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
      { src: 'assets/galeria/amenidades/galeria_amenidades_02.jpeg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
      { src: 'assets/galeria/amenidades/galeria_amenidades_03.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
      { src: 'assets/galeria/amenidades/galeria_amenidades_04.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
      { src: 'assets/galeria/amenidades/galeria_amenidades_05.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
      { src: 'assets/galeria/amenidades/galeria_amenidades_06.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
      { src: 'assets/galeria/amenidades/galeria_amenidades_07.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' }
    ])
    .concat(galleryCategory("areas-comunes", "galeria_estacionamiento", 24, "areas-comunes", "Torre Arbide - Cochera y Recepción"))
    .concat(galleryCategory("departamentos/studio", "galeria_studio", 63, "studio", "Torre Arbide - Studio"))
    .concat(galleryCategory("departamentos/studioMax", "galeria_studioMax", 35, "studiomax", "Torre Arbide - Studio Max"))
    .concat(galleryCategory("departamentos/loft", "galeria_loft", 67, "loft", "Torre Arbide - Loft"));

  var arcEl = document.getElementById("gallery-arc");
  if (arcEl) {
    var emptyEl = document.getElementById("gallery-empty");
    var pills = document.querySelectorAll(".filter-pill");
    var subfiltersEl = document.getElementById("gallery-subfilters");
    var DEPARTAMENTOS_FAMILY = ["departamentos", "studio", "studiomax", "loft"];
    var prevBtn = document.getElementById("gallery-prev");
    var nextBtn = document.getElementById("gallery-next");
    var previewImg = document.getElementById("gallery-preview-img");
    var modelInfoEl = document.getElementById("gallery-model-info");

    // Mismos datos ya usados en la ficha de cada modelo (js/ficha-modelo.js).
    var MODEL_INFO = {
      studio: { nombre: "Studio", superficie: "70.12 a 70.90 m²", desde: "$2,323,000" },
      studiomax: { nombre: "Studio Max", superficie: "88.80 m²", desde: "$2,821,000" },
      loft: { nombre: "Loft", superficie: "100.80 a 103.11 m²", desde: "$3,061,000" }
    };

    function onSingleAndDoubleClick(el, onSingle, onDouble) {
      var timer = null;
      var pending = false;
      el.addEventListener("click", function (e) {
        if (pending) {
          pending = false;
          clearTimeout(timer);
          onDouble(e);
        } else {
          pending = true;
          timer = setTimeout(function () {
            pending = false;
            onSingle(e);
          }, 300);
        }
      });
    }

    function onSingleTap(el, callback) {
      el.addEventListener("click", callback);
    }

    var HALF_WINDOW = 4;
    var SLOT_COUNT = HALF_WINDOW * 2 + 1;
    var ANGLE_STEP = 11;
    var RADIUS = 360;

    var currentList = [];
    var activeFilter = "aereas";
    var center = 0;
    var slots = [];

    function wrapIndex(i, n) {
      return ((i % n) + n) % n;
    }

    function updateSlotImage(slot) {
      var n = currentList.length;
      var wrapped = wrapIndex(slot.absIndex, n);
      var item = currentList[wrapped];
      slot.img.src = item.src;
      slot.img.alt = item.alt;
      slot.el.setAttribute("aria-label", item.alt);
      slot.el.dataset.wrapped = wrapped;
    }

    function updatePreview(overrideIndex) {
      var n = currentList.length;
      if (!n) return;
      var idx = (typeof overrideIndex === "number") ? overrideIndex : center;
      var item = currentList[wrapIndex(idx, n)];
      previewImg.classList.remove("is-loaded");
      previewImg.onload = function () { previewImg.classList.add("is-loaded"); };
      previewImg.src = item.src;
      previewImg.alt = item.alt;
    }

    var MAX_ANGLE_RAD = (HALF_WINDOW * ANGLE_STEP * Math.PI) / 180;
    var MAX_DEPTH = RADIUS * (1 - Math.cos(MAX_ANGLE_RAD));

    function positionAllSlots(overrideCenter) {
      var effectiveCenter = (typeof overrideCenter === "number") ? overrideCenter : center;
      var arcWidth = arcEl.clientWidth;
      var cardWidth = slots.length ? slots[0].el.offsetWidth : 190;
      var halfArc = arcWidth / 2;

      slots.forEach(function (slot) {
        var relPos = slot.absIndex - effectiveCenter;
        var angleDeg = relPos * ANGLE_STEP;
        var angleRad = (angleDeg * Math.PI) / 180;
        var x = RADIUS * Math.sin(angleRad);
        var depth = MAX_DEPTH - RADIUS * (1 - Math.cos(angleRad));
        var absRel = Math.abs(relPos);
        var opacity = absRel >= HALF_WINDOW ? 0 : 1 - Math.pow(absRel / HALF_WINDOW, 1.6);

        slot.el.style.left = (halfArc + x - cardWidth / 2) + "px";
        slot.el.style.top = depth + "px";
        slot.el.style.zIndex = Math.round((HALF_WINDOW - absRel) * 10);
        slot.el.style.opacity = opacity;
        var interactive = opacity > 0.05;
        slot.el.style.pointerEvents = interactive ? "auto" : "none";
        slot.el.tabIndex = interactive ? 0 : -1;
      });
    }

    function buildSlots() {
      arcEl.innerHTML = "";
      slots = [];
      for (let k = 0; k < SLOT_COUNT; k++) {
        let card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-card";

        let img = document.createElement("img");
        img.loading = "lazy";
        card.appendChild(img);

        let slot = { el: card, img: img, absIndex: k - HALF_WINDOW };

        onSingleAndDoubleClick(
          card,
          function () { jumpTo(slot.absIndex); },
          function () { openLightbox(wrapIndex(slot.absIndex, currentList.length)); }
        );

        arcEl.appendChild(card);

        slots.push(slot);
        updateSlotImage(slot);
      }
      positionAllSlots();
      updatePreview();
    }

    function navigate(dir) {
      center += dir;
      slots.forEach(function (slot) {
        var relPos = slot.absIndex - center;
        if (relPos < -HALF_WINDOW) {
          slot.absIndex = center + HALF_WINDOW;
          updateSlotImage(slot);
        } else if (relPos > HALF_WINDOW) {
          slot.absIndex = center - HALF_WINDOW;
          updateSlotImage(slot);
        }
      });
      positionAllSlots();
      updatePreview();
    }

    function reassignSlots(targetIndex) {
      var desired = [];
      for (var k = -HALF_WINDOW; k <= HALF_WINDOW; k++) desired.push(targetIndex + k);

      var stillNeeded = desired.slice();
      var freeSlots = [];

      slots.forEach(function (slot) {
        var pos = stillNeeded.indexOf(slot.absIndex);
        if (pos !== -1) {
          stillNeeded.splice(pos, 1);
        } else {
          freeSlots.push(slot);
        }
      });

      freeSlots.forEach(function (slot, i) {
        slot.absIndex = stillNeeded[i];
        updateSlotImage(slot);
      });
    }

    function jumpTo(targetAbsIndex) {
      if (targetAbsIndex === center) return;
      reassignSlots(targetAbsIndex);
      center = targetAbsIndex;
      positionAllSlots();
      updatePreview();
    }

    function renderGallery() {
      currentList = activeFilter === "todas"
        ? GALLERY_IMAGES
        : activeFilter === "departamentos"
          ? GALLERY_IMAGES.filter(function (item) { return DEPARTAMENTOS_FAMILY.indexOf(item.category) !== -1; })
          : GALLERY_IMAGES.filter(function (item) { return item.category === activeFilter; });

      var info = MODEL_INFO[activeFilter];
      if (info) {
        modelInfoEl.textContent = "Modelo " + info.nombre + " · Superficie " + info.superficie + " · Precios desde " + info.desde;
        modelInfoEl.hidden = false;
      } else {
        modelInfoEl.hidden = true;
      }

      center = 0;

      if (!currentList.length) {
        arcEl.hidden = true;
        emptyEl.hidden = false;
        prevBtn.hidden = true;
        nextBtn.hidden = true;
        return;
      }
      arcEl.hidden = false;
      emptyEl.hidden = true;
      prevBtn.hidden = false;
      nextBtn.hidden = false;

      buildSlots();
    }

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        activeFilter = pill.dataset.filter;
        pills.forEach(function (p) {
          p.classList.toggle("is-active", p.dataset.filter === activeFilter);
        });
        subfiltersEl.hidden = DEPARTAMENTOS_FAMILY.indexOf(activeFilter) === -1;
        renderGallery();
      });
    });

    prevBtn.addEventListener("click", function () { navigate(-1); });
    nextBtn.addEventListener("click", function () { navigate(1); });

    var resizeTicking = false;
    window.addEventListener("resize", function () {
      if (resizeTicking) return;
      resizeTicking = true;
      requestAnimationFrame(function () {
        if (slots.length) positionAllSlots();
        resizeTicking = false;
      });
    });

    /* ---------- arrastre libre del carrusel (mouse / touch) ---------- */
    var DRAG_PX_PER_STEP = 130;
    var visualCenter = center;
    var isDragging = false;
    var dragPointerId = null;
    var dragStartX = 0;
    var dragStartCenter = 0;
    var dragMoved = false;
    var dragSyncedIndex = center;
    var dragRafPending = false;

    function onDragStart(e) {
      if (!slots.length || (e.pointerType === "mouse" && e.button !== 0)) return;
      isDragging = true;
      dragMoved = false;
      dragPointerId = e.pointerId;
      dragStartX = e.clientX;
      dragStartCenter = center;
      visualCenter = center;
      dragSyncedIndex = center;
      arcEl.classList.add("is-dragging");
      try { arcEl.setPointerCapture(dragPointerId); } catch (err) {}
    }

    function onDragMove(e) {
      if (!isDragging || e.pointerId !== dragPointerId) return;
      var deltaX = e.clientX - dragStartX;
      if (Math.abs(deltaX) > 4) dragMoved = true;
      visualCenter = dragStartCenter - deltaX / DRAG_PX_PER_STEP;
      if (dragRafPending) return;
      dragRafPending = true;
      requestAnimationFrame(function () {
        dragRafPending = false;
        if (!isDragging) return;
        var rounded = Math.round(visualCenter);
        if (rounded !== dragSyncedIndex) {
          reassignSlots(rounded);
          dragSyncedIndex = rounded;
          updatePreview(rounded);
        }
        positionAllSlots(visualCenter);
      });
    }

    function endDrag(e) {
      if (!isDragging || (e && e.pointerId !== dragPointerId)) return;
      isDragging = false;
      arcEl.classList.remove("is-dragging");
      center = Math.round(visualCenter);
      visualCenter = center;
      reassignSlots(center);
      positionAllSlots();
      updatePreview();
    }

    arcEl.addEventListener("pointerdown", onDragStart);
    arcEl.addEventListener("pointermove", onDragMove);
    arcEl.addEventListener("pointerup", endDrag);
    arcEl.addEventListener("pointercancel", endDrag);
    arcEl.addEventListener("click", function (e) {
      if (dragMoved) {
        e.stopPropagation();
        dragMoved = false;
      }
    }, true);

    /* ---------- lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");
    var lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      updateLightbox();
      lightbox.hidden = false;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          lightbox.classList.add("is-visible");
        });
      });
    }
    function updateLightbox() {
      var item = currentList[lbIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
    }
    function closeLightbox() {
      lightbox.classList.remove("is-visible");
      setTimeout(function () { lightbox.hidden = true; }, 300);
    }
    function stepLightbox(dir) {
      lbIndex = (lbIndex + dir + currentList.length) % currentList.length;
      updateLightbox();
    }

    onSingleTap(previewImg, function () {
      openLightbox(wrapIndex(center, currentList.length));
    });

    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-prev").addEventListener("click", function () { stepLightbox(-1); });
    document.getElementById("lightbox-next").addEventListener("click", function () { stepLightbox(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });

    renderGallery();
  }

  /* ---------- lightbox de "Nosotros" (fotos reales de Constructora Simacon) ---------- */
  var nosotrosLightbox = document.getElementById("nosotros-lightbox");
  if (nosotrosLightbox) {
    var nosotrosPhotoButtons = document.querySelectorAll(".nosotros-photo");
    var nlImg = document.getElementById("nosotros-lightbox-img");
    var nlIndex = 0;

    function nlUpdate() {
      var btn = nosotrosPhotoButtons[nlIndex];
      var img = btn.querySelector("img");
      nlImg.src = img.src;
      nlImg.alt = img.alt;
    }
    function nlOpen(i) {
      nlIndex = i;
      nlUpdate();
      nosotrosLightbox.hidden = false;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { nosotrosLightbox.classList.add("is-visible"); });
      });
    }
    function nlClose() {
      nosotrosLightbox.classList.remove("is-visible");
      setTimeout(function () { nosotrosLightbox.hidden = true; }, 300);
    }
    function nlStep(dir) {
      nlIndex = (nlIndex + dir + nosotrosPhotoButtons.length) % nosotrosPhotoButtons.length;
      nlUpdate();
    }

    nosotrosPhotoButtons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { nlOpen(i); });
    });
    document.getElementById("nosotros-lightbox-close").addEventListener("click", nlClose);
    document.getElementById("nosotros-lightbox-prev").addEventListener("click", function () { nlStep(-1); });
    document.getElementById("nosotros-lightbox-next").addEventListener("click", function () { nlStep(1); });
    nosotrosLightbox.addEventListener("click", function (e) {
      if (e.target === nosotrosLightbox) nlClose();
    });
    document.addEventListener("keydown", function (e) {
      if (nosotrosLightbox.hidden) return;
      if (e.key === "Escape") nlClose();
      if (e.key === "ArrowLeft") nlStep(-1);
      if (e.key === "ArrowRight") nlStep(1);
    });
  }

  /* ---------- mapa interactivo de ubicación ---------- */
  var mapEl = document.getElementById("map");
  if (mapEl && typeof L !== "undefined") {
    var TORRE = {
      nombre: "Torre Arbide",
      lat: 21.121367854829508,
      lng: -101.69424102283388,
      imagenIcono: "assets/logo-mark-white.svg"
    };

    // Logos reales de los negocios vecinos (assets propios del sitio).
    var ICONOS = {
      santander: "assets/iconos/SANTANDER.png",
      banamex: "assets/iconos/BANAMEX.png",
      bbva: "assets/iconos/BBVA.png",
      banbajio: "assets/iconos/BANBAJIO.png",
      banorte: "assets/iconos/BANORTE.png",
      valero: "assets/iconos/VALERO.png",
      hsbc: "assets/iconos/HSBC.png",
      oxxo: "assets/iconos/OXXO.png",
      farmacia: "assets/iconos/GUADALAJARA.png",
      dominos: "assets/iconos/DOMINOS.png",
      caffenio: "assets/iconos/CAFEINO.png"
    };

    // Puntos de interés reales, a unos pasos de Torre Arbide y en la ciudad. Los que
    // traen streetViewEmbed ya tienen su Street View; el resto queda vacío hasta que se genere su link
    // (Google Maps → clic derecho → "Compartir o insertar mapa" → "Insertar
    // un mapa" → copiar el src del iframe).
    var PUNTOS_DE_INTERES = [
      { id: "santander", nombre: "Santander", categoria: "Financiera", icono: ICONOS.santander,
        lat: 21.12186665790666, lng: -101.69432375483424,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1790089995811!6m8!1m7!1sdI3RGhWigAjla0NaO-9liQ!2m2!1d21.12198970614782!2d-101.6944770722062!3f133.02502660245599!4f2.4303822284732917!5f1.1230999101046981" },
      { id: "banamex", nombre: "Banamex", categoria: "Financiera", icono: ICONOS.banamex,
        lat: 21.122210206251495, lng: -101.69459648006098,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1790090052856!6m8!1m7!1sWiIRHbAyaH3K5IMNXB1d-Q!2m2!1d21.12215797308117!2d-101.6944881905261!3f323.25811578380984!4f7.705344649777459!5f0.7820865974627469" },
      { id: "bbva", nombre: "BBVA", categoria: "Financiera", icono: ICONOS.bbva,
        lat: 21.121762208592443, lng: -101.69471696590986,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1790090088403!6m8!1m7!1sn8P9Qpt5A1k_PO0AULgAPg!2m2!1d21.12146439333311!2d-101.694658700534!3f294.7346476753087!4f13.188192211784624!5f0.7820865974627469" },
      { id: "banbajio", nombre: "BanBajío", categoria: "Financiera", icono: ICONOS.banbajio,
        lat: 21.121466413016556, lng: -101.69440159080092,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1790090122071!6m8!1m7!1svM3XrtQRu0hjmvBOuz6YWg!2m2!1d21.1213551921156!2d-101.6945660187986!3f50.25626020298566!4f6.9931382674576525!5f1.227988510754158" },
      { id: "banorte", nombre: "Banorte", categoria: "Financiera", icono: ICONOS.banorte,
        lat: 21.122188446032975, lng: -101.69430444855233,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1790090242643!6m8!1m7!1sWiIRHbAyaH3K5IMNXB1d-Q!2m2!1d21.12215797308117!2d-101.6944881905261!3f72.32486885629194!4f1.4368111887287682!5f1.7605405380141321" },
      { id: "valero", nombre: "Valero", categoria: "Gasolinera", icono: ICONOS.valero,
        lat: 21.12296677832872, lng: -101.69390101703728,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1790090282108!6m8!1m7!1s-KfFVz1yHr4F-Krzc-MQ3w!2m2!1d21.12297898538805!2d-101.6942539243028!3f106.02699804908185!4f8.464517246761673!5f0.7820865974627469" },
      { id: "hsbc", nombre: "HSBC", categoria: "Financiera", icono: ICONOS.hsbc,
        lat: 21.123303089452072, lng: -101.69424363655656, streetViewEmbed: "" },
      { id: "oxxo-1", nombre: "OXXO", categoria: "Servicios", icono: ICONOS.oxxo,
        lat: 21.123166863336575, lng: -101.69387664290882, streetViewEmbed: "" },
      { id: "oxxo-2", nombre: "OXXO", categoria: "Servicios", icono: ICONOS.oxxo,
        lat: 21.120789269693443, lng: -101.69498577955541, streetViewEmbed: "" },
      { id: "farmacia", nombre: "Super Farmacia", categoria: "Servicios", icono: ICONOS.farmacia,
        lat: 21.120678253737406, lng: -101.69468069091704, streetViewEmbed: "" },
      { id: "dominos", nombre: "Domino's", categoria: "Restaurantes", icono: ICONOS.dominos,
        lat: 21.120435012202794, lng: -101.69477638199538, streetViewEmbed: "" },
      { id: "caffenio", nombre: "Caffenio", categoria: "Restaurantes", icono: ICONOS.caffenio,
        lat: 21.120260196276046, lng: -101.69511522070262, streetViewEmbed: "" },

      // Puntos de interés de la ciudad (más lejanos; se ven al alejar el mapa).
      { id: "plaza-mayor", nombre: "Plaza Mayor", categoria: "Centro comercial", icono: "🛍️",
        lat: 21.1578, lng: -101.69519,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791395526187!6m8!1m7!1sI6G1tq4un4fXSPsrppCbhA!2m2!1d21.1564493120381!2d-101.6933739323153!3f307.8727387385659!4f-1.3089152861244457!5f0.7820865974627469" },
      { id: "parque-metropolitano", nombre: "Parque Metropolitano", categoria: "Parque", icono: "🌳",
        lat: 21.17323, lng: -101.68672,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791395570072!6m8!1m7!1sDe5eelcFY0MXMwdOcUfkPg!2m2!1d21.1731459434436!2d-101.6866320041995!3f1.5904975071421745!4f-1.7654444739305575!5f0.7820865974627469" },
      { id: "parque-chapalita", nombre: "Parque Chapalita", categoria: "Parque", icono: "🌳",
        lat: 21.12539, lng: -101.70032,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791395731311!6m8!1m7!1sg_YP0FRfQg6fRfZGelBU5A!2m2!1d21.12674147442902!2d-101.7005809480319!3f189.49354796838628!4f10.76846919588985!5f0.7820865974627469" },
      { id: "hospital-aranda", nombre: "Hospital Aranda de la Parra", categoria: "Salud", icono: "🏥",
        lat: 21.12558, lng: -101.68158,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791395842837!6m8!1m7!1sJ4R2Q4qVwOERhVly7BQLiQ!2m2!1d21.12546683799964!2d-101.6816682548064!3f8.579885303770766!4f32.93554782850309!5f0.7820865974627469" },
      { id: "centro-historico", nombre: "Centro histórico", categoria: "Cultura y turismo", icono: "🏛️",
        lat: 21.12185, lng: -101.68252,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791395899098!6m8!1m7!1sySvOf5dNTKDfYPw4T2c-vw!2m2!1d21.12186459812066!2d-101.682456345242!3f125.70053964637641!4f9.88181498578001!5f0.7820865974627469" },
      { id: "imss-umae1", nombre: "IMSS UMAE 1", categoria: "Salud", icono: "🏥",
        lat: 21.13976, lng: -101.68713,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791398313743!6m8!1m7!1sub41HRMfJjVvdTQhDLjdqQ!2m2!1d21.13945443144427!2d-101.6864290235309!3f269.53356051040106!4f10.721825687167296!5f0.7820865974627469" },
      { id: "parque-hidalgo", nombre: "Parque Hidalgo", categoria: "Parque", icono: "🌳",
        lat: 21.13197, lng: -101.68935,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791398498050!6m8!1m7!1sQYmgkxjiWeiACyOsRLoRLw!2m2!1d21.13124449555847!2d-101.6892157213266!3f39.62312252999646!4f7.801476259570848!5f0.7820865974627469" },
      { id: "universidad-leon", nombre: "Universidad de León", categoria: "Educación", icono: "🎓",
        lat: 21.120872110687994, lng: -101.68516455073187,
        streetViewEmbed: "https://www.google.com/maps/embed?pb=!4v1791398649011!6m8!1m7!1sfK5lPQoyqbomNgU_TbBuEA!2m2!1d21.12063700870182!2d-101.6849736020878!3f291.2460570156614!4f24.7205651292346!5f0.7820865974627469" }
    ];

    // Descripción breve de cada lugar (se muestra sobre "Ruta hacia Torre Arbide").
    var DESCRIPCIONES_POI = {
      "santander": "Sucursal bancaria con atención a clientes, cajeros automáticos y servicios financieros.",
      "banamex": "Sucursal bancaria con atención a clientes, cajeros automáticos y servicios financieros.",
      "bbva": "Sucursal bancaria con atención a clientes, cajeros automáticos y servicios financieros.",
      "banbajio": "Sucursal bancaria con atención a clientes, cajeros automáticos y servicios financieros.",
      "banorte": "Sucursal bancaria con atención a clientes, cajeros automáticos y servicios financieros.",
      "hsbc": "Sucursal bancaria con atención a clientes, cajeros automáticos y servicios financieros.",
      "valero": "Estación de servicio para cargar combustible, a unos pasos de Torre Arbide.",
      "oxxo-1": "Tienda de conveniencia abierta 24/7. Venta de abarrotes, snacks, bebidas, café y pago de servicios/depósitos bancarios.",
      "oxxo-2": "Tienda de conveniencia abierta 24/7. Venta de abarrotes, snacks, bebidas, café y pago de servicios/depósitos bancarios.",
      "farmacia": "Farmacia con venta de medicamentos y artículos de cuidado personal y de salud.",
      "dominos": "Pizzería con servicio a domicilio y para llevar.",
      "caffenio": "Cafetería de café mexicano con bebidas frías y calientes, alimentos y un espacio para trabajar o convivir.",
      "plaza-mayor": "Centro comercial con tiendas, restaurantes, cines y áreas de entretenimiento.",
      "parque-metropolitano": "Área natural con un embalse, área de juegos para niños y actividades como acampar, ciclismo y paseos en bote.",
      "parque-chapalita": "Parque con áreas verdes y andadores para caminar, hacer ejercicio y convivir al aire libre.",
      "hospital-aranda": "Hospital privado con consulta de especialidades, urgencias y servicios médicos.",
      "centro-historico": "Corazón histórico de León: plazas, portales, la Catedral Basílica, templos, museos, cafés y restaurantes.",
      "imss-umae1": "Hospital de alta especialidad del IMSS, referencia médica de tercer nivel para la región Bajío.",
      "parque-hidalgo": "Parque urbano con áreas verdes y andadores para pasear, hacer ejercicio y convivir.",
      "universidad-leon": "Universidad privada con oferta de bachillerato, licenciaturas y posgrados."
    };

    // Detecta si "icono" es una imagen (logo real: URL, base64 o ruta local
    // del propio sitio) o un emoji/texto simple, y arma el <img> si aplica.
    function renderIcono(icono) {
      if (typeof icono !== "string") return icono;
      var esImagen =
        /^(https?:\/\/|data:image\/)/.test(icono) ||
        /\.(png|jpe?g|svg|webp|gif)(\?.*)?$/i.test(icono);
      return esImagen ? '<img src="' + icono + '" alt="" />' : icono;
    }

    // Zoom inicial centrado en la torre; overzoom controlado más allá de la
    // resolución nativa de los tiles (16) hasta 19, permitiendo acercarse más
    // a costa de perder nitidez.
    var ZOOM_INICIAL = 17;
    var ZOOM_NATIVO_MAPA = 16;
    var ZOOM_MAX_MAPA = 19;

    // Vista inicial: panorámica de la zona (zoom 13) con la torre y los puntos
    // de interés de la ciudad a la vista; en pantallas angostas un nivel más alejada.
    var VISTA_INICIAL_CENTRO = [21.1355, -101.6824];
    function zoomVistaInicial() {
      return document.getElementById("map").clientWidth < 640 ? 12 : 13;
    }
    function irAVistaInicial() {
      map.setView(VISTA_INICIAL_CENTRO, zoomVistaInicial());
    }

    var map = L.map("map", { zoomControl: true, maxZoom: ZOOM_MAX_MAPA }).setView(VISTA_INICIAL_CENTRO, zoomVistaInicial());

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ',
      maxNativeZoom: ZOOM_NATIVO_MAPA,
      maxZoom: ZOOM_MAX_MAPA
    }).addTo(map);

    // Escalado dinámico de íconos según el zoom, a partir de los tamaños que
    // ya usa el sitio (torre 46px / poi 34px, ver .torre-marker y .poi-marker
    // en style.css). Los POI crecen hasta 160% al zoom máximo y se achican
    // hacia un mínimo legible al alejarse; la torre hace lo opuesto: se
    // mantiene en su tamaño normal cerca, y crece al alejarse para seguir
    // siendo el punto de referencia dominante.
    var ICONO_POI_TAMANO_BASE = 34;
    var ICONO_POI_TAMANO_MAX = Math.round(ICONO_POI_TAMANO_BASE * 1.6);
    var ICONO_POI_TAMANO_MIN = 20;
    var ZOOM_MIN_ESCALADO = 12;

    var TORRE_TAMANO_BASE = 46;
    var TORRE_TAMANO_MAX_ZOOMOUT = 70;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp01(t) { return Math.max(0, Math.min(1, t)); }

    function tamanoPOI(zoom) {
      if (zoom >= ZOOM_INICIAL) {
        var t = clamp01((zoom - ZOOM_INICIAL) / (ZOOM_MAX_MAPA - ZOOM_INICIAL));
        return Math.round(lerp(ICONO_POI_TAMANO_BASE, ICONO_POI_TAMANO_MAX, t));
      }
      var t2 = clamp01((zoom - ZOOM_MIN_ESCALADO) / (ZOOM_INICIAL - ZOOM_MIN_ESCALADO));
      return Math.round(lerp(ICONO_POI_TAMANO_MIN, ICONO_POI_TAMANO_BASE, t2));
    }

    function tamanoTorre(zoom) {
      if (zoom >= ZOOM_INICIAL) return TORRE_TAMANO_BASE;
      var t = clamp01((zoom - ZOOM_MIN_ESCALADO) / (ZOOM_INICIAL - ZOOM_MIN_ESCALADO));
      return Math.round(lerp(TORRE_TAMANO_MAX_ZOOMOUT, TORRE_TAMANO_BASE, t));
    }

    function crearIconoTorre(size) {
      var imgSize = Math.round(size * (22 / 46));
      return L.divIcon({
        className: "",
        html: '<div class="torre-marker" style="width:' + size + "px;height:" + size + 'px;">' +
          '<img src="' + TORRE.imagenIcono + '" alt="' + TORRE.nombre + '" style="width:' + imgSize + "px;height:" + imgSize + 'px;"/></div>',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size * 0.867]
      });
    }

    function crearIconoPOI(poi, size) {
      var borderWidth = Math.max(2, Math.round(size * (2 / 34)));
      var fontSize = Math.round(size * (16 / 34));
      return L.divIcon({
        className: "",
        html: '<div class="poi-marker" style="width:' + size + "px;height:" + size + "px;border-width:" + borderWidth + "px;font-size:" + fontSize + 'px;">' + renderIcono(poi.icono) + "</div>",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    }

    var torreMarker = L.marker([TORRE.lat, TORRE.lng], { icon: crearIconoTorre(tamanoTorre(map.getZoom())) })
      .addTo(map)
      .bindPopup("<strong>" + TORRE.nombre + "</strong><br>Tu nuevo hogar");

    var poiMarkers = {};

    PUNTOS_DE_INTERES.forEach(function (poi) {
      var marker = L.marker([poi.lat, poi.lng], { icon: crearIconoPOI(poi, tamanoPOI(map.getZoom())) })
        .addTo(map)
        .bindPopup("<strong>" + poi.nombre + "</strong>");

      marker.on("click", function () { calcularRuta(poi); });
      poiMarkers[poi.id] = marker;
    });

    map.on("zoomend", function () {
      var zoom = map.getZoom();
      torreMarker.setIcon(crearIconoTorre(tamanoTorre(zoom)));
      PUNTOS_DE_INTERES.forEach(function (poi) {
        poiMarkers[poi.id].setIcon(crearIconoPOI(poi, tamanoPOI(zoom)));
      });
    });

    /* ---------- panel lateral: estado vacío / detalle ---------- */
    var poiPanelEl = document.querySelector(".poi-panel");
    var poiEmptyEl = document.getElementById("poi-empty");
    var poiDetailEl = document.getElementById("poi-detail");
    var poiActivo = null;

    function mostrarDetallePOI(poi) {
      poiEmptyEl.style.display = "none";
      poiDetailEl.classList.add("show");
      poiPanelEl.classList.add("has-selection"); // en móvil, el panel solo aparece tras seleccionar un punto

      document.getElementById("detail-icon").innerHTML = renderIcono(poi.icono);
      document.getElementById("detail-name").textContent = poi.nombre;
      document.getElementById("detail-categoria").textContent = poi.categoria || "";

      var descEl = document.getElementById("detail-desc");
      var descripcion = DESCRIPCIONES_POI[poi.id] || "";
      descEl.textContent = descripcion;
      descEl.hidden = !descripcion;

      var fotoEl = document.getElementById("detail-foto");
      if (poi.foto) {
        fotoEl.src = poi.foto;
        fotoEl.style.display = "block";
      } else {
        fotoEl.style.display = "none";
      }
    }

    function cerrarDetallePOI() {
      poiDetailEl.classList.remove("show");
      map.closePopup();
      poiEmptyEl.style.display = "";
      poiPanelEl.classList.remove("has-selection");
      poiActivo = null;
      if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
      }
      document.getElementById("poi-result").hidden = true;
      irAVistaInicial();
    }
    document.getElementById("btn-volver").addEventListener("click", cerrarDetallePOI);
    document.getElementById("poi-close").addEventListener("click", cerrarDetallePOI);

    /* ---------- listado de puntos de interés (visible sin selección) ---------- */
    var poiListEl = document.getElementById("poi-list");
    var poiMinutos = {};

    function etiquetaMinutos(poi) {
      var m = poiMinutos[poi.id];
      return m ? "a " + m + " min de Torre Arbide" : poi.categoria || "";
    }

    function renderListaPOI() {
      var ordenados = PUNTOS_DE_INTERES.slice().sort(function (a, b) {
        var ma = poiMinutos[a.id] || Infinity;
        var mb = poiMinutos[b.id] || Infinity;
        return ma - mb;
      });
      poiListEl.innerHTML = "";
      ordenados.forEach(function (poi) {
        var item = document.createElement("button");
        item.type = "button";
        item.className = "poi-item";
        item.innerHTML =
          '<span class="poi-item-icon">' + renderIcono(poi.icono) + "</span>" +
          '<span><span class="poi-item-name"></span><span class="poi-item-sub" style="display:block"></span></span>';
        item.querySelector(".poi-item-name").textContent = poi.nombre;
        item.querySelector(".poi-item-sub").textContent = etiquetaMinutos(poi);
        item.addEventListener("click", function () { calcularRuta(poi); });
        poiListEl.appendChild(item);
      });
    }

    // Una sola consulta (OSRM "table") trae el tiempo en auto de todos los puntos
    // hacia la torre; si falla, se estima con la distancia en línea recta.
    function estimarMinutos(poi) {
      var R = 6371, rad = Math.PI / 180;
      var dLat = (TORRE.lat - poi.lat) * rad, dLng = (TORRE.lng - poi.lng) * rad;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(poi.lat * rad) * Math.cos(TORRE.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      var km = 2 * R * Math.asin(Math.sqrt(a)) * 1.35;
      return Math.max(1, Math.round((km / 28) * 60));
    }

    function cargarTiemposPOI() {
      var coords = PUNTOS_DE_INTERES.map(function (p) { return p.lng + "," + p.lat; });
      coords.push(TORRE.lng + "," + TORRE.lat);
      var n = PUNTOS_DE_INTERES.length;
      var fuentes = PUNTOS_DE_INTERES.map(function (p, i) { return i; }).join(";");
      var url = "https://router.project-osrm.org/table/v1/driving/" + coords.join(";") +
        "?sources=" + fuentes + "&destinations=" + n + "&annotations=duration";
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data.durations) throw new Error("sin duraciones");
          PUNTOS_DE_INTERES.forEach(function (poi, i) {
            var seg = data.durations[i] && data.durations[i][0];
            if (typeof seg === "number") poiMinutos[poi.id] = Math.max(1, Math.round(seg / 60));
          });
        })
        .catch(function () {
          PUNTOS_DE_INTERES.forEach(function (poi) { poiMinutos[poi.id] = estimarMinutos(poi); });
        })
        .then(renderListaPOI);
    }

    renderListaPOI();
    cargarTiemposPOI();

    /* ---------- cálculo de ruta (distancia + tiempo en auto) ---------- */
    var routingControl = null;

    function calcularRuta(poi) {
      poiActivo = poi;
      mostrarDetallePOI(poi);

      var btnExplora = document.getElementById("btn-explora");
      btnExplora.disabled = !poi.streetViewEmbed;
      btnExplora.textContent = poi.streetViewEmbed ? "Explora la zona" : "Zona no disponible aún";

      if (routingControl) {
        map.removeControl(routingControl);
      }

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(poi.lat, poi.lng),
          L.latLng(TORRE.lat, TORRE.lng)
        ],
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1"
        }),
        profile: "driving",
        lineOptions: {
          styles: [{ color: "#5338ad", weight: 5, opacity: 0.9 }]
        },
        createMarker: function () { return null; },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false
      }).addTo(map);

      routingControl.on("routesfound", function (e) {
        var ruta = e.routes[0];
        var distanciaKm = (ruta.summary.totalDistance / 1000).toFixed(1);
        var tiempoMin = Math.round(ruta.summary.totalTime / 60);

        document.getElementById("poi-distance").textContent = distanciaKm + " km";
        document.getElementById("poi-time").textContent = tiempoMin + " min";
        document.getElementById("poi-result").hidden = false;
      });

      routingControl.on("routingerror", function () {
        document.getElementById("poi-distance").textContent = "—";
        document.getElementById("poi-time").textContent = "No disponible";
        document.getElementById("poi-result").hidden = false;
      });
    }

    /* ---------- modal: street view (solo al pedirlo con "Explora la zona") ---------- */
    var svOverlay = document.getElementById("sv-overlay");
    var svTitle = document.getElementById("sv-title");
    var svPanoEl = document.getElementById("street-view-pano");

    function abrirModal(overlay) {
      overlay.hidden = false;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { overlay.classList.add("is-visible"); });
      });
    }
    function cerrarModal(overlay) {
      overlay.classList.remove("is-visible");
      setTimeout(function () { overlay.hidden = true; }, 300);
    }

    function abrirStreetView(poi) {
      svTitle.textContent = "Street View — " + poi.nombre;
      if (!poi.streetViewEmbed) {
        svPanoEl.innerHTML = "Falta configurar el Street View de este punto.";
      } else {
        svPanoEl.innerHTML =
          '<iframe src="' + poi.streetViewEmbed + '" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
      }
      abrirModal(svOverlay);
    }

    document.getElementById("btn-explora").addEventListener("click", function () {
      if (poiActivo) abrirStreetView(poiActivo);
    });
    document.getElementById("sv-close").addEventListener("click", function () {
      cerrarModal(svOverlay);
      svPanoEl.innerHTML = "";
    });
    svOverlay.addEventListener("click", function (e) {
      if (e.target === svOverlay) {
        cerrarModal(svOverlay);
        svPanoEl.innerHTML = "";
      }
    });

    /* ---------- "Ver mapa detallado": pantalla completa del mapa interactivo ---------- */
    var mapaWrapperEl = document.querySelector(".mapa-wrapper");
    var mapaWrapperParent = mapaWrapperEl.parentNode;
    var mapaWrapperNextSibling = mapaWrapperEl.nextSibling;
    var btnMapaDetallado = document.getElementById("btn-mapa-detallado");
    var ICONO_EXPANDIR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 20l-6-3V4l6 3m0 13 6-3m-6 3V7m6 10 6 3V6l-6-3m0 14V4m0 0L9 7"/></svg>';
    var ICONO_CERRAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    var mapaEnPantallaCompleta = false;

    function alternarMapaPantallaCompleta() {
      mapaEnPantallaCompleta = !mapaEnPantallaCompleta;

      // .mapa-wrapper vive dentro de .map-layout, que tiene "reveal-scroll" (usa
      // transform) — eso crea un containing block y rompe el position:fixed real
      // contra el viewport. Se reubica temporalmente en <body> mientras está en
      // pantalla completa, y se regresa a su lugar exacto al cerrar.
      if (mapaEnPantallaCompleta) {
        document.body.appendChild(mapaWrapperEl);
      } else {
        mapaWrapperParent.insertBefore(mapaWrapperEl, mapaWrapperNextSibling);
      }

      mapaWrapperEl.classList.toggle("is-fullscreen", mapaEnPantallaCompleta);
      document.body.classList.toggle("mapa-fullscreen-lock", mapaEnPantallaCompleta);
      btnMapaDetallado.innerHTML = mapaEnPantallaCompleta
        ? ICONO_CERRAR + "Cerrar mapa"
        : ICONO_EXPANDIR + "Ver mapa detallado";
      requestAnimationFrame(function () { map.invalidateSize(); });
    }

    btnMapaDetallado.addEventListener("click", alternarMapaPantallaCompleta);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mapaEnPantallaCompleta) alternarMapaPantallaCompleta();
    });
  }
})();
