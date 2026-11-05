(() => {
  const slides = Array.from(document.querySelectorAll('.scs-service-hero .sc-hero-slideshow__slide'));
  if (slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let current = 0;
  let busy = false;
  setInterval(async () => {
    if (document.hidden || busy) return;
    busy = true;
    const next = (current + 1) % slides.length;
    const image = slides[next];
    try {
      if (!image.src) image.src = image.dataset.src;
      await image.decode();
      slides.forEach(slide => slide.classList.remove('is-leaving'));
      slides[current].classList.replace('is-active', 'is-leaving');
      image.classList.add('is-active');
      current = next;
    } catch (_) {
      // Retain the current image if the next photo cannot load.
    } finally { busy = false; }
  }, 3000);
})();
