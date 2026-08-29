# Deployment security — steps that live outside the repository

> **Where the site actually is.** `vibelab.it.com` is served by **Cloudflare
> Pages**, built from the GitHub repository — a `git push` deploys the public
> site. There is one host and one set of config files.
>
> Response headers live in `public/_headers`. Next copies everything in
> `public/` into `out/` verbatim, which is where Pages looks for it. A second
> host used to build this repo in parallel from `vercel.json`; that project and
> its config are gone, so `_headers` is now the only place a deploy sets
> anything. **The canonical-host redirect is not in the repository at all** —
> see section 2.

`public/_headers` covers everything a deploy can set on its own. The rest of
this list is dashboard and DNS work: Cloudflare is authoritative at the edge,
and mail authentication is a property of the domain, not of the site. Nothing
here is done by pushing code.

Run `npm run test:security https://vibelab.it.com` after each change — it is
the fastest way to see which of these actually took effect.

---

## 1. Response headers

`public/_headers` sets CSP, `X-Frame-Options: DENY`, HSTS, `nosniff`,
`Referrer-Policy`, `Permissions-Policy` and COOP on every route.

**Why the CSP still allows `'unsafe-inline'` for scripts and styles.** A Next.js
static export inlines its bootstrap and its flight payload directly into the
HTML, and Tailwind's preflight arrives as an inline `<style>`. Nonces are a
server-render feature — there is no server here to mint one per request, and a
hash list would have to be regenerated on every build and could not cover the
per-page payload. Dropping `'unsafe-inline'` today breaks the site; the CSP
compensates where it can, with `default-src 'self'`, `object-src 'none'`,
`base-uri 'self'`, `script-src-attr 'none'` (no `onclick=` handlers) and a
`frame-src` limited to `https://www.google.com`. Revisit this if the site ever
gains a rendering server.

**Verify Cloudflare passes them through.** Pages serves the file directly, but a
proxied response can still be rewritten at the edge.

```bash
curl -sI https://vibelab.it.com/ | grep -iE 'content-security|frame-options|strict-transport|permissions-policy|referrer|content-type-options|opener'
```

If a header is missing from that output but present in `public/_headers`, reproduce
it with a Cloudflare **Response Header Transform Rule**
(Rules → Transform Rules → Modify Response Header), matching all requests.

Also check for a leftover `access-control-allow-origin: *`. Nothing here needs
it; if Cloudflare adds it, delete that rule.

**HSTS preload is deliberately not set.** `includeSubDomains` already applies to
every subdomain; adding `preload` and submitting the domain is close to
irreversible, and it would break any future subdomain that cannot serve HTTPS.
Leave it until there is a reason.

## 2. Canonical host

**This redirect lives in the Cloudflare dashboard, not in the repository.** It
cannot live in `public/_redirects`: a Pages `_redirects` source has to start
with `/`, so it matches paths and not hostnames. A line beginning
`https://www.…` is discarded as invalid at build time — without an error, and
without failing the build. That was the state for a while: `vercel.json` held
a `www` rule Cloudflare never read, a `_redirects` line Pages silently threw
away, and both hostnames answering 200 with identical HTML. The canonical tag
kept search engines pointed at the apex, but a canonical is a hint and a 301
is an instruction.

The live rule is a **Redirect Rule**, named `www to apex (301)`, built from
Cloudflare's own "Redirect from WWW to root" template:

- **When:** wildcard pattern `https://www.*`
- **Then:** 301 to `https://${1}`

To recreate it: Rules → **Redirect Rules** → Create rule → Templates →
"Redirect from WWW to root". Deploy it unchanged.

Two things that look wrong but are not. Cloudflare warns on deploy that `www`
may not be a proxied DNS record and the rule may not fire — ignore it and
deploy anyway. `www` reaches Cloudflare as a Pages custom domain, which the
Rules UI does not recognise as a zone DNS record. Do **not** accept its offer
to create a proxied `www` record; that can collide with the Pages custom
domain. Second, leave **Preserve query string** unchecked — `${1}` already
captures the full URI, query string included, and ticking the box risks
duplicating it. Both were verified against production.

Also confirm SSL/TLS → Edge Certificates → **Always Use HTTPS: on**.

Verify:

```bash
curl -sI https://www.vibelab.it.com/ | head -3      # expect 301 → https://vibelab.it.com/
curl -sI http://vibelab.it.com/ | head -3           # expect 301 → https
```

## 3. DNSSEC and CAA

- Cloudflare → DNS → Settings → **Enable DNSSEC**, then add the DS record it
  shows you at the registrar. DNSSEC is not active until the registrar has it.
- CAA: do **not** guess the issuer set. List what is actually in use first:

  ```bash
  dig +short CAA vibelab.it.com
  openssl s_client -connect vibelab.it.com:443 -servername vibelab.it.com </dev/null 2>/dev/null | openssl x509 -noout -issuer
  ```

  Cloudflare's Universal SSL rotates between issuers (Let's Encrypt, Google
  Trust Services, SSL.com), and Pages issues its own certificates for the
  `*.pages.dev` deployment domains. A CAA record that omits one of them blocks renewal and
  takes the site down at the next rotation, silently, weeks later. Add CAA only
  once every issuer is listed — Cloudflare's own "CAA records" helper page
  generates the correct set for the account.

