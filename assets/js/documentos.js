/* ASZO — Biblioteca documental. Não utiliza bibliotecas externas. */
(() => {
  'use strict';
  const root = document.querySelector('[data-aszo-documents]');
  if (!root) return;

  const english = root.dataset.lang === 'en';
  const labels = english ? {
    categories: {calendarios:'Calendars','folhas-de-jogo':'Match sheets',regulamentos:'Regulations',outros:'Other'},
    count: n => `${n} document${n === 1 ? '' : 's'}`,
    empty:'No documents match your search.',
    prompt:'Search by document name, select a category or choose a season to display documents.',
    error:'Documents could not be loaded. Please try again later.',
    view:'View PDF', download:'Download'
  } : {
    categories: {calendarios:'Calendários','folhas-de-jogo':'Folhas de jogo',regulamentos:'Regulamentos',outros:'Outros'},
    count: n => `${n} documento${n === 1 ? '' : 's'}`,
    empty:'Não existem documentos para os filtros selecionados.',
    prompt:'Pesquisa pelo nome, escolhe uma categoria ou seleciona uma época para veres os documentos.',
    error:'Não foi possível carregar os documentos. Tenta novamente mais tarde.',
    view:'Ver PDF',download:'Descarregar'
  };
  const search = root.querySelector('[data-doc-search]');
  const category = root.querySelector('[data-doc-category]');
  const season = root.querySelector('[data-doc-season]');
  const count = root.querySelector('[data-doc-count]');
  const list = root.querySelector('[data-doc-list]');
  let documents = [];
  let loaded = false;
  // Enquanto não houver pesquisa nem filtro, a biblioteca mantém os cartões ocultos.
  // A lista completa continua acessível a partir de qualquer filtro (ou combinação).
  function hasSelection() {
    return Boolean(search.value.trim() || category.value || season.value);
  }
  function initialState() {
    count.textContent = labels.prompt;
    list.replaceChildren();
    list.hidden = true;
  }
  initialState();

  // Confiar apenas em PDFs publicados dentro da pasta documental do próprio website.
  function safePdf(value) {
    if (typeof value !== 'string' || !/^\/documentacao\/[a-z0-9/_-]+\.pdf$/i.test(value)) return null;
    return value;
  }
  function addText(el, text) { el.textContent = text; return el; }
  function element(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) addText(el,text);
    return el;
  }
  function render() {
    if (!loaded || !hasSelection()) { initialState(); return; }
    list.hidden = false;
    const q = search.value.trim().toLocaleLowerCase();
    const filtered = documents.filter(d => (!category.value || d.categoria === category.value)
      && (!season.value || d.epoca === season.value)
      && (!q || `${d.titulo} ${d.titulo_en} ${d.categoria}`.toLocaleLowerCase().includes(q)));
    count.textContent = labels.count(filtered.length);
    list.replaceChildren();
    if (!filtered.length) { list.append(element('p','aszo-documents__empty',labels.empty)); return; }
    const fragment = document.createDocumentFragment();
    filtered.forEach(doc => {
      const card = element('article','aszo-documents__card');
      const meta = element('div','aszo-documents__meta');
      meta.append(element('span','aszo-documents__pill',labels.categories[doc.categoria] || doc.categoria));
      meta.append(element('span','aszo-documents__pill',doc.epoca));
      card.append(meta,element('h3','aszo-documents__title',(english && doc.titulo_en) || doc.titulo));
      const actions = element('div','aszo-documents__actions');
      const view = element('a','aszo-documents__btn',labels.view);
      view.href = doc.ficheiro;view.target='_blank';view.rel='noopener noreferrer';
      const download = element('a','aszo-documents__btn aszo-documents__btn--secondary',labels.download);
      download.href = doc.ficheiro;download.download='';
      actions.append(view,download);card.append(actions);fragment.append(card);
    });
    list.append(fragment);
  }
  [search,category,season].forEach(el => el.addEventListener(el === search ? 'input' : 'change',render));
  fetch(root.dataset.source,{cache:'no-cache'})
    .then(response => { if (!response.ok) throw new Error('HTTP '+response.status); return response.json(); })
    .then(data => {
      // Fase 3: o Pages CMS guarda a lista dentro de { documentos: [...] }.
      // Aceita temporariamente a lista antiga para facilitar recuperacao em testes.
      const records = Array.isArray(data) ? data : (data && data.documentos);
      if (!Array.isArray(records)) throw new Error('Invalid documents data');
      documents = records.filter(d => d && d.publicado === true && d.titulo && safePdf(d.ficheiro));
      const seasons = [...new Set(documents.map(d => String(d.epoca || 'Geral')))];
      seasons.sort((a,b)=>b.localeCompare(a,'pt',{numeric:true}));
      seasons.forEach(value=>{const option = document.createElement('option');option.value=value;option.textContent=value;season.append(option);});
      loaded = true;
      render();
    })
    .catch(error => {console.error('ASZO documents:',error);count.textContent=labels.error;list.replaceChildren();list.hidden=true;});
})();
