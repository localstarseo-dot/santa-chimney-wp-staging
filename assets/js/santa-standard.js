(() => {
    const section = document.querySelector("#scs-santa-standard");

    if (!section || section.dataset.scsTimelineReady === "true") {
      return;
    }

    section.dataset.scsTimelineReady = "true";

    const track = section.querySelector("[data-scs-timeline]");
    const items = Array.from(
      section.querySelectorAll("[data-scs-timeline-item]")
    );

    if (!track || !items.length) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let ticking = false;

    const clamp = (number, minimum, maximum) => {
      return Math.min(Math.max(number, minimum), maximum);
    };

    const updateTimeline = () => {
      ticking = false;

      if (reducedMotion.matches) {
        track.style.setProperty("--scs-timeline-progress", "1");

        items.forEach((item) => {
          item.classList.add("is-active");
        });

        return;
      }

      const rect = track.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight;

      /*
       * Animation begins when the top of the timeline reaches
       * 72% of the viewport and finishes when its bottom reaches 28%.
       */
      const startPoint = viewportHeight * 0.72;
      const endPoint = viewportHeight * 0.28;
      const totalDistance =
        rect.height + startPoint - endPoint;
      const travelledDistance =
        startPoint - rect.top;

      const progress = clamp(
        travelledDistance / totalDistance,
        0,
        1
      );

      track.style.setProperty(
        "--scs-timeline-progress",
        progress.toFixed(4)
      );

      const activePosition =
        progress * track.offsetHeight;

      items.forEach((item) => {
        const itemCenter =
          item.offsetTop + item.offsetHeight * 0.5;

        item.classList.toggle(
          "is-active",
          itemCenter <= activePosition + 45
        );
      });
    };

    const requestTimelineUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateTimeline);
    };

    window.addEventListener(
      "scroll",
      requestTimelineUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestTimelineUpdate,
      { passive: true }
    );

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener(
        "change",
        requestTimelineUpdate
      );
    }

    if ("ResizeObserver" in window) {
      const timelineResizeObserver =
        new ResizeObserver(requestTimelineUpdate);

      timelineResizeObserver.observe(track);
    }

    requestTimelineUpdate();
  })();
