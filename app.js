// Minimal JS for theme toggle and lightbox interactions
(function(){
  // Year in footer
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // Theme toggle — toggles html.light class
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('vk-theme');
  if (saved === 'light') root.classList.add('light');
  if (saved === 'dark') root.classList.remove('light');

  btn.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    btn.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem('vk-theme', isLight ? 'light' : 'dark');
  });

  // Gallery lightbox
  const gallery = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt, caption){
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCaption.textContent = caption || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    lbClose.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  gallery.forEach(img => {
    const parent = img.closest('.gallery-item');
    const caption = img.dataset.caption || img.getAttribute('alt') || '';
    parent.addEventListener('click', () => openLightbox(img.src, img.alt, caption));
    parent.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(img.src, img.alt, caption); });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e)=> { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e)=> { if (e.key === 'Escape') closeLightbox(); });
})();
