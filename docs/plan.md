# Plan: a pixel-art visual upgrade for VibeLab

_Round 1 revision by Claude, after Codex's REVISE verdict. Supersedes v2._

---

## Goal

Give the VibeLab landing page a genuine pixel-art visual layer — framed windows with hard
offset shadows, beveled controls, pixel display type, a coherent pixel icon set — without
putting the one thing that pays the bills (a visitor becoming an Instagram DM) at risk.
And give the owner's actual reference — a fully-committed pixel game landing page — a real
home, at full strength, where a bad bet costs nothing.

Codex's Round 1 verdict was REVISE, and its central objection was correct: **v2 hid the
offer inside a fictional game screen and then proposed shipping without the illustration
that makes that screen work.** v3 splits the work in two so neither the ambition nor the
business gets sacrificed.

---

## Approach

### Track A — the landing page gets a structural pixel layer (ship first)

The owner's original words were *"maybe some of the boxes or grids to be pixel art with
shadows so it looks real."* That is achievable in full without touching the hero's
information architecture, the reading layer, or the CTA path.

**A1. The bevel system.** One `.px-btn` class, three variants (`--primary` red,
`--ghost` paper, `--dark` ink):

```css
.px-btn {
  border: 2px solid var(--color-ink);
  box-shadow:
    inset 0 3px 0 0 rgb(255 255 255 / .35),   /* top highlight */
    inset 0 -3px 0 0 rgb(0 0 0 / .25),        /* bottom shade  */
    4px 4px 0 0 var(--color-ink);             /* hard drop     */
  transition: box-shadow .1s, translate .1s;
}
.px-btn:active {
  box-shadow: inset 0 3px 0 0 rgb(255 255 255 / .35), inset 0 -3px 0 0 rgb(0 0 0 / .25);
  translate: 4px 4px;
}
@media (prefers-reduced-motion: reduce) { .px-btn { transition: none } }
```

Codex confirmed the structure is correct — inset shadows paint inside the padding edge and
do not bleed over an opaque 2px border. Applied **only to real `<a>` and `<button>`
elements**, never a decorative wrapper: native controls get `:active` on current iOS
Safari with no touch handler, and putting the class on a `<div>` is what breaks touch.

Sites: `src/components/ui/Button.tsx`, both buttons in `ConceptRequest.tsx`, the six
CTA buttons in `PlanMatrix.tsx` (mobile cards + desktop `<tfoot>`), the Contact banner CTA.

**A2. Focus is independent of press.** v2 got this wrong — it made `:focus-visible`
imitate `:active`, which removes the shadow and translates the control instead of
indicating focus. Corrected: press is `:active` only, focus gets its own indicator, and
the two compose (a focused button that is being pressed shows both).

v3 described this in prose; Codex asked for CSS a builder cannot misread:

```css
/* --ghost and --dark keep the global red ring (globals.css:75) unchanged. */

/* --primary is a red fill, so a red ring on it is invisible. Two-tone instead:
   white ring sitting in the 3px gap, dark edge outside it against paper.
   White on --color-red is 6.22:1 (already documented in globals.css:23). */
.px-btn--primary:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
  box-shadow:
    inset 0 3px 0 rgb(255 255 255 / .35),
    inset 0 -3px 0 rgb(0 0 0 / .25),
    4px 4px 0 var(--color-ink),
    0 0 0 9px var(--color-ink);   /* clears the 3px offset + 3px outline */
}

/* Compound selector, not the bare :active rule — otherwise the line above wins
   on specificity and a focused button never visibly depresses. */
.px-btn--primary:focus-visible:active {
  box-shadow:
    inset 0 3px 0 rgb(255 255 255 / .35),
    inset 0 -3px 0 rgb(0 0 0 / .25),
    0 0 0 9px var(--color-ink);
}
```

Both corrections are Codex's, and both were real bugs in v4: the `0 0 0 6px` ring ended
*at* the white outline's outer edge instead of outside it (3px offset + 3px outline = 6px,
so the dark edge needs 9px), and `.px-btn--primary:focus-visible` outranks `.px-btn:active`,
so a focused button would have kept its 4px drop and never appeared pressed. The focus ring
**augments** the drop shadow rather than replacing it, and survives the press.

**A3. Pixel window frames.** `.px-window`: 2px ink border, optional `--color-paper-2`
title bar with three 4×4 ink squares (`aria-hidden`), aliased 4px stepped corners, hard
drop shadow.

