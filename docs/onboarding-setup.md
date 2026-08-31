# Client workflow — setup

Everything under `/api/`, `/start/` and `/admin/` is Cloudflare Pages work:
one database, one bucket, a handful of secrets. This file is the whole list.

**What this system is now.** A visitor fills a short public form and becomes a
*lead*. VibeLab looks at the lead and gets in touch — Instagram, WhatsApp, a
call — and agrees a package and a price **outside the site**. Only then does
a *project* get created in the admin dashboard, which mints a **private,
single-use onboarding link**. The client opens that link, fills a
package-specific brief, and VibeLab is notified. The dashboard shows
everything — leads, projects, briefs, files — and can turn a finished project
into a **Build Brief**: a markdown document to paste into an external coding
agent that actually builds the site.

**There is no payment anywhere in this.** No Stripe, no checkout, no invoice
page. Assigning a package to a project charges nobody — it just records what
was agreed in conversation.

---

## How the pieces fit together

| Step | What happens | Where |
| --- | --- | --- |
| 1 | A visitor submits the public form. | `POST /api/lead` |
| 2 | The lead lands in D1 with `status = 'new'`; VibeLab is emailed. | `leads` table |
| 3 | VibeLab contacts the person and agrees a package and price. | outside the site |
| 4 | An admin creates a project (from the lead, or from scratch) and picks the agreed package. | `/admin/`, `POST /api/admin/projects` or `.../leads/:id/convert` |
| 5 | An admin mints a private onboarding link for that project. | `POST /api/admin/projects/:id/onboarding` |
| 6 | The client opens `/start/<token>/`, which resolves to the package and prefilled business details the link carries — never something the client chooses. | `functions/start/[token].ts`, `POST /api/onboarding/context` |
| 7 | The client fills the brief for that package and uploads files; VibeLab is emailed the finished brief. | `POST /api/onboarding/session`, `.../upload`, `.../submit` |
| 8 | The dashboard shows the brief, files, and any scope warnings (answers that reach outside the package). | `GET /api/admin/projects/:id` |
| 9 | An admin generates a Build Brief — full, design, or technical — and pastes it into a coding agent. | `POST /api/admin/projects/:id/brief` |

The package is decided once, by VibeLab, when the link is minted. Nothing the
client does in the form — not a query string, not a hand-crafted request body
— can change which package their answers are validated against, because the
package lives on the server-side `onboarding_requests` row, never in the URL
or the request.

---

## Architecture decision

| Piece | Choice | Why |
| --- | --- | --- |
| Backend | **Cloudflare Pages Functions** (`functions/api/**`, `functions/start/[token].ts`) | The site is a static export on Cloudflare Pages. A `functions/` directory at the repo root is compiled and deployed by the same `git push` that deploys the site — no second host, no second deploy. |
| Database | **Cloudflare D1** (SQLite) | One database, `vibelab-onboarding`, holding both the client-facing tables from the original onboarding form and the newer leads/projects/links/notes/briefs tables. |
| File storage | **Cloudflare R2**, private bucket | Objects are never public. VibeLab reaches them through signed, expiring links in the notification email, or through the cookie-authorised `/api/admin/file` route. |
| Admin auth | **One Cloudflare secret** (`ADMIN_PASSWORD`), a signed cookie | There is exactly one admin — the studio — so this is deliberately not a user system. No session table: the cookie's signature *is* the session. |
| Build Brief | **Deterministic string assembly** (`server/admin/brief.ts`) | No model is called and nothing costs money. The brief is a transformation of what is already stored — a fact never collected comes out as "Not provided", never as something invented. |
| Email | **Resend** | One `fetch`, no SDK. Its shared `onboarding@resend.dev` sender works before any DNS is set up, at the cost of only delivering to the Resend account's own address. |
| Bot check | **Cloudflare Turnstile**, optional | Verified server-side on the public lead form. With no secret configured the check is skipped and rate limiting alone applies. |

**Everything optional degrades to a stated behaviour, never to an error:**
with no Turnstile secret the bot check is skipped; with no Resend key a lead
or a brief is stored and the row records that nobody was emailed. The
database is always the record — the email is a copy.

