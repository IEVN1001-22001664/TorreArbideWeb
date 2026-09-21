(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero video ---------- */
  var heroVideo = document.getElementById("hero-video");
  if (heroVideo && reduced) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
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

  /* ---------- galería interactiva ---------- */
  var GALLERY_IMAGES = [
    { src: "assets/galeria/aereas/aerea-1.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 1" },
    { src: "assets/galeria/aereas/aerea-2.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 2" },
    { src: "assets/galeria/aereas/aerea-3.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 3" },
    { src: "assets/galeria/aereas/aerea-4.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 4" },
    { src: "assets/galeria/aereas/aerea-5.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 5" },
    { src: "assets/galeria/aereas/aerea-6.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 6" },
    { src: "assets/galeria/aereas/aerea-7.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 7" },
    { src: "assets/galeria/aereas/aerea-8.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 8" },
    { src: "assets/galeria/aereas/aerea-9.jpg", category: "aereas", alt: "Torre Arbide, vista aérea 9" }
  ];

  var arcEl = document.getElementById("gallery-arc");
  if (arcEl) {
    var emptyEl = document.getElementById("gallery-empty");
    var pills = document.querySelectorAll(".filter-pill");
    var currentList = [];
    var activeFilter = "todas";

    var MAX_LIFT = 64;
    var MAX_ROT = 15;

    function renderGallery() {
      currentList = activeFilter === "todas"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter(function (item) { return item.category === activeFilter; });

      arcEl.innerHTML = "";

      if (!currentList.length) {
        arcEl.hidden = true;
        emptyEl.hidden = false;
        return;
      }
      arcEl.hidden = false;
      emptyEl.hidden = true;

      var n = currentList.length;
      currentList.forEach(function (item, i) {
        var t = n > 1 ? i / (n - 1) : 0.5;
        var hump = Math.sin(Math.PI * t);
        var tilt = Math.cos(Math.PI * t);
        var y = reduced ? 0 : -(hump * MAX_LIFT);
        var rot = reduced ? 0 : -(tilt * MAX_ROT);

        var card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-card";
        card.style.marginTop = MAX_LIFT + "px";
        card.style.transform = "translateY(" + y + "px) rotate(" + rot + "deg)";
        card.style.transitionDelay = Math.min(i * 35, 350) + "ms";
        card.setAttribute("aria-label", item.alt);
        card.dataset.index = i;

        var img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        img.loading = "lazy";
        card.appendChild(img);

        card.addEventListener("click", function () {
          if (arcEl.dataset.dragged === "true") return;
          openLightbox(i);
        });

        arcEl.appendChild(card);
      });

      requestAnimationFrame(function () {
        arcEl.scrollLeft = (arcEl.scrollWidth - arcEl.clientWidth) / 2;
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) { p.classList.remove("is-active"); });
        pill.classList.add("is-active");
        activeFilter = pill.dataset.filter;
        renderGallery();
      });
    });

    /* drag-to-scroll (mouse) */
    var isDown = false, startX = 0, startScroll = 0, moved = 0;
    arcEl.addEventListener("pointerdown", function (e) {
      isDown = true;
      moved = 0;
      arcEl.dataset.dragged = "false";
      startX = e.clientX;
      startScroll = arcEl.scrollLeft;
      arcEl.classList.add("is-dragging");
      arcEl.setPointerCapture(e.pointerId);
    });
    arcEl.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var dx = e.clientX - startX;
      moved = Math.abs(dx);
      if (moved > 6) arcEl.dataset.dragged = "true";
      arcEl.scrollLeft = startScroll - dx;
    });
    function endDrag() {
      isDown = false;
      arcEl.classList.remove("is-dragging");
    }
    arcEl.addEventListener("pointerup", endDrag);
    arcEl.addEventListener("pointercancel", endDrag);
    arcEl.addEventListener("pointerleave", function () { if (isDown) endDrag(); });

    /* ---------- lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");
    var lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      updateLightbox();
      lightbox.hidden = false;
    }
    function updateLightbox() {
      var item = currentList[lbIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
    }
    function closeLightbox() { lightbox.hidden = true; }
    function stepLightbox(dir) {
      lbIndex = (lbIndex + dir + currentList.length) % currentList.length;
      updateLightbox();
    }

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
})();
