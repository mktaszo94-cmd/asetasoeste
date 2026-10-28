/* ASZO V2 - Fase 7 | Notícias e eventos. Compatível com o JSON da Fase 6. */
(() => {
  'use strict';

  const TXT = {
    pt: { news:'Notícia ASZO', event:'Evento', location:'Local', more:'Mais informações',
      showMore:'Mostrar mais', previous:'Eventos anteriores (arquivo)',
      emptyUpcoming:'Não existem próximos eventos anunciados.', image:'Imagem do evento' },
    en: { news:'ASZO news', event:'Event', location:'Venue', more:'More information',
      showMore:'Show more', previous:'Past events (archive)',
      emptyUpcoming:'There are no upcoming events announced.', image:'Event image' }
  };
  const elt = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = String(value);
    return node;
  };
  const validDate = iso => {
    if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
    const d = new Date(iso + 'T12:00:00Z');
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0,10) === iso;
  };
  const prettyDate = (iso, lang) => validDate(iso)
    ? new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'pt-PT',
      { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' })
      .format(new Date(iso + 'T12:00:00Z')) : '';
  const todayLisbon = () => new Intl.DateTimeFormat('en-CA', {
    timeZone:'Europe/Lisbon', year:'numeric',month:'2-digit',day:'2-digit'
  }).format(new Date());
  const localText = (item, field, lang) =>
    String((lang === 'en' && item[field + '_en']) || item[field] || '').trim();
  const safeImage = value => typeof value === 'string'
    && /^\/assets\/img\/[a-z0-9_./-]+\.(?:jpe?g|png|webp)$/i.test(value)
    && !value.includes('..') ? value : null;
  const safeExternal = value => {
    if (typeof value !== 'string') return null;
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
    catch { return null; }
  };

  function card(item, type, lang, featured) {
    const words = TXT[lang];
    const article = elt('article', 'aszo-feed-card' + (featured ? ' aszo-feed-card--featured' : ''));
    const imgSrc = safeImage(item.imagem);
    if (imgSrc) {
      const figure = elt('div', 'aszo-feed-card__media');
      const img = elt('img', 'aszo-feed-card__image');
      img.src=imgSrc;
      img.alt=localText(item,'titulo',lang);
      img.loading='lazy'; img.decoding='async';
      figure.append(img); article.append(figure);
    }
    const body=elt('div','aszo-feed-card__body');
    const meta=elt('div','aszo-feed-card__meta');
    meta.append(elt('span','aszo-feed-card__tag',type==='noticias'?words.news:words.event));
    if (validDate(item.data)) {
      const time=elt('time','aszo-feed-card__date',prettyDate(item.data,lang));
      time.dateTime=item.data;
      meta.append(time);
    }
    body.append(meta);
    body.append(elt('h3','aszo-feed-card__title',localText(item,'titulo',lang)));
    if (type==='eventos' && item.local) {
      const location=elt('p','aszo-feed-card__location');
      location.append(elt('span','aszo-feed-card__pin','●'));
      location.append(document.createTextNode(String(item.local)));
      body.append(location);
    }
    const description=localText(item,'descricao',lang);
    if (description) body.append(elt('p','aszo-feed-card__desc',description));
    const url=safeExternal(item.link);
    if (url) {
      const a=elt('a','aszo-feed-card__link',words.more+' ↗');
      a.href=url; a.target='_blank'; a.rel='noopener noreferrer';
      body.append(a);
    }
    article.append(body);
    return article;
  }

  function renderBatch(grid, items, type, lang, featured) {
    const fragment=document.createDocumentFragment();
    items.forEach((item,index)=>fragment.append(card(item,type,lang,featured && index===0)));
    grid.append(fragment);
  }
  function progressiveList(parent, list, type, lang, options={}) {
    const grid=elt('div','aszo-feed-grid'+(options.archive?' aszo-feed-grid--archive':''));
    parent.append(grid);
    let shown=0;
    const step=options.archive?6:6;
    const button=elt('button','aszo-feed-more',TXT[lang].showMore);
    button.type='button';
    const next=()=>{
      const batch=list.slice(shown,shown+step);
      renderBatch(grid,batch,type,lang,options.featured && shown===0);
      shown+=batch.length;
      button.hidden=shown>=list.length;
    };
    button.addEventListener('click',next);
    parent.append(button);
    next();
  }
  document.querySelectorAll('[data-aszo-feed]').forEach(root=>{
    const type=root.dataset.aszoFeed;
    const lang=root.dataset.lang==='en'?'en':'pt';
    const target=root.querySelector('[data-feed-list]');
    if(!target || !['noticias','eventos'].includes(type)) return;
    fetch(root.dataset.source,{cache:'no-cache'})
      .then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.json();})
      .then(data=>{
        const records=data && data[type];
        if(!Array.isArray(records))throw new Error('Invalid '+type+' data');
        const published=records.filter(row=>row && row.publicado===true
          && typeof row.titulo==='string' && row.titulo.trim() && validDate(row.data));
        if(!published.length)return;
        target.replaceChildren();
        if(type==='noticias') {
          published.sort((a,b)=>b.data.localeCompare(a.data));
          progressiveList(target,published,type,lang,{featured:true});
        } else {
          const today=todayLisbon();
          const upcoming=published.filter(row=>row.data>=today).sort((a,b)=>a.data.localeCompare(b.data));
          const past=published.filter(row=>row.data<today).sort((a,b)=>b.data.localeCompare(a.data));
          // The legacy events archive below remains untouched.
          if(upcoming.length) progressiveList(target,upcoming,type,lang);
          else target.append(elt('p','aszo-feed-empty',TXT[lang].emptyUpcoming));
          if(past.length) {
            const archive=elt('section','aszo-feed-archive');
            const heading=elt('h3','aszo-feed-archive__title',TXT[lang].previous);
            archive.append(heading);
            progressiveList(archive,past,type,lang,{archive:true});
            target.append(archive);
          }
        }
        root.hidden=false;
      })
      .catch(error=>console.error('ASZO '+type+':',error));
  });
})();
