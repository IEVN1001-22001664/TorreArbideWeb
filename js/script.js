(function () {
  "use strict";

  /* ---------- tower windows ---------- */
  var grid = document.getElementById("window-grid");
  if (grid) {
    var cols = 6, rows = 10;
    var startX = 250, startY = 78;
    var gapX = 26, gapY = 30;
    var w = 14, h = 18;
    var windows = [];

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var x = startX + c * gapX;
        var y = startY + r * gapY;
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", w);
        rect.setAttribute("height", h);
        rect.setAttribute("rx", 1.5);
        rect.setAttribute("class", "win");
        grid.appendChild(rect);
        windows.push(rect);
      }
    }

    // light up a random subset at start, then keep flickering
    function randomLit(count) {
      var pool = windows.slice();
      for (var i = 0; i < count && pool.length; i++) {
        var idx = Math.floor(Math.random() * pool.length);
        pool[idx].classList.add("lit");
        pool.splice(idx, 1);
      }
    }
    randomLit(Math.floor(windows.length * 0.35));

    setInterval(function () {
      var toggle = windows[Math.floor(Math.random() * windows.length)];
      toggle.classList.toggle("lit");
    }, 450);
  }

  /* ---------- ambient particles ---------- */
  var canvas = document.getElementById("particles");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }

    function makeParticles() {
      var count = Math.max(24, Math.min(70, Math.floor(window.innerWidth / 22)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (Math.random() * 1.6 + 0.4) * DPR,
          vy: (Math.random() * 0.18 + 0.05) * DPR,
          vx: (Math.random() - 0.5) * 0.06 * DPR,
          a: Math.random() * 0.5 + 0.15
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + p.a + ")";
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }

    resize();
    makeParticles();
    window.addEventListener("resize", function () {
      resize();
      makeParticles();
    });

    if (!reduced) {
      requestAnimationFrame(tick);
    } else {
      tick();
    }
  }
})();
