# Research: biznisi u Crnoj Gori sa slabim ili nepronađenim sajtom

Datum provjere: **28. avgust 2026.**

## Rezultat ukratko

Pronađeno je **66 potencijalnih leadova** širom Crne Gore:

- **25** na primorju
- **21** u centralnoj regiji
- **20** na sjeveru
- kod **37** kandidata zvanični sajt nije pronađen nakon više pretraga
- kod **29** postoji sajt, ali su nađeni konkretni signali zastarjelosti, tehničkog kvara, nedovršenog templatea ili slabog prodajnog toka
- **20** leadova je označeno kao P1 za prvi outreach, **44** kao P2 i **2** kao P3

Struktura liste je namjerno komercijalna: 48 leadova su hoteli, smještaj, restorani, barovi ili vinarije; 7 su auto-biznisi; 6 dental/beauty; 4 građevina/B2B. Hospitality je najbolja početna niša jer se vrijednost sajta lako veže za rezervacije, upite, provizije platformama i turiste koji pretražuju na engleskom.

Kompletna baza sa javnim kontaktima, izvorima, signalima problema i outreach uglom nalazi se u fajlu [`montenegro-business-web-leads-2026-08-28.csv`](./montenegro-business-web-leads-2026-08-28.csv).

## Kako je research rađen

Korišćen je jeftiniji multi-agent workflow:

1. tri paralelna research agenta za primorje, centralnu regiju i sjever;
2. poseban jeftiniji QA/ranking prolaz;
3. ručna provjera najjačih kandidata na zvaničnim sajtovima, turističkim organizacijama, javnim poslovnim registrima i direktorijumima;
4. favorizovani su objektivni signali: javni error/warning, placeholder kontakt, Lorem ipsum, sirovi shortcode, posljednje vijesti stare više godina, izgubljen domen ili samo Facebook/direktorijumsko prisustvo.

Važna ograda: **„zvanični sajt nije pronađen“ ne znači da sajt sigurno ne postoji.** Znači da nije pronađen kroz kombinacije `naziv + grad + website/sajt`, provjeru direktorijuma i javnih profila. Domen ili vlasnik se moraju potvrditi neposredno prije kontakta.

## P1: prvih 20 kandidata

