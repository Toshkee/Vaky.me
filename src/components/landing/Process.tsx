import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { PixelWindow } from "@/components/ui/PixelWindow";
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
 * The whole road from the first message to a live site, as one list.
 *
 * It used to be a stage select — eight stations, one shown at a time — and
 * nobody pressed "next" seven times. Now every step is on the page: number,
 * when it happens, what it is, what goes on. A reader skims the eight
 * titles in a glance and reads the one line they care about; nothing has to
 * be clicked, nothing animates, and a search engine sees all of it.
 */
const STEP_ICONS: ReactNode[] = [
  <BubbleIcon key="bubble" className="w-full" />,
  <SparkleIcon key="sparkle" className="w-full" />,
  <EuroIcon key="euro" className="w-full" />,
  <DocIcon key="doc" className="w-full" />,
  <FolderIcon key="folder" className="w-full" />,
  <HammerIcon key="hammer" className="w-full" />,
  <CheckIcon key="check" className="w-full" />,
  <RocketIcon key="rocket" className="w-full" />,
];

export function Process({ dict }: { dict: Dictionary }) {
  const { steps } = dict.process;

  return (
    <section className="px-rule">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<FlagIcon />} title={dict.process.title} />
        <p className="mt-3 max-w-lg text-muted">{dict.process.sub}</p>

        <PixelWindow title={dict.process.windowTitle} className="mt-8 max-w-3xl sm:mt-10">
          <ol className="divide-y divide-line">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-x-4 px-5 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-x-6 sm:px-7"
              >
                {/* The step's own pixel icon on a tile: a message, a spark,
                    a euro, a form, a folder, a hammer, a tick, a rocket. The
                    list is ordered already; a number on top would say the
                    same thing twice. */}
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center border-2 border-ink bg-paper text-ink sm:h-14 sm:w-14"
                >
                  <span className="block w-6 sm:w-7">{STEP_ICONS[i]}</span>
                </span>
                <div className="min-w-0">
                  <p className="px text-[0.9375rem] leading-none text-red uppercase">{step.when}</p>
                  <h3 className="headline mt-2 text-xl sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </PixelWindow>
      </div>
    </section>
  );
}
