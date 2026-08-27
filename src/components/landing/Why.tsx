import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Tony } from "@/components/mascot/Tony";
import { DocIcon, EuroIcon, LockOpenIcon, SparkleIcon, HammerIcon } from "./icons";
import { SectionHead } from "./SectionHead";

/**
 * The four reasons, each with its own little scene instead of a generic icon:
 * Tony with the concept document, Tony with the price, Tony with the wrench —
 * and for "no lock-in", just the open padlock, because that point is about
 * the owner, not about us. The scenes are stills and say nothing the copy
 * below them does not, so each one is hidden from assistive tech.
 */
const SCENES: ReactNode[] = [
  // He is literally holding the concept in the idle frame.
  <>
    <Tony direction="right" pose="idle" scale={0.3} />
    <DocIcon className="w-10 text-ink" />
  </>,
  <>
    <EuroIcon className="w-10 text-ink" />
    <Tony direction="left" pose="stand" scale={0.3} />
  </>,
  <>
    <Tony direction="right" pose="stand" scale={0.3} />
    <HammerIcon className="w-10 text-ink" />
  </>,
  <LockOpenIcon key="lock" className="w-12 text-ink" />,
];

export function Why({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-rule">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHead icon={<SparkleIcon />} title={dict.why.title} />
        <p className="mt-3 max-w-lg text-muted">{dict.why.sub}</p>

        <ul className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {dict.why.items.map((item, i) => (
            <li key={item.title} className="px-card flex flex-col">
              <div
                aria-hidden="true"
                className="px-grid tony-ground flex h-24 items-end justify-center gap-3 border-b-2 border-ink pb-0"
              >
                {SCENES[i]}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

