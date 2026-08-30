/**
 * Maluni Shop Podgorica — piercing jewellery, sold online across Montenegro.
 *
 * Outreach design concept, and the one in this batch that is NOT a business
 * without a website. Maluni already runs an active Shopify store at
 * malunitrey.com with its own products, prices, stock and checkout. So this
 * page is a front door, not a second shop: every commercial action leaves for
 * the live store, and nothing about price, stock or an order is restated here.
 *
 * Everything rendered comes from the shop's own channels, read 30 August 2026:
 *
 *   https://malunitrey.com/                  — navigation, collections, the
 *                                              standing announcement line
 *   https://malunitrey.com/pages/dostava     — delivery terms
 *   https://malunitrey.com/pages/placanje    — payment terms
 *   https://malunitrey.com/products.json     — the public product feed, read
 *                                              for the store's own vocabulary
 *                                              (materijal, debljina osovine,
 *                                              dužina, dragulj) and nothing else
 *   https://www.instagram.com/tattooshoppodgorica/  — the profile the shop
 *                                              answers questions on
 *
 * Three rules govern this file.
 *
 * 1. No price, no stock, no product count, no discount. Those live in the
 *    store and go stale the day they are copied. Every collection here is a
 *    link, checked to return 200 on 30 August 2026.
 * 2. Contact data the shop publishes but has not agreed to see republished on
 *    an unsolicited concept — the street address and the phone in its own
 *    footer — stays in `researchOnly`. The page says "Podgorica".
 * 3. Anything the shop states about itself is attributed to the shop, never
 *    asserted by us. See `delivery` and `support`.
 */

export const shop = {
  /* The current Instagram display name, which is also how the business is
     recognised locally. The store's legal/domain identity is Malunitrey; the
     brief is explicit that a concept page does not get to decide which of the
     two is the primary name, so the wordmark uses the Instagram one and the
     live domain is always spelled out next to the buying action. */
  name: "Maluni Shop",
  /* Restrained descriptor from the brief — not a slogan. Kept as two whole
     strings rather than one built from parts: Montenegrin declines the city
     name, so a sentence assembled from `area` plus a suffix is wrong the
     moment the case changes. */
  descriptorLine: "Piercing nakit i stručna podrška · Podgorica",
  area: "Podgorica",
  areaSentence: "Prodavnica je u Podgorici.",
  shopUrl: "https://malunitrey.com/",
  shopDomain: "malunitrey.com",
  instagram: "tattooshoppodgorica",
  instagramUrl: "https://www.instagram.com/tattooshoppodgorica/",
} as const;

/** The store's own standing announcement line, rebuilt as three plain facts. */
export const promise: readonly string[] = [
  "Besplatna dostava za cijelu Crnu Goru",
  "PDV uračunat u cijenu",
  "Plaćanje pouzećem",
];

export interface Collection {
  id: string;
  /** The label exactly as the store's own navigation writes it. */
  name: string;
  /** One line of orientation, built only from what the collection contains. */
  line: string;
  url: string;
}

/* Axis one: where the jewellery is worn. These six are the store's own
   top-level "NAKIT" menu, minus the collections that are not placements.
   Note OBRVA lives at /collections/pirsing-nakit-za-lice — the handle and the
   menu label disagree on the live store; the label is what a visitor reads,
   so the label is what the page shows. */
export const placements: Collection[] = [
  {
    id: "nos",
    name: "NOS",
    line: "Nose stud, savijena L osovina i alkice za nozdrvu.",
    url: "https://malunitrey.com/collections/nos",
  },
  {
    id: "uvo",
    name: "UVO",
    line: "Labret, alkice, industrial i minđuše.",
    url: "https://malunitrey.com/collections/uvo",
  },
  {
    id: "usta",
    name: "USTA",
    line: "Labret za usnu i osovine za jezik.",
    url: "https://malunitrey.com/collections/usna",
  },
  {
    id: "pupak",
    name: "PUPAK",
    line: "Navel osovine, hoop i dongle varijante.",
    url: "https://malunitrey.com/collections/pupak",
  },
  {
    id: "obrva",
    name: "OBRVA",
    line: "Savijena i ravna osovina za predio lica.",
    url: "https://malunitrey.com/collections/pirsing-nakit-za-lice",
  },
  {
    id: "ostalo",
    name: "OSTALO",
    line: "Položaji koji ne ulaze u prethodne kategorije.",
    url: "https://malunitrey.com/collections/ostalo",
  },
];

export interface Shape {
  id: string;
  name: string;
  url: string;
}

