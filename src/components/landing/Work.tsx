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
    className="flex h-full flex-col items-center justify-center bg-konoba-bg px-5 text-center"
  >
    <p className="text-[10px] tracking-[0.24em] text-konoba-terra uppercase sm:text-[11px] sm:tracking-[0.28em]">
      Virpazar — Skadarsko jezero
    </p>
    <p className="font-serif mt-3 text-3xl italic text-konoba-cream sm:text-5xl">
      Konoba Skadar
    </p>
    <div className="mt-4 h-px w-16 bg-konoba-terra" aria-hidden="true" />
    <p className="mt-3 text-[10px] tracking-[0.2em] text-konoba-cream/60 uppercase sm:text-[11px]">
      Meni · Galerija · Rezervacije
    </p>
  </div>,

  // Titan Gym — condensed caps, volt on black
  <div
    key="titan"
    className="relative flex h-full flex-col justify-center overflow-hidden bg-titan-bg px-6 sm:px-8"
  >
    <div
      aria-hidden="true"
      className="absolute -right-6 top-1/2 h-[130%] w-10 -translate-y-1/2 rotate-[18deg] bg-titan-volt/90"
    />
    <p className="headline text-4xl not-italic text-white sm:text-6xl">
      Titan<span className="text-titan-volt">Gym</span>
    </p>
    <p className="mt-3 text-[10px] leading-relaxed tracking-[0.14em] text-titan-steel uppercase sm:text-[11px] sm:tracking-[0.28em]">
      Podgorica · 06—23h
    </p>
  </div>,

  // Barbershop — cream, deep green, barber stripe
  <div
    key="barber"
    className="flex h-full flex-col items-center justify-center bg-barber-bg px-5 text-center"
  >
    <p className="text-[10px] tracking-[0.24em] text-barber-gold uppercase sm:text-[11px] sm:tracking-[0.28em]">
      Est. 2018 — Stara Varoš
    </p>
    <p className="font-serif mt-3 text-2xl text-barber-green sm:text-4xl">
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
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-4xl sm:text-6xl">{dict.work.title}</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right">
              {dict.work.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col sm:mt-14">
          {dict.work.items.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="group grid gap-6 border-t border-line py-9 last:border-b sm:gap-8 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              {/* poster first on mobile — the design is the pitch, not the label */}
              <div
                className={`aspect-[16/10] overflow-hidden border border-line transition-transform duration-300 group-hover:-translate-y-1 ${
                  i % 2 === 1 ? "lg:-rotate-[0.6deg]" : "lg:rotate-[0.6deg]"
                } group-hover:rotate-0`}
              >
                <div className="poster-drift h-full">{POSTERS[i]}</div>
              </div>

              {/* desktop alternates sides; on mobile the poster always leads */}
              <div className={i % 2 === 1 ? "" : "lg:-order-1"}>
                <h3 className="headline text-3xl transition-colors duration-300 group-hover:text-red-bright sm:text-5xl">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted sm:mt-4">
                  {item.tag} — {item.desc}
                </p>
                <span className="sweep mt-5 inline-block font-semibold sm:mt-6">
                  {dict.work.open} ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
