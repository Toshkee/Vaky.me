import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Anton, DM_Sans } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { LuckyMenu } from "./LuckyMenu";

const display = Anton({ weight: "400", subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-lucky-display" });
const sans = DM_Sans({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-lucky-sans" });

export const metadata: Metadata = {
  title: "Lucky Chopsticks — Asian Food u Podgorici | Dizajn koncept",
  description: "Lucky Chopsticks: azijska hrana, dostava i kompletan jelovnik u Podgorici.",
  robots: { index: false, follow: false },
};

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5cc61]";
const title = "[font-family:var(--font-lucky-display),Impact,sans-serif] uppercase tracking-wide";

export default function LuckyChopsticksPage() {
  return (
    <div className={`${display.variable} ${sans.variable} min-h-screen bg-[#0c0c0c] pb-20 text-[#fff7e7] [font-family:var(--font-lucky-sans),Arial,sans-serif] md:pb-0`}>
      <VibeLabBar />
      <header className="relative z-10 border-b border-white/15 bg-[#0c0c0c]"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 px-5 py-2 sm:px-8"><a href="#top" className={`${title} inline-flex min-h-11 items-center text-xl text-[#f5cc61] ${focus}`}>LC <span className="text-sm text-white">Lucky Chopsticks</span></a><nav aria-label="Glavna navigacija" className="flex items-center gap-4 text-[10px] font-bold tracking-[.16em] uppercase sm:gap-6"><a href="#meni" className={`hover:text-[#f5cc61] ${focus}`}>Meni</a><a href="#o-nama" className={`hover:text-[#f5cc61] ${focus}`}>O nama</a><a href="tel:+38269104904" className={`text-[#f5cc61] hover:text-white ${focus}`}>069 104 904</a></nav></div></header>

      <main id="top">
        <section className="relative isolate min-h-[640px] overflow-hidden border-b border-[#f5cc61]/30 sm:min-h-[720px]"><Image src="/lucky-chopsticks-hero.webp" alt="Nudle podignute štapićima uz dumplinge i chilli ulje" width={1920} height={1280} priority className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center]" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,.96)_0%,rgba(10,10,10,.84)_36%,rgba(10,10,10,.26)_75%,rgba(10,10,10,.5)_100%)]" /><div className="absolute inset-4 -z-10 border border-[#f5cc61]/45 sm:inset-7" /><div className="mx-auto flex min-h-[640px] max-w-7xl items-end px-6 py-16 sm:min-h-[720px] sm:px-8 sm:py-20"><div className="max-w-xl"><p className="text-[10px] font-bold tracking-[.28em] text-[#f5cc61] uppercase">Asian food · Podgorica</p><p className={`${title} mt-5 text-6xl leading-none text-[#f5cc61] sm:text-8xl`}>LC</p><h1 className={`${title} mt-4 text-4xl leading-[.9] text-white sm:text-6xl`}>Jedan zalogaj.<br /><span className="text-[#f5cc61]">Dobra sreća.</span></h1><p className="mt-5 max-w-md text-base leading-relaxed text-white/85">Nudle, dumplinzi i wok jela za večeri koje počinju gladni, a završavaju srećni.</p><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row"><a href="#meni" className={`inline-flex min-h-12 items-center bg-[#f5cc61] px-6 text-sm font-bold text-[#21110d] transition hover:bg-white ${focus}`}>Otvori meni</a><a href="tel:+38269104904" className={`inline-flex min-h-12 items-center border border-white/50 px-6 text-sm font-bold text-white hover:border-[#f5cc61] hover:text-[#f5cc61] ${focus}`}>Pozovi i naruči</a></div><p className="mt-5 text-xs font-bold tracking-[.15em] text-[#f5cc61] uppercase">Dostava 1 € · 069 104 904</p></div></div></section>

        <LuckyMenu />

        <section id="o-nama" className="border-y border-[#f5cc61]/25 bg-[#0c0c0c] px-6 py-16 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><p className="text-[10px] font-bold tracking-[.24em] text-[#f5cc61] uppercase">O Lucky Chopsticks</p><h2 className={`${title} mt-4 text-4xl leading-[.95] sm:text-6xl`}>Brza hrana.<br /><span className="text-[#f5cc61]">Pravi ukus.</span></h2></div><div className="border-l border-[#f5cc61]/40 pl-6 sm:pl-8"><p className="text-lg leading-relaxed text-white/90">Lucky Chopsticks donosi azijske favorite u Podgoricu: vruće nudle, dumplinge, rižoto, wok klasike i nekoliko stvari koje se dijele sa stolom.</p><p className="mt-5 text-sm leading-relaxed text-white/70">Bez predugačkog traženja po objavama: cijeli meni, cijene, dostava i broj za porudžbinu stoje na jednom mjestu. Ti izaberi šta jedeš — oni se bave ostatkom.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://www.instagram.com/lucky.chopsticks.pg/" className={`inline-flex min-h-11 items-center border border-[#f5cc61]/60 px-5 text-sm font-bold text-[#f5cc61] hover:bg-[#f5cc61] hover:text-[#21110d] ${focus}`}>Prati na Instagramu</a><a href="https://www.luckychopsticks.pg/" className={`inline-flex min-h-11 items-center px-3 text-sm font-bold text-white underline decoration-[#f5cc61] decoration-2 underline-offset-8 hover:text-[#f5cc61] ${focus}`}>luckychopsticks.pg</a></div></div></div></section>

        <section className="bg-[#a31c17] px-6 py-14 sm:px-8 sm:py-20"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border border-[#f5cc61]/75 p-7 sm:flex-row sm:items-end sm:p-10"><div><p className="text-[10px] font-bold tracking-[.24em] text-[#f5cc61] uppercase">Gladni?</p><h2 className={`${title} mt-3 text-4xl leading-none text-white sm:text-6xl`}>Naruči direktno.</h2><p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">Pozovi, provjeri opcije i neka omiljeno jelo dođe do tebe.</p></div><a href="tel:+38269104904" className={`inline-flex min-h-14 items-center bg-[#f5cc61] px-7 text-lg font-bold text-[#24110e] transition hover:bg-white ${focus}`}>069 104 904</a></div></section>
      </main>

      <footer className="bg-[#070707] px-6 py-10 text-center text-xs text-white/60"><p className={`${title} text-lg text-[#f5cc61]`}>Lucky Chopsticks</p><p className="mt-3">Dizajn koncept: <Link href="/" className={`font-bold text-white hover:text-[#f5cc61] ${focus}`}>VibeLab</Link></p></footer><a href="tel:+38269104904" className={`fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center bg-[#f5cc61] px-5 text-sm font-bold text-[#21110d] shadow-xl md:hidden ${focus}`}>Pozovi i naruči · 069 104 904</a>
    </div>
  );
}
