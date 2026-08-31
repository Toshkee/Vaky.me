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
    eyebrow: "Web studio — Crna Gora",
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
      { label: "Radimo", value: "Crna Gora" },
      { label: "Rok izrade", value: "do 10 dana" },
      { label: "Cijena od", value: "€200" },
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
    sub: "Izrada sajtova u Crnoj Gori — jednostavan proces, jasan dogovor i sajt koji radi za tvoj biznis.",
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
          label: "Osnovni SEO",
          values: [true, true, true],
          explain:
            "Naslov, opis, sitemap i robots.txt — ono što je potrebno da Google može da pronađe i indeksira sajt.",
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
          label: "Napredni SEO",
          values: [false, true, true],
          explain:
            "Strukturirani podaci, kartice za dijeljenje na društvenim mrežama i optimizacija brzine učitavanja.",
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
    ],
  },

  contact: {
    title: "Spreman za novi sajt?",
    sub: "Ostavi nam par podataka — javimo se, dogovorimo šta ti treba i pošaljemo ponudu. Obično odgovorimo istog dana.",
    directLabel: "Ili direktno:",
    prefill: "Zdravo! Zanima me sajt za moj biznis. Možemo li da se čujemo oko ponude?",
    emailSubject: "Sajt za moj biznis",
    lead: {
      eyebrow: "Zatraži ponudu",
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
      errorProvider: "Slanje trenutno ne radi. Probaj ponovo ili nam piši direktno.",
      submitInstagram: "Otvori Instagram DM",
      submitInstagramCopied: "Poruka kopirana — otvori Instagram",
      copied: "Poruka je kopirana — samo je nalijepi u Instagram DM.",
      note: "Preko sajta se ništa ne plaća. Prvo se dogovorimo, pa onda radimo.",
      emailFallback: "Ne ide slanje?",
      emailFallbackAction: "Pošalji nam email",
      /* {link} is replaced with whatever the visitor typed */
      prefill: "Zdravo! Ovo je moj biznis: {link} — može ponuda za sajt?",
      /* Tony's speech bubble beside the form. Split so the offer can be set
         in red without concatenating sentences in the component. */
      bubble: { pre: "Prvo dobijaš", em: "besplatan koncept", post: ", pa se dogovaramo." },
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
    updated: "Ažurirano 30. avgusta 2026.",
    intro:
      "Ovaj sajt je vizit-karta jednog malog studija. Nema naloga, nema prijave i ne prodajemo ništa preko sajta — pa nema ni razloga da o tebi znamo išta više nego što nam sam pošalješ.",
    sections: [
      {
        when: "always",
        title: "Ko obrađuje podatke",
        body: [
          "VibeLab, web studio iz Crne Gore. Za sva pitanja o podacima piši na vibecodemne@gmail.com.",
        ],
      },
      {
        when: "form",
        title: "Kada pošalješ upit preko sajta",
        body: [
          "Forma ide na naš server kod Cloudflare-a i upit se čuva u našoj bazi. Šalje se samo ono što si upisao: ime, naziv biznisa, email, telefon, link, šta ti treba i tvoja poruka — plus jezik stranice. Kopiju istog upita dobijemo i na email.",
          "Koristimo to isključivo da bismo ti odgovorili i napravili ponudu. Ne šaljemo newsletter, ne dijelimo kontakte sa trećim licima i ne koristimo ih za reklame. Upit brišemo kada prepiska bude gotova, najkasnije godinu dana od slanja; brisanje možeš tražiti i ranije, na vibecodemne@gmail.com.",
          "Preko sajta se ništa ne plaća i ne tražimo podatke o kartici. Da bismo formu zaštitili od zloupotrebe, bilježimo nepovratno kodiran zapis IP adrese kako bismo ograničili broj pokušaja — iz njega se tvoja adresa ne može pročitati.",
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
        when: "always",
        title: "Kada popunjavate obrazac za pokretanje projekta",
        body: [
          "Kada se dogovorimo oko posla, pošaljemo vam lični link za upitnik i tu nam šaljete podatke potrebne za izradu sajta. Šalje se samo ono što sami upišete i priložite: naziv biznisa, vaše ime, email, telefon, odgovori na pitanja i fajlovi koje odaberete.",
          "Odgovori se čuvaju u našoj bazi kod Cloudflare-a, a fajlovi u privatnom prostoru za skladištenje kojem se ne može pristupiti sa interneta bez potpisanog linka koji ističe. Koristimo ih isključivo da bismo izradili vaš sajt — ne dijelimo ih ni sa kim i ne koristimo za reklame. Čuvamo ih dok traje saradnja i najviše godinu dana poslije toga; brisanje možete tražiti i ranije, na vibecodemne@gmail.com.",
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

  meta: {
    title: "Izrada sajtova Crna Gora — od €200, online do 10 dana | VibeLab",
    description:
      "Izrada sajtova i web dizajn u Crnoj Gori. Moderan sajt za tvoj biznis — od €200, online u roku od 10 dana. Besplatan koncept prije plaćanja. VibeLab, Podgorica.",
    /* JSON-LD serviceType entries — what the studio does, for search engines */
    serviceTypes: ["Izrada sajtova", "Web dizajn", "Održavanje sajtova"],
  },
} as const;
