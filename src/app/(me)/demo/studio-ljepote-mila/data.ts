/**
 * Studio ljepote Mila — beauty & PMU studio, City Kvart, Podgorica.
 *
 * Outreach design concept. Everything rendered on the page comes from the
 * studio's own public channels (its official site and Instagram profile, read
 * 29 August 2026) and is limited to the categories of work the studio itself
 * names. What the public sources do not state clearly — an exact street
 * address, a phone number, prices, a schedule, how long the artist has worked
 * — is deliberately absent from the rendered page and lives in `researchOnly`
 * below, unrendered, until the studio confirms it.
 *
 * Two rules the copy is written against, and which any future edit must keep:
 * no outcome or medical promise (nothing "trajno", "bezbolno" or
 * "garantovano"), and no claim about experience, awards or results. Permanent
 * makeup is described as a way of working — precision, a line that follows the
 * face — never as a guaranteed outcome.
 */

export const studio = {
  name: "Studio ljepote Mila",
  artist: "Dragana Mila",
  role: "PMU umjetnica i edukatorka",
  /** The only location string that may ever be rendered — see researchOnly. */
  area: "City Kvart, Podgorica",
  instagram: "studio_ljepote_mila",
  instagramUrl: "https://www.instagram.com/studio_ljepote_mila/",
  /** The studio's existing, working shop. The page links to it, never replaces it. */
  shopUrl: "https://draganamila.me/shop/",
} as const;

/** The magazine running foot under the masthead: what the studio does, in order. */
export const runningFoot = [
  "Epilacija",
  "Lice i tijelo",
  "Lash & brow",
  "Permanent makeup",
  "Edukacije",
  "Shop",
] as const;

export interface Entrance {
  id: string;
  /** In-page target — each rubrika opens the section that answers it. */
  href: string;
  title: string;
  deck: string;
}

/* Three ways into the same studio, written as magazine rubrics rather than a
   service menu: the full list of work lives in `treatments`, so these three
   only have to say where a visitor should start reading. */
export const entrances: Entrance[] = [
  {
    id: "tretmani",
    href: "#tretmani",
    title: "Tretmani",
    deck: "Epilacija, njega lica i tijela, lash & brow lift — sve u istom studiju.",
  },
  {
    id: "pmu",
    href: "#potpis",
    title: "Permanent makeup",
    deck: "Rad milimetrom: linija se crta prema licu, strpljivo i tiho.",
  },
  {
    id: "edukacije",
    href: "#edukacije",
    title: "Edukacije",
    deck: "Za one koje žele da uđu u isti zanat, pod istim potpisom.",
  },
];

export interface Treatment {
  title: string;
  line: string;
}

/* The exact set of categories the studio names publicly. Nothing may be added
   here without the studio saying it first — and nothing gets a price, a
   duration or a promised result. */
export const treatments: Treatment[] = [
  {
    title: "Epilacija / laser",
    line: "Laserski tretmani i epilacija, dogovoreni prema koži i planu koji se pravi unaprijed.",
  },
  {
    title: "Tretmani lica i tijela",
    line: "Njega lica i tijela u studiju — od pripreme kože do onoga što se radi kod kuće poslije.",
  },
  {
    title: "Lash & brow lift",
    line: "Podizanje trepavica i oblikovanje obrva: sitan rad koji mijenja pogled, a ne lice.",
  },
  {
    title: "Permanent makeup",
    line: "Pigment u tankim potezima, tako da crta prati oblik lica umjesto da ga nadglasa.",
  },
  {
    title: "Edukacije",
    line: "Obuke iz rada koji se u studiju radi svakodnevno, u malim grupama i jedan na jedan.",
  },
  {
    title: "Profesionalni shop",
    line: "Preparati i pribor koje studio koristi, iz postojeće zvanične online prodavnice.",
  },
];

export interface Photo {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  width: number;
  height: number;
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  /** Every frame here is borrowed for the concept only. */
  replaceBeforeProduction: boolean;
}

export const portrait: Photo = {
  src: "/demo/studio-ljepote-mila/portret",
  alt: "Portret Dragane Mile: tamnoplava haljina sa širokim naborima i cvijet u kosi, studijsko svjetlo na sivoj pozadini",
  width: 1024,
  height: 1024,
  sourceUrl: "https://draganamila.me/wp-content/uploads/2025/04/Dragana.webp",
  sourceDate: "2026-08-29",
  rightsStatus: "self-published on the business's official site; concept use not yet approved",
  replaceBeforeProduction: true,
};

/** Her real handwritten signature — a small transparent PNG, so it is placed
 *  on porcelain surfaces only and used at its native proportions. No responsive
 *  variants: at every rendered size it is smaller than the source. */
export const signature = {
  src: "/demo/studio-ljepote-mila/potpis.png",
  alt: "Rukom pisan potpis: Dragana Mila",
  width: 609,
  height: 106,
  sourceUrl: "https://draganamila.me/wp-content/uploads/2025/04/potpis.png",
  sourceDate: "2026-08-29",
  rightsStatus: "self-published on the business's official site; concept use not yet approved",
  replaceBeforeProduction: true,
} as const;

/**
 * NEVER RENDERED. Facts that surfaced during research but are either
 * contradicted between sources or would be a claim we cannot stand behind.
 * Values are intentionally left null: none of them was verified well enough to
 * write down, and a placeholder here would eventually be pasted onto the page
 * by someone who trusted it. Confirm each with the studio, then move it up.
 */
export const researchOnly = {
  streetAddress: {
    value: null,
    needsConfirmation: true,
    note: "Public sources give two different street numbers for the studio. Until the studio confirms one, the page renders the neighbourhood only ('City Kvart, Podgorica') and carries no map.",
  },
  phone: {
    value: null,
    needsConfirmation: true,
    note: "A contact number appears on directory listings but not consistently on the studio's own channels. Not rendered; Instagram is the single contact route on this page.",
  },
  email: {
    value: null,
    needsConfirmation: true,
    note: "A shop-order address exists on the official site. It belongs to the shop, not the studio, so it is not a contact route for treatments.",
  },
  yearsOfExperience: {
    value: null,
    needsConfirmation: true,
    note: "Different sources state different lengths of experience. No experience claim appears anywhere in the rendered copy.",
  },
  certificationClaims: {
    value: null,
    needsConfirmation: true,
    note: "Training/association claims appear on third-party pages. Unverifiable from here, and a credential claim is exactly the kind of thing that must not be invented for a concept.",
  },
  pricesAndSchedule: {
    value: null,
    needsConfirmation: true,
    note: "No price, package or working hours is published consistently. The page therefore says every appointment is arranged by message, which is true regardless.",
  },
} as const;
