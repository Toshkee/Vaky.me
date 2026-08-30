# Research i Claude prompt — 4 nova outreach demo sajta

Datum provjere: 29. avgust 2026.  
Tržište: Crna Gora.  
Namjena: privatni, noindex VibeLab koncepti koji se šalju biznisima preko Instagram poruke.

## Brza preporuka

Redosljed kojim bih ih pravio i kontaktirao:

| Prioritet | Biznis | Stvarno stanje web prisustva | Najjači ugao ponude |
| --- | --- | --- | --- |
| 1 | Telo Pilates Club | Domen postoji, ali prikazuje generičnu GoDaddy “Launching Soon” stranicu; pravi booking je na Alteg.io | Najlakše je pokazati direktan prije/poslije efekat: njihov brend, programi i jedan jasan put do rezervacije |
| 2 | Dental Clinic Kovačević | Stari domen više nije samostalan sajt, već preusmjerava na Docta profil | Vratiti ordinaciji vlastiti kredibilan digitalni prostor za tim, usluge i dvije lokacije |
| 3 | Andrea Beauty House | Nije pronađen samostalan zvanični sajt; ponuda je rasuta između glavnog i dva dodatna Instagram profila | Organizovati široku ponudu kao jednu prepoznatljivu “beauty house” priču |
| 4 | Studio ljepote Mila / Dragana Mila | Ima aktivan WooCommerce sajt, ali homepage prvo djeluje kao prodavnica i slabo predstavlja studio, tretmane i edukacije | Ne nuditi “novi sajt od nule”, nego elegantan studio-facing ulaz koji zadržava postojeći shop |

Ovo nisu četiri verzije istog templatea. Svaki koncept mora imati sopstvenu strukturu stranice, tipografiju, ritam, oblik navigacije, kompoziciju hero sekcije i logiku animacija. Zajednički smiju biti samo provjerene tehničke osnove VibeLab repozitorijuma.

## Pravila tačnosti i privatnosti

- Brojevi pratilaca su trenutni research signal i brzo se mijenjaju. Ne prikazivati ih na demo sajtovima.
- Telefoni, puna ulična adresa, privatni/personalni profili i radno vrijeme ne smiju se objaviti na koncept stranici bez dokumentovane dozvole. Ovo je postojeće pravilo repozitorijuma u docs/deployment-security.md.
- Kada se zvanični Instagram, aktivni sajt i direktorijum ne slažu, ne birati nasumično jednu vrijednost. Na demou koristiti samo grad ili kvart i konflikt zadržati u internim podacima.
- Ne izmišljati recenzije, rezultate, cijene, statistike, sertifikate, godine rada, medicinske koristi, “najbolji”, “bezbolno”, “garantovano” ili slične tvrdnje.
- Ne koristiti fotografije pacijenata, before/after sadržaj ili prepoznatljiva lica bez dozvole.
- Sve udaljene fotografije preuzeti i optimizovati lokalno; nikada ih ne hotlinkovati u produkcijskom kodu. Izvor, datum pristupa i status prava sačuvati uz podatke.
- Javne marketing fotografije su kandidati za privatni prodajni koncept, ne automatska dozvola za finalni klijentski sajt. Prije pravog lansiranja tražiti originalne fajlove i pisanu saglasnost.

## 1. Studio ljepote Mila / Dragana Mila

### Provjerene javne informacije

- Instagram: https://www.instagram.com/studio_ljepote_mila/
- Trenutni naziv/opis profila: “Laser | Epilacija | Tretmani lica i tijela | Lash-brow lift | Podgorica”.
- Profil navodi City Kvart i rad od ponedjeljka do subote, ali se puna adresa ne slaže sa postojećim sajtom.
- Aktivni sajt: https://draganamila.me/
- Relevantne stranice:
  - O meni: https://draganamila.me/o-meni/
  - Edukacija: https://draganamila.me/edukacija/
  - Usluge: https://draganamila.me/usluge/
  - Shop: https://draganamila.me/shop/
- Postojeći sajt predstavlja Draganu Milu kao beauty/PMU umjetnicu, edukatora i vlasnicu profesionalnog shopa. Na njemu su objavljene tvrdnje o više od deset godina u beauty industriji, pet godina PMU specijalizacije i WULOP priznanjima. To su self-published tvrdnje: ne proširivati ih i prije finalne objave potvrditi tačan tekst.
- Instagram highlight signali: edukacije, epilacija, brow/lash lift, tretmani lica, laser, iskustva.
- Trenutni Instagram navodi Radoja Dakića 48, dok sajt navodi Radoja Dakića 46, Lamela 5/12. Zbog konflikta demo prikazuje samo “City Kvart, Podgorica”.
- Javni kontakt podaci pronađeni u researchu, ali se ne renderuju bez dozvole: +382 68 243 491, +382 68 415 631 i prodaja@draganamila.me.
- Sekundarni pravni izvor: https://www.companywall.me/firma/draganamila-doo/MMEaHZuD

### Stanje postojećeg sajta

Sajt radi i ne treba ga opisivati kao pokvaren. Problem je pozicioniranje: početna stranica je vizuelno i hijerarhijski shop-first, sa mnogo kategorija, banera i proizvoda. Studio, umjetnica, tretmani i edukacije dolaze kasnije i ne dobijaju jasan prodajni tok. Demo treba da pokaže novi “front door”, a ne da gradi drugi webshop.

### Koncept