| Biznis | Regija | Status | Najjači dokaz problema | Javni kontakt / izvor | Najbolji prodajni ugao |
|---|---|---|---|---|---|
| Hotel Lighthouse, Igalo | Primorje | slab/oštećen sajt | Na početnoj je javni RokSprocket/Joomla warning, footer 2017 i link ka preuzetom ruskom templateu; hotel navodi 365 ležajeva. | +382 31 331 615, sales@hotellighthouse.me — [sajt](https://www.hotellighthouse.me/index.php/me/) | „Kvalitet i veličina hotela nijesu predstavljeni nivoom koji gost vidi online; prvo ukloniti javnu grešku, zatim urediti booking i konferencije.“ |
| Hotel Mala Plaža, Ulcinj | Primorje | nezavršen template | Naslovna javno prikazuje `1800-1111-2222`, `booking@website.com` i demo vijesti o hotelima u Miami/New Yorku. | +382 67 587 687, mala.plaza@yahoo.com — [sajt](https://hotelulcinj.com/) | „Na sajtu je pogrešan kontakt koji može direktno gubiti rezervacije; ponuditi brz fix plus novi direktni booking.“ |
| Sunset 2 Bečići | Primorje | tehnički slab/stario sajt | Vidljiv sirovi shortcode; turistički sadržaj je iz 2015; jedinice uglavnom kažu „Ask for price“. | +381 64 147 5819, sunset2becici@gmail.com — [sajt](https://sunset2becici.com/) | „Ukloniti tehničku grešku i uvesti aktuelne cijene/dostupnost na tri jezika.“ |
| Hotel Marija, Kotor | Primorje | nepouzdan/legacy sajt | Indeksiran footer iz 2014. i loše URL putanje; root domen je tokom provjere vraćao grešku. Aktivnost potvrđuje NTO. | +382 32 335 307 — [NTO](https://www.montenegro.travel/en/poi/538-marija) | „Hotel u Starom gradu treba brz višejezični booking koji odgovara vrijednosti lokacije.“ |
| Hotel Novi, Igalo | Primorje | tehnički problematičan sajt | Direktan pristup je vraćao verifikacionu stranicu; indeksirani sadržaj je star i sadrži greške. | +382 67 365 656, hotelnovi@t-com.me — [sajt](https://www.hotel-novi.com/) | „Pouzdan sajt sa odvojenim ponudama za porodice, sportske ekipe i wellness goste.“ |
| Plaza Hotel & SPA, Ulcinj | Primorje | indeksirana demo stranica | Javno indeksirana `/home-2/` strana sadrži Lorem ipsum, stock slike, cijene u dolarima, `+382 69 000000` i `info@example.com`. | Kontakt potvrditi prije slanja — [demo strana](https://plazahotelmontenegro.com/home-2/) | „Očistiti Google indeks i usmjeriti gosta samo na stvarne sobe i rezervaciju.“ |
| Sava Car, Podgorica | Centar | oštećen/stario sajt | Na naslovnoj je vidljiv encoding kvar `SVEÄŒANO`; posljednja novost je iz juna 2016. | +382 20 226 914, savacar@sava.co.me — [sajt](https://www.savacar.co.me/) | „Lokalne servisne stranice, jasan izbor poslovnice i klik za registraciju/tehnički pregled.“ |
| Hotel Sindčel, Nikšić | Centar | veoma star sajt | Blogspot iz 2009. ima razbijene razmake, stare spoljne linkove i nema savremeni booking tok. | +382 40 213 655, sindcelnk@gmail.com — [sajt](https://sindcel.blogspot.com/2009/04/hote-l-sindce-l-n-i-ksic-centa-r-gr-ada.html) | „Sačuvati tradiciju hotela i Scena 213, ali ih prepakovati u moderan prodajni sajt.“ |
| Vinarija Velimirovich, Podgorica | Centar | nezavršen sajt | Hero sekcija javno prikazuje Lorem ipsum i generičko dugme „Click Here“. | +382 68 751 978, vinarija.velimirovic@gmail.com — [sajt](https://velimirovich.me/) | „Premium priča o vinima i podrumu, uz rezervaciju degustacije i posjete.“ |
| K-Dental, Podgorica | Centar | zvanični sajt nije pronađen | Aktivna ordinacija sa uslugama i javnim ocjenama, ali nema pronađenog domena ni online zakazivanja. | +382 67 203 722, ak.k.dental@gmail.com — [profil](https://www.moja-djelatnost.me/stomatoloska-ordinacija-podgorica-stari-aerodrom/MM1AIKOb) | „Stranice tretmana, povjerenje i jednostavno zakazivanje prvog pregleda.“ |
| Aesthetic & Dental Studio Kovačević, Podgorica | Centar | zvanični sajt nije pronađen | Pronađen je javni poslovni listing, ali ne centralna stranica za dentalne/estetske tretmane, rezultate i termine. | +382 69 100 553, adstudiokovacevic@gmail.com — [profil](https://www.moja-djelatnost.me/opsta-stomatologija-i-estetika-podgorica/aesthetic--dental-studio-kovacevic-zu/MM1CQ8a6) | „Premium kombinacija dentalnih i estetskih usluga sa fokusom na konsultaciju.“ |
| Hotel Royal, Bijelo Polje | Sjever | izgubljen/nefunkcionalan domen | Domen nije davao sadržaj hotela tokom provjere, dok aktuelni javni listing i dalje prikazuje objekat. | +382 67 263 111 — [listing](https://restaurantguru.com/Hotel-Royal-Bijelo-Polje) | „Vratiti kontrolu nad web prisustvom i pretvoriti reputaciju u direktne rezervacije.“ |
| Hotel Delta, Pljevlja | Sjever | stari/nepouzdan domen | Lokalna turistička organizacija potvrđuje aktivan hotel; stari HTTP domen se nije normalno otvorio. | +382 52 356 022, hoteldeltapv@t-com.me — [TO Pljevlja](https://pljevlja.travel/2025/01/31/hotel-delta/) | „Jednostavan pouzdan sajt za sobe, restoran i direktan upit.“ |
| Hotel Pljevlja | Sjever | savremeni zvanični sajt nije pronađen | Registar potvrđuje aktivan hotel sa 32 zaposlena i prihodom 1,378 miliona EUR u 2025; stariji izvor navodi ugašenu `.co.yu` adresu. | +382 68 867 067, hotelpljevlja@gmail.com — [CompanyWall](https://www.companywall.me/firma/hotel-pljevljadoo-pljevlja/MMCtbpq) | „Visoka vrijednost: sobe, restoran i događaji opravdavaju ozbiljan direktni booking sajt.“ |
| Etno selo Breza, Kolašin | Sjever | zvanični sajt nije pronađen | Aktivna ponuda: 7 kućica, 2 apartmana, restoran i sala, ali pronađen je samo direktorijumski profil. | +382 20 862 020, batboskovic22@gmail.com — [profil](https://www.moja-djelatnost.me/restoran-domace-kuhinje-sa-smestajem-kolasin/braca-boskovic-doo/MM1BNlVo) | „Jedan sajt prodaje četiri izvora prihoda: smještaj, hranu, porodice i konferencije.“ |
| Hotel Gorske Oči, Žabljak | Sjever | zvanični sajt nije pronađen | Sedam apartmana i restoran u centru Žabljaka; javni kontakt postoji, ali nije pronađen centralni domen. | +382 52 361 118, hotelgorskeoci@t-com.me — [profil](https://www.moja-djelatnost.me/hotel-smestaj-apartmani-restoran-zabljak-crna-gora/hotel-gorske-oci/MM19aNch) | „Sezonske ponude i direktan upit za turiste koji pretražuju Žabljak/Durmitor.“ |
| Hotel Bijela Rada, Bijelo Polje | Sjever | zvanični sajt nije pronađen | NTO vodi prepoznatljiv hotel i javni kontakt, ali nakon provjera nije pronađen aktuelni zvanični domen. | +382 68 866 456, +382 50 432 908 — [NTO](https://www.montenegro.travel/en/poi/1749-bijela-rada) | „Sobe, restoran i tradicija na jednoj kontrolisanoj stranici.“ |
| Restoran Most / Tara Turist, Mojkovac | Sjever | zvanični sajt nije pronađen | Javni profil navodi do 250 gostiju, 9 soba i apartman, bez pronađenog centralnog sajta. | +382 67 224 282, danilovuc@t-com.me — [profil](https://moja-djelatnost.me/restoran-tradicionalne-kuhinje-mojkovac/tara-turist-doo/MM137sHl) | „Proslave, grupe i smještaj daju mnogo veći potencijal od obične restoran stranice.“ |
| Restoran i apartmani Obrov, Bijelo Polje | Sjever | nezavršen sajt | Na naslovnoj je `+382 000 000` i čitav Lorem ipsum/demo blok. | restoran@obrov.me — [sajt](https://obrov.me/) | „Najbrža pobjeda: završiti postojeći sajt i povezati pravi kontakt, meni, sobe i proslave.“ |
| Restoran i hotel Taša, Pljevlja | Sjever | zastario/prosječan sajt | Objekat otvoren 2011. se i dalje zove „najnoviji“; javni su generički alt tekstovi, a tok za jelovnik/rezervaciju je slab. | +382 69 570 177, tasaneco@t-com.me — [sajt](https://restoran-tasa.me/?lang=sr) | „Objediniti hotel, restoran, salu do 600 mjesta i igraonicu u jasne prodajne tokove.“ |

## Šta ovaj uzorak govori o tržištu

### 1. Najlakše se prodaje gubitak prihoda, ne „ljepši dizajn“

Najjači opener nije „sajt vam izgleda staro“, nego jedan konkretan poslovni problem:

- pogrešan broj ili demo email može izgubiti rezervaciju;
- javni warning/Lorem ipsum ruši povjerenje;
- Facebook-only restoran nema SEO stranice za turiste;
- hotel bez svog sajta ostaje zavisan od Booking/Google/direktorijuma;
- restoran sa salom nema mjesto za grupne i event upite;
- ordinacija bez treatment stranica ne objašnjava uslugu prije prvog poziva.

### 2. Prvi fokus: hospitality u tri mikro-niše

Preporučeni redosljed:

1. **Hoteli, apartmani i etno sela** — najveća vrijednost jednog lead-a; ponuditi direktne upite/booking, jezike, sezonske ponude i Google profil.
2. **Restorani sa proslavama ili turističkom lokacijom** — meni, mapa, WhatsApp, rezervacije i stranice za svadbe/grupe.
3. **Dental/beauty** — manji broj leadova, ali veća vrijednost klijenta; fokus na povjerenje, tretmane, rezultate i termine.

Autoservise i građevinu držati kao odvojene kampanje; njihove poruke i dokaz vrijednosti su drugačiji od turizma.

## Ponuda i pozicioniranje

Javno istaknute početne cijene na crnogorskom tržištu su niske i razvučene: Sunce Studio oglašava pakete od €199/€299/€399, Nanostar početak od €390, DevByPro €349/€749/€1.499, dok Precision Studios navodi oko €720 za smještaj i €1.250 za booking sajt. Izvori: [Sunce Studio](https://suncestudio.com/), [Nanostar](https://nanostar.me/izrada-sajtova-podgorica), [DevByPro](https://devbypro.com/), [Precision Studios](https://izradawebsajta.me/me/kalkulator-cijene).

Zaključak: ne ulaziti samo sa „pravim jeftine sajtove“. To je već zasićena poruka. Prodavati konkretan ishod i imati tri jasna nivoa:

### Paket A — Digitalni minimum: testirati €350–550

- one-page ili vrlo mali sajt
- usluge/sobe/meni, galerija i mapa
- klik za poziv i WhatsApp
- crnogorski + engleski
- osnovni lokalni SEO i analitika

Najbolji za Facebook-only restorane, salone i autoservise.

### Paket B — Direktne rezervacije/upiti: testirati €750–1.250

- više stranica i više jezika
- strukturisane sobe, tretmani ili usluge
- forma za rezervaciju/upit
- ponude, meni/cjenovnik i Google Business optimizacija
- mjerenje poziva, poruka i formi

Najbolji za male hotele, apartmane, etno sela, ordinacije i restorane sa proslavama.

### Paket C — Direktna prodaja: od €1.500 + održavanje

- booking ili napredni inquiry flow
- sezonske landing stranice
- SEO sadržaj za konkretne gradove/usluge
- Google/Meta tracking
- automatski WhatsApp/email odgovor
- mjesečna tehnička podrška i izmjene

Najbolji za hotele većeg kapaciteta i objekte sa više izvora prihoda. Rasponi su hipoteza za testiranje, ne garancija tržišne cijene; uskladiti ih sa kvalitetom portfolija i stvarnim obimom rada.

## Outreach koji ne zvuči kao spam

Ne počinjati sa „sajt vam je loš“. Početi sa opažanjem koje vlasnik može provjeriti za deset sekundi.

### Stari ili pokvaren sajt

> Pozdrav, gledao sam sajt [biznis] dok sam istraživao [grad]. Primijetio sam da se na početnoj trenutno vidi [tačan problem — npr. placeholder broj/Joomla warning/Lorem ipsum], pa gost može steći pogrešan utisak ili ne završiti upit. Imam ideju kako da se to sredi i da rezervacija bude mnogo jasnija. Mogu li vam poslati kratki preview, bez obaveze?

### Biznis kod kojeg sajt nije pronađen

> Zdravo, [biznis] sam našao preko [Google/Facebook/NTO], ali nijesam našao jedno zvanično mjesto gdje gost odmah vidi [sobe/meni/tretmane], lokaciju i pošalje upit. Napravio sam kratku ideju kako bi početna stranica mogla izgledati. Da li mogu poslati screenshot ili link, bez obaveze?

### Nakon dozvole

Pošalji samo:

- jedan personalizovan hero screenshot ili link;
- tri konkretne promjene;
- jedan ishod („manje propuštenih upita“, „više direktnih rezervacija“, „lakše zakazivanje“);
- CTA za 10-minutni poziv.

## Predloženi 14-dnevni test

1. Izabrati 15 P1 leadova: 6 hotela/smještaja, 5 restorana, 2 dental i 2 druga.
2. Za svakog napraviti jednu personalizovanu opasku i jedan hero mockup; ne praviti cijeli besplatni sajt.
3. Dan 0: kratka WhatsApp/Instagram/email poruka sa pitanjem da li smiješ poslati preview.
4. Dan 2: poslati preview i tri tačke samo onima koji odgovore ili otvore razgovor.
5. Dan 5: kratak poziv ili follow-up sa jednom ponudom, ne katalogom usluga.
6. Dan 9: posljednji follow-up i zatvaranje petlje.
7. Mjeriti: poslato, odgovor, pozitivan odgovor, zakazan razgovor, ponuda, zatvoreno, razlog odbijanja.

Početni ciljevi za test, ne industrijski benchmark: od 30 pažljivo personalizovanih kontakata tražiti najmanje 8 odgovora, 4 razgovora i 1 prodaju. Ako nema odgovora, prvo mijenjati opener i selekciju leadova; ako ima razgovora ali nema prodaje, mijenjati ponudu, dokaz i cijenu.

## Jeftiniji agent workflow za nastavak

Ovaj research se može ponavljati sedmično bez skupog ručnog rada:

1. **Collector agent (jeftin model):** 15 kandidata po gradu/kategoriji, samo naziv, URL, javni kontakt i izvor.
2. **Verifier agent (jeftin model):** exact-name search, provjera aktivnosti, domena i jednog objektivnog problema; odbacuje zatvorene i nejasne firme.
3. **Scoring agent (jeftin model):** P1/P2/P3 prema vrijednosti, jačini dokaza i dostupnosti kontakta.
4. **Glavni agent ili čovjek:** otvara samo P1 sajtove, potvrđuje problem, pravi personalizovan opener/mockup.
5. **Slanje ostaje ručno:** koristiti javne poslovne kontakte, bez masovnog blastovanja i stati nakon kratke sekvence bez odgovora.

Minimalni podaci koje svaki naredni CSV red mora imati: datum provjere, naziv, grad, kategorija, status sajta, URL, javni kontakt, dokazni URL, konkretan signal, confidence, prioritet, outreach ugao i posljednji ručni check.

## Obavezna provjera prije kontakta

- otvoriti domen ponovo istog dana;
- potvrditi da biznis nije zatvoren ili promijenio vlasnika;
- provjeriti da telefon/email zaista pripada biznisu;
- kod „no-site“ leadova ponoviti tačan naziv + grad + telefon;
- ne pominjati prihod, zaposlene ili negativne recenzije u cold poruci;
- ne vrijeđati postojeći rad/agenciju — navesti samo vidljiv problem i poslovni ishod;
- voditi CRM bilješku sa datumom, kanalom, odgovorom i sljedećim korakom.

