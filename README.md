# VibeCode.me

Marketing site for VibeCode.me — web studio from Podgorica. Bilingual (ME/EN), fully static,
zero backend, free to host.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

## Where to edit things

| What | Where |
|---|---|
| Phone / WhatsApp / Instagram / email | `src/config/site.ts` — the ONLY place contact info lives |
| All text + **prices/packages** | `src/i18n/me.ts` (Montenegrin) and `src/i18n/en.ts` (English) |
| Colors / fonts | `src/app/globals.css` (`@theme` block) and `src/app/layout.tsx` |
| Landing page sections | `src/components/landing/` |
| Demo sites | `src/app/demo/<name>/` — each is self-contained |
| Logo / OG images | `public/` |

## Routes

- `/` — Montenegrin landing page
- `/en` — English landing page
- `/demo/konoba-skadar`, `/demo/titan-gym`, `/demo/barbershop-stari-grad` — clickable portfolio
  demos (fictional businesses, `noindex`)

## Deploy (Vercel, free)

```bash
npx vercel        # first time: login + link project
npx vercel --prod
```

When the `vibecode.me` domain is purchased: Vercel dashboard → Project → Settings → Domains →
add `vibecode.me`, then set the two DNS records Vercel shows at the registrar.