- Uloga: premium editorial landing za studio, PMU rad i edukacije, sa postojećim shopom kao sekundarnim izlazom.
- Predloženi headline: “Preciznost koja ostaje prirodna.”
- Podnaslov: “Tretmani, permanent makeup i edukacije pod jednim potpisom.”
- Primarni CTA: “Pogledaj tretmane”.
- Kontakt CTA: “Piši studiju” i vodi na zvanični poslovni Instagram.
- Sekundarni CTA: “Posjeti shop” i vodi na postojeći shop.
- Redosljed sadržaja: editorial hero → tri ulaza u ponudu → potpis/artist story → tretmani → edukacije → shop bridge → City Kvart + Instagram CTA.
- Ne kopirati Soul Studio. Mila treba da bude oštrija, modnija i preciznija, ne tiha wellness/bež stranica.

### Vizuelni pravac

- Fontovi: Cormorant Garamond za display + Onest za interfejs i tekst.
- Paleta: carbon crna, porcelain bijela, prigušeni dusty rose, vrlo malo hladnog srebra.
- Kompozicija: asimetrični magazinski masthead, veliki tipografski rezovi, portrait/studio detalj kao jedan glavni kadar; bez mreže identičnih zaobljenih kartica.
- Potpis interakcije: kontrolisan line/stroke reveal inspirisan preciznom PMU linijom ili potpisom. Jednom se odigra, bez beskonačnog loopa.
- Bez pink gradienta, glassmorphism panela, sparkles ikonica i generičnih beauty blobova.

### Kandidati za materijal

- Logo: https://draganamila.me/wp-content/uploads/2025/04/dragana-mila.pdf-logo.png
- Portret: https://draganamila.me/wp-content/uploads/2025/04/Dragana.webp
- Potpis: https://draganamila.me/wp-content/uploads/2025/04/potpis.png
- Trenutni hero, samo kao referenca: https://draganamila.me/wp-content/uploads/2025/04/baner-crno-sve.jpg

Ovi fajlovi su sa njenog aktivnog zvaničnog sajta. Za koncept ih sačuvati lokalno, ne hotlinkovati, provjeriti crop na telefonu i upisati sourceUrl/sourceDate u data.ts.

## 2. Dental Clinic Kovačević

### Provjerene javne informacije

- Instagram: https://www.instagram.com/dental_clinic_kovacevic/
- Bio navodi dvije lokacije: Institut Dr Simo Milošević, Igalo i Zelenika, Herceg Novi.
- Bio navodi telefone 068/318114 i 069/885005 te officekovacevic@gmail.com. To su research podaci, ne sadržaj za demo bez dozvole.
- Stari domen stomatoloska-ordinacija-kovacevic.com sada preusmjerava na Docta:
  https://docta.me/clinics/dental-clinic-kovacevic
- Aktuelni Docta profil prikazuje tri stručnjaka:
  - Nikola Kovačević — oralna hirurgija
  - Sanja Kovačević-Ožegović — stomatologija
  - Krsto Kovačević — stomatologija
- Docta trenutno prikazuje adresu M2, Zelenika, Herceg Novi i radno vrijeme. Radno vrijeme je promjenjivo i ne treba ga kopirati u demo.
- Instagram highlight signali uključuju Lumineers, veneers, 3D i edukacije.
- Stariji profil iz 2019. navodi porodičnu privatnu praksu od 1989. i širi spektar usluga: parodontologija, oralna/periodontalna hirurgija, protetika, implantologija, estetska i opšta stomatologija, izbjeljivanje i dječja ortodoncija:
  https://travelmontenegro.me/listings/dental-clinic-kovacevic-herceg-novi-zelenika/
- Podaci iz 2019. su dobar istraživački trag, ali se prije javnog korišćenja moraju potvrditi sa ordinacijom. Ne koristiti “od 1989.” ni kompletnu listu opreme/usluga kao gotovu činjenicu bez potvrde.
- Docta ocjena i tekstovi recenzija su research signal, ne materijal za kopiranje. Demo ne prikazuje tuđe recenzije niti badge sa ocjenom.

### Stanje postojećeg web prisustva

Ordinacija nema svoj savremeni samostalni sajt na pronađenom starom domenu; korisnik završava na generičnom Docta profilu. Demo treba da pokaže koliko više povjerenja stvara vlastita, mirna i jasna prezentacija tima, stručnih oblasti i dvije lokacije.

### Koncept

- Uloga: klinički uredan, topao i autoritativan one-page sajt.
- Predloženi headline: “Tri doktora. Dvije lokacije. Jedan pažljiv pristup.”
- Podnaslov ne obećava ishod: “Stomatološka njega u Igalu i Zelenici, predstavljena jasno i bez suvišnih koraka.”
- Primarni CTA: “Pošalji upit” ka poslovnom Instagramu.
- Sekundarni CTA: “Upoznaj tim”.
- Redosljed sadržaja: trust masthead → stručne oblasti kao indeks → kako izgleda prvi korak → tri doktora → dvije lokacije → kontakt CTA.
- U demo kopiji koristiti samo široke, trenutno podržane kategorije: stomatologija, oralna hirurgija i estetski/protetski rad vidljiv kroz aktuelne javne profile. Detaljan spisak iz 2019. staviti u data.ts kao needsConfirmation, ne prikazivati po defaultu.
- Ne koristiti fotografije osmijeha iz stock biblioteke, makro snimke zuba, pacijente, before/after i medicinske garancije.

### Vizuelni pravac

- Fontovi: Source Serif 4 + Source Sans 3.
- Paleta: mineral white, duboka navy, steel siva i veoma odmjeren teal akcenat.
- Kompozicija: klinički editorial/report izgled, precizan grid, brojčani indeks usluga i horizontalni team register; skoro bez zaobljenih kartica.
- Potpis interakcije: tanka spiralna/diagnostic line animacija koja diskretno podsjeća na postojeći znak zuba/implantata. Animacija ne smije djelovati kao loading spinner.
- Bez generičnog plavog gradijenta, “healthy smile” stock hero fotografije, lebdećih 3D zuba i medicinskih ikonica iz UI kita.

