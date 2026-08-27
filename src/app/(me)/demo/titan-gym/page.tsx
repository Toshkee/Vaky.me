import type { Metadata } from "next";
import Link from "next/link";
import { Anton } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { plans, programs, schedule } from "./data";

const anton = Anton({ weight: "400", subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-anton" });

export const metadata: Metadata = {
  title: "Titan Gym — Teretana u Podgorici | Dizajn koncept",
  description: "Dizajn koncept za teretanu u Podgorici sa programima, rasporedom, članarinama i kontaktom.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-titan-gym.png"] },
};

const display = "font-[family-name:var(--font-anton)] uppercase";
const label = "text-[11px] font-bold tracking-[0.2em] uppercase";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#719000]";
const primary = `inline-flex min-h-12 items-center justify-center bg-[#17191b] px-7 text-sm font-bold text-white uppercase transition-colors hover:bg-[#719000] ${focus}`;

export default function TitanGymPage() {
  return (
    <div className={`${anton.variable} min-h-screen bg-[#f2f0eb] pb-20 text-[#151719] md:pb-0`}>
      <VibeLabBar />
      <header className="border-b border-black/15">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-1 sm:flex-row sm:justify-between sm:px-8 sm:py-2">
          <a href="#vrh" className={`${display} flex min-h-11 items-center gap-2 text-xl tracking-wide ${focus}`}>
            <span aria-hidden="true" className="h-5 w-2 bg-[#719000]" />Titan Gym
          </a>
          <nav aria-label="Glavna navigacija" className="flex flex-wrap items-center justify-center gap-x-6">
            <a href="#programi" className={`${label} py-3.5 hover:text-[#587100] ${focus}`}>Programi</a>
            <a href="#clanarine" className={`${label} py-3.5 hover:text-[#587100] ${focus}`}>Članarine</a>
            <a href="#raspored" className={`${label} py-3.5 hover:text-[#587100] ${focus}`}>Raspored</a>
            <a href="#kontakt" className={`${label} py-3.5 hover:text-[#587100] ${focus}`}>Kontakt</a>
          </nav>
        </div>
      </header>

      <main id="vrh">
        <section>
          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-20">
            <div className="max-w-2xl">
              <p className={`${label} text-[#587100]`}>Teretana · Podgorica</p>
              <h1 className={`${display} mt-4 text-5xl leading-[0.95] sm:text-7xl`}>Trening koji staje u tvoj dan.</h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60 sm:text-lg">
                Zona snage, kardio i grupni programi na jednom mjestu. Dođi na probni trening i upoznaj prostor prije učlanjenja.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
                <a href="tel:+38267000000" className={primary}>Zakaži probni trening</a>
                <p className="text-sm text-black/55">Pon–Pet 06–23h · Sub 08–22h</p>
              </div>
            </div>
          </div>
        </section>

        <section id="programi" className="scroll-mt-6 border-t border-black/15">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-[#587100]`}>Programi</p>
            <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>Izaberi način treninga</h2>
            <ul className="mt-9 grid gap-x-10 sm:grid-cols-2">
              {programs.map((program) => (
                <li key={program.name} className="border-t border-black/20 py-5">
                  <h3 className={`${display} text-2xl`}>{program.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{program.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="clanarine" className="scroll-mt-6 bg-[#17191b] text-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-[#c8f31d]`}>Cjenovnik</p>
            <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>Jednostavne članarine</h2>
            <ul className="mt-9 grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => (
                <li key={plan.name} className={`border p-6 ${plan.highlighted ? "border-[#c8f31d]" : "border-white/20"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`${display} text-2xl`}>{plan.name}</h3>
                      {plan.highlighted ? <p className={`${label} mt-1 text-[#c8f31d]`}>Najtraženija</p> : null}
                    </div>
                    <p className="text-right"><span className={`${display} block text-4xl`}>{plan.price}</span><span className="text-xs text-white/50">{plan.period}</span></p>
                  </div>
                  <ul className="mt-6 space-y-2 border-t border-white/15 pt-5">
                    {plan.features.map((feature) => <li key={feature} className="text-sm text-white/65">{feature}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/55">Ilustrativne cijene za potrebe koncepta — potvrditi prije objave.</p>
          </div>
        </section>

        <section id="raspored" className="scroll-mt-6 border-t border-black/15">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-[#587100]`}>Grupni treninzi</p>
            <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>Sedmični raspored</h2>
            <div className="mt-9 grid gap-x-10 lg:grid-cols-2">
              {schedule.map((day) => (
                <details key={day.day} className="group border-t border-black/20">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                    <span className={`${display} text-2xl`}>{day.day}</span>
                    <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ul className="space-y-2 pb-5">
                    {day.slots.map((slot) => <li key={`${day.day}-${slot.time}`} className="flex items-baseline justify-between gap-6 text-sm"><span>{slot.name}</span><span className="font-semibold text-[#587100] tabular-nums">{slot.time}</span></li>)}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-6 border-t border-black/15">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`${label} text-[#587100]`}>Kontakt</p>
              <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>Dođi na prvi trening</h2>
              <address className="mt-7 not-italic"><p className="font-semibold">Bulevar Josipa Broza 44, Podgorica</p><p className="mt-2 text-sm text-black/55">Pon–Pet 06–23h · Sub 08–22h · Ned 09–15h</p></address>
              <div className="mt-8 flex flex-col gap-3 sm:max-w-sm"><a href="tel:+38267000000" className={primary}>+382 67 000 000</a><a href="viber://chat?number=%2B38267000000" className={`inline-flex min-h-12 items-center justify-center border border-black/30 px-6 font-semibold hover:border-black ${focus}`}>Piši na Viber</a></div>
            </div>
            <div className="border border-black/20 p-1.5"><iframe src="https://www.google.com/maps?q=Bulevar%20Josipa%20Broza%2044%2C%20Podgorica%2C%20Crna%20Gora&output=embed" title="Mapa — Bulevar Josipa Broza 44, Podgorica" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0 grayscale sm:h-80" /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#17191b] text-white"><div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-10 text-center"><p className={`${display} text-lg`}>Titan Gym</p><p className="text-sm text-white/50">Bulevar Josipa Broza 44 · Podgorica</p><p className="mt-3 text-xs text-white/45">Koncept: <Link href="/" className={`font-semibold text-[#c8f31d] hover:underline ${focus}`}>VibeLab</Link></p></div></footer>
      <a href="tel:+38267000000" className={`fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center bg-[#17191b] px-5 text-sm font-bold text-white shadow-xl md:hidden ${focus}`}>Zakaži probni trening</a>
    </div>
  );
}
