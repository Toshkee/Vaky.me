/**
 * Soul Studio — Yoga & Reformer Pilates, Podgorica.
 *
 * Outreach design concept. Every fact below is transcribed from the studio's
 * own public Instagram profile (@soulstudio_podgorica, read 28 August 2026);
 * nothing is estimated. What the profile does not state — the class schedule,
 * prices, the second location announced for 2026, any health claim — is not on
 * the page, and must not be added before the studio confirms it.
 */

export const studio = {
  name: "Soul Studio",
  tagline: "Yoga & Reformer Pilates",
  city: "Podgorica",
  address: "Crnogorskih Serdara 45, Podgorica",
  /** Plain text; the map component encodes it. */
  mapQuery: "Crnogorskih Serdara 45, Podgorica, Crna Gora",
  phoneDisplay: "+382 69 454 313",
  phoneUrl: "tel:+38269454313",
  instagram: "soulstudio_podgorica",
  instagramUrl: "https://www.instagram.com/soulstudio_podgorica/",
  /** The studio's own three-line motto, painted on the studio wall. */
  motto: ["Move the body", "Open the heart", "Feed the soul"],
  /** First Reformer studio opened in 2025 — stated in the studio's own posts. */
  reformerSince: "2025",
} as const;

export interface Practice {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** What a newcomer actually feels in the room — the difference, in one line. */
  note: string;
}

/* The one job of this page: let someone who has never done either tell the two
   apart. So the two blocks are written against each other, not as a list of
   benefits. */
export const practices: Practice[] = [
  {
    id: "yoga",
    eyebrow: "Na prostirci",
    title: "Yoga",
    body: "Rad na dahu, ravnoteži i pokretljivosti — na prostirci, sopstvenom težinom i sopstvenim tempom. Pokret prati disanje, a ne obrnuto, pa se svaka poza može produžiti ili skratiti onoliko koliko tijelo traži tog dana.",
    note: "Bez sprava. Potrebna je samo prostirka i vrijeme koje si odvojio za sebe.",
  },
  {
    id: "reformer",
    eyebrow: "Na reformeru",
    title: "Reformer Pilates",
    body: "Vježbe na reformeru — drvenoj spravi sa pokretnim ležajem i oprugama. Opruge istovremeno daju otpor i podršku, pa pokret ostaje kontrolisan i onda kada je zahtjevan. Radi se na snazi trupa, stabilnosti i držanju.",
    note: "Sprava vodi pokret. Zato je Reformer često lakši za početak nego što izgleda.",
  },
];

export interface Photo {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Public post this frame was taken from — kept for provenance, never shown. */
  source: string;
}

export const hero: Photo = {
  src: "/demo/soul-studio/studio",
  alt: "Sala Soul Studija sa drvenim reformerima poređanim uz zid i osvijetljenim lučnim prolazom u dnu prostorije",
  width: 1080,
  height: 720,
  source: "https://www.instagram.com/p/DUREtHjDL5P/",
};

/* `as const satisfies` keeps each photo's `src` a literal type instead of
   widening it to `string`, so page.tsx can key its per-photo layout off
   `src` and have TypeScript reject a stale or misspelled key — the array
   position is no longer load-bearing. */
export const gallery = [
  {
    src: "/demo/soul-studio/poruka",
    alt: "Vježbačica leži na reformeru sa nogama u kaiševima, ispred zida na kojem piše Move the body, Open the heart, Feel the soul",
    width: 1080,
    height: 1350,
    source: "https://www.instagram.com/p/DZXoLwpjGBy/",
  },
  {
    src: "/demo/soul-studio/reformer",
    alt: "Detalj drvenog reformera: pokretni ležaj, opruge i naslon za ramena",
    width: 864,
    height: 1080,
    source: "https://www.instagram.com/p/DUREtHjDL5P/",
  },
  {
    src: "/demo/soul-studio/pokret",
    alt: "Vježba na reformeru — podignute noge i kontrolisan pokret uz opruge",
    width: 1080,
    height: 719,
    source: "https://www.instagram.com/p/DZXoLwpjGBy/",
  },
  {
    src: "/demo/soul-studio/sala",
    alt: "Niz reformera u sali Soul Studija, sa loptama i rekvizitima uz drveni pod",
    width: 1080,
    height: 1080,
    source: "https://www.instagram.com/p/DUREtHjDL5P/",
  },
] as const satisfies readonly Photo[];
