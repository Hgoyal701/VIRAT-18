document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("light");
      const isLight = document.documentElement.classList.contains("light");
      themeToggle.textContent = isLight ? "☀️" : "🌙";
    });
  }

  const counters = document.querySelectorAll(".stat-number");
  const animateCounter = (counter) => {
    const target = Number(counter.getAttribute("data-target"));
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);

      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(tick);
  };

  counters.forEach(animateCounter);
}); 
