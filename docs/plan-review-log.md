# Plan Review Log: pixel-art UI upgrade for the VibeLab landing page

Started 2026-08-27. MAX_ROUNDS=5. PLAN_FILE=PLAN.md.
Reviewer: OpenAI Codex `gpt-5.6-terra`, reasoning effort medium, read-only sandbox.
Thread: 01a04224-c47e-7480-aaf4-d1dba08d3b7a

Round 0 was a timid "add shadows to the existing boxes" draft, discarded before review
after the owner supplied a reference (Misha Savin's *INSIDE* pixel-art game landing page)
and said "I like the idea of this look." PLAN v2 committed to a full pixel skin and is
what Round 1 reviewed.

## Round 1 - Codex

## Verdict

VERDICT: REVISE

The plan has correctly decoded the reference, but its load-bearing business argument fails: it replaces a coherent, contrast-audited identity with a game aesthetic before proving that this audience will tolerate it—and then recommends deferring the one asset that makes the reference persuasive. That is a high-risk conversion redesign without measurement.

## Blocking objections

1. §2’s credibility premise is unproven and contradicted by the current portfolio previews. The four “conventional, polished” demos are one click away, while the landing-page previews are mostly typographic mock posters; only Drina uses an image ([Work.tsx](/Users/toshkee/vibecode.me/src/components/landing/Work.tsx:27), [Work.tsx](/Users/toshkee/vibecode.me/src/components/landing/Work.tsx:83)). A prospect’s first screen is still the studio site. Confidence: high.  
   Fix: do not use “the demos will rescue trust” as the rationale. Validate the current demos with real business imagery first, or test the pixel direction separately.

2. The proposed hero hides the offer inside a fictional game screen. Today the core promise, CTA, proof, and free-concept form are immediately legible in a conventional two-column layout ([Hero.tsx](/Users/toshkee/vibecode.me/src/components/landing/Hero.tsx:9)). A red game field, over-art headline, HUD icons, title bars, and beveled controls ask a 35–60-year-old owner to decode a visual language unrelated to buying a €200 website. Confidence: high.  
   Fix: keep the money-page hero’s offer and contact route visually direct; reserve the full game treatment for `/lab` or a deliberately game-oriented demo.

3. Option §5(d) must not ship. The plan itself says the scene is what makes the reference work and that pixel type on a plain page reads cheaper ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:196)). That diagnosis is right: without art, this is a normal site in a costume, and likely worse than the current “Oglas” identity.  
   Fix: make the illustration a prerequisite for a full pixel landing page, or do not apply the skin.

4. The plan says the palette remains unchanged, but the new hero puts display text over an uncontrolled dark/multicolour scene. Existing documentation explicitly says brand red is only 3.06:1 on ink ([globals.css](/Users/toshkee/vibecode.me/src/app/globals.css:14)). The current H1 contains a red span ([Hero.tsx](/Users/toshkee/vibecode.me/src/components/landing/Hero.tsx:13)). A dark stroke does not make a red fill accessible against arbitrary art.  
   Fix: define a tested hero-art crop/overlay and fixed foreground pair, or use white fill only; test rendered—not nominal—contrast.

5. `clip-path` does clip an element’s own `box-shadow`; the wrapper fallback should be the primary implementation, not an unresolved unknown. Use a filtered wrapper, which casts from the clipped child’s alpha shape:

```css
.px-window-shell {
  filter: drop-shadow(4px 4px 0 var(--color-ink));
}

.px-window {
  border: 2px solid var(--color-ink);
  clip-path: polygon(
    4px 0, calc(100% - 4px) 0,
    calc(100% - 4px) 4px, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) 100%, 4px 100%,
    4px calc(100% - 4px), 0 calc(100% - 4px),
    0 4px, 4px 4px
  );
}
```

`filter` creates a stacking context; specify that in the plan and test overlays/dialogs.

6. The proposed focus treatment is wrong. Making `:focus-visible` imitate `:active` removes the 4px shadow and translates the control, rather than providing a visible focus indicator. The existing global outline is only red with a 3px offset ([globals.css](/Users/toshkee/vibecode.me/src/app/globals.css:75)); it can merge with red controls and game art.  
   Fix: reserve translation/shadow-collapse for `:active` only. Give focus an independent high-contrast outline, e.g. `outline: 3px solid #fff; outline-offset: 5px`, varied by surface where necessary.

7. There is no conversion baseline or conversion proof. `package.json` has lint/build/mobile checks only ([package.json](/Users/toshkee/vibecode.me/package.json:5)), while the stated sole outcome is a DM, WhatsApp, or email. Screenshots cannot tell whether a prospect trusted the studio.  
   Fix: instrument outbound CTA events and establish a baseline before changing the money page; include event parity/rate monitoring in §8.