/* Axis two: the shape of the piece itself — the store's second menu, "NAKIT PO
   OBLIKU", in its own order. Same articles, approached by someone who already
   knows what they wear. */
export const shapes: Shape[] = [
  { id: "nose-stud", name: "NOSE STUD", url: "https://malunitrey.com/collections/nose-stud" },
  { id: "labret", name: "LABRET", url: "https://malunitrey.com/collections/labret" },
  { id: "clicker-ring", name: "CLICKER RING", url: "https://malunitrey.com/collections/clicker-ring" },
  { id: "bent-barbell", name: "BENT BARBELL", url: "https://malunitrey.com/collections/bent-barbell" },
  { id: "navel", name: "NAVEL", url: "https://malunitrey.com/collections/navel" },
  { id: "straight-barbell", name: "STRAIGHT BARBELL", url: "https://malunitrey.com/collections/straight-barbell" },
  { id: "industrial", name: "INDUSTRIAL", url: "https://malunitrey.com/collections/industrial" },
  { id: "circular-barbell", name: "CIRCULAR BARBELL", url: "https://malunitrey.com/collections/circular-barbell" },
  { id: "earrings-stud", name: "EARRINGS STUD", url: "https://malunitrey.com/collections/earrings-stud" },
];

export interface Photo {
  /** Path without extension, as DemoPhoto expects. */
  src: string;
  alt: string;
  /** The committed JPG's real pixels, so the box is reserved before it lands. */
  width: number;
  height: number;
}

/**
 * The hero piece. Its caption is the whole argument of this redesign in one
 * line: on the live store, "TITANIUM / CLICKER RING 1,2mm x 8mm" is burned
 * into the JPEG in a pixel font. Here the photograph carries the object and
 * the words are set in real type — selectable, translatable, sharp, and
 * readable by a screen reader.
 */
export const heroPiece = {
  photo: {
    src: "/demo/maluni-shop/clicker-ring-titanijum",
    alt: "Clicker ring od titanijuma sa devet bijelih cirkon kristala, snimljen izbliza na bijeloj podlozi",
    width: 600,
    height: 600,
  } satisfies Photo,
  /* Read off the shop's own banner for this exact photograph. */
  caption: "Clicker ring · titanijum · 1,2 mm × 8 mm",
} as const;

export interface Shelf {
  id: string;
  name: string;
  /** Two short sentences at most. No count, no price, no promise. */
  line: string;
  url: string;
  photo: Photo;
}

/* Three collections the store maintains itself, each with one piece from it.
   Deliberately not every collection — the finder above already routes to all
   of them, and three bands is the rhythm this page can carry without turning
   into a catalogue.

   Exported one by one rather than as an array: the page gives each of the
   three its own band, ground and scale, so referring to them by position
   would only invite a silent swap the day someone reorders the list. */
export const goldShelf: Shelf = {
  id: "gold",
  name: "GOLD kolekcija",
  line: "Pozlaćene varijante, izdvojene u zasebnu kolekciju.",
  url: "https://malunitrey.com/collections/gold-kolekcija",
  photo: {
    src: "/demo/maluni-shop/alkica-pozlata",
    alt: "Pozlaćena alkica sa cik-cak redom bijelih cirkon kristala, snimljena izbliza na bijeloj podlozi",
    width: 640,
    height: 600,
  },
};

export const blackShelf: Shelf = {
  id: "black",
  name: "BLACK kolekcija",
  line: "Crne osovine i alkice, za one koji ne žele sjaj.",
  url: "https://malunitrey.com/collections/black-kolekcija",
  photo: {
    src: "/demo/maluni-shop/savijena-osovina-crna",
    alt: "Crna savijena osovina sa šiljcima na oba kraja, snimljena izbliza na svijetloj podlozi",
    width: 480,
    height: 340,
  },
};

export const novoShelf: Shelf = {
  id: "novo",
  name: "NOVO u ponudi",
  line: "Posljednje što je stiglo u prodavnicu.",
  url: "https://malunitrey.com/collections/novo",
  photo: {
    src: "/demo/maluni-shop/nose-bone-titanijum",
    alt: "Nose bone od titanijuma sa geometrijskim vrhom u obliku munje, snimljen izbliza na svijetloj podlozi",
    width: 520,
    height: 520,
  },
};

/** Two more of the store's own menu entries, closing the collections band. */
export const moreCollections: Shape[] = [
  { id: "minduse", name: "MINĐUŠE", url: "https://malunitrey.com/collections/minduse" },
  { id: "sve", name: "CIJELA PONUDA", url: "https://malunitrey.com/collections/all" },
];

