/**
 * Studio Pilates by Maja — group and personal training, Podgorica.
 *
 * Outreach design concept. Every fact rendered on the page comes from the
 * studio's own public Instagram profile and from public business registries,
 * all read 30 August 2026. Sources are listed in `sources` below.
 *
 * Four rules govern this file.
 *
 * 1. The studio has no website and no booking system. Its schedule lives in a
 *    single Instagram post that is replaced every week, so nothing about it is
 *    copied here — the page hands the visitor to the post instead. A mirrored
 *    timetable on a concept page is wrong the first week it goes stale.
 * 2. The studio is NOT a reformer studio. The feed shows mat work, TRX,
 *    resistance training and mobility. Nothing here may imply apparatus the
 *    studio has not shown — which is why the reformer frames that came back
 *    with the stock set were deleted rather than kept for later use.
 * 3. Anything the studio has not published about itself — instructor name,
 *    certification, phone, street, hours, prices, capacity — stays in
 *    `researchOnly` with the reason it is held back.
 * 4. The connective copy (how a first visit reads, what the two tracks suit)
 *    is concept writing, not quoted fact. It stays inside the vocabulary the
 *    profile itself uses and promises no result. See `copyNote`.
 */

export const studio = {
  name: "Studio Pilates by Maja",
  /* Split so the header can set the two halves in different faces. The name
     is rendered exactly as the public profile writes it, never re-branded. */
  wordmarkStrong: "Studio Pilates",
  wordmarkLight: "by Maja",
  /* City only. A fitness directory publishes a street for this club, but a
     directory is not the studio's own publication — see `researchOnly`. */
  area: "Podgorica",
  instagram: "studiopilatesbymaja",
  instagramUrl: "https://www.instagram.com/studiopilatesbymaja/",
  /* The single post that carried the current week's schedule on the access
     date. It is the studio's own source of truth and it rotates, so the page
     labels the link as "current times" rather than restating any of them. */
  scheduleUrl: "https://www.instagram.com/studiopilatesbymaja/p/DcgQ0WyKSdw/",
} as const;

/* The h1, in two pieces so the display face can set the first word in italic
   without a hard-coded fragment in the markup. Sentence case, and it is never
   uppercased in CSS: the promise of this studio is a rhythm someone can keep,
   and a shouted headline says the opposite of that. */
export const headline = {
  accent: "Ritam",
  rest: "koji možeš da održiš.",
} as const;

/* The one line under the headline. It names what the studio actually trains —
   control, breath, posture — before it names either format, because that is
   the difference a visitor is trying to hear in the first two seconds. */
export const deck =
  "Kontrolisan pokret, disanje i držanje tijela — u grupi ili jedan na jedan, u Podgorici.";

export interface TrainingTrack {
  id: string;
  name: string;
  /** What the session physically is. */
  lead: string;
  /** Who it tends to suit — phrased as a fit, never as a promised outcome. */
  suits: string;
}

/* The one decision this page exists to make easy. The profile shows both
   formats and explains neither, so the page separates them and stops there:
   no duration, no price, no group size, no level. The studio has published
   none of that. */
export const tracks: TrainingTrack[] = [
  {
    id: "grupni",
    name: "Grupni trening",
    lead: "Zajednički termin u sali. Trener vodi cijelu grupu kroz isti niz vježbi, pa se tempo i disanje drže zajedno — dolaziš u termin koji već stoji u rasporedu.",
    suits:
      "Dobro leži onima koji lakše istraju kad postoji fiksno vrijeme i grupa u kojoj se to vrijeme provodi.",
  },
  {
    id: "personalni",
    name: "Personalni trening",
    lead: "Rad jedan na jedan. Izbor vježbi, opterećenje i tempo prate ono što tog dana možeš, a trener gleda samo tvoje izvođenje i ispravlja držanje dok serija traje.",
    suits:
      "Ima smisla kad se vraćaš treningu poslije duže pauze, kad se radi na tehnici ili kad ti nijedan grupni termin ne odgovara.",
  },
];

/* The verified vocabulary, kept as data so the page can bold the same words it
   is allowed to say. Rendered inside a sentence rather than as a list — this
   is an inventory of what appears in the room, not a feature set. */
