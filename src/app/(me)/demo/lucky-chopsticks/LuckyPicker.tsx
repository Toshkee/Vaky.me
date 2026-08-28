"use client";

import { useState } from "react";

const picks = [
  {
    number: "01",
    label: "Nešto toplo",
    dish: "Hot-n-sour soup",
    note: "Kisela ljuta supa · 250 ml",
    price: "3,50 €",
    tone: "bg-[#f1c75b] text-[#221810]",
  },
  {
    number: "02",
    label: "Nešto iz woka",
    dish: "Gongbao chicken",
    note: "Gongbao piletina · 400 g",
    price: "5,20 €",
    tone: "bg-[#d84b28] text-[#fff3da]",
  },
  {
    number: "03",
    label: "Nešto za dijeljenje",
    dish: "Dumplings",
    note: "Povrće, veganski, govedina, svinjetina ili piletina",
    price: "0,60 € / komad",
    tone: "bg-[#284b42] text-[#fff3da]",
  },
  {
    number: "04",
    label: "Nešto svježe",
    dish: "Fresh cucumber salad",
    note: "Salata od krastavca · 200 g",
    price: "2,20 €",
    tone: "bg-[#f6eedc] text-[#221810]",
  },
];

const display = "[font-family:var(--font-lucky-serif),Georgia,serif]";

export function LuckyPicker() {
  const [selected, setSelected] = useState(0);
  const pick = picks[selected];

  return (
    <section aria-label="Izaberi svoj Lucky Chopsticks prijedlog" className="border-b border-white/10 bg-[#17120d] text-[#fff3da]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-8 sm:py-16 lg:grid-cols-[.88fr_1.12fr] lg:items-end">
        <div>
          <p className="text-[10px] font-bold tracking-[0.22em] text-[#f1c75b] uppercase">Lucky pick</p>
          <h2 className={`${display} mt-3 max-w-sm text-4xl leading-[.95] sm:text-5xl`}>Ne biraj jelo.<br /><em className="font-normal text-[#f1c75b]">Izaberi osjećaj.</em></h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">Jedan dodir otvara pravi prijedlog iz njihovog menija — mali trenutak koji ime Lucky Chopsticks pretvara u iskustvo.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_1.1fr]">
          <div className="grid grid-cols-2 gap-2">
            {picks.map((item, index) => (
              <button key={item.label} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`min-h-28 border p-4 text-left transition duration-300 ${selected === index ? "border-[#f1c75b] bg-white/10" : "border-white/15 hover:border-white/45"} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1c75b]`}>
                <span className="block text-[10px] font-bold tracking-[0.18em] text-[#f1c75b] uppercase">{item.number}</span><span className="mt-5 block text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </div>
          <div aria-live="polite" className={`relative overflow-hidden p-6 ${pick.tone}`}>
            <span aria-hidden="true" className={`${display} absolute -right-4 -top-7 text-7xl leading-none tracking-[-.1em] opacity-15`}>LUCKY</span>
            <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase opacity-70">Tvoj lucky pick</p>
            <h3 className={`${display} relative mt-8 text-3xl leading-none`}>{pick.dish}</h3>
            <p className="relative mt-3 text-sm opacity-75">{pick.note}</p>
            <p className={`${display} relative mt-7 text-2xl`}>{pick.price}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