### Kandidati za materijal

- Ulaz/logo fotografija: https://travelmontenegro.me/wp-content/uploads/2019/03/dental-kovacevic.jpg
- Enterijer: https://travelmontenegro.me/wp-content/uploads/2019/03/dental-klinik-kovacevic.jpg

Fotografije sa Travel Montenegro tretirati kao vizuelne reference čija prava nijesu potvrđena. Ako se koriste u privatnom noindex konceptu, preuzeti ih lokalno, upisati izvor i jasno označiti replaceBeforeProduction. Ne koristiti fotografije pacijenata.

## 3. Andrea Beauty House

### Provjerene javne informacije

- Instagram: https://www.instagram.com/andrea_beautyhouse/
- Aktuelni bio: Podgorica — New City; manikir, pedikir, frizerske usluge, pletenice i šminka.
- Glavni profil povezuje dva specijalizovana profila: @kids_beautyhouse i @braids_beautyhouse. To je važna razlika u odnosu na običan beauty salon.
- Highlight signali: hair, depilacija, pedikir, summer nails, afro pletenice, pletenice, spray tan i cjenovnik.
- Zvanični Instagram map link:
  https://maps.app.goo.gl/vefAEkpi48C3MDx49?g_st=ipc
  vodi na Google listing “Andrea Beauty House, Branka Deletića, zgrada KIPS gradnje, lamela H, Podgorica 81101”.
- Puna adresa se na demo stranici ne prikazuje bez dozvole; dovoljno je “New City, Podgorica”.
- Nije pronađen samostalan zvanični sajt.
- CompanyWall navodi ANDREA BEAUTY HOUSE DOO, Branka Deletića bb, broj 068/095-535 i beautyhouseandreaa@gmail.com:
  https://www.companywall.me/firma/andrea-beauty-house-doo/MMEjbfKC
- Drugi direktorijumi navode različit telefon i različito nedjeljno radno vrijeme. Zato demo ne prikazuje ni telefon ni radno vrijeme dok ih vlasnica ne potvrdi.
- Podgorica Directory profil i galerija:
  https://www.podgoricadirectory.com/health-beauty/beauty-salons/andrea-beauty-house

### Šta se vidi iz javnih fotografija

- Odrasli salon ima bijelu/crnu/pink/gold paletu, lučna ogledala, nail wall i upečatljivu pink telefonsku govornicu sa natpisom Andrea Beauty House.
- Kids prostor je namjerno mnogo življi: bajkoviti/pink enterijer, mali vanity stolovi, plišani detalji i prostor za okupljanje.
- To daje autentičnu ideju za “house/rooms” web koncept. Ne treba salon svesti na još jedan roze beauty template.

### Koncept

- Uloga: digitalna kuća koja pod jednim krovom jasno razdvaja adult beauty, braids i kids experience.
- Predloženi headline: “Jedna kuća. Mnogo načina da budeš svoja.”
- Alternativni, direktniji headline: “Kosa, nokti i pletenice — sve pod jednim krovom.”
- Podnaslov: “Beauty usluge za odrasle i poseban svijet za najmlađe u New Cityju.”
- Primarni CTA: “Piši na Instagramu”.
- Sekundarni CTA: “Istraži sobe”.
- Redosljed sadržaja: doorway hero → tri “sobe”/ponude → adult service strip → kids prostor → braids feature → enterijer gallery → New City + Instagram CTA.
- Kids dio može biti razigraniji, ali ne dječji kič na cijeloj stranici. Adult dio ostaje rafiniran.
- Ne objavljivati cjenovnik jer se cijene mijenjaju. Ne izmišljati pakete, trajanje ili party usluge koje nijesu eksplicitno potvrđene.

### Vizuelni pravac

- Fontovi: Fraunces + Work Sans.
- Paleta: powder blush, berry, warm white, dark ink i mali gold detalj.
- Kompozicija: arhitektonska “house tour” priča, vertikalni pragovi/okviri vrata, velika polja fotografije i room labels. Ne bento grid sa deset istih kartica.
- Potpis interakcije: door-frame linije koje se otvaraju dok sekcija ulazi u viewport; eventualno jedna suptilna telefonska “ring” mikrointerakcija samo na CTA, bez zvuka.
- Bez generičnih sparkles, rozih gradijenata, lebdećih kugli, glass kartica i copy-paste nail salona.

### Kandidati za materijal

Galerija sa javnog listinga; pregledom su kadrovi 1, 3, 4, 5, 6, 7, 9 i 10 bolji kandidati jer ne ističu prepoznatljiva lica:

- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588002/directory/podgorica/andrea-beauty-house-1.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588006/directory/podgorica/andrea-beauty-house-3.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588007/directory/podgorica/andrea-beauty-house-4.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588008/directory/podgorica/andrea-beauty-house-5.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588009/directory/podgorica/andrea-beauty-house-6.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588010/directory/podgorica/andrea-beauty-house-7.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588012/directory/podgorica/andrea-beauty-house-9.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588013/directory/podgorica/andrea-beauty-house-10.jpg

Ne pretpostavljati licencu. Za privatni koncept eventualno ih sačuvati lokalno uz sourceUrl/sourceDate/replaceBeforeProduction, a za pravi sajt zatražiti originale. Svaki kadar ponovo pregledati u punoj rezoluciji prije korišćenja.

## 4. Telo Pilates Club

### Provjerene javne informacije