export const disciplines = ["mat pilates", "TRX", "vježbe sa opterećenjem", "mobilnost"] as const;

/* What the studio's own material shows it optimising for. Written around
   control, breath and posture rather than around load, because that is what
   separates this room from a weights gym. */
export const method: readonly string[] = [
  "Težište je na kontrolisanom pokretu: sporije izvođenje, disanje koje prati pokret i držanje koje se ne raspada pred kraj serije.",
  "Ne mjeri se koliko je trening bio težak, nego koliko pokret izgleda isto na prvom i na posljednjem ponavljanju.",
];

export const firstVisit: readonly string[] = [
  "Najlakše je početi od grupnog termina: vidiš kako sala radi, kako se vodi čas i kojim tempom se ide, bez obaveze da unaprijed znaš šta ti treba.",
  "Ponesi odjeću koja te ne steže i patike u kojima se slobodno krećeš. Dođi nekoliko minuta ranije, da bez žurbe stigneš da se javiš i kažeš ako nešto treba prilagoditi.",
  "Ako ti nijedan grupni termin ne odgovara ili želiš da se radi samo na tebi, personalni trening se dogovara direktno kroz poruku.",
];

/* Both public registries describe the same thing — a registered sports and
   fitness club — so the page states that much and nothing more. The
   registration year is deliberately left out: a registry date is not the same
   as how long the studio has been training people, and this page does not
   claim years of experience. */
export const publicRecord =
  "U javnim evidencijama studio je vođen kao sportski i fitnes klub i naveden je u spisku sportskih klubova Glavnog grada.";

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

/* Provenance for every frame on the page. Kept out of the rendered markup —
   it is an audit trail for us, not copy for a visitor — but the footer states
   in plain Montenegrin that the photographs are stand-ins. Each file was
   re-encoded locally and is served same-origin; nothing is hotlinked. */
export interface PhotoProvenance {
  src: Photo["src"];
  sourceUrl: string;
  sourceDate: string;
  rightsStatus: string;
  replaceBeforeProduction: boolean;
}

export const photoProvenance: PhotoProvenance[] = [
  {
    src: "/demo/pilates-by-maja/studio-mat-postavka",
    sourceUrl: "https://www.pexels.com/photo/37573625/",
    rightsStatus:
      "stock — Pexels free-license photo, standing in for the client's own photography; not this studio; no people shown",
  },
  {
    src: "/demo/pilates-by-maja/mat-lopta-pokret",
    sourceUrl: "https://www.pexels.com/photo/14591573/",
    rightsStatus:
      "stock — Pexels free-license photo, standing in for the client's own photography; not this studio; face turned away and covered by hair",
  },
  {
    src: "/demo/pilates-by-maja/vodjeni-most",
    sourceUrl: "https://www.pexels.com/photo/4587402/",
    rightsStatus:
      "stock — Pexels free-license photo, standing in for the client's own photography; not this studio; cropped locally so neither head is in frame",
  },
  {
    src: "/demo/pilates-by-maja/strunjaca-ruke",
    sourceUrl: "https://www.pexels.com/photo/4498609/",
    rightsStatus:
      "stock — Pexels free-license photo, standing in for the client's own photography; not this studio; model's face not shown",
  },
].map((photo) => ({ ...photo, sourceDate: "2026-08-30", replaceBeforeProduction: true }));

/**
 * The four frames the page renders, in page order.
 *
 * Alt text describes the frame and nothing beyond it. None of these rooms,
 * people or objects belong to this studio, so no alt string, caption or
 * sentence of copy may say or imply that they do.
 *
 * Every frame is floor work. Reformer frames came back with the stock set and
 * were deleted rather than kept unused: the studio has never presented itself
 * as a reformer studio, and apparatus it does not own would misdescribe the
 * business to its own customers. Suspension-strap frames were dropped for a
 * softer reason — TRX is a real format here, but two of four photographs on
 * straps made the page read as functional training rather than Pilates. The
 * formats list still names TRX; the photography now leads with the mat.
 */
export const heroPhoto: Photo = {
  src: "/demo/pilates-by-maja/studio-mat-postavka",
  alt: "Prazna sala za mat pilates: strunjače sa malim loptama poređane po drvenom podu, balet šipka uz zid i polica sa smotanim strunjačama i rekvizitima, u svjetlu sa velikog prozora",
  width: 1200,
  height: 1600,
};

