/**
 * Andrea Beauty House — beauty salon, braids and a separate kids space,
 * New City, Podgorica.
 *
 * Outreach design concept. Every rendered fact below comes from the three
 * official Instagram profiles the house runs itself (read 29 August 2026):
 * the service list from the main profile's bio and highlights, the three
 * worlds from the fact that the house maintains a separate profile for each.
 *
 * What the profiles do not state plainly — prices, working hours, how long a
 * kids visit lasts, what a kids booking includes, who supervises — is not on
 * the page and must not be added before the house confirms it. Contact data
 * (phone, e-mail, street) lives in `researchOnly` and is never rendered:
 * the page's single channel is Instagram, which the house answers itself.
 */

export const house = {
  name: "Andrea Beauty House",
  /** The only location string this concept is allowed to render. */
  area: "New City, Podgorica",
  instagram: "andrea_beautyhouse",
  instagramUrl: "https://www.instagram.com/andrea_beautyhouse/",
} as const;

export interface Room {
  id: "salon" | "braids" | "kids";
  name: string;
  /** One line, on the door. */
  line: string;
  instagram: string;
  instagramUrl: string;
  umamiAction: string;
}

/* The house genuinely runs three separate Instagram profiles — one per room.
   Salon has no profile of its own; it answers through the main house
   account, so its door opens onto that one. Braids and Kids each answer
   through their own. */
export const rooms: Room[] = [
  {
    id: "salon",
    name: "Salon",
    line: "Kosa, nokti i šminka, u bijelom prostoru sa zidom lakova.",
    instagram: house.instagram,
    instagramUrl: house.instagramUrl,
    umamiAction: "vrata-salon",
  },
  {
    id: "braids",
    name: "Pletenice",
    line: "Pletenice i afro pletenice, soba sa svojim profilom.",
    instagram: "braids_beautyhouse",
    instagramUrl: "https://www.instagram.com/braids_beautyhouse/",
    umamiAction: "vrata-braids",
  },
  {
    id: "kids",
    name: "Kids",
    line: "Odvojen, šaren dio kuće napravljen za najmlađe.",
    instagram: "kids_beautyhouse",
    instagramUrl: "https://www.instagram.com/kids_beautyhouse/",
    umamiAction: "vrata-kids",
  },
];

/* Quick links in the header, in the order the page itself runs — a nav that
   jumps past a section is worse than no nav. The hallway (#sobe) leads,
   because it is the page's structural hub; the three entries after it are
   internal, to the fuller sections below the doorways, and are separate on
   purpose from the doorway cards, which each send a visitor straight out to
   the room's own Instagram. */
export const sectionNav = [
  { id: "sobe", label: "Sobe" },
  { id: "salon", label: "Salon" },
  { id: "kids", label: "Kids" },
  { id: "pletenice", label: "Pletenice" },
] as const;

/* The adult service list, exactly as the main profile states it — woven into
   one running sentence rather than six cards or a poster of giant words. No
   durations, no prices: neither is published anywhere the house keeps
   current. */
export const salonServices = [
  "Frizerske usluge",
  "Manikir",
  "Pedikir",
  "Šminka",
  "Depilacija",
  "Spray tan",
] as const;

