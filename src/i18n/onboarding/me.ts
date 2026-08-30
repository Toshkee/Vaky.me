import type { OnboardingCopy } from "./types";

/**
 * The brief, in Montenegrin.
 *
 * The voice is the one the landing page already uses: second person plural,
 * short sentences, no agency vocabulary. The rule that decides every wording
 * here is that the reader may never have built a website and may not know what
 * a CMS, a domain or a gateway is — so the question asks about their business,
 * not about our stack. "Kako želite da kupci plaćaju?" instead of a payment
 * provider; "Želite li da sami mijenjate tekstove?" instead of a CMS.
 *
 * Every question that needs a decision the client may not have made carries a
 * way out — "Nisam siguran" — because a brief that strands someone on question
 * four never reaches question five.
 */
export const me: OnboardingCopy = {
  lang: "me",
  htmlLang: "sr-ME",

  meta: {
    title: "Pokretanje projekta | VibeLab",
    description:
      "Kratak upitnik za klijente VibeLab-a: recite nam o svom biznisu, pošaljite materijale i krećemo sa izradom sajta.",
  },

  gate: {
    eyebrow: "Novi projekat",
    title: "Zdravo! Krenimo.",
    intro:
      "Nekoliko kratkih pitanja o vašem biznisu i sajtu koji pravimo. Bez tehničkih izraza — samo nam recite šta vam treba.",
    languageLabel: "Izaberite jezik",
    me: "Crnogorski",
    en: "English",
    action: "Krenimo",
    minutes: "Traje oko 5 minuta",
    tony: "Ako nešto ne znate, slobodno preskočite. Zato i postoji „Nisam siguran“.",
  },

  resume: {
    title: "Nastavite gdje ste stali",
    body: "Na ovom uređaju imamo vaše nedovršene odgovore.",
    action: "Nastavi",
    restart: "Počni ispočetka",
    restartConfirm: "Sigurno? Sve se briše.",
  },

  packageGate: {
    title: "Koji paket ste dogovorili?",
    intro:
      "Ako se ne sjećate naziva, izaberite ono što vam najviše liči — uskladićemo kad se čujemo.",
    unsure: "Nisam siguran",
    unsureHelp: "Pitaćemo vas najvažnije, pa ćemo paket potvrditi zajedno.",
    action: "Nastavi",
  },

  chrome: {
    step: "Korak {n} od {total}",
    progressLabel: "Napredak",
    back: "Nazad",
    next: "Dalje",
    toReview: "Pregled i slanje",
    optional: "opciono",
    packageLabel: "Paket",
    languageLabel: "Jezik",
    otherLanguage: "English",
    draftNote: "Odgovori se čuvaju na ovom uređaju dok ne pošaljete.",
    errorSummary: "Provjerite označena polja.",
    home: "vibelab.it.com",
    packageNotes: {
      start: "Vaš paket je jedna stranica, pa ovo biramo kao sekcije na njoj.",
      business: "U vašem paketu ide do pet stranica.",
      project: "Broj stranica dogovaramo — označite sve što vam treba.",
    },
  },

  steps: {
    business: {
      title: "O vašem biznisu",
      intro: "Osnovno — ko ste i gdje da vas nađemo.",
      tony: "Hajde prvo da upoznamo vaš biznis.",
    },
    website: {
      title: "Šta sajt treba da postigne",
      intro: "Zbog čega pravite sajt i šta sve treba da bude na njemu.",
    },
    design: {
      title: "Kako sajt treba da izgleda",
      intro: "Bez stručnih izraza — samo recite šta vam se dopada.",
      tony: "Sad malo o izgledu 👀",
    },
    features: {
      title: "Šta sajt treba da radi",
      intro: "Označite sve što vam zvuči korisno.",
    },
    shop: {
      title: "Vaša prodavnica",
      intro: "Nekoliko pitanja da znamo kako prodaja treba da funkcioniše.",
    },
    booking: {
      title: "Rezervacije i termini",
      intro: "Da rezervacije rade onako kako vi već radite.",
    },
    materials: {
      title: "Materijali",
      intro: "Pošaljite sve što mislite da nam može pomoći. Ne morate imati sve spremno.",
      tony: "Ovdje šaljete logo, slike i ostale materijale.",
    },
    finish: {
      title: "Još samo ovo",
      intro: "Domen i sve što biste voljeli da nam kažete.",
    },
  },

  questions: {
    /* ── O biznisu ── */
    businessName: { label: "Naziv biznisa", placeholder: "npr. Konoba Skadar" },
    contactName: { label: "Vaše ime", placeholder: "Ime i prezime" },
    email: {
      label: "Email",
      placeholder: "ime@primjer.com",
      help: "Ovdje vam se javljamo sa sljedećim koracima.",
    },
    phone: { label: "Telefon", placeholder: "+382 6X XXX XXX" },
    instagram: { label: "Instagram ili Facebook", placeholder: "@vasprofil" },
    existingSite: {
      label: "Postojeći sajt",
      placeholder: "vas-sajt.me",
      help: "Ako imate sajt koji mijenjamo, ostavite adresu.",
    },
    activity: {
      label: "Čime se bavite?",
      placeholder: "U par rečenica — šta radite i po čemu ste dobri.",
    },
    customers: {
      label: "Ko su uglavnom vaši klijenti?",
      placeholder: "npr. domaći gosti, turisti, firme…",
    },

    /* ── Sajt ── */
    goals: {
      label: "Šta najviše želite da postignete novim sajtom?",
      help: "Možete izabrati više odgovora.",
      options: {
        "find-us": "Da ljudi lakše pronađu informacije o nama",
        "more-enquiries": "Da dobijamo više upita i poziva",
        "present-services": "Da predstavimo naše usluge",
        "sell-products": "Da prodajemo proizvode",
        "take-bookings": "Da primamo rezervacije",
        "look-professional": "Da izgledamo profesionalnije online",
        "not-sure": "Nisam siguran — neka VibeLab predloži",
        other: "Nešto drugo",
      },
    },
    goalsOther: { label: "Šta još?", placeholder: "Recite nam ukratko." },
    pages: {
      label: "Koje stranice bi sajt trebalo da ima?",
      help: "Označite sve što mislite da vam treba.",
      options: {
        home: "Početna",
        about: "O nama",
        services: "Usluge",
        gallery: "Galerija",
        pricing: "Cjenovnik",
        contact: "Kontakt",
        blog: "Blog i novosti",
        faq: "Česta pitanja",
        shop: "Prodavnica",
        booking: "Rezervacije",
        "not-sure": "Nisam siguran — neka VibeLab predloži",
      },
    },

    /* ── Dizajn ── */
    style: {
      label: "Kako biste voljeli da sajt izgleda?",
      help: "Izaberite do tri stvari koje vam se dopadaju.",
      options: {
        minimal: "Minimalno i jednostavno",
        modern: "Moderno",
        elegant: "Elegantno i premium",
        dark: "Tamnije boje",
        light: "Svijetlo i čisto",
        playful: "Šarenije i kreativno",
        corporate: "Ozbiljno i poslovno",
        "not-sure": "Nemam posebnu ideju — neka VibeLab predloži",
      },
    },
    inspiration: {
      label: "Imate li sajtove koji vam se sviđaju?",
      help: "Ne moraju biti iz vaše branše. Pošaljite bilo koji sajt čiji vam se izgled dopada.",
      placeholder: "nekisajt.com",
    },
    avoid: {
      label: "Postoji li nešto što nikako ne želite na sajtu?",
      placeholder: "npr. previše teksta, tamne boje, animacije…",
    },

    /* ── Funkcionalnosti ── */
    features: {
      label: "Šta sve sajt treba da ima?",
      help: "Označite sve što vam zvuči korisno. Ako niste sigurni, izaberite posljednju opciju.",
      options: {
        "contact-form": "Kontakt forma",
        whatsapp: "WhatsApp dugme",
        viber: "Viber dugme",
        map: "Google mapa",
        instagram: "Instagram objave na sajtu",
        booking: "Online rezervacije",
        shop: "Online prodavnica",
        multilingual: "Sajt na više jezika",
        newsletter: "Prijava na newsletter",
        reviews: "Recenzije klijenata",
        gallery: "Galerija fotografija",
        video: "Video",
        "not-sure": "Nisam siguran — neka VibeLab preporuči",
        other: "Nešto drugo",
      },
    },
    featuresOther: { label: "Šta još?", placeholder: "Recite nam ukratko." },
    languagesNeeded: {
      label: "Koji jezici su vam potrebni?",
      help: "Crnogorski se podrazumijeva.",
      options: {
        english: "Engleski",
        russian: "Ruski",
        german: "Njemački",
        italian: "Italijanski",
        albanian: "Albanski",
        turkish: "Turski",
        other: "Neki drugi",
      },
    },
    languagesOther: { label: "Koji još jezik?", placeholder: "npr. francuski" },
    selfEditing: {
      label: "Želite li da kasnije sami mijenjate tekstove, slike ili proizvode na sajtu?",
      options: {
        yes: "Da, to bih sam radio",
        no: "Ne, radije da vi mijenjate umjesto mene",
        "not-sure": "Nisam siguran",
      },
    },

    /* ── Prodavnica ── */
    productCount: {
      label: "Koliko otprilike proizvoda imate?",
      options: {
        "to-20": "Do 20",
        "20-100": "20 do 100",
        "100-500": "100 do 500",
        "500-plus": "Više od 500",
        "not-sure": "Nisam siguran",
      },
    },
    productCategories: {
      label: "Koje grupe proizvoda prodajete?",
      placeholder: "npr. odjeća, obuća, dodaci",
      help: "Pomaže nam da složimo kategorije u prodavnici.",
    },
    productReady: {
      label: "Šta već imate spremno?",
      help: "Označite sve što imate. Ono što nemate, riješićemo zajedno.",
      options: {
        photos: "Fotografije proizvoda",
        prices: "Cijene",
        descriptions: "Opise proizvoda",
        none: "Ništa od toga još",
      },
    },
    variants: {
      label: "Da li isti proizvod dolazi u više varijanti?",
      help: "Na primjer u više veličina ili boja.",
      options: { yes: "Da", no: "Ne", "not-sure": "Nisam siguran" },
    },
    payment: {
      label: "Kako želite da kupci plaćaju?",
      options: {
        card: "Karticom online",
        "on-delivery": "Pouzećem, prilikom preuzimanja",
        "bank-transfer": "Bankovnom uplatom",
        "in-store": "Kod vas u objektu",
        "not-sure": "Nisam siguran — treba mi preporuka",
      },
    },
    delivery: {
      label: "Kako roba stiže do kupca?",
      options: {
        courier: "Kurirskom službom",
        own: "Sami dostavljamo",
        pickup: "Kupac preuzima kod nas",
        "not-sure": "Nisam siguran — treba mi preporuka",
      },
    },
    stock: {
      label: "Treba li sajt da prati koliko čega imate na stanju?",
      help: "Kad se nešto rasproda, sajt to sam označi.",
      options: { yes: "Da", no: "Ne treba", "not-sure": "Nisam siguran" },
    },
    orderNotify: {
      label: "Kako želite da vas obavijestimo o novoj porudžbini?",
      options: { email: "Emailom", phone: "Porukom na telefon", both: "I jedno i drugo" },
    },

    /* ── Rezervacije ── */
    bookingServices: {
      label: "Šta klijenti mogu da zakažu kod vas?",
      placeholder: "npr. šišanje, brada, farbanje…",
      help: "Slobodno nabrojte sve — mi ćemo to složiti u listu.",
    },
    bookingDuration: {
      label: "Koliko obično traje jedan termin?",
      options: {
        "to-30": "Do 30 minuta",
        "30-60": "30 do 60 minuta",
        "1-2h": "1 do 2 sata",
        more: "Više od 2 sata",
        varies: "Zavisi od usluge",
      },
    },
    bookingHours: {
      label: "Vaše radno vrijeme",
      placeholder: "npr. pon–pet 09–17, subota 09–14, nedjeljom ne radimo",
    },
    bookingStaff: {
      label: "Da li više osoba prima termine?",
      help: "Ako da, klijent bira kod koga dolazi.",
      options: { one: "Ne, samo jedna osoba", several: "Da, više njih", "not-sure": "Nisam siguran" },
    },
    bookingAdvance: {
      label: "Koliko unaprijed klijenti mogu da zakažu?",
      options: {
        "same-day": "Za isti dan",
        week: "Nedjelju dana unaprijed",
        month: "Mjesec unaprijed",
        longer: "I duže od toga",
        "not-sure": "Nisam siguran",
      },
    },
    bookingCancellation: {
      label: "Mogu li klijenti sami da otkažu termin?",
      options: {
        free: "Da, bez ograničenja",
        "with-notice": "Da, ali uz raniju najavu",
        no: "Ne",
        "not-sure": "Nisam siguran",
      },
    },
    bookingCurrent: {
      label: "Kako sada primate termine?",
      options: {
        phone: "Telefonom",
        messages: "Preko Vibera ili WhatsApp-a",
        instagram: "Instagram porukama",
        notebook: "Upisujemo u svesku",
        system: "Koristimo neki program",
        "not-sure": "Različito, kako kad",
      },
    },
    bookingCurrentSystem: { label: "Koji program koristite?", placeholder: "npr. DIKIDI" },
    bookingConfirmation: {
      label: "Kako da javimo klijentu da je termin potvrđen?",
      options: {
        email: "Emailom",
        message: "Porukom na telefon",
        both: "I jedno i drugo",
        "not-needed": "Ne treba potvrda",
      },
    },

    /* ── Materijali ── */
    textsReady: {
      label: "Da li već imate tekstove za sajt?",
      help: "Mislimo na opise usluga, tekst o vama i slično.",
      options: {
        all: "Da, sve je spremno",
        some: "Imam dio",
        none: "Nemam",
        help: "Želim da VibeLab pomogne oko teksta",
      },
    },
    logoStatus: {
      label: "Da li imate logo?",
      options: {
        have: "Da, imam",
        none: "Nemam",
        redo: "Imam, ali bih volio novu verziju",
      },
    },
    photosStatus: {
      label: "Kakve fotografije imate?",
      options: {
        professional: "Profesionalne fotografije",
        basic: "Obične, sa telefona",
        "not-enough": "Nemam ih dovoljno",
        "not-sure": "Nisam siguran šta mi treba",
      },
    },
    uploadLogo: {
      label: "Logo",
      help: "Ako logo imate u nekom fajlu, pošaljite ga ovdje.",
    },
    uploadMedia: {
      label: "Fotografije i video",
      help: "Objekat, proizvodi, tim, radovi — sve što pokazuje šta radite.",
    },
    uploadDocuments: {
      label: "Cjenovnik, meni, katalog, tekstovi",
      help: "PDF, Word, Excel ili slikan cjenovnik — sve prolazi.",
    },

    /* ── Domen i kraj ── */
    domainStatus: {
      label: "Da li već imate domen?",
      help: "Domen je adresa sajta, na primjer vibelab.it.com.",
      options: { yes: "Da", no: "Ne", "not-sure": "Nisam siguran" },
    },
    domainName: { label: "Koji domen imate?", placeholder: "vas-sajt.me" },
    domainHelp: {
      label: "Želite li da vam VibeLab pomogne da izaberete i podesite domen?",
      options: { yes: "Da, treba mi pomoć", no: "Ne, sredićemo sami" },
    },
    hostingPaying: {
      label: "Da li već plaćate nešto za postojeći sajt ili hosting?",
      help: "Ako ne znate, slobodno izaberite „Nisam siguran“ — provjerićemo zajedno.",
      options: { yes: "Da", no: "Ne", "not-sure": "Nisam siguran" },
    },
    notes: {
      label: "Postoji li još nešto što biste željeli da znamo prije nego počnemo?",
      placeholder: "Slobodno napišite bilo šta.",
    },
  },

  upload: {
    zones: {
      logo: { hint: "PNG, JPG ili PDF." },
      media: { hint: "JPG, PNG, HEIC, MP4 ili MOV." },
      documents: { hint: "PDF, Word, Excel, CSV, slika ili ZIP." },
    },
    drop: "Prevucite fajlove ovdje",
    browse: "Izaberite sa uređaja",
    limits: "Do {file} po fajlu, {video} za video, ukupno {total}.",
    uploading: "Šaljem…",
    done: "Poslato",
    failed: "Nije poslato",
    retry: "Pokušaj ponovo",
    remove: "Ukloni",
    removeLabel: "Ukloni {name}",
    empty: "Još ništa nije poslato.",
    tooMany: "Dostigli ste najveći broj fajlova.",
  },

  credentials: {
    title: "Nikad ne šaljite lozinke",
    body: "Nemojte slati lozinke kroz ovu formu. Ako nam bude potreban pristup nekom nalogu, dogovorićemo siguran način naknadno.",
  },

  review: {
    title: "Pregled prije slanja",
    intro: "Provjerite je li sve kako treba. Svaki dio možete izmijeniti.",
    edit: "Izmijeni",
    editLabel: "Izmijeni: {section}",
    unanswered: "Nije popunjeno",
    files: "Poslati materijali",
    noFiles: "Niste poslali nijedan fajl. To je u redu — javićemo se ako nam nešto zatreba.",
    submit: "Pošalji projekat VibeLab-u",
    sending: "Šaljem…",
  },

  success: {
    title: "Sve je spremno 🚀",
    body: "Hvala! Vaši odgovori i materijali su uspješno poslati VibeLab-u. Pregledaćemo sve i javiti vam se sa sljedećim koracima.",
    refLabel: "Broj vašeg projekta",
    note: "Sačuvajte ovaj broj — pomaže nam da vas brže nađemo ako nam pišete.",
    home: "Nazad na vibelab.it.com",
    tony: "Tony ima sve što mu treba. 🫡",
  },

  errors: {
    required: "Ovo polje je obavezno.",
    email: "Provjerite email adresu.",
    url: "Provjerite adresu sajta.",
    phone: "Provjerite broj telefona.",
    long: "Ovo je predugačko.",
    option: "Izaberite jednu od ponuđenih opcija.",
    many: "Izabrali ste previše opcija.",
    api: {
      "bad-request": "Nešto nije prošlo kako treba. Vaši odgovori nisu izgubljeni. Pokušajte ponovo.",
      session: "Sesija je istekla. Osvježite stranicu — odgovori su sačuvani.",
      "rate-limit": "Previše pokušaja u kratkom roku. Sačekajte minut pa probajte ponovo.",
      challenge: "Sačekajte sekundu da se provjera završi, pa pošaljite ponovo.",
      "file-type": "Ovaj tip fajla ne možemo primiti.",
      "file-size": "Fajl je prevelik.",
      "file-count": "Poslali ste previše fajlova.",
      "file-total": "Ukupna veličina fajlova je prevelika.",
      answers: "Neka polja nisu popunjena kako treba. Provjerite označena polja.",
      server: "Nešto nije prošlo kako treba. Vaši odgovori nisu izgubljeni. Pokušajte ponovo.",
    },
  },
};
