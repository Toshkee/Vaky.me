import Link from "next/link";
import { Anton } from "next/font/google";
import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

/* The Titan demo is set in Anton — its landing poster uses the real thing, so
   the portfolio previews the demo's actual typography, not an approximation. */
const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * Three real, clickable demo sites. Each entry's poster panel is set in that
 * demo's own palette and typography — the portfolio should read as three
 * different studios' work, because each demo IS a different design.
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

  // Titan Gym — Anton caps, volt on black
  <div
    key="titan"
    className="relative flex h-full flex-col justify-center overflow-hidden bg-titan-bg px-6 sm:px-8"
  >
    {/* the volt slash, crossing the full panel. Kept inside the right edge:
        pushed further out, the rotation swings its top end past the clip and
        it collapses into a stray corner wedge. */}
    <div
      aria-hidden="true"
      className="absolute -top-1/4 -bottom-1/4 right-10 w-8 rotate-[14deg] bg-titan-volt/90"
    />
    <p className={`${anton.className} text-4xl uppercase text-white sm:text-6xl`}>
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
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-3xl sm:text-5xl">{dict.work.title}</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right">
              {dict.work.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col sm:mt-12">
          {dict.work.items.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="group grid gap-6 border-t border-line py-8 last:border-b sm:gap-8 sm:py-10 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              {/* poster first on mobile — the design is the pitch, not the label */}
              <div className="aspect-[16/10] overflow-hidden border border-line shadow-[0_10px_34px_rgba(22,22,26,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
                {POSTERS[i]}
              </div>

              {/* desktop alternates sides; on mobile the poster always leads */}
              <div className={i % 2 === 1 ? "" : "lg:-order-1"}>
                <h3 className="headline text-2xl transition-colors duration-300 group-hover:text-red sm:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">
                  {item.tag} — {item.desc}
                </p>
                <span className="sweep mt-5 inline-block font-semibold text-red">
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
