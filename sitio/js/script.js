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

  /* ---------- galería interactiva (rueda circular) ---------- */
  var GALLERY_IMAGES = [
    { src: 'assets/galeria/aereas/01.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/02.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/03.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/04.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/05.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/06.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/07.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/08.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/09.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/10.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/11.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/12.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/13.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/14.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/15.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/16.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/17.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/18.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/19.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_36.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_37.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_38.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_39.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_40.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_41.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_42.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_43.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_44.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_45.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_46.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_47.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_48.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_49.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_50.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_51.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_52.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_53.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_54.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_55.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_56.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_57.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_58.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_59.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_60.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_61.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_62.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_63.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_64.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_65.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_66.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_67.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_68.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_69.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_70.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_71.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_72.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_73.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_74.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_75.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_76.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_77.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_78.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_79.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_80.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_81.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_82.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_83.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_84.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_85.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_86.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_87.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_88.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_89.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_90.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_91.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_92.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_93.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_94.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_95.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_96.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_97.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/studio/Torre_Arbide_1_98.jpg', category: 'studio', alt: 'Torre Arbide - Studio' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_01.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_02.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_03.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_04.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_05.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_06.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_07.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_08.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_09.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_10.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_11.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_12.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_13.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_14.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_15.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_16.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_17.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_18.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_19.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_20.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_21.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_22.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_23.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_24.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_25.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_26.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_27.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_28.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_29.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_30.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_31.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_32.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_33.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_34.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_35.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_36.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_37.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_38.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_39.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_40.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_41.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_42.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_43.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_44.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_45.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_46.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_47.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_48.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_49.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_50.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_51.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_52.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_53.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_54.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_55.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_56.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_57.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_58.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_59.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_60.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_61.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_62.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_63.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_64.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_65.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_66.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_67.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_3_68.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/departamentos/loft/Torre_Arbide_4_01.jpg', category: 'loft', alt: 'Torre Arbide - Loft' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_01.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_02.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_03.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_04.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_05.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_06.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_07.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_08.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_09.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_10.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_11.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_12.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_13.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_14.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_15.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_16.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_17.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/amenidades/Torre_Arbide_2_18.jpg', category: 'amenidades', alt: 'Torre Arbide - Amenidades' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_07.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_08.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_09.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_10.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_11.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_12.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_13.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_14.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_15.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_16.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_17.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_18.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_19.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_20.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_21.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_22.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_23.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_24.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_25.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_26.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_27.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_28.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_29.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_30.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_31.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_32.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_1_33.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_2_01.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_02.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_03.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_04.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_05.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_06.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_57.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_58.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_59.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' },
    { src: 'assets/galeria/areas-comunes/Torre_Arbide_4_60.jpg', category: 'areas-comunes', alt: 'Torre Arbide - Áreas Comunes' }
  ];

  var arcEl = document.getElementById("gallery-arc");
  if (arcEl) {
    var emptyEl = document.getElementById("gallery-empty");
    var pills = document.querySelectorAll(".filter-pill");
    var subfiltersEl = document.getElementById("gallery-subfilters");
    var DEPARTAMENTOS_FAMILY = ["departamentos", "studio", "loft"];
    var prevBtn = document.getElementById("gallery-prev");
    var nextBtn = document.getElementById("gallery-next");
    var previewImg = document.getElementById("gallery-preview-img");

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
    var activeFilter = "todas";
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

    // Puntos de interés reales, a unos pasos de Torre Arbide. 6 ya traen su
    // streetViewEmbed real; el resto queda vacío hasta que se genere su link
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
      { id: "clinica-dental", nombre: "Clínica Dental Arbide", categoria: "Salud", icono: "🦷",
        lat: 21.121085324374476, lng: -101.69484064812835, streetViewEmbed: "" },
      { id: "farmacia", nombre: "Super Farmacia", categoria: "Servicios", icono: ICONOS.farmacia,
        lat: 21.120678253737406, lng: -101.69468069091704, streetViewEmbed: "" },
      { id: "dominos", nombre: "Domino's", categoria: "Restaurantes", icono: ICONOS.dominos,
        lat: 21.120435012202794, lng: -101.69477638199538, streetViewEmbed: "" },
      { id: "caffenio", nombre: "Caffenio", categoria: "Restaurantes", icono: ICONOS.caffenio,
        lat: 21.120260196276046, lng: -101.69511522070262, streetViewEmbed: "" }
    ];

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

    var map = L.map("map", { zoomControl: true, maxZoom: ZOOM_MAX_MAPA }).setView([TORRE.lat, TORRE.lng], ZOOM_INICIAL);

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

    var torreMarker = L.marker([TORRE.lat, TORRE.lng], { icon: crearIconoTorre(tamanoTorre(ZOOM_INICIAL)) })
      .addTo(map)
      .bindPopup("<strong>" + TORRE.nombre + "</strong><br>Tu nuevo hogar");

    var poiMarkers = {};

    PUNTOS_DE_INTERES.forEach(function (poi) {
      var marker = L.marker([poi.lat, poi.lng], { icon: crearIconoPOI(poi, tamanoPOI(ZOOM_INICIAL)) })
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

      var fotoEl = document.getElementById("detail-foto");
      if (poi.foto) {
        fotoEl.src = poi.foto;
        fotoEl.style.display = "block";
      } else {
        fotoEl.style.display = "none";
      }
    }

    document.getElementById("btn-volver").addEventListener("click", function () {
      poiDetailEl.classList.remove("show");
      poiEmptyEl.style.display = "flex";
      poiPanelEl.classList.remove("has-selection");
      poiActivo = null;
      if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
      }
      document.getElementById("poi-result").hidden = true;
    });

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
