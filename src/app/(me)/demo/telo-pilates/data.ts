/**
 * Telo Pilates Club — reformer pilates studio, Podgorica (zona Vektra).
 *
 * Outreach design concept. Everything rendered on the page comes from the
 * studio's own public channels, read 29 August 2026: the Instagram profile
 * @telopilates.me and the public booking system the studio links from it.
 *
 * Two rules govern this file.
 *
 * 1. The booking system is the single source of truth for schedule, price,
 *    duration and capacity, so none of it is duplicated here. A second copy of
 *    a live timetable is wrong the first week it goes stale; the page hands the
 *    visitor over to the system instead of restating it.
 * 2. Anything the studio says about itself is attributed to the studio, never
 *    asserted by us — see `method.claim`.
 *
 * Facts that exist but must not reach the page live in `researchOnly` at the
 * bottom, each with the reason it is held back.
 */

export const studio = {
  name: "Telo Pilates Club",
  /* Set as text in Libre Caslon Display, lowercase, final period kept — the
     studio's own wordmark rebuilt in type rather than pasted in as an image,
     so it stays selectable, translatable and sharp at any size. */
  wordmark: "telo pilates club.",
  /* Deliberately generalised. No street, no pin, no map on this page: the
     studio has not published a street address itself. */
  area: "Vektra, Podgorica",
  bookingUrl: "https://n1396627.alteg.io/",
  instagram: "telopilates.me",
  instagramUrl: "https://www.instagram.com/telopilates.me/",
} as const;

export interface StudioFormat {
  id: string;
  /** The category label as the studio's own booking system offers it. */
  name: string;
  /** One line of orientation — what kind of setting the visitor walks into.
      No duration, price, capacity, level or health claim: the studio has not
      published those, and the booking system owns them. */
  setting: string;
}

/* The one job of this page: let someone decide which format to book before
   they open a booking calendar full of unfamiliar names. So each line answers
   "who else is in the room" or "what is the emphasis", nothing more. */
export const formats: StudioFormat[] = [
  {
    id: "grupni-reformer",
    name: "grupni reformer",
    setting: "Zajednički termin u sali — instruktor vodi grupu kroz čas.",
  },
  {
    id: "split-duo",
    name: "split / duo",
    setting: "Dvoje u terminu. Bliže individualnom radu, a dolaziš s nekim.",
  },
  {
    id: "individualni-rad",
    name: "individualni rad",
    setting: "Sam sa instruktorom, tempo i izbor sprave prate ono što tog dana radiš.",
  },
  {
    id: "stretching",
    name: "stretching",
    setting: "Blaži format, težište je na istezanju i opsegu pokreta.",
  },
  {
    id: "healthy-spine",
    name: "healthy spine",
    setting: "Fokus je na kičmi i držanju, u blažem tempu.",
  },
];

export const method = {
  /* Rendered with the attribution intact. A certification is not something we
     can verify from outside, so the page reports that the studio states it. */
  claim: "Studio navodi da radi po Polestar metodologiji.",
  /* Named by the studio itself when describing individual classes. Rendered as
     one set line, never as five separate cards — it is an inventory, not a
     feature list. */
  equipment: ["reformer", "tower", "chair", "spine corrector", "strunjača"],
} as const;

/* Three things a first-timer can actually do something about. No promise of
   results, no level, no health claim — those would be ours, not the studio's. */
export const firstVisit: readonly string[] = [
  "Udobna odjeća u kojoj se slobodno krećeš.",
  "Dođi nekoliko minuta ranije, da bez žurbe uđeš u salu.",
  "Instruktor te vodi kroz spravu — kako se namješta i kako se na njoj radi.",
];

export const languages = {
  /* Rendered large, as the graphic of that band. */
  codes: ["mne", "eng", "rus"],
  line: "Časovi se vode na crnogorskom, engleskom i ruskom jeziku.",
} as const;

/* ------------------------------------------------------------------ *
 * Never rendered.                                                     *
 * ------------------------------------------------------------------ */

/**
 * Research notes. None of this reaches the DOM.
 *
 * The phone number and the instructors' names are public, but a concept page
 * sent cold to a business must not publish a person or a private line before
 * the business has agreed to it. Schedule, price and language-per-class detail
 * belong to the booking system, which changes without telling us.
 */
export const researchOnly = {
  phone: { value: "held in the outreach sheet, not here", needsConfirmation: true },
  instructors: {
    value: "two instructors named on the public profile",
    reason: "Named people never go on an unsolicited concept page. No staff section.",
    needsConfirmation: true,
  },
  polestarCertification: {
    value: "the studio states it works to the Polestar methodology",
    reason: "Rendered only as an attributed statement, never as our claim.",
    needsConfirmation: true,
  },
  bookingSystem: {
    value: "Alteg.io tenant behind studio.bookingUrl; holds schedule, prices, durations",
    reason:
      "The page links to it and restates nothing from it — a mirrored timetable is stale on day one.",
    needsConfirmation: false,
  },
  liveDomain: {
    value: "the studio's current domain shows an unrelated placeholder",
    reason: "Never mentioned on the page. The pitch is the landing page, not the criticism.",
    needsConfirmation: false,
  },
} as const;

/**
 * Reference material used to build the page, none of it shipped.
 *
 * The wordmark tile was read for two things only: the exact butter of its
 * ground and the letterforms of the lowercase logotype. It is not copied into
 * `public/`, not converted, and not rendered — the page carries no images at
 * all, so nothing of the studio's is republished here.
 */
export const referenceAssets = [
  {
    file: "scratchpad/assets/telo/wordmark.jpg",
    sourceUrl: "https://www.instagram.com/telopilates.me/",
    sourceDate: "2026-08-29",
    rightsStatus:
      "Studio's own wordmark tile from its public profile. Reference only — sampled for palette and letterform, never republished.",
    replaceBeforeProduction: true,
    sampledGround: "#FEFFDF → the page's --telo-butter",
  },
] as const;
