import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { LuckyPicker } from "./LuckyPicker";

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lucky-serif",
});
const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-lucky-sans",
});

export const metadata: Metadata = {
  title: "Lucky Chopsticks — Podgorica | Dizajn koncept",
  description: "Dizajn koncept za Lucky Chopsticks u Podgorici — meni koji se lako bira, specijaliteti i rezervacija na dohvat palca.",
  robots: { index: false, follow: false },
};

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c75b]";
const display = "[font-family:var(--font-lucky-serif),Georgia,serif]";
const label = "text-[10px] font-bold tracking-[0.22em] uppercase";

const dishes = [
  ["Sichuan chicken", "Sičuanska piletina · 400 g", "4,90 €", "Ljutkasto"],
  ["Noodles with shrimp", "Nudle sa škampima · 400 g", "5,90 €", "Najtraženije"],
  ["Mapo tofu", "Mapo tofu · 300 g", "6,90 €", "Vegansko"],
];

const menu = [
  {
    title: "Predjela",
    items: [
      ["Hot-n-sour soup", "Kisela ljuta supa · 250 ml", "3,50 €"],
      ["Miso soup", "Miso supa · 250 ml", "3,30 €"],
      ["Fried rice", "Kuvana riža · 200 g", "1,80 €"],
      ["Fried aromatic shrimp", "Pohovani aromatični škampi · po komadu", "1,40 €"],
      ["Dumplings", "Povrće, veganski, govedina, svinjetina ili piletina · po komadu", "0,60 €"],
      ["Spicy pickled potato", "Ljuti kiseli krompir · 250 g", "3,30 €"],
      ["Fresh cucumber salad", "Salata od krastavca · 200 g", "2,20 €"],
    ],
  },
  {
    title: "Nudle i rižoto",
    items: [
      ["Noodles with vegetables", "Nudle sa povrćem · 400 g", "3,60 €"],
      ["Noodles with chicken", "Nudle sa piletinom · 400 g", "4,80 €"],
      ["Noodles with beef", "Nudle sa junetinom · 400 g", "5,20 €"],
      ["Noodles with shrimp", "Nudle sa škampima · 400 g", "5,90 €"],
      ["Rice risotto with vegetables", "Rižoto sa povrćem · 400 g", "3,80 €"],
      ["Rice risotto with chicken", "Rižoto sa piletinom · 400 g", "4,90 €"],
      ["Rice risotto with beef", "Rižoto sa govedinom · 400 g", "5,80 €"],
      ["Rice risotto with shrimp", "Rižoto sa škampima · 400 g", "6,30 €"],
    ],
  },
  {
    title: "Glavna jela",
    items: [
      ["Sichuan chicken", "Sičuanska piletina · 400 g", "4,90 €"],
      ["Gongbao chicken", "Gongbao piletina · 400 g", "5,20 €"],
      ["Sweet and sour chicken", "Piletina u slatko-kiselom sosu · 400 g", "5,90 €"],
      ["Spicy chicken wings", "Ljuta krilca · 350 g", "6,60 €"],
      ["Beef on hot plate", "Junetina na vrućoj ploči · 400 g", "6,80 €"],
      ["Mapo tofu", "Mapo tofu · 300 g", "6,90 €"],
      ["Marley chicken", "Marley piletina · 400 g", "6,90 €"],
      ["Marley beef", "Marley junetina · 400 g", "8,90 €"],
    ],
  },
  {
    title: "Slatko, piće i dodaci",
    items: [
      ["Fried banana with chocolate", "Pohovana banana sa čokoladom · 1 komad", "0,80 €"],
      ["Fried pineapple", "Pohovani ananas · 1 komad", "1,40 €"],
      ["Asahi beer", "330 ml", "2,90 €"],
      ["Spritz", "Campari, Limoncello ili Aperol · 250 ml", "2,90 €"],
      ["Sauces", "Oyster, sweet chili, spicy Chinese oil, white/black pepper, chili mayo ili spicy cream", "0,90 €"],
      ["Noodles combo", "Nudle i 2 Coca-Cola", "11,20 €"],
      ["Lucky combo", "Spicy wings, Marley beef i 2 Asahi piva", "17,30 €"],
    ],
  },
];