The corner/shadow conflict is resolved, not deferred — `clip-path` **does** clip an
element's own `box-shadow`, so the shadow moves to a wrapper and is cast with `filter`,
which reads the clipped child's alpha shape:

```css
.px-window-shell { filter: drop-shadow(4px 4px 0 var(--color-ink)); }
.px-window {
  border: 2px solid var(--color-ink);
  clip-path: polygon(
    4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) 100%, 4px 100%,
    4px calc(100% - 4px), 0 calc(100% - 4px), 0 4px, 4px 4px
  );
}
```

`filter` creates a stacking context — that must be checked against the `<dialog>`, the
`InstagramFab`, and the sticky nav before it ships.

**Roughly eight windows on the page — depth stops reading if everything has it.** `Why`,
`Process`, `Faq`, `Nav` and `Footer` stay flat on purpose.

Codex asked for wrapper ownership and title-bar content named per window, so an
implementer does not improvise (and does not invent untranslated English labels — see
*Out of scope*, no new strings):

| Window | Shell owner | Title bar |
|---|---|---|
| The four demo posters (`Work.tsx:114`) | a new `<div>` inside the existing `<Link>`, wrapping the `aspect-[3/2]` box | none — the demo name already sits below the poster |
| `ConceptRequest` coupon | a `<div>` wrapping the `<form>`; the form keeps `id="concept"` and its scroll-margin | decorative squares only, `aria-hidden` — the `c.eyebrow` string inside the form already labels it |
| Three mobile plan cards (`PlanMatrix.tsx:33`) | a `<div>` around each card; **no `translate` on these** (Risk 4) | decorative only |
| Plan `<dialog>` (`PlanMatrix.tsx:221`) | filter on the `<dialog>` itself; the `<dialog>` becomes `bg-transparent p-0` and `.px-window bg-paper` moves onto the existing `max-h-[85vh] overflow-y-auto` child | reuses the existing sticky header, no new bar |
| Contact banner | a `<div>` around the existing bordered box | decorative only |

The dialog row is Codex's correction. `filter` on a `<dialog>` does **not** disturb
top-layer promotion or `::backdrop` — that stays a separate top-layer pseudo-element. But
the dialog currently carries `bg-paper` itself (`PlanMatrix.tsx:221`), and a filtered
*opaque* box casts a rectangular shadow, not the stepped silhouette of its clipped child.
Moving the opaque ground onto the child is what makes the notched shadow appear at all.
The sticky inner header must still stick after the move — verify.

**A4. Pixel display type — labels and figures only, not headlines.** This is the
concession that removes most of the trust risk while keeping the look. A third family
(`Anton` already exists in `Work.tsx:3` — Codex caught that v2 miscounted) is added via
`next/font/google`, self-hosted at build time.

| Element | Face |
|---|---|
| `.eyebrow` small-caps labels | **Pixel** |
| Button and nav labels, the `VIBELAB` wordmark | **Pixel** |
| The `01–04` numerals in `Why.tsx` / `Process.tsx`, plan prices (`.tnum`) | **Pixel** |
| `h1`, `h2`, `h3` (`.headline`) | **Libre Franklin, unchanged** |
| All body copy, feature lists, FAQ answers, the whole PlanMatrix table body | **Libre Franklin, unchanged** |

Candidate: `Pixelify Sans` — Codex verified its Google Fonts metadata carries `latin-ext`
and the required extended capitals, and judged no alternative clearly better
(`Press Start 2P` is too wide for Montenegrin headline lengths; `Micro 5` too small;
`Silkscreen` lacks proper descenders). **Blocking pre-check:** render the self-hosted
output — `č ć š ž đ Č Ć Š Ž Đ` at 12/16/24/48px, at 1× and 2× DPR — and look at it. A
subset label is not proof of usable rasterization. `layout.tsx:7` already documents that
diacritics are exactly where faces fail here. If it fails, A4 is cut and A1–A3 + A5 still
ship intact.

**Acceptance is not the specimen alone.** Codex's remaining Track A risk is that Pixelify
at the current 12px `.eyebrow` size (`globals.css:97`) and in the mobile nav labels
(`Nav.tsx:78`) may cost more legibility than its decorative value earns. So A4 is accepted
only after looking at **real labels at 320px** — the actual nav items, the actual button
words, the actual eyebrows — not just the diacritic sheet. If the eyebrows lose, they go
back to Franklin and the pixel face keeps the buttons, wordmark and numerals.

