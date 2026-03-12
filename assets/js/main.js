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
/* ===============================
   POP-UP EVENTOS
   =============================== */

// ATIVAR / DESATIVAR POP-UP
const ENABLE_EVENTS_POPUP = true; // <-- MUDA AQUI

function closeEventsPopup(){
  document.getElementById('eventsPopup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  if(!ENABLE_EVENTS_POPUP) return;

  const popup = document.getElementById('eventsPopup');
  if(popup){
    popup.style.display = 'flex';
  }
});

/* =====================================================
   POP-UP EVENTOS – CARROSSEL
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("eventsPopup");
  if (!popup) return;

  if (!ENABLE_EVENTS_POPUP) {
    popup.remove();
    return;
  }

  let index = 0;
  const slides = document.querySelectorAll(".popup-slide");
  const controls = document.querySelector(".popup-controls");

  // Se não houver slides, remove o popup
  if (slides.length === 0) {
    popup.remove();
    return;
  }

  function showSlide(i) {
    // Corrigir índice se ficar fora do limite
    if (i >= slides.length) index = 0;
    if (i < 0) index = slides.length - 1;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    // Esconder setas se só existir 1 evento
    if (controls) {
      controls.style.display = slides.length <= 1 ? "none" : "flex";
    }
  }

  window.nextSlide = function () {
    index++;
    showSlide(index);
  };

  window.prevSlide = function () {
    index--;
    showSlide(index);
  };

  window.closePopup = function () {
    popup.remove();
  };

  // Mostrar o primeiro slide logo no arranque
  showSlide(index);

  // Auto-play só se existir mais de 1 slide
  if (slides.length > 1) {
    setInterval(() => {
      if (document.getElementById("eventsPopup")) {
        window.nextSlide();
      }
    }, 8000);
  }
});