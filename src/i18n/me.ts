export const me = {
  lang: "me",
  htmlLang: "sr-ME",

  nav: {
    work: "Primjeri",
    pricing: "Cijene",
    contact: "Kontakt",
    langLabel: "EN",
    langHref: "/en/",
    skip: "Preskoči na sadržaj",
  },

  hero: {
    eyebrow: "Web studio — Crna Gora",
    /* The promise, in the first line: who it is for, what it starts at, how
       long it takes. Both figures come from src/lib/packages.ts and the
       process section — change them there and here together. */
    titleA: "Sajt za tvoj biznis.",
    titleB: "Od €200, za 10 dana.",
    sub: "Restoran, salon, barber, teretana, vila. Prvo dobijaš besplatan koncept, pa odlučuješ.",
    ctaPrimary: "Zatraži besplatan koncept",
    ctaSecondary: "Pogledaj primjere",
    /* The four facts a business owner asks for first. Price and deadline are
       in the headline now, so this strip carries the proof instead: how many
       sites are live and how many concepts exist. `{live}` and `{concepts}`
       are counted from `work.items` by the Hero, so the numbers can never
       drift from the portfolio below. */
    facts: [
      { label: "Radimo", value: "Crna Gora" },
      { label: "Sajtova uživo", value: "{live}" },
      { label: "Koncepata", value: "{concepts}" },
      { label: "Jezici", value: "MNE + EN" },
    ],
  },

  work: {
    title: "Šta smo napravili",
    /* Two halves, and the visitor is never left to work out which is which:
       the sites running for real clients come first, on their own domains;
       the concepts follow under their own heading. */
    liveTitle: "Sajtovi uživo",
    liveSub: "Rade za prave klijente, na svom domenu.",
    conceptsTitle: "Koncepti za tvoju branšu",
    conceptsSub:
      "Napravljeni za konkretne biznise iz Crne Gore, da vidiš kako bi tvoj sajt mogao da izgleda. Otvori ih na telefonu.",
    /* The eyebrow above a project's name. A site that is live for a real
       client says so and prints its own domain; everything else is a
       concept and must never be presented as delivered work. */
    liveLabel: "Sajt uživo",
    conceptLabel: "Dizajn koncept",
    briefLabel: "Zadatak",
    solutionLabel: "Rješenje",
    includesLabel: "Sadrži",
    /* The question above the tab row, and the tablist's accessible name.
       `type` on each item is the answer: a barber has to be able to find
       "Barber" before reading a word. */
    tabsLabel: "Čime se baviš?",
    /* The second row, shown only for a trade with more than one project. */
    pickLabel: "Projekti",
    open: "Otvori demo",
    openLive: "Otvori sajt",
    /* Appended to the accessible name of a link that leaves the site. */
    newTab: "otvara se u novom prozoru",
    /* {name} is the project's name */
    phoneAlt: "{name} — početne stranice sajta na telefonu",
    /* Every project on the site lives under a trade, and a trade holds as
       many as belong to it. A visitor answers "čime se baviš" once and sees
       everything made for that kind of business — so a nail studio is not
       filed under the same key as a hair salon, and two barbershops are not
       two separate keys. */
    items: [
      {
        key: "villa",
        type: "Vila",
        projects: [
          {
            name: "Villa Vučje",
            slug: "villa-vucje",
            tag: "villavucje.me · Kolašin",
            href: "https://villavucje.me/",
            brief: "Kuća se izdavala samo preko Bookinga i Airbnb-ja — bez svoje adrese na internetu.",
            solution: "Sajt na svom domenu: kuća, galerija i lokacija, a rezervacija ide na Booking i Airbnb.",
            includes: ["Galerija", "Lokacija", "Rezervacija"],
          },
        ],
      },
      {
        key: "apartment",
        type: "Apartman",
        projects: [
          {
            name: "Mandarina",
            slug: "mandarina",
            tag: "mandarinapt.me · Petrovac na Moru",
            href: "https://mandarinapt.me/",
            brief: "Pogled na more i bazen su glavni argument, a u oglasu se gube među stotinu sličnih apartmana.",
            solution: "Sajt koji vodi kroz apartman, bazen i plažu, pa gost rezerviše preko Bookinga ili Airbnb-ja.",
            includes: ["Galerija", "Bazen i plaža", "Lokacija"],
          },
        ],
      },
      {
        key: "restaurant",
        type: "Restoran",
        projects: [
          {
            name: "Lucky Chopsticks",
            slug: "lucky-chopsticks",
            tag: "Azijski restoran · Podgorica",
            href: "/demo/lucky-chopsticks/",
            brief: "Gosti traže jelovnik i lokaciju prije nego odluče gdje idu večeras.",
            solution: "Meni po raspoloženju i izdvojena jela na jednoj stranici.",
            includes: ["Meni", "Specijaliteti", "Rezervacije"],
          },
          {
            name: "Konoba Skadar",
            slug: "konoba-skadar",
            tag: "Konoba · Virpazar",
            href: "/demo/konoba-skadar/",
            brief: "Gost bira mjesto sa telefona i traži jelovnik i slobodan sto.",
            solution: "Jelovnik po kategorijama, poziv i rezervacija na jedan dodir.",
            includes: ["Jelovnik", "Rezervacije", "Mapa"],
          },
        ],
      },
      {
        key: "barber",
        type: "Barber",
        projects: [
          {
            name: "Barber Drina",
            slug: "barber-drina",
            tag: "Barber · Stari Aerodrom",
            href: "/demo/barber-drina/",
            brief: "Cjenovnik živi u Instagram objavi koju gost mora da traži unazad.",
            solution: "Cjenovnik kao tabela i pomoćnik koji sastavi poruku za DM.",
            includes: ["Cjenovnik", "Termin preko DM-a", "Mapa"],
          },
          {
            name: "Barbershop Stari Grad",
            slug: "barbershop-stari-grad",
            tag: "Barber · Stara Varoš",
            href: "/demo/barbershop-stari-grad/",
            brief: "Zakazivanje ide preko Vibera, a cjenovnik nigdje ne stoji.",
            solution: "Cjenovnik, radno vrijeme i tim na jednoj stranici, Viber na klik.",
            includes: ["Cjenovnik", "Radno vrijeme", "Viber"],
          },
        ],
      },
      {
        key: "hair",
        type: "Frizerski salon",
        projects: [
          {
            name: "Andrea Beauty House",
            slug: "andrea-beauty-house",
            tag: "Salon, braids i kids · New City",
            href: "/demo/andrea-beauty-house/",
            brief: "Kuća vodi tri Instagram profila, pa gost ne zna koji je za šta.",
            solution: "Sajt kao hodnik sa troje vrata: salon, braids i kids, svako sa svojim profilom.",
            includes: ["Salon", "Braids", "Kids"],
          },
        ],
      },
      {
        key: "beauty",
        type: "Kozmetički salon",
        projects: [
          {
            name: "Studio ljepote Mila",
            slug: "studio-ljepote-mila",
            tag: "Kozmetika i PMU · City Kvart",
            href: "/demo/studio-ljepote-mila/",
            brief: "Tretmani, permanent makeup, edukacije i shop — četiri posla pod jednim imenom, razbacana po kanalima.",
            solution: "Stranica kao magazin: tri ulaza koji vode na tretmane, edukacije i shop koji već radi.",
            includes: ["Tretmani", "Edukacije", "Shop"],
          },
          {
            name: "Studio ljepote i zdravlja",
            slug: "studio-ljepote-zdravlja",
            tag: "Kozmetički studio · Zabjelo",
            href: "/demo/studio-ljepote-zdravlja/",
            brief: "Spisak tretmana ništa ne govori onome ko ne zna kako se šta zove.",
            solution: "Tretmani složeni po tome zbog čega se dolazi — lice, tijelo, masaže — a ne po nazivu.",
            includes: ["Lice", "Tijelo", "Masaže"],
          },
          {
            name: "LavLav",
            slug: "lavlav",
            tag: "Nail & beauty · Master kvart",
            href: "/demo/lavlav/",
            brief: "Zakazivanje već radi preko DIKIDI-ja, ali studio nema gdje da se predstavi.",
            solution: "Stranica koja predstavlja studio i vodi pravo u zakazivanje koje već postoji.",
            includes: ["Manikir", "Pedikir", "Zakazivanje"],
          },
        ],
      },
      {
        key: "tattoo",
        type: "Tattoo",
        projects: [
          {
            name: "Skyline Tattoo",
            slug: "skyline-tattoo",
            tag: "Tattoo i piercing · Podgorica",
            href: "/demo/skyline-tattoo/",
            brief: "Studio nema sajt — radovi stoje u Instagram highlightovima kroz koje se ne da tražiti.",
            solution: "Portfolio složen po studijskim highlightovima: Minimal, Bold i Piercings.",
            includes: ["Portfolio", "Piercing", "Instagram"],
          },
          {
            name: "KraftArt",
            slug: "kraftart",
            tag: "Tattoo i piercing · Masline",
            href: "/demo/kraftart/",
            brief: "Termin se dogovara kroz DM, Viber, WhatsApp i telefon, a nigdje ne piše šta studio radi.",
            solution: "Usluge, autori i adresa na jednoj stranici, sa svim kanalima za termin na dodir.",
            includes: ["Usluge", "Autori", "Termin"],
          },
        ],
      },
      {
        key: "pilates",
        type: "Pilates i joga",
        projects: [
          {
            name: "Soul Studio",
            slug: "soul-studio",
            tag: "Yoga & Reformer Pilates · Podgorica",
            href: "/demo/soul-studio/",
            brief: "Ko nije probao ni jedno ni drugo ne zna razliku, pa ne zna ni na šta da se prijavi.",
            solution: "Dvije prakse objašnjene jedna naspram druge, bez žargona i bez obećanja.",
            includes: ["Joga", "Reformer", "Kontakt"],
          },
          {
            name: "Telo Pilates Club",
            slug: "telo-pilates",
            tag: "Reformer pilates · Vektra",
            href: "/demo/telo-pilates/",
            brief: "Raspored i cijene žive u sistemu za zakazivanje, a niko ne zna šta tamo da izabere.",
            solution: "Formati objašnjeni prije rezervacije, pa gost bira u sistemu koji već radi.",
            includes: ["Formati", "Zakazivanje", "Instagram"],
          },
          {
            name: "Studio Pilates by Maja",
            slug: "pilates-by-maja",
            tag: "Grupni i personalni trening · Podgorica",
            href: "/demo/pilates-by-maja/",
            brief: "Raspored je Instagram objava koja se mijenja svake nedjelje.",
            solution: "Stranica objašnjava dvije vrste treninga i šalje na aktuelnu objavu sa terminima.",
            includes: ["Grupni", "Personalni", "Termini"],
          },
        ],
      },
      {
        key: "gym",
        type: "Teretana",
        projects: [
          {
            name: "Titan Gym",
            slug: "titan-gym",
            tag: "Teretana · Podgorica",
            href: "/demo/titan-gym/",
            brief: "Članarine i raspored treninga stalno se traže preko poruka.",
            solution: "Cjenovnik i raspored na sajtu, probni trening kao glavno dugme.",
            includes: ["Članarine", "Raspored", "Programi"],
          },
        ],
      },
      {
        key: "dentist",
        type: "Stomatolog",
        projects: [
          {
            name: "Dental Clinic Kovačević",
            slug: "dental-clinic-kovacevic",
            tag: "Stomatologija · Igalo i Zelenika",
            href: "/demo/dental-clinic-kovacevic/",
            brief: "Porodična ordinacija radi u dva grada, a na internetu postoji samo jedan Instagram.",
            solution: "Tri oblasti rada i tabla sa obje lokacije, a poruka ide na profil koji ordinacija sama vodi.",
            includes: ["Stomatologija", "Oralna hirurgija", "Estetski rad"],
          },
        ],
      },
    ],
  },
  process: {
    title: "Kako radimo",
    sub: "Od prve poruke do sajta koji radi, bez skrivenih faza.",
    /* Every step here is a thing that actually happens in this codebase or
       in the studio's own routine: the lead form and dashboard, the free
       concept, the private onboarding link with its "Nisam siguran" option,
       the review round the packages promise. Nothing is described that the
       site cannot do. Payment terms and maintenance are said once each, in
       the FAQ and under the prices. */
    windowTitle: "Od poruke do sajta — 4 koraka",
    steps: [
      {
        when: "Dan 1",
        title: "Javiš se",
        body: "Forma na sajtu, Instagram DM ili email — kako ti je lakše. Kažeš čime se baviš i šta ti treba, obično odgovorimo istog dana.",
      },
      {
        when: "Dan 1–2",
        title: "Besplatan koncept",
        body: "Pogledamo tvoj biznis, Instagram i konkurenciju, pa napravimo prvu skicu sajta. Ako ti se sviđa, biraš paket i tek tada se dogovaramo o cijeni.",
      },
      {
        when: "Dan 3–9",
        title: "Izrada",
        body: "Kroz kratak upitnik nam pošalješ logo, fotografije i tekst — gdje nisi siguran, klikneš „Nisam siguran“. Iz toga nastaje brief samo za tvoj sajt, pa dizajn i tehnika: prvo za telefon, brz i spreman za Google. Na kraju pregledaš i pošalješ primjedbe odjednom.",
      },
      {
        when: "Do 10. dana",
        title: "Online",
        body: "Sajt radi na tvom domenu i sve je tvoje. Ako ne želiš da misliš o tehnici, hosting i sitne izmjene možemo preuzeti mi.",
      },
    ],
  },

  pricing: {
    title: "Cijene",
    sub: "Jasne cijene, bez sitnih slova.",
    /* Names, taglines and badges only. The prices come from
       `src/lib/packages.ts` — a number in translated copy is a number that
       gets changed in one language and forgotten in the other. */
    plans: [
      {
        name: "Start",
        tagline:
          "Jedna stranica koja se skroluje — šta radiš, gdje si i kako da ti se jave, sve na jednom mjestu.",
        badge: null,
      },
      {
        name: "Biznis",
        tagline:
          "Kad sajt treba i da radi: do pet stranica, verzija na engleskom i rezervacije preko servisa koji već koristiš.",
        badge: "Preporučeno",
      },
      {
        name: "Projekat",
        tagline:
          "Za ono što ne staje u paket — prodavnica, povezivanje sa tvojim sistemima, više jezika. Konačna cijena zavisi od obima.",
        badge: null,
      },
    ],
    compare: {
      title: "Uporedi pakete",
      featureLabel: "Šta dobijaš",
      /* The single source of truth for what each package contains: the cards,
         the desktop table and the detail dialog all render these rows.
         `explain` is what the dialog shows under each line. */
      rows: [
        {
          label: "Dizajn po mjeri tvog brenda",
          values: [true, true, true],
          explain:
            "Boje, slova i raspored biraju se za tvoj biznis. Ne prilagođavamo gotov šablon — zato dva naša sajta ne izgledaju isto.",
        },
        {
          label: "Savršen na telefonu",
          values: [true, true, true],
          explain:
            "Sajt se prelama za telefon, tablet i računar. Većina tvojih posjetilaca dolazi sa telefona.",
        },
        {
          label: "Kontakt dugmad po izboru",
          values: [true, true, true],
          explain:
            "Dugmad koja vode direktno na Instagram, WhatsApp, Viber, poziv ili email — biraš koja ti trebaju.",
        },
        {
          label: "Galerija fotografija",
          values: [true, true, true],
          explain:
            "Tvoje fotografije obrađene tako da se otvaraju odmah i na slabom internetu, bez da izgube oštrinu.",
        },
        {
          label: "Google mapa i kontakt",
          values: [true, true, true],
          explain: "Mapa sa tačnom lokacijom tvog objekta, adresa i radno vrijeme.",
        },
        {
          label: "SEO i brzina",
          values: [true, true, true],
          explain:
            "Naslov, opis, sitemap i robots.txt da te Google pronađe; strukturirani podaci da zna šta si i kad radiš; kartice za dijeljenje na Instagramu, WhatsAppu i Viberu; i sajt koji se učitava odmah, i na slabom internetu. Ovo ide uz svaki sajt — nije doplata.",
        },
        {
          label: "Meni ili cjenovnik",
          values: [true, true, true],
          explain:
            "Meni ili cjenovnik kao pravi tekst, a ne slika — čitljiv na telefonu i lak za izmjenu.",
        },
        {
          label: "Online rezervacije",
          values: [false, true, true],
          explain:
            "Sajt se povezuje na servis za rezervacije koji već koristiš — DIKIDI, Google rezervacije ili sličan — pa gosti zakazuju bez izlaska sa sajta. Sopstveni sistem rezervacija, sa terminima i osobljem u našoj bazi, radi se kao Projekat.",
        },
        {
          label: "Verzija na engleskom",
          values: [false, true, true],
          explain:
            "Sajt na dva jezika, crnogorskom i engleskom, sa prebacivanjem i odvojenim adresama. Engleski tekst nam šalješ ti; ako ti treba i prevod, dogovaramo se posebno.",
        },
        {
          label: "Google Business profil",
          values: [false, true, true],
          explain:
            "Sređujemo tvoj profil na Google mapi — ili ga otvaramo ako ga nemaš: prava kategorija, radno vrijeme, usluge sa cijenama, fotografije i link na sajt. Tako te nađu kad ukucaju „frizer Podgorica“, a ne samo kad znaju tvoje ime.",
        },
        {
          label: "Broj stranica",
          values: ["1", "do 5", "po dogovoru"],
          explain:
            "Koliko odvojenih stranica sajt ima — na primjer Početna, Usluge, Galerija, Kontakt. Start je jedna stranica koja se skroluje: sve što ti treba stoji u sekcijama jedna ispod druge, a ne na posebnim adresama. Za većinu malih biznisa to radi posao.",
        },
        {
          label: "Krugovi izmjena",
          values: ["1", "2", "po dogovoru"],
          explain:
            "Koliko puta prolazimo kroz tvoje primjedbe poslije prve verzije. Sve u jednom krugu skupljaš i pošalješ odjednom, pa ih uradimo zajedno. Dodatni krugovi su mogući, dogovaramo se posebno.",
        },
        {
          label: "Prodavnica i naplata online",
          values: [false, false, true],
          explain:
            "Korpa, plaćanje karticom i pregled porudžbina — kad se sa sajta prodaje, a ne samo dogovara.",
        },
        {
          label: "Povezivanje sa tvojim sistemima",
          values: [false, false, true],
          explain:
            "Sajt povučen na ono što već koristiš — zalihe, kasu, sistem rezervacija ili evidenciju klijenata.",
        },
        {
          label: "Više od dva jezika",
          values: [false, false, true],
          explain: "Treći i svaki naredni jezik, sa zasebnim adresama koje Google odvojeno indeksira.",
        },
      ],
    },
    inherits: "Sve iz paketa {plan}, plus:",
    detailsAction: "Šta tačno dobijaš?",
    detailsIntro: "Sve iz ovog paketa, objašnjeno bez tehničkih riječi.",
    detailsIncluded: "Uključeno",
    detailsExcluded: "Nije u ovom paketu",
    detailsClose: "Zatvori",
    maintenance: {
      title: "Održavanje i hosting",
      optional: "Opciono",
      price: "€20/mjesec",
      intro:
        "Poslije objave sajt je tvoj i radi na tvom domenu. Ako ne želiš da razmišljaš o tehničkoj strani, tu brigu preuzimamo mi — prvi mjesec gratis, otkazuješ kad hoćeš.",
      includes: [
        "Hosting i briga o domenu",
        "Nadzor i tehnička ažuriranja",
        "Redovan backup",
        "Sitne izmjene sadržaja",
      ],
      note: "Pod sitnim izmjenama mislimo na tekst, cijene i fotografije — nove stranice i funkcionalnosti dogovaraju se posebno. Domen se naplaćuje zasebno, ~€25 godišnje.",
    },
    planAction: "Pitaj za ovaj paket",
    /* Said on the cards, because a price list that looks like a checkout is a
       price list people read as one. Nothing is bought here. */
    planNote: "Ništa se ne plaća preko sajta — prvo se dogovorimo šta ti treba.",
  },

  faq: {
    title: "Česta pitanja",
    items: [
      {
        q: "Koliko traje izrada?",
        a: "Do 10 dana od trenutka kada dobijemo materijale (tekst, fotografije, cjenovnik). Jednostavniji sajtovi budu gotovi i ranije; za obimnije projekte rok dogovaramo unaprijed.",
      },
      {
        q: "Treba li mi domen i hosting?",
        a: "Sve možemo srediti mi: domen je ~€25 godišnje, a hosting je uključen u opciono održavanje. A ako želiš da se o hostingu brineš sam, sajt i domen su tvoji — predamo ti sve što treba.",
      },
      {
        q: "Da li moram uzeti održavanje?",
        a: "Ne. Sajt je tvoj i radi na tvom domenu, bez ikakve obavezne pretplate kod nas. Održavanje od €20 mjesečno je opcija za one koji ne žele da se bave tehničkom stranom — hosting, nadzor, backup i sitne izmjene sadržaja. Otkazuješ kad god hoćeš.",
      },
      {
        q: "Već imam sajt. Možete li ga prepraviti?",
        a: "Da — redizajn je naša specijalnost. Pošalji link, dobijaš besplatan koncept novog sajta bez obaveze.",
      },
      {
        q: "Kako izgleda plaćanje?",
        a: "50% na početku, 50% kad je sajt gotov i kad si zadovoljan. Bez skrivenih troškova.",
      },
      {
        q: "Mogu li sam da mijenjam sadržaj?",
        a: "Sajt nema admin panel — to ga čini brzim i sigurnim, ali znači da se cijene, tekst i fotografije ne mijenjaju sami. Sitne izmjene ulaze u održavanje od €20 mjesečno; bez održavanja, javiš se i dogovorimo se po izmjeni. Ako ti treba da sam upravljaš sadržajem svaki dan, to je Projekat i kažemo ti unaprijed.",
      },
      {
        q: "Ko piše tekstove i ko slika?",
        a: "Tekst pišemo mi, iz onoga što nam kažeš u upitniku — ti ga samo pregledaš i ispraviš. Fotografije su tvoje: ono što već imaš, sa telefona ili od fotografa. Obradimo ih da se brzo otvaraju. Ako nemaš nijednu, kažemo ti šta i kako da slikaš.",
      },
      {
        q: "Šta ako nemam logo?",
        a: "Nije prepreka. Za Start i Biznis napravimo jednostavan tekstualni znak od imena biznisa, u boji i slovima sajta — dovoljno za sajt, Google profil i Instagram. Pravi logo sa više varijanti radi se posebno, ako ti zatreba.",
      },
    ],
  },

  contact: {
    title: "Spreman za novi sajt?",
    sub: "Ostavi par podataka, ili nam piši direktno — kako ti je lakše.",
    /* The right-hand column of the contact window: the other ways in, and
       what happens after the visitor writes. */
    direct: {
      title: "Ili piši direktno",
      whatsapp: "WhatsApp",
      instagram: "Instagram DM",
      email: "Email",
      whatsappPrefill: "Zdravo! Zanima me sajt za moj biznis. Možemo li da se čujemo oko ponude?",
      pointsTitle: "Šta se dešava dalje",
      points: [
        "Odgovorimo isti dan, najkasnije sjutra.",
        "Dobiješ besplatan koncept — skicu sajta prije bilo kakve odluke.",
        "Dogovorimo paket i cijenu.",
      ],
    },
    prefill: "Zdravo! Zanima me sajt za moj biznis. Možemo li da se čujemo oko ponude?",
    emailSubject: "Sajt za moj biznis",
    lead: {
      /* The badge keeps the offer, the button says what pressing it does.
         Splitting them is deliberate: "besplatan koncept" is why anyone fills
         this in, and "zatraži ponudu" is honest about what arrives next. */
      eyebrow: "Besplatan koncept",
      nameLabel: "Ime",
      namePlaceholder: "Kako da te zovemo",
      businessLabel: "Naziv biznisa",
      businessPlaceholder: "Ime radnje, salona, kafane…",
      emailLabel: "Email",
      emailPlaceholder: "ime@primjer.me",
      phoneLabel: "Telefon",
      phonePlaceholder: "067 123 456",
      linkLabel: "Sajt ili Instagram",
      linkPlaceholder: "tvoj-sajt.me ili @instagram",
      needLabel: "Šta ti treba",
      /* Keys are the values in LEAD_NEEDS (src/lib/workflow.ts). */
      needOptions: {
        "new-site": "Novi sajt",
        redesign: "Redizajn postojećeg",
        shop: "Online prodavnica",
        "something-else": "Nešto drugo",
        "not-sure": "Još ne znam",
      },
      messageLabel: "Ukratko o biznisu",
      messagePlaceholder: "Čime se baviš i šta bi sajt trebalo da radi.",
      optional: "opciono",
      submit: "Zatraži ponudu",
      sending: "Šaljem…",
      success: "Primljeno. Javimo se na email koji si ostavio, obično istog dana.",
      errorRequired: "Treba nam tvoje ime i email na koji da ti odgovorimo.",
      errorPhone: "Provjeri broj telefona, ili ostavi polje prazno.",
      errorChallenge: "Sačekaj sekundu da se provjera završi, pa pošalji ponovo.",
      errorOffline: "Nema veze sa internetom. Provjeri konekciju i probaj ponovo.",
      errorSpam: "Previše pokušaja u kratkom roku. Sačekaj minut i probaj ponovo.",
      errorProvider: "Slanje trenutno ne radi. Pošalji nam email — sve što si upisao već je unutra.",
      submitInstagram: "Otvori Instagram DM",
      submitInstagramCopied: "Poruka kopirana — otvori Instagram",
      copied: "Poruka je kopirana — samo je nalijepi u Instagram DM.",
      note: "Bez obaveze — kad odgovorimo, ti odlučuješ kako dalje.",
      emailFallbackAction: "Pošalji email umjesto toga",
      /* {link} is replaced with whatever the visitor typed */
      prefill: "Zdravo! Ovo je moj biznis: {link} — može ponuda za sajt?",
      /* Vaky's speech bubble beside the form. Split so the offer can be set
         in red without concatenating sentences in the component. */
      bubble: { pre: "Kaži čime se baviš, ", em: "ostalo", post: " je na nama." },
    },
  },

  footer: {
    tagline: "Izrada sajtova i web dizajn u Crnoj Gori. Sajtovi koji donose klijente.",
    rights: "Sva prava zadržana.",
    privacy: "Privatnost",
  },

  /* Sections marked `when` are rendered only if that service is actually
     configured in this build — a privacy page that lists tools the site does
     not use is as wrong as one that hides tools it does. */
  privacy: {
    title: "Privatnost",
    updated: "Ažurirano 31. avgusta 2026.",
    intro:
      "Ovaj sajt je vizit-karta jednog malog studija. Nema naloga, nema prijave i ne prodajemo ništa preko sajta — pa nema ni razloga da o tebi znamo išta više nego što nam sam pošalješ.",
    sections: [
      {
        when: "always",
        title: "Ko obrađuje podatke",
        body: [
          "Vaky, web studio iz Crne Gore. Za sva pitanja o podacima piši na vakymne@gmail.com.",
        ],
      },
      {
        when: "form",
        title: "Kada pošalješ upit preko sajta",
        body: [
          "Forma ide na naš server kod Cloudflare-a i upit se čuva u našoj bazi. Šalje se samo ono što si upisao: ime, naziv biznisa, email, telefon, link, šta ti treba i tvoja poruka — plus jezik stranice. Kopiju istog upita dobijemo i na email.",
          "Koristimo to isključivo da bismo ti odgovorili i napravili ponudu. Ne šaljemo newsletter, ne dijelimo kontakte sa trećim licima i ne koristimo ih za reklame. Upit brišemo kada prepiska bude gotova, najkasnije godinu dana od slanja; brisanje možeš tražiti i ranije, na vakymne@gmail.com.",
          "Preko sajta se ništa ne plaća i ne tražimo podatke o kartici. Da bismo formu zaštitili od zloupotrebe, bilježimo nepovratno kodiran zapis IP adrese kako bismo ograničili broj pokušaja — iz njega se tvoja adresa ne može pročitati.",
        ],
      },
      {
        when: "always",
        title: "Kada pišeš emailom",
        body: [
          "Dugme na sajtu samo otvara tvoj email program sa unaprijed napisanom porukom — sadržaj te poruke sajt ne vidi i nigdje je ne bilježi. Dalje važe pravila tvog email provajdera.",
        ],
      },
      {
        when: "always",
        title: "Kada popunjavate obrazac za pokretanje projekta",
        body: [
          "Kada se dogovorimo oko posla, pošaljemo vam lični link za upitnik i tu nam šaljete podatke potrebne za izradu sajta. Šalje se samo ono što sami upišete i priložite: naziv biznisa, vaše ime, email, telefon, odgovori na pitanja i fajlovi koje odaberete.",
          "Odgovori se čuvaju u našoj bazi kod Cloudflare-a, a fajlovi u privatnom prostoru za skladištenje kojem se ne može pristupiti sa interneta bez potpisanog linka koji ističe. Koristimo ih isključivo da bismo izradili vaš sajt — ne dijelimo ih ni sa kim i ne koristimo za reklame. Čuvamo ih dok traje saradnja i najviše godinu dana poslije toga; brisanje možete tražiti i ranije, na vakymne@gmail.com.",
          "Dok popunjavate, odgovori se čuvaju u memoriji vašeg pregledača da ih ne izgubite ako zatvorite stranicu. To ostaje na vašem uređaju, briše se čim pošaljete, i nije kolačić. Fajlovi se tu nikada ne čuvaju.",
          "Nikada ne tražimo lozinke. Da bismo obrazac zaštitili od zloupotrebe, bilježimo nepovratno kodiran zapis IP adrese kako bismo ograničili broj pokušaja — iz njega se vaša adresa ne može pročitati i ne povezuje se sa vašim odgovorima.",
        ],
      },
      {
        when: "turnstile",
        title: "Provjera protiv spama",
        body: [
          "Formu štiti Cloudflare Turnstile. Provjera se učitava tek kada počneš da popunjavaš polja, i tada Cloudflare vidi tvoju IP adresu i osnovne podatke o pregledaču kako bi razlikovao čovjeka od bota. Turnstile može postaviti tehnički kolačić za tu provjeru.",
        ],
      },
      {
        when: "analytics",
        title: "Statistika posjeta",
        body: [
          "Koristimo Umami — brojač posjeta bez kolačića. Bilježi se koja stranica je otvorena, sa kog sajta si došao, gruba lokacija na nivou države i tip uređaja. Ne bilježi se IP adresa, ne pravi se profil o tebi i ne prati te se sa sajta na sajt.",
          "Upiti iz adrese (sve poslije znaka ?) se ne čuvaju, a ako je u pregledaču uključen „Do Not Track“, ne bilježi se ništa. Ono što upišeš u formu nikada se ne šalje u statistiku.",
        ],
      },
      {
        when: "cloudflare",
        title: "Cloudflare mjerenje posjeta",
        body: [
          "Sajt ide preko Cloudflare-a, koji na svaku stranicu dodaje svoj brojač posjeta. On ne postavlja kolačiće i ne pravi profil o posjetiocu — mjeri broj otvaranja stranice i osnovne podatke o učitavanju. Podaci ostaju kod Cloudflare-a, po njihovim pravilima.",
        ],
      },
      {
        when: "always",
        title: "Google mape na demo stranicama",
        body: [
          "Mapa na demo stranicama se ne učitava sama. Dok ne pritisneš „Prikaži mapu“, Google ne dobija nijedan zahtjev sa ove stranice. Kada je otvoriš, Google vidi tvoju IP adresu i podatke o pregledaču, po svojim pravilima.",
        ],
      },
      {
        when: "always",
        title: "Kolačići",
        body: [
          "Sajt sam ne postavlja kolačiće i nema banner za pristanak, jer nema šta da traži pristanak za.",
        ],
      },
      {
        when: "always",
        title: "Demo stranice",
        body: [
          "Radovi pod /demo/ su dizajn koncepti. Kontakt podaci na njima su primjeri, osim ako vlasnik biznisa nije izričito tražio da stoje pravi.",
        ],
      },
    ],
  },

  /* One page per kind of business, at /sajt-za-…/. Each is the landing page
     answered for that trade: what such a site has to do, the projects made
     for it, the same price and the same form. Nothing here is a claim the
     landing page does not already make. `key` matches `work.items[].key`. */
  trades: {
    eyebrow: "Sajt za tvoju djelatnost",
    examplesTitle: "Šta smo napravili",
    examplesSub: "Neki primjeri su sajtovi koji već rade uživo, ostali su koncepti napravljeni za konkretan biznis. Otvori ih na telefonu.",
    needsTitle: "Šta takav sajt treba da ima",
    priceTitle: "Cijena i rok",
    priceBody: "Start paket je €200 i online je do 10 dana. Prije plaćanja dobijaš besplatan koncept, pa vidiš kako bi sajt izgledao prije nego što odlučiš.",
    priceLink: "Pogledaj sve pakete",
    othersTitle: "Druge djelatnosti",
    items: {
      villa: {
        slug: "sajt-za-vile",
        title: "Sajt za vilu ili kuću za odmor",
        metaTitle: "Sajt za vilu — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za vilu ili kuću za odmor u Crnoj Gori. Galerija, lokacija i rezervacija na svom domenu, uz Booking i Airbnb. Od €200, besplatan koncept.",
        intro: "Kuća koja se izdaje samo preko Bookinga i Airbnb-ja dijeli stranicu sa hiljadu sličnih i plaća proviziju na svaku noć. Sajt na svom domenu je adresa koju gost pamti i na koju se vraća sljedeće ljeto.",
        needs: [
          { title: "Galerija koja prodaje", body: "Velike fotografije kuće, dvorišta i pogleda, poređane onako kako gost razgleda." },
          { title: "Lokacija i okolina", body: "Mapa, udaljenost do plaže ili planine, šta ima u blizini." },
          { title: "Rezervacija bez tabele", body: "Dugme koje vodi na Booking, Airbnb ili direktno na tvoj Viber i WhatsApp." },
          { title: "Dva jezika", body: "Crnogorski i engleski, jer gosti dolaze iz cijele Evrope." },
        ],
      },
      apartment: {
        slug: "sajt-za-apartmane",
        title: "Sajt za apartmane",
        metaTitle: "Sajt za apartmane — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za apartmane u Crnoj Gori. Galerija, bazen i plaža, lokacija i rezervacija preko Bookinga ili direktno. Od €200, besplatan koncept.",
        intro: "U oglasu se apartman gubi među stotinu sličnih, a ono što ga izdvaja, pogled, bazen, blizina plaže, stane u dvije fotografije. Na svom sajtu to postaje cijela priča, a rezervacija i dalje ide gdje ti odgovara.",
        needs: [
          { title: "Ono što izdvaja", body: "Pogled, bazen, terasa ili plaža na pet koraka, prvo i najveće na stranici." },
          { title: "Apartmani pojedinačno", body: "Svaki sa svojim fotografijama, brojem kreveta i onim što uključuje." },
          { title: "Rezervacija", body: "Booking, Airbnb ili direktan upit preko Vibera i WhatsAppa, kako ti odgovara." },
          { title: "Dva jezika", body: "Crnogorski i engleski, sa cijenama i sezonama koje se lako ažuriraju." },
        ],
      },
      restaurant: {
        slug: "sajt-za-restorane",
        title: "Sajt za restoran",
        metaTitle: "Sajt za restoran — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za restoran ili konobu u Crnoj Gori. Meni koji se čita na telefonu, rezervacija na klik, radno vrijeme i mapa. Od €200, besplatan koncept.",
        intro: "Gost prije dolaska traži tri stvari: meni, radno vrijeme i kako da rezerviše sto. Ako to mora da traži po Instagramu, često ode dalje. Sajt to daje na jednom mjestu, i na telefonu.",
        needs: [
          { title: "Meni koji se čita na telefonu", body: "Jela i cijene kao tekst, ne kao fotografija jelovnika koju treba zumirati." },
          { title: "Rezervacija na klik", body: "Poziv ili WhatsApp poruka jednim dodirom, bez forme na pet polja." },
          { title: "Radno vrijeme i mapa", body: "Kad ste otvoreni i kako se stiže, uključujući parking." },
          { title: "Fotografije jela i prostora", body: "Ono što gost zamišlja prije nego što dođe." },
        ],
      },
      barber: {
        slug: "sajt-za-barbershop",
        title: "Sajt za barbershop",
        metaTitle: "Sajt za barbershop — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za barbershop u Crnoj Gori. Radovi, cjenovnik i zakazivanje termina preko Instagrama, Vibera ili online. Od €200, besplatan koncept.",
        intro: "Mušterija bira barbera po slikama, a zakazuje porukom. Sajt skupi oboje: radove, cjenovnik i dugme za zakazivanje koje vodi na Instagram, Viber ili online termine.",
        needs: [
          { title: "Radovi u galeriji", body: "Frizure i brade u punoj veličini, ne u Instagram gridu." },
          { title: "Cjenovnik usluga", body: "Šišanje, brada, kombinacija, sa cijenama koje se mijenjaju na jednom mjestu." },
          { title: "Zakazivanje termina", body: "Instagram DM, Viber ili online planer, kako već radiš." },
          { title: "Lokacija i radno vrijeme", body: "Mapa i sati, jer je to drugo pitanje poslije cijene." },
        ],
      },
      hair: {
        slug: "sajt-za-frizere",
        title: "Sajt za frizerski salon",
        metaTitle: "Sajt za frizerski salon — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za frizerski salon u Crnoj Gori. Cjenovnik po uslugama, radovi, tim i zakazivanje preko poziva, Vibera ili Instagrama. Od €200, besplatan koncept.",
        intro: "Frizerski salon živi od preporuke i od Instagrama. Sajt je mjesto na koje ta preporuka vodi: cjenovnik, radovi, tim i dugme za zakazivanje, bez skrolovanja kroz stotinu objava.",
        needs: [
          { title: "Cjenovnik po uslugama", body: "Šišanje, farbanje, tretmani, sa cijenama koje klijentkinja vidi prije poruke." },
          { title: "Radovi i tim", body: "Ko radi u salonu i šta radi najbolje, uz fotografije radova." },
          { title: "Zakazivanje", body: "Poziv, Viber ili Instagram DM jednim dodirom." },
          { title: "Lokacija i radno vrijeme", body: "Mapa, sati i kako doći, uključujući parking." },
        ],
      },
      beauty: {
        slug: "sajt-za-kozmeticki-salon",
        title: "Sajt za kozmetički salon",
        metaTitle: "Sajt za kozmetički salon — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za kozmetički salon u Crnoj Gori. Tretmani i cijene, galerija, tim i zakazivanje preko Instagrama ili Vibera. Od €200, besplatan koncept.",
        intro: "Tretmani, cijene i ko ih radi, to klijentkinja želi da zna prije nego što pošalje poruku. Sajt to složi pregledno, a zakazivanje ostaje na Instagramu ili Viberu ako ti tako odgovara.",
        needs: [
          { title: "Tretmani i cijene", body: "Po kategorijama, sa trajanjem i cijenom, bez PDF cjenovnika." },
          { title: "Galerija radova", body: "Nokti, trepavice, tretmani lica, ono po čemu te biraju." },
          { title: "Tim", body: "Ko radi šta, sa fotografijom i kratkom rečenicom." },
          { title: "Zakazivanje", body: "Instagram DM, Viber ili poziv jednim dodirom." },
        ],
      },
      tattoo: {
        slug: "sajt-za-tattoo-studio",
        title: "Sajt za tattoo studio",
        metaTitle: "Sajt za tattoo studio — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za tattoo studio u Crnoj Gori. Portfolio po artistu i stilu, cijene od, upit za termin i njega tetovaže. Od €200, besplatan koncept.",
        intro: "Za tattoo studio portfolio je sve. Sajt ga pokazuje u punoj veličini, po artistu i po stilu, i vodi do upita za termin, umjesto da se radovi gube u Instagram gridu.",
        needs: [
          { title: "Portfolio po artistu", body: "Svaki artist sa svojim radovima i stilom, u punoj veličini." },
          { title: "Stilovi i cijene od", body: "Šta radite i od koliko, da upit stigne od nekoga ko zna šta traži." },
          { title: "Upit za termin", body: "Forma sa opisom i slikom ideje, ili direktno Instagram DM." },
          { title: "Njega tetovaže i pitanja", body: "Ono što svakom klijentu objašnjavate iznova, napisano jednom." },
        ],
      },
      pilates: {
        slug: "sajt-za-pilates-studio",
        title: "Sajt za pilates ili joga studio",
        metaTitle: "Sajt za pilates studio — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za pilates ili joga studio u Crnoj Gori. Raspored časova, cijene i paketi, instruktori i prijava za probni čas. Od €200, besplatan koncept.",
        intro: "Novi polaznik prvo traži raspored, cijenu mjesečne karte i gdje je studio. Sajt odgovara na sva tri prije poruke, a instruktore i prostor pokazuje onako kako ih vidi neko ko prvi put ulazi.",
        needs: [
          { title: "Raspored časova", body: "Po danima i tipu časa, čitljiv na telefonu." },
          { title: "Cijene i paketi", body: "Pojedinačni čas, mjesečna karta, paketi, na jednom mjestu." },
          { title: "Instruktori i prostor", body: "Ko vodi časove i kako studio izgleda iznutra." },
          { title: "Prijava za probni čas", body: "Poruka ili poziv jednim dodirom, bez registracije." },
        ],
      },
      gym: {
        slug: "sajt-za-teretane",
        title: "Sajt za teretanu",
        metaTitle: "Sajt za teretanu — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za teretanu u Crnoj Gori. Članarine, radno vrijeme, prostor i oprema, treneri i prijava. Od €200, besplatan koncept.",
        intro: "Teretana se bira po cijeni, radnom vremenu i tome kako izgleda unutra. Sajt to daje bez poziva: članarine, sprave, treneri i dugme za prijavu.",
        needs: [
          { title: "Članarine", body: "Mjesečna, tromjesečna, studentska, sa cijenama koje se mijenjaju na jednom mjestu." },
          { title: "Radno vrijeme", body: "Uključujući praznike i vikend, jer je to prvo što se provjerava." },
          { title: "Prostor i oprema", body: "Fotografije sale i sprava, ono što se gleda prije prve posjete." },
          { title: "Treneri i programi", body: "Ko radi i šta nudi, od personalnih treninga do grupnih." },
        ],
      },
      dentist: {
        slug: "sajt-za-stomatologe",
        title: "Sajt za stomatološku ordinaciju",
        metaTitle: "Sajt za stomatologa — od €200, online do 10 dana | Vaky",
        description: "Izrada sajta za stomatološku ordinaciju u Crnoj Gori. Usluge i cjenovnik, tim, zakazivanje pregleda, lokacija. Od €200, besplatan koncept.",
        intro: "Pacijent bira ordinaciju po povjerenju: ko je doktor, koje usluge radi, koliko košta i kako da zakaže. Sajt to kaže mirno i jasno, bez agresivne prodaje.",
        needs: [
          { title: "Usluge i cjenovnik", body: "Od pregleda do implantata, sa cijenama ili rasponom cijena." },
          { title: "Tim ordinacije", body: "Doktori sa fotografijom, specijalizacijom i iskustvom." },
          { title: "Zakazivanje pregleda", body: "Poziv, Viber ili forma, sa radnim vremenom uz dugme." },
          { title: "Lokacija i parking", body: "Mapa i kako doći, jer se pacijenti vraćaju godinama." },
        ],
      },
    },
  },

  meta: {
    title: "Izrada sajtova Crna Gora — od €200, online do 10 dana | Vaky",
    description:
      "Izrada sajtova i web dizajn u Crnoj Gori. Moderan sajt za tvoj biznis — od €200, online u roku od 10 dana. Besplatan koncept prije plaćanja. Vaky, Podgorica.",
    /* JSON-LD serviceType entries — what the studio does, for search engines */
    serviceTypes: ["Izrada sajtova", "Web dizajn", "Održavanje sajtova"],
  },
} as const;
