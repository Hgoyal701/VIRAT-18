# VIRAT-18

This repo is a small single-page site built with Vite + TypeScript. The app mounts into index.html and uses a lightweight DOM-based renderer in src/main.ts.

What's included
- Vite dev/build setup (package.json + vite.config.ts)
- TypeScript config (tsconfig.json)
- src/main.ts entry and styles
- metadata.json with stats and gallery URLs

Fixes made
- Removed static local image imports (these caused Vercel build failures when images were absent).
- Updated code to use remote URLs from metadata.json with fallbacks.

How to run
1. npm install
2. npm run dev (open http://localhost:5173)
3. npm run build

If you'd like, I can:
- Commit the three image files you provided directly into src/assets so they are bundled locally (you can upload them here), or
- Add a GitHub Actions workflow to build the site and publish it to GitHub Pages, or
- Add a Vercel/Netlify config file.
