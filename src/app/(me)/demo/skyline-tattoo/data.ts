/**
 * Skyline Tattoo Studio — tattoo and piercing, Podgorica.
 *
 * Outreach design concept. Every fact rendered on the page comes from the
 * studio's own public Instagram profile, @skylinetattooss, read 30 August 2026.
 * The studio has no website and no booking system, so the profile is the only
 * source of truth and the only destination the page sends anyone to.
 *
 * Three rules govern this file.
 *
 * 1. A tattoo portfolio with nothing in it is not a portfolio. The page shows
 *    work, and every frame on it was picked under one filter: no recognisable
 *    face, no intimate body area, no before/after. What is left is forearms,
 *    a calf, an upper arm and the studio's own doorway. The files are saved and
 *    re-encoded locally, never hotlinked, every one of them is logged in
 *    `photoProvenance` with the URL it came from, and every one is
 *    `replaceBeforeProduction` — a directory listing is not consent, and the
 *    footer says so on the page rather than only in this comment.
 * 2. `Minimal`, `Bold` and `Piercings` are not our invention — they are the
 *    studio's own highlight labels. The whole middle of the page is built on
 *    them rather than on categories we made up.
 * 3. Numbers, names and addresses that exist publicly but are not ours to
 *    publish live in `researchOnly`, each with the reason it is held back.
 */

export const studio = {
  name: "Skyline Tattoo Studio",
  /* Set as type, not pasted in as a logo file: the studio's mark has not been
     licensed to us, and a wordmark rebuilt in the page's own display face
     stays selectable and sharp at any size. */
  wordmark: "SKYLINE",
  /* Verbatim from the profile's public display name,
     "Skyline Tattoo Studio | Tattoos & Piercing". */
  descriptor: "Tattoos & Piercing",
  /* City only. A local directory places the studio near Rimski trg, but that
     is a third-party listing the studio has not published itself. */
  area: "Podgorica",
  instagram: "skylinetattooss",
  instagramUrl: "https://www.instagram.com/skylinetattooss/",
} as const;

export interface WorkStrand {
  /** The studio's own highlight label, rendered as the section's name. */
  name: string;
  /** The label as the profile spells it, used in the link to that highlight. */
  highlight: string;
  /** What that strand of the work actually looks like in the current feed.
      Describes the drawing, never a promise about the result or the session. */
  line: string;
}

/**
 * The three strands, in the order the profile pins them.
 *
 * They are written out as named keys rather than an array because the page
 * gives each one a different composition, weight and ground — a loop over
 * three identical blocks is exactly the card row this page must not become.
 */
export const strands: Record<"minimal" | "bold" | "piercing", WorkStrand> = {
  minimal: {
    name: "Minimal",
    highlight: "Minimal",
    line: "Tanak linework, čist prostor oko motiva i sitniji formati. Rad koji se čita izbliza.",
  },
  bold: {
    name: "Bold",
    highlight: "Bold",
    line: "Black & grey, veće površine i gust detalj. Motivi kojima treba prostor i koji se vide preko sobe.",
  },
  piercing: {
    name: "Piercing",
    highlight: "Piercings",
    line: "Piercing stoji uz tetovažu u samom imenu studija i vodi se kao zasebna cjelina rada.",
  },
};

/**
 * What makes a first message useful.
 *
 * Four things, and the page renders them as running type, never as a form.
 * Collecting a motif, a body position and a size on a concept page would be a
 * fake intake that nobody at the studio would ever receive.
 */
export const brief: readonly string[] = [
  "motiv",
  "pozicija na tijelu",
  "približna veličina",
  "reference",
];

/* ------------------------------------------------------------------ *
 * The work.                                                           *
 * ------------------------------------------------------------------ */

