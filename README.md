# VibeLab.me

Marketing site for VibeLab.me — web studio from Podgorica. Bilingual (ME/EN), fully static,
zero backend, free to host.

www.vibelab.it.com

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

## Where to edit things

| What | Where |
|---|---|
| Instagram / email | `src/config/site.ts` — the ONLY place public contact info lives |
| All text + **prices/packages** | `src/i18n/me.ts` (Montenegrin) and `src/i18n/en.ts` (English) |
| Colors / fonts | `src/app/globals.css` (`@theme` block) and `src/app/root-html.tsx` |
| Landing page sections | `src/components/landing/` |
| Pixel icons | `src/components/landing/icons.tsx` — drawn as character grids, edit the picture |
| Tony (mascot) | sprite `public/mascot/tony.webp`, poses/animations in `src/app/globals.css` |
| Demo sites | `src/app/(me)/demo/<name>/` — each is self-contained |
| Logo / favicon | `public/logo-lockup.png`, `public/tony-head.png`, `src/app/icon.png` — regenerate all from the master PNGs with `node scripts/brand-assets.mjs <lockup> <head>` |
| Portfolio screenshots | `public/work/*.jpg` — regenerate with `node scripts/capture-work-shots.mjs` (dev server running) after a demo changes |
| Share card | `public/og.png` — regenerate with `node scripts/generate-og.mjs` (dev server running) |

## Routes

- `/` — Montenegrin landing page
- `/en` — English landing page
- `/demo/barber-drina`, `/demo/barbershop-stari-grad`, `/demo/konoba-skadar`, `/demo/titan-gym` — clickable portfolio
  demos (fictional businesses, `noindex`)

## Deploy (Vercel, free)

```bash
npx vercel        # first time: login + link project
npx vercel --prod
```

Currently served from `vibelab.it.com`, which is also what `site.url` in
`src/config/site.ts` declares as canonical.

Note: `vibelab.me` and `vibecode.me` are both registered to third parties (checked 2026-08-26).
When a domain you own is purchased: Vercel dashboard → Project → Settings → Domains → add it,
set the DNS records Vercel shows at the registrar, then update `site.url` — that single value
drives canonicals, the sitemap, robots.txt and the structured data.
