# VIRAT-18

Futuristic, portfolio-style static site template focused on Virat Kohli and his cricket achievements. The site combines a clean, modern UI with a dark, glassmorphism aesthetic and a background that blends the Royal Challengers Bangalore (RCB) red with India blue for a unique team-inspired look.

What happened (language composition)

- GitHub shows this repository as primarily JavaScript (≈63.5%), with HTML (≈28.4%) and CSS (≈8.1%). That's because GitHub's language detector (Linguist) counts source bytes by file extension — this repo contains several JavaScript files (site interaction, counters, lightbox, etc.), making JS the largest language by bytes.
- This is expected for modern static sites that rely on interactive JS for counters, theme toggles, lightboxes and micro-interactions. The presence of multiple copies/versions of `script.js` in history or extra utility scripts can further increase the JS proportion.

What I improved in this commit

- Expanded the About section with a richer biography, career highlights, and guidance to keep stats accurate and verified.
- Updated styles to create a tasteful merged background (RCB red + India blue) with soft diagonal wash and radial accents for a premium look while keeping readability/accessibility in mind.
- Added a floating "achievements" tray and lightbox scaffolding in the HTML for better visual storytelling and quick highlights.
- Left placeholder numbers in the stats section and added a note to replace them with verified data from authoritative sources (ESPNcricinfo / ICC / Wisden) before publishing.

How to preview locally

1. Clone the repo:

   git clone https://github.com/Hgoyal701/VIRAT-18.git
   cd VIRAT-18

2. Serve the directory (any simple HTTP server will do):

   python3 -m http.server 8000

   Or with Node.js:

   npx http-server -c-1 .

3. Open http://localhost:8000 in your browser.

Notes and next recommended improvements

- Replace placeholder images with licensed player photos before publishing. Ensure you have the right to publish player portraits.
- Update the stats with verified numbers from ESPNcricinfo/ICC. Optionally integrate a serverless function to fetch and cache stats automatically (requires API and CORS handling).
- Accessibility: add ARIA labels where necessary, ensure keyboard navigation for the lightbox and the floating badges.
- Performance: compress images, use responsive picture sources and lazy-loading for gallery images (loading="lazy").
- Add a `package.json` and build pipeline (Vite/Parcel) if you plan to expand into a multi-file app or add SCSS/TypeScript.

If you want, I can:
- Automatically update README with `images/` examples and add a LICENSE file (MIT) and .gitignore.
- Replace placeholder stats with an up-to-date scrape from ESPNcricinfo (I will only include publicly available data and will cite sources). Confirm if you want me to fetch current stats.
- Add a small accessibility and SEO pass (meta tags, ARIA, image alt text improvements).

Credits & license

This site template is a fan-oriented showcase. All content provided here is for demonstration. Replace and verify official statistics and use only licensed images for publication.

---

Last updated: automated update by Copilot — improved About, styles and HTML scaffolding to merge RCB/India aesthetic and clarify repo composition and next steps.
