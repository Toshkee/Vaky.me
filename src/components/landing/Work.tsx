import Link from "next/link";
import Image from "next/image";
import { Anton } from "next/font/google";
import type { Dictionary } from "@/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { ArrowIcon } from "./icons";

/* The Titan demo is set in Anton — its poster uses the real thing, so the
   portfolio previews the demo's actual typography, not an approximation. */
const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * Clickable demo sites shown as a plate of distinct specimens. Each
 * poster is set in that demo's own palette and typography — the row should
 * read as different studios' work, because each demo is a different design.
 * The dark grounds remain distinct in hue, so the collection has
 * rhythm against the paper and no panel disappears into the page.
 *
 * The posters render at ~350px wide on every viewport (full width on mobile,
 * one quarter of the measure on wide screens), so they need one type scale.
 *
 * Each sits in a PixelWindow, so the row reads as four framed screens on a
 * desk — the frames are ours, the art inside each one is the client's.
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

  // Barber Drina — current monochrome lockup from the business profile
  <div
    key="drina"
    className="relative flex h-full items-center justify-center overflow-hidden bg-black"
  >
    <Image
      src="/barber-drina-logo.jpg"
      alt=""
      width={400}
      height={400}
      className="h-full w-full object-cover"
    />
  </div>,
];

export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section id="radovi" className="scroll-mt-28 border-t border-line md:scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-2xl sm:text-3xl">{dict.work.title}</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right">
              {dict.work.sub}
            </p>
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-7 sm:mt-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
          {dict.work.items.map((item, i) => (
            <li key={item.name}>
              <Link href={item.href} className="group block">
                <PixelWindow
                  pane=""
                  className="transition-transform duration-100 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:translate-y-1 motion-reduce:transition-none"
                >
                  <div className="aspect-[3/2] overflow-hidden">{POSTERS[i]}</div>
                </PixelWindow>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-2.5">
                  <h3 className="headline text-lg transition-colors duration-300 group-hover:text-red">
                    {item.name}
                  </h3>
                  <ArrowIcon className="w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <p className="mt-0.5 text-sm text-muted">{item.tag}</p>
                <p className="eyebrow mt-2 text-red">{dict.work.conceptLabel}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
