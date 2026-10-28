/* ASZO Fase 8 — calendário por competição a partir de dados/documentos.json. */
(() => {
  'use strict';
  const root = document.querySelector('[data-aszo-competitions]');
  if (!root) return;
  const en = root.dataset.lang === 'en';
  const season = root.querySelector('[data-competition-season]');
  const grid = root.querySelector('[data-competition-grid]');
  const groups = [
    { id: 'masculino', pt: 'Campeonato Masculino', en: 'Men’s Championship', hintPt: '1.ª e 2.ª Divisões', hintEn: 'First and second divisions', words: ['masculino'] },
    { id: 'feminino', pt: 'Campeonato Feminino', en: 'Women’s Championship', hintPt: 'Calendários da competição feminina', hintEn: 'Women’s competition calendars', words: ['feminino'] },
    { id: 'tacas', pt: 'Taças', en: 'Cups', hintPt: 'Taça de Portugal e outras provas', hintEn: 'Portugal Cup and other competitions', words: ['taça','taca','cup','nelson fernandes'] },
    { id: 'tradicional', pt: 'Tradicional', en: 'Traditional', hintPt: 'Provas de setas tradicionais', hintEn: 'Traditional darts competitions', words: ['tradicional','traditional'] }
  ];
  let docs = [];
  const create = (tag, cls, content) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const validPdf = value => typeof value === 'string' && /^\/documentacao\/[a-z0-9/_-]+\.pdf$/i.test(value);
  const str = value => String(value || '').toLocaleLowerCase('pt');
  function render() {
    const selected = season.value;
    const frag = document.createDocumentFragment();
    groups.forEach(group => {
      const card = create('article','aszo-competitions__card');
      card.append(create('span','aszo-competitions__eyebrow',en ? 'Competition' : 'Competição'));
      card.append(create('h3','',en ? group.en : group.pt));
      card.append(create('p','',en ? group.hintEn : group.hintPt));
      // Correspondência baseada nos nomes atuais dos documentos; sem criar dados inventados.
      const matches = docs.filter(doc => (!selected || String(doc.epoca) === selected) &&
        group.words.some(w => str(doc.titulo + ' ' + (doc.titulo_en || '')).includes(w)));
      if (matches.length) {
        const links = create('div','aszo-competitions__links');
        matches.forEach(doc => {
          const a = create('a','aszo-competitions__link',(en && doc.titulo_en) || doc.titulo);
          a.href = doc.ficheiro; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.setAttribute('aria-label', `${a.textContent} — PDF`);
          links.append(a);
        });
        card.append(links);
      } else {
        card.append(create('span','aszo-competitions__none',en ? 'No calendar available for this season.' : 'Sem calendário disponível para esta época.'));
      }
      frag.append(card);
    });
    grid.replaceChildren(frag);
  }
  season.addEventListener('change',render);
  fetch(root.dataset.source,{cache:'no-cache'})
    .then(response => {if(!response.ok) throw Error(`HTTP ${response.status}`);return response.json();})
    .then(data => {
      const records = Array.isArray(data) ? data : data?.documentos;
      if(!Array.isArray(records)) throw Error('Invalid data');
      docs = records.filter(doc => doc && doc.publicado === true && doc.categoria === 'calendarios' && doc.titulo && validPdf(doc.ficheiro));
      const seasons = [...new Set(docs.map(d => String(d.epoca)).filter(Boolean))].sort((a,b)=>b.localeCompare(a,'pt',{numeric:true}));
      seasons.forEach(s=>{const option=create('option','',s);option.value=s;season.append(option);});
      render();
    })
    .catch(err=>{console.error('ASZO competitions:',err);grid.replaceChildren(create('p','aszo-competitions__status',en?'Calendars could not be loaded.':'Não foi possível carregar os calendários.'));});
})();
