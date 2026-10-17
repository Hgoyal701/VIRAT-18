// app.js — robust, error-safe behavior for theme toggle, gallery lightbox, and active nav
(function () {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const safeStorage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        // Ignore storage failures in private mode or restricted browsers.
      }
    }
  };

  const yearEl = qs('#year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Theme toggle
  const themeToggle = qs('#theme-toggle');
  const root = document.documentElement;
  const THEME_KEY = 'vk_theme';

  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    root.classList.toggle('light', isLight);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isLight));
    }
  };

  const getPreferredTheme = () => {
    const storedTheme = safeStorage.get(THEME_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.classList.contains('light') ? 'dark' : 'light';
      applyTheme(nextTheme);
      safeStorage.set(THEME_KEY, nextTheme);
    });
  }

  // Gallery lightbox
  const gallery = qs('.gallery');
  const lightbox = qs('#lightbox');
  const lightboxImg = qs('#lightbox-img');
  const lightboxCaption = qs('#lightbox-caption');
  const lightboxClose = qs('#lightbox-close');

  const openLightbox = (src, alt = '', caption = '') => {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (lightboxClose) {
      lightboxClose.focus();
    }
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  };

  if (gallery) {
    const openFromFigure = (figure) => {
      if (!figure) return;
      const img = figure.querySelector('img');
      if (!img) return;
      openLightbox(img.src, img.alt, img.dataset.caption || img.alt);
    };

    gallery.addEventListener('click', (event) => {
      const target = event.target;
      const figure = target && target.closest ? target.closest('.gallery-item') : null;
      openFromFigure(figure);
    });

    gallery.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      const target = event.target;
      const figure = target && target.closest ? target.closest('.gallery-item') : null;
      if (!figure) return;

      event.preventDefault();
      openFromFigure(figure);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }

  // Active section highlighting in sidebar
  const navLinks = qsa('.side-nav a');
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;
          const activeLink = qs(`.side-nav a[href="#${id}"]`);
          if (!activeLink) return;

          navLinks.forEach((link) => link.classList.remove('active'));
          activeLink.classList.add('active');
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Skip-link focus helper
  const skipLink = qs('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (event) => {
      const targetSelector = skipLink.getAttribute('href');
      const target = targetSelector ? document.querySelector(targetSelector) : null;

      if (!target) return;

      event.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => target.removeAttribute('tabindex'), 1000);
    });
  }
})();
