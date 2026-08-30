# Research i Claude prompt — 4 nova mobile-first demo sajta

Datum provjere: 30. avgust 2026.  
Tržište: Podgorica, Crna Gora.  
Namjena: privatni, `noindex` VibeLab koncepti koji se šalju biznisima kroz Instagram outreach.

## Najvažniji zaključak

Ovo nijesu četiri ista biznisa i ne treba im napraviti četiri varijante istog templatea.

| Biznis | Stvarno web stanje | Šta demo treba da proda |
| --- | --- | --- |
| Studio ljepote i zdravlja | Samostalan zvanični sajt nije pronađen | Mirnu, stručnu prezentaciju tretmana i mnogo jasniji put do upita |
| Studio Pilates by Maja | Samostalan zvanični sajt nije pronađen; informacije su na Instagramu i direktorijumima | Energičan identitet studija, razliku između grupnog i personalnog rada i jednostavnu prijavu |
| Skyline Tattoo Studio | Samostalan zvanični sajt nije pronađen | Portfolio koji nosi atmosferu studija i pretvara ideju posjetioca u konkretan upit |
| Maluni Shop Podgorica / Tattoo Shop Podgorica | Već ima aktivan Shopify webshop na `malunitrey.com` | Redizajn ulazne stranice i jasnije povezivanje nakita, kategorija, dostave i stručne podrške — ne drugi webshop |

Sličnost sa prva četiri VibeLab demoa treba da bude u nivou zanatske obrade: svaki demo ima sopstveni vizuelni sistem, lokalne fotografije, jasnu priču, odličan mobilni ritam i promišljene mikroanimacije. Ne treba kopirati njihove rasporede, boje, fontove ili sekcije.

## Pravila tačnosti, privatnosti i materijala

- Broj pratilaca je samo trenutni research signal. Ne prikazivati ga na demo sajtovima.
- Ne objavljivati telefone, pune adrese, privatne/personalne profile, e-mailove ili promjenljivo radno vrijeme bez dokumentovane dozvole. To prati postojeće pravilo u `docs/deployment-security.md`.
- Kada se Instagram, aktivni sajt i direktorijum ne slažu, demo koristi samo širi i bezbjedan podatak, npr. „Podgorica” ili „Zabjelo, Podgorica”.
- Ne izmišljati cijene, recenzije, rezultate, sertifikate, godine iskustva, kapacitete, termine ili statistike.
- Paket VibeLab od 200 € može da uključi cjenovnik ili meni. Međutim, dok biznis ne potvrdi aktuelne stavke i cijene, demo smije imati pripremljen data model/komponentu, ali ne i izmišljene ili zastarjele cijene.
- Ne obećavati medicinske ili estetske rezultate. Izbjegavati izraze „garantovano”, „bezbolno”, „najbolji”, „uklanja problem” i slične tvrdnje.
- Ne koristiti prepoznatljiva lica, tijela klijenata, prije/poslije materijal ili osjetljive tattoo/piercing fotografije bez dozvole.
- Instagram i webshop fotografije su kandidati za privatni prodajni koncept, ne automatska dozvola za finalni klijentski sajt. Za produkciju tražiti originale i pisanu saglasnost.
- Sve odabrane udaljene fotografije sačuvati i optimizovati lokalno. Ne hotlinkovati. Uz svaki fajl čuvati `sourceUrl`, datum pristupa i `replaceBeforeProduction` status.

## 1. Studio ljepote i zdravlja

### Provjerene javne informacije

- Instagram: https://www.instagram.com/studio.ljepote.zdravlja/
- Javni naziv profila: „Jelena Stjepcevic | Podgorica”.
- Bio navodi: čišćenje lica, anti-age tretmane lica, masaže, anticelulit programe, lash lift i brow lift.
- Profil lokaciju opisuje kao Zabjelo, Podgorica.
- Highlight signali: Anti age, Čišćenje lica, Usluge, Anticelulit, Lokacija, Obrve/trepavice, Šminkanje, Lifting i Masaže.
- Aktuelni feed dodatno pokazuje INDIBA sadržaj, anti-akne njegu, collagen masku i tretmane prilagođene koži.
- Primjer aktuelnog posta: https://www.instagram.com/studio.ljepote.zdravlja/p/DcgoVMDAVda/
- Na Instagram profilu nije pronađen spoljašnji website/booking link.
- Samostalan zvanični sajt nije pronađen kroz pretragu naziva i handlea.
- Sekundarni poslovni izvor navodi aktivnu firmu „STUDIO LJEPOTE I ZDRAVLJA JELENA DOO”, djelatnost njege tijela i adresu u zoni Zabjela: https://www.companywall.me/firma/studio-ljepote-i-zdravlja-jelena-doo/MMElF0LD
- Poslovni direktorijum i javni profil nijesu dovoljan osnov da se na demo objave telefon, e-mail ili tačna ulica.

### Šta je stvarni problem

Ponuda postoji i djeluje široko, ali je rasuta kroz feed, highlights i sezonske akcije. Novi posjetilac nema mirno mjesto na kojem brzo može da razumije šta studio radi, koji tretman odgovara njegovom interesovanju i kako da pošalje smislen upit. Demo treba da organizuje usluge bez pretvaranja studija u generičnu medicinsku kliniku.