export default function LuckyChopsticksPage() {
  return (
    <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#12100d] pb-20 text-[#f9f1df] [font-family:var(--font-lucky-sans),Arial,sans-serif] md:pb-0`}>
      <VibeLabBar />
      <header className="relative z-10 border-b border-white/10 bg-[#12100d]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-1 sm:flex-row sm:justify-between sm:px-8">
          <a href="#vrh" className={`${display} flex min-h-12 items-center text-2xl font-semibold tracking-tight ${focus}`}>
            Lucky <span className="ml-1 text-[#f1c75b]">Chopsticks</span>
          </a>
          <nav aria-label="Glavna navigacija" className="flex flex-wrap justify-center gap-x-5">
            <a href="#meni" className={`${label} flex min-h-11 items-center hover:text-[#f1c75b] ${focus}`}>Meni</a>
            <a href="#izdvajamo" className={`${label} flex min-h-11 items-center hover:text-[#f1c75b] ${focus}`}>Izdvajamo</a>
            <a href="#posjeta" className={`${label} flex min-h-11 items-center hover:text-[#f1c75b] ${focus}`}>Posjeta</a>
          </nav>
        </div>
      </header>

      <main id="vrh">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <Image
            src="/lucky-chopsticks-hero.webp"
            alt="Rezanci podignuti štapićima iz činije sa knedlama i chilli uljem"
            width={1920}
            height={1280}
            priority
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,16,13,.98)_0%,rgba(18,16,13,.87)_35%,rgba(18,16,13,.22)_72%,rgba(18,16,13,.48)_100%)]" />
          <div className="mx-auto flex min-h-[620px] max-w-6xl items-end px-6 py-14 sm:min-h-[680px] sm:px-8 sm:py-20">
            <div className="max-w-xl">
              <p className={`${label} text-[#f1c75b]`}>Asian comfort food · Podgorica</p>
              <h1 className={`${display} mt-4 text-5xl leading-[.92] sm:text-7xl lg:text-8xl`}>
                Sreća je <em className="font-normal text-[#f1c75b]">topla</em>.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
                Noodles, dumplings i jela iz woka za stolove koji ostaju još malo duže.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
                <a href="#meni" className={`inline-flex min-h-12 items-center bg-[#f1c75b] px-6 text-sm font-bold text-[#17120d] transition hover:bg-[#fff0bb] ${focus}`}>Pogledaj meni</a>
                <a href="#posjeta" className={`inline-flex min-h-12 items-center px-3 text-sm font-semibold text-white underline decoration-[#f1c75b] decoration-2 underline-offset-8 hover:text-[#f1c75b] ${focus}`}>Planiraj posjetu</a>
              </div>
            </div>
          </div>
        </section>

        <LuckyPicker />

        <section id="meni" className="scroll-mt-6 bg-[#f6eedc] py-16 text-[#1d1711] sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className={`${label} text-[#aa371d]`}>Sve na jednom mjestu</p><h2 className={`${display} mt-3 text-4xl sm:text-5xl`}>Cijeli meni.</h2></div>
              <p className="max-w-xs text-sm leading-relaxed text-[#1d1711]/65">Brz za pregled, lak za naručivanje — bez slike menija koja se mora zumirati.</p>
            </div>
            <div className="mt-10 border-t border-[#1d1711]/20">
              {menu.map((section, index) => (
                <details key={section.title} open={index === 0} className="group border-b border-[#1d1711]/20">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className={`${display} text-2xl sm:text-3xl`}>{section.title}</span>
                    <span aria-hidden="true" className="text-2xl text-[#aa371d] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ul className="grid gap-x-12 pb-7 sm:grid-cols-2">
                    {section.items.map(([name, description, price]) => <li key={name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-[#1d1711]/10 py-4"><div><h3 className="font-bold">{name}</h3><p className="mt-1 text-sm leading-relaxed text-[#1d1711]/60">{description}</p></div><p className="font-bold tabular-nums text-[#aa371d]">{price}</p></li>)}
                  </ul>
                </details>
              ))}
            </div>
            <p className="mt-5 text-xs text-[#1d1711]/55">Cijene i jelovnik preuzeti iz objavljenog Lucky Chopsticks menija; provjeriti prije štampe ili objave promjena.</p>
          </div>
        </section>

        <section id="izdvajamo" className="scroll-mt-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div><p className={`${label} text-[#f1c75b]`}>Lucky tonight</p><h2 className={`${display} mt-3 text-4xl leading-tight sm:text-5xl`}>Mali meni.<br />Veliki apetit.</h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">Tri jela koja bi sajt uvijek držao naprijed — uz stvarne fotografije, cijene i jasne oznake za svaki ukus.</p></div>
            <ul className="border-t border-white/20">
              {dishes.map(([name, details, price, tag]) => <li key={name} className="grid gap-3 border-b border-white/20 py-6 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex flex-wrap items-center gap-3"><h3 className={`${display} text-2xl sm:text-3xl`}>{name}</h3><span className="rounded-full border border-[#f1c75b]/50 px-2 py-1 text-[10px] font-bold tracking-wider text-[#f1c75b] uppercase">{tag}</span></div><p className="mt-2 text-sm text-white/55">{details}</p></div><p className={`${display} text-2xl text-[#f1c75b]`}>{price}</p></li>)}
            </ul>
          </div>
        </section>

        <section id="posjeta" className="scroll-mt-6 border-y border-white/10 bg-[#aa371d]">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className={`${label} text-[#f5d58b]`}>Tvoj sto čeka</p><h2 className={`${display} mt-3 text-4xl leading-tight sm:text-5xl`}>Dobra večera počinje lakše.</h2><p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75">Lokacija, radno vrijeme i rezervacija ovdje bi bili na jednom mjestu — bez kopanja po objavama i porukama.</p></div>
            <div className="rounded-sm border border-white/25 bg-[#8c2817] p-6 lg:min-w-80"><p className={`${label} text-[#f5d58b]`}>Lucky Chopsticks</p><a href="tel:+38269104904" className={`mt-4 block text-2xl font-bold tracking-tight hover:text-[#f5d58b] ${focus}`}>069 104 904</a><a href="https://www.instagram.com/lucky.chopsticks.pg/" className={`mt-2 block text-sm text-white/75 hover:text-[#f5d58b] ${focus}`}>@lucky.chopsticks.pg</a><a href="https://www.luckychopsticks.pg/" className={`mt-1 block text-sm text-white/75 hover:text-[#f5d58b] ${focus}`}>luckychopsticks.pg</a><a href="#vrh" className={`mt-6 inline-flex min-h-11 items-center bg-[#f6eedc] px-5 text-sm font-bold text-[#7f2112] hover:bg-white ${focus}`}>Vrati se na vrh</a></div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-10 text-center text-sm text-white/55"><p>Lucky Chopsticks · Podgorica</p><p className="mt-3 text-xs">Dizajn koncept: <Link href="/" className={`font-semibold text-[#f1c75b] hover:underline ${focus}`}>VibeLab</Link></p></footer>
      <a href="#meni" className={`fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center bg-[#f1c75b] px-5 text-sm font-bold text-[#17120d] shadow-xl md:hidden ${focus}`}>Pogledaj meni</a>
    </div>
  );
}
