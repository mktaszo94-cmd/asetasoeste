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

  if (!ENABLE_EVENTS_POPUP) {
    const popup = document.getElementById("eventsPopup");
    if (popup) popup.remove();
    return;
  }

  let index = 0;
  const slides = document.querySelectorAll(".popup-slide");

  function showSlide(i){
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  window.nextSlide = function(){
    index = (index + 1) % slides.length;
    showSlide(index);
  };

  window.prevSlide = function(){
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };

  window.closePopup = function(){
    document.getElementById("eventsPopup").remove();
  };

  // Auto-play
  setInterval(() => {
    if (document.getElementById("eventsPopup")) {
      nextSlide();
    }
  }, 8000);

});


function closePopupAndGo(e) {
  e.preventDefault();

  const popup = document.querySelector('.events-popup');
  if (popup) {
    popup.classList.remove('is-visible');
  }

  const targetId = e.currentTarget.getAttribute('href');
  const target = document.querySelector(targetId);

  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }
}

document.querySelectorAll(".nav__link").forEach(a => {
  a.addEventListener("click", () => {
    const menu = document.querySelector(".nav__menu");
    if (menu) menu.classList.remove("is-open");
  });
});