- Instagram: https://www.instagram.com/telopilates.me/
- Bio: “Telo Pilates Club | Podgorica”, reformer pilates, Polestar metodologija i sertifikacija.
- Aktivni domen: https://telopilates.me/
- Trenutno stanje domena: generična GoDaddy “Launching Soon” stranica na engleskom, sa nepovezanom fotografijom noćnog pejzaža, kontakt formom, cookie popupom i GoDaddy Airo brandingom. Sajt ne objašnjava studio, programe, lokaciju ni način rezervacije.
- Zvanični booking link iz Instagram profila:
  https://n1396627.alteg.io/
- Booking sistem javno navodi:
  - naziv “telo pilates club”
  - kategorije: reformer group, reformer split/duo, reformer personal, stretching i healthy spine
  - jezike pojedinih termina: crnogorski/MNE, engleski i ruski
  - studio u Podgorici, zona Vektra/Bulevar Revolucije
  - broj +382 69 310 613; ne prikazivati ga na demou bez dozvole
  - instruktorke Amina i Karina kao trenutno aktivne; Karina je na booking profilu označena kao Polestar certified
  - personal class opisuje reformer, tower, chair, spine corrector i mat opremu
- Javni booking trenutno sadrži cijene, kapacitete i rasporede, ali se oni mijenjaju i na pojedinim stavkama nijesu dosljedno opisani. Statički demo ih ne kopira. CTA uvijek vodi na živi booking sistem.
- Instagram self-claim “prvi pravi reformer pilates studio u Podgorici” ne koristiti kao objektivnu činjenicu bez nezavisne potvrde.
- Sekundarni listing: https://www.premiumklub.me/partner/telo-pilates-club

### Koncept

- Uloga: pravi branded landing na njihovom postojećem domenu, sa direktnim putem do živog booking sistema.
- Predloženi headline: “kontrola. snaga. pokret.”
- Alternativa koja prati wordmark: “telo u pokretu.”
- Podnaslov: “Reformer, individualni i grupni formati u Podgorici — rezervacija bez suvišnih koraka.”
- Primarni CTA: “Rezerviši čas” i vodi direktno na https://n1396627.alteg.io/
- Sekundarni CTA: “Izaberi format”.
- Redosljed sadržaja: kinetic type hero → izbor formata → metod i oprema → šta očekivati na prvom času → MNE/EN/RU strip → location cue “Vektra, Podgorica” → veliki booking handoff.
- Ne praviti statički cjenovnik ni lažni raspored. Booking sistem ostaje jedini source of truth.
- Ne kopirati Soul Studio: ovo nije zemljani, spor i meditativan wellness dizajn, već grafički precizan osjećaj kontrolisanog pokreta.

### Vizuelni pravac

- Fontovi: Libre Caslon Display + Albert Sans.
- Paleta: butter/lemon iz postojećeg znaka, ink crna i chalk/off-white.
- Kompozicija: tipografski movement score, široki razmaci, jedna jasna linearna ilustracija reformera ili apstraktna putanja carriage pokreta; fotografija nije obavezna.
- Potpis interakcije: scroll-driven linija/luk koji pokazuje opseg kontrolisanog pokreta. Bez parallaxa, autoplay karusela i beskonačnih bounce animacija.
- Bez beige yoga templatea, listića, zen kamenja, stock fotografije osobe u zalasku sunca i generičnih pilates kartica.

### Kandidat za materijal

- Zvanični booking logo/wordmark:
  https://assets.alteg.io/general/1/10/1040e2a03457453_20260325032444.jpeg

Sačuvati lokalno i koristiti kao referencu za tipografiju/paletu. Ako kvalitet nije dovoljan, napraviti čisti tekstualni wordmark u HTML/CSS-u za koncept; ne pokušavati da “rekreiraš” logo kao novi zaštićeni znak.

## Kako se nova četiri koncepta razlikuju od postojeća četiri

Postojeće neobjavljene demo stranice koje se prvo moraju pregledati:

- src/app/(me)/demo/soul-studio/ — Bodoni Moda + Manrope, clay/sand, tih wellness ritam.
- src/app/(me)/demo/kraftart/ — Archivo + IBM Plex Mono, atelier/brutalist paper/ink/oxide.
- src/app/(me)/demo/lavlav/ — Tenor Sans + Plus Jakarta Sans, cream/red, nail editorial i ručni scroll-snap gallery.

Nova matrica:

| Koncept | Osnovna metafora | Hero | Glavni ritam | Potpis animacije | Ne smije ličiti na |
| --- | --- | --- | --- | --- | --- |
| Mila | urednički potpis / precizna linija | asimetrični fashion masthead | veliki tipografski rezovi i fokusiran portrait | jedan PMU/signature stroke | Soul wellness |
| Dental | klinički izvještaj / service index | miran trust statement + precizan grid | numerisane oblasti, team register | spiralna diagnostic linija | generičan medicinski template |
| Andrea | kuća i sobe | doorway/frame kompozicija | prelazak adult → kids → braids | otvaranje frame/door linija | LavLav nail layout ili generičan pink salon |
| Telo | movement score / carriage putanja | tipografija + line-art | kratki, energični moduli sa mnogo vazduha | linearni opseg pokreta | Soul Studio ili beige yoga template |

Dozvoljeno je preuzeti tehnička rješenja iz postojećih demo stranica: VibeLabBar, lokalni responsive image pipeline, MapEmbed samo kad je dozvoljen, ContactIcons, accessibility obrasce, reduced-motion zaštitu, mobile safe-area CTA i Umami event naming. Nije dozvoljeno kopirati sekciju po sekciju, isti CSS shell, isti card component, istu navigaciju ili samo zamijeniti palette/token vrijednosti.

---

# COPY-PASTE PROMPT ZA CLAUDE

BEGIN CLAUDE PROMPT

You are working directly inside this repository:

C:/Users/tosii/vibecode.me

Your mission is to design and implement four polished, production-quality, unlisted outreach concept pages:

