/**
 * Studio ljepote i zdravlja — kozmetički studio, Zabjelo, Podgorica.
 *
 * Outreach design concept. Every fact rendered on the page comes from the two
 * public sources read on 30 August 2026 and listed in `sources` below: the
 * studio's own Instagram profile and the Montenegrin company register.
 *
 * Three rules govern this file.
 *
 * 1. Only names the studio publishes itself reach the page. Treatments are
 *    listed under the labels the profile uses — no protocol, duration, result
 *    or health claim is added on top of them, because none of that is public
 *    and none of it is ours to state.
 * 2. Anything the studio says about itself is attributed to the studio
 *    (`approach.attribution`), never asserted by us.
 * 3. Facts that exist but must not reach an unsolicited concept page — the
 *    owner's name, the registered street, the phone line, seasonal promotional
 *    prices — live in `researchOnly` with the reason each is held back.
 *
 * The photographs on the page are licensed stock, not this studio. Instagram
 * serves its media only to a logged-in client, so nothing of the studio's own
 * could be downloaded. The frames stand in for the photography the studio will
 * supply, they are labelled as illustrative on the page itself, and every one
 * of them is listed in `photoProvenance` as `replaceBeforeProduction`.
 */

export const studio = {
  name: "Studio ljepote i zdravlja",
  /* The profile's display name is a person's name. A concept page sent cold to
     a business never publishes a person, so the visible identity is the
     business name — the same one the handle and the company register carry. */
  area: "Zabjelo, Podgorica",
  instagram: "studio.ljepote.zdravlja",
  instagramUrl: "https://www.instagram.com/studio.ljepote.zdravlja/",
} as const;

export interface InterestGroup {
  id: "lice" | "tijelo" | "masaze" | "pogled";
  /** What brings someone in, in the visitor's words. */
  name: string;
  /** Treatment names exactly as the studio publishes them, nothing added. */
  treatments: readonly string[];
  /**
   * What is useful to write in a first message. This is guidance to the
   * visitor, not a statement about how the studio works — the difference is
   * why every line is an instruction to the reader and never a promise.
   */
  ask: string;
}

/* Four groups, and deliberately four different lengths: the face is where the
   profile publishes most, massage is where it publishes a name and nothing
   else. Padding the short ones out would mean inventing services. */
export const interests: InterestGroup[] = [
  {
    id: "lice",
    name: "Lice",
    treatments: [
      "čišćenje lica",
      "anti-age tretmani lica",
      "anti-akne njega",
      "collagen maska",
    ],
    ask: "Napiši kako se koža ponaša u posljednje vrijeme i šta te trenutno smeta.",
  },
  {
    id: "tijelo",
    name: "Tijelo",
    treatments: ["anticelulit programi"],
    ask: "Napiši koji dio tijela te zanima i koliko često planiraš da dolaziš.",
  },
  {
    id: "masaze",
    name: "Masaže",
    /* The profile names massage as a service and publishes no types. An empty
       list is the honest rendering; the group carries only its own name. */
    treatments: [],
    ask: "Napiši kakav tempo ti prija i da li tražiš jedan termin ili nekoliko.",
  },
  {
    id: "pogled",
    name: "Pogled",
    treatments: ["lash lift", "brow lift", "šminkanje"],
    ask: "Napiši kakav oblik obrva nosiš sada i za kada ti treba termin.",
  },
];

export const approach = {
  /* The studio's own phrase from its current content, used as the heading and
     immediately attributed underneath so it never reads as our claim. */
  heading: "Tretmani prilagođeni koži",
  attribution: "Tako studio opisuje svoj rad na svom profilu.",
  offer:
    "Ponuda ide od čišćenja lica i anti-age njege, preko anticelulit programa i masaža, do obrva i trepavica. U aktuelnom sadržaju studija pojavljuje se i INDIBA.",
  /* No duration, no price, no outcome — and the page says so plainly instead
     of leaving the visitor to assume the numbers are missing by accident. */
  handoff:
    "Trajanje, cijena i tačan izbor tretmana dogovaraju se direktno sa studijom. Ova stranica stoji ispred tog razgovora i njen posao je da ga skrati.",
} as const;

/**
 * The one treatment the page stops on. It is chosen, not invented: on the
 * studio's profile "Čišćenje lica" is kept as its own highlight, which is a
 * fact about the profile rather than a claim about the treatment.
 */
export const ritual = {
  name: "Čišćenje lica",
  observation: "Na profilu studija čišćenje lica ima svoju izdvojenu cjelinu.",
  body: "Ako ne znaš odakle da počneš, počni odatle. U upitu opiši kako koža reaguje — na sunce, na proizvode, na godišnje doba — i kada bi ti odgovarao termin. Ostalo se dogovara uživo, jer se tek tada koža zaista vidi.",
} as const;

/* ------------------------------------------------------------------ *
 * Photography                                                         *
 * ------------------------------------------------------------------ */

