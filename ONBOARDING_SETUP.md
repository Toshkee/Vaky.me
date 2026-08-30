# Client onboarding — setup

Everything at `/start/` works locally with two commands. Getting it working in
production is Cloudflare dashboard work: one database, one bucket, one secret.
This file is that list, and nothing else.

---

## Architecture decision

| Piece | Choice | Why |
| --- | --- | --- |
| Backend | **Cloudflare Pages Functions** (`functions/api/onboarding/*`) | The site is already a static export on Cloudflare Pages. A `functions/` directory at the repo root is compiled and deployed by the same `git push` that deploys the site — no second host, no second deploy, no new bill. Next API routes and server actions are not an option: `output: "export"` has no server. |
| Database | **Cloudflare D1** (SQLite) | Bound to the same Pages project. Free tier is far beyond what a studio's brief volume needs, and it is SQL, so a future admin page is a `SELECT`. |
| File storage | **Cloudflare R2**, private bucket | Same account, same binding model, no egress fees. Objects are never public: VibeLab reaches them through signed, expiring links in the notification email, or from the dashboard. |
| Email | **Resend**, optional | The repository had no email provider — Basin is a form forwarder for the landing page and cannot be called from a Worker. Resend is one `fetch`, no SDK, and its shared `onboarding@resend.dev` sender works before any DNS is set up. |
| Bot check | **Cloudflare Turnstile**, optional | Already in the repository for the concept form, already in the CSP. Verified server-side here. |
| Analytics | **Umami**, reused | The existing `track()` helper, with onboarding events added to its event list. No new provider. |

**What was reused rather than added:** the Pages project and its deploy, the
Turnstile component, the Umami helper, the design system (`PixelWindow`,
`OsBadge`, `px-btn`, the Tony sprite), the pricing table as the source of truth
for package names and prices, and the two-language dictionary pattern.

**Everything optional degrades to a stated behaviour, never to an error:** with
no Turnstile secret the bot check is skipped and rate limiting alone applies;
with no Resend key the brief is stored and the row records that nobody was
emailed. The database is the record of a submission — the email is a copy.

---

## Required environment variables

Set these in **Cloudflare dashboard → Workers & Pages → your Pages project →
Settings → Variables and secrets**, for **both** Production and Preview.

| Name | Required | What it is |
| --- | --- | --- |
| `ONBOARDING_TOKEN_SECRET` | **yes** | A long random string. Signs upload tokens and the download links in the notification email. Add as a **Secret**, not a plaintext variable. Generate one with `openssl rand -base64 48`. |
| `TURNSTILE_SECRET_KEY` | recommended | The **secret** key of a Turnstile widget. See the note below — the existing widget's secret may be inside Basin rather than in your own account. |
| `RESEND_API_KEY` | recommended | From resend.com → API Keys. Without it, briefs are stored but nobody is emailed. |
| `ONBOARDING_NOTIFY_TO` | no | Where the notification goes. Defaults to `vibecodemne@gmail.com`. |
| `ONBOARDING_NOTIFY_FROM` | no | Defaults to `VibeLab <onboarding@resend.dev>`, which needs no DNS but can only deliver to the Resend account owner's own address. Change it to an address on a verified domain once you have one. |
| `ONBOARDING_SITE_URL` | no | Origin used to build the download links in the email. Defaults to the origin the request arrived on, which is correct in production. |

The bindings `DB` and `UPLOADS` are set separately, below — they are bindings,
not variables.

