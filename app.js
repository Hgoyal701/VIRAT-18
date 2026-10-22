:root {
  --bg: #0b1117;
  --bg-soft: #121d2a;
  --surface: rgba(17, 28, 42, 0.9);
  --surface-strong: rgba(20, 32, 47, 0.96);
  --panel: rgba(255, 255, 255, 0.03);
  --text: #edf4ff;
  --muted: #aabbd3;
  --accent: #d91c26;
  --accent-2: #ff5b62;
  --gold: #f2c76e;
  --line: rgba(255, 255, 255, 0.09);
  --shadow: 0 28px 60px rgba(0, 0, 0, 0.25);
}

:root.light {
  --bg: #f5f3ef;
  --bg-soft: #efe7df;
  --surface: rgba(255, 255, 255, 0.82);
  --surface-strong: rgba(255, 255, 255, 0.92);
  --panel: rgba(255, 255, 255, 0.72);
  --text: #101827;
  --muted: #4b5d73;
  --accent: #bd1225;
  --accent-2: #e15d64;
  --gold: #cd9d39;
  --line: rgba(17, 24, 39, 0.08);
  --shadow: 0 24px 55px rgba(15, 23, 42, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(217, 28, 38, 0.18), transparent 24%),
    radial-gradient(circle at bottom right, rgba(242, 199, 110, 0.12), transparent 20%),
    linear-gradient(180deg, var(--bg), var(--bg-soft));
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

button,
a {
  transition: 0.2s ease;
}

button {
  font: inherit;
}

p,
ul,
h1,
h2,
h3 {
  margin-top: 0;
}

.container {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(14px);
  background: rgba(17, 30, 39, 0.78);
  border-bottom: 1px solid var(--line);
}

:root.light .topbar {
  background: rgba(255, 255, 255, 0.72);
}

.nav-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  gap: 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 150px;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 800;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--gold));
  color: #12090a;
  font-size: 0.82rem;
  font-weight: 900;
  box-shadow: 0 12px 28px rgba(217, 28, 38, 0.25);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--muted);
}

.main-nav a {
  position: relative;
  color: inherit;
  text-decoration: none;
  font-size: 0.95rem;
}

.main-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--accent), var(--gold));
  opacity: 0;
  transform: scaleX(0.7);
  transition: 0.2s ease;
}

.main-nav a:hover::after,
.main-nav a:focus-visible::after,
.main-nav a.active::after {
  opacity: 1;
  transform: scaleX(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-toggle,
.nav-toggle {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  cursor: pointer;
}

.theme-toggle {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 1.1rem;
}

.nav-toggle {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  padding: 10px 9px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.nav-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 99px;
  background: currentColor;
}

.hero {
  padding: 72px 0 50px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 32px;
  align-items: center;
}

.kicker {
  margin-bottom: 14px;
  color: var(--gold);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 800;
}

h1 {
  margin: 0;
  font-size: clamp(3.1rem, 6vw, 5.6rem);
  line-height: 0.92;
  letter-spacing: -0.06em;
}

.highlight {
  color: var(--accent-2);
}

.subtitle {
  margin-top: 20px;
  max-width: 620px;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.8;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
}

.btn.primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: white;
  box-shadow: 0 16px 36px rgba(217, 28, 38, 0.28);
}

.btn.secondary {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
}

.btn:hover,
.theme-toggle:hover,
.nav-toggle:hover,
.filter-btn:hover {
  transform: translateY(-1px);
}

.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 580px;
  margin-top: 30px;
}

.mini-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 20px 16px 18px;
  box-shadow: var(--shadow);
}