1. /demo/telo-pilates/
2. /demo/dental-clinic-kovacevic/
3. /demo/andrea-beauty-house/
4. /demo/studio-ljepote-mila/

Complete all four pages and verify them. These are simple one-page concepts, not large applications. They must feel custom, art-directed and credible enough to become real client projects. They must not look like four color variants of one AI-generated template.

## Start here — mandatory repository audit

Before editing:

1. Run git status --short and preserve every existing user change.
2. Read AGENTS.md completely.
3. This repository uses Next.js 16.3.3 and its APIs may differ from your training data. Search node_modules/next/dist/docs/ for the current local guides relevant to App Router pages, static export, metadata, next/font and images, then read the complete relevant files before writing code. Do not rely on remembered Next.js APIs.
4. Inspect package.json, next.config.*, the root layouts and existing demo infrastructure.
5. Read these demos completely, including data files and CSS modules:
   - src/app/(me)/demo/soul-studio/
   - src/app/(me)/demo/kraftart/
   - src/app/(me)/demo/lavlav/
6. Inspect and reuse the contracts of:
   - src/components/demo/VibeLabBar.tsx
   - src/components/demo/DemoPhoto.tsx
   - src/components/demo/MapEmbed.tsx
   - src/components/demo/ContactIcons.tsx
   - scripts/demo-photos.mjs
   - scripts/mobile-check.mjs
   - scripts/a11y-check.mjs
   - scripts/security-check.mjs
   - scripts/visual-shots.mjs
   - scripts/generate-demo-og.mjs
7. Read section 7 of docs/deployment-security.md before adding any contact or location data.

Do not commit or deploy. Do not add pages to the public portfolio, homepage, navigation or sitemap. These routes must stay unlisted and noindex.

## Repository and implementation constraints

- Next.js 16.3.3, React 19.2.8, Tailwind 4.
- The site is a static export with trailing slashes and unoptimized Next images. Confirm exact config rather than assuming it.
- Make each page a Server Component by default. Add a tiny Client Component only if an interaction genuinely requires runtime JavaScript.
- Do not install Framer Motion, a UI kit, icon pack or any new dependency.
- Prefer semantic HTML and route-scoped CSS Modules for art direction and animation.
- All fonts must use next/font/google, display: “swap”, CSS variables and a Latin Extended subset that correctly renders č, ć, š, ž and đ.
- Public-facing copy must be polished Montenegrin, concise and grammatically correct. Do not leave English template copy, lorem ipsum, raw booking labels or the typo “tjelo”; use “tijelo”.
- VibeLabBar must be the first rendered page element and must clearly label each page as a design concept.
- Use the existing DemoPhoto conventions: local AVIF/WebP/JPG variants, explicit intrinsic dimensions, accurate sizes and only one priority image per page.
- No runtime hotlinks to Instagram, Cloudinary, WordPress, Alteg.io assets or any other image host.
- No autoplay video, autoplay carousel, WebGL, heavy canvas effects, scroll hijacking or large client-side bundle.
- All external target=_blank links require rel=noopener noreferrer.
- CTA elements need the existing Umami event convention after you inspect how it is implemented in the repo.
- Interactive targets must be at least 44px high, visible keyboard focus must be preserved and the mobile sticky CTA must respect safe-area insets.
- Every decorative animation must have a stable finished state and be disabled/reduced under prefers-reduced-motion.
- If you use scroll-driven CSS, wrap it in progressive enhancement with @supports (animation-timeline: view()). The page must remain complete without it.
- No fake forms. Prefer direct, honest outbound CTAs.
- Do not weaken CSP or add remote runtime origins.

## Truth, privacy and asset rules

The research below includes public contact data so that you understand the businesses. Do not render a phone number, exact street address, personal profile or volatile opening hours without documented permission in docs/deployment-security.md. Use only these generalized locations:

- Mila: City Kvart, Podgorica
- Dental: Igalo and Zelenika, Herceg Novi
- Andrea: New City, Podgorica
- Telo: Vektra, Podgorica

The official business Instagram pages and the official Telo booking URL may be outbound CTAs. Mila’s existing official shop may be a secondary outbound CTA. Do not embed a map by default.

Never invent or copy:

- reviews or rating badges;
- prices, schedules or capacity;
- awards/certificates not already stated by the business;
- before/after results;
- medical promises or claims such as painless, guaranteed or best;
- years in business unless explicitly marked below as approved current content;
- biographies, job titles or team members beyond the cited public record;
- identifiable client or patient photos.

Any source claim that is old, conflicting or marked needsConfirmation stays in data.ts as research metadata and must not appear in visible copy.

For every downloaded asset:

1. Visually inspect the full-resolution source.
2. Do not use an image with a recognizable customer/patient face.
3. Save it under public/demo/<slug>/ with a descriptive filename.
4. Generate the existing 480/768/1200 AVIF and WebP variants via the repo script.
5. Store sourceUrl, sourceDate: “2026-08-29”, rightsStatus and replaceBeforeProduction in data.ts.
6. Never pretend that a public URL grants production reuse rights.

## Shared definition of quality

These pages may share plumbing, but must not share a design shell.

Across the four pages, deliberately vary all of the following:

- hero composition;
- navigation treatment;
- section order;
- content density;
- image ratio and gallery behavior;
- button geometry;
- border radius system;
- grid rhythm;
- motion grammar;
- mobile composition;
- closing CTA treatment.

Do a final side-by-side design audit. If two pages could become one another by changing copy, fonts and colors, redesign one of them.

Avoid the common “AI website” signatures: repeated rounded cards, centered eyebrow/headline/subheadline/CTA in every section, purple or pink gradients, glassmorphism, glow blobs, random sparkles, excessive pill labels, bento grids without content logic, stock icon rows, invented metrics and animation on everything.

