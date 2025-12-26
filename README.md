# Auracasa MVP (Next.js + Tailwind)

## Quick Start

1. Ensure Node 20.x.
2. Install deps: `npm i` (or `pnpm i` / `yarn`).
3. Dev: `npm run dev` → http://localhost:3000
4. Build: `npm run build` then `npm start`.

## One-Click Deploy (Vercel)

- Create a new project on Vercel and import this repo.
- Set framework = Next.js, root = `/`.
- Add domain (e.g., auracasa.vercel.app or custom).
- Redeploy after changes.

## Customize

- Edit colors in `tailwind.config.ts` (brand, accent, blush).
- Replace images in `/public`.
- Update legal text in `/app/legal/*`.
- Contact form uses Formspree: replace action URL in `/app/contact/page.tsx` with your endpoint.

## Next Steps

- Swap hardcoded data for a CMS (Sanity).
- Add analytics (Plausible) and a cookie banner if needed.
- Add DE locale routes.