> **Turnstile secret — check this before relying on it.**
> `src/components/landing/Turnstile.tsx` notes that the concept form's secret
> key "lives in Basin". If the widget was created inside Basin rather than in
> your own Cloudflare account, there is no secret for you to paste here. In that
> case create a **new** Turnstile widget at Cloudflare → Turnstile (hostname
> `vibelab.it.com`, mode Managed), put its **site** key in
> `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and its **secret** key in
> `TURNSTILE_SECRET_KEY`. Until then the onboarding runs on rate limiting alone,
> which is a deliberate, working fallback — not a broken state.

Nothing here is a `NEXT_PUBLIC_*` variable, and nothing here reaches the
browser. The only public value the onboarding uses is the Turnstile **site**
key, which the landing page already sets.

---

## Database setup

```bash
# 1. Create the database (once).
npx wrangler d1 create vibelab-onboarding
```

Wrangler prints a `database_id`. Then bind it to the Pages project:

**Dashboard → your Pages project → Settings → Bindings → Add → D1 database**
- Variable name: `DB`
- D1 database: `vibelab-onboarding`
- Do this for **Production and Preview**.

Then apply the schema. Migrations are **never** run by a deploy — Pages builds
the site and the Functions and nothing else, and there is no Cloudflare API
token in CI. Run them by hand, from a machine that has run `wrangler login`:

```bash
# local development database
npx wrangler d1 migrations apply vibelab-onboarding --local -c wrangler.local.jsonc

# production
npx wrangler d1 migrations apply vibelab-onboarding --remote
```

`migrations/0001_onboarding.sql` creates three tables:

- `onboarding_submissions` — one row per brief. The answers are one JSON
  document; `business_name`, `contact_name`, `contact_email` and
  `contact_phone` are **generated columns** read out of it, so an admin list can
  sort and search without the data being stored twice.
- `onboarding_files` — one row per uploaded object, with its key in R2.
- `onboarding_rate_limit` — a fixed window per hashed IP address. No raw IP is
  ever stored.

Checking on it later:

```bash
npx wrangler d1 execute vibelab-onboarding --remote --command \
  "SELECT created_at, package_id, business_name, contact_email, notify_error FROM onboarding_submissions ORDER BY created_at DESC LIMIT 20"
```

---

## Storage setup

```bash
npx wrangler r2 bucket create vibelab-client-materials
```

**Dashboard → your Pages project → Settings → Bindings → Add → R2 bucket**
- Variable name: `UPLOADS`
- Bucket: `vibelab-client-materials`
- Production and Preview.

**Leave the bucket private.** Do not enable the `r2.dev` public development
URL and do not attach a custom domain to it. Access is by signed link only.

Files are laid out per submission:

```
client-projects/{submission-id}/logo/{file-id}-{name}
client-projects/{submission-id}/images/{file-id}-{name}
client-projects/{submission-id}/videos/{file-id}-{name}
client-projects/{submission-id}/documents/{file-id}-{name}
```

**Getting the files.** The notification email lists every file as a signed link
valid for 30 days. You can also browse the bucket in the dashboard, or:

```bash
npx wrangler r2 object get vibelab-client-materials/client-projects/<id>/logo/<file> --file ./logo.png
```

**Housekeeping.** A client who uploads files and never sends the brief leaves
objects with no submission row. Nothing deletes them automatically. Every few
months:

```bash
npx wrangler d1 execute vibelab-onboarding --remote --command \
  "SELECT storage_key FROM onboarding_files f WHERE NOT EXISTS (SELECT 1 FROM onboarding_submissions s WHERE s.id = f.submission_id) AND f.created_at < datetime('now','-30 days')"
```

---

## Email setup

1. Create a Resend account and an API key. Put it in `RESEND_API_KEY`.
2. That is enough to start: the default sender `onboarding@resend.dev` needs no
   DNS, and delivers to the Resend account owner's own address — which is where
   these notifications are going anyway.
3. To send from your own domain later: Resend → Domains → add
   `vibelab.it.com`, publish the DKIM and SPF records it gives you, then set
   `ONBOARDING_NOTIFY_FROM` to something like
   `VibeLab <projekti@vibelab.it.com>`. Do this alongside step 4 of
   `docs/deployment-security.md`, which is the same DNS work.

The email's `Reply-To` is the client's own address, so replying to the
notification writes to the client.

---

## Local development

One-time:

```bash
npm install
cp .dev.vars.example .dev.vars          # then edit the secret
npx wrangler d1 migrations apply vibelab-onboarding --local -c wrangler.local.jsonc
```

Then, in one terminal:

```bash
npm run build        # /start/ is a static page; the API needs the built output
npm run dev:api      # serves out/ plus the Functions, on http://127.0.0.1:8788
```

Open `http://127.0.0.1:8788/start/`. The local D1 database and R2 objects live
under `.wrangler/state/` and are gitignored.

