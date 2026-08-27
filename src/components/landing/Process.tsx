import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Tony } from "@/components/mascot/Tony";
import { BubbleIcon, DocIcon, FlagIcon, RocketIcon, HammerIcon } from "./icons";
import { SectionHead } from "./SectionHead";

/**
 * From the first message to a live site, as a journey: message, concept,
 * build, launch. From lg up the four stations sit on one horizontal dashed
 * line; below that the line turns and runs down the left edge so the steps
 * read top to bottom instead of being crushed into columns.
 *
 * Underneath, Tony walks the route himself — out to launch day and back.
 * He is decorative and hidden from screen readers: the list is the content.
 */
const STEP_ICONS: ReactNode[] = [
  <BubbleIcon key="b" className="w-6" />,
  <DocIcon key="d" className="w-6" />,
  <HammerIcon key="w" className="w-6" />,
  <RocketIcon key="r" className="w-6" />,
];

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-rule">
      <div className="shell py-12 sm:py-14">
        <SectionHead icon={<FlagIcon />} title={dict.process.title} />

        <ol className="relative mt-7 grid gap-7 sm:mt-8 lg:grid-cols-4 lg:gap-8">
          {/* the route: down the left edge on small screens, across the top
              from lg up. The station chips cover it where they sit. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[22px] border-l-2 border-dashed border-line lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute top-[22px] right-6 left-6 hidden border-t-2 border-dashed border-line lg:block"
          />

          {dict.process.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 lg:block"
            >
              <div
                aria-hidden="true"
                className="row-span-3 flex h-11 w-11 items-center justify-center border-2 border-ink bg-paper text-ink"
              >
                {STEP_ICONS[i]}
              </div>
              <p className="px pt-0.5 text-[1.15rem] leading-none text-red uppercase lg:mt-4">
                {step.day}
              </p>
              <h3 className="mt-1 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        {/* The route, walked — out to launch day and back again. */}
        <div className="tony-track mt-6 sm:mt-8">
          <Tony direction="right" pose="patrol" scale={0.5} lap={16} />
        </div>
      </div>
    </section>
  );
}

