VIRAT-18 — Virat Kohli fan site

This branch (improve/vercel-deploy) contains a static, deploy-ready site about Virat Kohli with improved styling and accessibility.

How to run locally

- Install a simple static server (optional):
  - npx serve .
  - or: python -m http.server 3000

- Or use Vercel CLI for local dev:
  - npm i -g vercel
  - vercel dev

Deploy to Vercel

- Connect this repository to Vercel and deploy the improve/vercel-deploy branch, or run `vercel --prod` from this branch.

Notes

- Images in /index.html currently link to Unsplash placeholders — replace with high-resolution licensed images.
- The site is intentionally minimal and static. If you'd like an Express/Next.js version, I can scaffold that.