Note: `-webkit-font-smoothing: none` is not a pixelizer and is not used. `image-rendering:
pixelated` applies to raster pixel art only, never text. Pixel type gets integer font
sizes on a pixel-multiple grid instead.

**A5. One pixel icon set.** 16×16 inline SVG on a 16-unit grid, `shape-rendering:
crispEdges`, `fill="currentColor"`, in the existing `src/components/landing/icons.tsx`:
check, dash, arrow, plus. Replaces the unicode `✓` in `Hero.tsx`, the `→` in `Work.tsx`,
the FAQ `+`, and the stroked check in `PlanMatrix.tsx:171`.

**A11y parity is mandatory, not optional.** Each replacement inherits the exact semantics
of the glyph it replaces:

| Replaced | Current semantics | Required after |
|---|---|---|
| `PlanMatrix.tsx:167` desktop table check | exposes the feature label to AT | unchanged — still labelled |
| `PlanMatrix.tsx` mobile card checks | presentational | `aria-hidden` |
| `Hero.tsx:31` `✓` proof marks | `aria-hidden="true"` | `aria-hidden` |
| `Work.tsx:122` `→` | `aria-hidden="true"` | `aria-hidden` |
| `Faq.tsx:18` `+` toggle | decorative, rotated by CSS on `[open]` | `aria-hidden`, and the `.faq-toggle` rotation still applies |
| `PlanMatrix.tsx:126` em-dash cell | `aria-label="—"` | keep the label |

**A6. Dither rules.** A 4px checkerboard `repeating-conic-gradient` replacing selected
hairline `border-t border-line` section rules. Zero bytes, zero requests, `aria-hidden`.

**A7. Outbound CTA instrumentation — with a named sink.** v3 said "a zero-dependency
listener that records outbound clicks," which Codex correctly called out as measurement
accepted in principle and shipped in fact as nothing: a static export has nowhere to
record *to*. Corrected and made concrete.

**Sink: Umami, not Vercel.** v4 proposed `@vercel/analytics` behind a "confirm custom
events are available" pre-check. Codex found the answer already written in this repo:
`HANDOFF.md:292` — *"Vercel Hobby does not support Analytics custom events (Pro only).
Umami is the suggested alternative if conversion tracking is wanted."* A pre-check whose
answer is known and negative is not a pre-check. Taking the handoff's own recommendation.

Umami is a single ~2 KB script tag, cookieless (no consent banner — relevant for an
EU-adjacent audience), and custom events are on its free tier. Being a script tag rather
than a package, **it restores the zero-npm-dependency rule** — `package.json` stays
untouched after all.

**Owner decision required before A7 is built:** Umami Cloud free tier, self-hosted Umami,
or *no measurement at all*. The third is an acceptable answer — but then D3's rejection of
Codex's heavy measurement gate must be restated honestly as "this change ships unmeasured,"
in the log, rather than left implied.

| Event | Fired from | Properties |
|---|---|---|
| `cta_instagram` | `Hero` CTA (`instagramDmLink()`), `ConceptRequest` IG button, `InstagramFab`, `Contact` row (`instagramLink()`) | `lang`, `surface` |
| `cta_email` | `ConceptRequest` submit, `Contact` row, all six `PlanMatrix` plan CTAs (`enquiryHref()`, `PlanMatrix.tsx:25`) | `lang`, `surface`, `plan` |

`lang` is `me`/`en`; `surface` names the component so hero-vs-pricing performance is
separable; `plan` is set only on the pricing CTAs.

**There is no `cta_whatsapp`.** v5's table invented one. Codex checked the code:
`Contact.tsx:2` imports only `emailLink` and `instagramLink`, every `PlanMatrix` plan CTA
goes through `emailLink()` (`PlanMatrix.tsx:25`), and `src/config/site.ts` has no `wa.me`
helper at all. `HANDOFF.md` describes the funnel as "WhatsApp, email, or Instagram DM",
but WhatsApp is not actually wired up anywhere on the site — **worth telling the owner,
and out of scope to fix here.**

**How the events are attached — one pattern, not two.** Codex is right that most of these
live in server components (`Hero.tsx:6`, `Contact.tsx:8`) which cannot carry click
handlers. So: **one delegated client component**, `<CtaTracker />`, mounted once in
`layout.tsx`. It listens for clicks on `document` and reads `data-cta` / `data-surface` /
`data-plan` off the closest matching ancestor. Every server-rendered CTA just gains those
attributes — no component becomes a client component to be measured, and
`ConceptRequest.tsx` (already `"use client"`) uses the same attributes rather than calling
the tracker directly. One pattern everywhere.