---

## Environment variables and secrets

Set these in **Cloudflare dashboard → Workers & Pages → your Pages project →
Settings → Variables and secrets**, for **both** Production and Preview —
or with `wrangler`, see below.

| Name | Kind | Required | What it is |
| --- | --- | --- | --- |
| `ONBOARDING_TOKEN_SECRET` | Secret | **yes** | Signs upload tokens, the download links in notification emails, and the admin session cookie (a different HMAC *scope* per use, so one kind of signature can never be replayed as another). Generate with `openssl rand -base64 48`. |
| `ADMIN_PASSWORD` | Secret | **yes, for `/admin/`** | The one password behind the dashboard. With this unset, `/api/admin/login` refuses every request — there is no fallback and no way in. |
| `RESEND_API_KEY` | Secret | recommended | From resend.com → API Keys. Without it, leads and briefs are stored but nobody is emailed. |
| `TURNSTILE_SECRET_KEY` | Secret | optional | The Turnstile widget's **secret** key. **Not set in production today** — the lead form runs on rate limiting alone, which is a deliberate, working fallback. |
| `ONBOARDING_NOTIFY_TO` | Variable | no | Where lead and brief notifications go. Defaults to `vibecodemne@gmail.com` in code (`DEFAULT_NOTIFY_TO` in `server/onboarding/env.ts`); **production has this explicitly set to `vibelabmne@gmail.com`.** |
| `ONBOARDING_NOTIFY_FROM` | Variable | no | Defaults to `VibeLab <onboarding@resend.dev>`, which needs no DNS but can only deliver to the Resend account owner's own address. Change it to an address on a verified domain once you have one. |
| `ONBOARDING_SITE_URL` | Variable | no | Origin used to build links in emails (download links, dashboard deep links, the `/start/<token>/` URL itself). Defaults to the origin the request arrived on, which is correct in production. |

The bindings `DB` and `UPLOADS` are set separately, below — they are
bindings, not variables, and nothing here reaches the browser. No
`NEXT_PUBLIC_*` value is involved.

### Setting secrets from the command line

`wrangler` can write a Pages secret directly, without opening the dashboard.
It prompts for the value rather than taking it as an argument, so it never
lands in your shell history:

```bash
npx wrangler pages project list
```

Find your Pages project's name in that output, then, for each secret:

```bash
npx wrangler pages secret put ONBOARDING_TOKEN_SECRET --project-name <your-pages-project>
npx wrangler pages secret put ADMIN_PASSWORD --project-name <your-pages-project>
npx wrangler pages secret put RESEND_API_KEY --project-name <your-pages-project>
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name <your-pages-project>
```

Run each one twice if Production and Preview need different values — `wrangler`
sets both environments in one call otherwise. `npx wrangler pages secret list
--project-name <your-pages-project>` lists names only; a secret is write-only
and cannot be read back through the CLI or the dashboard. The three plain
variables (`ONBOARDING_NOTIFY_TO`, `ONBOARDING_NOTIFY_FROM`,
`ONBOARDING_SITE_URL`) are not secrets — set those in the dashboard, under
**Settings → Variables and secrets → Add variable**.

> **Losing `ADMIN_PASSWORD`.** There is no recovery flow — set a new value
> with `wrangler pages secret put ADMIN_PASSWORD` and the old one stops
> working immediately. **Rotating `ONBOARDING_TOKEN_SECRET` is a bigger
> hammer:** it signs the admin cookie *and* every live upload token *and*
> every unclicked download link in a notification email, all under different
> scopes of the same secret. Rotating it logs every admin session out at
> once, which is correct if a cookie may have leaked — but it also breaks any
> onboarding session a client has open right now and any download link not
> yet clicked. Do it deliberately, not as routine hygiene.

---

## Database (D1)

```bash
# 1. Create the database (once).
npx wrangler d1 create vibelab-onboarding
```

Wrangler prints a `database_id`. Bind it to the Pages project:

