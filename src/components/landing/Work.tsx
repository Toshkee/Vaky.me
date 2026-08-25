import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Three real, clickable demo sites. Each entry's poster panel is set in that
 * demo's own palette and typography — the portfolio should read as three
 * different studios' work, because each demo IS a different design.
 * Posters drift slowly inside their frames as you scroll (pure CSS).
 */
const POSTERS = [
  // Konoba Skadar — rustic serif, dusk warmth
  <div
    key="konoba"
    className="flex h-full flex-col items-center justify-center bg-konoba-bg px-6 text-center"
  >
    <p className="text-[11px] tracking-[0.28em] text-konoba-terra uppercase">
      Virpazar — Skadarsko jezero
    </p>
    <p className="font-serif mt-3 text-4xl italic text-konoba-cream sm:text-5xl">
      Konoba Skadar
    </p>
    <div className="mt-4 h-px w-16 bg-konoba-terra" aria-hidden="true" />
    <p className="mt-3 text-[11px] tracking-[0.22em] text-konoba-cream/60 uppercase">
      Meni · Galerija · Rezervacije
    </p>
  </div>,

  // Titan Gym — condensed caps, volt on black
  <div
    key="titan"
    className="relative flex h-full flex-col justify-center overflow-hidden bg-titan-bg px-8"
  >
    <div
      aria-hidden="true"
      className="absolute -right-6 top-1/2 h-[130%] w-10 -translate-y-1/2 rotate-[18deg] bg-titan-volt/90"
    />
    <p className="headline text-5xl not-italic text-white sm:text-6xl">
      Titan<span className="text-titan-volt">Gym</span>
    </p>
    <p className="mt-3 text-[11px] tracking-[0.28em] text-titan-steel uppercase">
      Podgorica · 06—23h · Prvi trening besplatan
    </p>
  </div>,

  // Barbershop — cream, deep green, barber stripe
  <div
    key="barber"
    className="flex h-full flex-col items-center justify-center bg-barber-bg px-6 text-center"
  >
    <p className="text-[11px] tracking-[0.28em] text-barber-gold uppercase">
      Est. 2018 — Stara Varoš
    </p>
    <p className="font-serif mt-3 text-3xl text-barber-green sm:text-4xl">
      Barbershop
      <br />
      <span className="italic">Stari Grad</span>
    </p>
    <div
      aria-hidden="true"
      className="mt-4 h-1.5 w-24"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg,#16382b 0 7px,#f5efe4 7px 9px,#a4342c 9px 16px,#f5efe4 16px 18px)",
      }}
    />
  </div>,
];

export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section id="radovi" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-5xl sm:text-6xl">{dict.work.title}</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right">
              {dict.work.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {dict.work.items.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="group grid gap-8 border-t border-line py-12 last:border-b lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="headline text-4xl transition-colors duration-300 group-hover:text-red-bright sm:text-5xl">
                  {item.name}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">
                  {item.tag} — {item.desc}
                </p>
                <span className="sweep mt-6 inline-block font-semibold">
                  {dict.work.open} ↗
                </span>
              </div>

              <div
                className={`aspect-[16/10] overflow-hidden border border-line transition-transform duration-300 group-hover:-translate-y-1 ${
                  i % 2 === 1 ? "lg:order-1 lg:-rotate-[0.6deg]" : "lg:rotate-[0.6deg]"
                } group-hover:rotate-0`}
              >
                <div className="poster-drift h-full">{POSTERS[i]}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
