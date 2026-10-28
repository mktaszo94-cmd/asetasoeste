/* ASZO V2 Fase 9: competicoes administradas no Pages CMS.
 * Reutiliza a lista de PDFs da biblioteca para as quatro competicoes historicas.
 * Novas competicoes devem ter PDFs associados explicitamente no CMS.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-aszo-competitions]');
  if (!root) return;
  const english = root.dataset.lang === 'en';
  const season = root.querySelector('[data-competition-season]');
  const grid = root.querySelector('[data-competition-grid]');
  if (!season || !grid) return;
  const docsUrl = root.dataset.source || (english ? '../dados/documentos.json' : 'dados/documentos.json');
  const competitionUrl = new URL('competicoes.json', new URL(docsUrl, document.baseURI)).href;
  const GENERAL_RESULTS = 'https://www.2k-dart-software.com/frontend/events/5/mandant/2118';
  const labels = english
    ? { competition:'Competition', unavailable:'No calendar available for this season.', status:'Unable to load competitions.', results:'Standings and results', preparation:'Preparing', underway:'In progress', finished:'Finished' }
    : { competition:'Competição', unavailable:'Sem calendário disponível para esta época.', status:'Não foi possível carregar as competições.', results:'Classificações e resultados', preparation:'Em preparação', underway:'Em curso', finished:'Concluída' };
  const pdfPath = value => typeof value === 'string' && /^\/documentacao\/[a-z0-9/_-]+\.pdf$/i.test(value);
  const httpsUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const u = new URL(value); return u.protocol === 'https:' ? u.href : null; }
    catch (_) { return null; }
  };
  const element = (tag, className, content) => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (content !== undefined) n.textContent = content;
    return n;
  };
  let competitions = [];

  function linkedDocuments(competition) {
    // Todos os botoes sao agora geridos explicitamente no Pages CMS.
    return Array.isArray(competition.calendarios)
      ? competition.calendarios.filter(d => d && pdfPath(d.ficheiro) && d.titulo)
      : [];
  }
  function resultsLink(competition) {
    const mode = competition.modo_classificacoes || 'geral';
    if (mode === 'ocultar') return null;
    if (mode === 'personalizado') return httpsUrl(competition.url_classificacoes);
    return GENERAL_RESULTS;
  }
  function draw() {
    const filter = season.value;
    const selected = competitions.filter(c => c.publicado === true && c.titulo && c.epoca && (!filter || c.epoca === filter));
    const fragment = document.createDocumentFragment();
    for (const comp of selected) {
      const card = element('article', 'aszo-competitions__card');
      const eyebrow = element('span', 'aszo-competitions__eyebrow', `${labels.competition} · ${comp.epoca}`);
      card.append(eyebrow);
      const states = { preparacao: labels.preparation, decorrer: labels.underway, concluida: labels.finished };
      if (states[comp.estado]) card.append(element('span','aszo-competitions__state',states[comp.estado]));
      card.append(element('h3', '', (english && comp.titulo_en) || comp.titulo));
      const description = (english && comp.descricao_en) || comp.descricao;
      if (description) card.append(element('p', '', description));
      const links = element('div', 'aszo-competitions__links');
      const unique = new Set();
      for (const doc of linkedDocuments(comp)) {
        if (unique.has(doc.ficheiro)) continue;
        unique.add(doc.ficheiro);
        const a = element('a', 'aszo-competitions__link', (english && doc.titulo_en) || doc.titulo);
        a.href = doc.ficheiro;
        a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', `${a.textContent} — PDF`);
        links.append(a);
      }
      if (unique.size === 0) links.append(element('span', 'aszo-competitions__none', labels.unavailable));
      const resultsUrl = resultsLink(comp);
      if (resultsUrl) {
        const results = element('a','aszo-competitions__link aszo-competitions__link--results',labels.results + ' ↗');
        results.href = resultsUrl;
        results.target = '_blank'; results.rel = 'noopener noreferrer';
        links.append(results);
      }
      card.append(links);
      fragment.append(card);
    }
    if (!selected.length) fragment.append(element('p','aszo-competitions__status',english ? 'No competitions for this season.' : 'Sem competições disponíveis para esta época.'));
    grid.replaceChildren(fragment);
  }
  season.addEventListener('change', draw);
  const readJson = url => fetch(url, { cache: 'no-cache' }).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${url}`);
    return r.json();
  });
  readJson(competitionUrl)
    .then(competitionData => {
      const competitionList = competitionData?.competicoes;
      if (!Array.isArray(competitionList)) throw new Error('Invalid competition format');
      competitions = competitionList.filter(c => c && c.publicado === true && typeof c.epoca === 'string');
      [...new Set(competitions.map(c => c.epoca).filter(Boolean))]
        .sort((a,b) => b.localeCompare(a,'pt',{numeric:true}))
        .forEach(value => { const option = element('option','',value); option.value = value; season.append(option); });
      draw();
    })
    .catch(error => {
      console.error('ASZO competitions:',error);
      grid.replaceChildren(element('p','aszo-competitions__status',labels.status));
    });
})();
