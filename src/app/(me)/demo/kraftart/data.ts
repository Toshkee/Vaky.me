/**
 * Tattoo and Piercing KraftArt — Podgorica.
 *
 * Outreach design concept. Facts are transcribed from the studio's own public
 * Instagram profile (@tattoopodgorica, read 28 August 2026) and its public
 * listing. The bio states the address, that booking is required, that the
 * studio is closed on Saturdays, and that enquiries go through DM, Viber,
 * WhatsApp or a phone call. It does not state opening hours, prices, session
 * lengths or aftercare protocol — so neither does this page.
 *
 * The portfolio was chosen to leave out anything personal: no names, no
 * memorial pieces, no recognisable faces. Artist credit is taken from the
 * watermark burned into each of the studio's own photographs.
 */

export const studio = {
  name: "KraftArt",
  fullName: "Tattoo and Piercing KraftArt",
  city: "Podgorica",
  address: "Sarajevska 53, Masline, Podgorica",
  /** Plain text; the map component encodes it. */
  mapQuery: "Sarajevska 53, Masline, Podgorica, Crna Gora",
  phoneDisplay: "+382 69 243 321",
  phoneUrl: "tel:+38269243321",
  /* wa.me wants the number bare, with the country code and no punctuation. */
  whatsappUrl: "https://wa.me/38269243321",
  /* The viber: scheme opens nothing on a desktop without the client installed,
     so the number is always printed next to it as the real fallback. */
  viberUrl: "viber://chat?number=%2B38269243321",
  instagram: "tattoopodgorica",
  instagramUrl: "https://www.instagram.com/tattoopodgorica/",
  facebookUrl: "https://www.facebook.com/tattoopodgorica",
} as const;

/** Tagged in the studio's own recent posts. Handles only — we have no bios. */
export const artists = [
  { handle: "ziskatattoo", url: "https://www.instagram.com/ziskatattoo/" },
  { handle: "brankotattoo", url: "https://www.instagram.com/brankotattoo/" },
] as const;

export interface Service {
  id: string;
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    id: "tetovaze",
    title: "Tetovaže",
    body: "Od sitnih fine-line motiva do većih radova koji se rade u više sesija. Motiv se dogovara prije termina, ne na dan termina.",
  },
  {
    id: "piercing",
    title: "Piercing",
    body: "Uho, nos i ostale standardne pozicije, uz nakit iz studija. Postavka i izbor pozicije rade se na licu mjesta.",
  },
  {
    id: "coverup",
    title: "Cover-up i prepravke",
    body: "Prekrivanje i dorada starih radova. Šta je izvodljivo zavisi od veličine, boje i stanja postojeće tetovaže — to se vidi tek uživo.",
  },
  {
    id: "konsultacija",
    title: "Konsultacija",
    body: "Kratak razgovor prije termina: šta želiš, gdje ide, koliko je veliko i kako se poslije njeguje.",
  },
];

export interface Step {
  title: string;
  body: string;
}

export const beforeVisit: Step[] = [
  {
    title: "Pošalji ideju",
    body: "Opis motiva i reference — skica, fotografija ili nešto što ti se dopalo. Što jasnije, to kraći dogovor.",
  },
  {
    title: "Veličina i pozicija",
    body: "Okvirna veličina u centimetrima i dio tijela na koji ide. Od toga zavisi i koliko sesija treba.",
  },
  {
    title: "Dogovori konsultaciju",
    body: "Javljamo se sa slobodnim terminima čim stignu ideja i mjere.",
  },
];

export interface Work {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Instagram handle burned into the studio's own watermark on the photo. */
  artist: string;
  /** The public post itself — the gallery links here instead of a lightbox. */
  source: string;
}

export const hero: Work = {
  src: "/demo/kraftart/botanika",
  alt: "Fine-line tetovaža grančice sa listovima, od podlaktice do nadlanice",
  width: 1440,
  height: 1800,
  artist: "ziskatattoo",
  source: "https://www.instagram.com/p/DceTmuiDRJ1/",
};

export const works = [
  {
    src: "/demo/kraftart/limun",
    alt: "Crno-siva tetovaža grane sa limunovima i cvjetovima na nadlaktici",
    width: 1440,
    height: 1800,
    artist: "ziskatattoo",
    source: "https://www.instagram.com/p/DbjIvY6jTvo/",
  },
  {
    src: "/demo/kraftart/orah",
    alt: "Realistična tetovaža oraha sa sjenkom, na podlaktici",
    width: 1440,
    height: 1800,
    artist: "ziskatattoo",
    source: "https://www.instagram.com/p/DcjeghqtoIn/",
  },
  {
    src: "/demo/kraftart/katane",
    alt: "Blackwork tetovaža pet katana zabodenih u tlo, na listu noge",
    width: 1440,
    height: 1800,
    artist: "ziskatattoo",
    source: "https://www.instagram.com/p/DYz1Wd9tAQj/",
  },
  {
    src: "/demo/kraftart/talas",
    alt: "Tetovaža plavog talasa u koloru, na podlaktici",
    width: 1440,
    height: 1800,
    artist: "ziskatattoo",
    source: "https://www.instagram.com/p/Dbk62qcNx6m/",
  },
  {
    src: "/demo/kraftart/piercing",
    alt: "Piercing na uhu — dvije helix pozicije i lobe sa zlatnim nakitom",
    width: 1440,
    height: 1800,
    artist: "brankotattoo",
    source: "https://www.instagram.com/p/DcOUj2WjXHS/",
  },
] as const satisfies readonly Work[];
