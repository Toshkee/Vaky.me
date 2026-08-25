export type PriceItem = {
  name: string;
  price: string;
  note?: string;
};

export const prices: PriceItem[] = [
  { name: "Šišanje", price: "€10" },
  { name: "Fade", price: "€12" },
  { name: "Brada", price: "€7" },
  { name: "Šišanje + brada", price: "€15" },
  { name: "Djeca do 12 godina", price: "€8" },
  { name: "Brijanje toplim peškirom", price: "€9" },
  {
    name: "Full tretman",
    price: "€20",
    note: "šišanje, brada i topli peškir",
  },
];

export type Barber = {
  name: string;
  role: string;
  desc: string;
};

export const barbers: Barber[] = [
  {
    name: "Luka",
    role: "Fade specijalista",
    desc: "Osam godina za stolicom. Precizni prelazi, oštre linije i fade po mjeri — svaki put isto dobar.",
  },
  {
    name: "Stefan",
    role: "Klasika i brijanje",
    desc: "Čuvar stare škole. Klasične frizure, mirna ruka, britva i topli peškir — po starinski.",
  },
  {
    name: "Andrija",
    role: "Moderan stil",
    desc: "Najmlađi u timu. Svježe ideje, moderni stilovi i pažnja do posljednjeg detalja.",
  },
];

export type Quote = {
  name: string;
  text: string;
};

export const quote: Quote = {
  name: "Vuk",
  text: "Royal brijanje toplim peškirom je pravi ritual — pola sata mira i izađeš kao nov.",
};

export type HoursRow = {
  days: string;
  time: string;
  closed?: boolean;
};

export const hours: HoursRow[] = [
  { days: "Ponedjeljak – Petak", time: "09:00 – 20:00" },
  { days: "Subota", time: "09:00 – 16:00" },
  { days: "Nedjelja", time: "Zatvoreno", closed: true },
];
