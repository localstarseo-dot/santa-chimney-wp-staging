(function () {
  "use strict";

  if (window.__scsLandingControllerLoaded) return;
  window.__scsLandingControllerLoaded = true;

  function initialize() {
    if (!document.querySelector(".scs-lp")) return;
    var root = document;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var supportsObserver = "IntersectionObserver" in window;

    function observeOnce(elements, options, callback) {
      if (!elements.length) return;
      if (reducedMotion || !supportsObserver) {
        elements.forEach(callback);
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          callback(entry.target);
          observer.unobserve(entry.target);
        });
      }, options);

      elements.forEach(function (element) { observer.observe(element); });
    }

    var reveals = Array.from(root.querySelectorAll(".scs-lp [data-scs-reveal]"));
    reveals.forEach(function (element) {
      var delay = Math.min(600, Math.max(0, Number(element.dataset.scsDelay) || 0));
      if (delay) element.style.setProperty("--scs-delay", delay + "ms");
      if (!reducedMotion && supportsObserver) element.classList.add("scs-lp-is-pending");
    });
    observeOnce(
      reveals,
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      function (element) {
        element.classList.remove("scs-lp-is-pending");
        element.classList.add("scs-lp-is-visible");
      }
    );

    var numberFormatter = new Intl.NumberFormat("en-US");
    function counterText(element, value) {
      var decimals = Math.min(2, Math.max(0, parseInt(element.dataset.scsDecimals || "0", 10) || 0));
      var formatted = element.dataset.scsFormat === "plain"
        ? value.toFixed(decimals)
        : (decimals ? Number(value).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : numberFormatter.format(Math.round(value)));
      return (element.dataset.scsPrefix || "") + formatted + (element.dataset.scsSuffix || "");
    }

    function finishCounter(element) {
      var end = Number(element.dataset.scsEnd);
      if (!Number.isFinite(end)) return;
      var finalText = counterText(element, end);
      element.textContent = finalText;
      element.setAttribute("aria-label", finalText);
      element.dataset.scsCounted = "true";
    }

    function animateCounter(element) {
      if (element.dataset.scsCounted === "true" || reducedMotion) {
        finishCounter(element);
        return;
      }
      var end = Number(element.dataset.scsEnd);
      if (!Number.isFinite(end)) return;
      var start = performance.now();
      element.setAttribute("aria-label", counterText(element, end));

      function update(now) {
        var progress = Math.min((now - start) / 1400, 1);
        var current = end * (1 - Math.pow(1 - progress, 3));
        element.textContent = counterText(element, current);
        if (progress < 1) window.requestAnimationFrame(update);
        else finishCounter(element);
      }
      window.requestAnimationFrame(update);
    }

    var counters = Array.from(root.querySelectorAll(".scs-lp [data-scs-counter]"))
      .filter(function (element) { return Number.isFinite(Number(element.dataset.scsEnd)); });
    counters.forEach(function (element) {
      if (!reducedMotion && supportsObserver) element.textContent = counterText(element, 0);
    });
    observeOnce(counters, { rootMargin: "0px 0px -10% 0px", threshold: 0.35 }, animateCounter);

    var timelines = Array.from(root.querySelectorAll(".scs-lp [data-scs-timeline]"))
      .filter(function (timeline) { return !timeline.closest("#scs-santa-standard, #sweeping-process"); })
      .map(function (timeline) {
        var track = timeline.matches(".scs-lp-timeline__track") ? timeline : timeline.querySelector(".scs-lp-timeline__track");
        if (!track) return null;
        return { track: track, pin: timeline.querySelector("[data-scs-timeline-pin]") || track.querySelector(".scs-lp-timeline__pin") };
      })
      .filter(Boolean);

    if (timelines.length) {
      if (reducedMotion) {
        timelines.forEach(function (item) {
          item.track.style.setProperty("--scs-timeline-scale", "1");
          item.track.style.setProperty("--scs-timeline-pin-y", "0px");
        });
      } else {
        var framePending = false;
        function updateTimelines() {
          framePending = false;
          var start = window.innerHeight * 0.75;
          var end = window.innerHeight * 0.25;
          timelines.forEach(function (item) {
            var rect = item.track.getBoundingClientRect();
            var progress = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, rect.height + start - end)));
            item.track.style.setProperty("--scs-timeline-scale", progress.toFixed(4));
            if (item.pin) {
              var travel = Math.max(0, item.track.clientHeight - item.pin.offsetTop * 2 - item.pin.offsetHeight);
              item.track.style.setProperty("--scs-timeline-pin-y", (travel * progress).toFixed(2) + "px");
            }
          });
        }
        function requestTimelineUpdate() {
          if (framePending) return;
          framePending = true;
          window.requestAnimationFrame(updateTimelines);
        }
        window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
        window.addEventListener("resize", requestTimelineUpdate, { passive: true });
        window.addEventListener("pageshow", requestTimelineUpdate);
        requestTimelineUpdate();
      }
    }

    var reviewViewports = Array.from(root.querySelectorAll(".scs-lp .scs-lp-reviews__viewport"));
    if (!reducedMotion && supportsObserver && reviewViewports.length) {
      function synchronize(track) {
        if (document.hidden || track.dataset.scsInView !== "true") {
          track.style.animationPlayState = "paused";
        } else {
          track.style.removeProperty("animation-play-state");
        }
      }
      var reviewObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var track = entry.target.querySelector(".scs-lp-reviews__track");
          if (!track) return;
          track.dataset.scsInView = String(entry.isIntersecting);
          synchronize(track);
        });
      }, { rootMargin: "150px 0px", threshold: 0 });

      reviewViewports.forEach(function (viewport) {
        var track = viewport.querySelector(".scs-lp-reviews__track");
        if (!track) return;
        track.dataset.scsInView = "false";
        synchronize(track);
        reviewObserver.observe(viewport);
      });
      document.addEventListener("visibilitychange", function () {
        reviewViewports.forEach(function (viewport) {
          var track = viewport.querySelector(".scs-lp-reviews__track");
          if (track) synchronize(track);
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
