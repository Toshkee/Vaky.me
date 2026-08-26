# Barber Drina demo — continuation brief

Use this file as the handoff context for continuing the Barber Drina demo in `C:\Users\tosii\vibecode.me`.

## Priority

Continue improving **only** `/demo/barber-drina/` first. This demo must feel like Barber Drina’s own site, not like the other portfolio demos with a different color palette. Keep the current monochrome, direct, modern barber identity, but make the content more useful and more grounded in the real shop.

## Current public information

These details were checked against the public business profiles on 26 August 2026:

- Business: Barber Drina
- Instagram: [@barber_drina](https://www.instagram.com/barber_drina/)
- Instagram bio: reservations by DM; Monday–Saturday, 09:00–21:00; Stari Aerodrom, Podgorica
- Owner profile linked in the bio: [@_matijadrincic_](https://www.instagram.com/_matijadrincic_/)
- TikTok linked in the bio: [@barber_drina](https://www.tiktok.com/@barber_drina)
- Link page: [linktr.ee/barberdrina](https://linktr.ee/barberdrina)
- Printed address: `Miloša Obilića BB, Stari Aerodrom, Podgorica`
- Public phone shown by the business link page: `+382 69 900 600` (keep secondary to Instagram)
- Current logo lockup: `BD / BARBER DRINA / SHAVE & HAIRCUT / EST. 2021`

Do not show follower counts or post counts on the website. They are volatile. Do not invent prices, service durations, email addresses, testimonials, team biographies, or claims about the shop.

## What has already been implemented

### Barber Drina

- Rebuilt `src/app/demo/barber-drina/page.tsx` from the ground up.
- Added `src/app/demo/barber-drina/BookingPlanner.tsx`, a small interactive service selector that creates a suggested Instagram DM message and lets the visitor copy it.
- Updated `src/app/demo/barber-drina/data.ts` with public profile links, address, hours, logo era, and provisional service labels.
- Added the current public logo asset at `public/barber-drina-logo.jpg` (downloaded from the current Linktree avatar).
- Replaced the invented cyan branding with the actual black-and-white logo direction.
- Added a phone-first editorial layout: logo-led hero, service list, DM booking helper, official social links, address/map section, and mobile sticky Instagram booking action.
- Updated the Drina portfolio preview in `src/components/landing/Work.tsx` to use the real logo.
- Regenerated `public/og-demo-barber-drina.png` using the real logo. The generator is `scripts/generate-demo-og.mjs`.
- The demo remains `noindex` and carries the shared VibeLab fictional-concept disclosure.

### VibeLab studio site cleanup completed in this session

- Removed the “Besplatan koncept” CTA from the navbar.
- Removed Viber, WhatsApp, and call links from the VibeLab contact footer.
- Removed the VibeLab owner’s phone number from `src/config/site.ts` and from studio JSON-LD telephone data.
- Changed the 404 CTA to point to Instagram instead of WhatsApp.
- Kept Instagram and email as the VibeLab studio’s public contact channels.
- Rebuilt the other demo pages earlier in the session, but do not use them as the visual template for Barber Drina.

### Earlier portfolio demo polish completed in this session

- Updated `src/components/demo/VibeLabBar.tsx` so every demo says it is a design concept with illustrative business data and links back to VibeLab.
- Removed fictional testimonials and unused testimonial data from the demos.
- Kept all demos `noindex`; no restaurant, gym, salon, or barber business schema was added.
- Regenerated the existing demo OG cards with corrected Montenegrin diacritics.
- Titan Gym: nested plan features under their plan, made the student discount secondary copy, aligned trainer rows on mobile, increased secondary-button border contrast, and aligned the map query with the printed address.
- Konoba Skadar: exposed the menu link in mobile navigation, replaced fragile mobile dotted leaders with resilient name/price rows, balanced desktop menu groups, standardized the content rail, and aligned the map query with the full printed address.
- Barbershop Stari Grad: top-aligned barber descriptions, aligned the price list to the content rail, removed the incomplete viewport-edge barber pole, added a mobile booking action with safe bottom spacing, improved cream/gold contrast, and aligned the map query with the full printed address.
- Added the shared responsive audit script at `scripts/mobile-check.mjs` and used it at 320px and 390px.

## Requested next changes

### 1. Make the map exact

The page currently uses a full-address Google Maps query in `publicDetails.mapUrl`. This is presentation-only and may not identify the exact storefront.

Replace it with the exact Google Maps place URL or verified latitude/longitude for Barber Drina. Do not guess coordinates from the neighbourhood. Confirm that the pin opens at the shop entrance and that the displayed address matches the printed address.

Preferred implementation:

- Keep the visible address exactly as `Miloša Obilića BB, Stari Aerodrom, Podgorica` unless the owner confirms a correction.
- Use the exact verified place link for the “Otvori Google mapu” action.
- If an iframe cannot reliably show the exact place, use a clean map preview/link rather than a misleading map.
- Add a short note in code or this file explaining the source of the verified pin.

### 2. Use the real price board

The owner has a physical price list at the shop. Add a real photograph or scan of that price board once it is obtained from the owner or an official Instagram post.

- Do not recreate or estimate the prices in HTML.
- Do not use stock barber imagery.
- Prefer a clear, straightened, cropped image with readable text on mobile.
- Add a responsive “Cjenovnik” section with the real image and an accessible text alternative/transcription.
- If the image is from Instagram, preserve the official source link and obtain permission before presenting it as site content.
- Label the section as a concept until the owner approves the final asset and prices.

Suggested asset location: `public/barber-drina-price-list.jpg` or `.webp`.

### 3. Add selected Instagram videos

Use a small, curated “Radovi” or “Video” section based only on Barber Drina’s own Instagram posts/reels.

- Select 3–6 of the strongest recent haircut/beard videos after reviewing the official profile.
- Store the official post/reel URLs in `data.ts`.
- Prefer lightweight linked cards that open Instagram, with owner-approved thumbnails, rather than heavy autoplay embeds.
- If using Instagram embeds, lazy-load them and verify that they do not create horizontal overflow or block the page on mobile.
- Do not download or republish client faces without permission. If permission is unclear, use linked Instagram cards only.
- Avoid fake captions, fake results, and invented service claims; use the actual post caption or a neutral label such as “Pogledaj na Instagramu”.

### 4. Reduce the numbered-template feel

The current page still has some `01`, `02`, and `03` labels. Remove most of them from the visible design. The page should read naturally:

- Keep at most one small process cue if it genuinely improves the booking flow.
- Remove ordinal labels from the service rows and social/contact blocks.
- Use clear headings (`Usluge`, `Cjenovnik`, `Radovi`, `Rezervacija`, `Lokacija`) and whitespace instead.
- Do not replace the numbers with decorative badges or another repetitive card system.

## Visual direction

- Keep the real monochrome logo as the anchor.
- Black, white, and restrained grey are intentional; do not bring back the invented cyan accent.
- Keep the split editorial hero and practical DM interaction, but reduce any oversized text that makes the page feel like an AI poster.
- The site should feel like a confident local barber brand: direct, precise, and easy to use on a phone.
- Instagram is the primary booking channel. The phone link may remain a quiet secondary option because it is publicly listed, but it must not compete with Instagram.
- No WhatsApp/Viber CTA is needed for the Drina concept unless the owner specifically requests it.

## Content and trust rules

- Keep `robots: { index: false, follow: false }` on the demo.
- Keep the VibeLab concept disclosure visible.
- Never add `BarberShop`, `HairSalon`, `LocalBusiness`, or other business-entity JSON-LD for Drina without an owner-approved brief and verified entity data.
- Do not add testimonials or reviews unless the owner supplies permission and exact wording.
- Clearly mark provisional service descriptions/prices as concept content until confirmed.
- Do not add stock photos.

## Verification checklist

Run these after the next changes:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run check:mobile
git diff --check
```

Manually inspect `/demo/barber-drina/` at 320px, 390px, and 1440px:

- No horizontal overflow.
- Sticky Instagram booking button does not cover the final content.
- Logo remains crisp and readable.
- Real price image is readable on a phone.
- Video cards/embeds do not cause layout shifts or overflow.
- Map opens the verified exact location.
- Only the intended small amount of process numbering remains.
- No fake prices, testimonials, phone numbers, or unverified claims were introduced.