### Kreativni koncept: „ritual njege”

- Uloga: klasičan, topao i savremen one-page studio sajt.
- Predloženi headline: „Njega koja počinje slušanjem kože.”
- Alternativa: „Vrijeme posvećeno tvojoj koži i tijelu.”
- Primarni CTA: „Pošalji upit”.
- Sekundarni CTA: „Istraži tretmane”.
- Logika sadržaja: veliki taktilni hero → vertikalni izbor interesa „Lice / Tijelo / Masaže / Pogled” → pristup tretmanu → izdvojeni ritual/tretman → diskretno mjesto za budući cjenovnik → Zabjelo + Instagram CTA.
- Cjenovnik: napraviti elegantan i pristupačan data model po kategorijama. Ne prikazivati stare akcijske cijene iz feeda. Komponenta se aktivira tek kada klijent potvrdi aktuelni cjenovnik.
- Vidljive usluge smiju koristiti samo javno potvrđene nazive. Za INDIBA se može navesti da je usluga prisutna u aktuelnom sadržaju, bez medicinskih tvrdnji ili obećanja rezultata.

### Vizuelni pravac

- Fontovi: `Gilda Display` za naslove + `Onest` za interfejs i duži tekst. Oba moraju pravilno prikazivati crnogorske dijakritike.
- Paleta: topla slonova kost, maslinasta, prigušeno zlato i duboka kakao boja.
- Kompozicija: veliki krojevi fotografije, zakrivljeni prelazi koji podsjećaju na profil lica/list, mnogo vazduha i promjenljiv vertikalni ritam. Ne koristiti niz istih kartica.
- Potpis interakcije: jedan spor `mask reveal` ili „aperture” ulaz fotografije; suptilno otvaranje liste tretmana; bez beskonačnih ukrasa.
- Ne kopirati Soul Studio bež wellness estetiku. Ovaj koncept treba da bude zemljaniji, organski i više fokusiran na kožu/tretman.
- Bez pink gradienta, lebdećih sparkles elemenata, generičnih beauty ikonica i staklenih kartica.

### Materijal koji treba tražiti od klijenta prije produkcije

- SVG ili transparentni PNG logotipa.
- Jedna hero fotografija enterijera ili tretmana bez prepoznatljivog lica.
- Četiri do šest detalja: ruke terapeuta, proizvodi, peškiri, aparat, enterijer, obrve/trepavice uz dozvolu.
- Potvrđen spisak tretmana, trajanje, cijene i način zakazivanja.

## 2. Studio Pilates by Maja

### Provjerene javne informacije

- Instagram: https://www.instagram.com/studiopilatesbymaja/
- Bio je veoma kratak: „u doba korone”; profil nema samostalan website/booking link.
- Aktuelni feed pokazuje grupne treninge na strunjačama, personalni trening, TRX, tegove, mobilnost i kontrolisani rad. Ne predstavljati studio kao reformer pilates.
- Aktuelni raspored je objavljen kao Instagram grafika i može se mijenjati: https://www.instagram.com/studiopilatesbymaja/p/DcgQ0WyKSdw/
- Primjer personalnog treninga: https://www.instagram.com/studiopilatesbymaja/reel/DZwic02q5mR/
- Sekundarni fitness direktorijum opisuje grupne i personalne treninge i navodi Cetinjski put 36: https://www.localgymsandfitness.com/ME/Podgorica/1745096002429590/Studio-Pilates-by-Maja
- CompanyWall navodi aktivni sportski/fitness klub registrovan 2016: https://www.companywall.me/firma/body-building-i-fitnes-klub-studio-pilates-by-maja/MMUUQuY
- Profil grada Podgorice uključuje klub u listu ostalih sportskih klubova: https://sport.podgorica.me/ostali-sportski-klubovi/
- LinkedIn profil Maje Pejović navodi STOTT Pilates instructor iskustvo, ali to je self-published podatak koji treba potvrditi prije vidljivog korišćenja: https://me.linkedin.com/in/maja-pejovic-943586b0
- Telefoni, trenutni raspored i radno vrijeme iz direktorijuma ne ulaze u demo bez potvrde.

### Šta je stvarni problem

Instagram pokazuje živ i ozbiljan trening, ali profil ne objašnjava lako kome je studio namijenjen, kako izgleda prvi dolazak, koja je razlika između grupnog i personalnog rada i kako se prijaviti. Demo ne treba da glumi luksuzni reformer studio. Treba da uhvati energiju stvarnog prostora: kontrola, snaga, zajednica i kontinuitet.

### Kreativni koncept: „ritam pokreta”

