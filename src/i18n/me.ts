export const me = {
  lang: "me",
  htmlLang: "sr-ME",

  nav: {
    work: "Radovi",
    pricing: "Cijene",
    contact: "Kontakt",
    cta: "Zakaži koncept",
    langLabel: "EN",
    langHref: "/en/",
  },

  hero: {
    eyebrow: "Web studio — Podgorica",
    titleA: "Sajtovi koji",
    titleB: "donose klijente.",
    sub: "Dizajniramo i izrađujemo sajtove po mjeri — za restoran, teretanu, ordinaciju, agenciju ili bilo koji drugi posao.",
    offer: "Vodimo posao od prve skice do objave, i održavamo sajt poslije. Rok izrade je do 10 dana, cijena od €100.",
    ctaPrimary: "Zatraži besplatan koncept",
    ctaSecondary: "Pogledaj radove",
    proof: [
      "Napravljen za telefon",
      "Osnovni SEO uključen",
      "Domena i objava sređeni",
    ],
    concept: {
      eyebrow: "Besplatan koncept",
      title: "Već imaš sajt ili Instagram?",
      body: "Pošalji nam link i vidiš kako bi tvoj biznis mogao da izgleda — prije nego što platiš i cent.",
      placeholder: "tvoj-sajt.me ili @instagram",
      submitEmail: "Pošalji email",
      submitInstagram: "Otvori Instagram DM",
      submitInstagramCopied: "Poruka kopirana — otvori Instagram",
      copied: "Poruka je kopirana — samo je nalijepi u Instagram DM.",
      note: "Email se otvara sa tvojim linkom već upisanim. Javimo se u najkraćem roku.",
      emailFallback: "Ne otvara ti se email program?",
      emailFallbackAction: "Otvori Gmail u browseru",
      /* {link} is replaced with whatever the visitor typed */
      prefill: "Zdravo! Ovo je moj sajt/Instagram: {link} — može besplatan koncept?",
    },
  },

  work: {
    title: "Radovi",
    sub: "Interaktivni dizajn koncepti — otvori ih i probaj na svom telefonu.",
    conceptLabel: "Dizajn koncept",
    items: [
      {
        name: "Konoba Skadar",
        tag: "Restoran",
        href: "/demo/konoba-skadar/",
      },
      {
        name: "Titan Gym",
        tag: "Teretana",
        href: "/demo/titan-gym/",
      },
      {
        name: "Barbershop Stari Grad",
        tag: "Frizer",
        href: "/demo/barbershop-stari-grad/",
      },
      {
        name: "Barber Drina",
        tag: "Barber · Stari Aerodrom",
        href: "/demo/barber-drina/",
      },
    ],
  },

  why: {
    title: "Zašto VibeLab?",
    sub: "Jednostavan proces, jasan dogovor i sajt spreman da radi za tvoj biznis.",
    items: [
      {
        title: "Prvo vidiš koncept",
        body: "Dobiješ početni pravac dizajna prije nego što se obavežeš.",
      },
      {
        title: "Jasan obim i cijena",
        body: "Znaš šta paket uključuje i koliko košta prije početka rada.",
      },
      {
        title: "Sve sređujemo",
        body: "Dizajn, sadržaj, domena, objava i tehničko održavanje na jednom mjestu.",
      },
      {
        title: "Bez vezivanja",
        body: "Održavanje je bez ugovorne obaveze i može se prekinuti.",
      },
    ],
  },

  process: {
    title: "Kako radimo",
    steps: [
      {
        day: "Dan 1",
        title: "Javiš se",
        body: "Instagram DM ili email. Kažeš nam čime se baviš i šta ti treba.",
      },
      {
        day: "Dan 1–2",
        title: "Besplatan koncept",
        body: "Napravimo skicu tvog sajta — prije nego što platiš i cent.",
      },
      {
        day: "Dan 3–9",
        title: "Izrada",
        body: "Dizajn, tekst, fotografije i tehnika. Ti se baviš svojim poslom.",
      },
      {
        day: "Do 10. dana",
        title: "Online",
        body: "Sajt je na tvom domenu. Dalje ga mi održavamo.",
      },
    ],
  },

  pricing: {
    title: "Cijene",
    sub: "Jasne cijene, bez sitnih slova.",
    plans: [
      {
        name: "Start",
        price: "€100",
        tagline: "Sve najvažnije na jednoj stranici.",
        badge: null,
      },
      {
        name: "Biznis",
        price: "€200",
        tagline: "Kompletan sajt za tvoju firmu.",
        badge: "Najtraženiji",
      },
      {
        name: "Premium",
        price: "od €350",
        tagline: "Dizajn po mjeri i funkcije koje ti trebaju.",
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
          label: "Broj stranica",
          values: ["1", "do 5", "po dogovoru"],
          explain:
            "Koliko odvojenih stranica sajt ima — na primjer Početna, Usluge, Galerija, Kontakt.",
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
          label: "Google mapa i kontakt",
          values: [true, true, true],
          explain: "Mapa sa tačnom lokacijom tvog objekta, adresa i radno vrijeme.",
        },
        {
          label: "Osnovni SEO",
          values: [true, true, true],
          explain:
            "Naslov, opis, sitemap i robots.txt — ono što je potrebno da Google može da pronađe i indeksira sajt.",
        },
        {
          label: "Meni ili cjenovnik",
          values: [false, true, true],
          explain:
            "Meni ili cjenovnik kao pravi tekst, a ne slika — čitljiv na telefonu i lak za izmjenu.",
        },
        {
          label: "Galerija fotografija",
          values: [false, true, true],
          explain: "Galerija sa fotografijama pripremljenim tako da se brzo učitavaju.",
        },
        {
          label: "Verzija na engleskom",
          values: [false, true, true],
          explain: "Kompletan prevod sajta i prebacivanje jezika za goste iz inostranstva.",
        },
        {
          label: "Dizajn po mjeri",
          values: [false, false, true],
          explain: "Dizajn rađen za tvoj brend, umjesto prilagođavanja gotovog šablona.",
        },
        {
          label: "Online rezervacije",
          values: [false, false, true],
          explain: "Forma preko koje gosti ostavljaju zahtjev za termin ili rezervaciju.",
        },
        {
          label: "Napredni SEO",
          values: [false, false, true],
          explain:
            "Strukturirani podaci, kartice za dijeljenje na društvenim mrežama i optimizacija brzine učitavanja.",
        },
      ],
    },
    detailsAction: "Šta tačno dobijaš?",
    detailsIntro: "Sve iz ovog paketa, objašnjeno bez tehničkih riječi.",
    detailsIncluded: "Uključeno",
    detailsExcluded: "Nije u ovom paketu",
    detailsClose: "Zatvori",
    maintenance: {
      title: "Održavanje i hosting",
      price: "€20/mjesečno",
      body: "Prvi mjesec gratis, bez ugovorne obaveze.",
    },
    addons: "Dodaci se dogovaraju posebno, prema tome šta ti zaista treba.",
    planAction: "Odaberi paket",
    packagePrefill:
      "Zdravo! Zanima me {package} paket za moj biznis. Možemo li dogovoriti detalje?",
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
        a: "Sve sređujemo mi. Domen je ~€25 godišnje, a hosting je uključen u održavanje. Ti ne moraš ništa tehničko da znaš.",
      },
      {
        q: "Već imam sajt. Možete li ga prepraviti?",
        a: "Da — redizajn je naša specijalnost. Pošalji link, dobijaš besplatan koncept novog sajta bez obaveze.",
      },
      {
        q: "Kako izgleda plaćanje?",
        a: "50% na početku, 50% kad je sajt gotov i kad si zadovoljan. Bez skrivenih troškova.",
      },
    ],
  },

  contact: {
    title: "Spreman za novi sajt?",
    sub: "Pošalji Instagram DM ili email — obično odgovorimo istog dana.",
    action: "Piši nam na Instagramu",
    instagram: "Instagram",
    emailLabel: "Email",
    prefill: "Zdravo! Zanima me sajt za moj biznis. Mogu li dobiti besplatan koncept?",
    emailSubject: "Sajt za moj biznis",
  },

  footer: {
    tagline: "Web studio iz Podgorice. Sajtovi koji donose klijente.",
    rights: "Sva prava zadržana.",
  },

  fab: "Piši nam na Instagramu",

  meta: {
    title: "VibeLab — Sajtovi koji donose klijente | Web studio Podgorica",
    description:
      "Dizajn i izrada sajtova po mjeri — rok do 10 dana, cijena od €100. Web studio iz Podgorice. Besplatan koncept prije nego što išta platiš.",
  },
} as const;