**Dashboard → your Pages project → Settings → Bindings → Add → D1 database**
- Variable name: `DB`
- D1 database: `vibelab-onboarding`
- Production **and** Preview.

### Applying the migrations

Migrations are **never** run by a deploy — Pages builds the site and the
Functions and nothing else, and there is no Cloudflare API token in CI. Run
them by hand, from a machine that has run `wrangler login`:

```bash
# local development database
npx wrangler d1 migrations apply vibelab-onboarding --local -c wrangler.local.jsonc

# production
npx wrangler d1 migrations apply vibelab-onboarding --remote
```

> If the production command stops because it cannot find a configuration
> file, give it one for the length of the command: copy `wrangler.local.jsonc`
> to a scratch file, replace the placeholder `database_id` with the real UUID
> from Cloudflare → Workers & Pages → D1 → `vibelab-onboarding`, and pass
> `-c <that file>`. Do **not** rename either file to `wrangler.jsonc` — Pages
> reads that name, and a config without `pages_build_output_dir` and the
> production bindings would overwrite working dashboard settings on the next
> deploy.

Each command applies **both** `migrations/0001_onboarding.sql` and
`migrations/0002_workflow.sql`, in order, skipping whichever ones `wrangler`'s
own `d1_migrations` bookkeeping table already shows as applied.

> **The one-time catch on production.** `0001_onboarding.sql` was applied to
> the remote database by hand, through the D1 console in the Cloudflare
> dashboard — not through `wrangler d1 migrations apply`. That means the
> remote database has no `d1_migrations` bookkeeping table yet, even though
> its three original tables already exist. Running
> `npx wrangler d1 migrations apply vibelab-onboarding --remote` for the
> first time will therefore try to run **0001 again before 0002** — and that
> is fine. Every statement in `0001_onboarding.sql` is `CREATE TABLE IF NOT
> EXISTS` / `CREATE INDEX IF NOT EXISTS`, so re-running it against tables
> that already exist is a harmless no-op. `wrangler` will then create the
> bookkeeping table, record 0001 as applied, and run 0002 — which is **not**
> idempotent (its `ALTER TABLE ... ADD COLUMN` statements fail if run twice)
> — for the first and only time. After that, bookkeeping is in place and
> future migrations behave normally.
>
> Check the state before and after with:
>
> ```bash
> npx wrangler d1 migrations list vibelab-onboarding --remote
> ```
>
> Do **not** hand-paste `0002_workflow.sql` into the dashboard console the
> way `0001` was applied — its `ALTER TABLE` statements are not safe to run
> twice, and only the migration runner tracks what has already happened.

### Schema

`migrations/0001_onboarding.sql`:

- `onboarding_submissions` — one row per brief. The answers are one JSON
  document; `business_name`, `contact_name`, `contact_email`, `contact_phone`
  are **generated columns** read out of it, so a list can sort and search
  without the data being stored twice.
- `onboarding_files` — one row per uploaded object, with its key in R2.
- `onboarding_rate_limit` — a fixed window per hashed IP address. No raw IP
  is ever stored.

`migrations/0002_workflow.sql` adds:

- `leads` — one row per public enquiry. Ends at `accepted` (a project was
  made from it) or `declined`.
- `projects` — the engagement itself, created only after a package and price
  are agreed outside the site.
- `onboarding_requests` — one row per private onboarding link. `token_hash`
  is a SHA-256 hash of the 24-random-byte token; the token itself exists in
  the clear only once, in the API response at the moment it is minted.
- `notes` — internal, admin-only, attached to a lead or a project.
- `build_briefs` — every generated Build Brief, kept; the newest per
  `(project, mode)` is the current one.
- `activity` — a plain timeline, one row per thing that happened to a lead or
  a project.
- Four `ALTER TABLE ... ADD COLUMN` statements, extending two existing
  tables: `onboarding_files` gains `source` (`'client'` or `'admin'`) and
  `project_id`; `onboarding_submissions` gains `request_id` and
  `project_id`. Rows from the old public-form era keep `NULL` in all four.

