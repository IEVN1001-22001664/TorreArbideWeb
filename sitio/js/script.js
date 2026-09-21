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
    { src: 'assets/galeria/aereas/Torre_Arbide_0_01.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_02.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_03.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_04.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_05.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_06.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_07.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_08.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_09.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_10.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_11.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_12.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_0_13.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_1_01.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_1_02.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_1_03.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_1_04.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_1_05.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/aereas/Torre_Arbide_1_06.jpg', category: 'aereas', alt: 'Torre Arbide - Tomas Aéreas' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_36.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_37.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_38.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_39.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_40.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_41.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_42.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_43.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_44.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_45.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_46.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_47.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_48.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_49.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_50.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_51.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_52.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_53.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_54.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_55.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_56.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_57.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_58.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_59.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_60.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_61.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_62.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_63.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_64.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_65.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_66.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_67.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_68.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_69.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_70.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_71.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_72.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_73.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_74.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_75.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_76.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_77.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_78.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_79.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_80.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_81.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_82.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_83.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_84.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_85.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_86.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_87.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_88.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_89.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_90.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_91.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_92.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_93.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_94.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_95.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_96.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_97.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_1_98.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_01.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_02.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_03.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_04.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_05.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_06.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_07.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_08.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_09.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_10.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_11.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_12.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_13.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_14.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_15.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_16.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_17.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_18.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_19.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_20.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_21.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_22.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_23.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_24.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_25.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_26.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_27.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_28.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_29.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_30.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_31.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_32.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_33.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_34.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_35.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_36.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_37.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_38.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_39.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_40.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_41.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_42.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_43.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_44.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_45.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_46.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_47.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_48.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_49.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_50.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_51.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_52.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_53.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_54.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_55.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_56.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_57.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_58.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_59.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_60.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_61.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_62.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_63.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_64.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_65.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_66.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_67.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_3_68.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
    { src: 'assets/galeria/departamentos/Torre_Arbide_4_01.jpg', category: 'departamentos', alt: 'Torre Arbide - Departamento' },
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
    var prevBtn = document.getElementById("gallery-prev");
    var nextBtn = document.getElementById("gallery-next");
    var stageEl = document.querySelector(".gallery-stage");

    var HALF_WINDOW = 4;
    var SLOT_COUNT = HALF_WINDOW * 2 + 1;
    var ANGLE_STEP = 13;
    var RADIUS = 520;

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

    function positionAllSlots() {
      var stageWidth = stageEl.clientWidth;
      var cardWidth = slots.length ? slots[0].el.offsetWidth : 190;
      var halfStage = stageWidth / 2;

      slots.forEach(function (slot) {
        var relPos = slot.absIndex - center;
        var angleDeg = relPos * ANGLE_STEP;
        var angleRad = (angleDeg * Math.PI) / 180;
        var x = RADIUS * Math.sin(angleRad);
        var depth = RADIUS * (1 - Math.cos(angleRad));
        var rot = angleDeg * 0.9;
        var absRel = Math.abs(relPos);
        var opacity = absRel >= HALF_WINDOW ? 0 : 1 - Math.pow(absRel / HALF_WINDOW, 1.6);

        slot.el.style.left = (halfStage + x - cardWidth / 2) + "px";
        slot.el.style.top = depth + "px";
        slot.el.style.transform = "rotate(" + rot + "deg)";
        slot.el.style.opacity = opacity;
        var interactive = opacity > 0.05;
        slot.el.style.pointerEvents = interactive ? "auto" : "none";
        slot.el.tabIndex = interactive ? 0 : -1;
      });
    }

    function buildSlots() {
      arcEl.innerHTML = "";
      slots = [];
      for (var k = 0; k < SLOT_COUNT; k++) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-card";

        var img = document.createElement("img");
        img.loading = "lazy";
        card.appendChild(img);

        card.addEventListener("click", function () {
          openLightbox(parseInt(this.dataset.wrapped, 10));
        });

        arcEl.appendChild(card);

        var slot = { el: card, img: img, absIndex: k - HALF_WINDOW };
        slots.push(slot);
        updateSlotImage(slot);
      }
      positionAllSlots();
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
    }

    function renderGallery() {
      currentList = activeFilter === "todas"
        ? GALLERY_IMAGES
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
        pills.forEach(function (p) { p.classList.remove("is-active"); });
        pill.classList.add("is-active");
        activeFilter = pill.dataset.filter;
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