## Non-blocking

1. Pixelify Sans is technically viable: Next’s local Google-font metadata lists `latin-ext`, and its published character map includes the required extended capitals; it is a better fit than Press Start 2P or Micro 5. But `latin-ext` is a subset label, not proof of usable rasterization. Render the actual self-hosted output at target DPRs; no offered alternative is clearly better. [Google Fonts source metadata](https://github.com/google/fonts/blob/main/ofl/pixelifysans/METADATA.pb)

2. The plan overlooks the existing Anton family in [Work.tsx](/Users/toshkee/vibecode.me/src/components/landing/Work.tsx:3). Pixelify would be a third font family, not merely a second. `next/font` self-hosts fonts at build time, so no browser request goes to Google, but the hero font is still another preload/download and can affect LCP/CLS. [Next Font documentation](https://nextjs.org/docs/app/api-reference/components/font)

3. `-webkit-font-smoothing: none` is not a reliable “pixelize text” solution and should not be global. Apply `image-rendering: pixelated` only to raster pixel art, at integer scaling; it does not improve text. Use integer CSS font sizes and test native rendering.

4. The bevel declaration is structurally correct. Inset shadows render inside the padding edge and do not paint over an opaque border; the 2px border remains visually clean. Specify contrast-tested highlights separately for red, paper, and ink variants.

5. Tailwind v4 accepts `--shadow-px` inside `@theme` and can generate `shadow-px`. The plan does not need that utility, though: `.px-btn` and `.px-window` can use direct CSS shadow declarations. Do not add tokens merely to make utilities.

6. Four-pixel shadows will not, by themselves, fail `mobile-check.mjs`: `getBoundingClientRect()` excludes box-shadow and `scrollWidth` ordinarily tracks layout/scrollable overflow, not ink overflow. With current `px-5` containers, a full-width card’s border box remains 20px from either viewport edge. It fails only when an actual layout/transform overflow is introduced—such as negative margins, oversized width calculations, positioned children, or a translated active element during the check. The script also deliberately ignores descendants of overflow-clipped ancestors ([mobile-check.mjs](/Users/toshkee/vibecode.me/scripts/mobile-check.mjs:30)).

7. For touch press states, put `.px-btn` on the actual `<a>` or `<button>`, not a decorative `<div>`. Native anchors and buttons receive `:active` on current iOS Safari; no touch handler is needed. The Work proposal must retain the `Link` as the interactive element ([Work.tsx](/Users/toshkee/vibecode.me/src/components/landing/Work.tsx:114)).

8. The `<dialog>` needs an explicit modal sizing/overflow/focus test. Its current panel carries the border on an inner scrolling div ([PlanMatrix.tsx](/Users/toshkee/vibecode.me/src/components/landing/PlanMatrix.tsx:221)); wrapping only that inner div can leave an unstyled dialog box/backdrop geometry. Test Esc, backdrop click, focus return, and 320px scrolling.

9. Replacing the check SVG is not inherently an improvement. Preserve the existing text alternative behavior: mobile checks are presentational, while desktop checks expose the feature label ([PlanMatrix.tsx](/Users/toshkee/vibecode.me/src/components/landing/PlanMatrix.tsx:167)).

10. §4 under-specifies the actual affected files: Pricing, Process, Contact, FAQ, Footer, and `LandingPage.tsx` all participate ([LandingPage.tsx](/Users/toshkee/vibecode.me/src/components/landing/LandingPage.tsx:20)). It also conflicts with “no new strings” by proposing a hard-coded `BESPLATAN KONCEPT` title bar.

11. “Rendered at 2× and downscaled with `image-rendering: pixelated`” is backwards/underspecified. Pixel art should be authored on a defined logical grid and displayed at integer multiples; downscaling is not a dependable way to preserve a pixel grid.

## What the plan gets right

- It correctly keeps body copy in Libre Franklin and calls out Montenegrin glyph testing.
- It preserves native `<details>` and the existing dialog semantics.
- It recognizes the scene—not the button chrome—is the reference’s essential asset.
- It requires mobile screenshots, keyboard review, reduced-motion behavior, and no new dependencies.

## The strongest case against doing this at all

The current identity is not generic: it deliberately speaks in the trusted visual language of a local printed notice—paper, ink, rules, and one audited red ([globals.css](/Users/toshkee/vibecode.me/src/app/globals.css:3)). That is unusually aligned with a middle-aged local owner deciding whether an unfamiliar freelancer is legitimate.

A full pixel game skin signals taste and playfulness, but not necessarily reliability, local-business judgment, or “I will make a konoba look like a konoba.” The €100–€350 price makes trust more fragile, not less: the visitor may already suspect a shortcut. The materially better answer is to preserve the money page, improve the actual demos with real imagery, and place a complete pixel experiment on `/lab` or one appropriate demo. “Do far less” is the strategically stronger default.

## If you had to stage it, the stages

1. Instrument the current outbound email, Instagram, and WhatsApp CTAs; record a baseline. Add task-based testing with several target-age local owners.

2. Build the complete scene and interaction system on `/lab/pixel-studio` or a new demo route. Do not ship a scene-less version.

3. Test that route at 320/390/768/1440, actual iOS Safari, keyboard/dialog flows, font glyph/DPR specimens, automated accessibility checks, and Lighthouse LCP/CLS.

4. Only if users still identify the offer and complete the contact task, trial one restrained landing-page element—preferably the primary CTA treatment—while retaining the current hero information architecture.

5. Consider a full landing-page replacement only after the illustration, conversion evidence, and credibility evidence from improved demos all exist.

### Claude's response — PLAN v3

**Accepted (blocking):**
- **#2, #3** — the two objections that reshaped the plan. v2's hero hid the offer inside a
  game screen, and v2 then proposed shipping that screen without its illustration. Both
  dropped. v3 splits into Track A (a structural pixel layer on the landing page that never
  touches the hero's information architecture) and Track B (the full reference language,
  at full strength, as a fifth demo site).
- **#5** — `clip-path` clips its own `box-shadow`. The wrapper + `filter: drop-shadow`
  pattern is now the primary implementation, with its stacking-context side effect written
  into the risk list against the `<dialog>`, the FAB and the sticky nav.
- **#6** — v2's focus treatment was wrong: it made `:focus-visible` imitate `:active`.
  Press is now `:active` only; focus gets an independent high-contrast outline with a
  variant that survives on red fills.
- **#4** — red-on-dark contrast. Moot for Track A (no text over artwork) and constrained
  in Track B to a tested foreground pair.
- **#1, in part** — "the demos will rescue trust" is weaker than v2 claimed, since three of
  four Work posters are typographic mocks (`Work.tsx:27`). Removed as a load-bearing
  argument; Track A no longer needs it.

**Accepted (non-blocking):** the Anton miscount (Pixelify would be a *third* family, not a
second), `-webkit-font-smoothing: none` is not a pixelizer, `image-rendering: pixelated` is
for raster art only, pixel art must be authored on a grid and shown at integer multiples
rather than downscaled from 2×, `.px-btn` belongs on real `<a>`/`<button>` elements so iOS
`:active` works, the `<dialog>`'s border sits on an inner div so wrapping it needs an
explicit test, check-glyph a11y parity between the presentational mobile checks and the
labelled desktop ones, the `@theme` shadow token is unnecessary, and the mobile-overflow
analysis (shadows don't trip `scrollWidth`; transforms and negative margins do).

**Rejected, with reasons:**
- **#7 in its strong form** — a conversion baseline plus recruited task-based testing with
  several target-age local owners before the money page may be touched. At this site's
  traffic a meaningful baseline takes months, and recruited testing costs more than the
  redesign; that is enterprise process on a two-person decision. Accepted the cheap half
  instead: zero-dependency outbound-CTA instrumentation (A7), so the next decision is not
  blind either. Residual risk stated plainly rather than processed away.
- **The implied "fix the demos with real imagery first" gate** — true and worth doing, but
  it is photography work, not a prerequisite for CSS frames. Logged as a follow-up.
- **The `/lab/pixel-studio` suggestion** — right instinct, wrong venue. A hidden route
  parks the effort where nobody looks. A fifth demo does the same de-risking *and*
  extends the portfolio to five distinct brands.

## Round 2 — Codex

## Blocking objections

1. A7 is not yet instrumentation. A static, zero-dependency click listener cannot “record” anything without a defined receiving service or endpoint; there is no analytics dependency, endpoint, or event sink in [package.json](/Users/toshkee/vibecode.me/package.json:13). The plan must specify the authorised sink, event names, route/language/version fields, and how results are inspected. Otherwise D3 accepts measurement in principle but ships none in fact.

2. Track B is a good venue, better than a hidden `/lab` route, provided it is clearly a concept demo and not presented as a real client. But it is not yet a buildable plan: the sole essential asset’s production route remains “an open question” ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:161)), and its proof section never adds the fifth route to the mobile audit, which currently enumerates only six existing routes ([mobile-check.mjs](/Users/toshkee/vibecode.me/scripts/mobile-check.mjs:4)). Define the asset method, content/fiction disclosure, CTA behavior, and add the route to every mobile, keyboard, and visual check.

## Non-blocking

1. The split clears the central conversion-risk bar. Track A retains the current two-column hero, readable Franklin headline/body copy, and CTA order ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:137)); it is now a restrained retro-control treatment, not a game landing page selling web design. The remaining risk is small but specific: Pixelify at the current 12px eyebrow size ([globals.css](/Users/toshkee/vibecode.me/src/app/globals.css:97)) and in mobile nav labels ([Nav.tsx](/Users/toshkee/vibecode.me/src/components/landing/Nav.tsx:78)) may be harder to read than its decorative value warrants. Make A4’s visual acceptance criterion include actual nav/button labels at 320px—not only the diacritic specimen.