`package_id` is deliberately un-constrained by a `CHECK` anywhere — packages
are configuration in the application (`src/lib/packages.ts`), and a database
constraint would mean a migration every time the studio renames or adds one.

Checking on things later:

```bash
npx wrangler d1 execute vibelab-onboarding --remote --command "SELECT id, business_name, email, status, created_at FROM leads ORDER BY created_at DESC LIMIT 20"
npx wrangler d1 execute vibelab-onboarding --remote --command "SELECT id, business_name, package_id, status, created_at FROM projects ORDER BY created_at DESC LIMIT 20"
```

---

## Storage (R2)

```bash
npx wrangler r2 bucket create vibelab-client-materials
```

**Dashboard → your Pages project → Settings → Bindings → Add → R2 bucket**
- Variable name: `UPLOADS`
- Bucket: `vibelab-client-materials`
- Production and Preview.

**Leave the bucket private.** Do not enable the `r2.dev` public development
URL and do not attach a custom domain to it. Access is by signed link, or by
the cookie-authorised admin route, only.

Objects are keyed by their owner, not by a client-chosen path:

```
client-projects/{ownerId}/logo/{fileId}-{name}
client-projects/{ownerId}/images/{fileId}-{name}
client-projects/{ownerId}/videos/{fileId}-{name}
client-projects/{ownerId}/documents/{fileId}-{name}
```

`{ownerId}` is the onboarding request's own id while a client is filling in
the form (uploads happen before the brief — and therefore before any
`onboarding_submissions` row — exists), and a project's id for a file an
admin adds by hand, such as a menu that arrived over WhatsApp. The
`onboarding_files.source` column records which: `client` or `admin`.

**Getting the files.** The notification email lists every file as a signed
link valid for 30 days. Logged in to `/admin/`, every file on a project is a
plain download at `GET /api/admin/file?id=<fileId>`, authorised by the admin
cookie rather than a signature. You can also browse the bucket in the
dashboard, or:

```bash
npx wrangler r2 object get vibelab-client-materials/client-projects/<id>/logo/<file> --file ./logo.png
```

**Housekeeping.** A client who uploads files and never sends the brief leaves
objects whose `onboarding_files` row has no matching `onboarding_submissions`
row. Nothing deletes them automatically:

```bash
npx wrangler d1 execute vibelab-onboarding --remote --command "SELECT storage_key FROM onboarding_files f WHERE NOT EXISTS (SELECT 1 FROM onboarding_submissions s WHERE s.id = f.submission_id) AND f.source = 'client' AND f.created_at < datetime('now','-30 days')"
```

---

## Email

Two notifications go out, both through the Resend REST API and both to
`ONBOARDING_NOTIFY_TO` (production: `vibelabmne@gmail.com`):

- **A new lead** — sent from `POST /api/lead`, off the request via
  `waitUntil`, with a link straight into that lead's row in `/admin/`.
- **A finished brief** — sent from `POST /api/onboarding/submit`, with the
  client's answers, a signed 30-day download link per uploaded file, and a
  link into that project in `/admin/`.

Either email's `Reply-To` is the person's own address, so replying writes to
them directly. Neither send blocks the response the browser gets: the row is
written and committed first, the email is attempted after, and a failure is
recorded on the row (`notify_error`) rather than turned into an error the
lead or the client sees — the database is the record, the email is a copy.

1. Create a Resend account and an API key. Put it in `RESEND_API_KEY`.
2. That is enough to start: the default sender `onboarding@resend.dev` needs
   no DNS. **Known limitation:** Resend's shared sender only delivers to the
   Resend account owner's own address — which happens to be where these
   notifications are going today, but is not something to rely on if the
   notify address ever changes to someone else's inbox.
3. To send from your own domain later: Resend → Domains → add
   `vibelab.it.com`, publish the DKIM and SPF records it gives you, then set
   `ONBOARDING_NOTIFY_FROM` to something like
   `VibeLab <projekti@vibelab.it.com>`. Do this alongside step 4 of
   `docs/deployment-security.md`, which is the same DNS work.

---

## The admin dashboard

