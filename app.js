// app.js — adds interactivity: theme toggle, lightbox, active nav and a11y helpers
(function () {
  'use strict';

  // Helpers
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Year
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = qs('#theme-toggle');
  const root = document.documentElement;
  const THEME_KEY = 'vk_theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.classList.remove('light');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const now = root.classList.contains('light') ? 'dark' : 'light';
      applyTheme(now);
      try { localStorage.setItem(THEME_KEY, now); } catch (e) { /* ignore */ }
    });
  }

  // Lightbox
  const gallery = qs('.gallery');
  const lightbox = qs('#lightbox');
  const lightboxImg = qs('#lightbox-img');
  const lightboxCaption = qs('#lightbox-caption');
  const lightboxClose = qs('#lightbox-close');

  function openLightbox(src, alt, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus close button for keyboard users
    lightboxClose && lightboxClose.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  // click handler for gallery items (delegated)
  if (gallery) {
    gallery.addEventListener('click', (e) => {
      const figure = e.target.closest('.gallery-item');
      if (!figure) return;
      const img = figure.querySelector('img');
      if (!img) return;
      openLightbox(img.src, img.alt, img.dataset.caption || img.alt);
    });

    // keyboard open with Enter/Space
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const figure = e.target.closest('.gallery-item');
        if (!figure) return;
        e.preventDefault();
        const img = figure.querySelector('img');
        if (!img) return;
        openLightbox(img.src, img.alt, img.dataset.caption || img.alt);
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      // close when clicking the backdrop (but not the image or caption)
      if (e.target === lightbox || e.target === lightboxImg || e.target === lightboxCaption) return;
      closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // Active navigation on scroll — intersection observer for sections
  const navLinks = qsa('.side-nav a');
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = qs(`.side-nav a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(n => n.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
  }

  // Smoothly focus main when skip link is used (for some browsers)
  const skip = qs('.skip-link');
  if (skip) {
    skip.addEventListener('click', (e) => {
      const target = document.querySelector(skip.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.removeAttribute('tabindex');
      }
    });
  }

})();
