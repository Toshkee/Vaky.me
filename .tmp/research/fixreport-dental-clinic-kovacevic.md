# Fixer report — dental-clinic-kovacevic (all 10 plan changes claimed done)

1. **Hero photo swap** — ordinacija.jpg is the hero: aspect-[3/2], object-right (verified with sharp: only position keeping full handwritten wall lettering, ends at source x≈885/900), priority, sizes 52vw/92vw, 5fr/7fr grid with lg:-mr-8 xl:-mr-16 overhang. Caption/alt rewritten; provenance + replaceBeforeProduction untouched.
2. **Door mark traced** — single open path, viewBox 0 0 26 38, currentColor, no fill, round caps: molar crown in one stroke continuing as tapering implant thread. Iterated 5× against rasterized preview + sharp crop of actual door glass. Appears exactly twice: three flow marks (teal) + one large faint print on navy band. ulaz.jpg survives only as tight square plate in #lokacije (.doorCrop: 3.75× scale, source px 155–395 × 90–330). Provenance recorded as doorMark in data.ts.
3. **12-col recomposition** — Oblasti + Prva posjeta are 4/8 splits; Tim full-width head row over full-width roster; #lokacije 6/3 head + full-width board. DEVIATION: board went to #lokacije, not Prva posjeta's right column; Prva posjeta gets the 4/8 split with inline CTA in left third.
4. **Two-ordinacije board** — only clinic.areas + municipality. Two hairline cells, town names clamp(2.2rem,6vw,3.6rem) (largest type after h1), MapEmbed per cell with SEARCH query (clinic name, town, municipality), honest closing sentence. Added researchOnly.doctorsPerLocation note.
5. **Tim roster + CTA re-point** — sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)] replaces flex+min-w; hero secondary CTA → #lokacije labelled "Igalo ili Zelenika".
6. **Teal job** — stray 32px rule deleted; hero eyebrow demoted to navy-soft; teal = mark + flow marks + three field terms + links; deployment rule as CSS comment.
7. **Oblasti out of triad** — <dl> term/definition rows md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]; "Stomatologija" larger via documented entry?: true flag in data.ts.
8. **Hero edges + motion** — grid-template-rows auto 1fr, .heroBody align-self:end, .heroPhoto align-self:start; .heroSettle + keyframes deleted (zero unrequested motion); kept manual <br>s, dropped text-balance.
9. **Controls differentiated** — four labels: "Pošalji upit" / "Igalo ili Zelenika" / "Napiši prvu poruku" / "Piši na @dental_clinic_kovacevic"; duplicate closing link gone; <em>→<span italic>; footer credit on own line.
10. **Density peak** — ADAPTED: #lokacije is the peak (not full-bleed treatment room — that photo became the hero and a second container break would cancel the first). Only section not heading-lede-content; type above heading scale (town names); CTA lands there.

DEVIATION also: flow marks at 1.9rem not ~14px (at 22px crown+thread merge unreadably; reason in CSS). Phone CTA w-full sm:w-auto.
Verification claimed: tsc + eslint clean; no dead CSS/imports; door crop/flow marks/navy print verified via standalone Playwright render (3 issues found+fixed there). page.tsx 439 lines.
