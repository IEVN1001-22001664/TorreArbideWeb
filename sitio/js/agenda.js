(function () {
  var WHATSAPP = "524775514226";
  var WHATSAPP_MSG = "Hola, me interesa Torre Arbide y quiero más información.";
  var BRAND = "#a8a59b";
  var NS = "torre-arbide";

  var wa = document.getElementById("agenda-whatsapp");
  if (wa) wa.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(WHATSAPP_MSG);

  /* ---- Loader oficial de Cal.com ---- */
  (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", NS, { origin: "https://cal.com" });

  Cal.ns[NS]("ui", {
    theme: "light",
    hideEventTypeDetails: false,
    layout: "month_view",
    cssVarsPerTheme: { light: { "cal-brand": BRAND } }
  });

  /* ---- Conversión: se dispara cuando alguien termina de agendar ---- */
  Cal.ns[NS]("on", {
    action: "bookingSuccessful",
    callback: function (e) {
      var data = (e && e.detail && e.detail.data) || {};
      var slug = (data.eventType && data.eventType.slug) || "";
      var tipo = slug.indexOf("visita") !== -1 ? "visita" : "videollamada";

      if (typeof window.fbq === "function") {
        window.fbq("track", "Schedule", { content_name: "Torre Arbide - " + tipo });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "agendar_cita", { tipo_cita: tipo });
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "agendar_cita", tipo_cita: tipo });
    }
  });
})();