- Uloga: energičan, urednički fitness landing bez gym klišea.
- Predloženi headline: „Snaga koja ostaje.”
- Alternativa: „Pokret sa svrhom.”
- Primarni CTA: „Prijavi se”.
- Sekundarni CTA: „Kako treniramo”.
- Logika sadržaja: tipografski motion hero → jedna vertikalna traka formata treninga → veliki kadar grupnog rada → način rada studija → „prvi dolazak” u kratkoj prozi, bez numerisanih koraka → aktuelni raspored kao izlaz prema najnovijoj Instagram objavi → Podgorica + upit.
- Javno potvrđeni formati za koncept: grupni trening, personalni trening, TRX, rad sa opterećenjem, mobilnost i mat pilates/fitness. Ne izmišljati reformer, terapije, tačan kapacitet ili specijalizovane programe.
- Raspored ne hardkodovati. CTA „Pogledaj aktuelne termine” vodi na najnoviju potvrđenu objavu ili poslovni profil.

### Vizuelni pravac

- Fontovi: `Barlow Condensed` za velike pokretne naslove + `Barlow` za UI i tekst.
- Paleta: topla bijela, ugljena crna, energična paradajz-crvena i vrlo malo sive.
- Kompozicija: uspravna „studio wall” priča, veliki rezovi fotografija i tipografija koja mijenja širinu/poziciju u kontrolisanom ritmu. Bez dashboard izgleda i kartica sa ikonama.
- Potpis interakcije: veoma blago sabijanje/širenje display tipografije na scroll i kontrolisan ulaz fotografija. U `prefers-reduced-motion` sve ostaje potpuno čitljivo.
- Ne kopirati Telo Pilates, Soul Studio ili generičnu krem reformer estetiku.
- Bez fitnes brojača, „calories burned” metrike, agresivnog crno-neon gym stila, generičnih silueta i numerisanih koraka.

### Materijal koji treba tražiti od klijenta prije produkcije

- Vektorski ili transparentni logo; trenutni mali profilni znak djeluje starije i može ostati referenca, ne mora biti centralni element.
- Jedan široki grupni kadar, jedan personalni kadar i tri do pet detalja pokreta/opreme.
- Potvrđeni formati treninga, ime instruktorke/tima, aktuelna lokacija, termini i način prijave.

## 3. Skyline Tattoo Studio

### Provjerene javne informacije

- Instagram: https://www.instagram.com/skylinetattooss/
- Javni naziv: „Skyline Tattoo Studio | Tattoos & Piercing”.
- Bio navodi informacije i zakazivanje kroz WhatsApp/Viber i dva telefona. Telefoni ostaju research podatak i ne prikazuju se na demou bez dozvole.
- Highlights: Studio, Minimal, Bold i Piercings.
- Aktuelni feed pokazuje tamnije black/grey radove, veće detaljne motive, minimal linework, piercing i artist-at-work sadržaj.
- Primjeri aktuelnih objava:
  - https://www.instagram.com/skylinetattooss/reel/DcWcjP4hAJN/
  - https://www.instagram.com/skylinetattooss/p/DaX6ppaiJUw/
  - https://www.instagram.com/skylinetattooss/reel/DaQT41NoF3b/
- Na profilu nije pronađen spoljašnji sajt ili booking sistem.
- Sekundarni lokalni listing smješta studio u Podgoricu/Rimski trg, ali lokaciju treba potvrditi prije objave: https://www.findglocal.com/ME/Podgorica/153518-45/genre/551469561691940/Tattoo%2B%26%2BPiercing%2BShops
- LinkedIn javno povezuje Uğura Şölena sa Skyline Tattoo Studio, ali sastav tima nije potvrđen na aktuelnom zvaničnom profilu i ne treba ga prikazivati bez odobrenja: https://me.linkedin.com/in/u%C4%9Fur-%C5%9F%C3%B6len-313a62343
- Samostalan zvanični sajt nije pronađen kroz pretragu handlea, naziva i javnih telefona.

### Šta je stvarni problem

Radovi imaju jak vizuelni materijal, ali ostaju zaključani u Instagram gridu. Ne postoji kontrolisan portfolio koji jasno razdvaja minimal, bold i piercing, objašnjava kako poslati ideju i gradi povjerenje prije direktnog razgovora. Demo mora djelovati kao studio/artist portfolio, ne kao generičan tattoo template.

### Kreativni koncept: „ideja postaje trag”

- Uloga: atmosferičan, modno-urednički portfolio sa veoma direktnim putem do konsultacije.
- Predloženi headline: „Ideja postaje trag.”
- Alternativa: „Tvoja ideja. Njihova linija.”
- Primarni CTA: „Pošalji ideju”.
- Sekundarni CTA: „Pogledaj radove”.
- Logika sadržaja: filmski hero → neprekinuti vertikalni portfolio → tekstualni izbor „Minimal / Bold / Piercing” → kratko objašnjenje konsultacije bez numerisanih koraka → studio u Podgorici → Instagram CTA.
- Portfolio ne praviti kao standardni 3×3 grid ili carousel koji djeluje kao Instagram kopija. Koristiti promjenljive pune širine, neočekivane cropove i mirne prelaze.
- U upitu se može tražiti motiv, pozicija, približna veličina i referenca, ali demo ne smije sakupljati osjetljive podatke niti imati lažnu funkcionalnu formu. CTA vodi na zvanični kanal.

### Vizuelni pravac

