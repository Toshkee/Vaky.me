/**
 * Dental Clinic Kovačević — porodična stomatološka ordinacija, Igalo & Zelenika
 * (Herceg Novi).
 *
 * Outreach design concept. Everything rendered on the page comes from two
 * public records read on 29 August 2026: the clinic's own Instagram profile
 * (@dental_clinic_kovacevic) and a public professional directory listing that
 * names the three doctors and their fields. Nothing here is estimated.
 *
 * Two rules this file exists to enforce:
 *  1. Contact detail beyond the Instagram handle — phone numbers, e-mail,
 *     street addresses, working hours — is research, not copy. It lives in
 *     `researchOnly` and is never imported by page.tsx.
 *  2. No clinical claim the clinic has not published itself. The visible
 *     service language is three broad areas; the older, longer service list
 *     found in a 2019 listing stays unrendered until the clinic confirms it.
 */

export const clinic = {
  name: "Dental Clinic Kovačević",
  /** Rendered only as generalised areas — never as a street address. */
  areas: ["Igalo", "Zelenika"],
  /** A non-breaking space sits between the two words of the town's name below. */
  municipality: "Herceg Novi",
  instagram: "dental_clinic_kovacevic",
  instagramUrl: "https://www.instagram.com/dental_clinic_kovacevic/",
} as const;

export interface Field {
  title: string;
  body: string;
}

/** Three plain-language areas of work — no numbering, no per-doctor attribution. */
export const fields: Field[] = [
  {
    title: "Stomatologija",
    body: "Opšta briga o zubima — pregled, dogovor o planu terapije i redovno praćenje. Odavde počinje većina posjeta ordinaciji.",
  },
  {
    title: "Oralna hirurgija",
    body: "Hirurški zahvati u usnoj duplji. Šta je potrebno i kako izgleda postupak dogovara se prije same intervencije.",
  },
  {
    title: "Estetski i protetski rad",
    body: "Nadoknade, folije i krunice. Izgled i materijal biraju se zajedno sa pacijentom, prije početka rada.",
  },
];

export interface Step {
  title: string;
  body: string;
}

/** Three honest steps. No timings, no promises about the outcome. */
export const steps: Step[] = [
  { title: "Poruka", body: "Napišete šta vas muči ili šta biste htjeli da provjerite." },
  { title: "Dogovor termina", body: "Zajedno nalazimo termin, u Igalu ili u Zelenici." },
  { title: "Pregled i plan terapije", body: "Na pregledu se vidi stanje i dogovara dalji tok." },
];

export interface Doctor {
  name: string;
  /** Verbatim from the public directory listing — no titles were added. */
  field: string;
}

export const team: Doctor[] = [
  { name: "Nikola Kovačević", field: "oralna hirurgija" },
  { name: "Sanja Kovačević-Ožegović", field: "stomatologija" },
  { name: "Krsto Kovačević", field: "stomatologija" },
];

export interface Photo {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  replaceBeforeProduction: boolean;
}

/* Both frames are patient-free. Neither is captioned with a location: the
   source does not say which of the two ordinacije it shows, and guessing
   would put an unverified claim on the page. */
export const photos = [
  {
    src: "/demo/dental-clinic-kovacevic/ulaz",
    alt: "Ulaz u ordinaciju: staklena vrata sa matiranim staklom i crnim znakom ordinacije, uz kamenu fasadu sa natpisom Kovačević",
    caption: "Ulaz — znak ordinacije na matiranom staklu",
    width: 900,
    height: 500,
    sourceUrl: "https://travelmontenegro.me/wp-content/uploads/2019/03/dental-kovacevic.jpg",
    sourceDate: "2026-08-29",
    rightsStatus: "unconfirmed — Travel Montenegro listing (2019), rights not cleared",
    replaceBeforeProduction: true,
  },
  {
    src: "/demo/dental-clinic-kovacevic/ordinacija",
    alt: "Bijela ordinacija sa stomatološkom stolicom, radnom lampom i zidnim natpisom Dental Clinic Kovačević",
    caption: "Sala — bijela ordinacija sa stomatološkom stolicom",
    width: 900,
    height: 500,
    sourceUrl: "https://travelmontenegro.me/wp-content/uploads/2019/03/dental-klinik-kovacevic.jpg",
    sourceDate: "2026-08-29",
    rightsStatus: "unconfirmed — Travel Montenegro listing (2019), rights not cleared",
    replaceBeforeProduction: true,
  },
] as const satisfies readonly Photo[];

/**
 * NOT FOR RENDERING.
 *
 * Collected while researching the concept and deliberately kept out of the
 * page. Two reasons run through all of it: the studio does not publish a
 * business's phone number, e-mail, address, hours, prices or ratings on an
 * unsolicited concept page, and every claim below is either unconfirmed or
 * dated. page.tsx does not import this object — if it ever does, that is a bug.
 */
export const researchOnly = {
  contact: {
    needsConfirmation: true,
    note: "Numbers and e-mail appear on a 2019 tourism listing and on a sticker in the entrance photograph. Unverified, possibly stale, and out of scope for an outreach concept — the only contact route on the page is the clinic's own Instagram inbox.",
    phones: ["[redacted — see 2019 listing]"],
    email: "[redacted — see 2019 listing]",
    addresses: "[redacted] — two locations in Igalo and Zelenika; the listing's institute address conflicts with the clinic's own posts.",
    openingHours: "[unknown] — never published by the clinic on a channel we can cite.",
  },
  longevityClaim: {
    needsConfirmation: true,
    claim: "A third-party listing implies the practice has run since the late eighties.",
    note: "Not repeated by the clinic itself anywhere public. A longevity claim is exactly the kind of sentence a competitor screenshots, so the page says 'porodična ordinacija' and stops there.",
  },
  fullServiceListFrom2019Listing: {
    needsConfirmation: true,
    items: [
      "parodontologija",
      "implantologija",
      "ortodoncija",
      "dječja stomatologija",
      "endodoncija",
      "protetika",
    ],
    note: "Seven years old and from a directory, not from the clinic. Rendered copy narrows to the three areas the clinic's own current profile and the doctors' listed fields support.",
  },
  directoryRating: {
    needsConfirmation: true,
    note: "A public directory shows a rating and review count. Never rendered: a concept page must not borrow someone else's review data, and the number moves.",
  },
  brandedProducts: {
    needsConfirmation: true,
    note: "Recent posts name a branded veneer system. Trademarks are not ours to print, so visible copy stays generic: 'folije', 'krunice', 'nadoknade'.",
  },
} as const;