export interface Photo {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * A frame in the portfolio run.
 *
 * The caption names the technique and the placement and stops there. It never
 * names an artist, a session, a price or a healing time — none of that is
 * published anywhere, and a caption is the easiest place on a page to invent
 * something by accident.
 */
export interface Work extends Photo {
  caption: string;
}

/**
 * The one photograph above the fold.
 *
 * Its own background is black, which is the page's ground colour to within a
 * shade, so on the dark page the forearm reads as floating rather than as a
 * picture in a box. That is why it leads: no frame, no card, no crop marks.
 */
export const heroWork: Photo = {
  src: "/demo/skyline-tattoo/podlaktica-skulptura",
  alt: "Tetovaža na podlaktici u crno-sivoj tehnici: portret kamene skulpture, a ispod njega šaka koja drži zapaljenu cigaru",
  width: 1280,
  height: 1600,
};

/**
 * The portfolio, in the order the page runs it.
 *
 * Named keys rather than an array, for the same reason the three strands are:
 * every frame gets its own width, its own alignment and its own scale, and a
 * `.map()` over five frames would flatten exactly the variety that keeps this
 * from looking like a tiled feed. Two of them sit on light backgrounds and are
 * used as the page's hard-edged, full-width moments; the three shot against
 * black float without an edge.
 */
export const works: Record<"konj" | "fineLinije" | "bulke" | "suma" | "vaza", Work> = {
  konj: {
    src: "/demo/skyline-tattoo/svjeza-linija-konj",
    alt: "Podlaktica tokom rada: svježe iscrtana tamnoplava linija konjske glave sa malom zvijezdom, ruka naslonjena na papirnu podlogu",
    width: 1200,
    height: 1600,
    caption: "Svježa linija, u toku rada",
  },
  fineLinije: {
    src: "/demo/skyline-tattoo/podlaktica-fine-linije",
    alt: "Podlaktica sa dvije tetovaže u finoj liniji: figura sa kačketom koja puši i bodež oko kojeg je obavijena crvena zmija",
    width: 1118,
    height: 1467,
    caption: "Fina linija, podlaktica",
  },
  bulke: {
    src: "/demo/skyline-tattoo/nadlaktica-bulke",
    alt: "Nadlaktica sa tetovažom crvenih bulki u boji; kadar je isječen ispod brade, bez lica",
    width: 505,
    height: 810,
    caption: "Boja, nadlaktica",
  },
  suma: {
    src: "/demo/skyline-tattoo/podlaktica-suma",
    alt: "Podlaktica sa crno-sivom tetovažom tamne šume: sitna silueta sa fenjerom na stazi, a pri dnu se motiv pretapa u obris lica",
    width: 526,
    height: 564,
    caption: "Black & grey, podlaktica",
  },
  vaza: {
    src: "/demo/skyline-tattoo/noga-vaza",
    alt: "List sa tetovažom u finoj liniji: ukrasna vaza iz koje raste stabljika sa sitnim licima među cvjetovima, a uz nogu je naslonjena šaka klijentkinje",
    width: 1080,
    height: 1080,
    caption: "Fina linija, list",
  },
};

/** The doorway, at dusk. The only thing on the page that states a location,
    and it states it the way the street does — with the studio's own sign. */
export const studioFront: Photo = {
  src: "/demo/skyline-tattoo/ulaz-natpis",
  alt: "Ulaz u studio u sumrak: osvijetljen natpis Sky Line Tattoos iznad staklenih vrata kroz koja se nazire enterijer",
  width: 1600,
  height: 1030,
};

/**
 * Provenance for every frame the page renders. Not copy — an audit trail.
 *
 * All seven come from the same public directory listing gallery, saved and
 * re-encoded locally so nothing is hotlinked. `replaceBeforeProduction` is true
 * on all of them without exception: a directory listing is not the studio's
 * permission and it is certainly not the client's.
 */
export interface PhotoProvenance {
  src: Photo["src"];
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  replaceBeforeProduction: boolean;
}

/** The listing page the gallery belongs to; the frames themselves are served
    from its image CDN, one numbered file per frame. */
const gallery = "https://podgoricadirectory.com/health-beauty/tattoo-shops/skyline-tattoos-piercing";

const directory = (n: number, version: number) =>
  `https://res.cloudinary.com/dz11ztynf/image/upload/f_auto,q_auto/v${version}/directory/podgorica/skyline-tattoos-piercing-${n}.jpg`;

export const photoProvenance: PhotoProvenance[] = [
  { src: heroWork.src, sourceUrl: directory(4, 1778584023) },
  { src: works.konj.src, sourceUrl: directory(5, 1778584024) },
  { src: works.fineLinije.src, sourceUrl: directory(1, 1778584018) },
  { src: works.bulke.src, sourceUrl: directory(9, 1778584030) },
  { src: works.suma.src, sourceUrl: directory(10, 1778584031) },
  { src: works.vaza.src, sourceUrl: directory(3, 1778584021) },
  { src: studioFront.src, sourceUrl: directory(7, 1778584027) },
].map((photo) => ({
  ...photo,
  sourceDate: "2026-08-30",
  rightsStatus: "unconfirmed — Podgorica Directory listing gallery, rights not cleared",
  replaceBeforeProduction: true,
}));

/* ------------------------------------------------------------------ *
 * Never rendered.                                                     *
 * ------------------------------------------------------------------ */

/**
 * Research notes. None of this reaches the DOM.
 */
export const researchOnly = {
  phones: {
    value: "two numbers published in the profile bio for WhatsApp and Viber",
    reason:
      "Public on their profile, but an unsolicited concept page must not republish a working line before the studio agrees to it. The page routes everything through the profile instead.",
    needsConfirmation: true,
  },
  artist: {
    value: "a public LinkedIn profile links one named artist to the studio",
    reason:
      "Third-party, self-published, and not confirmed by the studio's own profile. No named people and no team section on this page.",
    needsConfirmation: true,
  },
  location: {
    value: "a local directory listing places the studio near Rimski trg, Podgorica",
    reason:
      "Directory data the studio has not published itself. The page says Podgorica and nothing narrower, and carries no map.",
    needsConfirmation: true,
  },
  highlights: {
    value: "profile highlights read Studio, Minimal, Bold, Piercings",
    reason:
      "Rendered — these are the studio's own labels. `Studio` is the one we leave out: it is a behind-the-scenes reel, not a strand of the work.",
    needsConfirmation: false,
  },
  pricing: {
    value: "no prices, session lengths or deposit rules are published anywhere",
    reason:
      "Nothing to render, and nothing to invent. The page says these are agreed in the same conversation.",
    needsConfirmation: true,
  },
  officialSite: {
    value: "no website and no booking system found for the handle or the name",
    reason:
      "Never mentioned on the page. The pitch is the concept, not a critique of what is missing.",
    needsConfirmation: false,
  },
} as const;

/**
 * Every source opened while looking for imagery on 30 August 2026, and what
 * came of it — including the ones that gave nothing and the frames that were
 * deliberately left behind.
 *
 * The rejections are the useful half of this list. Three frames in the
 * directory gallery were reachable and were not taken, and the reason each one
 * was dropped is written down here so nobody re-adds it later on the grounds
 * that it was "already public".
 */
export interface AssetAudit {
  sourceUrl: string;
  sourceDate: string;
  outcome: string;
  replaceBeforeProduction: boolean;
}

export const assetAudit: AssetAudit[] = [
  {
    sourceUrl: "https://www.instagram.com/skylinetattooss/",
    outcome:
      "Unauthenticated fetch returns Instagram's login shell only — no post images, no profile picture, no og:image. The highlight-cover CDN links that did surface are signed and expire. Nothing downloaded.",
  },
  {
    sourceUrl:
      "https://www.findglocal.com/ME/Podgorica/153518-45/genre/551469561691940/Tattoo%2B%26%2BPiercing%2BShops",
    outcome: "Directory listing responds 403 to a plain request. Nothing downloaded.",
  },
  {
    sourceUrl: gallery,
    outcome:
      "A ten-frame public listing gallery, reachable and downloadable. Seven frames taken — the six on this page plus the doorway — all re-encoded locally by scripts/demo-photos.mjs. None of it is cleared: this is a third-party listing, not the studio's consent and not any client's.",
  },
  {
    sourceUrl: gallery,
    outcome:
      "Frame 2 of that gallery: a navel piercing. Excluded — intimate body area, no consent on record.",
  },
  {
    sourceUrl: gallery,
    outcome:
      "Frame 6: a tattoo on an upper thigh under a skirt hem. Excluded — borderline placement, and borderline is a rejection here.",
  },
  {
    sourceUrl: gallery,
    outcome:
      "Frame 8: a shirtless torso with a sleeve. Excluded on exposure; the same sleeve is already represented by the forearm frame in the hero.",
  },
].map((entry) => ({ ...entry, sourceDate: "2026-08-30", replaceBeforeProduction: true }));

/**
 * The material to ask the studio for before any of this goes to production.
 * Not rendered; it is the list that goes in the outreach message.
 */
export const requestBeforeProduction: readonly string[] = [
  "Original logo, and a simplified mark if one exists.",
  "Six to ten pieces per strand, in the original resolution, cropped clear of faces and with the client's written consent — these replace every directory frame currently on the concept.",
  "One frame of the studio and one of an artist working, nothing sensitive in shot.",
  "Confirmed artist or team, location, booking rules, piercing types and the aftercare information they want public.",
] as const;