Subtle motion means one or two signature ideas per page, purposeful hover/focus states and clean section reveals. Motion must support the business metaphor.

## Build 1 — Telo Pilates Club

Route:

src/app/(me)/demo/telo-pilates/

Required local files:

- page.tsx
- data.ts
- telo.module.css

Business sources:

- Instagram: https://www.instagram.com/telopilates.me/
- Current domain: https://telopilates.me/
- Official booking: https://n1396627.alteg.io/
- Official booking wordmark candidate: https://assets.alteg.io/general/1/10/1040e2a03457453_20260325032444.jpeg

Verified/current public facts:

- Telo Pilates Club, Podgorica.
- Reformer-focused studio.
- The business states that it follows Polestar methodology/certification.
- Current booking categories: reformer group, split/duo, personal, stretching and healthy spine.
- Current booking supports classes labeled MNE, English and Russian.
- Generalized location for demo: Vektra, Podgorica.
- Active booking instructors include Amina and Karina; the booking profile labels Karina as Polestar certified. Do not build a staff section unless the names and permission are confirmed.
- Current official domain is only a generic GoDaddy “Launching Soon” placeholder. Never mention or mock that fact on the page itself.

Do not display current prices, class capacity, current schedule, phone number or exact address. The booking platform is the source of truth.

Design direction:

- Concept metaphor: movement score / reformer carriage path.
- Font pair: Libre Caslon Display + Albert Sans.
- Palette: butter/lemon, ink black, chalk/off-white.
- Hero: bold lowercase typography plus restrained line-art or a CSS/SVG carriage path; no stock hero is required.
- Suggested H1: “kontrola. snaga. pokret.”
- Optional alternate lockup: “telo u pokretu.”
- Supporting copy: “Reformer, individualni i grupni formati u Podgorici — rezervacija bez suvišnih koraka.”
- Primary CTA: “Rezerviši čas” → https://n1396627.alteg.io/
- Secondary CTA: “Izaberi format” → internal anchor.
- Section sequence: hero → formats → method/equipment → first-visit expectations → MNE/EN/RU language strip → Vektra location cue → large booking handoff.
- Use service labels only; no fake class descriptions. A safe format set is:
  - Grupni reformer
  - Split / duo
  - Individualni rad
  - Stretching
  - Healthy spine
- Equipment may be named only in a compact methodology note because the official personal-class description lists reformer, tower, chair, spine corrector and mat.
- Signature motion: a single line/arc advances like a controlled reformer carriage range. It must not become a spinner, loader or decorative scribble.
- This must not resemble Soul Studio. No clay/beige wellness mood, no Bodoni, no meditation language, no leaf/zen imagery.

If the source wordmark is too low-resolution, use it as a visual reference and render an honest text wordmark. Do not invent a replacement logo.

## Build 2 — Dental Clinic Kovačević

Route:

src/app/(me)/demo/dental-clinic-kovacevic/

Required local files:

- page.tsx
- data.ts
- dental.module.css

Business sources:

- Instagram: https://www.instagram.com/dental_clinic_kovacevic/
- Current Docta profile: https://docta.me/clinics/dental-clinic-kovacevic
- Older 2019 profile: https://travelmontenegro.me/listings/dental-clinic-kovacevic-herceg-novi-zelenika/
- Candidate exterior: https://travelmontenegro.me/wp-content/uploads/2019/03/dental-kovacevic.jpg
- Candidate interior: https://travelmontenegro.me/wp-content/uploads/2019/03/dental-klinik-kovacevic.jpg

Verified/current facts:

- Two locations: Igalo and Zelenika, Herceg Novi.
- Current Docta profile lists three professionals:
  - Nikola Kovačević — oral surgery
  - Sanja Kovačević-Ožegović — dentistry
  - Krsto Kovačević — dentistry
- Current Instagram themes include Lumineers, veneers, 3D and education.
- The old independent domain currently redirects to Docta. Do not mention this criticism on the page.

Needs confirmation and is internal only:

- practice founded in 1989;
- the full service list from the 2019 Travel Montenegro page;
- old technology/equipment claims;
- detailed older doctor specializations;
- hours, exact addresses, phones and review counts.

Design direction:

- Concept metaphor: calm clinical report / indexed care.
- Font pair: Source Serif 4 + Source Sans 3.
- Palette: mineral white, deep navy, steel gray and a restrained teal accent.
- Suggested H1: “Tri doktora. Dvije lokacije. Jedan pažljiv pristup.”
- Supporting copy: “Stomatološka njega u Igalu i Zelenici, predstavljena jasno i bez suvišnih koraka.”
- Primary CTA: “Pošalji upit” → official business Instagram.
- Secondary CTA: “Upoznaj tim” → internal anchor.
- Section sequence: trust masthead → numbered expertise index → simple first-step/process strip → team register → two-location presentation → final contact CTA.
- Use only broad currently supported service language in visible copy: stomatologija, oralna hirurgija and a carefully worded aesthetic/prosthetic area supported by current veneers/Lumineers signals. Keep detailed 2019 services as needsConfirmation.
- Team cards must be restrained profile rows/register entries, not fake biographies. Do not add portraits unless current, rights-cleared official portraits are found and visually verified.
- Signature motion: thin diagnostic/spiral line inspired by the existing tooth/implant mark. It should draw once and settle.
- Avoid blue gradients, smiling stock models, giant tooth renders, blob cards, medical icon packs and outcome promises.
- The page should feel humane, precise and locally established without claiming longevity that has not been reconfirmed.

The Travel Montenegro images are reference assets with unconfirmed rights. If you use them in this private noindex concept, localize them, mark replaceBeforeProduction: true and never use patient imagery.

