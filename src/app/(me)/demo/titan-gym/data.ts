export interface Program {
  name: string;
  desc: string;
}

export const programs: Program[] = [
  {
    name: "Snaga",
    desc: "Slobodni tegovi, power rack zone i platforme za dizanje — bez čekanja na spravu.",
  },
  {
    name: "CrossFit",
    desc: "Funkcionalni treninzi visokog intenziteta u malim grupama, šest dana u nedjelji.",
  },
  {
    name: "Kardio zona",
    desc: "Trake, veslači, air bike i steperi najnovije generacije — 30 mjesta u smjeni.",
  },
  {
    name: "Grupni treninzi",
    desc: "HIIT, pilates i kružni treninzi sa trenerom — energija koja te nosi do kraja.",
  },
  {
    name: "Personalni trening",
    desc: "Plan ishrane i treninga skrojen za tvoj cilj, uz praćenje napretka iz nedjelje u nedjelju.",
  },
  {
    name: "Joga & mobilnost",
    desc: "Oporavak, istezanje i rad na pokretljivosti — jer forma se kuje i van tegova.",
  },
];

export interface ScheduleSlot {
  time: string;
  name: string;
}

export interface ScheduleDay {
  day: string;
  slots: ScheduleSlot[];
}

export const schedule: ScheduleDay[] = [
  {
    day: "Ponedjeljak",
    slots: [
      { time: "07:00", name: "CrossFit" },
      { time: "18:00", name: "HIIT" },
      { time: "19:30", name: "Joga" },
    ],
  },
  {
    day: "Utorak",
    slots: [
      { time: "07:00", name: "HIIT" },
      { time: "18:00", name: "Snaga — tehnika" },
      { time: "20:00", name: "Pilates" },
    ],
  },
  {
    day: "Srijeda",
    slots: [
      { time: "07:00", name: "CrossFit" },
      { time: "18:00", name: "Kružni trening" },
      { time: "19:30", name: "Joga" },
    ],
  },
  {
    day: "Četvrtak",
    slots: [
      { time: "07:00", name: "HIIT" },
      { time: "18:00", name: "CrossFit" },
      { time: "20:00", name: "Mobilnost" },
    ],
  },
  {
    day: "Petak",
    slots: [
      { time: "07:00", name: "Snaga — tehnika" },
      { time: "18:00", name: "HIIT" },
      { time: "19:30", name: "Joga" },
    ],
  },
  {
    day: "Subota",
    slots: [
      { time: "09:00", name: "CrossFit" },
      { time: "10:30", name: "Kružni trening" },
      { time: "12:00", name: "Mobilnost" },
    ],
  },
];

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

export const plans: Plan[] = [
  {
    name: "Mjesečna",
    price: "€25",
    period: "mjesečno",
    features: [
      "Neograničeni dolasci",
      "Sve zone: snaga, kardio, funkcionalna",
      "Uvodni trening sa trenerom",
      "Bez ugovorne obaveze",
    ],
    highlighted: false,
  },
  {
    name: "Tromjesečna",
    price: "€65",
    period: "na 3 mjeseca",
    features: [
      "Sve iz mjesečne članarine",
      "1 personalni trening gratis",
      "Plan treninga po mjeri",
      "Zamrzavanje do 14 dana",
    ],
    highlighted: true,
  },
  {
    name: "Godišnja",
    price: "€220",
    period: "na 12 mjeseci",
    features: [
      "Sve iz tromjesečne članarine",
      "3 personalna treninga gratis",
      "Analiza tjelesne kompozicije",
      "2 gost-ulaza mjesečno",
    ],
    highlighted: false,
  },
];