- Fontovi: `Unbounded` za rijetke velike display trenutke + `Onest` za sve što mora brzo da se čita.
- Paleta: grafit, skoro crna, dimno siva i mali acid-mint akcenat koji se veže za postojeći znak.
- Kompozicija: high-fashion/urban editorijal, mnogo crne površine, veliki radovi i horizont/skyline kao logika rezanja kadra. Ne koristiti KraftArt brutalizam.
- Potpis interakcije: horizontalni mask reveal koji podsjeća na liniju horizonta ili trag mastila; portfolio se otkriva smireno, bez glitch efekta.
- Bez gotičkog fonta, crveno-crne „blood” estetike, neon cyberpunk glowa, skull ikonica, buke tekstura ili ornamentalnih linija između svake sekcije.

### Materijal koji treba tražiti od klijenta prije produkcije

- Originalni logo i po mogućnosti njegov pojednostavljeni znak.
- Šest do deset radova po stilu, sa izričitom dozvolom klijenta/modela i cropovima bez lica.
- Jedan kadar studija i jedan kadar umjetnika pri radu bez otkrivanja osjetljivog sadržaja.
- Potvrđeni artist/tim, lokacija, pravila zakazivanja, vrste piercinga i sigurnosne informacije koje žele javno da objave.

## 4. Maluni Shop Podgorica / Tattoo Shop Podgorica

### Provjerene javne informacije

- Instagram: https://www.instagram.com/tattooshoppodgorica/
- Trenutni display name: „Maluni Shop Podgorica”.
- Bio navodi prodavnicu na adresi Baku 4/1 i telefon, ali demo ostaje na opštem „Podgorica” dok klijent ne odobri objavu punih kontakata.
- Instagram highlights: Nakit za nos i Nakit za pupak.
- Aktuelni feed je gotovo u potpunosti fokusiran na piercing nakit, uho, nos i body piercing. Koncept ne treba predstavljati ovaj profil kao klasičan tattoo portfolio.
- Primjeri aktuelnih objava:
  - https://www.instagram.com/tattooshoppodgorica/p/DcktdfniGR-/
  - https://www.instagram.com/tattooshoppodgorica/p/DcdEjLYDf7X/
  - https://www.instagram.com/tattooshoppodgorica/p/DcF83OEDflc/
- Zvanični aktivni Shopify webshop: https://malunitrey.com/
- Zvanični sajt navodi piercing nakit za Crnu Goru, besplatnu dostavu širom Crne Gore, uračunat PDV i plaćanje pouzećem.
- Plaćanje: https://malunitrey.com/pages/placanje
- Primjer proizvoda: https://malunitrey.com/products/minduse-par-2
- Kategorije na sajtu obuhvataju položaj piercinga, oblik nakita, materijale i boje.
- Sajt povezuje kupovinu sa podrškom/profesionalnim savjetom Tattoo Shop Podgorica.
- `News/blog` stranica i dalje sadrži Shopify placeholder copy poput „Share information about your brand…” i „Button label”: https://malunitrey.com/blogs/news
- Homepage funkcioniše i na mobilnom nema očigledan horizontalni overflow. Ne opisivati ga kao pokvaren. Problem je veoma duga i repetitivna kategorijska stranica, tekst utisnut u slike, slabija hijerarhija brenda, mali logo i malo objašnjenja za kupca koji nije siguran šta mu odgovara.
- Stari direktorijumi navode drugu adresu. Stare adrese i stare recenzije ne koristiti.

### Šta je stvarni problem

Maluni već ima commerce backend, proizvode, cijene i checkout. Izrada lažnog drugog shopa bila bi korak unazad. Demo treba da pokaže kako njihov postojeći Shopify može dobiti mnogo bolji mobilni „front door”: brže razumijevanje kategorija, sigurniji izbor nakita, jasne pogodnosti i vidljivu stručnu podršku.

### Kreativni koncept: „jewelry finder / digitalna vitrina”

- Uloga: redizajn mobilne ulazne stranice webshopa; postojeći Shopify ostaje izvor proizvoda, cijena, zaliha i checkouta.
- Predloženi headline: „Pronađi nakit koji pripada tvom piercingu.”
- Alternativa: „Nakit za tvoj sljedeći detalj.”
- Primarni CTA: „Otvori shop”.
- Sekundarni CTA: „Pronađi nakit”.
- Logika sadržaja: makro product hero → mali finder „mjesto + stil” → kolekcije kao velike vertikalne vitrine → materijali i izbor → besplatna dostava/pouzeće → stručna podrška → izlaz na postojeći Shopify.
- Finder mora koristiti samo potvrđene postojeće kolekcije/linkove. Ako mapiranje nije pouzdano, napraviti statičku vizuelnu demonstraciju bez lažne logike.
- Ne praviti fake cart, fake checkout, duplirane cijene ili lokalnu bazu proizvoda. Svi komercijalni CTA linkovi vode na aktivni Shopify.
- Ako se kasnije implementira u pravom Shopify themeu, komponentni dizajn treba moći da se prenese bez zavisnosti od Next.js-a.

### Vizuelni pravac