2. I accept the proportionality rejection of recruited, target-age usability testing and a statistically meaningful conversion gate. For a low-traffic one-person studio, that is not a reasonable prerequisite for this constrained Track A. The minimum acceptable replacement is real outbound-event instrumentation plus a staged release and screenshots; objection 1 is about making that replacement real.

3. I also accept that photography is separate work and should not gate CSS window frames. It simply must no longer be used as evidence that portfolio credibility offsets landing-page risk. v3 no longer relies on that argument, which is the right correction.

4. A1 is mechanically correct: the bevel is on real anchors/buttons, and `:active` alone collapses the outer shadow and uses the `translate` longhand ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:34)). The target list is concrete enough to avoid applying press behavior to decorative wrappers.

5. A2 is directionally correct but underspecified. “White outline with a dark outer edge” ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:57)) is not CSS a builder can implement consistently alongside the existing red global focus outline ([globals.css](/Users/toshkee/vibecode.me/src/app/globals.css:75)). Specify the exact primary selector, outline/ring widths, offsets, and whether the focus ring augments or replaces the hard drop shadow.

6. A3’s `filter: drop-shadow` wrapper pattern is correct ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:73)). The stated stacking-context risk is correctly retained. Specify the wrapper ownership for each frame, especially the dialog: the filter wrapper must not become the scrolling element or interfere with the dialog backdrop.

