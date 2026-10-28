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
  // Formato local: 5 a 8 de novembro de 2026 / 5-8 November 2026.
  // Datas ISO permitem comparar os dias sem calcular duracoes em milissegundos.
  const eventEnd = item => validDate(item.data_fim) && item.data_fim >= item.data
    ? item.data_fim : item.data;
  const dateRange = (item, lang) => {
    const begin=item.data;
    const end=eventEnd(item);
    if (end === begin) return prettyDate(begin,lang);
    const locale=lang==='en'?'en-GB':'pt-PT';
    const fmt=(iso,opts)=>new Intl.DateTimeFormat(locale,{...opts,timeZone:'UTC'})
      .format(new Date(iso+'T12:00:00Z'));
    const sameYear=begin.slice(0,4)===end.slice(0,4);
    const sameMonth=sameYear && begin.slice(0,7)===end.slice(0,7);
    if (sameMonth) {
      const first=fmt(begin,{day:'numeric'});
      const last=fmt(end,{day:'numeric',month:'long',year:'numeric'});
      return lang==='en'?`${first}–${last}`:`${first} a ${last}`;
    }
    const first=fmt(begin,sameYear?{day:'numeric',month:'long'}:{day:'numeric',month:'long',year:'numeric'});
    const last=fmt(end,{day:'numeric',month:'long',year:'numeric'});
    return lang==='en'?`${first} – ${last}`:`${first} a ${last}`;
  };
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

  // Janela modal nativa: abre o cartaz inteiro sem sair da pagina.
  // Criada apenas quando alguem clica numa imagem.
  let imageDialog = null;
  function openImage(src, title, lang) {
    if (!imageDialog) {
      const dialog = elt('dialog', 'aszo-image-dialog');
      const frame = elt('div', 'aszo-image-dialog__frame');
      const close = elt('button', 'aszo-image-dialog__close', '×');
      close.type = 'button';
      const image = elt('img', 'aszo-image-dialog__image');
      const caption = elt('p', 'aszo-image-dialog__caption');
      close.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
      });
      frame.append(close, image, caption);
      dialog.append(frame);
      document.body.append(dialog);
      imageDialog = { dialog, close, image, caption };
    }
    const label = lang === 'en' ? 'Close image' : 'Fechar imagem';
    imageDialog.close.setAttribute('aria-label', label);
    imageDialog.close.title = label;
    imageDialog.image.src = src;
    imageDialog.image.alt = title;
    imageDialog.caption.textContent = title;
    if (!imageDialog.dialog.open) imageDialog.dialog.showModal();
    imageDialog.close.focus();
  }

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
      const zoom = elt('button', 'aszo-feed-card__zoom');
      zoom.type = 'button';
      zoom.setAttribute('aria-label', (lang === 'en' ? 'Enlarge image: ' : 'Ampliar imagem: ') + localText(item,'titulo',lang));
      zoom.title = lang === 'en' ? 'View full image' : 'Ver imagem completa';
      zoom.append(img);
      zoom.addEventListener('click', () => openImage(imgSrc, localText(item,'titulo',lang), lang));
      figure.append(zoom); article.append(figure);
    }
    const body=elt('div','aszo-feed-card__body');
    const meta=elt('div','aszo-feed-card__meta');
    meta.append(elt('span','aszo-feed-card__tag',type==='noticias'?words.news:words.event));
    if (validDate(item.data)) {
      const time=elt('time','aszo-feed-card__date',
        type==='eventos'?dateRange(item,lang):prettyDate(item.data,lang));
      time.dateTime=item.data;
      if (type==='eventos' && eventEnd(item)!==item.data) {
        time.title=(lang==='en'?'Ends: ':'Termina: ')+prettyDate(eventEnd(item),lang);
      }
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
        const published=records.filter(row=>{
          if (!row || row.publicado!==true || typeof row.titulo!=='string'
              || !row.titulo.trim() || !validDate(row.data)) return false;
          if (type==='eventos' && row.data_fim != null && row.data_fim !== '') {
            if (!validDate(row.data_fim) || row.data_fim < row.data) {
              console.warn('ASZO: intervalo de datas invalido para o evento:', row.titulo);
              return false;
            }
          }
          return true;
        });
        if(!published.length)return;
        target.replaceChildren();
        if(type==='noticias') {
          published.sort((a,b)=>b.data.localeCompare(a.data));
          progressiveList(target,published,type,lang,{featured:true});
        } else {
          const today=todayLisbon();
          // Um evento de varios dias permanece nos proximos eventos ate ao ultimo dia (inclusive).
          const upcoming=published.filter(row=>eventEnd(row)>=today)
            .sort((a,b)=>a.data.localeCompare(b.data));
          const past=published.filter(row=>eventEnd(row)<today)
            .sort((a,b)=>eventEnd(b).localeCompare(eventEnd(a)));
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
