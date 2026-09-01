# Security policy

## Reporting a vulnerability

Email **vakymne@gmail.com** with "SECURITY" in the subject. Please include
the URL, what you did, and what happened. A proof of concept helps; a public
issue does not — do not open one for a security report.

Expect a first reply within 5 working days. There is no bounty programme.

## What is in scope

- `vaky.me` — the marketing site and the `/demo/*` concept pages.
- `/api/lead` — the public lead-intake form. Test it against your own
  submission only; it is rate limited and its honeypot field should not be
  filled in by a human tester either.
- `/start/<token>/` and the `/api/onboarding/*` endpoints behind it — the
  private, per-client onboarding form. Test it only against a link issued to
  you; do not attempt to guess or enumerate another client's token.
- `/admin/` and `/api/admin/*` — the password-gated studio dashboard, and the
  `vaky_admin` session cookie it sets. Test login only with credentials
  Vaky has given you for that purpose; do not attempt to brute-force the
  admin password (it is rate limited and fails closed on top of that).
- This repository: the source, the build configuration, and the deploy config in `public/_headers`.

## What is out of scope

- Findings against `www.vaky.me` beyond the redirect itself.
- Missing headers on third-party responses (Google Maps, once a visitor loads it).
- Volumetric or denial-of-service testing. Do not run one.
- Automated active scans against production. Passive scanning is fine.

## What is deployed

A static Next.js export (`output: "export"`), hosted on Cloudflare Pages and
served behind Cloudflare. Every public-facing page is a file: no
authentication there. Three things are not just files, all backed by
Cloudflare Pages Functions under `functions/`, a D1 database and a private R2
bucket:

**`/api/lead`** is the only thing a stranger can submit with no credential at
all — a short public enquiry form. It is stored, Vaky is emailed, and
nothing about it is ever shown back to anyone. It sits behind a honeypot
field, an optional Turnstile check, and rate limiting.

**`/start/<token>/`** is the private onboarding form Vaky sends one client
once a project and a package are agreed. The token in the URL — 24 random
bytes, never guessable, stored in D1 only as a SHA-256 hash — is the only
credential; there is no login and no account:

- Uploading is authorised by a short-lived, separately-scoped HMAC token the
  server issues once the link token is presented, and which names exactly one
  submission.
- Every answer is re-validated server-side against the same schema the form
  is built from; answers to questions a client was never shown are discarded,
  and the *package* itself is read off the server-side link row, never off
  anything the client sends — a hand-crafted request cannot change it.
- Uploads are checked by extension **and** by their leading bytes, stored
  private, and only ever served back as `attachment`. No SVG, nothing
  executable.
- Passwords are never asked for. The form says so, on the step where someone
  might otherwise type one.

**`/admin/`** is the one authenticated area on the site: a single password
(`ADMIN_PASSWORD`, a write-only Cloudflare secret) behind a signed session
cookie, `vaky_admin` (`HttpOnly; Secure; SameSite=Strict`). There is no
session table — the cookie's own HMAC signature is the session, so rotating
the signing secret logs every session out at once. Login is rate limited and,
unlike every other limiter in this codebase, **fails closed**: a database
hiccup pauses login attempts rather than leaving them unmetered, because what
is being counted there is password guesses against the one credential that
gates everything else — leads, client answers, uploaded files.

Response headers for all of `/api/*` come from `functions/api/_middleware.ts`,
not from `public/_headers` — a Pages Function's response never sees that
file, and this middleware sits at `functions/api/`, above `onboarding/`,
`lead.ts` and `admin/` alike, so all three inherit the same CORS and security
headers from one place.

Response headers for the pages live in [`public/_headers`](public/_headers). The
canonical-host redirect is a Cloudflare dashboard rule, not a file. The DNS,
mail and verification steps that cannot live in the repository are written down
in [`docs/deployment-security.md`](docs/deployment-security.md), and the
onboarding's own setup — bindings, secrets, migrations — in
[`docs/onboarding-setup.md`](docs/onboarding-setup.md).

`npm run test:security` re-checks the deployed result.