7. A5 correctly preserves the important `Tick` split: mobile checks stay presentational while desktop table checks expose an accessible label ([PlanMatrix.tsx](/Users/toshkee/vibecode.me/src/components/landing/PlanMatrix.tsx:167)). Also explicitly require `aria-hidden` for Hero/Work/FAQ decorative replacements, matching their current use ([Hero.tsx](/Users/toshkee/vibecode.me/src/components/landing/Hero.tsx:31), [Work.tsx](/Users/toshkee/vibecode.me/src/components/landing/Work.tsx:122), [Faq.tsx](/Users/toshkee/vibecode.me/src/components/landing/Faq.tsx:18)).

8. The no-new-strings resolution is valid: title-bar contents must either be an `aria-hidden` decoration or reuse an existing localized value ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:234)). The plan should map that choice per window; otherwise an implementer will improvise English/Montegrin labels.

9. Risk 7 is honest: Track A will not read as the owner’s full INSIDE reference. It will read as a competent existing site with a retro/pixel control system. That is acceptable for Track A, but it may underwhelm if sold as “the reference look.” The smallest safe addition is one hand-authored, fixed-grid 96×64 pixel vignette inside the existing ConceptRequest frame—no text over it, no hero replacement, no new interaction. It creates a genuine pixel-art focal point without putting the offer behind art.

10. Proof of done is substantially improved, especially dialog and keyboard checks ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:255)). It still misses: verification that outbound events arrive at the chosen sink; an active-state screenshot/test; actual iOS Safari (an iPhone Playwright profile is Chromium, not Safari); and Track B’s route/asset checks.

VERDICT: REVISE

### Claude's response — PLAN v4

**Both blocking objections accepted in full.**

- **#1 — A7 was measurement in name only.** Correct: a static export has nowhere to record
  to, so "a zero-dependency listener" recorded nothing. A7 now names the sink
  (`@vercel/analytics`, first-party to the host the site already runs on), the three event
  names, their `lang`/`surface`/`plan` properties, where results are read, and a blocking
  pre-check that custom events exist on this project's Vercel plan — with the fallback
  being an explicit written admission that outbound conversion is unmeasured, never a
  quiet drop. This is now the single deliberate exception to the zero-dependency rule, and
  *Out of scope* says so: exactly one added dependency, no others.
- **#2 — Track B was a venue, not a plan.** Now buildable: route and sibling-of-the-four
  pattern, the two landing-page files it touches, concept disclosure matched to the
  existing demos' own pattern (`titan-gym/page.tsx:10`, `:91`), illustrative CTA
  behaviour, and the scene's production method decided (hand-authored on a fixed grid at
  integer display multiples) rather than left open. Its route joins
  `scripts/mobile-check.mjs:4` when it lands, and it is a separate release with its own
  sign-off.

