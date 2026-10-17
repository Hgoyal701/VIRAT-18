document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      const isLight = document.documentElement.classList.contains('light');
      themeBtn.textContent = isLight ? '☀️' : '🌙';
    });
  }

  const navLinks = document.querySelectorAll('.side-nav a');
  const sections = [...document.querySelectorAll('header[id], main section[id]')];

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 180;
    let activeId = 'hero';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', targetId === activeId);
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const counters = document.querySelectorAll('.num');
  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1400;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      element.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach((counter) => animateCounter(counter));
  }

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImage = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', () => {
        if (!lightboxImage || !lightboxCaption) return;
        lightboxImage.src = img.dataset.full || img.src;
        lightboxImage.alt = img.alt || '';
        const caption = img.closest('.gallery-item')?.querySelector('figcaption')?.textContent || '';
        lightboxCaption.textContent = caption;
        lightbox.classList.add('show');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    closeBtn?.addEventListener('click', () => {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove('show');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