export const trainingPhoto: Photo = {
  src: "/demo/pilates-by-maja/mat-lopta-pokret",
  alt: "Vježbačica leži na strunjači i vodi malu pilates loptu u ispruženoj ruci, koljena savijena; iza nje police sa loptama, blokovima i balet šipka",
  width: 1200,
  height: 1800,
};

export const methodPhoto: Photo = {
  src: "/demo/pilates-by-maja/vodjeni-most",
  alt: "Most na strunjači sa elastičnom trakom iznad koljena, kadar odsječen iznad ramena; sa strane se vidi ruka instruktorke koja vodi tempo pokreta",
  width: 1200,
  height: 800,
};

export const firstVisitPhoto: Photo = {
  src: "/demo/pilates-by-maja/strunjaca-ruke",
  alt: "Ruke koje odmotavaju strunjaču na drvenom podu, uz nekoliko malih bučica sa strane",
  width: 1200,
  height: 800,
};

/* ------------------------------------------------------------------ *
 * Provenance                                                          *
 * ------------------------------------------------------------------ */

export interface FactSource {
  label: string;
  sourceUrl: string;
  accessDate: string;
  /** What this source was used for on the rendered page. */
  usedFor: string;
}

export const sources: FactSource[] = [
  {
    label: "Instagram — zvanični profil studija",
    sourceUrl: "https://www.instagram.com/studiopilatesbymaja/",
    accessDate: "2026-08-30",
    usedFor:
      "Naziv studija, grad, postojanje grupnog i personalnog treninga, mat pilates / TRX / rad sa opterećenjem / mobilnost, i odredište svih CTA dugmadi.",
  },
  {
    label: "Instagram — objava sa aktuelnim rasporedom",
    sourceUrl: "https://www.instagram.com/studiopilatesbymaja/p/DcgQ0WyKSdw/",
    accessDate: "2026-08-30",
    usedFor:
      "Odredište CTA „Pogledaj aktuelne termine”. Sadržaj objave se ne prepisuje jer se mijenja sedmično.",
  },
  {
    label: "CompanyWall — poslovna evidencija",
    sourceUrl:
      "https://www.companywall.me/firma/body-building-i-fitnes-klub-studio-pilates-by-maja/MMUUQuY",
    accessDate: "2026-08-30",
    usedFor: "Potvrda da je klub registrovan kao sportski i fitnes klub (bez godine i bez adrese).",
  },
  {
    label: "Glavni grad Podgorica — spisak sportskih klubova",
    sourceUrl: "https://sport.podgorica.me/ostali-sportski-klubovi/",
    accessDate: "2026-08-30",
    usedFor: "Potvrda da je klub naveden u gradskom spisku sportskih klubova.",
  },
];

export interface AssetAudit {
  sourceUrl: string;
  accessDate: string;
  finding: string;
  decision: string;
  replaceBeforeProduction: boolean;
}

/**
 * Image audit, 30 August 2026.
 *
 * Nothing belonging to this studio could be used. Its public material is
 * training footage in which clients are recognisable, which this concept may
 * not republish without written consent, and none of it is technically
 * reachable either — the profile answers a plain request with a logged-out
 * script shell carrying no image URLs, the fitness directory listing holds no
 * photograph of the studio at all, and the archive host is unreachable from
 * here.
 *
 * So the page ships licensed stock stand-ins instead: see `photoProvenance`,
 * every entry `replaceBeforeProduction: true`. They were chosen for frames
 * with no recognisable face and for equipment the studio has actually shown.
 * The footer says in Montenegrin that they are stand-ins, so no visitor and no
 * business owner can read them as photographs of this room.
 */