`/admin/` is the private, password-gated area where VibeLab runs the studio
side of this: triaging leads, opening projects, minting and cancelling
onboarding links, reading submitted briefs, adding notes and files by hand,
and generating Build Briefs. It is not linked from anywhere on the public
site and must never be indexed, the same way `/start/` already carries
`robots: { index: false, follow: false }` and an `X-Robots-Tag: noindex`
response header — give the dashboard's own page that treatment when it ships.

**Logging in.** `POST /api/admin/login` with `{ "password": "..." }`. A
correct password sets the `vibelab_admin` cookie (`HttpOnly; Secure;
SameSite=Strict; Path=/`, 7 days) and every subsequent request under
`/api/admin/**` is authorised by that cookie — there is no session table; the
cookie's HMAC signature, over an expiry timestamp under the scope `"admin"`,
*is* the session. Login is rate limited **5 attempts per 5 minutes per IP**
and — unlike every other limiter in this codebase — **fails closed**: if the
D1 rate-limit table is unreachable, login is refused rather than left
unmetered, because what is being counted is password guesses. Every
non-`GET`/`HEAD` admin request is also checked for same-origin, as a second
layer under `SameSite=Strict`.

**What it can do**, one route per concern, all behind that same cookie:

| Route | What |
| --- | --- |
| `GET /api/admin/overview` | Counts (new leads, active/building projects, links waiting on a client) and a recent-activity feed. |
| `GET /api/admin/leads`, `GET .../leads/:id` | List and read enquiries. |
| `PATCH /api/admin/leads/:id` | Change a lead's status (anything except `accepted`, which only converting sets). |
| `POST /api/admin/leads/:id/notes` | Add an internal note. |
| `POST /api/admin/leads/:id/convert` | Turn a lead into a project, with the agreed package. Charges nobody. |
| `GET /api/admin/projects`, `POST /api/admin/projects` | List projects; open one without a lead behind it (a client who only ever DMed on Instagram). |
| `GET /api/admin/projects/:id` | Everything about one project in a single round trip: the project, its newest link, the submitted answers, files, notes, briefs, activity, and scope warnings computed fresh against the *current* package. |
| `PATCH /api/admin/projects/:id` | Edit the project, including its package — changing the package never rewrites stored answers, and retargets any still-open onboarding link so the client's next visit asks the right questions. |
| `POST /api/admin/projects/:id/notes` | Add an internal note. |
| `POST /api/admin/projects/:id/onboarding` | Mint a private link. The full URL exists in the clear in this one response — copy it now. Any older live link for the same project is cancelled first. |
| `DELETE /api/admin/projects/:id/onboarding` | Withdraw the live link; the form behind it stops accepting writes immediately, not just on the next page load. |
| `GET /api/admin/projects/:id/files`, `POST .../files` | List a project's files; add one by hand (same file-type and byte-signature checks as a client upload, no quota, no rate limiter — the studio is trusted with its own bucket). |
| `POST /api/admin/projects/:id/brief` | Generate a Build Brief. See below. |
| `GET /api/admin/file?id=`, `DELETE /api/admin/file?id=` | Download or permanently delete any one stored file. |

**Note on this checkout.** The API above is complete and live. The browser
page that consumes it (`src/lib/admin/client.ts` is its whole API client) is
being built alongside it and was not yet part of this repository snapshot —
every route in the table can be exercised directly with `curl`, using the
`vibelab_admin` cookie, which is exactly what the eventual page does.

---

## The Build Brief

`POST /api/admin/projects/:id/brief` with `{ "mode": "full" | "design" |
"technical" }` turns everything stored about a project — the agreed package,
the client's answers, uploaded files, internal notes, and computed scope
warnings — into a markdown document meant to be pasted straight into an
external coding agent.

**It is deterministic string assembly (`server/admin/brief.ts`). No AI API is
called and it costs nothing.** A fact that was never collected comes out as
"Not provided" or "VibeLab to decide", never as something plausible. The one
thing the generator adds on its own is VibeLab's house standards —
performance, accessibility, no fabricated content, no AI-slop design — since
those are the studio's facts, not the client's.