export interface Photo {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PhotoProvenance {
  src: Photo["src"];
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  replaceBeforeProduction: boolean;
}

/**
 * Every frame the page renders, and where it came from.
 *
 * All five are licensed stock, downloaded once, re-encoded locally and served
 * same-origin — nothing is hotlinked. None of them shows this studio, its room,
 * its staff or its work, so neither the alt text nor the page copy says that
 * they do: each alt opens with "Ilustrativna fotografija", the band under the
 * room frame repeats it in plain sight, and the footer states it a third time.
 *
 * They exist because a beauty studio read on a phone needs to look like a place
 * where something tactile happens, and because the concept's own aperture is
 * meaningless with nothing behind it. They are placeholders with a job, and all
 * five come out the moment the studio sends its own.
 */
export const photoProvenance: PhotoProvenance[] = [
  {
    src: "/demo/studio-ljepote-zdravlja/gua-sha-hand",
    sourceUrl: "https://www.pexels.com/photo/a-close-up-shot-of-a-person-holding-a-gua-sha-6663588/",
    rightsStatus: "stock (Pexels license) — stand-in for the client's own photography, not this business",
  },
  {
    src: "/demo/studio-ljepote-zdravlja/massage-stones",
    sourceUrl: "https://www.pexels.com/photo/black-stones-in-close-up-photography-6187648/",
    rightsStatus: "stock (Pexels license) — stand-in for the client's own photography, not this business",
  },
  {
    src: "/demo/studio-ljepote-zdravlja/lash-tool-hands",
    sourceUrl:
      "https://www.pexels.com/photo/professional-eyelash-extension-application-close-up-38194459/",
    rightsStatus:
      "stock (Pexels license), face cropped out before saving — stand-in for the client's own photography, not this business",
  },
  {
    src: "/demo/studio-ljepote-zdravlja/studio-interior",
    sourceUrl: "https://www.pexels.com/photo/modern-beauty-salon-interior-with-couch-and-armchair-6899550/",
    rightsStatus: "stock (Pexels license) — stand-in for the client's own photography, not this business",
  },
  {
    src: "/demo/studio-ljepote-zdravlja/skincare-products",
    sourceUrl: "https://www.pexels.com/photo/top-view-of-facial-skincare-beauty-products-4841286/",
    rightsStatus: "stock (Pexels license) — stand-in for the client's own photography, not this business",
  },
].map((photo) => ({ ...photo, sourceDate: "2026-08-30", replaceBeforeProduction: true }));

/**
 * The hero, seen through the aperture. A hand and a cool stone against a plain
 * warm wall: the only sourced frame whose own colour already belongs to this
 * palette, and the only one that is about touch rather than about equipment.
 */
export const heroPhoto: Photo = {
  src: "/demo/studio-ljepote-zdravlja/gua-sha-hand",
  alt: "Ilustrativna fotografija: ruka drži gua sha pločicu od ružičastog kvarca ispred svijetlog jednobojnog zida.",
  width: 1700,
  height: 1135,
};

/**
 * Two of the four interest groups carry a frame, and which two is not a
 * coincidence: Masaže is the group the studio publishes as a name with nothing
 * under it, so the photograph stands exactly where its treatment list would be,
 * and Pogled gets the one frame whose subject is literally its own tools. Lice
 * and Tijelo are the groups with something to read, so they carry text alone. A
 * frame beside all four would be a row of thumbnails; two is a rhythm.
 */
export const groupPhotos: Partial<Record<InterestGroup["id"], Photo>> = {
  masaze: {
    src: "/demo/studio-ljepote-zdravlja/massage-stones",
    alt: "Ilustrativna fotografija: tri glatka crna kamena za masažu na presavijenom peškiru.",
    width: 1700,
    height: 1133,
  },
  pogled: {
    src: "/demo/studio-ljepote-zdravlja/lash-tool-hands",
    alt: "Ilustrativna fotografija: dvije ruke rade sa pincetom i karticom trepavica, pozadina je van fokusa.",
    width: 1506,
    height: 1700,
  },
};

/** The page's one full-bleed frame, and its caption. */
export const roomBand = {
  photo: {
    src: "/demo/studio-ljepote-zdravlja/studio-interior",
    alt: "Ilustrativna fotografija: kozmetički kabinet sa stolom za tretmane, zidnim lampama i policom sa proizvodima i ogledalom.",
    width: 1700,
    height: 1133,
  } satisfies Photo,
  /* Said out loud, under the largest picture on the page, because the largest
     picture is the one a visitor is likeliest to read as the studio's room. */
  caption:
    "Ilustrativna fotografija, nije snimak ovog studija. Prave fotografije prostora ulaze uz saglasnost studija.",
} as const;

/** Beside the featured treatment: what the treatment is done with. */
export const ritualPhoto: Photo = {
  src: "/demo/studio-ljepote-zdravlja/skincare-products",
  alt: "Ilustrativna fotografija: bočica seruma i tegla kreme sa bambusovim poklopcima, uz glatko kamenje na bijeloj podlozi.",
  width: 1700,
  height: 1133,
};

export interface PriceItem {
  /** The treatment name as it appears in `interests`. */
  label: string;
  /** Set only once the studio confirms it. Never a placeholder, never a range. */
  price: string;
  /** e.g. "po tretmanu", "paket od pet dolazaka" — the studio's own wording. */
  unit?: string;
}

export interface PriceCategory {
  groupId: InterestGroup["id"];
  items: PriceItem[];
}

/**
 * The price list the €200 package can carry, modelled but empty.
 *
 * The studio's feed holds seasonal promotional prices. Republishing those on a
 * page it did not commission would put stale numbers in front of its clients,
 * so the categories exist and the values wait for confirmation. The page
 * renders the structure and says why it is empty rather than showing a dash.
 */
export const priceList: { categories: PriceCategory[]; note: string } = {
  categories: [
    { groupId: "lice", items: [] },
    { groupId: "tijelo", items: [] },
    { groupId: "masaze", items: [] },
    { groupId: "pogled", items: [] },
  ],
  note: "Cjenovnik po ovim grupama ima svoje mjesto na stranici. U ovom konceptu je prazan namjerno — cijene ulaze tek kada ih studio potvrdi.",
};

/** Everything the page renders was read here, on this date. */
export const sources = [
  {
    label: "Instagram profil studija",
    sourceUrl: "https://www.instagram.com/studio.ljepote.zdravlja/",
    accessDate: "2026-08-30",
    used: "Naziv, kvart, nazivi tretmana, highlight cjeline i aktuelni sadržaj (INDIBA, anti-akne njega, collagen maska).",
  },
  {
    label: "Primjer aktuelne objave",
    sourceUrl: "https://www.instagram.com/studio.ljepote.zdravlja/p/DcgoVMDAVda/",
    accessDate: "2026-08-30",
    used: "Provjera da je profil aktivan i da sadržaj prati tretmane lica.",
  },
  {
    label: "CompanyWall — poslovni registar",
    sourceUrl: "https://www.companywall.me/firma/studio-ljepote-i-zdravlja-jelena-doo/MMElF0LD",
    accessDate: "2026-08-30",
    used: "Potvrda da je firma aktivna i da je djelatnost njega tijela. Adresa i kontakt iz registra se ne prikazuju.",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Never rendered.                                                     *
 * ------------------------------------------------------------------ */

/**
 * Research notes. None of this reaches the DOM.
 */
export const researchOnly = {
  ownerName: {
    value: "the profile's public display name is a person's name",
    reason:
      "Named people never go on an unsolicited concept page. There is no team section and the visible identity is the business name.",
    needsConfirmation: true,
  },
  registeredStreet: {
    value: "the company register lists a street address in the Zabjelo zone",
    reason:
      "A register entry is not the studio's own publication of a client-facing address. The page says Zabjelo, Podgorica and carries no map.",
    needsConfirmation: true,
  },
  phoneAndEmail: {
    value: "held in the outreach sheet, not here",
    reason: "No phone, no e-mail, no booking form without written permission.",
    needsConfirmation: true,
  },
  highlightLifting: {
    value: 'the profile keeps a highlight labelled "Lifting"',
    reason:
      "Ambiguous — it may mean lash lift, brow lift or a facial treatment. An ambiguous label is not a service name, so it is not rendered as one.",
    needsConfirmation: true,
  },
  indiba: {
    value: "INDIBA appears in the current feed",
    reason:
      "Rendered once, as a statement about what the feed shows. No device claim, no indication, no result.",
    needsConfirmation: true,
  },
  seasonalPrices: {
    value: "the feed carries seasonal promotional prices",
    reason:
      "Promotional prices go stale the week they are posted. See `priceList` — the model is ready, the values are not.",
    needsConfirmation: true,
  },
  openingHours: {
    value: "not published in a stable form on the profile",
    reason: "Variable hours on a page the studio does not control would be wrong within a week.",
    needsConfirmation: true,
  },
  ownWebsite: {
    value: "no standalone website or booking link was found for the studio",
    reason:
      "This is the reason the concept exists, not a line of copy. The page never comments on what the business lacks.",
    needsConfirmation: false,
  },
} as const;

/**
 * Why none of the photography is the studio's own.
 *
 * Instagram serves post media only to a logged-in client — a plain request for
 * the profile returns the application shell and no photograph URLs at all. The
 * company register entry carries no gallery, the business has no Facebook page
 * and no Podgorica directory listing, and third-party Instagram viewers are
 * dead. Nothing of this studio's could be downloaded, so the five frames in
 * `photoProvenance` are licensed stock, labelled as such on the page.
 *
 * Before production the studio should supply its logo and its own interior and
 * detail photography without recognisable faces.
 */
export const ownPhotographyStatus = {
  value: "no photograph of this studio is publicly retrievable",
  reason:
    "Instagram blocks logged-out media, the register entry has no gallery, and no directory lists the business. Every rendered frame is stock and marked replaceBeforeProduction.",
  needsConfirmation: true,
} as const;
