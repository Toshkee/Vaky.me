# Security policy

## Reporting a vulnerability

Email **vibecodemne@gmail.com** with "SECURITY" in the subject. Please include
the URL, what you did, and what happened. A proof of concept helps; a public
issue does not — do not open one for a security report.

Expect a first reply within 5 working days. There is no bounty programme.

## What is in scope

- `vibelab.it.com` — the marketing site and the `/demo/*` concept pages.
- This repository: the source, the build configuration, and the deploy config in `public/_headers`.

## What is out of scope

- Findings against `www.vibelab.it.com` beyond the redirect itself.
- Missing headers on third-party responses (Google Maps, once a visitor loads it).
- Volumetric or denial-of-service testing. Do not run one.
- Automated active scans against production. Passive scanning is fine; the
  repository runs a ZAP baseline scan itself.

## What is deployed

A static Next.js export (`output: "export"`), hosted on Cloudflare Pages and served behind
Cloudflare. There is no server, no database, no authentication, no session, no
cookie and no user-submitted data — the pages are files. Security work here is
therefore about what the browser is told (headers), what the domain says about
itself (DNS and mail records), and what the pages hand to third parties.

Response headers live in [`public/_headers`](public/_headers). The canonical-host redirect is a Cloudflare dashboard rule, not a file. The DNS, mail and
verification steps that cannot live in the repository are written down in
[`docs/deployment-security.md`](docs/deployment-security.md).

`npm run test:security` re-checks the deployed result.
