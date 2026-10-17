// script.js - interactions: sidebar active state, counters, theme, gallery lightbox, floating badges, load stats
document.addEventListener('DOMContentLoaded', () => {
  // year
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();

  // theme toggle (persisted)
  const themeBtn = document.getElementById('themeToggle');
  const applyTheme = (light) => {
    if (light) document.documentElement.classList.add('light'); else document.documentElement.classList.remove('light');
    if (themeBtn) themeBtn.textContent = light ? '☀️' : '🌙';
    try { localStorage.setItem('siteLight', light ? '1' : '0'); } catch(e){}
  };
  const saved = (localStorage.getItem('siteLight') === '1'); applyTheme(saved);
  themeBtn?.addEventListener('click', () => applyTheme(!document.documentElement.classList.contains('light')));

  // nav smooth + active
  const links = Array.from(document.querySelectorAll('.side-nav a'));
  const sections = Array.from(document.querySelectorAll('header[id], main section[id]'));
  const updateActive = () => {
    const offset = window.scrollY + window.innerHeight / 3;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= offset) current = s; });
    links.forEach(a => { const href = a.getAttribute('href')?.replace('#',''); a.classList.toggle('active', href === current.id); });
  };
  window.addEventListener('scroll', updateActive, { passive: true }); updateActive();
  links.forEach(a => { a.addEventListener('click', (e) => {
    const href = a.getAttribute('href'); if (!href || !href.startsWith('#')) return; const el = document.querySelector(href); if (!el) return; e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }); });

  // counters (intersection)
  const counters = document.querySelectorAll('.num');
  const animate = (el, target) => {
    const dur = 1400; let start = null;
    const step = (t) => { if (!start) start = t; const p = Math.min((t - start)/dur,1); const ease = 1 - Math.pow(1 - p, 3); el.textContent = Math.floor(target * ease).toLocaleString(); if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString(); };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { const target = Number(entry.target.dataset.target || 0); animate(entry.target, target); obs.unobserve(entry.target); } }); }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  } else { counters.forEach(c => animate(c, Number(c.dataset.target || 0))); }

  // gallery lightbox
  const lightbox = document.getElementById('lightbox'); const lbImg = document.getElementById('lightbox-img'); const lbCap = document.getElementById('lightbox-caption'); const lbClose = document.getElementById('lightbox-close');
  document.querySelectorAll('.gallery-item img').forEach(img => { img.addEventListener('click', () => {
    if (!lightbox || !lbImg) return; lbImg.src = img.dataset.full || img.src; lbImg.alt = img.alt || ''; lbCap.textContent = img.closest('.gallery-item')?.querySelector('figcaption')?.textContent || ''; lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden','false');
  }); });
  lbClose?.addEventListener('click', () => { lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); });
  lightbox?.addEventListener('click', (ev) => { if (ev.target === lightbox) { lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); } });

  // subtle floating animation for feat badges
  const badges = document.querySelectorAll('.feat-badge');
  badges.forEach((b,i)=>{ const delay=(i%3)*120; b.animate([{transform:'translateY(0px) rotate(0deg)'},{transform:`translateY(${ (i%2?6:-6) }px) rotate(${ (i%2?1:-1) }deg)`},{transform:'translateY(0px) rotate(0deg)'}],{duration:4200+(i*150),iterations:Infinity,delay}); });

  // load static stats JSON and show raw data
  fetch('data/stats.json').then(r=>r.ok?r.json():null).then(data=>{
    if(!data) return; document.getElementById('raw-data').textContent = JSON.stringify(data,null,2);
    // populate some obvious fields if present
    const s = data.summary || {};
    const set = (id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v;};
    set('test-matches', s.test?.matches ?? '—'); set('test-runs', s.test?.runs ?? '—'); set('test-avg', s.test?.avg ?? '—'); set('test-100s', s.test?.hundreds ?? '—');
    set('odi-matches', s.odi?.matches ?? '—'); set('odi-runs', s.odi?.runs ?? '—'); set('odi-avg', s.odi?.avg ?? '—'); set('odi-100s', s.odi?.hundreds ?? '—');
    set('t20-matches', s.t20?.matches ?? '—'); set('t20-runs', s.t20?.runs ?? '—'); set('t20-avg', s.t20?.avg ?? '—'); set('t20-100s', s.t20?.hundreds ?? '—');
    const combined = (s.test?.runs||0)+(s.odi?.runs||0)+(s.t20?.runs||0); const hundreds = (s.test?.hundreds||0)+(s.odi?.hundreds||0)+(s.t20?.hundreds||0);
    document.querySelectorAll('.num').forEach(n=>{ const key=n.dataset.target; if(!key||key==='0') return; /* keep provided targets */ });
    // If counters were placeholders (24137 etc), leave them — but update if we have better
    const runEls = document.querySelectorAll('.num'); runEls[0].dataset.target = combined; runEls[1].dataset.target = hundreds; // matches left as is
  }).catch(()=>{});

});
