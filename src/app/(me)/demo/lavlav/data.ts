/**
 * LavLav — nail & beauty studio, Master kvart, Podgorica.
 *
 * Outreach design concept. Facts are transcribed from the studio's own public
 * Instagram profiles (@lavlav.mne and @lavlav.body, read 28 August 2026) and
 * its public directory listing.
 *
 * The studio already runs its booking on DIKIDI, where the service list, the
 * team, the prices, the free slots and the reviews live and change weekly.
 * None of that is copied here: this page introduces the studio and hands the
 * visitor to the booking flow that is already working.
 */

export const studio = {
  name: "LavLav",
  city: "Podgorica",
  address: "Master kvart, ulaz 10, sprat 4, stan 24, Podgorica",
  /** Plain text; the map component encodes it. The quarter, not the flat. */
  mapQuery: "Master kvart, Podgorica, Crna Gora",
  phoneDisplay: "+382 68 392 859",
  phoneUrl: "tel:+38268392859",
  instagram: "lavlav.mne",
  instagramUrl: "https://www.instagram.com/lavlav.mne/",
  /** The laser side of the studio keeps its own profile. */
  laserInstagram: "lavlav.body",
  laserInstagramUrl: "https://www.instagram.com/lavlav.body/",
  /** The studio's existing booking system — the whole point of the page. */
  bookingUrl: "https://dikidi.net/1174602",
} as const;

/** Three claims the studio makes itself, in its own Instagram bio. */
export const trustLine = ["LUXIO", "200+ boja", "2 nedjelje garancije"] as const;

export interface Service {
  id: string;
  title: string;
  body: string;
}

/* Categories, not a price list. The full service list lives on DIKIDI and
   changes there; duplicating it here would be wrong within a month. */
export const services: Service[] = [
  {
    id: "manikir",
    title: "Manikir",
    body: "Klasičan i gel manikir, korekcija i produžetak.",
  },
  {
    id: "pedikir",
    title: "Pedikir",
    body: "Njega stopala i lak koji izdrži duže od jednog izlaska.",
  },
  {
    id: "obrve",
    title: "Obrve i laminacija",
    body: "Oblikovanje, bojenje i laminacija — linija koja prati lice, a ne trend.",
  },
  {
    id: "trepavice",
    title: "Trepavice",
    body: "Ekstenzije i lash lift, od prirodnog efekta do izraženog volumena.",
  },
  {
    id: "permanent",
    title: "Permanent",
    body: "Trajna šminka za obrve i usne, rađena postupno i u dvije posjete.",
  },
  {
    id: "laser",
    title: "Laser",
    body: "Lasersko uklanjanje dlačica — vodi ga poseban profil studija, @lavlav.body.",
  },
];

export interface Step {
  n: string;
  title: string;
  body: string;
}

export const bookingSteps: Step[] = [
  {
    n: "1",
    title: "Izaberi uslugu i specijalistu",
    body: "Cijeli spisak usluga i tim su na DIKIDI-ju — tamo su uvijek tačni i ažurni.",
  },
  {
    n: "2",
    title: "Pronađi termin",
    body: "Slobodni termini se vide odmah, po danu i po osobi.",
  },
  {
    n: "3",
    title: "Potvrdi rezervaciju",
    body: "Potvrda stiže kroz DIKIDI. Ako treba nešto promijeniti, tu se i mijenja.",
  },
];

export interface Look {
  /** Path without an extension; variants come from scripts/demo-photos.mjs. */
  src: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
  /** Public post this frame was taken from — kept for provenance, never shown. */
  source: string;
}

export const hero: Look = {
  src: "/demo/lavlav/sjaj",
  caption: "Biserni sjaj",
  alt: "Krupni kadar šake sa kratkim noktima u bisernoj, sedefastoj nijansi",
  width: 960,
  height: 1280,
  source: "https://www.instagram.com/p/DTr4pkTDCSX/",
};

export const lookbook: Look[] = [
  {
    src: "/demo/lavlav/maslina",
    caption: "Maslinasta i čokolada",
    alt: "Šaka sa noktima u maslinastoj, tamnobraon i bijeloj nijansi, na braon rukavu",
    width: 960,
    height: 1280,
    source: "https://www.instagram.com/p/DWOKKsXDXg2/",
  },
  {
    src: "/demo/lavlav/teksture",
    caption: "Mliječni french",
    alt: "Šaka sa kratkim noktima u mliječnoj nijansi sa bijelim vrhovima, uz teksas",
    width: 960,
    height: 1280,
    source: "https://www.instagram.com/p/DS3AJF2DFZ3/",
  },
  {
    src: "/demo/lavlav/paleta",
    caption: "Paleta LUXIO",
    alt: "Pločica sa dvanaest LUXIO nijansi poređanih u četiri reda, sa nazivima boja",
    width: 1290,
    height: 1250,
    source: "https://www.instagram.com/p/DWn09V-DYc_/",
  },
  {
    src: "/demo/lavlav/crveni",
    caption: "Crveni detalj",
    alt: "Dvije šake sa nude noktima i sitnim crvenim mašnicama kao nail art detaljem",
    width: 1290,
    height: 1090,
    source: "https://www.instagram.com/p/DSaQSdmjIyB/",
  },
  {
    src: "/demo/lavlav/sedef",
    caption: "Njega poslije termina",
    alt: "Prsti sa nude noktima i kapaljka sa uljem za zanoktice iznad njih",
    width: 1020,
    height: 800,
    source: "https://www.instagram.com/p/DPdmwihjLbz/",
  },
];
