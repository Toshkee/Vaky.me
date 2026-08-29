/**
 * Zlatara Opal — goldsmith, Podgorica.
 *
 * Outreach design concept. Facts are transcribed from the shop's own public
 * Instagram profile (@zlataraopal, read 28 August 2026) and from its public
 * business listing. Opening hours are deliberately absent: the directories
 * disagree with each other, so the page does not claim any.
 *
 * There are no prices, no stock, no checkout and no certificates here, and
 * none may be added before the owner supplies them. This is a shop that makes
 * one piece at a time to a drawing — the page has to end in a conversation.
 */

export const shop = {
  name: "Zlatara Opal",
  city: "Podgorica",
  address: "Miljana Vukova 2, Podgorica",
  /** Plain text; the map component encodes it. */
  mapQuery: "Miljana Vukova 2, Podgorica, Crna Gora",
  phoneDisplay: "+382 67 898 356",
  phoneUrl: "tel:+38267898356",
  instagram: "zlataraopal",
  instagramUrl: "https://www.instagram.com/zlataraopal/",
} as const;

export interface Collection {
  id: string;
  title: string;
  body: string;
}

/* Written categories rather than a product filter: the shop has no catalogue
   and no stock list, and inventing one would be the first thing a visitor
   found out was false. */
export const collections: Collection[] = [
  {
    id: "zlato",
    title: "Zlato 14k",
    body: "Ogrlice, narukvice i priveske od zlata finoće 585. Fine forme koje se nose svaki dan, ne samo za posebne prilike.",
  },
  {
    id: "srebro",
    title: "Srebro 925",
    body: "Srebro za komade koji smiju biti krupniji i izraženiji — i za sve što se prvo pravi u srebru, pa tek onda u zlatu.",
  },
  {
    id: "pokloni",
    title: "Pokloni",
    body: "Srebrne figure i sitni komadi koji se poklanjaju — gotovo uvijek za nekoga drugog, ne za sebe.",
  },
  {
    id: "narudzba",
    title: "Po narudžbi",
    body: "Tvoja ideja, skica ili fotografija — pretvorena u komad koji do sada nije postojao. Najveći dio onoga što radimo počinje ovako.",
  },
];

export interface Step {
  n: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    n: "1",
    title: "Pošalji ideju",
    body: "Crtež na papiru, fotografija, screenshot ili samo opis. Ne mora biti uredno — dovoljno je da se vidi šta želiš.",
  },
  {
    n: "2",
    title: "Dogovori detalje",
    body: "Biramo materijal, finoću, veličinu i način izrade. Tu se dogovara i sve ostalo prije nego što se počne raditi.",
  },
  {
    n: "3",
    title: "Izrada nakita",
    body: "Komad se izrađuje u radionici i preuzima se u zlatari, u Zlatarskoj ulici.",
  },
];

export interface Piece {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  title: string;
  material: string;
  alt: string;
  width: number;
  height: number;
  /** Public post this frame was taken from — kept for provenance, never shown. */
  source: string;
}

/* The mermaid pendant leads the page because it is the shop's own argument in
   one photograph: a figure nobody stocks, cut for one person. The worn pieces
   sit in the gallery, where scale is easier to read. */
export const hero: Piece = {
  src: "/demo/zlatara-opal/ogrlica-kutija",
  title: "Ogrlica sa motivom sirene",
  material: "Zlato 14k (585)",
  alt: "Ogrlica od žutog zlata sa privjeskom u obliku sirene, položena u poklon kutiju",
  width: 1080,
  height: 1350,
  source: "https://www.instagram.com/p/DXPK7O5DO7r/",
};

export const pieces = [
  {
    src: "/demo/zlatara-opal/privezak",
    title: "Privezak po crtežu",
    material: "Izrada po narudžbi",
    alt: "Okrugli privezak sa motivom dvije ruke, u otvorenoj kutiji sa zlatnim rubom",
    width: 1080,
    height: 1350,
    source: "https://www.instagram.com/p/DXWuKNDDBhX/",
  },
  {
    src: "/demo/zlatara-opal/manzetne",
    title: "Manžetne sa inicijalima",
    material: "Srebro 925 ili zlato 14k",
    alt: "Par srebrnih manžetni sa inicijalima, u otvorenoj kutiji na svilenoj podlozi",
    width: 960,
    height: 576,
    source: "https://www.instagram.com/p/DaNG9X_s0fO/",
  },
  {
    src: "/demo/zlatara-opal/bros",
    title: "Broš po narudžbi",
    material: "Srebro 925",
    alt: "Okrugli srebrni broš sa linijskim motivom lica, knjige i grančice",
    width: 660,
    height: 660,
    source: "https://www.instagram.com/p/DZ7bOzMstfb/",
  },
  {
    src: "/demo/zlatara-opal/ogrlica-detelina",
    title: "Ogrlica sa zelenim motivom",
    material: "Zlato 14k (585)",
    alt: "Tanka zlatna ogrlica sa zelenim privjeskom u obliku djeteline, nošena preko tamnoplave bluze",
    width: 1080,
    height: 982,
    source: "https://www.instagram.com/p/DUTFmPzjO6h/",
  },
  {
    src: "/demo/zlatara-opal/narukvica",
    title: "Narukvica plet korda",
    material: "Zlato 14k (585)",
    alt: "Tanka zlatna narukvica u pletu korda na zglobu ruke",
    width: 1080,
    height: 1350,
    source: "https://www.instagram.com/p/DRXfHrJjIzU/",
  },
  {
    src: "/demo/zlatara-opal/prsten",
    title: "Prsten sa plavim opsidijanom",
    material: "Patinirano i pozlaćeno srebro",
    alt: "Masivan prsten sa plavim opsidijanom, nošen na ruci sa svijetlim noktima",
    width: 1080,
    height: 1170,
    source: "https://www.instagram.com/p/DOv3nikjOG3/",
  },
] as const satisfies readonly Piece[];
