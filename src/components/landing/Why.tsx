import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Vaky } from "@/components/mascot/Vaky";
import {
  BubbleIcon,
  CheckIcon,
  CursorIcon,
  DocIcon,
  EuroIcon,
  FolderIcon,
  HammerIcon,
  RocketIcon,
  SparkleIcon,
} from "./icons";
import { Scene } from "./Scene";
import { SectionHead } from "./SectionHead";

/**
 * The four reasons, each with its own little scene rather than a generic icon,
 * and each one a short storyboard that plays once when the card reaches the
 * viewport: a concept drawing itself on screen, a quote adding up, the jobs
 * getting ticked off, a question answered in the DMs. Vaky is in all four
 * doing something different, which is the point — four cards, four jobs.
 *
 * The storyboards live in globals.css; a scene's whole job here is to lay out
 * the parts and name them. Every one of them illustrates the copy underneath
 * and says nothing it does not, so `Scene` hides them from assistive tech.
 */
const SCENES: ReactNode[] = [
  /* You see the concept first — the screen wakes up and a layout draws
     itself in while Vaky works. */
  <>
    <span className="sc-monitor">
      <span className="sc-screen">
        <span className="sc-block" />
        <span className="sc-row sc-row--a" />
        <span className="sc-row sc-row--b" />
      </span>
      <CursorIcon className="sc-cursor" />
      <span className="sc-neck" />
      <span className="sc-foot" />
    </span>
    <Vaky direction="left" pose="work" scale={0.3} className="[--vaky-beat:1.6s]" />
  </>,

  /* Clear scope and price — the euro stamps down, the line items come in one
     at a time and the total rules off underneath. */
  <>
    <Vaky direction="right" pose="work" scale={0.3} className="[--vaky-beat:2.1s]" />
    <span className="sc-slip">
      <EuroIcon className="sc-euro" />
      <span className="sc-item sc-item--a" />
      <span className="sc-item sc-item--b" />
      <span className="sc-item sc-item--c" />
      <span className="sc-total" />
    </span>
  </>,

  /* Everything handled — content, files and launch, each ticked off in turn
     while Vaky works through them. */
  <>
    <span className="sc-tasks">
      <span className="sc-task">
        <DocIcon className="sc-task-art" />
        <CheckIcon className="sc-tick sc-tick--a" />
      </span>
      <span className="sc-task">
        <FolderIcon className="sc-task-art" />
        <CheckIcon className="sc-tick sc-tick--b" />
      </span>
      <span className="sc-task">
        <RocketIcon className="sc-task-art" />
        <CheckIcon className="sc-tick sc-tick--c" />
      </span>
    </span>
    <HammerIcon className="sc-hammer" />
    <Vaky direction="left" pose="work" scale={0.3} className="[--vaky-beat:1.8s]" />
  </>,

  /* Direct communication — a question comes in, the answer goes straight
     back. Two bubbles like a DM thread: the mirrored ink one is the client's,
     the red reply is Vaky's, right next to him. */
  <>
    <Vaky direction="right" pose="work" scale={0.3} className="[--vaky-beat:2.4s]" />
    <span className="sc-chat">
      <BubbleIcon className="sc-chat-a" />
      <BubbleIcon className="sc-chat-b" />
    </span>
  </>,
];

export function Why({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-rule">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<SparkleIcon />} title={dict.why.title} />
        <p className="mt-3 max-w-lg text-muted">{dict.why.sub}</p>

        <ul className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {dict.why.items.map((item, i) => (
            <li key={item.title} className="px-card flex flex-col">
              <Scene className="px-grid vaky-ground flex h-24 items-end justify-center gap-3 border-b-2 border-ink">
                {SCENES[i]}
              </Scene>
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
