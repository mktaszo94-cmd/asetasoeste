/* ASZO V2 - Fase 7 | Notícias e eventos. Compatível com o JSON da Fase 6. */
(() => {
  'use strict';

  const TXT = {
    pt: { news:'Notícia ASZO', event:'Evento', location:'Local', more:'Mais informações',
      showMore:'Mostrar mais', previous:'Eventos anteriores (arquivo)',
      emptyUpcoming:'Não existem próximos eventos anunciados.', image:'Imagem do evento', read:'Ler notícia', closeNews:'Fechar notícia', zoomNews:'Ampliar fotografia', photos:'Fotografias', previousPhoto:'Fotografia anterior', nextPhoto:'Fotografia seguinte', photoCount:'Fotografia {n} de {total}', choosePhoto:'Mostrar fotografia {n}' },
    en: { news:'ASZO news', event:'Event', location:'Venue', more:'More information',
      showMore:'Show more', previous:'Past events (archive)',
      emptyUpcoming:'There are no upcoming events announced.', image:'Event image', read:'Read news', closeNews:'Close news', zoomNews:'Enlarge photo', photos:'Photos', previousPhoto:'Previous photo', nextPhoto:'Next photo', photoCount:'Photo {n} of {total}', choosePhoto:'Show photo {n}' }
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

  // Estilos da janela de leitura adicionados sem alterar o HTML ou os CSS existentes.
  const detailStyle = document.createElement('link');
  detailStyle.rel = 'stylesheet';
  detailStyle.href = '/assets/css/aszo-noticias-detalhe.css';
  document.head.append(detailStyle);

  // The featured image remains independent from the optional CMS gallery.
  // Old posts without galeria continue to work; duplicates and invalid paths are ignored.
  function newsPhotos(item) {
    const values = [item.imagem, ...(Array.isArray(item.galeria) ? item.galeria : [])];
    return [...new Set(values.map(safeImage).filter(Boolean))];
  }

  let newsDialog = null;
  function openNews(item, lang) {
    if (!newsDialog) {
      const dialog = elt('dialog', 'aszo-news-dialog');
      const shell = elt('div', 'aszo-news-dialog__shell');
      const close = elt('button', 'aszo-news-dialog__close', '\u00d7');
      close.type = 'button';
      const content = elt('div', 'aszo-news-dialog__content');
      const footer = elt('div', 'aszo-news-dialog__footer');
      close.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('keydown', event => {
        if (imageDialog && imageDialog.dialog.open) return;
        if (!dialog.__galleryNavigate) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          // Don't steal arrow keys from an editable field or select element.
          if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
          event.preventDefault();
          dialog.__galleryNavigate(event.key === 'ArrowLeft' ? -1 : 1);
        }
      });
      shell.append(close, content, footer);
      dialog.append(shell);
      document.body.append(dialog);
      newsDialog = {dialog, close, content, footer};
    }
    const words = TXT[lang];
    const title = localText(item, 'titulo', lang);
    const description = localText(item, 'descricao', lang);
    const {dialog, close, content, footer} = newsDialog;
    dialog.__galleryNavigate = null;
    close.setAttribute('aria-label', words.closeNews);
    close.title = words.closeNews;
    const heading = elt('h2', 'aszo-news-dialog__title', title);
    heading.id = 'aszo-news-dialog-title';
    dialog.setAttribute('aria-labelledby', heading.id);
    const meta = elt('div', 'aszo-news-dialog__meta');
    meta.append(elt('span', 'aszo-news-dialog__tag', words.news));
    if (validDate(item.data)) meta.append(elt('time', '', prettyDate(item.data, lang)));
    const intro = elt('div', 'aszo-news-dialog__header');
    intro.append(meta, heading);
    const desc = elt('div', 'aszo-news-dialog__text', description);
    const photos = newsPhotos(item);
    const body = elt('div', 'aszo-news-dialog__body');
    if (photos.length) {
      const gallery = elt('section', 'aszo-news-gallery');
      gallery.setAttribute('aria-label', words.photos);
      const poster = elt('button', 'aszo-news-dialog__poster');
      poster.type = 'button';
      poster.title = words.zoomNews;
      const photo = elt('img');
      photo.decoding = 'async';
      poster.append(photo);
      const counter = elt('span', 'aszo-news-gallery__counter');
      const thumbnails = elt('div', 'aszo-news-gallery__thumbs');
      const thumbButtons = [];
      let activeIndex = 0;
      function selectPhoto(index) {
        activeIndex = (index + photos.length) % photos.length;
        photo.src = photos[activeIndex];
        photo.alt = title + (photos.length > 1 ? ` (${activeIndex + 1}/${photos.length})` : '');
        poster.setAttribute('aria-label', words.zoomNews + ': ' + title);
        counter.textContent = words.photoCount.replace('{n}', String(activeIndex + 1))
          .replace('{total}', String(photos.length));
        thumbButtons.forEach((button, i) => {
          button.setAttribute('aria-pressed', String(i === activeIndex));
          if (i === activeIndex) button.scrollIntoView({block:'nearest',inline:'nearest'});
        });
      }
      poster.addEventListener('click', () => openImage(photos[activeIndex], title, lang));
      gallery.append(poster);
      if (photos.length > 1) {
        const controls = elt('div', 'aszo-news-gallery__controls');
        const previous = elt('button', 'aszo-news-gallery__arrow', '\u2039');
        previous.type = 'button';
        previous.setAttribute('aria-label', words.previousPhoto);
        const next = elt('button', 'aszo-news-gallery__arrow', '\u203a');
        next.type = 'button';
        next.setAttribute('aria-label', words.nextPhoto);
        previous.addEventListener('click', () => selectPhoto(activeIndex - 1));
        next.addEventListener('click', () => selectPhoto(activeIndex + 1));
        controls.append(previous, counter, next);
        gallery.append(controls);
        photos.forEach((src, i) => {
          const button = elt('button', 'aszo-news-gallery__thumb');
          button.type = 'button';
          button.setAttribute('aria-label', words.choosePhoto.replace('{n}', String(i + 1)));
          const img = elt('img');
          img.src = src;
          img.alt = '';
          img.loading = 'lazy';
          img.decoding = 'async';
          button.append(img);
          button.addEventListener('click', () => selectPhoto(i));
          thumbnails.append(button);
          thumbButtons.push(button);
        });
        gallery.append(thumbnails);
        dialog.__galleryNavigate = delta => selectPhoto(activeIndex + delta);
      }
      selectPhoto(0);
      body.append(gallery);
    }
    if (description) body.append(desc);
    content.replaceChildren(intro, body);
    footer.replaceChildren();
    const external = safeExternal(item.link);
    if (external) {
      const link = elt('a', 'aszo-news-dialog__external', words.more + ' \u2197');
      link.href = external;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      footer.append(link);
    }
    if (!dialog.open) dialog.showModal();
    close.focus();
  }

  function card(item, type, lang, featured) {
    const words = TXT[lang];
    const article = elt('article', 'aszo-feed-card' + (featured ? ' aszo-feed-card--featured' : ''));
    const imgSrc = safeImage(item.imagem);
    const isNews = type === 'noticias';
    if (imgSrc) {
      const figure = elt('div', 'aszo-feed-card__media');
      const img = elt('img', 'aszo-feed-card__image');
      img.src=imgSrc;
      img.alt=localText(item,'titulo',lang);
      img.loading='lazy'; img.decoding='async';
      if (isNews) {
        // O clique no cartaz de noticias abre a noticia completa.
        figure.append(img);
      } else {
        // Os cartazes de eventos continuam a ampliar diretamente.
        const zoom = elt('button', 'aszo-feed-card__zoom');
        zoom.type = 'button';
        zoom.setAttribute('aria-label', (lang === 'en' ? 'Enlarge image: ' : 'Ampliar imagem: ') + localText(item,'titulo',lang));
        zoom.title = lang === 'en' ? 'View full image' : 'Ver imagem completa';
        zoom.append(img);
        zoom.addEventListener('click', () => openImage(imgSrc, localText(item,'titulo',lang), lang));
        figure.append(zoom);
      }
      article.append(figure);
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
    if (isNews) {
      // Todo o cartao abre a noticia, incluindo por Enter/Espaco.
      const hint = elt('span', 'aszo-feed-card__read', words.read + ' →');
      body.append(hint);
      article.tabIndex = 0;
      article.setAttribute('role', 'button');
      article.setAttribute('aria-label', words.read + ': ' + localText(item,'titulo',lang));
      article.addEventListener('click', event => {
        // Links externos, caso existam, mantem o comportamento original.
        if (event.target.closest('a,button')) return;
        openNews(item,lang);
      });
      article.addEventListener('keydown', event => {
        if (event.target !== article) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openNews(item,lang);
        }
      });
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