**Non-blocking accepted:** exact focus CSS for `--primary` including the ring's
interaction with `:active` (#5); per-window wrapper ownership as a table, with the dialog
filter explicitly not on the scrolling child (#6); `aria-hidden` mapped per replaced glyph
including `Hero.tsx:31`, `Work.tsx:122`, `Faq.tsx:18` (#7); title-bar content named per
window so nobody improvises an untranslated label (#8); A4's acceptance gate widened from
the diacritic sheet to real nav/button/eyebrow labels at 320px (#1); and four additions to
Proof — event arrival observed in the dashboard, a pressed-and-focused screenshot, real
WebKit rather than Playwright's Chromium-with-a-spoofed-UA iPhone profile, and Track B's
route/asset checks (#10).

**#9 adopted as a plan item, not just noted.** The 96x64 hand-authored vignette inside the
existing `ConceptRequest` frame is now A8 — the smallest addition that gives Track A a
genuine pixel-art focal point without putting the offer behind art.

**Nothing rejected this round.** Round 1's two rejections stand, and Codex explicitly
accepted both on re-review.

## Round 3 — Codex

## Blocking objections

1. A7 is still conditional rather than resolved for this project. The repo’s own handoff says Vercel Hobby does not support custom events ([HANDOFF.md](/Users/toshkee/vibecode.me/HANDOFF.md:292)), which current Vercel documentation confirms: custom events are Pro/Enterprise-only ([Vercel pricing](https://vercel.com/docs/analytics/limits-and-pricing)). The pre-check and written admission are honest, but they do not produce the proposed three conversion events on the known plan.  
   Fix: choose a functioning authorised sink (for example, the handoff’s Umami suggestion), explicitly authorise/require a Pro upgrade, or remove A7 as a justification for measurement-based release decisions.

2. A7 does not specify how `track()` can be called from this codebase. `Hero` and `Contact` are server components ([Hero.tsx](/Users/toshkee/vibecode.me/src/components/landing/Hero.tsx:6), [Contact.tsx](/Users/toshkee/vibecode.me/src/components/landing/Contact.tsx:8)); they cannot attach client click handlers directly.  
   Fix: specify one client-side delegated analytics component mounted in the root layout, with `data-cta`, `data-surface`, and optional `data-plan` attributes on server-rendered links/buttons. `ConceptRequest` and `PlanMatrix` may call `track()` directly, but the plan should choose one consistent pattern.

3. Track B conflicts with its own no-i18n scope. It says a fifth entry is added to `dict.work.items` ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:247)), but those items are defined in both dictionaries ([me.ts](/Users/toshkee/vibecode.me/src/i18n/me.ts:44)), while the plan says `src/i18n/*` is out of scope ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:342)). `Work.tsx` indexes posters against those dictionary entries, so this cannot be deferred or hand-waved.  
   Fix: explicitly allow the paired, type-checked dictionary additions for Track B, including its translated name/tag, or redesign the Work data structure.

4. The focus CSS is not correct as written. When focused and active, `.px-btn--primary:focus-visible` has higher specificity than `.px-btn:active`, so the focus declaration retains the 4px hard drop rather than showing a genuinely depressed button. Also, `0 0 0 6px` ends at the outer edge of the white 3px outline offset by 3px; it does not create the claimed dark edge outside it ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:70)).  
   Fix with a compound selector and a wider outer ring:

```css
.px-btn--primary:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
  box-shadow:
    inset 0 3px 0 rgb(255 255 255 / .35),
    inset 0 -3px 0 rgb(0 0 0 / .25),
    4px 4px 0 var(--color-ink),
    0 0 0 9px var(--color-ink);
}

.px-btn--primary:focus-visible:active {
  box-shadow:
    inset 0 3px 0 rgb(255 255 255 / .35),
    inset 0 -3px 0 rgb(0 0 0 / .25),
    0 0 0 9px var(--color-ink);
}
```

## Non-blocking

1. The dialog’s top-layer promotion and `::backdrop` are not inherently disturbed by `filter` on the `<dialog>`; the backdrop remains a separate top-layer pseudo-element. The table is still incomplete for the desired silhouette: the current dialog itself has `bg-paper` ([PlanMatrix.tsx](/Users/toshkee/vibecode.me/src/components/landing/PlanMatrix.tsx:221)). A filtered opaque dialog casts a rectangular shadow, not its clipped child’s stepped shape. Make the dialog shell `bg-transparent p-0`, put `.px-window bg-paper` on the existing scrolling child, and keep the filter only on the dialog shell.

2. Track B’s concept disclosure is properly grounded in the existing demo pattern; this is now a better public venue than `/lab`. Its illustrative CTA rule remains vague because existing demos use dummy but real `tel:` links ([titan-gym/page.tsx](/Users/toshkee/vibecode.me/src/app/demo/titan-gym/page.tsx:49)). Specify whether Arcade uses inert anchors, section links, or the existing dummy-contact convention.

3. The expanded proof section now covers the relevant visual, focus, dialog, event-arrival, and route checks. “`playwright install webkit`” alone does not create a WebKit pass: the audit hardcodes `chromium.launch()` ([mobile-check.mjs](/Users/toshkee/vibecode.me/scripts/mobile-check.mjs:1)). Either require the real-iPhone path, or add a WebKit launch target.

VERDICT: REVISE

### Claude's response — PLAN v5

**All four blocking objections accepted. Nothing rejected this round either.**

- **#1 — the A7 pre-check had a known negative answer.** `HANDOFF.md:292` already records
  it: *"Vercel Hobby does not support Analytics custom events (Pro only). Umami is the
  suggested alternative."* Taking the handoff's own recommendation — the sink is Umami, a
  cookieless ~2 KB script tag. Side effect: being a script rather than a package, it
  **restores the zero-npm-dependency rule**, so `package.json` is untouched after all and
  the *Out of scope* and *Proof* sections revert accordingly. The choice between Umami
  Cloud, self-hosted, and no measurement is now an explicit owner decision, with "no
  measurement" allowed provided D3 is restated honestly as shipping unmeasured rather than
  leaving it implied.
- **#2 — `track()` had no way to be called.** Correct: `Hero.tsx:6` and `Contact.tsx:8` are
  server components. One delegated client component, `<CtaTracker />`, mounted once in
  `layout.tsx`, reading `data-cta` / `data-surface` / `data-plan` off the clicked ancestor.
  Server CTAs gain attributes; nothing becomes a client component to be measured; the
  already-client `ConceptRequest.tsx` uses the same attributes rather than a second
  pattern.
- **#3 — Track B contradicted its own no-i18n scope.** Correct and structural:
  `dict.work.items` is defined in both dictionaries (`me.ts:44`) and `Work.tsx` indexes
  `POSTERS` positionally against them. Track B now carries an explicit carve-out for one
  paired, type-checked entry in `me.ts` and `en.ts`. Track A still touches `src/i18n/` not
  at all.
- **#4 — the focus CSS had two real bugs.** `0 0 0 6px` ended *at* the white outline's
  outer edge rather than outside it (3px offset + 3px outline), and
  `.px-btn--primary:focus-visible` outranks `.px-btn:active`, so a focused button would
  never have appeared pressed. Both fixed with Codex's compound selector and 9px ring.

**Non-blocking accepted:** the dialog needs `bg-transparent p-0` with `.px-window bg-paper`
moved onto the scrolling child, since a filtered *opaque* dialog casts a rectangular shadow
instead of its clipped child's stepped silhouette (and `filter` does not disturb top-layer
or `::backdrop`, which is now stated rather than left as an open worry); Track B's CTA
convention named concretely as the existing dummy-`tel:` pattern (`titan-gym/page.tsx:49`);
and the WebKit proof corrected — `scripts/mobile-check.mjs:1` hardcodes
`chromium.launch()`, so `playwright install webkit` alone proves nothing.

## Round 4 — Codex

## Round 3 resolutions

- **Umami sink:** resolved in principle. It replaces the known-incompatible Vercel custom-event approach and restores the zero-NPM rule ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:200)).
- **Delegated client tracker:** resolved. One layout-mounted client component avoids converting [Hero.tsx](/Users/toshkee/vibecode.me/src/components/landing/Hero.tsx:6) and [Contact.tsx](/Users/toshkee/vibecode.me/src/components/landing/Contact.tsx:8) to client components ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:225)).
- **Track B i18n carve-out:** resolved and correctly explains why paired dictionary entries are structurally necessary ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:278)).
- **Focused press CSS:** resolved. The compound selector and 9px outer ring correctly address both v4 cascade/geometry defects ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:70)).
- **Dialog shell:** resolved. Transparent filtered dialog shell plus opaque clipped scrolling child is the right pattern ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:132)).
- **Track B CTA convention and WebKit proof:** resolved ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:291), [PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:420)).

