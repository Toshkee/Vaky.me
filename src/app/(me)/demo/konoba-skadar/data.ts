export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "predjela",
    title: "Predjela",
    items: [
      {
        name: "Riblja čorba",
        description: "Gusta čorba od jezerske ribe, po babinom receptu iz 1987.",
        price: "4,50 €",
      },
      {
        name: "Njeguški pršut i sir",
        description: "Tanjir delicija sa Njeguša, uz masline i domaći hljeb.",
        price: "8,00 €",
      },
      {
        name: "Ukljeva pržena",
        description: "Hrskava sitna riba iz jezera, uz limun — jede se rukama.",
        price: "6,00 €",
      },
      {
        name: "Kozji sir iz ulja",
        description: "Zreli sir iz maslinovog ulja, sa crmničkim maslinama.",
        price: "5,50 €",
      },
    ],
  },
  {
    id: "glavna-jela",
    title: "Glavna jela",
    items: [
      {
        name: "Kačamak s kajmakom",
        description: "Kukuruzni kačamak, dosta kajmaka i topljenog sira.",
        price: "7,00 €",
      },
      {
        name: "Jagnjetina ispod sača",
        description: "Sporo pečena jagnjetina s krtolom — porudžbina dan ranije.",
        price: "15,00 €",
      },
      {
        name: "Japraci u listu raštana",
        description: "Sarmice od raštana punjene mljevenim mesom i domaćom slaninom.",
        price: "8,00 €",
      },
      {
        name: "Kobasice s roštilja",
        description: "Domaće dimljene kobasice, uz restovani krompir i luk.",
        price: "8,50 €",
      },
    ],
  },
  {
    id: "riblja-jela",
    title: "Riblja jela",
    items: [
      {
        name: "Krap na tavu",
        description: "Krap iz jezera pržen na tavi, sa suvim šljivama i jabukom.",
        price: "12,00 €",
      },
      {
        name: "Jegulja na žaru",
        description: "Jutarnji ulov sa žara, maslinovo ulje, bijeli luk i peršun.",
        price: "14,00 €",
      },
      {
        name: "Pastrmka na žaru",
        description: "Riječna pastrmka, blitva s krtolom i limun.",
        price: "11,00 €",
      },
      {
        name: "Marinirana ukljeva",
        description: "Ukljeva u marinadi od sirćeta, luka i lovora.",
        price: "7,00 €",
      },
      {
        name: "Riblji plato za dvoje",
        description: "Krap, pastrmka i ukljeva — izbor kuće za dvije osobe.",
        price: "26,00 €",
      },
    ],
  },
  {
    id: "prilozi-i-salate",
    title: "Prilozi i salate",
    items: [
      {
        name: "Šopska salata",
        description: "Paradajz, krastavac, paprika i puno sitnog sira.",
        price: "4,00 €",
      },
      {
        name: "Blitva s krtolom",
        description: "Na maslinovom ulju, s bijelim lukom.",
        price: "4,00 €",
      },
      {
        name: "Sezonska salata iz bašte",
        description: "Ono što je jutros ubrano iza konobe.",
        price: "3,50 €",
      },
      {
        name: "Domaći hljeb ispod sača",
        description: "Topao, s korom — peče se dva puta dnevno.",
        price: "2,00 €",
      },
    ],
  },
  {
    id: "deserti",
    title: "Deserti",
    items: [
      {
        name: "Priganice s medom",
        description: "Tople priganice, med iz Crmnice i mljeveni orasi.",
        price: "4,50 €",
      },
      {
        name: "Palačinke s orasima",
        description: "Domaće palačinke, orasi i suvo grožđe.",
        price: "4,00 €",
      },
      {
        name: "Suve smokve u medu",
        description: "Smokve iz našeg dvorišta, uz skorup.",
        price: "4,50 €",
      },
      {
        name: "Torta od oraha",
        description: "Babina torta — bez brašna, samo orasi i jaja.",
        price: "4,00 €",
      },
    ],
  },
  {
    id: "pice",
    title: "Piće",
    items: [
      {
        name: "Vranac kuće 0,5 l",
        description: "Naše crno vino iz crmničkih vinograda.",
        price: "7,00 €",
      },
      {
        name: "Krstač 0,5 l",
        description: "Suvo bijelo vino, ide uz ribu.",
        price: "7,00 €",
      },
      {
        name: "Lozova rakija 0,03 l",
        description: "Domaća loza, pečena u selu Godinje.",
        price: "2,50 €",
      },
      {
        name: "Nikšićko pivo 0,5 l",
        description: "Točeno, hladno.",
        price: "3,00 €",
      },
      {
        name: "Sok od nara",
        description: "Cijeđen od šipka iz Crmnice.",
        price: "3,00 €",
      },
      {
        name: "Domaća kafa",
        description: "Kuvana u džezvi, uz ratluk.",
        price: "1,50 €",
      },
    ],
  },
];