## Build 3 — Andrea Beauty House

Route:

src/app/(me)/demo/andrea-beauty-house/

Required local files:

- page.tsx
- data.ts
- andrea.module.css

Business sources:

- Instagram: https://www.instagram.com/andrea_beautyhouse/
- Instagram map link: https://maps.app.goo.gl/vefAEkpi48C3MDx49?g_st=ipc
- Public business listing/gallery: https://www.podgoricadirectory.com/health-beauty/beauty-salons/andrea-beauty-house
- Secondary legal listing: https://www.companywall.me/firma/andrea-beauty-house-doo/MMEjbfKC

Verified/current public facts:

- New City, Podgorica.
- Manicure, pedicure, hair services, braids and makeup.
- Current highlights also signal depilation and spray tan.
- Main Instagram links to @kids_beautyhouse and @braids_beautyhouse.
- Public interior images show an adult salon with arched mirrors, black/white/pink/gold details, a nail wall and a distinctive pink Andrea phone booth.
- Public images show a deliberately separate, colorful kids beauty environment.
- No independent official website was found.

Do not display a phone number, exact address, opening hours, prices or company/legal data. Public directories conflict on phone and Sunday hours. Do not invent party packages or claim services that are not confirmed.

Design direction:

- Concept metaphor: a beauty house with distinct rooms.
- Font pair: Fraunces + Work Sans.
- Palette: powder blush, berry, warm white, dark ink and a small gold accent.
- Suggested H1: “Jedna kuća. Mnogo načina da budeš svoja.”
- Supporting copy: “Beauty usluge za odrasle i poseban svijet za najmlađe u New Cityju.”
- Primary CTA: “Piši na Instagramu” → official business Instagram.
- Secondary CTA: “Istraži sobe” → internal anchor.
- Section sequence: doorway hero → three room choices → adult service strip → kids-space feature → braids feature → interior gallery → New City + Instagram close.
- The three rooms are:
  - Salon: hair, manicure, pedicure, makeup
  - Braids: braids and afro-braids
  - Kids: a separate experience for younger visitors
- Phrase the Kids section conservatively. The public imagery supports a dedicated space; it does not automatically prove every possible party/package claim.
- Make the adult section refined and the kids section more playful without turning the entire site into a children’s template.
- Signature motion: vertical doorway/frame lines reveal each room. A tiny visual “ring” response on the contact CTA is acceptable, but there is no sound and no looping shake.
- Do not reuse LavLav’s page structure, cream/red palette, gallery behavior or nail-editorial composition.
- Avoid generic pink gradients, sparkles, glass cards, beauty icon grids and ten identical service cards.

Candidate gallery assets:

- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588002/directory/podgorica/andrea-beauty-house-1.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588006/directory/podgorica/andrea-beauty-house-3.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588007/directory/podgorica/andrea-beauty-house-4.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588008/directory/podgorica/andrea-beauty-house-5.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588009/directory/podgorica/andrea-beauty-house-6.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588010/directory/podgorica/andrea-beauty-house-7.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588012/directory/podgorica/andrea-beauty-house-9.jpg
- https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v1781588013/directory/podgorica/andrea-beauty-house-10.jpg

Inspect every full-size file again. Do not use any frame with a recognizable visitor/customer. Rights are not confirmed; mark all listing images replaceBeforeProduction: true and request original business-owned assets before a real launch.

## Build 4 — Studio ljepote Mila / Dragana Mila

Route:

src/app/(me)/demo/studio-ljepote-mila/

Required local files:

- page.tsx
- data.ts
- mila.module.css

Business sources:

- Studio Instagram: https://www.instagram.com/studio_ljepote_mila/
- Existing official website: https://draganamila.me/
- About: https://draganamila.me/o-meni/
- Education: https://draganamila.me/edukacija/
- Services: https://draganamila.me/usluge/
- Shop: https://draganamila.me/shop/
- Logo candidate: https://draganamila.me/wp-content/uploads/2025/04/dragana-mila.pdf-logo.png
- Portrait candidate: https://draganamila.me/wp-content/uploads/2025/04/Dragana.webp
- Signature candidate: https://draganamila.me/wp-content/uploads/2025/04/potpis.png

Verified/current public facts:

- Studio in City Kvart, Podgorica.
- Instagram currently presents laser/epilation, face and body treatments, lash/brow lift.
- Existing official site presents Dragana Mila as a PMU artist/educator and operates a professional beauty/PMU shop.
- Existing official pages cover services, education, an about story and ecommerce.
- The exact street number conflicts between current Instagram and the website; display only City Kvart.

Current self-published claims that require exact wording and should be omitted unless needed:

- more than ten years in the beauty industry;
- five years specialized in PMU;
- WULOP World 2023 bronze;
- WULOP Ex-Yu Balkan Countries 2023 first place.

Do not turn the concept into another ecommerce homepage. Its strategic purpose is to become the elegant studio-facing front door, with the current shop preserved as a secondary destination.

Design direction:

- Concept metaphor: editorial signature / precise beauty line.
- Font pair: Cormorant Garamond + Onest.
- Palette: carbon, porcelain, dusty rose and a very restrained cool-silver detail.
- Suggested H1: “Preciznost koja ostaje prirodna.”
- Supporting copy: “Tretmani, permanent makeup i edukacije pod jednim potpisom.”
- Primary CTA: “Pogledaj tretmane” → internal anchor.
- Contact CTA: “Piši studiju” → official studio Instagram.
- Secondary external CTA: “Posjeti shop” → https://draganamila.me/shop/
- Section sequence: asymmetric editorial hero → three offer entrances → artist/signature story → treatment editorial → education feature → shop bridge → City Kvart and Instagram close.
- Safe visible categories:
  - Epilacija / laser
  - Tretmani lica i tijela
  - Lash & brow lift
  - Permanent makeup
  - Edukacije
  - Profesionalni shop
