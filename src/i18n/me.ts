export const me = {
  lang: "me",
  htmlLang: "sr-ME",

  nav: {
    work: "Radovi",
    pricing: "Cijene",
    contact: "Kontakt",
    langLabel: "EN",
    langHref: "/en/",
  },

  hero: {
    eyebrow: "Web studio — Podgorica",
    titleA: "Sajtovi koji",
    titleB: "donose klijente.",
    sub: "Brz, moderan sajt za tvoj biznis — gotov za 7 dana, od €100.",
    ctaPrimary: "Piši nam na Instagramu",
    ctaSecondary: "Pogledaj radove",
    proof: [
      "Savršen na telefonu",
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
      note: "Email se otvara sa tvojim linkom već upisanim. Javimo se isti dan.",
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
        body: "Napravimo ti skicu novog sajta — prije nego što platiš i cent.",
      },
      {
        day: "Dan 2–6",
        title: "Izrada",
        body: "Dizajn, tekst, fotografije, objava. Ti se baviš svojim poslom.",
      },
      {
        day: "Dan 7",
        title: "Online",
        body: "Sajt je na tvom domenu i radi za tebe. Mi ga održavamo dalje.",
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
        tagline: "Jedna stranica koja prodaje.",
        features: [
          "Jedna moderna stranica",
          "Savršen na telefonu",
          "Kontakt dugmad po izboru",
          "Google mapa i kontakt",
          "Osnovni SEO",
        ],
        badge: null,
      },
      {
        name: "Biznis",
        price: "€200",
        tagline: "Kompletan sajt za mali biznis.",
        features: [
          "Sve iz Start paketa",
          "Do 5 stranica",
          "Meni ili cjenovnik",
          "Galerija fotografija",
          "Google Business profil",
        ],
        badge: "Najtraženiji",
      },
      {
        name: "Premium",
        price: "od €350",
        tagline: "Za one koji žele sve.",
        features: [
          "Sve iz Biznis paketa",
          "Dizajn po mjeri",
          "Verzija na engleskom",
          "Online rezervacije",
          "Napredni SEO",
        ],
        badge: null,
      },
    ],
    compare: {
      title: "Uporedi pakete",
      featureLabel: "Šta dobijaš",
      /* Derived from the three plan feature lists above — a plan's "Sve iz X
         paketa" line is expanded here so nobody has to hold two lists in their
         head. `explain` is what the detail dialog shows. */
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
          label: "Google Business profil",
          values: [false, true, true],
          explain:
            "Postavljanje ili sređivanje profila koji se pojavljuje u Google pretrazi i na Google mapama.",
        },
        {
          label: "Dizajn po mjeri",
          values: [false, false, true],
          explain: "Dizajn rađen za tvoj brend, umjesto prilagođavanja gotovog šablona.",
        },
        {
          label: "Verzija na engleskom",
          values: [false, false, true],
          explain: "Kompletan prevod sajta i prebacivanje jezika za goste iz inostranstva.",
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
      title: "Održavanje i hosting — €20/mjesečno",
      body: "prvi mjesec gratis, bez ugovorne obaveze.",
    },
    addonsTitle: "Dodaci",
    addons: [
      "Engleska verzija +€80",
      "Google Business profil +€50",
      "Dodatna stranica +€40",
      "Logo i branding +€60",
    ],
    planAction: "Odaberi paket",
    packagePrefill:
      "Zdravo! Zanima me {package} paket za moj biznis. Možemo li dogovoriti detalje?",
    cta: {
      title: "Pošalji nam svoj sajt ili Instagram",
      body: "Dobićeš besplatan početni koncept i jasnu preporuku paketa, bez obaveze.",
      action: "Zatraži koncept",
    },
  },

  faq: {
    title: "Česta pitanja",
    items: [
      {
        q: "Koliko traje izrada?",
        a: "Standardno 7 dana od kad dobijemo materijale (tekst, fotografije, cjenovnik). Jednostavniji sajtovi i brže.",
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
    sub: "Pošalji Instagram DM ili email — odgovaramo isti dan.",
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
      "Moderan sajt za tvoj biznis — gotov za 7 dana, od €100. Restorani, teretane, saloni i mali biznisi u Crnoj Gori. Besplatan koncept prije plaćanja.",
  },
} as const;
