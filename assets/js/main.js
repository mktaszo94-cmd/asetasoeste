document.addEventListener("DOMContentLoaded", () => {

  /* Menu mobile */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");

  if(toggle && menu){
    toggle.addEventListener("click", () => {
      menu.classList.toggle("is-open");
    });
  }

  /* Ano automático no footer */
  const yearEl = document.getElementById("year");
  if(yearEl){
    yearEl.textContent = new Date().getFullYear();
  }

  /* Carrossel de eventos */
  document.querySelectorAll(".eventCarousel").forEach(carousel => {
    const images = carousel.querySelectorAll("img");
    let index = 0;

    images[index].classList.add("is-active");

    const prev = carousel.querySelector(".eventCarousel__btn--prev");
    const next = carousel.querySelector(".eventCarousel__btn--next");

    prev.addEventListener("click", e => {
      e.preventDefault();
      images[index].classList.remove("is-active");
      index = (index - 1 + images.length) % images.length;
      images[index].classList.add("is-active");
    });

    next.addEventListener("click", e => {
      e.preventDefault();
      images[index].classList.remove("is-active");
      index = (index + 1) % images.length;
      images[index].classList.add("is-active");
    });
  });

});