- Do not promise permanent results, medical outcomes or pain-free treatment.
- Signature motion: one fine line/stroke reveal based on PMU precision or the official signature asset. It plays once and settles.
- This must not resemble Soul Studio. Avoid tranquil beige wellness styling, generic pink beauty cards and product-grid dominance.

Use official website assets locally, with provenance. The current composite hero can be inspected for brand context, but do not automatically reuse it as the new hero if the portrait/signature composition is stronger.

## Metadata and route behavior

Each route needs route-level Metadata following the current Next 16 local documentation and repo conventions:

- descriptive title ending in “| Dizajn koncept”;
- honest description in Montenegrin;
- robots index: false and follow: false;
- route-specific Open Graph image:
  - /og-demo-telo-pilates.png
  - /og-demo-dental-clinic-kovacevic.png
  - /og-demo-andrea-beauty-house.png
  - /og-demo-studio-ljepote-mila.png

Inspect the current demo metadata pattern and follow it. Update scripts/generate-demo-og.mjs with four visually distinct concept cards. Each OG card must explicitly say “DIZAJN KONCEPT” so nobody mistakes it for an official business page.

Do not add these routes to sitemap generation or VibeLab’s public Work/portfolio list.

## Required script coverage

Add all four routes to the existing target arrays in:

- scripts/mobile-check.mjs
- scripts/a11y-check.mjs
- scripts/security-check.mjs
- scripts/visual-shots.mjs

If generate-demo-og.mjs is the current source of outreach OG images, extend it rather than hand-editing binary output. Generate the four OG files.

Do not remove existing routes or weaken existing assertions to make tests pass.

## Implementation workflow

Build in this order:

1. Telo
2. Dental
3. Andrea
4. Mila

For each page:

1. Create typed, auditable data.ts content before JSX. Separate visible content from research-only/needsConfirmation fields.
2. Select the minimum useful asset set. A strong page with one or two legitimate images is better than a gallery of questionable assets.
3. Implement semantic page structure and custom route CSS.
4. Verify the page at 390px, 768px and 1440px before moving on.
5. Check keyboard navigation and reduced motion.
6. Confirm there are no console errors, failed images, overflow or bare external new-tab links.

After all four are built, inspect screenshots side by side and perform the uniqueness audit. Specifically reject:

- the same hero template with different text;
- the same three-card services row;
- the same centered section headings;
- the same mobile sticky shell if the business does not need it;
- the same border radius and button silhouette across all four;
- the same fade-up animation on every element;
- a design that copies Soul Studio, KraftArt or LavLav too closely.

Shared code is appropriate for accessibility and infrastructure only. Do not prematurely create a generic FourBusinessHero, ServiceCards or reusable visual shell.

## Verification

Run:

1. npm run lint
2. npx tsc --noEmit
3. npm run build

Then run the local app in a separate terminal and execute:

4. npm run check:mobile
5. npm run check:a11y -- http://localhost:3000
6. npm run test:security -- http://localhost:3000
7. npm run shots:visual -- <a temporary screenshots directory> http://localhost:3000

Note: mobile-check.mjs currently uses http://localhost:3000 directly, so the dev server must already be running.

Manually inspect all four pages at:

- 390 × 844
- 768 × 1024
- 1440 × 900

Also check:

- Chromium and WebKit;
- keyboard-only navigation;
- prefers-reduced-motion;
- zoom/text reflow;
- no horizontal overflow;
- touch targets;
- sticky CTA not covering content;
- accurate alt text;
- only one priority image;
- no third-party image requests at runtime;
- no CSP console violations;
- every outbound link destination;
- no index/follow metadata;
- Croatian/Montenegrin diacritics in every selected font.

Fix failures rather than documenting them away. Do not modify unrelated code.

## Definition of done

The task is complete only when:

- all four routes build in the static export;
- each has its own data.ts, page.tsx and route CSS module;
- each has a visually distinct OG card;
- all four are covered by mobile, accessibility, security and visual scripts;
- no concept is in the public portfolio or sitemap;
- visible claims are traceable to the sources above;
- no protected contact detail or conflicting fact is rendered;
- no remote images are hotlinked;
- automated checks pass;
- screenshot comparison confirms that the four pages are structurally and visually distinct.

At the end, report:

1. every file changed;
2. the four local URLs;
3. the exact tests and their results;
4. any source asset that still needs client permission/replacement;
5. any fact intentionally omitted because it was conflicting or unverified;
6. a two-sentence explanation of how each design differs from the other three and from the previous four VibeLab demos.

Do not stop after planning or scaffolding. Implement, inspect, test and polish all four.

END CLAUDE PROMPT

## Izvori

- Studio ljepote Mila Instagram: https://www.instagram.com/studio_ljepote_mila/
- Dragana Mila zvanični sajt: https://draganamila.me/
- Dental Clinic Kovačević Instagram: https://www.instagram.com/dental_clinic_kovacevic/
- Dental Clinic Kovačević na Docta: https://docta.me/clinics/dental-clinic-kovacevic
- Travel Montenegro dental profil: https://travelmontenegro.me/listings/dental-clinic-kovacevic-herceg-novi-zelenika/
- Andrea Beauty House Instagram: https://www.instagram.com/andrea_beautyhouse/
- Andrea Beauty House Podgorica Directory: https://www.podgoricadirectory.com/health-beauty/beauty-salons/andrea-beauty-house
- Telo Pilates Club Instagram: https://www.instagram.com/telopilates.me/
- Telo postojeći domen: https://telopilates.me/
- Telo zvanični booking: https://n1396627.alteg.io/

