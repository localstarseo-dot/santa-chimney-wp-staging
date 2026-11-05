(function () {
  "use strict";

  var header = document.getElementById("scs-native-header");
  var controller = header && header.querySelector(".scs-nav3__controller");
  var desktop = window.matchMedia("(min-width: 1121px)");

  function syncNavigation() {
    if (controller) controller.open = desktop.matches;
  }

  syncNavigation();
  if (desktop.addEventListener) desktop.addEventListener("change", syncNavigation);
  else desktop.addListener(syncNavigation);

  if (header) {
    header.querySelectorAll(".scs-nav3__dropdown").forEach(function (dropdown) {
      dropdown.addEventListener("toggle", function () {
        if (!dropdown.open) return;
        header.querySelectorAll(".scs-nav3__dropdown").forEach(function (other) {
          if (other !== dropdown) other.open = false;
        });
      });
    });
  }

  var timer = document.querySelector("[data-scs-global-timer]");
  var duration = 59 * 60;
  var started = Date.now();

  function tick() {
    if (!timer) return;
    var elapsed = Math.floor((Date.now() - started) / 1000);
    var remaining = duration - (elapsed % (duration + 1));
    var minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
    var seconds = String(remaining % 60).padStart(2, "0");
    timer.textContent = minutes + ":" + seconds;
  }

  tick();
  window.setInterval(tick, 1000);

  document.querySelectorAll("[data-scs-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });
})();
