# Security policy

## Reporting a vulnerability

Email **vibecodemne@gmail.com** with "SECURITY" in the subject. Please include
the URL, what you did, and what happened. A proof of concept helps; a public
issue does not — do not open one for a security report.

Expect a first reply within 5 working days. There is no bounty programme.

## What is in scope

- `vibelab.it.com` — the marketing site and the `/demo/*` concept pages.
- `/start/` and the `/api/onboarding/*` endpoints behind it — the client
  onboarding form. Test it against your own submission only.
- This repository: the source, the build configuration, and the deploy config in `public/_headers`.

## What is out of scope

- Findings against `www.vibelab.it.com` beyond the redirect itself.
- Missing headers on third-party responses (Google Maps, once a visitor loads it).
- Volumetric or denial-of-service testing. Do not run one.
- Automated active scans against production. Passive scanning is fine; the
  repository runs a ZAP baseline scan itself.

## What is deployed

A static Next.js export (`output: "export"`), hosted on Cloudflare Pages and
served behind Cloudflare. Every page is a file: no authentication, no session
and no cookie anywhere on the site.

**One route is not just files.** `/start/` is the onboarding form VibeLab sends
a client once a project is agreed, and it is backed by Cloudflare Pages
Functions under `/api/onboarding/*`, a D1 database and a private R2 bucket.
That is the only part of this site that accepts user-submitted data, and it is
where the security work that is not about headers lives:

- No login and no account. Uploading is authorised by a short-lived HMAC token
  the server issues and signs, which names exactly one submission.
- Every answer is re-validated server-side against the same schema the form is
  built from; answers to questions a client was never shown are discarded.
- Uploads are checked by extension **and** by their leading bytes, stored
  private, and only ever served back as `attachment`. No SVG, nothing
  executable.
- Passwords are never asked for. The form says so, on the step where someone
  might otherwise type one.
- Response headers for `/api/*` come from `functions/api/_middleware.ts`, not
  from `public/_headers` — a Pages Function's response never sees that file.

Response headers for the pages live in [`public/_headers`](public/_headers). The
canonical-host redirect is a Cloudflare dashboard rule, not a file. The DNS,
mail and verification steps that cannot live in the repository are written down
in [`docs/deployment-security.md`](docs/deployment-security.md), and the
onboarding's own setup — bindings, secrets, migrations — in
[`ONBOARDING_SETUP.md`](ONBOARDING_SETUP.md).

`npm run test:security` re-checks the deployed result.