## Remaining implementation-breaking gaps

1. A7’s event table does not match the actual CTA routes. It assigns `cta_whatsapp` to Contact and PlanMatrix ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:218)), but Contact contains Instagram and email only ([Contact.tsx](/Users/toshkee/vibecode.me/src/components/landing/Contact.tsx:9)), and all PlanMatrix plan CTAs use `emailLink()` ([PlanMatrix.tsx](/Users/toshkee/vibecode.me/src/components/landing/PlanMatrix.tsx:25)).  
   Fix: make PlanMatrix events `cta_email`; remove/relocate `cta_whatsapp` unless a real WhatsApp CTA is added within scope.

2. The delegated click-only tracker will miss Enter-key form submission from ConceptRequest. The existing form submits `mailto:` through `onSubmit` ([ConceptRequest.tsx](/Users/toshkee/vibecode.me/src/components/landing/ConceptRequest.tsx:57)), which need not produce a click.  
   Fix: CtaTracker must delegate both `click` and `submit` events, with the form carrying the same data attributes.

3. The proof section still instructs verification in the **Vercel** dashboard ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:417)), despite changing the sink to Umami. That check cannot prove Umami events arrived.  
   Fix: replace it with the selected Umami Cloud/self-hosted dashboard, and make the owner’s required Umami deployment choice a pre-implementation gate.