**It must delegate `submit` as well as `click`.** Codex caught the gap: the coupon submits
via `onSubmit` and `window.location.href` (`ConceptRequest.tsx:57`), so an Enter keypress
in the input fires no click and a click-only tracker would silently miss the single most
important conversion on the page. The `<form>` carries the same `data-cta` attributes and
`CtaTracker` listens for both event types.

**A8. One pixel vignette — Codex's suggestion, adopted.** Track A's honest weakness (Risk
7) is that frames and bevels without a pixel headline may read as polish rather than as the
look the owner pointed at. The smallest fix that adds a genuine pixel-art focal point
without putting the offer behind art: **one hand-authored, fixed-grid 96×64 pixel vignette
inside the existing `ConceptRequest` window**, displayed at an integer multiple (2× or 3×).

No text over it. No hero replacement. No new interaction. `aria-hidden`, since it carries
no information the copy does not. Subject: a tiny storefront-to-phone scene — the same
product story as Track B's larger scene, at a size one person can actually author well.

**What Track A explicitly does NOT do:** no hero band replacement, no headline set over
artwork, no HUD, no pixel body copy, no illustration dependency, no change to the hero's
two-column offer layout or its CTA order.

### Track B — the reference, at full strength, as a fifth demo

The Dribbble reference is a *game* landing page and it works because the pixel art is the
product. The honest place for that language on this site is a portfolio piece where the
same is true: **a pixel-art demo site for a gaming / esports / board-game café in
Podgorica** — a business type that genuinely exists here and would genuinely buy that
design.

Built at `src/app/demo/<slug>/` alongside the existing four, following their established
pattern (own `data.ts`, own palette tokens in `globals.css`, own typography). It gets
everything v2 wanted for the landing page and Codex rightly refused: the full-bleed pixel
scene, pixel headline with outline and offset shadow, the nav pills, the HUD, the works.

Why this beats Codex's suggested hidden `/lab/pixel-studio` route:
- it extends the portfolio from four brands to five, which strengthens the range argument
  instead of parking effort somewhere nobody looks;
- it is a sellable design for a real local market segment;
- the landing page links to it from `Work.tsx` like any other demo, so the owner gets to
  *show* the pixel work on the money page without *becoming* it.

Codex's blocking #2 was that this was a good venue but not yet a buildable plan. Made
concrete:

**Route and pattern.** `src/app/demo/pixel-arcade/` (slug final at build), a sibling of the
existing four, following their pattern exactly: own `data.ts`, own palette tokens appended
to the `@theme` demo block in `globals.css`, own typography, own focus ring, `noindex` via
the same mechanism the others use, excluded from `sitemap.ts` (`sitemap.ts:7` documents
why). A fifth entry is added to `dict.work.items` and a fifth poster to `POSTERS` in
`Work.tsx`.

**This is a deliberate, carved-out exception to the no-i18n rule** — Codex caught the
contradiction: `dict.work.items` is defined in *both* dictionaries (`me.ts:44` and its
`en.ts` twin) and `Work.tsx` indexes `POSTERS` positionally against them, so the entry
cannot be deferred or hand-waved. Track B therefore adds one paired, type-checked entry
(`name`, `tag`, `href`) to `me.ts` and `en.ts`, with a real Montenegrin and English `tag`.
Nothing else in `src/i18n/` is touched, and **Track A still touches it not at all.**

**Concept disclosure is not optional.** The existing demos already carry it — page titles
read `… | Dizajn koncept` and the Titan page states *"Ilustrativne cijene za potrebe
koncepta"* (`titan-gym/page.tsx:10`, `:91`). The arcade demo carries the same disclosure in
the same places, and `dict.work.conceptLabel` already renders "concept" on its card. This
is a fictional business; it must never read as a real client.

**CTA behaviour — the existing convention, named.** Codex asked which one. The demos use
live-shaped but dummy `tel:` links: `titan-gym/page.tsx:49` is `tel:+38267000000`. The
arcade demo follows exactly that — a dummy `+382 67 000 000`-pattern number, no real
Instagram handle, no address resolving to a real venue, and the same
`… | Dizajn koncept` title plus an illustrative-pricing note where prices appear. Not
inert anchors, not section links: the same convention as its four siblings.

