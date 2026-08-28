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
    sub: "Moderni sajtovi za biznise koji žele više upita, bolji prvi utisak i profesionalno online prisustvo.",
    offer: "Jasna cijena unaprijed, sve od prve skice do objave vodimo mi — bez agencijskih komplikacija.",
    ctaPrimary: "Zatraži besplatan koncept",
    ctaSecondary: "Pogledaj radove",
    /* The four numbers a business owner asks for first. Every one of them is
       said again further down the page — nothing here is a claim the rest of
       the site does not stand behind. */
    facts: [
      { label: "Lokacija", value: "Podgorica" },
      { label: "Rok izrade", value: "do 10 dana" },
      { label: "Cijena od", value: "€100" },
      { label: "Jezici", value: "MNE + EN" },
    ],
  },

  work: {
    title: "Radovi",
    sub: "Interaktivni dizajn koncepti — otvori ih i probaj na svom telefonu.",
    conceptLabel: "Dizajn koncept",
    briefLabel: "Zadatak",
    solutionLabel: "Rješenje",
    includesLabel: "Sadrži",
    swipeHint: "Prevuci za ostale radove",
    counter: "{n} od {total}",
    prev: "Prethodni rad",
    next: "Sljedeći rad",
    items: [
      {
        name: "Lucky Chopsticks",
        tag: "Asian restaurant · Podgorica",
        href: "/demo/lucky-chopsticks/",
        brief: "Gosti traže jelovnik i lokaciju prije nego odluče gdje idu večeras.",
        solution: "Meni po raspoloženju i izdvojena jela na jednoj stranici.",
        includes: ["Meni", "Specijaliteti", "Rezervacije"],
      },
      {
        name: "Barber Drina",
        tag: "Barber · Stari Aerodrom",
        href: "/demo/barber-drina/",
        brief: "Cjenovnik živi u Instagram objavi koju gost mora da traži unazad.",
        solution: "Cjenovnik kao tabela i pomoćnik koji sastavi poruku za DM.",
        includes: ["Cjenovnik", "Termin preko DM-a", "Mapa"],
      },
      {
        name: "Konoba Skadar",
        tag: "Restoran",
        href: "/demo/konoba-skadar/",
        brief: "Gost bira mjesto sa telefona i traži jelovnik i slobodan sto.",
        solution: "Jelovnik po kategorijama, poziv i rezervacija na jedan dodir.",
        includes: ["Jelovnik", "Rezervacije", "Mapa"],
      },
      {
        name: "Titan Gym",
        tag: "Teretana",
        href: "/demo/titan-gym/",
        brief: "Članarine i raspored treninga stalno se traže preko poruka.",
        solution: "Cjenovnik i raspored na sajtu, probni trening kao glavno dugme.",
        includes: ["Članarine", "Raspored", "Programi"],
      },
      {
        name: "Barbershop Stari Grad",
        tag: "Frizer",
        href: "/demo/barbershop-stari-grad/",
        brief: "Zakazivanje ide preko Vibera, a cjenovnik nigdje ne stoji.",
        solution: "Cjenovnik, radno vrijeme i tim na jednoj stranici, Viber na klik.",
        includes: ["Cjenovnik", "Radno vrijeme", "Viber"],
      },
    ],
  },

  why: {
    title: "Zašto VibeLab?",
    sub: "Izrada sajtova u Podgorici — jednostavan proces, jasan dogovor i sajt koji radi za tvoj biznis.",
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
        body: "Dizajn, sadržaj, domen i objava — sve na jednom mjestu.",
      },
      {
        title: "Direktna komunikacija",
        body: "Pričaš direktno sa ljudima koji prave tvoj sajt — bez posrednika.",
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
        body: "Sajt je spreman i radi na tvom domenu. Ako želiš, dalje održavanje preuzimamo mi.",
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
        tagline: "Za mali biznis kojem treba jedna jasna stranica — ponuda, lokacija i kontakt.",
        badge: null,
      },
      {
        name: "Biznis",
        price: "€200",
        tagline: "Za firme kojima treba kompletan sajt — više stranica, galerija i engleska verzija.",
        badge: "Najtraženiji",
      },
      {
        name: "Premium",
        price: "od €350",
        tagline: "Za projekte sa posebnim zahtjevima — rezervacije, dizajn po mjeri i napredni SEO.",
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
    inherits: "Sve iz paketa {plan}, plus:",
    oneTime: "jednokratno",
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
    ],
  },

  contact: {
    title: "Spreman za novi sajt?",
    sub: "Pošalji link svog sajta ili Instagrama — dobijaš besplatan koncept prije nego što išta platiš. Obično odgovorimo istog dana.",
    directLabel: "Ili direktno:",
    prefill: "Zdravo! Zanima me sajt za moj biznis. Mogu li dobiti besplatan koncept?",
    emailSubject: "Sajt za moj biznis",
    concept: {
      eyebrow: "Besplatan koncept",
      placeholder: "tvoj-sajt.me ili @instagram",
      linkLabel: "Sajt ili Instagram",
      contactLabel: "Kontakt za odgovor",
      contactPlaceholder: "email ili @instagram",
      goalLabel: "Šta ti treba (opciono)",
      goalPlaceholder: "Ukratko: čime se baviš i šta bi sajt trebalo da radi.",
      submit: "Pošalji zahtjev",
      sending: "Šaljem…",
      success: "Primljeno. Javimo se na kontakt koji si ostavio.",
      errorRequired: "Treba nam link tvog sajta ili Instagrama i kontakt na koji da odgovorimo.",
      errorChallenge: "Sačekaj sekundu da se provjera završi, pa pošalji ponovo.",
      errorOffline: "Nema veze sa internetom. Provjeri konekciju i probaj ponovo.",
      errorSpam: "Previše pokušaja u kratkom roku. Sačekaj minut i probaj ponovo.",
      errorProvider: "Slanje trenutno ne radi. Probaj ponovo ili nam piši direktno.",
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

  footer: {
    tagline: "Izrada sajtova i web dizajn u Podgorici. Sajtovi koji donose klijente.",
    rights: "Sva prava zadržana.",
    privacy: "Privatnost",
  },

  /* Sections marked `when` are rendered only if that service is actually
     configured in this build — a privacy page that lists tools the site does
     not use is as wrong as one that hides tools it does. */
  privacy: {
    title: "Privatnost",
    updated: "Ažurirano 27. avgusta 2026.",
    intro:
      "Ovaj sajt je vizit-karta jednog malog studija. Nema naloga, nema prijave i ne prodajemo ništa preko sajta — pa nema ni razloga da o tebi znamo išta više nego što nam sam pošalješ.",
    sections: [
      {
        when: "always",
        title: "Ko obrađuje podatke",
        body: [
          "VibeLab, web studio iz Podgorice. Za sva pitanja o podacima piši na vibecodemne@gmail.com.",
        ],
      },
      {
        when: "form",
        title: "Kada pošalješ zahtjev za koncept",
        body: [
          "Formu obrađuje Basin (usebasin.com), servis koji primljene poruke prosljeđuje na naš email. Šalje se samo ono što si upisao: link tvog sajta ili Instagrama, kontakt na koji da odgovorimo, tvoja poruka i jezik stranice.",
          "Koristimo to isključivo da bismo ti odgovorili. Ne šaljemo newsletter, ne dijelimo kontakte sa trećim licima i ne koristimo ih za reklame. Poruku brišemo kada prepiska bude gotova, najkasnije godinu dana od slanja.",
        ],
      },
      {
        when: "always",
        title: "Kada pišeš emailom ili preko Instagrama",
        body: [
          "Dugmad na sajtu samo otvaraju tvoj email program ili Instagram sa unaprijed napisanom porukom — sadržaj te poruke sajt ne vidi i nigdje je ne bilježi. Dalje važe pravila Google-a odnosno Mete, zavisno od toga gdje nam pišeš.",
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

  meta: {
    title: "Izrada sajtova Podgorica — od €100, online do 10 dana | VibeLab",
    description:
      "Izrada sajtova i web dizajn u Podgorici. Moderan sajt za tvoj biznis — od €100, online u roku od 10 dana. Besplatan koncept prije plaćanja. VibeLab, Crna Gora.",
    /* JSON-LD serviceType entries — what the studio does, for search engines */
    serviceTypes: ["Izrada sajtova", "Web dizajn", "Održavanje sajtova"],
  },
} as const;