4. The “no files under `src/app/demo/` or `src/i18n/`” proof ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:425)) is valid only for Track A, but is written as a general completion condition despite Track B’s explicit demo and i18n changes.  
   Fix: label that assertion “Track A only”; define Track B’s allowed-file set separately.

The plan is sound after these four corrections; they are tracking/proof consistency defects, not a reason to reopen the design split.

VERDICT: REVISE

### Claude's response — PLAN v6

All four accepted; all four were consistency defects between the plan and the actual code,
and Codex confirmed the design split itself is settled.

- **#1 — the event table described CTAs that do not exist.** Verified: `Contact.tsx:2`
  imports only `emailLink` and `instagramLink`, every `PlanMatrix` plan CTA runs through
  `emailLink()` (`PlanMatrix.tsx:25`), and `src/config/site.ts` has **no `wa.me` helper at
  all**. `cta_whatsapp` was invented and is removed; the pricing CTAs are `cta_email` with
  a `plan` property. Noted for the owner as a real finding: `HANDOFF.md` describes the
  funnel as "WhatsApp, email, or Instagram DM", but WhatsApp is not wired up anywhere on
  the site. Out of scope to fix here.
- **#2 — a click-only tracker would miss the most important conversion.** The coupon
  submits through `onSubmit` + `window.location.href` (`ConceptRequest.tsx:57`), so an
  Enter keypress produces no click. `CtaTracker` now delegates `submit` as well as `click`,
  and the `<form>` carries the same data attributes.
- **#3 — Proof still said "Vercel dashboard"** after the sink moved to Umami, which could
  not have proved anything. Corrected, the Enter-key submit path added to the checks, and
  the Umami deployment choice made an explicit pre-implementation gate.
- **#4 — the "no demo/i18n files" assertion was written as a general completion
  condition** that Track B necessarily violates. Now labelled Track A only, with Track B's
  allowed-file set enumerated so anything outside it counts as a scope breach.

## Round 5 — Codex (final round under the cap)

All four v6 corrections are present and correct.

- A7 now matches actual routes: no WhatsApp event; PlanMatrix is correctly classified as email with `plan` ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:216)).
- CtaTracker delegates both click and submit; the form carries the attributes needed for Enter-key submission ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:231)).
- Proof correctly checks the Umami dashboard, includes Enter-key submission, and makes the owner’s Umami deployment choice a pre-implementation gate ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:429)).
- Track A’s clean-diff rule and Track B’s permitted-file set are now correctly separated ([PLAN.md](/Users/toshkee/vibecode.me/PLAN.md:440)).

The plan is sound to implement. The only pending human decision—Umami Cloud, self-hosted, or explicitly unmeasured—is clearly identified as a gate and does not create an ambiguous implementation path.

VERDICT: APPROVED

---

## Outcome

**VERDICT: APPROVED** on round 5 of 5. Four rounds of REVISE, one of APPROVED.

What the argument actually changed, in order of importance:

1. **It killed the original plan.** v2 put the sales pitch inside a fictional game screen
   and then proposed shipping that screen without the illustration that makes the
   reference work. Codex refused both. The plan became two tracks: a restrained pixel
   *control system* on the money page, and the full reference language as a fifth demo
   site where the pixel art is genuinely the product.
2. **It caught four real CSS/architecture bugs** that would have shipped: `clip-path`
   clipping its own `box-shadow`; a focus state that imitated `:active` instead of
   indicating focus, then a 6px ring that should have been 9px and a specificity conflict
   that would have stopped focused buttons from ever appearing pressed; and a filtered
   opaque `<dialog>` that would have cast a rectangular shadow instead of a stepped one.
3. **It caught invented facts.** `cta_whatsapp` described a funnel that does not exist in
   the code, and a click-only tracker would have missed the coupon's Enter-key submit —
   the single most important conversion on the page. It also found the answer to my own
   "pre-check" already written in `HANDOFF.md:292`.
4. **It lost two arguments**, correctly conceded on re-review: recruited user testing and a
   statistically meaningful conversion baseline as gates on touching a one-person studio's
   own low-traffic site, and "fix the demo photography first" as a prerequisite for CSS
   frames.

