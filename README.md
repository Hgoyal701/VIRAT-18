# VIRAT-18 — Virat Kohli fan site

This branch (virat-site) adds a single-page portfolio-style site for Virat Kohli: hero, achievements, career timeline, stats, and gallery.

What I added
- index.html — single-page layout.
- assets/css/styles.css — responsive styling with light/dark theme.
- assets/js/script.js — JavaScript for theme toggle, smooth-scroll, counters, lightbox, and loading static stats.
- data/stats.json — a static snapshot of career stats to populate the page.

Notes & next steps
- Stats.json is a static snapshot. If you want live stats, we can integrate an API (ESPNcricinfo unofficial APIs or a paid cricket API). That will require handling CORS or a server-side proxy.
- Images are simple SVG placeholders. Replace assets/img/*.svg with photos you own or licensed images. Add image credits in the About section.
- I can open a Pull Request from virat-site -> main if you want. Reply "open PR" and I will create it.

How to preview locally
1. Clone the repo and checkout the branch `virat-site`.
2. Open `index.html` in a browser (no build step required).

License
This repo follows the original repository license. Replace images with properly licensed photos before publishing publicly.