The three modes share one data pass; each section of the brief declares which
modes want it, so the design brief is the full brief with the engineering
pulled out, not a document maintained twice. Every generated brief is kept in
`build_briefs`; the newest per `(project, mode)` is what the dashboard offers
as current.

**Scope warnings** (`server/admin/scope.ts`) are computed fresh from the
answers on every read — never stored — so a Start client whose goal is
selling products is flagged ("Start paket nema prodavnicu") rather than
silently built with a shop, or silently blocked from saying what they want.
The same flags, in English, land in the brief's own "Scope / Package
Constraints" section.

---

## Rate limiting

Two layers. The Functions keep a fixed-window counter per hashed IP in D1
(`onboarding_rate_limit`) as a floor that works even with no edge rule
configured:

| Limiter | Window | Max | Fails |
| --- | --- | --- | --- |
| `lead` | 1 hour | 5 | open |
| `login` | 5 minutes | 5 | **closed** |
| `context` | 10 minutes | 30 | open |
| `session` | 10 minutes | 10 | open |
| `upload` | 10 minutes | 60 | open |
| `submit` | 1 hour | 10 | open |

"Fails open" means a D1 hiccup lets the request through rather than turning a
database blip into a lost lead or a client who cannot submit their brief.
`login` is the one exception, because what it counts is password guesses.

The control that actually protects the bill sits at the edge, in front of
the Worker entirely:

**Deployed today:** Security → WAF → Rate limiting rules, matching
`http.request.uri.path contains "/api/onboarding/"`, **50 requests per 10
seconds per IP, action Block.** (The repository's older docs said 20/minute
with a Managed Challenge — that is not what is live; the numbers above are.)

> **TODO (operator action):** that rule's path match only covers
> `/api/onboarding/`. `/api/lead` and everything under `/api/admin/**` —
> including the login endpoint the whole dashboard sits behind — currently
> have **no edge-level rate limit**, only the D1 floor above. Widen the
> rule's match from `http.request.uri.path contains "/api/onboarding/"` to
> `http.request.uri.path contains "/api/"` so the same edge protection covers
> all three. Do this in Security → WAF → Rate limiting rules → edit the
> existing rule → change the path condition → save.

---

## Local development

One-time:

```bash
npm install
cp .dev.vars.example .dev.vars
npx wrangler d1 migrations apply vibelab-onboarding --local -c wrangler.local.jsonc
```

Then edit `.dev.vars` and add `ONBOARDING_TOKEN_SECRET` (any string is fine
locally). `.dev.vars.example` does not yet list `ADMIN_PASSWORD` — add it
yourself if you want to exercise `/api/admin/**` locally; without it,
`POST /api/admin/login` always returns `server` and nothing under
`/api/admin/` is reachable.

In one terminal:

```bash
npm run build        # /start/ is a static page; the API needs the built output
npm run dev:api      # serves out/ plus the Functions, on http://127.0.0.1:8788
```

`npm run dev:api` binds a local D1 database and local R2 objects under
`.wrangler/state/`, gitignored. There is no client-facing route to open at
`/start/` yet without a real link — mint one against the local admin API
first (once `ADMIN_PASSWORD` is set):

```bash
curl.exe -s -c cookies.txt -X POST http://127.0.0.1:8788/api/admin/login -H "Content-Type: application/json" -d '{"password":"whatever-you-set"}'
curl.exe -s -b cookies.txt -X POST http://127.0.0.1:8788/api/admin/projects -H "Content-Type: application/json" -d '{"businessName":"Test Biznis","packageId":"start"}'
curl.exe -s -b cookies.txt -X POST "http://127.0.0.1:8788/api/admin/projects/<projectId>/onboarding"
```

(Single-quoted JSON bodies, not `\"`-escaped ones — Windows PowerShell does not
treat a backslash as a string-escape character, so an escaped double-quoted
body breaks there even though it works in bash.)

The last call's response body is the private link — open it in a browser.

`npm run dev` (plain `next dev`) still works for looking at pages, but every
call to `/api/onboarding/*`, `/api/lead` or `/api/admin/*` will 404 there —
Next has no server in this project. Use `npm run dev:api` for anything that
talks to the backend.