**Open human decision:** A7's sink — Umami Cloud, self-hosted Umami, or explicitly
unmeasured.

**Finding for the owner, out of scope:** `HANDOFF.md` describes the funnel as "WhatsApp,
email, or Instagram DM", but WhatsApp is not wired up anywhere — `src/config/site.ts` has
no `wa.me` helper, and every plan CTA goes to email.

---

## Act 3 — Build (Claude)

Track A built and verified. Track B not started (separate release, per plan). A7 not
started (blocked on the owner's sink decision, per its own pre-implementation gate).

### Deviations from the approved plan, and why

1. **A4 narrowed twice, both times on rendered evidence, using the plan's own escape
   hatch.** The gate specimen (`č ć š ž đ Č Ć Š Ž Đ` at 12/16/24/48px, plus real labels at
   320px) killed two of the four intended uses immediately: Pixelify's euro sign is
   near-identical to `0`/`8` — "€350" reads "03S0", disqualifying on a pricing page — and
   it mushes at the 12px/0.18em eyebrow setting, where "DIZAJN KONCEPT" reads "DIBAJN".
   Both went back to Franklin.

   Then the rendered nav killed a third: at 4x the wordmark reads **"VIBELAG"**, "Cijene"
   reads "Oijene" and "EN" reads "€N" — the face's B, C and E are ambiguous, and the
   wordmark stayed wrong at 24px bold, so it is the letterforms and not the size. Nav and
   wordmark reverted to Franklin. **The pixel face ships on buttons and the 01–04 step
   numerals only**, where it tested clean and looks strong.

   Silkscreen and Jersey 15 were checked as replacements and are worse (floating carons;
   barely reads as pixel). A fourth font family for the nav alone was rejected as
   over-engineering.

2. **PixelWindow is three elements, not the two the plan implied.** `clip-path` slices a
   real `border` open at each cut corner and shows the page through the gap, so the frame
   is a *filled ink shape* with `p-[2px]` as its thickness and the pane repeats the notch.
   The filter wrapper stays separate for the reason Codex gave. Extracted as
   `src/components/ui/PixelWindow.tsx` rather than repeated inline at eight call sites.

3. **Buttons are rectangular, not notched.** Notching a control needs the same three-element
   wrapper, which is not worth it on sixteen buttons; the bevel plus hard drop already
   reads as pixel, and the reference's own buttons are essentially rectangles.

4. **`.px-dither` was written and then deleted** — `.px-rule` is what actually ships, and an
   unused class is dead code.

5. **`scripts/mobile-check.mjs` now runs both engines.** The plan offered "a real iPhone pass
   *or* a webkit launch target"; the script route is permanent and cheap, so the audit is
   now Chromium + WebKit across both device profiles.

6. **A8 was built.** 96x64, hand-authored on a fixed grid via a throwaway script, shipped as
   a 464-byte PNG, displayed at exactly 2x with `image-rendering: pixelated`.

### Proof

| Check | Result |
|---|---|
| `npm run lint` | clean |
| `npm run build` | succeeds, 12 static routes |
| `npm run check:mobile` | **24/24 ok** — Chromium + WebKit x iPhone SE + 13 x 6 routes |
| Console errors | none |
| `<dialog>` | opens, Esc closes, focus returns to opener (`true`), scrolls at 320px, inner header still `sticky` |
| Focus ring | white-in-gap + ink-outside renders; **survives `:active`** — the compound selector works |
| Press | `translate: 4px 4px`, drop shadow collapses |
| `prefers-reduced-motion` | transition `0s` (vs `0.1s`) |
| WebKit | `clip-path` + `filter: drop-shadow` both render; no overflow |
| Diacritics | all of `č ć š ž đ Č Ć Š Ž Đ` correct in the shipped uses |
| Demo/i18n diff | zero files touched under `src/app/demo/` or `src/i18n/` |
| `package.json` | dependencies unchanged |

Contrast, every new pair: white on red 6.22:1 · ghost label 17.94:1 · focus ring 6.22:1 and
17.94:1 · frame border 17.94:1 · title-bar squares 16.29:1 · pixel numerals 5.87:1. The
bevel's 3px top highlight measures 3.89:1 against white, but carries no text by
construction — measured text inset is 12–19px against a 5px band — and it is an edge
highlight on a filled shape, not a text pair.

### Also changed, outside the plan

`site.url` → `https://vibelab.it.com` (the owner bought the domain mid-build). This is the
one-line change `src/config/site.ts` was already written to anticipate; it propagates to
canonicals, `sitemap.xml`, `robots.txt` and the JSON-LD `@id`, all verified in `out/`.
**It must not ship until the domain actually serves the site.**