**The scene — method decided, not deferred.** ~960×420 logical pixels, authored on a fixed
grid and displayed at an integer multiple; **never** rendered at 2× and downscaled, which
does not preserve a pixel grid. Hand-authored (Aseprite, exported PNG) is the route, for
the reason in Risk 8: it is the only method with a reliable ceiling. Generated pixel art is
off-grid and anti-aliased at 1× and would need palette quantisation plus honest willingness
to bin the result. **Track B does not ship without this asset** (D5) — if the art is not
made, Track B simply does not exist yet, and Track A is unaffected.

**Track B is a separate release from Track A** and gets its own sign-off.

---

## Key decisions & tradeoffs

**D1. Split the work rather than pick a side.** Codex's "do far less" and the owner's "I
like this look" are both legitimate and they are not actually in conflict once the pixel
skin and the money page stop being the same decision. Track A is what the owner literally
asked for; Track B is what the reference actually is.

**D2. Headlines stay in Franklin.** The single highest-leverage risk reduction available.
The buyer reads the promise in a face designed for reading; the *frame around it* is where
the craft shows. If the owner wants the H1 in pixel type after seeing Track A rendered,
that is a one-line change to revisit with real screenshots in hand.

**D3. Rejecting Codex's blocking objection #7 in its strong form, accepting its weak
form.** Codex requires a conversion baseline plus task-based testing with several
target-age local owners before the money page is touched. For a one-person studio's own
site at this traffic level, a statistically meaningful conversion baseline would take
months to accumulate and recruited user testing costs more than the redesign. That is
enterprise process applied to a two-person decision. **Accepted instead:** A7's
zero-dependency outbound-click instrumentation, so the *next* decision is not blind
either. The residual risk is stated plainly rather than processed away — and Track A's
restraint is what actually keeps it small.

**D4. Rejecting Codex's implied "improve the demos with real imagery first" gate.** True
and worth doing (three of four Work posters are typographic mocks, `Work.tsx:27`), but it
is a separate piece of work about photography, not a prerequisite for CSS frames. Logged
as a follow-up, not folded into scope.

**D5. Scene-less shipping is dead — accepted in full.** v2's option (d) contradicted its
own diagnosis. Track B does not ship without its illustration; Track A does not need one.

---

## Risks / open questions

1. **Diacritics in the pixel face** (A4) — a hard blocker for A4 alone. Pre-checked before
   any other A-track code is written.
2. **`filter: drop-shadow` stacking context** (A3) vs. the `<dialog>`, the fixed
   `InstagramFab`, and the sticky nav. Must be verified, not assumed.
3. **The `<dialog>` wrap** — its border currently sits on an inner scrolling div
   (`PlanMatrix.tsx:221`), so wrapping only that leaves the dialog box and backdrop
   geometry unstyled. Needs an explicit test: Esc, backdrop click, focus return, 320px
   scrolling.
4. **Horizontal overflow.** Codex's analysis: 4px shadows will *not* by themselves trip
   `scripts/mobile-check.mjs`, since `getBoundingClientRect()` excludes box-shadow and the
   `px-5` containers keep border boxes 20px inside the viewport. It fails only on real
   layout overflow — negative margins, oversized widths, positioned children, or a
   translated `:active` element caught mid-check. So: no `translate` on full-bleed cards,
   and keep the check green.
5. **Contrast on new pairs** — pixel type at small sizes, the bevel highlight/shade on
   each of the three variants, and the title bar on `--color-paper-2`. Real ratios, stated.
6. **Third font family** and its effect on LCP/CLS. `next/font` self-hosts at build time so
   nothing hits Google, but it is still another preload.
7. **Does Track A actually look like anything?** The honest risk of restraint. Codex
   answered it bluntly on re-review: Track A *will not* read as the owner's INSIDE
   reference — it will read as a competent existing site with a retro/pixel control
   system. That is fine as long as it is not sold as "the reference look". Two mitigations
   now in the plan: A8's 96×64 vignette gives it one genuine pixel-art focal point, and
   Track B is where the reference actually lives. D2's escape hatch (H1 in pixel type)
   stays available once there are real screenshots to judge.
8. **Track B's scene** is real illustration work. Hand-authored (Aseprite/SVG) is the only
   route with a reliable ceiling; generated pixel art is usually off-grid and
   anti-aliased at 1× and would need palette quantisation and honest willingness to bin it.

