/* ASZO V2 Fase 10.1 — carrossel acessível, sem dependências externas */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-aszo-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.aszo-carousel__slide')];
    const dots = [...carousel.querySelectorAll('[data-carousel-to]')];
    const toggle = carousel.querySelector('[data-carousel-toggle]');
    if (!slides.length || dots.length !== slides.length) return;
    const english = document.documentElement.lang === 'en';
    let index = 0;
    let paused = reducedMotion.matches;
    let interval = null;
    const draw = next => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      dots.forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    const stop = () => { if (interval !== null) {clearInterval(interval); interval = null;} };
    const start = () => {
      stop();
      if (!paused && !document.hidden && !reducedMotion.matches && slides.length > 1) interval = window.setInterval(() => draw(index + 1), 5500);
    };
    const move = offset => { draw(index + offset); start(); };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => move(-1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => move(1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => { draw(i); start(); }));
    const updateToggle = () => {
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute('aria-label', paused ? (english ? 'Play carousel' : 'Retomar carrossel') : (english ? 'Pause carousel' : 'Pausar carrossel'));
      toggle.textContent = paused ? '▶' : '❚❚';
    };
    toggle?.addEventListener('click', () => { paused = !paused; updateToggle(); start(); });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) start(); });
    document.addEventListener('visibilitychange', start);
    reducedMotion.addEventListener?.('change', () => { if (reducedMotion.matches) stop(); else start(); });
    updateToggle();
    draw(0);
    start();
  });
})();
