# Vaky.me launch checklist

This is the remaining cutover work after the codebase rebrand. The domain is
owned, but the site should not be published with `https://vaky.me` canonicals
until that hostname serves the Cloudflare Pages project.

## Already prepared in the repository

- Public brand name: **Vaky**; canonical brand/domain: **Vaky.me**.
- Public contact email: `vakymne@gmail.com`.
- Instagram handle: `vaky.me`.
- A text-only `Vaky.` wordmark is the temporary logo.
- The new robot mark is installed as the browser and Apple touch icon.
- Metadata, sitemap, robots, structured data, privacy text, transactional
  email copy, admin/onboarding copy, Open Graph images, tests, and CI targets
  use the new brand.
- Existing D1 and R2 names that start with `vibelab-` are intentionally kept as
  private provider resource IDs. Renaming them would risk disconnecting stored
  onboarding data and does not expose the old brand to visitors.

## Assets to provide

Send the cleanest source files available. SVG is preferred for marks made from
vectors; transparent PNG is fine for raster or pixel artwork.

1. **Primary wordmark** — horizontal Vaky or Vaky.me logo, transparent
   background. It will replace the temporary text in
   `src/components/BrandWordmark.tsx` everywhere at once.
2. **Mascot** — the existing Tony character remains part of the Vaky identity.
   No replacement asset is needed.
3. **Optional social lockup** — only if the Open Graph card should use a
   different composition from the primary logo. Until then, the generated
   Vaky text card is valid and has no old branding.

Do not manually resize the source art. `scripts/process-favicon.mjs` now
produces the optimized favicon outputs from the supplied square mark, and
`scripts/brand-assets.mjs` handles the final nav and mascot assets.

## Domain cutover in Cloudflare

- Add `vaky.me` and `www.vaky.me` as custom domains on the existing Pages
  project and wait until both show active.
- Confirm `https://vaky.me/`, `/en/`, `/privacy/`, `/start/`, and `/admin/`
  load from the expected deployment.
- Add the `www` → apex 301 redirect and Always Use HTTPS setting described in
  `docs/deployment-security.md`.
- On the old `vibelab.it.com` zone, add a path- and query-preserving 301 to
  `https://vaky.me`. Keep the old domain redirect for at least 12 months.
- Restrict Turnstile, Umami, and any form provider to `vaky.me` where those
  provider dashboards support an allowed-domain list.
- After launch, submit `https://vaky.me/sitemap.xml` in Google Search Console
  and use its Change of Address flow for the old property if available.

## Production variables and secrets

In Cloudflare Pages, review these before the first production deployment:

```text
ONBOARDING_SITE_URL=https://vaky.me
ONBOARDING_NOTIFY_TO=vakymne@gmail.com
ONBOARDING_NOTIFY_FROM=Vaky <onboarding@resend.dev>
```

`ONBOARDING_NOTIFY_FROM` may move to an `@vaky.me` address only after that
sending domain is verified with the mail provider. Keep existing secret values
for `ONBOARDING_TOKEN_SECRET`, `ADMIN_PASSWORD`, `TURNSTILE_SECRET_KEY`, and
`RESEND_API_KEY`; rotating them is not required by the rename.

Also review the public build variables from `.env.example`. Blank values keep
their optional features off and are safer than copying settings from the old
domain without updating provider restrictions.

## Mail and account identity

- Use `vakymne@gmail.com` for public contact now.
- Before sending as an `@vaky.me` mailbox, configure and verify SPF, DKIM, and
  DMARC using the staged process in `docs/deployment-security.md`.
- Rename the sender/profile labels in Cloudflare, Resend, GitHub, analytics,
  Search Console, and invoicing accounts where those names are customer-facing.
  Internal IDs do not need to be renamed.

## Final verification

Run locally:

```bash
npm run lint
npm run typecheck
npm run build
npm run check:a11y
npm run check:mobile
```

After the domain is live:

```bash
npm run test:security https://vaky.me
```

Then verify that:

- `www.vaky.me` and `vibelab.it.com` each reach `vaky.me` in one 301 hop;
- path and query strings survive both redirects;
- a lead arrives at `vakymne@gmail.com`;
- a private onboarding link, file upload, and admin login still work;
- page source contains no `VibeLab`, `vibecode`, or old public contact handle;
- social previews show the Vaky Open Graph image rather than a cached old one.
