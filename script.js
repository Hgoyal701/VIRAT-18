// script.js - interactions: sidebar active state, counters, theme
document.addEventListener('DOMContentLoaded', ()=>{
  // set year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // theme
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('light');
    themeBtn.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
  });

  // smooth scroll and active nav
  const links = document.querySelectorAll('aside .side-nav a');
  const sections = Array.from(document.querySelectorAll('main, header')).flatMap(p => Array.from(p.querySelectorAll('section, header'))).filter(Boolean);

  function onScroll(){
    const offset = window.scrollY + window.innerHeight/3;
    let current = sections[0];
    for(const sec of sections){
      if(sec.offsetTop <= offset) current = sec;
    }
    links.forEach(a=>{
      const href = a.getAttribute('href');
      if(href && current && href === '#'+current.id){
        a.classList.add('active');
      } else a.classList.remove('active');
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      if(!href) return;
      const el = document.querySelector(href);
      el?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // counters
  const counters = document.querySelectorAll('.num');
  const animate = (el, target)=>{
    const dur = 1200; let start = null;
    const tick = (t)=>{
      if(!start) start = t;
      const p = Math.min((t-start)/dur,1);
      const ease = 1 - Math.pow(1-p,3);
      el.textContent = Math.floor(target*ease).toLocaleString();
      if(p<1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const target = Number(entry.target.getAttribute('data-target')||0);
        animate(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.5});
  counters.forEach(c=>obs.observe(c));
});