- Fontovi: `Sora` za naslove i UI + `Source Sans 3` za duži tekst i detalje proizvoda.
- Paleta: bone bijela, tinta-crna, polirano srebro i jedan kontrolisan cobalt/electric-blue akcenat.
- Kompozicija: svijetla digitalna vitrina, veliki makro detalji nakita i stacked full-width „shelves”. Vizuelno mora biti suprotnost Skylineu.
- Potpis interakcije: jedan kratak CSS light-sweep/glint preko hero nakita i taktilni ulaz polica; bez stalnog blještanja.
- Bez generičnog product-card grida, Shopify copy-paste sekcija, roze sparkle estetike, lažnih scarcity poruka, countdowna i popupova.

### Materijal koji treba tražiti od klijenta prije produkcije

- Originalni Maluni logo i pravilo kako se povezuje sa Tattoo Shop Podgorica identitetom.
- Pet do osam makro fotografija proizvoda na čistoj podlozi i dva lifestyle kadra uz dozvolu.
- Potvrđene collection URL-ove, materijale, pravila zamjene, dostave i njege.
- Odluku da li je primarni naziv „Maluni Shop Podgorica”, „Maluni Trey” ili druga potvrđena hijerarhija. Demo ne treba sam da rebrendira firmu.

## Kako četiri koncepta ostaju različita

| Element | Studio ljepote i zdravlja | Pilates by Maja | Skyline Tattoo | Maluni Shop |
| --- | --- | --- | --- | --- |
| Osnovna metafora | ritual njege | ritam pokreta | trag / horizont | digitalna vitrina |
| Hero | organski crop i miran headline | kinetička tipografija i stvarni trening | cinematic full-screen rad | makro proizvod + finder |
| Glavni ritam | mekan i editorial | uspravan i energičan | taman i filmski | svijetao i taktilan |
| Struktura usluga | otvoreni vertikalni izbor | puna traka formata | tekstualni style selector | kolekcijske police |
| Potpis animacije | aperture/mask reveal | type compression | horizon reveal | metalni light sweep |
| Primarni izlaz | Instagram upit | Instagram/prijava | slanje ideje | postojeći Shopify |

Zabranjeno za sva četiri koncepta:

- bento grid;
- sekcije od tri ili četiri iste zaobljene kartice;
- oznake `01 / 02 / 03`;
- generički uppercase eyebrow iznad svakog naslova;
- dekorativne crtice/rule linije ispod naslova;
- isti `headline + paragraph + centered CTA` obrazac u svakoj sekciji;
- glassmorphism, gradient blobs, generičan glow, mock browser prozori i AI-generated ikone;
- ista navigacija, isti sticky CTA, isti footer ili isti redosljed sekcija na sva četiri sajta;
- animacija samo da bi stranica „izgledala animirano”.

## COPY/PASTE PROMPT ZA CLAUDE

