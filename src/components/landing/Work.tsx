import Link from "next/link";
import { Anton } from "next/font/google";
import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";

/* The Titan demo is set in Anton — its poster uses the real thing, so the
   portfolio previews the demo's actual typography, not an approximation. */
const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * Three real, clickable demo sites shown as a plate of three specimens. Each
 * poster is set in that demo's own palette and typography — the row should
 * read as three different studios' work, because each demo IS a different
 * design. All three grounds are dark and distinct in hue, so the trio has
 * rhythm against the paper and no panel disappears into the page.
 *
 * The posters render at ~350px wide on every viewport (full width on mobile,
 * one third of the measure on desktop), so they need one type scale, not two.
 */
const POSTERS = [
  // Konoba Skadar — rustic serif, dusk warmth
  <div
    key="konoba"
    className="flex h-full flex-col items-center justify-center bg-konoba-bg px-5 text-center"
  >
    <p className="text-[10px] tracking-[0.24em] text-konoba-terra uppercase">
      Skadarsko jezero
    </p>
    <p className="font-serif mt-2.5 text-[26px] leading-tight italic text-konoba-cream">
      Konoba Skadar
    </p>
    <div className="mt-3 h-px w-12 bg-konoba-terra" aria-hidden="true" />
  </div>,

  // Titan Gym — Anton caps, volt on black
  <div
    key="titan"
    className="relative flex h-full flex-col justify-center overflow-hidden bg-titan-bg px-6"
  >
    {/* the volt slash, crossing the full panel. Kept inside the right edge:
        pushed further out, the rotation swings its top end past the clip and
        it collapses into a stray corner wedge. */}
    <div
      aria-hidden="true"
      className="absolute -top-1/4 -bottom-1/4 right-8 w-6 rotate-[14deg] bg-titan-volt/90"
    />
    <p className={`${anton.className} text-[34px] leading-none uppercase text-white`}>
      Titan<span className="text-titan-volt">Gym</span>
    </p>
    <p className="mt-2.5 text-[10px] tracking-[0.24em] text-titan-steel uppercase">
      Podgorica · 06—23h
    </p>
  </div>,

  // Barbershop — deep green ground, cream type, barber stripe
  <div
    key="barber"
    className="flex h-full flex-col items-center justify-center bg-barber-green px-5 text-center"
  >
    <p className="text-[10px] tracking-[0.24em] text-barber-gold uppercase">
      Est. 2018 — Stara Varoš
    </p>
    <p className="font-serif mt-2.5 text-[22px] leading-tight text-barber-bg">
      Barbershop
      <br />
      <span className="italic">Stari Grad</span>
    </p>
    <div
      aria-hidden="true"
      className="mt-3 h-1.5 w-20"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg,#16382b 0 7px,#f5efe4 7px 9px,#a4342c 9px 16px,#f5efe4 16px 18px)",
      }}
    />
  </div>,
];

export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section id="radovi" className="scroll-mt-4 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-2xl sm:text-3xl">{dict.work.title}</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right">
              {dict.work.sub}
            </p>
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-7 sm:mt-8 sm:grid-cols-3 sm:gap-7">
          {dict.work.items.map((item, i) => (
            <li key={item.name}>
              <Link href={item.href} className="group block">
                <div className="aspect-[3/2] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                  {POSTERS[i]}
                </div>
                <h3 className="headline mt-3 border-t border-line pt-2.5 text-lg transition-colors duration-300 group-hover:text-red">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{item.tag}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
