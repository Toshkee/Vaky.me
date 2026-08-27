/**
 * Prices transcribed from Barber Drina's own "Cjenovnik" post on the official
 * Instagram profile (checked 26 August 2026). Nothing here is estimated — if a
 * price changes at the shop, this list is the only place to edit it.
 */
export type Service = { id: string; name: string; price: string };
export type PriceGroup = { id: string; title: string; items: Service[] };

export const priceGroups: PriceGroup[] = [
  {
    id: "kosa",
    title: "Šišanje",
    items: [
      { id: "klasicno-sisanje", name: "Klasično šišanje", price: "10,00 €" },
      { id: "fade-sisanje", name: "Fade šišanje", price: "12,00 €" },
      { id: "sisanje-brada", name: "Šišanje i sređivanje brade", price: "15,00 €" },
      { id: "sisanje-djeca", name: "Šišanje djece do 14 godina (osnovci)", price: "10,00 €" },
      { id: "sisanje-penzioneri", name: "Šišanje za penzionere", price: "10,00 €" },
    ],
  },
  {
    id: "brada",
    title: "Brada",
    items: [
      { id: "kratka-brada", name: "Oblikovanje i stilizovanje kratke brade", price: "5,00 €" },
      { id: "duga-brada", name: "Oblikovanje i stilizovanje duge brade", price: "7,00 €" },
      { id: "klasicno-brijanje", name: "Klasično brijanje brade", price: "5,00 €" },
      { id: "farbanje-vasa", name: "Farbanje brade (vaša farba)", price: "10,00 €" },
      { id: "farbanje-nasa", name: "Farbanje brade (naša farba)", price: "15,00 €" },
    ],
  },
  {
    id: "pranje",
    title: "Pranje kose",
    items: [
      { id: "obicno-pranje", name: "Obično pranje kose", price: "1,00 €" },
      { id: "pranje-feniranje", name: "Pranje kose sa stilizovanjem i feniranjem", price: "2,00 €" },
    ],
  },
];

/** Flat list used by the booking helper's service picker. */
export const services: Service[] = priceGroups.flatMap((group) => group.items);

export const publicDetails = {
  instagram: "barber_drina",
  instagramUrl: "https://www.instagram.com/barber_drina/",
  tiktok: "barber_drina",
  tiktokUrl: "https://www.tiktok.com/@barber_drina",
  /* Placeholder contact block. The shop's real phone number, its exact street
     address and the owner's personal profile used to sit here, republished off
     public profiles without anyone asking us to. A concept nobody commissioned
     is no place for another person's contact details, so these are stand-ins
     until the shop hands us the real ones to publish. The demo phone number
     matches the obviously-fake one the other three concepts use. */
  phoneDisplay: "+382 67 000 000",
  phoneUrl: "tel:+38267000000",
  address: "Stari Aerodrom, Podgorica",
  /** Plain text, encoded where it is used. Points at the quarter, not a door. */
  mapQuery: "Stari Aerodrom, Podgorica, Crna Gora",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Stari%20Aerodrom%2C%20Podgorica",
  hours: "Ponedjeljak–subota · 09:00–21:00",
  shortHours: "Pon–sub · 09–21h",
  established: "2021",
} as const;
