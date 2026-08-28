export type MenuItem = {
  name: string;
  local: string;
  size?: string;
  price: string;
  vegan?: boolean;
  spicy?: boolean;
};

export type MenuCategory = { label: string; local: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  { label: "Appetizers", local: "Predjela", items: [
    { name: "Hot-n-sour soup", local: "Kisela ljuta supa", size: "250 ml", price: "3,50 €", spicy: true },
    { name: "Miso soup", local: "Miso supa", size: "250 ml", price: "3,30 €", vegan: true },
    { name: "Fried rice", local: "Kuvana riža", size: "200 g", price: "1,80 €" },
    { name: "Fried aromatic shrimp", local: "Pohovani aromatični škampi", size: "po komadu", price: "1,40 €" },
    { name: "Vegetable dumplings", local: "Dumplinzi sa povrćem", size: "po komadu", price: "0,60 €", vegan: true },
    { name: "Vegan boiled dumplings", local: "Veganski kuvani dumpling", size: "po komadu", price: "0,60 €", vegan: true },
    { name: "Beef dumplings", local: "Dumplinzi sa govedinom", size: "po komadu", price: "0,60 €" },
    { name: "Pork dumplings", local: "Dumplinzi sa svinjetinom", size: "po komadu", price: "0,60 €" },
    { name: "Chicken dumplings", local: "Dumplinzi sa piletinom", size: "po komadu", price: "0,60 €" },
    { name: "Spicy pickled potato", local: "Ljuti kiseli krompir", size: "250 g", price: "3,30 €", spicy: true },
    { name: "Fresh cucumber salad", local: "Salata od krastavca", size: "200 g", price: "2,20 €", vegan: true },
  ] },
  { label: "Noodles & rice", local: "Nudle i rižoto", items: [
    { name: "Noodles with vegetables", local: "Nudle sa povrćem", size: "400 g", price: "3,60 €", vegan: true },
    { name: "Noodles with chicken", local: "Nudle sa piletinom", size: "400 g", price: "4,80 €" },
    { name: "Noodles with beef", local: "Nudle sa junetinom", size: "400 g", price: "5,20 €" },
    { name: "Noodles with shrimp", local: "Nudle sa škampima", size: "400 g", price: "5,90 €" },
    { name: "Rice risotto with vegetables", local: "Rižoto sa povrćem", size: "400 g", price: "3,80 €", vegan: true },
    { name: "Rice risotto with chicken", local: "Rižoto sa piletinom", size: "400 g", price: "4,90 €" },
    { name: "Rice risotto with beef", local: "Rižoto sa govedinom", size: "400 g", price: "5,80 €" },
    { name: "Rice risotto with shrimp", local: "Rižoto sa škampima", size: "400 g", price: "6,30 €" },
  ] },
  { label: "Main course", local: "Glavna jela", items: [
    { name: "Sichuan chicken", local: "Sičuanska piletina", size: "400 g", price: "4,90 €" },
    { name: "Gongbao chicken", local: "Gongbao piletina", size: "400 g", price: "5,20 €" },
    { name: "Sweet and sour chicken", local: "Piletina u slatko-kiselom sosu", size: "400 g", price: "5,90 €" },
    { name: "Spicy chicken wings", local: "Ljuta krilca", size: "350 g", price: "6,60 €", spicy: true },
    { name: "Beef on hot plate", local: "Junetina na vrućoj ploči", size: "400 g", price: "6,80 €" },
    { name: "Mapo tofu", local: "Mapo tofu", size: "300 g", price: "6,90 €", vegan: true },
    { name: "Marley chicken", local: "Marley piletina", size: "400 g", price: "6,90 €" },
    { name: "Marley beef", local: "Marley junetina", size: "400 g", price: "8,90 €" },
  ] },
  { label: "Sweet & drinks", local: "Slatko i piće", items: [
    { name: "Fried banana with chocolate", local: "Pohovana banana sa čokoladom", size: "1 komad", price: "0,80 €" },
    { name: "Fried pineapple", local: "Pohovani ananas", size: "1 komad", price: "1,40 €" },
    { name: "Coca-Cola", local: "Coca-Cola", size: "330 ml", price: "1,70 €" },
    { name: "Coca-Cola Zero", local: "Coca-Cola Zero", size: "330 ml", price: "1,70 €" },
    { name: "Campari spritz", local: "Campari spritz", size: "250 ml", price: "2,90 €" },
    { name: "Limoncello spritz", local: "Limoncello spritz", size: "250 ml", price: "2,90 €" },
    { name: "Aperol spritz", local: "Aperol spritz", size: "250 ml", price: "2,90 €" },
    { name: "Asahi beer", local: "Asahi pivo", size: "330 ml", price: "2,90 €" },
  ] },
  { label: "Extras & combos", local: "Dodaci i kombinacije", items: [
    { name: "Sauces", local: "Oyster, sweet chili, spicy Chinese oil, white/black pepper, chili mayo ili spicy cream", size: "po komadu", price: "0,90 €" },
    { name: "Noodles combo", local: "Nudle i 2 Coca-Cola", price: "11,20 €" },
    { name: "Lucky combo", local: "Spicy wings, Marley beef i 2 Asahi piva", price: "17,30 €" },
  ] },
];