.mini-value {
  font-size: clamp(1.5rem, 2vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

.mini-label {
  margin-top: 7px;
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-visual {
  position: relative;
}

.photo-card {
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.photo-card img {
  width: 100%;
  height: 620px;
  object-fit: cover;
  display: block;
}

.floating-badge {
  position: absolute;
  right: 18px;
  bottom: 18px;
  min-width: 190px;
  padding: 18px 18px 16px;
  border-radius: 20px;
  background: rgba(18, 23, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: var(--shadow);
}

:root.light .floating-badge {
  background: rgba(255, 255, 255, 0.86);
}

.badge-label {
  display: block;
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.floating-badge strong {
  display: block;
  margin-top: 8px;
  font-size: clamp(1.7rem, 2vw, 2.25rem);
  color: var(--gold);
}

.section {
  padding: 54px 0;
}

.section-header {
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  font-size: clamp(2.2rem, 3vw, 3.1rem);
  letter-spacing: -0.05em;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-btn {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  cursor: pointer;
  font-weight: 600;
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-color: transparent;
  box-shadow: 0 12px 26px rgba(217, 28, 38, 0.24);
}

.moment-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.moment-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 22px 20px;
  box-shadow: var(--shadow);
  transition: transform 0.22s ease, border-color 0.22s ease, opacity 0.22s ease;
}

.moment-card:hover {
  transform: translateY(-6px);
  border-color: rgba(242, 199, 110, 0.2);
}

.moment-card.is-hidden {
  display: none;
}

.pill {
  display: inline-flex;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(242, 199, 110, 0.12);
  color: var(--gold);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 800;
}

.moment-card h3 {
  margin: 18px 0 10px;
  font-size: 1.35rem;
}

.moment-card p {
  margin-bottom: 0;
  color: var(--muted);
  line-height: 1.8;
}

.snapshot {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 28px;
}

.snapshot-box {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 20px 16px;
}

.snapshot-label {
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.snapshot-value {
  margin-top: 12px;
  font-size: clamp(1.9rem, 2vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 22px 18px;
  box-shadow: var(--shadow);
}

.format {
  color: var(--gold);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
}

.stats-value {
  margin-top: 14px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.stats-meta {
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.9;
  font-size: 0.96rem;
}

.timeline-shell {
  padding: 22px 18px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.02);
}

.timeline {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 18px;
}

.timeline-item {
  position: relative;
  padding-top: 18px;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 16px;
  background: linear-gradient(180deg, var(--gold), var(--accent));
  transform: translateX(-50%);
}

.timeline-card {
  min-height: 170px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 14px 16px;
  box-shadow: var(--shadow);
}

.timeline-year {
  color: var(--gold);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 800;
}

.timeline-title {
  margin-top: 10px;
  font-size: 1.02rem;
  font-weight: 700;
}

.timeline-text {
  margin-top: 12px;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.7;
}

.records {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.record-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 22px 20px;
  box-shadow: var(--shadow);
}

.record-card h3 {
  margin: 0 0 12px;
  font-size: 1.1rem;
}

.record-card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  line-height: 1.9;
}

.footer {
  padding: 28px 0 60px;
  text-align: center;
  color: var(--muted);
}

@media (max-width: 980px) {
  .hero-grid,
  .moment-grid,
  .snapshot,
  .stats-grid,
  .records {
    grid-template-columns: 1fr 1fr;
  }

  .timeline {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .nav-toggle {
    display: inline-flex;
  }

  .main-nav {
    position: absolute;
    top: calc(100% + 10px);
    right: 16px;
    left: 16px;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 18px 20px;
    border-radius: 18px;
    background: rgba(15, 23, 32, 0.96);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
  }

  :root.light .main-nav {
    background: rgba(255, 255, 255, 0.94);
  }

  .main-nav.is-open {
    display: flex;
  }

  .hero-grid,
  .moment-grid,
  .snapshot,
  .stats-grid,
  .records,
  .timeline {
    grid-template-columns: 1fr;
  }

  .photo-card img {
    height: 440px;
  }
}

@media (max-width: 560px) {
  .nav-shell {
    min-height: 70px;
  }

  .brand {
    letter-spacing: 0.07em;
    font-size: 0.72rem;
  }

  .mini-stats {
    grid-template-columns: 1fr;
  }

  .cta-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