```text
You are working inside this existing repository:

C:\Users\tosii\vibecode.me

Your task is to plan and then build four production-quality, private outreach demo websites inside the existing VibeLab Next.js app. Do not stop after giving me a plan. First inspect and plan, then implement, test, and report. Do not commit, deploy, publish, add to the public portfolio, or add to a sitemap.

MANDATORY FIRST STEPS

1. Run `git status --short` and preserve every existing user change and untracked file.
2. Read `AGENTS.md` completely.
3. This repository uses a newer Next.js with breaking changes. Before editing any Next.js code, read the relevant guides in `node_modules/next/dist/docs/` for the APIs and file conventions you will touch. Do not rely on remembered Next.js conventions.
4. Inspect `package.json`, Next config, the shared demo components, `docs/deployment-security.md`, and the current scripts before assuming commands or route requirements.
5. Deeply inspect these first four VibeLab demos on desktop and at 360/390px, including code and actual rendered pages:
   - `src/app/(me)/demo/soul-studio/`
   - `src/app/(me)/demo/zlatara-opal/`
   - `src/app/(me)/demo/kraftart/`
   - `src/app/(me)/demo/lavlav/`
6. Learn their quality bar and existing engineering conventions, but do not copy their layouts, colors, typography, section order, components-as-design, or signature interactions.
7. Inspect the current repository for any newer demos and shared helpers before adding routes. Reuse stable engineering utilities where appropriate, not visual templates.

PHASE 1 — AUDIT AND PLAN

Before editing, write a concise internal implementation plan covering:

- the exact route and files for each demo;
- the unique visual system, page rhythm, section order, interaction signature, imagery requirements and CTA flow for each business;
- a fact matrix with `verified`, `needsConfirmation`, and `doNotRender` data;
- which remote images may be used only for a private concept and which must be replaced before production;
- performance, accessibility, mobile and security checks;
- required script/OG coverage based on the repository's actual conventions.

Then continue directly into implementation. Ask only if a genuinely blocking decision cannot be resolved from the repo or this prompt.

GLOBAL PRODUCT DIRECTION

Build four simple but highly considered one-page sites. They must feel classic, modern, lightly animated, safe and production-capable. Mobile at 360px and 390px is the primary design surface; desktop is an intentional expansion, not the starting point.

The four demos may share the existing VibeLab engineering primitives, but they must not look like copies of one another. They need different:

- hero composition;
- section sequence;
- typography pairing;
- color system;
- image treatment;
- navigation behavior where appropriate;
- CTA rhythm;
- signature motion.

Absolutely avoid AI-slop patterns:

- no bento grid;
- no repeated 3-card or 4-card rounded UI sections;
- no `01 / 02 / 03` labels or numbered process steps;
- no generic uppercase eyebrow above every heading;
- no decorative dash/rule below every heading;
- no repeated centered heading/subheading/button section pattern;
- no glassmorphism, gradient blobs, excessive glow, floating UI mockups, generic feature icons, or fake dashboards;
- no copying the Soul beige wellness layout, Opal luxury catalog structure, KraftArt brutalism, or LavLav numbered services/booking structure;
- no animation that obscures copy, delays interaction, causes layout shift, or runs endlessly without purpose.

Public-facing copy must be natural Montenegrin/BCS with correct `č ć ž š đ` characters. Avoid inflated marketing language and fake claims. Do not use lorem ipsum.

FACT, PRIVACY AND CONTENT RULES

- Do not show follower counts.
- Do not invent or republish reviews, ratings, statistics, prices, years of experience, certifications, medical outcomes, staff names, schedules or capacities.
- Do not render a phone number, exact street address, personal profile or email without documented permission. Use `Podgorica` or the explicitly safe neighborhood noted below.
- Never use `best`, `guaranteed`, `painless`, promised results or unsupported medical/health claims.
- Do not use recognizable faces, client bodies, before/after images, patient content or sensitive tattoo/piercing imagery without explicit permission.
- All remote assets selected for a private noindex demo must be downloaded and optimized locally. Never hotlink them from Instagram, Shopify or a directory.
- Store source URL, access date, rights/provenance note and `replaceBeforeProduction` status in the route data.
- The VibeLab €200 package may include a price list/menu. Build the data structure and accessible presentation when useful, but never show stale, promotional or invented prices. If current prices are not confirmed, keep the capability ready and omit the visible price values rather than showing placeholders.

SHARED ENGINEERING REQUIREMENTS

- Follow the repository's actual App Router/static-export conventions after reading the local Next docs.
- Give every demo its own route-level data, page and styling rather than one visual template with different strings.
- Use existing shared components such as the VibeLab demo bar, responsive local image helper, click-to-load map and contact icons only when they truly fit and after inspecting their APIs.
- Each route must be `noindex` and not appear in public discovery/sitemap/portfolio.
- Use semantic landmarks and heading order, visible keyboard focus, 44px minimum touch targets, safe-area spacing and correct buttons versus links.
- No horizontal overflow at 320/360/390px. Avoid `100vw` overflow traps.
- Use responsive local images with reserved dimensions/aspect ratio, correct `sizes`, one justified priority/LCP image, lazy loading below the fold, AVIF/WebP through the repository's existing image pipeline and no oversized mobile downloads.
- Prefer CSS transitions/keyframes and IntersectionObserver patterns already established in the repo. Respect `prefers-reduced-motion`, use transform/opacity for motion and avoid scroll-jank.
- Do not add a large animation library for these pages unless the repo already depends on it and there is a demonstrated reason.
- Every external CTA must have a verified destination and an accessible label. Do not build fake forms, fake checkout or misleading booking flows.
- Preserve CSP/security conventions. Do not add new uncontrolled third-party scripts.
- Add/update route coverage in the existing mobile, accessibility, security, visual screenshot and OG-generation scripts if that is how current demos are registered.
- Create route-specific OG images using the established local process, with no real contact data and no accidental indexing.
- Add meaningful Umami events only if the current demos do so, e.g. primary CTA, Instagram, schedule/shop, and price-list interest. Do not capture personal input.

DEMO 1 — STUDIO LJEPOTE I ZDRAVLJA

Suggested route: `/demo/studio-ljepote-zdravlja`
Official public source: https://www.instagram.com/studio.ljepote.zdravlja/
Secondary company source: https://www.companywall.me/firma/studio-ljepote-i-zdravlja-jelena-doo/MMElF0LD

Verified scope:
- Podgorica; Instagram says Zabjelo.
- facial cleansing;
- anti-age facial treatments;
- massages;
- anti-cellulite programs;
- lash lift;
- brow lift;
- current feed also shows INDIBA and skin-focused content.

Do not render phone, email, exact street, seasonal promotional prices or medical outcome claims.

Concept: `ritual njege`, not a generic clinic and not a copy of Soul Studio.
Suggested H1: `Njega koja počinje slušanjem kože.`
Primary CTA: `Pošalji upit` to the official business Instagram.
Secondary CTA: `Istraži tretmane`.
Typography direction: Gilda Display + Onest, after verifying exact local Next font support and Montenegrin characters.
Palette: warm ivory, olive, restrained muted gold, deep cacao.
Page rhythm: tactile hero; open vertical interest selector `Lice / Tijelo / Masaže / Pogled`; the studio's approach; one focused treatment story; an elegant price-list-ready area; Zabjelo + Instagram close.
Signature motion: one slow aperture/soft mask reveal and restrained disclosure motion.
Avoid: pink gradients, beauty sparkles, glass cards, generic medical icons, rows of treatment cards and beige Soul Studio imitation.

For the price list, create a clean category-based data model that can accept confirmed items later. Do not publish the old feed promotions. If no current verified prices exist, the visible demo should explain services without fake price placeholders.

DEMO 2 — STUDIO PILATES BY MAJA

Suggested route: `/demo/pilates-by-maja`
Official public source: https://www.instagram.com/studiopilatesbymaja/
Current schedule-post example, which may change: https://www.instagram.com/studiopilatesbymaja/p/DcgQ0WyKSdw/
Secondary source: https://www.localgymsandfitness.com/ME/Podgorica/1745096002429590/Studio-Pilates-by-Maja
Company source: https://www.companywall.me/firma/body-building-i-fitnes-klub-studio-pilates-by-maja/MMUUQuY

Verified/current visual scope:
- group and personal training;
- mat-based Pilates/fitness;
- TRX;
- weights/resistance work;
- mobility and controlled movement;
- Podgorica.

Do not call it a reformer studio. Do not render unconfirmed STOTT certification, current times, phone, exact address, capacity or duration.

Concept: `ritam pokreta`, energetic and editorial rather than luxury wellness.
Suggested H1: `Snaga koja ostaje.`
Alternative: `Pokret sa svrhom.`
Primary CTA: `Prijavi se` to the official Instagram/current approved registration channel.
Secondary CTA: `Kako treniramo`.
Typography direction: Barlow Condensed + Barlow, after verifying local Next font support and diacritics.
Palette: warm white, charcoal, tomato red, restrained grey.
Page rhythm: kinetic type-led hero; one vertical class/formats ribbon; full-width real training image; how the studio trains; first-visit prose without numbered steps; live schedule handoff to the latest approved Instagram post; Podgorica + CTA.
Signature motion: subtle type compression/expansion and image entries, fully reduced in reduced-motion mode.
Avoid: reformer imagery, beige wellness visuals, metric counters, neon gym styling, icon cards and numbered process sections.

Do not hardcode a temporary Instagram schedule. Design the page so the business can later edit a structured schedule, while the outreach demo links to the current source of truth.

DEMO 3 — SKYLINE TATTOO STUDIO

Suggested route: `/demo/skyline-tattoo`
Official public source: https://www.instagram.com/skylinetattooss/

Verified scope:
- tattoo and piercing;
- `Minimal` and `Bold` are current official highlight labels;
- current portfolio includes dark black/grey work, larger detailed pieces, minimal linework and piercing;
- Podgorica.

Do not render public phone numbers, an exact location, unconfirmed artist names or team composition. Do not use recognizable client faces or sensitive body areas without written permission.

Concept: `ideja postaje trag`, cinematic/high-fashion urban rather than a tattoo template.
Suggested H1: `Ideja postaje trag.`
Primary CTA: `Pošalji ideju` to the official Instagram.
Secondary CTA: `Pogledaj radove`.
Typography direction: Unbounded for rare display moments + Onest for legibility, after verifying local Next font support and diacritics.
Palette: graphite, near-black, smoke grey and one controlled acid-mint accent tied to the current logo.
Page rhythm: cinematic hero; continuous vertical portfolio with variable full-width crops, not a grid; text selector `Minimal / Bold / Piercing`; concise consultation explanation without numbers; Podgorica/studio moment; Instagram CTA.
Signature motion: a quiet horizontal horizon/ink mask reveal.
Avoid: KraftArt brutalism, gothic fonts, blood-red tattoo clichés, neon cyberpunk, glitch, skull iconography, texture noise, tiled Instagram grids and decorative rule lines.

A consultation CTA may explain that a useful first message includes the idea, placement, approximate size and references, but do not collect that information in a fake form.

DEMO 4 — MALUNI SHOP PODGORICA / TATTOO SHOP PODGORICA

Suggested route: `/demo/maluni-shop`
Official Instagram: https://www.instagram.com/tattooshoppodgorica/
Official active Shopify: https://malunitrey.com/
Payment information: https://malunitrey.com/pages/placanje
Current placeholder blog page: https://malunitrey.com/blogs/news

Verified scope from the official site:
- piercing jewelry for Montenegro;
- free delivery across Montenegro;
- VAT included;
- cash on delivery;
- categories by piercing placement, jewelry shape, material and color;
- support/advice connected to Tattoo Shop Podgorica;
- the active store already owns products, prices, stock and checkout.

This is not a broken/no-site lead. Do not rebuild or simulate their commerce backend. Build a convincing mobile homepage/storefront redesign concept that routes all buying actions to the existing Shopify store or verified collection URLs.

Concept: `jewelry finder / digitalna vitrina`, visually opposite Skyline.
Suggested H1: `Pronađi nakit koji pripada tvom piercingu.`
Primary CTA: `Otvori shop` to https://malunitrey.com/
Secondary CTA: `Pronađi nakit`.
Typography direction: Sora + Source Sans 3, after verifying local Next font support and diacritics.
Palette: bone white, ink black, polished silver and one controlled cobalt/electric-blue accent.
Page rhythm: macro product hero; small finder by placement/style; large vertical collection shelves rather than product cards; materials/selection guidance; free delivery and cash-on-delivery facts; professional support; existing Shopify CTA.
Signature motion: one restrained metallic CSS light sweep and tactile shelf entrances.
Avoid: fake cart/checkout, duplicated stale prices, generic product-card grid, copied Shopify sections, pink sparkle beauty styling, scarcity messages, countdowns and popups.

Only build the finder if every option maps to a verified current collection URL. Otherwise make it a clearly non-deceptive visual prototype and keep all final purchase CTAs pointed at the live shop.

Do not use old directory addresses/reviews. Do not independently rename the business. Use `Maluni Shop Podgorica` as the visible current Instagram identity, with a restrained descriptor such as `piercing nakit i stručna podrška`, while preserving the real `malunitrey.com` destination.

SOURCE AND IMAGE WORKFLOW

For each business:

1. Audit the official profile/site visually at mobile width.
2. Make a source inventory before downloading anything.
3. Prefer logos, interiors, products, hands/tools and non-identifying crops.
4. Exclude recognizable faces, client bodies and sensitive treatment/tattoo/piercing content unless permission is explicit.
5. Download only the minimum set needed for the private noindex concept.
6. Optimize through the repository's current image workflow; do not create duplicate arbitrary source formats.
7. Record provenance in route data and mark social/directory assets `replaceBeforeProduction: true`.
8. If an asset cannot be used safely, design a typographic/art-directed section instead of filling it with stock or AI-generated imagery.

MOBILE DESIGN ACCEPTANCE

Treat 360×800 and 390×844 as primary review sizes. Verify at least 320, 360, 390, 768 and 1440px.

- no horizontal overflow;
- no clipped diacritics or display type;
- no orphan single-word heading caused by a fragile fixed font size;
- no text over busy imagery without sufficient contrast;
- sticky/fixed elements must not cover content or each other;
- bottom CTA, if used, must respect `env(safe-area-inset-bottom)` and must not be copied across all four demos by default;
- 44px touch targets and comfortable thumb reach;
- navigation is usable with keyboard and touch;
- images reserve space and do not jump;
- first useful content appears quickly on a mid-range phone;
- motion remains quiet, purposeful and disabled/reduced correctly;
- all CTAs open the expected official destination.

VERIFICATION

Use the repository's real commands after inspection. At minimum run:

- lint;
- TypeScript no-emit check;
- production build/static export;
- the existing mobile overflow/check script for all four routes;
- the existing accessibility script for all four routes;
- the existing security check for the local production or dev server, as expected by the repo;
- desktop and mobile visual screenshots for all four routes;
- a manual keyboard, reduced-motion, console-error and outbound-link pass.

Do not claim success if a command did not run. Separate new failures from pre-existing repository issues. Fix every issue caused by your changes. Inspect final screenshots visually, not only command exit codes.

FINAL RESPONSE

Report:

- the four routes built;
- what makes each design structurally different;
- facts intentionally omitted pending confirmation;
- asset provenance and what must be replaced before production;
- exact verification commands and results;
- any remaining genuine risk or client input required.

Do not commit or deploy.
```

