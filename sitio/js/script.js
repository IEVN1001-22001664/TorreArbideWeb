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
})();
