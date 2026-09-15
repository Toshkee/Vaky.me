# Sljedeće: brief za izradu kao pravi prompt

Bilješka za nastavak na drugom računaru. Stanje na dan 15. septembra 2026,
posljednji komit `dedfa30`. Radno stablo čisto, sve pushovano na
`Toshkee/Vaky.me` (repo je preimenovan sa `VibeLab.me`; na novoj mašini kloniraj
novu adresu).

## Šta je urađeno danas

- Hero: "Sajt za tvoj biznis. Od €200, za 10 dana." Činjenice broje sajtove
  uživo i koncepte iz portfolija (`Hero.tsx`).
- "Kako radimo" je lista sa ikonama, bez klikanja (`Process.tsx`).
- Kontakt: desna kolona sa WhatsApp, Instagram DM, email i "šta se dešava
  dalje". Broj je u `src/config/site.ts` (`phone`), prazan broj sakriva dugmad.
- Cjenovnik: jedan red "SEO i brzina" za sva tri paketa, "Google Business
  profil" za Biznis i Projekat. Tri nova FAQ pitanja.
- Dashboard: **Brief za koncept** na svakom upitu (`server/admin/concept.ts`,
  `POST /api/admin/leads/:id/concept`, ne čuva se). **Brief za izradu** na
  projektu je sad jedan dokument, bez modova (`server/admin/brief.ts`).
- Dev server je na **portu 3001** (`npm run dev`), zbog autocomplete-a u Chromeu.
- U produkcijskoj bazi je test upit **"Pekara Zlatno Zrno (TEST)"**. Obriši ga
  iz dashboarda kad završiš probu.

## Problem koji rješavamo

Brief za izradu je dobar skup činjenica, a slab kao uputstvo agentu: dizajn
pravac je jedan red, nema strukture stranice, nema stacka, nema definicije
gotovog. I ne generiše se sam kad klijent pošalje upitnik, nego tek na klik u
dashboardu. Mejl koji stigne poslije upitnika je samo obavještenje, ne prompt.

## Plan, po redu

1. **Djelatnost na projektu.** Nova migracija `migrations/0003_trade.sql`:
   `ALTER TABLE projects ADD COLUMN trade TEXT;`. Vrijednosti su ključevi iz
   `dictionaries.me.trades.items`: `villa, apartment, restaurant, barber, hair,
   beauty, tattoo, pilates, gym, dentist`. Bira se pri pravljenju projekta
   (`Projects.tsx` forma, `LeadDetail.tsx` pri pretvaranju upita) i mijenja u
   `ProjectDetail.tsx`. Dodirnuti: `server/admin/store.ts` (`ProjectInput`,
   `ProjectPatch`, SQL), `functions/api/admin/projects/index.ts`,
   `functions/api/admin/projects/[id].ts`,
   `functions/api/admin/leads/[id]/convert.ts`, `src/lib/admin/client.ts`.
   Migracija se primjenjuje ručno, vidi `docs/onboarding-setup.md`, sekcija
   "Applying the migrations".

2. **Novi fajl `src/lib/build-playbook.ts`** (bez React-a, uvozi ga Worker):
   - `STACK`: TypeScript + Next.js statički export, Tailwind, next/font, slike
     u AVIF i WebP u više širina sa eksplicitnim dimenzijama, Cloudflare Pages,
     `_headers` sa CSP, bez baze osim kad paket traži.
   - `TRADE_PLAYBOOK[trade]`: sekcije po redu i pitanje mušterije na koje
     svaka odgovara, kontakt akcije, tipične greške. Izvor su liste `needs` na
     trade stranicama u `src/i18n/me.ts`, ali pisano na engleskom za agenta.
   - `STYLE_DIRECTIONS[style]`: mapiranje opcija iz upitnika (`minimal, modern,
     elegant, dark, light, playful, corporate, not-sure`, vidi
     `src/lib/onboarding/schema.ts` pitanje `style`) na konkretan pravac:
     tipografija, paleta, kompozicija hera, ritam sekcija.
   - `ANTI_SLOP`: bez ljubičastih gradijenata, glassmorphisma, tri kartice u
     nizu, blobova, generičkog copyja, lažnih recenzija; snažna tipografija,
     asimetrija gdje ima smisla, fotografije preko cijele širine. Ako se
     skine brend, ne smije da liči na šablon.
   - `DONE`: Lighthouse iznad 90 na mobilnom, nula grešaka u konzoli,
     provjera na 390 i 1440, jedan h1, tap targeti 44px, lista otvorenih
     pitanja u handoveru.

3. **`server/admin/brief.ts`** dobija četiri sekcije iz playbooka: Stack &
   Delivery, Page Structure (po `project.trade`), Design System (po
   štikliranom stilu), Definition of Done. `server/admin/concept.ts` uvozi
   iste konstante da se ne raziđu.

4. **Automatsko generisanje na slanju upitnika.** U
   `functions/api/onboarding/submit.ts`, poslije `linkFilesToProject`, pozvati
   `generateBrief` i `addBrief` (mode `"full"`), pa u mejl (`renderBrief` u
   `server/onboarding/notify.ts`) dodati link "Otvori brief" i prompt kao
   `.md` prilog. Resend prima `attachments: [{ filename, content }]` sa base64
   sadržajem; `sendEmail` treba da propusti to polje. Brief se čuva prije
   slanja mejla, pa pad mejla ništa ne gubi.

5. **Provjere.** `scripts/workflow-check.mjs`: djelatnost se čuva, brief
   postoji na projektu odmah poslije slanja upitnika, brief sadrži sekcije za
   tu djelatnost. Plus `npm run lint`, `npm run typecheck`, `npm run build`,
   `npm run build:functions`, `node scripts/workflow-check.mjs --reset`.

Obim: jedna migracija, oko osam fajlova, oko 300 linija, jedan komit.

## Otvoreno, nezavisno od ovoga

- Cloudflare: Pages projekat se zove `vibelab` (ne može se preimenovati), a
  domeni `vibelab.it.com` i `www` su i dalje vezani za projekat iako 301
  radi sa zone. Odluka: skinuti ih sa Pages, zonu zadržati do isteka
  registracije kod Namecheapa.
- Admin panel za klijente (git-based CMS, Decap ili Keystatic) kao doplata
  od €80–100 na Biznis. Prvo pilot na jednom demo sajtu.
- Sekcija "ko stoji iza Vaky" i dva prava citata klijenata na početnoj.