/**
 * The measuring card.
 *
 * Every product page on the live store lists the same four values — materijal,
 * debljina osovine, dužina (ili prečnik) and dragulj — and that is genuinely
 * how this jewellery is chosen. The numbers below are the store's own, drawn
 * as a *relative* comparison only: `weight` and `span` are proportions, never
 * a claim about how many millimetres a phone is showing. The page says so.
 */
export const gauge = {
  thickness: {
    label: "Debljina osovine",
    /* 0,8 and 1,2 are the two thicknesses the store's own product texts name. */
    items: [
      { value: "0,8 mm", weight: 0.8 },
      { value: "1,2 mm", weight: 1.2 },
    ],
  },
  length: {
    label: "Dužina ili prečnik",
    /* The sizes that appear in the store's own article titles. */
    items: [
      { value: "5 mm", span: 5 },
      { value: "6 mm", span: 6 },
      { value: "8 mm", span: 8 },
      { value: "10 mm", span: 10 },
    ],
  },
  disclaimer: "Šema je uporedna — ne prikazuje stvarnu veličinu na ekranu.",
} as const;

/**
 * One piece beside the measuring copy, chosen because it shows all three of
 * the things the sentences next to it name — the shaft, its length and the
 * stone — in a single frame. A diagram of a bar chart cannot do that.
 */
export const measurePiece = {
  photo: {
    src: "/demo/maluni-shop/navel-crno-srce",
    alt: "Navel osovina od svijetlog metala sa crnim kristalom u obliku srca, snimljena izbliza na bijeloj podlozi",
    width: 500,
    height: 310,
  } satisfies Photo,
  caption: "Osovina, dužina i dragulj — na jednom artiklu.",
} as const;

/** Two lines that finish the measuring card. Both stay attributed. */
export const materials: readonly string[] = [
  "Materijal je naveden uz svaki artikal. U ponudi su titanijum, pozlaćene varijante i BLACK kolekcija.",
  "Uz artikle sa draguljem stoji vrsta kristala i njegova veličina u milimetrima.",
];

export interface DeliveryFact {
  term: string;
  detail: string;
}

/* Straight from the store's own DOSTAVA and PLAĆANJE pages. Nothing here is
   softened, extended or turned into a promise — where the shop states a time,
   the sentence says the shop states it. */
export const delivery: DeliveryFact[] = [
  {
    term: "Dostava",
    detail: "Besplatna za cijelu Crnu Goru, na kućnu adresu.",
  },
  {
    term: "Rok",
    detail: "Sajt navodi rok do 3 radna dana, a nedjeljom i praznicima se ne dostavlja.",
  },
  {
    term: "Plaćanje",
    detail: "Pouzećem, prilikom preuzimanja pošiljke.",
  },
  {
    term: "Partner",
    detail: "Dostavu i naplatu pouzećem sajt navodi preko Pošte Crne Gore.",
  },
  {
    term: "Cijena",
    detail: "PDV je uračunat u cijenu artikla.",
  },
  {
    term: "Praćenje",
    detail: "Broj pošiljke stiže e-mailom nakon potvrde kupovine.",
  },
  {
    term: "U pošiljci",
    detail: "Nakit, deklaracija o porijeklu i sastavu i račun.",
  },
  {
    term: "Područje",
    detail: "Prodaja je organizovana samo za teritoriju Crne Gore.",
  },
];

/* The one thing a webshop cannot do on its own, and the reason this business
   is not just another catalogue. Attributed, because the connection is the
   store's own statement about itself. */
export const support = {
  heading: "Ako nijesi siguran/na šta ti odgovara",
  body:
    "Sajt kupovinu povezuje sa stručnom podrškom Tattoo Shop Podgorica. Pitanje o mjeri, materijalu ili položaju možeš poslati porukom prije nego što naručiš.",
  ctaLabel: "Pitaj na Instagramu",
  /* The one frame on the page with colour in it, and it belongs exactly here:
     the question this section answers is usually "which of these", and five
     tops in one shot say that faster than the paragraph does. */
  photo: {
    src: "/demo/maluni-shop/emajl-push-in-labret",
    alt: "Pet emajliranih push-in vrhova za labret — pingvin, duga, puž i dva srca — poređani na bijeloj podlozi",
    width: 570,
    height: 740,
  } satisfies Photo,
  photoCaption: "Push-in vrhovi za labret.",
} as const;

/* ------------------------------------------------------------------ *
 * Never rendered.                                                     *
 * ------------------------------------------------------------------ */