export const assetAudit: AssetAudit[] = [
  {
    sourceUrl: "https://www.instagram.com/studiopilatesbymaja/",
    accessDate: "2026-08-30",
    finding:
      "Profil vraća samo logged-out JS ljusku — nema og:image ni jednog CDN linka ka fotografijama. Sam feed prikazuje treninge sa prepoznatljivim klijentima.",
    decision:
      "Ništa nije preuzeto. Za produkciju su potrebni originali od studija i pisana saglasnost prikazanih osoba.",
    replaceBeforeProduction: true,
  },
  {
    sourceUrl:
      "https://www.localgymsandfitness.com/ME/Podgorica/1745096002429590/Studio-Pilates-by-Maja",
    accessDate: "2026-08-30",
    finding: "Listing ne sadrži nijednu fotografiju studija, samo šablon za mapu.",
    decision: "Nema upotrebljivog materijala.",
    replaceBeforeProduction: false,
  },
  {
    sourceUrl: "https://www.instagram.com/studiopilatesbymaja/reel/DZwic02q5mR/",
    accessDate: "2026-08-30",
    finding: "Snimak personalnog treninga; kadar sadrži prepoznatljivo tijelo klijenta.",
    decision: "Isključeno pravilom o privatnosti, bez obzira na dostupnost.",
    replaceBeforeProduction: true,
  },
  {
    sourceUrl: "https://www.pexels.com/photo/25596675/",
    accessDate: "2026-08-30",
    finding:
      "Preuzet i optimizovan stock kadar sa reformer spravom, kao i dva enterijera reformer sale.",
    decision:
      "Obrisano iz repozitorijuma. Studio se nikada nije predstavio kao reformer studio, pa bi takav kadar pogrešno opisao posao.",
    replaceBeforeProduction: false,
  },
  {
    sourceUrl: "https://www.pexels.com/photo/8436135/",
    accessDate: "2026-08-30",
    finding:
      "Dva stock kadra vježbanja na TRX kaiševima u sali jako roze boje.",
    decision:
      "Zamijenjeni kadrovima rada na strunjači. TRX jeste format ovog studija i ostaje naveden u tekstu, ali dvije od četiri fotografije na kaiševima činile su da stranica djeluje kao funkcionalni trening, a ne kao pilates.",
    replaceBeforeProduction: false,
  },
];

/**
 * The interpretive copy on the page — the two track descriptions, the first
 * visit paragraphs and the sentences about controlled work — is written by us
 * inside the vocabulary the profile itself uses. It states no result, no
 * duration, no price and no health outcome, and the VibeLab strip at the top
 * of the page tells the reader the data is illustrative. Before anything ships
 * to production the studio confirms or rewrites these blocks.
 */
export const copyNote =
  "Opisi treninga i prvog dolaska su koncept copy; potvrđuje ih studio prije objave.";

/* ------------------------------------------------------------------ *
 * Never rendered.                                                     *
 * ------------------------------------------------------------------ */

/**
 * Research notes. None of this reaches the DOM.
 */
export const researchOnly = {
  streetAddress: {
    value: "a street address for this club is published by a fitness directory",
    reason:
      "The studio has not published a street itself. A directory entry is not permission, and a wrong pin on an unsolicited concept page is worse than none. No map on this page for the same reason.",
    needsConfirmation: true,
  },
  phone: {
    value: "held in the outreach sheet, not here",
    reason: "No phone number goes on a concept page the business did not ask for.",
    needsConfirmation: true,
  },
  instructorName: {
    value: "a named person is publicly associated with the studio",
    reason:
      "Named people never appear on an unsolicited concept page. There is no team section, and the wordmark uses only the business name as the profile writes it.",
    needsConfirmation: true,
  },
  stottCertification: {
    value: "a self-published professional profile mentions STOTT Pilates instructor experience",
    reason:
      "Self-published and unverifiable from outside, and a certification is the kind of claim that must be exact. Not rendered in any form, not even attributed.",
    needsConfirmation: true,
  },
  registrationYear: {
    value: "the business registry shows the club registered in 2016",
    reason:
      "A registration date is not operating history. Rendering it would read as a years-of-experience claim we cannot support.",
    needsConfirmation: true,
  },
  currentSchedule: {
    value: "the current week's times are published as an Instagram graphic",
    reason:
      "Rotates weekly. The page links the post and restates nothing from it — see `studio.scheduleUrl`.",
    needsConfirmation: false,
  },
  prices: {
    value: "no price list is published on any public channel",
    reason:
      "Nothing to render and nothing to invent. The closing copy tells the visitor prices come back in a message.",
    needsConfirmation: true,
  },
  openingHours: {
    value: "a directory lists opening hours",
    reason: "Not published by the studio and changeable. Never rendered.",
    needsConfirmation: true,
  },
} as const;
