import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Vaky } from "@/components/mascot/Vaky";
import {
  BubbleIcon,
  CheckIcon,
  DocIcon,
  EuroIcon,
  FlagIcon,
  FolderIcon,
  HammerIcon,
  RocketIcon,
  SparkleIcon,
} from "./icons";
import { SectionHead } from "./SectionHead";

/**
 * The whole road from the first message to a live site, as one route down
 * the page: eight stations on a dashed line, each with the moment it
 * happens set in the margin — a day where it is a day, otherwise the name
 * of the thing ("Dogovor", "Pregled"). On a phone the moment sits above the
 * title; from lg up it moves out into a left gutter, so the column of
 * titles reads as one list and the timing as the notes beside it.
 *
 * Underneath, Vaky walks the route himself — out to launch day and back.
 * He is decorative and hidden from screen readers: the list is the content.
 */
const STEP_ICONS: ReactNode[] = [
  <BubbleIcon key="reach" className="w-6" />,
  <SparkleIcon key="concept" className="w-6" />,
  <EuroIcon key="price" className="w-6" />,
  <DocIcon key="brief" className="w-6" />,
  <FolderIcon key="build-brief" className="w-6" />,
  <HammerIcon key="build" className="w-6" />,
  <CheckIcon key="review" className="w-6" />,
  <RocketIcon key="live" className="w-6" />,
];

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-rule">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<FlagIcon />} title={dict.process.title} />
        <p className="mt-3 max-w-lg text-muted">{dict.process.sub}</p>

        <ol className="relative mt-8 max-w-3xl sm:mt-10">
          {/* the route, running down behind the station chips. Its offset is
              the chip's centre: half of 44px, plus the gutter from lg up. */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[22px] border-l-2 border-dashed border-line lg:left-[calc(8rem+22px)]"
          />

          {dict.process.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[auto_1fr] gap-x-4 pb-9 last:pb-0 lg:grid-cols-[7rem_auto_1fr] lg:gap-x-4 lg:pb-10"
            >
              <div
                aria-hidden="true"
                className="row-span-3 flex h-11 w-11 items-center justify-center border-2 border-ink bg-paper text-ink"
              >
                {STEP_ICONS[i]}
              </div>
              <p className="px pt-0.5 text-[1.15rem] leading-none text-red uppercase lg:order-first lg:row-span-3 lg:pt-3.5 lg:pr-1 lg:text-right">
                {step.when}
              </p>
              <h3 className="mt-1 font-semibold lg:mt-2.5">{step.title}</h3>
              <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        {/* The route, walked — out to launch day and back again. */}
        <div className="vaky-track mt-8 sm:mt-10">
          <Vaky direction="right" pose="patrol" scale={0.5} lap={16} />
        </div>
      </div>
    </section>
  );
}