export interface PhotoProvenance {
  src: Photo["src"];
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  replaceBeforeProduction: boolean;
}

/**
 * Every photograph on this page is a crop of the shop's own product
 * photography, downloaded once, re-encoded locally and committed — nothing is
 * hotlinked, and sharp writes no EXIF, so no camera or authoring metadata
 * travels with the copies.
 *
 * The crops are art direction, not retouching: the shop burns a pixel-font
 * caption ("TITANIUM", "GOLD PVD PLATED", "NOVO U PONUDI", the size line) into
 * every source file, and each frame here is chosen so that caption falls
 * outside it. The object itself is untouched.
 *
 * All six are `replaceBeforeProduction: true`. A private concept sent to the
 * owner may quote their own shop back to them; a live site needs the originals
 * and written permission.
 */
export const photoProvenance: PhotoProvenance[] = [
  {
    src: "/demo/maluni-shop/clicker-ring-titanijum",
    sourceUrl:
      "https://malunitrey.com/cdn/shop/files/clicker_titanium_i_pozlata_7_cx_2_5mm_novo.jpg",
  },
  {
    src: "/demo/maluni-shop/alkica-pozlata",
    sourceUrl: "https://malunitrey.com/cdn/shop/files/cik_cak_novo.jpg",
  },
  {
    src: "/demo/maluni-shop/savijena-osovina-crna",
    sourceUrl:
      "https://cdn.shopify.com/s/files/1/0560/3973/5360/products/703.1.jpg (artikal savijena-osovina-3, BLACK kolekcija)",
  },
  {
    src: "/demo/maluni-shop/nose-bone-titanijum",
    sourceUrl: "https://malunitrey.com/cdn/shop/files/nose_bone_trouga_novo.jpg",
  },
  {
    src: "/demo/maluni-shop/navel-crno-srce",
    sourceUrl: "https://malunitrey.com/collections/navel (product image)",
  },
  {
    src: "/demo/maluni-shop/emajl-push-in-labret",
    sourceUrl: "https://malunitrey.com/collections/uvo (product image)",
  },
].map((photo) => ({
  ...photo,
  sourceDate: "2026-08-30",
  rightsStatus:
    "unconfirmed — shop's own product photography from malunitrey.com, cropped to exclude the burned-in caption, rights not cleared",
  replaceBeforeProduction: true,
}));

/**
 * Research notes. None of this reaches the DOM.
 */
export const researchOnly = {
  streetAddress: {
    value: "the shop's own site footer names a street address in Podgorica",
    reason:
      "Published by the business, but not with our permission to republish on an unsolicited concept. The page says Podgorica.",
    needsConfirmation: true,
  },
  phone: {
    value: "a landline appears in the site footer and the Instagram bio",
    reason: "Held in the outreach sheet. No phone number on a cold concept page.",
    needsConfirmation: true,
  },
  legalName: {
    value: "the site footer signs itself with a d.o.o. company name",
    reason:
      "The brief forbids deciding the brand hierarchy for them — visible identity stays the current Instagram name, the domain is spelled out beside the buying action.",
    needsConfirmation: true,
  },
  prices: {
    value: "every article on the live store carries a current price",
    reason:
      "Never mirrored. A copied price is wrong the first week it changes; the store owns price, stock and checkout.",
    needsConfirmation: false,
  },
  productCounts: {
    value: "the public product feed lists how many articles sit in each collection",
    reason:
      "A count read on one day is a stat we would be inventing by next week. No numbers on the page.",
    needsConfirmation: false,
  },
  specialPonuda: {
    value: "the store keeps a SPECIAL ponuda collection",
    reason:
      "Linked nowhere on this page: we cannot see whether it is a discount, a set or a seasonal group, and naming it wrong would be a claim about their pricing.",
    needsConfirmation: true,
  },
  materialDetail: {
    value:
      "some BLACK articles are captioned black IP coating on implant grade stainless steel rather than titanium",
    reason:
      "Exactly why the page says the material is listed per article instead of describing the whole range as titanium.",
    needsConfirmation: true,
  },
  placeholderBlog: {
    value: "the store's news page still carries untranslated Shopify placeholder copy",
    reason:
      "A finding from the audit, not something the page mentions. The pitch is the front door, not the criticism.",
    needsConfirmation: false,
  },
  oldDirectories: {
    value: "older local directories list a different address and old reviews",
    reason: "Stale third-party data. Not used, not linked, not shown.",
    needsConfirmation: false,
  },
} as const;
