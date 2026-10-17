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

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 160;
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
  }

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
    const duration = 1200;
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
});
