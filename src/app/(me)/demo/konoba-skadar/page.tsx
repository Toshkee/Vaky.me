import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Karla } from "next/font/google";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VakyBar } from "@/components/demo/VakyBar";
import { menuCategories } from "./data";

const display = Fraunces({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-skadar-display", axes: ["opsz", "SOFT", "WONK"] });
const sans = Karla({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-skadar-sans" });

export const metadata: Metadata = { title: "Konoba Skadar — Virpazar | Dizajn koncept", description: "Dizajn koncept za konobu u Virpazaru sa jelovnikom, rezervacijama i lokacijom.", robots: { index: false, follow: false }, openGraph: { images: ["/og-demo-konoba-skadar.png"] } };

const serif = "[font-family:var(--font-skadar-display),Georgia,serif]";
const label = "text-[11px] font-bold tracking-[0.22em] uppercase";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dfa15c]";
const primary = `inline-flex min-h-12 items-center justify-center bg-[#dfa15c] px-6 text-sm font-bold text-[#1b2a33] transition-colors hover:bg-[#f2e9d8] ${focus}`;

export default function KonobaSkadarPage() {
  return <div className={`${display.variable} ${sans.variable} min-h-screen bg-[#101d24] pb-20 text-[#f2e9d8] [font-family:var(--font-skadar-sans),Arial,sans-serif] md:pb-0`}>
    <VakyBar />
    <header className="border-b border-[#f2e9d8]/15 bg-[#101d24]"><div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-3 sm:px-8"><a href="#vrh" className={`${serif} inline-flex min-h-11 items-center text-xl tracking-tight ${focus}`}>Konoba Skadar</a><nav aria-label="Glavna navigacija" className="hidden items-center gap-7 md:flex"><a href="#jelovnik" className={`${label} hover:text-[#dfa15c] ${focus}`}>Jelovnik</a><a href="#prica" className={`${label} hover:text-[#dfa15c] ${focus}`}>O nama</a><a href="#lokacija" className={`${label} hover:text-[#dfa15c] ${focus}`}>Lokacija</a></nav><a href="tel:+38267000000" className={`hidden min-h-10 items-center border border-[#dfa15c]/70 px-4 text-xs font-bold text-[#dfa15c] transition-colors hover:bg-[#dfa15c] hover:text-[#1b2a33] sm:inline-flex ${focus}`}>Rezerviši sto</a></div></header>
    <main id="vrh">
      <section className="relative isolate overflow-hidden border-b border-[#dfa15c]/30">
        <Image src="/konoba-skadar-hero.webp" alt="Zavoj Rijeke Crnojevića kroz zelena brda Skadarskog jezera, sa barkom na vodi" width={1600} height={1067} priority className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,29,36,.68)_0%,rgba(16,29,36,.28)_38%,rgba(16,29,36,.62)_72%,rgba(16,29,36,.94)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,29,36,.72)_0%,rgba(16,29,36,.38)_44%,rgba(16,29,36,0)_72%)]" />
        <div className="mx-auto flex min-h-[620px] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 sm:min-h-[700px] sm:px-8 sm:pb-20">
          <p className={`${label} text-[#dfa15c]`}>Virpazar · Skadarsko jezero</p>
          <h1 className={`${serif} mt-5 max-w-3xl text-5xl leading-[1.02] tracking-tight sm:text-7xl`}>Sto uz jezero.<br /><em className="text-[#dfa15c]">Ukusi koji ostaju.</em></h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#f2e9d8]/85 sm:text-lg">Riba iz jezera, jela ispod sača i vino iz Crmnice. Bez žurbe — samo dobar sto i pogled koji zaslužuje još jednu čašu.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="tel:+38267000000" className={`${primary} max-sm:hidden`}>Rezerviši sto</a><a href="#jelovnik" className={`inline-flex min-h-12 items-center justify-center border border-[#f2e9d8]/50 px-6 text-sm font-bold text-[#f2e9d8] transition-colors hover:border-[#dfa15c] hover:text-[#dfa15c] ${focus}`}>Pogledaj jelovnik</a></div>
          <p className={`mt-6 ${label} text-[#f2e9d8]/70`}>Svaki dan · 10:00 – 23:00</p>
        </div>
      </section>
      <section id="jelovnik" className="scroll-mt-6 bg-[#f2e9d8] text-[#22333b]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="text-center"><p className={`${label} text-[#8e3b2f]`}>Jelovnik</p><h2 className={`${serif} mt-4 text-4xl tracking-tight sm:text-5xl`}>Ono što bismo i sami naručili</h2><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#22333b]/75">Jezerska riba, jela ispod sača i lokalne stvari koje idu najbolje uz duži razgovor.</p><div aria-hidden="true" className="mx-auto mt-8 h-px w-24 bg-[#8e3b2f]/50" /></div>
          <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">{menuCategories.map((category) => <section key={category.id} aria-label={category.title}><h3 className={`${serif} flex items-baseline gap-4 text-2xl tracking-tight after:h-px after:flex-1 after:bg-[#22333b]/25`}>{category.title}</h3><ul className="mt-6 space-y-5">{category.items.map((item) => <li key={item.name}><p className="flex items-baseline gap-2 font-bold"><span>{item.name}</span><span aria-hidden="true" className="min-w-6 flex-1 border-b border-dotted border-[#22333b]/40" /><span className="tabular-nums">{item.price}</span></p><p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-[#22333b]/70">{item.description}</p></li>)}</ul></section>)}</div>
          <p className="mt-12 text-center text-xs text-[#22333b]/75">Ilustrativni jelovnik i cijene za potrebe koncepta — potvrditi prije objave.</p>
        </div>
      </section>
      <section id="prica" className="scroll-mt-6 border-y border-[#dfa15c]/25 bg-[#0c161c]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-20">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none"><Image src="/konoba-skadar-fish.webp" alt="Cijela riba sa žara na tanjiru, uz limun i čašu crnog vina" width={1000} height={967} className="h-auto w-full border border-[#dfa15c]/40 object-cover" sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 90vw" /><p className={`absolute bottom-4 left-4 bg-[#101d24]/85 px-3 py-2 text-[11px] font-bold tracking-[0.18em] uppercase`}>Sa žara, iz jezera</p></div>
          <div><p className={`${label} text-[#dfa15c]`}>Naš način</p><h2 className={`${serif} mt-4 text-4xl leading-[1.04] tracking-tight sm:text-5xl`}>Ne komplikujemo <em className="text-[#dfa15c]">ono što je već dobro.</em></h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-[#f2e9d8]/85">Mjesto za ručak poslije vožnje jezerom, večeru s porodicom ili sto koji se ne napušta kad padne sunce.</p><div className="mt-9 grid gap-7 border-t border-[#f2e9d8]/15 pt-7 sm:grid-cols-3">{[["Jezero", "Riba i ukljeva kad je svježa."],["Crmnica", "Vino koje pripada ovom kraju."],["Domaće", "Recepti bez suvišnih riječi."]].map(([title, body]) => <div key={title}><h3 className={`${serif} text-xl`}>{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#f2e9d8]/65">{body}</p></div>)}</div></div>
        </div>
      </section>
      <section id="rezervacije" className="scroll-mt-6 bg-[#6e2a22] text-[#f2e9d8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-end">
          <div><p className={`${label} text-[#dfa15c]`}>Rezervacije</p><h2 className={`${serif} mt-4 max-w-md text-4xl tracking-tight sm:text-5xl`}>Sačuvaj sebi dobar sto.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-[#f2e9d8]/80">Za terasu, ručak za više ljudi ili poseban datum — pozovite nas malo ranije.</p><a href="tel:+38267000000" className={`mt-8 ${primary}`}>+382 67 000 000</a></div>
          <div className="grid gap-0 sm:grid-cols-3">{[["01", "Pozovite", "Datum, vrijeme i broj gostiju."],["02", "Potvrdimo", "Javljamo vam da je sto vaš."],["03", "Uživajte", "Ostalo je na nama."]].map(([number, title, body]) => <div key={number} className="border-b border-[#f2e9d8]/25 py-5 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"><p className={`${label} text-[#dfa15c]`}>{number}</p><h3 className={`${serif} mt-4 text-xl`}>{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#f2e9d8]/70">{body}</p></div>)}</div>
        </div>
      </section>
      <section id="lokacija" className="scroll-mt-6 bg-[#101d24]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div><p className={`${label} text-[#dfa15c]`}>Lokacija</p><h2 className={`${serif} mt-4 text-4xl tracking-tight sm:text-5xl`}>Obala 13, Virpazar.</h2><address className="mt-7 text-sm not-italic leading-relaxed"><strong>Obala 13, 81305 Virpazar, Crna Gora</strong><br /><span className="text-[#f2e9d8]/65">Ponedjeljak–Nedjelja · 10:00–23:00</span></address><a href="viber://chat?number=%2B38267000000" className={`mt-8 inline-flex text-sm font-bold underline decoration-[#dfa15c] decoration-2 underline-offset-4 hover:text-[#dfa15c] ${focus}`}>Pošalji poruku na Viber</a></div>
          <div className="overflow-hidden border border-[#dfa15c]/40 bg-[#0c161c] p-1.5"><MapEmbed query="Obala 13, 81305 Virpazar, Crna Gora" title="Mapa — Obala 13, 81305 Virpazar, Crna Gora" className="h-72 w-full border-0 sm:h-full sm:min-h-80" buttonClassName={`${primary} px-5 text-sm`} linkClassName={`text-xs underline underline-offset-4 ${focus}`} /></div>
        </div>
      </section>
    </main>
    <footer className="border-t border-[#f2e9d8]/15 bg-[#0c161c]"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8"><p className={`${serif} text-xl`}>Konoba Skadar</p><p className="text-xs text-[#f2e9d8]/60">Koncept: <Link href="/" className={`font-bold text-[#f2e9d8] hover:text-[#dfa15c] ${focus}`}>Vaky</Link></p></div></footer>
    <a href="tel:+38267000000" className={`fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center bg-[#dfa15c] px-5 text-sm font-bold text-[#1b2a33] shadow-xl md:hidden ${focus}`}>Rezerviši sto</a>
  </div>;
}