export interface Photo {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/* Provenance for every frame on the page. Kept out of the rendered markup on
   purpose — it is an audit trail for us, not copy for a visitor. Each file was
   re-encoded locally and is served same-origin; nothing is hotlinked. */
export interface PhotoProvenance {
  src: Photo["src"];
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  replaceBeforeProduction: boolean;
}

const cloudinary = (n: number, version: number) =>
  `https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v${version}/directory/podgorica/andrea-beauty-house-${n}.jpg`;

export const photoProvenance: PhotoProvenance[] = [
  { src: "/demo/andrea-beauty-house/govornica", sourceUrl: cloudinary(6, 1781588009) },
  { src: "/demo/andrea-beauty-house/salon", sourceUrl: cloudinary(3, 1781588006) },
  { src: "/demo/andrea-beauty-house/kids-fotelje", sourceUrl: cloudinary(5, 1781588008) },
  { src: "/demo/andrea-beauty-house/kids-toaletni", sourceUrl: cloudinary(1, 1781588002) },
  { src: "/demo/andrea-beauty-house/kids-sto", sourceUrl: cloudinary(7, 1781588010) },
  { src: "/demo/andrea-beauty-house/makaronsi", sourceUrl: cloudinary(9, 1781588012) },
  { src: "/demo/andrea-beauty-house/nail-zid", sourceUrl: cloudinary(10, 1781588013) },
].map((photo) => ({
  ...photo,
  sourceDate: "2026-08-29",
  rightsStatus: "unconfirmed — Podgorica Directory listing gallery, rights not cleared",
  replaceBeforeProduction: true,
}));

/** The doorway. The house's own pink booth, with its name written on it. */
export const doorway: Photo = {
  src: "/demo/andrea-beauty-house/govornica",
  alt: "Roze telefonska govornica sa natpisom Andrea Beauty House, ukrašena vijencem od roza i bijelog cvijeća, u ulazu salona",
  width: 1096,
  height: 1080,
};

export const roomPhotos = {
  salon: {
    src: "/demo/andrea-beauty-house/salon",
    alt: "Salon: bijeli manikir stolovi sa roze foteljama i zid sa lakovima za nokte",
    width: 1620,
    height: 1080,
  },
  kids: {
    src: "/demo/andrea-beauty-house/kids-fotelje",
    alt: "Dječja soba: niz roze fotelja sa kadicama za pedikir ispred zidnog murala sa dvorcem",
    width: 810,
    height: 1080,
  },
} as const satisfies Record<string, Photo>;

export const kidsPhotos = [
  {
    src: "/demo/andrea-beauty-house/kids-toaletni",
    alt: "Dva bijela dječja toaletna stočića sa ogledalima, krunicama i četkicama, uz velike plišane medvjede",
    width: 1741,
    height: 1080,
  },
  {
    src: "/demo/andrea-beauty-house/kids-sto",
    alt: "Dugačak dječji sto sa roze peškirićima, trakama za kosu i posudicama, uz šareni zid sa balonima",
    width: 810,
    height: 1080,
  },
] as const satisfies readonly Photo[];

export const interiorPhotos = [
  {
    src: "/demo/andrea-beauty-house/makaronsi",
    alt: "Tabure u obliku složenih makarona sa šoljicom kafe na vrhu, a u dnu prostora roze govornica",
    width: 810,
    height: 1080,
  },
  {
    src: "/demo/andrea-beauty-house/nail-zid",
    alt: "Šoljica kafe na keramičkom jastučiću, iza nje zid sa policama punim lakova za nokte",
    width: 608,
    height: 1080,
  },
] as const satisfies readonly Photo[];

/**
 * NOT RENDERED. Collected during research and deliberately kept off the page.
 *
 * Every field here either identifies a private individual, conflicts between
 * sources, or changes faster than a static page can follow. Publishing any of
 * it without the owner's confirmation would put wrong information in front of
 * her customers under her own name, so it stays in the audit trail until she
 * confirms each line herself.
 */
export const researchOnly = {
  phoneVariants: { value: ["<withheld — two conflicting mobile numbers>"], needsConfirmation: true },
  email: { value: "<withheld — address found in a third-party listing>", needsConfirmation: true },
  streetAddress: { value: "<withheld — building name only in listings>", needsConfirmation: true },
  legalEntity: { value: "<withheld — registry name differs from brand>", needsConfirmation: true },
  openingHours: {
    value: "<withheld — listing and profile disagree about the last day of the week>",
    needsConfirmation: true,
  },
  priceList: {
    value: "<withheld — published only as an Instagram story highlight, changes>",
    needsConfirmation: true,
  },
} as const;