## Outreach ugao poslije demoa

Nemoj slati istu poruku svima. Jedna kratka personalizovana rečenica treba da objasni zašto je demo napravljen baš za njih:

- Studio ljepote i zdravlja: „Primijetio sam da su vam tretmani lijepo prikazani na Instagramu, ali novi klijent mora da prođe dosta objava da razumije kompletnu ponudu, pa sam složio miran mobilni koncept koji to rješava.”
- Pilates by Maja: „Vaš profil pokazuje stvarnu energiju treninga, pa sam napravio koncept koji grupni i personalni rad objašnjava mnogo jasnije i vodi direktno do prijave.”
- Skyline: „Radovi imaju jak vizuelni identitet, pa sam ih zamislio kao pravi mobilni portfolio koji ne izgleda kao još jedan generičan tattoo template.”
- Maluni: „Nijesam pravio novi shop jer postojeći već radi; napravio sam koncept boljeg mobilnog ulaza koji kupcu brže pomaže da izabere nakit i onda ga vodi na vaš pravi checkout.”

## Glavni izvori

- Studio ljepote i zdravlja: https://www.instagram.com/studio.ljepote.zdravlja/ i https://www.companywall.me/firma/studio-ljepote-i-zdravlja-jelena-doo/MMElF0LD
- Studio Pilates by Maja: https://www.instagram.com/studiopilatesbymaja/, https://www.localgymsandfitness.com/ME/Podgorica/1745096002429590/Studio-Pilates-by-Maja, https://www.companywall.me/firma/body-building-i-fitnes-klub-studio-pilates-by-maja/MMUUQuY
- Skyline Tattoo: https://www.instagram.com/skylinetattooss/ i https://www.findglocal.com/ME/Podgorica/153518-45/genre/551469561691940/Tattoo%2B%26%2BPiercing%2BShops
- Maluni: https://www.instagram.com/tattooshoppodgorica/, https://malunitrey.com/, https://malunitrey.com/pages/placanje i https://malunitrey.com/blogs/news

Research prikazuje stanje dostupno 30. avgusta 2026. Instagram objave, termini, cijene, adrese i aktivni linkovi se mogu promijeniti i treba ih ponovo potvrditi neposredno prije slanja ili produkcije.