Useful while developing:

```bash
npm run typecheck        # both tsconfigs: the site, and the Worker code (functions/, server/)
npm run build:functions  # compiles functions/ and writes _routes.json
```

> `wrangler.local.jsonc` is for local commands only — Cloudflare Pages does
> not read it, because it only looks for `wrangler.toml` / `wrangler.json` /
> `wrangler.jsonc` by exact name. **Do not rename it.** A wrangler config
> that Pages *does* read takes over the project's configuration, and this one
> has neither `pages_build_output_dir` nor the production bindings.

---

## Production deployment

1. Set the secrets and variables above, for Production **and** Preview.
2. Add the `DB` and `UPLOADS` bindings, for Production **and** Preview.
3. `git push` — Pages builds the site and compiles `functions/` in the same
   build. The build command stays `npm run build`, the output directory
   stays `out`.
4. Run the migration against production:
   `npx wrangler d1 migrations apply vibelab-onboarding --remote`
   (see the bookkeeping note above — this single command correctly handles
   both 0001 and 0002).
5. Confirm the edge rate limit rule on `/api/onboarding/` is in place, and
   widen it to `/api/` per the TODO above if that has not been done yet.

Deploy the first change **on a branch**, not on `main`. Pages builds a
preview deployment for it, which is the cheap way to confirm that adding to
`functions/` has not affected the live site.

---

## Verification

After deploying, in order (PowerShell-friendly — use `curl.exe`, not the
`curl` alias, so `-s`/`-I`/`-X` behave as expected):

- [ ] `npm run build:functions` writes `_routes.json`. Its `include` must
      still be scoped — `["/api/*", ...]` plus whatever pattern covers
      `functions/start/[token].ts` — and never widen to a bare `["/*"]`,
      which would turn every page of the marketing site into a Function
      invocation.
- [ ] `curl.exe -sI -X POST https://vibelab.it.com/api/lead` and
      `curl.exe -sI -X POST https://vibelab.it.com/api/onboarding/session`
      and `curl.exe -sI https://vibelab.it.com/api/admin/me` each return
      `access-control-allow-origin: https://vibelab.it.com` and
      `x-content-type-options: nosniff`.
- [ ] `https://vibelab.it.com/` and `/en/` still load, and
      `curl.exe -sI https://vibelab.it.com/ | Select-String -Pattern "cache-control"`
      does **not** say `no-store`.
- [ ] A test submission on the public lead form appears in D1:
      `npx wrangler d1 execute vibelab-onboarding --remote --command "SELECT id, business_name, email, notify_error FROM leads ORDER BY created_at DESC LIMIT 1"`
      — and the lead notification email arrives.
- [ ] `POST /api/admin/login` with the real password sets `vibelab_admin` and
      returns `200`; a wrong password returns `401`; a sixth wrong attempt
      inside 5 minutes returns `429`.
- [ ] Convert a test lead (or create a project by hand), mint an onboarding
      link, and confirm `/start/<token>/` opens onto the package that was
      assigned — not a package picker.
- [ ] A garbage path like `/start/not-a-real-token/` redirects to `/start/`
      rather than showing a broken form.
- [ ] A full brief submits; the project's `status` moves to
      `onboarding_completed`
      (`npx wrangler d1 execute vibelab-onboarding --remote --command "SELECT status FROM projects WHERE id = '<projectId>'"`),
      its files show up under `GET /api/admin/projects/:id`, and the brief
      notification email arrives with working download links.
- [ ] `notify_error` is `NULL` on the fresh lead and submission rows above.
      If it says `no mail provider configured`, `RESEND_API_KEY` is not set;
      if it says `resend 4xx`, the key or the sender address is wrong.
- [ ] Generate all three Build Brief modes for a test project and confirm
      each returns markdown with no `undefined` or raw `[object Object]`
      anywhere in it.
- [ ] `npm run test:security https://vibelab.it.com` passes.
- [ ] `npm run check:a11y https://vibelab.it.com` reports no violations.
