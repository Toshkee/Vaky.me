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
  ownerInstagram: "_matijadrincic_",
  ownerInstagramUrl: "https://www.instagram.com/_matijadrincic_/",
  tiktok: "barber_drina",
  tiktokUrl: "https://www.tiktok.com/@barber_drina",
  phoneDisplay: "+382 69 900 600",
  phoneUrl: "tel:+38269900600",
  address: "Miloša Obilića BB, Stari Aerodrom, Podgorica",
  /**
   * The pin is the Google Plus Code shown on Barber Drina's own Linktree map
   * card (C7JH+9XG, Miloša Obilića, Podgorica). A Plus Code is an exact
   * geocode, so this opens the storefront itself rather than a street-wide
   * address search. Source: linktr.ee/barberdrina, checked 26 August 2026.
   */
  mapUrl: "https://www.google.com/maps?q=C7JH%2B9XG%20Podgorica&output=embed",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=C7JH%2B9XG%20Podgorica",
  hours: "Ponedjeljak–subota · 09:00–21:00",
  shortHours: "Pon–sub · 09–21h",
  established: "2021",
} as const;
