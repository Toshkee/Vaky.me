# Vaky.me launch checklist

This is the remaining cutover work after the codebase rebrand. The domain is
owned, but the site should not be published with `https://vaky.me` canonicals
until that hostname serves the Cloudflare Pages project.

## Already prepared in the repository

- Public brand name: **Vaky**; canonical brand/domain: **Vaky.me**.
- Public contact email: `vakymne@gmail.com`.
- Instagram handle: `vaky.me`.
- The horizontal `Vaky.me` lockup is installed as `public/logo-vaky.png` and
  rendered by `src/components/BrandWordmark.tsx` in the nav, the onboarding
  shell and the privacy page. The window mark cut from its left end is the
  favicon and Apple touch icon. `scripts/wordmark-asset.mjs` owns all three and
  regenerates them from the supplied artwork; `scripts/brand-assets.mjs` now
  only produces the Tony mascot.
- The new robot mark is installed as the browser and Apple touch icon.
- Metadata, sitemap, robots, structured data, privacy text, transactional
  email copy, admin/onboarding copy, Open Graph images, tests, and CI targets
  use the new brand.
- Existing D1 and R2 names that start with `vibelab-` are intentionally kept as
  private provider resource IDs. Renaming them would risk disconnecting stored
  onboarding data and does not expose the old brand to visitors.

## Assets still to provide

1. **Vector or transparent-PNG source of the lockup.** The shipped asset was
   recovered from a raster render on a black ground, so it is ink and brand red
   on transparency at 402x96 and no larger. It is sharp at nav size and will not
   survive being blown up for print or a large social banner.
2. **A light-on-dark variant** if the lockup ever has to sit on ink. The current
   asset is ink-coloured; a CSS filter would only muddy it.
3. **Mascot** — the existing Tony character stays. No new asset needed.

## Domain cutover in Cloudflare

Done so far: the `vaky.me` zone exists on the Free plan in the Cloudflare
account, with the Namecheap records imported. It stays **pending** until the
registrar points the domain at the assigned nameservers:

```text
anita.ns.cloudflare.com
nick.ns.cloudflare.com
```

Until the zone is active, Cloudflare refuses to add `vaky.me` as a Pages custom
domain at all — every step below is blocked on that one registrar change.

The imported zone still carries Namecheap's parking records: an `A` for the
apex pointing at `162.255.119.60` and a `CNAME` for `www` pointing at
`parkingpage.namecheap.com`. Both must go before the Pages custom domains are
added, or they will fight over the same names. The `MX` and SPF records for
Namecheap's mail forwarding are unrelated and should stay.

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

These are already set on the Pages project's production environment, and take
effect on the next deployment:

```text
ONBOARDING_SITE_URL=https://vaky.me
ONBOARDING_NOTIFY_TO=vakymne@gmail.com
ONBOARDING_NOTIFY_FROM=Vaky <onboarding@resend.dev>
```

`ONBOARDING_SITE_URL` builds the download links in the notification email, so
those links only resolve once `vaky.me` actually serves the site. `TURNSTILE_SECRET_KEY`
is not set in production at all — the bot check is currently off, and rate
limiting alone guards the endpoints. There is nothing to restrict to `vaky.me`
in the Turnstile dashboard until it is switched on.

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
- the Pages project itself is still named `vibelab` and deploys from the
  `Toshkee/VibeLab.me` repository. Both are private identifiers, but a Pages
  project cannot be renamed — moving them means a new project and a fresh
  custom-domain setup, which is not worth doing during the cutover;
- social previews show the Vaky Open Graph image rather than a cached old one.
