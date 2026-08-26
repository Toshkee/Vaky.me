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
    sub: "Brz, moderan sajt za tvoj biznis — gotov za 7 dana.",
    ctaPrimary: "Piši nam na WhatsApp",
    ctaSecondary: "Pogledaj radove",
    concept: {
      eyebrow: "Besplatan koncept",
      title: "Već imaš sajt ili Instagram?",
      body: "Pošalji nam link i vidiš kako bi tvoj biznis mogao da izgleda — prije nego što platiš i cent.",
      placeholder: "konoba-primjer.me ili @konoba.primjer",
      submitEmail: "Pošalji na email",
      or: "Ili:",
      copied: "Link kopiran — nalijepi ga u poruku.",
      note: "Poruka se otvara sa tvojim linkom već upisanim. Javimo se isti dan.",
      /* {link} is replaced with whatever the visitor typed */
      prefill: "Zdravo! Ovo je moj sajt/Instagram: {link} — može besplatan koncept?",
    },
  },

  work: {
    title: "Radovi",
    sub: "Svaki sajt je pravi — klikni i probaj ga na svom telefonu.",
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
    ],
  },

  process: {
    title: "Kako radimo",
    steps: [
      {
        day: "Dan 1",
        title: "Javiš se",
        body: "WhatsApp, Viber ili DM na Instagramu. Kažeš nam čime se baviš.",
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
          "WhatsApp / Viber dugme",
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
          "Više stranica",
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
    sub: "Piši nam — odgovaramo isti dan.",
    whatsapp: "WhatsApp",
    viber: "Viber",
    instagram: "Instagram",
    call: "Pozovi",
    emailLabel: "Email",
    prefill: "Zdravo! Zanima me sajt za moj biznis. Mogu li dobiti besplatan koncept?",
    emailSubject: "Sajt za moj biznis",
  },

  footer: {
    tagline: "Web studio iz Podgorice. Sajtovi koji donose klijente.",
    rights: "Sva prava zadržana.",
  },

  fab: "Piši nam",

  meta: {
    title: "VibeLab.me — Sajtovi koji donose klijente | Web studio Podgorica",
    description:
      "Moderan sajt za tvoj biznis — gotov za 7 dana, od €100. Restorani, teretane, saloni i mali biznisi u Crnoj Gori. Besplatan koncept prije plaćanja.",
  },
} as const;