---

## Out of scope

- **`src/app/demo/**` for Track A.** `git diff --stat` shows zero files there. Track B adds
  a new sibling directory and touches no existing demo.
- Replacing the colour tokens. Additions only, and only if Track B's scene needs them.
- `src/i18n/*` and copy, **for Track A: no new strings at all** — v2 conflicted with
  itself by proposing a hard-coded `BESPLATAN KONCEPT` title bar; window title bars are
  decorative and `aria-hidden`, or they reuse an existing dictionary key. Track B's single
  paired `dict.work.items` entry is the one carved-out exception, for the structural reason
  given in its own section.
- Information architecture, section order, routing, metadata, structured data, sitemap.
- Body-copy typography, everywhere, permanently.
- **New npm dependencies: zero.** A7's sink is Umami, a script tag rather than a package,
  so `package.json` stays untouched. `next/font/google` is already in use. No icon library,
  no animation library, no pixel-font package, no CSS framework addition.
- Tailwind `@theme` shadow tokens: Codex confirmed v4 accepts `--shadow-*` there and would
  generate a `shadow-px` utility — but `.px-btn` / `.px-window` declare shadows directly
  and do not need one. Not adding a token to justify a utility.

---

## Proof of done

```bash
npm run lint          # clean
npm run build         # succeeds
npm run dev &         # then, against localhost:3000:
npm run check:mobile  # zero horizontal overflow, iPhone SE + iPhone 13
```

Plus, all reviewed rather than assumed:
- Screenshots of `/` and `/en/` at 320, 390, 768, 1440.
- A rendered diacritics specimen: `č ć š ž đ Č Ć Š Ž Đ` at 12/16/24/48px, 1× and 2× DPR —
  **and** real nav/button/eyebrow labels at 320px (A4's actual acceptance gate).
- **A pressed-state screenshot** of each `.px-btn` variant, plus a focused-and-pressed one
  — v3's proof list checked focus and rest but never the state the whole bevel exists for.
- `<dialog>` flow: Esc, backdrop click, focus return, 320px scroll, and `::backdrop`
  geometry intact under the `filter` wrapper.
- Keyboard tab pass — focus ring visible on every beveled control, not swallowed by the
  drop shadow, on all three variants.
- `prefers-reduced-motion: reduce` disables press transitions.
- Contrast ratio stated for every new colour pair.
- **A7 events actually arrive**: on the deployed preview, trigger each event path —
  Instagram click, email click, **and an Enter-key form submit** — and confirm they appear
  in the **Umami** dashboard (Cloud or self-hosted, whichever the owner picked; v5 still
  said "Vercel" here, which could not have proved anything). Instrumentation that was never
  observed working is not instrumentation. **The Umami deployment choice is a
  pre-implementation gate** — A7 is not started until it is made.
- **Real WebKit, once.** Playwright's iPhone profiles are Chromium with a spoofed UA, and
  `scripts/mobile-check.mjs:1` hardcodes `chromium.launch()` — so installing WebKit changes
  nothing on its own. Either a hand pass on a real iPhone, or add a `webkit.launch()`
  target to that script. `:active` on touch is exactly the behaviour that differs, and it
  is what the whole bevel exists for.
- **Track A only:** `git diff --stat` shows no files under `src/app/demo/` or
  `src/i18n/`. (v5 wrote this as a general completion condition, which Track B necessarily
  violates.)
- **Track B's allowed-file set**, and nothing outside it: the new
  `src/app/demo/<slug>/**`, the paired `dict.work.items` entry in `src/i18n/me.ts` and
  `src/i18n/en.ts`, the `POSTERS` array and nothing else in `src/components/landing/Work.tsx`,
  the demo palette block in `src/app/globals.css`, the `targets` array in
  `scripts/mobile-check.mjs`, and the scene asset under `public/`. Any file outside that
  list appearing in Track B's diff is a scope breach.
- `package.json` dependencies unchanged (A7 ships as a script tag, not a package).

**Staged release.** Track A ships to a Vercel preview first, gets the checks above, then
goes to production; A7's baseline is read before and after. Track B is a separate release
with its own sign-off, and when it lands its route is added to the `targets` array in
`scripts/mobile-check.mjs:4` (which today enumerates only the six existing routes) so it
is covered by the same mobile, keyboard and visual passes as everything else.
