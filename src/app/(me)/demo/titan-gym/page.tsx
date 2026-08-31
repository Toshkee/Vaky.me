import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Barlow, Big_Shoulders } from "next/font/google";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VakyBar } from "@/components/demo/VakyBar";
import { plans, programs, schedule } from "./data";

const display = Big_Shoulders({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-titan-display" });
const sans = Barlow({ weight: ["400", "600", "700"], subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-titan-sans" });

export const metadata: Metadata = { title: "Titan Gym — Teretana u Podgorici | Dizajn koncept", description: "Dizajn koncept za teretanu u Podgorici sa programima, rasporedom, članarinama i kontaktom.", robots: { index: false, follow: false }, openGraph: { images: ["/og-demo-titan-gym.png"] } };

const title = "[font-family:var(--font-titan-display),Impact,sans-serif] font-bold uppercase";
const label = "text-[11px] font-bold tracking-[0.22em] uppercase";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5a1f]";
const primary = `inline-flex min-h-12 items-center justify-center bg-[#ff5a1f] px-6 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-white ${focus}`;
const hazard = "bg-[repeating-linear-gradient(-45deg,#ff5a1f_0,#ff5a1f_12px,transparent_12px,transparent_24px)]";

export default function TitanGymPage() {
  return <div className={`${display.variable} ${sans.variable} min-h-screen bg-[#0c0d0e] pb-20 text-[#f5f4f2] [font-family:var(--font-titan-sans),Arial,sans-serif] md:pb-0`}>
    <VakyBar />
    <header className="border-b border-white/15 bg-[#0c0d0e]"><div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-3 sm:px-8"><a href="#vrh" className={`${title} inline-flex min-h-11 items-center text-2xl tracking-wide ${focus}`}>Titan<span className="text-[#ff5a1f]">.</span></a><nav aria-label="Glavna navigacija" className="hidden items-center gap-7 md:flex"><a href="#programi" className={`${label} hover:text-[#ff5a1f] ${focus}`}>Programi</a><a href="#clanarine" className={`${label} hover:text-[#ff5a1f] ${focus}`}>Članarine</a><a href="#raspored" className={`${label} hover:text-[#ff5a1f] ${focus}`}>Raspored</a></nav><a href="tel:+38267000000" className={`hidden min-h-10 items-center bg-[#ff5a1f] px-4 text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-white sm:inline-flex ${focus}`}>Probni trening</a></div></header>
    <main id="vrh">
      <section className="relative isolate overflow-hidden border-b border-[#ff5a1f]/50">
        <Image src="/titan-gym-hero.webp" alt="Sportista čuči nad šipkom za mrtvo dizanje u polumračnoj teretani" width={1920} height={1280} priority className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_30%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,13,14,.72)_0%,rgba(12,13,14,.38)_40%,rgba(12,13,14,.86)_82%,rgba(12,13,14,.98)_100%)]" />
        <div className="mx-auto flex min-h-[620px] max-w-6xl flex-col justify-end px-5 pb-14 pt-24 sm:min-h-[700px] sm:px-8 sm:pb-16">
          <p className={`${label} text-[#ff5a1f]`}>Teretana · Podgorica</p>
          <h1 className={`${title} mt-4 max-w-4xl text-6xl leading-[.9] sm:text-8xl lg:text-9xl`}>Snaga se<br />gradi. <span className="text-[#ff5a1f]">Danas.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">Ozbiljan prostor, jasni programi i treneri koji znaju kada treba pritisnuti, a kada usporiti. Trening koji možeš da održiš.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="tel:+38267000000" className={`${primary} max-sm:hidden`}>Zakaži probni trening</a><a href="#programi" className={`inline-flex min-h-12 items-center justify-center border border-white/50 px-6 text-sm font-bold uppercase tracking-wide transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f] ${focus}`}>Pogledaj programe</a></div>
        </div>
        <div aria-hidden="true" className={`h-2 ${hazard}`} />
      </section>
      <section aria-label="Ključne informacije" className="border-b border-white/15 bg-[#121315]"><dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">{[["06–23", "Radnim danima"],["18", "Grupnih termina sedmično"],["€25", "Mjesečna članarina"],["0", "Ugovorne obaveze"]].map(([value, caption]) => <div key={caption} className="px-5 py-8 odd:border-r odd:border-white/10 sm:px-8 lg:border-r lg:border-white/10 lg:last:border-r-0"><dd className={`${title} text-5xl text-white sm:text-6xl`}>{value}</dd><dt className={`mt-2 ${label} text-white/55`}>{caption}</dt></div>)}</dl></section>
      <section id="programi" className="scroll-mt-6">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-5 border-b border-white/15 pb-8 md:flex-row md:items-end"><div><p className={`${label} text-[#ff5a1f]`}>Programi</p><h2 className={`${title} mt-3 text-5xl sm:text-6xl`}>Sve što ti treba.<br />Ništa što ne treba.</h2></div><p className="max-w-sm text-sm leading-relaxed text-white/60">Izaberi ritam koji ti odgovara — samostalno, sa trenerom ili u dobroj grupi.</p></div>
          <ul>{programs.map((program, index) => <li key={program.name} className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-white/15 py-6 sm:grid-cols-[5rem_1fr_1.2fr] sm:gap-x-8"><span aria-hidden="true" className={`${title} text-2xl text-[#ff5a1f] sm:text-3xl`}>0{index + 1}</span><h3 className={`${title} text-3xl sm:text-4xl`}>{program.name}</h3><p className="col-span-2 mt-2 text-sm leading-relaxed text-white/65 sm:col-span-1 sm:mt-0 sm:justify-self-end sm:text-right lg:max-w-md">{program.desc}</p></li>)}</ul>
        </div>
      </section>
      <section id="clanarine" className="scroll-mt-6 border-y border-white/15 bg-[#121315]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className={`${label} text-[#ff5a1f]`}>Članarine</p>
          <div className="mt-3 flex flex-col justify-between gap-5 pb-10 sm:flex-row sm:items-end"><h2 className={`${title} text-5xl sm:text-6xl`}>Plati. Dođi. Radi.</h2><p className="max-w-sm text-sm leading-relaxed text-white/60">Bez nejasnih paketa i sitnih slova. Pronađi period koji odgovara tvom ritmu.</p></div>
          <ul className="grid gap-5 lg:grid-cols-3">{plans.map((plan) => <li key={plan.name} className={`border p-7 ${plan.highlighted ? "border-[#ff5a1f] bg-[#0c0d0e]" : "border-white/20"}`}><p className={`${label} ${plan.highlighted ? "text-[#ff5a1f]" : "text-white/50"}`}>{plan.highlighted ? "Najtraženija" : "Članarina"}</p><h3 className={`${title} mt-4 text-3xl`}>{plan.name}</h3><p className="mt-5 flex items-baseline gap-3"><span className={`${title} text-6xl`}>{plan.price}</span><span className="text-sm text-white/55">{plan.period}</span></p><ul className="mt-7 space-y-3 border-t border-white/15 pt-5">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm text-white/75"><span aria-hidden="true" className="font-bold text-[#ff5a1f]">/</span>{feature}</li>)}</ul></li>)}</ul>
          <p className="mt-8 text-xs text-white/45">Ilustrativne cijene za potrebe koncepta — potvrditi prije objave.</p>
        </div>
      </section>
      <section id="raspored" className="scroll-mt-6">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-5 border-b border-white/15 pb-8 md:flex-row md:items-end"><div><p className={`${label} text-[#ff5a1f]`}>Grupni treninzi</p><h2 className={`${title} mt-3 text-5xl sm:text-6xl`}>Raspored sedmice</h2></div><p className="max-w-sm text-sm leading-relaxed text-white/60">Sačuvaj svoje mjesto pozivom ili na recepciji prije dolaska.</p></div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">{schedule.map((day) => <div key={day.day} className="bg-[#0c0d0e] py-6 sm:px-5"><h3 className={`${title} text-2xl text-[#ff5a1f]`}>{day.day}</h3><ul className="mt-4 space-y-2">{day.slots.map((slot) => <li key={`${day.day}-${slot.time}`} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2 text-sm"><span className="font-semibold">{slot.name}</span><time className={`${title} text-lg tabular-nums text-white/85`}>{slot.time}</time></li>)}</ul></div>)}</div>
        </div>
      </section>
      <section className="border-y-8 border-[#ff5a1f] bg-[#ff5a1f] text-black">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:flex-row lg:items-end">
          <div><p className={`${label}`}>Prvi korak</p><h2 className={`${title} mt-3 max-w-2xl text-5xl leading-[.92] sm:text-7xl`}>Dođi, pogledaj prostor, pa odluči.</h2><p className="mt-4 max-w-md text-sm font-semibold leading-relaxed">Prvi trening je prilika da upoznaš prostor i postaviš pitanja — bez pritiska.</p></div>
          <a href="tel:+38267000000" className={`inline-flex min-h-14 items-center bg-black px-8 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#121315] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black`}>+382 67 000 000</a>
        </div>
      </section>
      <section id="kontakt" className="scroll-mt-6 bg-[#0c0d0e]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div><p className={`${label} text-[#ff5a1f]`}>Gdje smo</p><h2 className={`${title} mt-3 max-w-md text-5xl sm:text-6xl`}>Bulevar Josipa Broza 44</h2><address className="mt-7 text-sm not-italic leading-relaxed"><strong>Bulevar Josipa Broza 44, Podgorica</strong><br /><span className="text-white/60">Pon–Pet 06–23h · Sub 08–22h · Ned 09–15h</span></address><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="tel:+38267000000" className={primary}>Pozovi nas</a><a href="viber://chat?number=%2B38267000000" className={`inline-flex min-h-12 items-center justify-center border border-white/40 px-6 text-sm font-bold uppercase tracking-wide transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f] ${focus}`}>Piši na Viber</a></div></div>
          <div className="overflow-hidden border border-white/25 bg-[#121315] p-1.5"><MapEmbed query="Bulevar Josipa Broza 44, Podgorica, Crna Gora" title="Mapa — Bulevar Josipa Broza 44, Podgorica" className="h-72 w-full border-0 grayscale sm:h-full sm:min-h-96" buttonClassName={`${primary} px-5 text-sm`} linkClassName={`text-xs underline underline-offset-4 ${focus}`} /></div>
        </div>
      </section>
    </main>
    <footer className="border-t border-white/15 bg-[#0c0d0e]"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8"><p className={`${title} text-2xl`}>Titan<span className="text-[#ff5a1f]">.</span></p><p className="text-xs text-white/55">Koncept: <Link href="/" className={`font-bold text-white hover:text-[#ff5a1f] ${focus}`}>Vaky</Link></p></div></footer>
    <a href="tel:+38267000000" className={`fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center bg-[#ff5a1f] px-5 text-sm font-bold uppercase tracking-wide text-black shadow-xl md:hidden ${focus}`}>Zakaži probni trening</a>
  </div>;
}
