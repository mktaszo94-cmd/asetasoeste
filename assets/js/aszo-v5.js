/* ASZO V2 Fase 5 - melhoria progressiva de navegação e atalhos. */
(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.aszo-menu-button');
    const menu = document.getElementById('aszo-menu');
    if (toggle && menu) {
      const setOpen = (open) => { menu.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); };
      // O main.js original abre/fecha o menu. Atualizar aria-expanded depois desse evento.
      toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(menu.classList.contains('is-open'))));
      menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
      document.addEventListener('click', e => { if (!e.target.closest('.aszo-header')) setOpen(false); });
    }
    document.querySelectorAll('[data-doc-quick-category]').forEach(link => {
      link.addEventListener('click', () => {
        const category = document.querySelector('[data-doc-category]');
        if (!category) return;
        category.value = link.dataset.docQuickCategory;
        category.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });
})();
