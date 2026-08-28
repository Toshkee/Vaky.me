"use client";

import { useEffect, useRef, useState } from "react";
import { menu } from "./data";

const display = "[font-family:var(--font-lucky-display),Impact,sans-serif] uppercase tracking-wide";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5cc61]";

export function LuckyMenu() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const touchStart = useRef<number | null>(null);
  const category = menu[page];
  const move = (direction: number) => setPage((current) => (current + direction + menu.length) % menu.length);

  useEffect(() => {
    const openFromMenuLink = () => {
      if (window.location.hash === "#meni") setOpen(true);
    };
    openFromMenuLink();
    window.addEventListener("hashchange", openFromMenuLink);
    return () => window.removeEventListener("hashchange", openFromMenuLink);
  }, []);

  if (!open) {
    return (
      <section id="meni" className="bg-[#f3dfb4] px-5 py-14 text-[#28110f] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-xl border-[3px] border-[#6f1713] bg-[#a31c17] p-2 shadow-[0_0_0_2px_#f5cc61]">
          <div className="relative overflow-hidden border border-[#f5cc61]/80 px-7 py-16 text-center sm:px-12 sm:py-24">
            <p className="relative text-[10px] font-bold tracking-[.28em] text-[#f5cc61] uppercase">Lucky Chopsticks</p>
            <h2 className={`${display} relative mt-5 text-5xl leading-none text-white sm:text-7xl`}>Otvori<br /><span className="text-[#f5cc61]">meni.</span></h2>
            <p className="relative mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/85">Sve što se služi, na pet stranica. Otvori, listaj i izaberi prije nego što pozoveš.</p>
            <button type="button" onClick={() => setOpen(true)} className={`relative mt-9 inline-flex min-h-12 items-center bg-[#f5cc61] px-7 text-sm font-bold text-[#24110e] transition hover:bg-white ${focus}`}>Otvori jelovnik <span aria-hidden="true" className="ml-3 text-lg">→</span></button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="meni" className="bg-[#f3dfb4] px-3 py-8 text-[#28110f] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl border-[3px] border-[#6f1713] bg-[#a31c17] p-2 shadow-[0_0_0_2px_#f5cc61] sm:p-4">
        <div className="border border-[#f5cc61]/80 p-4 sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-[#f5cc61]/60 pb-4"><button type="button" onClick={() => setOpen(false)} className={`text-[10px] font-bold tracking-[.18em] text-white uppercase hover:text-[#f5cc61] ${focus}`}>× Zatvori meni</button><p className="text-[10px] font-bold tracking-[.18em] text-[#f5cc61] uppercase">{page + 1} / {menu.length}</p></div>
          <div onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1); touchStart.current = null; }} className="min-h-[31rem] py-8 sm:min-h-[35rem]">
            <div key={category.label} className="motion-safe:animate-[lucky-page_280ms_ease-out]"><p className="text-[10px] font-bold tracking-[.24em] text-[#f5cc61] uppercase">Lucky menu</p><h2 className={`${display} mt-2 text-4xl text-white sm:text-6xl`}>{category.label}</h2><p className="mt-1 text-sm font-bold text-white/90">{category.local}</p><ul className="mt-7 divide-y divide-[#f5cc61]/25">{category.items.map((item) => <li key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-4"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-white">{item.name}</h3>{item.vegan ? <span className="rounded bg-[#70a33a] px-1.5 py-0.5 text-[9px] font-black text-[#10230d] uppercase">Vegan opcija</span> : null}{item.spicy ? <span aria-label="Ljuto">🌶</span> : null}</div><p className="mt-1 text-sm leading-relaxed text-white/90">{item.local}{item.size ? ` · ${item.size}` : ""}</p></div><p className="font-bold tabular-nums text-[#f5cc61]">{item.price}</p></li>)}</ul></div>
          </div>
          <div className="flex items-center justify-between border-t border-[#f5cc61]/60 pt-4"><button type="button" onClick={() => move(-1)} className={`inline-flex min-h-11 items-center px-2 text-sm font-bold text-white hover:text-[#f5cc61] ${focus}`}><span aria-hidden="true" className="mr-2 text-xl">←</span> Nazad</button><p className="hidden text-xs text-white/70 sm:block">Koristi strelice ili listaj prstom.</p><button type="button" onClick={() => move(1)} className={`inline-flex min-h-11 items-center px-2 text-sm font-bold text-white hover:text-[#f5cc61] ${focus}`}>Dalje <span aria-hidden="true" className="ml-2 text-xl">→</span></button></div>
        </div>
      </div>
    </section>
  );
}
