export const services = [
  {
    id: "sisanje",
    name: "Šišanje",
    eyebrow: "Haircut",
    description: "Termin za šišanje i završno stilizovanje.",
  },
  {
    id: "brijanje",
    name: "Brijanje i brada",
    eyebrow: "Shave",
    description: "Sređivanje brade, linija i završnih detalja.",
  },
  {
    id: "komplet",
    name: "Šišanje + brada",
    eyebrow: "Full service",
    description: "Kosa i brada u jednom dogovorenom terminu.",
  },
] as const;

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
  mapUrl:
    "https://www.google.com/maps?q=Milo%C5%A1a%20Obili%C4%87a%20BB%2C%20Stari%20Aerodrom%2C%20Podgorica%2C%20Crna%20Gora&output=embed",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Milo%C5%A1a%20Obili%C4%87a%20BB%2C%20Stari%20Aerodrom%2C%20Podgorica%2C%20Crna%20Gora",
  hours: "Ponedjeljak–subota · 09:00–21:00",
  shortHours: "Pon–sub · 09–21h",
  established: "2021",
} as const;
