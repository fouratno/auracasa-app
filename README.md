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

## Tradedoubler integration (Link Converter + APIs)

### Required environment variables

Set these in `.env.local` for local development and in Vercel Project Settings → Environment Variables.

- `TRADEDOUBLER_LINK_CONVERTER_SRC` — Paste the exact Link Converter script **src** provided by Tradedoubler.
- `TRADEDOUBLER_PRODUCTS_TOKEN` — API token for the Products API.
- `TRADEDOUBLER_VOUCHERS_TOKEN` — API token for the Vouchers API (only needed if you use vouchers).
- `TRADEDOUBLER_TEST_PAGE_ENABLED` — Set to `true` in production to expose `/tradedoubler-test` (default hides it).

### How to get Tradedoubler tokens

1. Log into your Tradedoubler publisher account.
2. Navigate to **API access** and create or copy your Products and Vouchers tokens.
3. Copy the Link Converter script snippet from Tradedoubler and paste the script `src` into
   `TRADEDOUBLER_LINK_CONVERTER_SRC`.

### Local testing

1. Copy `.env.example` to `.env.local`.
2. Add your Tradedoubler tokens and Link Converter script `src`.
3. Run `npm run dev` and open `http://localhost:3000/tradedoubler-test`.
4. Enter a feed id (`fid`) and keyword to test Products, or a program id to test Vouchers.

### EPI / EPI2 tracking

- The Link Converter script receives `tdlc_epi` automatically based on the pathname (e.g. `/journal/turquoise-marble-room` → `journal_turquoise-marble-room`).
- For placement tracking (`tdlc_epi2`), you can render `components/td/LinkConverterPlacement` on any page with a placement string (for example `"hero"` or `"footer"`).

### Vercel deployment

1. Add the required environment variables in Vercel.
2. Redeploy the project.
3. (Optional) Set `TRADEDOUBLER_TEST_PAGE_ENABLED=true` to access `/tradedoubler-test` in production.

## Next Steps

- Swap hardcoded data for a CMS (Sanity).
- Add analytics (Plausible) and a cookie banner if needed.
- Add DE locale routes.
