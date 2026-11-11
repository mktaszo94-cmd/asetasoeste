/* ASZO V2 10.4 — Parceiros administrados no Pages CMS. */
(() => {
  'use strict';
  const area = document.querySelector('[data-aszo-partners]');
  if (!area) return;
  const track = area.querySelector('[data-aszo-partners-track]');
  const status = area.querySelector('[data-aszo-partners-status]');
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const root = english ? '../' : './';
  const source = root + 'dados/parceiros.json';
  const message = (pt, en) => english ? en : pt;
  const safeImage = (value) => {
    if (typeof value !== 'string') return null;
    // Only local images from the dedicated media library.
    const path = value.trim().replace(/^\/+/, '');
    return /^assets\/img\/parceiros\/[\w.\-/%]+\.(?:png|jpe?g|webp)$/i.test(path) && !path.includes('..')
      ? root + path : null;
  };
  const safeLink = (value) => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' ? url.href : null;
    } catch (_) { return null; }
  };
  const itemNode = (partner) => {
    const src = safeImage(partner.logotipo);
    if (!src) return null;
    const element = document.createElement('div');
    element.className = 'partners__item';
    element.setAttribute('role','listitem');
    const image = document.createElement('img');
    image.src = src;
    image.alt = partner.nome;
    image.loading = 'lazy';
    image.decoding = 'async';
    const url = safeLink(partner.url);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', partner.nome + (english ? ' — opens website' : ' — abrir website'));
      link.append(image);
      element.append(link);
    } else element.append(image);
    return element;
  };
  fetch(source, {cache: 'no-store'})
    .then(response => { if (!response.ok) throw Error('HTTP ' + response.status); return response.json(); })
    .then(data => {
      if (!data || !Array.isArray(data.parceiros)) throw Error('Invalid partner data');
      const entries = data.parceiros.filter(p => p && p.publicado === true && typeof p.nome === 'string' && p.nome.trim() && safeImage(p.logotipo))
        .sort((a,b) => (Number(a.ordem)||9999)-(Number(b.ordem)||9999));
      const first = document.createDocumentFragment();
      entries.forEach(p => { const node=itemNode(p); if(node) first.append(node); });
      track.replaceChildren(first);
      if (!entries.length) {
        status.textContent = message('Sem parceiros publicados de momento.','No partners published yet.');
        area.classList.add('partners--empty'); return;
      }
      status.hidden = true;
      // Duplicate visually for a seamless marquee, without duplicating accessible links.
      // Skip animation for small lists or when the user prefers reduced movement.
      if (entries.length < 3 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        area.classList.add('partners--static'); return;
      }
      const repeat = document.createElement('div');
      repeat.className = 'aszo-partners__duplicate';
      repeat.setAttribute('aria-hidden','true');
      entries.forEach(p => {
        const node=itemNode(p);
        if (node) {
          // Avoid tab stops on duplicated links.
          node.querySelectorAll('a').forEach(a=>a.tabIndex=-1);
          repeat.append(node);
        }
      });
      // Group original items and duplicate as equal-width tracks.
      const original = document.createElement('div');
      original.className = 'aszo-partners__group';
      while (track.firstChild) original.append(track.firstChild);
      repeat.classList.add('aszo-partners__group');
      track.append(original,repeat);
      track.classList.add('aszo-partners__animated');
    })
    .catch(err => {
      console.error('ASZO: falha a carregar parceiros:',err);
      status.textContent=message('Não foi possível carregar os parceiros.','Unable to load partners.');
    });
})();
