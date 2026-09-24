(function () {
  "use strict";

  if (window.parent === window) return;

  var params = new URLSearchParams(window.location.search);
  if (params.get("7z-preview") !== "1") return;

  var parentWindow = window.parent;
  var beatId = 0;
  var wakeId = 0;
  var readySent = false;

  document.documentElement.setAttribute("data-7z-preview-child", "1");

  function send(type) {
    try {
      parentWindow.postMessage(
        {
          type: type,
          version: 2,
          href: window.location.href,
          origin: window.location.origin,
          ts: Date.now()
        },
        "*"
      );
    } catch (_) {}
  }

  function wakePreviewMedia() {
    var videos = Array.prototype.slice.call(document.querySelectorAll("video"));

    videos.forEach(function (video, index) {
      var classText = String(video.className || "").toLowerCase();
      var insideHero =
        !!video.closest("section:first-of-type") ||
        !!video.closest("[class*='hero']") ||
        classText.indexOf("hero") !== -1;

      if (!insideHero && !video.autoplay && !video.loop && index > 0) return;

      try {
        video.muted = true;
        video.defaultMuted = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("playsinline", "");

        var promise = video.play();
        if (promise && typeof promise.catch === "function") {
          promise.catch(function () {});
        }
      } catch (_) {}
    });
  }

  function elementIsVisible(node) {
    if (!node) return false;

    var style = window.getComputedStyle(node);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      Number(style.opacity || "1") <= 0.01
    ) {
      return false;
    }

    var rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function blockingLoaderVisible() {
    var selectors = [
      ".scmc-cinematic-preloader",
      "[data-preloader]",
      "#preloader",
      ".preloader",
      ".page-loader",
      ".loading-screen"
    ];

    for (var i = 0; i < selectors.length; i += 1) {
      var node = document.querySelector(selectors[i]);
      if (elementIsVisible(node)) return true;
    }

    return false;
  }

  function headerReady() {
    var header =
      document.querySelector("header") ||
      document.querySelector("[role='banner']") ||
      document.querySelector(".site-header") ||
      document.querySelector(".navbar");

    if (!header) return true;
    return elementIsVisible(header);
  }

  function revealReady() {
    if (readySent) return;

    readySent = true;
    wakePreviewMedia();

    send("7z-preview-ready");

    window.setTimeout(function () {
      wakePreviewMedia();
      send("7z-preview-ready");
    }, 140);

    beatId = window.setInterval(function () {
      send("7z-preview-heartbeat");
    }, 300);

    wakeId = window.setInterval(function () {
      wakePreviewMedia();
    }, 1100);
  }

  function settle() {
    var started = Date.now();
    var stableTicks = 0;

    function check() {
      wakePreviewMedia();

      var settled =
        document.readyState === "complete" &&
        !blockingLoaderVisible() &&
        headerReady();

      if (settled) stableTicks += 1;
      else stableTicks = 0;

      if (stableTicks >= 2 || Date.now() - started > 3200) {
        revealReady();
        return;
      }

      window.setTimeout(check, 120);
    }

    check();
  }

  if (document.readyState === "complete") {
    settle();
  } else {
    window.addEventListener("load", settle, { once: true });
  }

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) wakePreviewMedia();
  });

  window.addEventListener("pageshow", function () {
    wakePreviewMedia();

    if (readySent) {
      send("7z-preview-ready");
    }
  });

  window.addEventListener("beforeunload", function () {
    if (beatId) window.clearInterval(beatId);
    if (wakeId) window.clearInterval(wakeId);
  });
})();