## 4. Mail: SPF, DKIM, DMARC

The domain has SPF with a soft fail and **no DMARC record**, so anyone can send
mail as `@vibelab.it.com` and nothing tells receivers to distrust it. Fix it in
this order — publishing `p=reject` first would silently drop real mail.

1. **Inventory every legitimate sender.** Registrar forwarding, Gmail
   "send mail as", any transactional provider. Write the list down here.
2. **Enable DKIM at each one** and publish the selector records it gives you.
   Verify each: `dig +short <selector>._domainkey.vibelab.it.com TXT`.
3. **Rewrite SPF** to exactly those senders, one record, ending in `-all` only
   after step 6. Keep the lookup count under 10.
4. **Create a reports mailbox** (`dmarc@vibelab.it.com` forwarding somewhere
   real, or a reporting service).
5. **Publish monitoring DMARC** at `_dmarc.vibelab.it.com`:

   ```
   v=DMARC1; p=none; adkim=s; aspf=s; rua=mailto:dmarc@vibelab.it.com; fo=1
   ```

6. **Read reports for at least 14 days.** Every source that is legitimate must
   pass aligned SPF or aligned DKIM before moving on. Fix what does not.
7. **Quarantine gradually:** `p=quarantine; pct=25` → a week → `pct=100`.
8. **Enforce:** `p=reject`, once nothing legitimate is failing.

Verify at each step: `dig +short TXT _dmarc.vibelab.it.com`.

## 5. Repository security

Enable in GitHub → Settings → Code security:

- **Dependabot alerts** and **security updates** (the update schedule itself is
  in `.github/dependabot.yml`).
- **Secret scanning** and **push protection**.

CI already runs lint, typecheck, build, `npm audit --audit-level=high` and
Gitleaks over the full history on every push; the ZAP baseline scan runs weekly
and on demand. All actions are pinned to commit SHAs — when Dependabot proposes
a bump, it rewrites the SHA and the `# vX.Y.Z` comment together.

## 6. Third-party requests from the pages

Fonts are self-hosted by next/font, so there is no CDN in the critical path.
Beyond that the pages can reach exactly three hosts, and only under conditions
the visitor controls or the build decides:

| Host | When | Guard |
| --- | --- | --- |
| `www.google.com` | only after a visitor presses **Prikaži mapu** on a demo page | `src/components/demo/MapEmbed.tsx`, iframe is `referrerPolicy="no-referrer"` |
| `challenges.cloudflare.com` | only once someone starts filling the concept form in, and only if a Turnstile site key is configured | `src/components/landing/Turnstile.tsx` |
| `usebasin.com` | only on form submit, and only if a form endpoint is configured | `src/components/landing/ConceptRequest.tsx` |
| `cloud.umami.is` | on page load, and only if a website id is configured | `src/components/Analytics.tsx` |
| `static.cloudflareinsights.com` | on page load — **Cloudflare injects this itself**, no code here asks for it | Cloudflare dashboard → Web Analytics |

**Decide about Cloudflare Web Analytics.** It is on today: production serves
`beacon.min.js` on every page. It is in the CSP so that deploying these headers
does not silently break it. Two coherent choices, not three:

- **Turn it off** (Cloudflare → Web Analytics → remove the site) once Umami is
  running — one analytics tool, one disclosure. Then delete
  `static.cloudflareinsights.com` and `cloudflareinsights.com` from the CSP.
- **Keep it**, and set `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS=on` so the privacy
  page says so. A tracker nobody discloses is the problem this whole section
  exists to avoid.

All four are named explicitly in the CSP in `public/_headers` — never a wildcard.
The three configurable ones are off unless the matching `NEXT_PUBLIC_*`
variable is set (see `.env.example`); with them unset the exported HTML
contains no reference to them at all.

Two rules when this list changes:

- A new origin goes into `script-src` / `connect-src` / `frame-src` by name in
  the same change that adds the code, or the feature ships broken behind CSP.
  A self-hosted Umami means swapping `cloud.umami.is` for that host.
- The privacy note (`privacy` in `src/i18n/me.ts` and `en.ts`) gets its
  section in the same change. It renders per service, keyed on whether that
  service is configured in the build, so a section that describes a tool the
  site does not use will not appear — but one that is missing entirely will
  never appear either.

## 7. Demo contact data

Concept pages must not republish a real person's phone number, street address
or personal social profile without documented permission. `barber-drina` uses
placeholder contact details for this reason; if the shop asks for the real ones,
record that permission in this file before putting them back.

## 8. Post-deploy checklist

```bash
npm run build
npm run test:security https://vibelab.it.com
```

Then confirm by hand, once:

- The site cannot be framed — CSP `frame-ancestors 'none'` plus `X-Frame-Options`.
- No CSP violations in the browser console on `/`, `/en/` and each demo.
- The map loads only after the button, in both mouse and keyboard use.
- `dig +short TXT _dmarc.vibelab.it.com` returns the expected policy.