`npm run dev` (plain `next dev`) still works for looking at the page, but every
call to `/api/onboarding/*` will 404 there — Next has no server in this
project. Use `npm run dev:api` for anything that talks to the backend.

Useful while developing:

```bash
npm run typecheck        # both tsconfigs: the site, and the Worker code
npm run build:functions  # compiles functions/ and writes _routes.json
```

> `wrangler.local.jsonc` is for local commands only — Cloudflare Pages does not
> read it, because it only looks for `wrangler.toml` / `wrangler.json` /
> `wrangler.jsonc` by exact name. **Do not rename it.** A wrangler config that
> Pages *does* read takes over the project's configuration, and this one has
> neither `pages_build_output_dir` nor the production bindings.

---

## Production deployment

1. Set the variables and secrets above, for Production **and** Preview.
2. Add the `DB` and `UPLOADS` bindings, for Production **and** Preview.
3. `git push` — Pages builds the site and compiles `functions/` in the same
   build. No build-configuration change is needed; the build command stays
   `npm run build` and the output directory stays `out`.
4. Run the migration against production:
   `npx wrangler d1 migrations apply vibelab-onboarding --remote`
5. Add the edge rate limit: **Security → WAF → Rate limiting rules**, match
   `http.request.uri.path contains "/api/onboarding/"`, 20 requests per minute
   per IP, action **Managed Challenge**. The Functions keep their own counter in
   D1, but this one blocks before a Worker is ever invoked.

Deploy the first change **on a branch**, not on `main`. Pages builds a preview
deployment for it, which is the cheap way to confirm that adding `functions/`
has not affected the live site.

---

## Verification

After deploying, in order:

- [ ] `npm run build:functions` prints `include: ["/api/*"]` — **not** `["/*"]`.
      If it says `/*`, a middleware has moved to the root of `functions/` and
      every page of the site is now a Worker invocation.
- [ ] `curl -sI -X POST https://vibelab.it.com/api/onboarding/session` returns
      `access-control-allow-origin: https://vibelab.it.com` and
      `x-content-type-options: nosniff`.
- [ ] `https://vibelab.it.com/` and `/en/` still load, and
      `curl -sI https://vibelab.it.com/ | grep -i cache-control` does **not**
      say `no-store`.
- [ ] `/start/?package=business` skips the package question and shows
      "Korak 1 od 7".
- [ ] `/start/?package=nonsense` falls back to asking which package — and a
      hand-made `POST /api/onboarding/submit` with `"packageId":"nonsense"`
      returns `400`.
- [ ] A full brief submits and the row is there:
      `npx wrangler d1 execute vibelab-onboarding --remote --command "SELECT id, business_name, notify_error FROM onboarding_submissions ORDER BY created_at DESC LIMIT 1"`
- [ ] `notify_error` on that row is `NULL`. If it says
      `no mail provider configured`, `RESEND_API_KEY` is not set; if it says
      `resend 4xx`, the key or the sender address is wrong.
- [ ] The notification email arrived, and a download link in it returns the
      file with `Content-Disposition: attachment`.
- [ ] Refresh mid-brief: "Nastavite gdje ste stali" appears and the answers
      come back.
- [ ] `npm run test:security https://vibelab.it.com` passes.
- [ ] `npm run check:a11y https://vibelab.it.com` reports no violations.
