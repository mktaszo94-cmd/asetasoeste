/* ASZO V2 Fase 6 - feeds de noticias e eventos; sem HTML de origem externa. */
(() => {
  'use strict';
  const safeImage = value => typeof value === 'string' && /^\/assets\/img\/[a-z0-9_./-]+\.(?:jpe?g|png|webp)$/i.test(value) && !value.includes('..') ? value : null;
  const safeExternal = value => {
    if (typeof value !== 'string') return null;
    try { const u = new URL(value); return u.protocol === 'https:' ? u.href : null; } catch { return null; }
  };
  const el = (tag, cls, content) => {
    const node=document.createElement(tag);
    if(cls) node.className=cls;
    if(content!==undefined) node.textContent=String(content);
    return node;
  };
  const formatDate = (iso, lang) => {
    if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
    const d = new Date(iso+'T12:00:00Z');
    if (!Number.isFinite(d.getTime()) || d.toISOString().slice(0,10)!==iso) return '';
    return new Intl.DateTimeFormat(lang==='en'?'en-GB':'pt-PT',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(d);
  };
  document.querySelectorAll('[data-aszo-feed]').forEach(root => {
    const type=root.dataset.aszoFeed, lang=root.dataset.lang === 'en'?'en':'pt';
    const list=root.querySelector('[data-feed-list]');
    if(!list || !['noticias','eventos'].includes(type))return;
    fetch(root.dataset.source,{cache:'no-cache'})
      .then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
      .then(data=>{
        const rows=data && data[type];
        if(!Array.isArray(rows))throw new Error('Invalid content list: '+type);
        const records=rows.filter(x=>x && x.publicado===true && typeof x.titulo==='string' && x.titulo.trim())
          .sort((a,b)=>String(b.data||'').localeCompare(String(a.data||''))).slice(0,12);
        if(!records.length)return;
        const fragment=document.createDocumentFragment();
        for(const item of records){
          const card=el('article','aszo-feed-card');
          const image=safeImage(item.imagem);
          if(image){const img=el('img','aszo-feed-card__image');img.src=image;img.alt='';img.loading='lazy';img.decoding='async';card.append(img)}
          const body=el('div','aszo-feed-card__body');
          const date=formatDate(item.data,lang);if(date)body.append(el('time','aszo-feed-card__date',date));
          const title=lang==='en' && item.titulo_en?item.titulo_en:item.titulo;
          body.append(el('h3','aszo-feed-card__title',title));
          if(type==='eventos' && item.local)body.append(el('p','aszo-feed-card__location',item.local));
          const desc=lang==='en' && item.descricao_en?item.descricao_en:item.descricao;
          if(desc)body.append(el('p','aszo-feed-card__desc',String(desc).slice(0,1500)));
          const url=safeExternal(item.link);
          if(url){const a=el('a','aszo-feed-card__link',lang==='en'?'More information ↗':'Mais informações ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';body.append(a)}
          card.append(body);fragment.append(card);
        }
        list.replaceChildren(fragment);root.hidden=false;
      })
      .catch(err=>{console.error('ASZO '+type+':',err)});
  });
})();
