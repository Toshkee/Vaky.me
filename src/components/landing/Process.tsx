"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Vaky, type VakyPose } from "@/components/mascot/Vaky";
import { PixelWindow } from "@/components/ui/PixelWindow";
import {
  ArrowIcon,
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
 * The whole road from the first message to a live site, as a stage select.
 *
 * One rail with eight numbered stations, and one window that shows the
 * station picked: when it happens, what it is, what goes on. Vaky stands
 * on the rail above the chosen station and walks there when it changes;
 * the window's icon plays one pixel beat as it turns. The reader steps
 * through with the stations themselves, the arrow keys, or the two buttons
 * under the text — nothing advances on its own, because the text is there
 * to be read.
 *
 * The stations are a tablist and the window is its panel, so a screen
 * reader gets "03 — Paket i cijena" on each stop and the same arrow keys
 * work everywhere on the page.
 */
const STATION_ART: { name: string; icon: ReactNode }[] = [
  { name: "bubble", icon: <BubbleIcon className="w-full" /> },
  { name: "sparkle", icon: <SparkleIcon className="w-full" /> },
  { name: "euro", icon: <EuroIcon className="w-full" /> },
  { name: "doc", icon: <DocIcon className="w-full" /> },
  { name: "folder", icon: <FolderIcon className="w-full" /> },
  { name: "hammer", icon: <HammerIcon className="w-full" /> },
  { name: "check", icon: <CheckIcon className="w-full" /> },
  { name: "rocket", icon: <RocketIcon className="w-full" /> },
];

/** What Vaky does once he has arrived at a station: at the desk while the
 *  brief and the site are being made, a jump on launch day, otherwise
 *  looking about while he waits on the reader. */
const STATION_POSE: VakyPose[] = ["look", "look", "look", "look", "work", "work", "look", "jump"];

/** The walk between stations — the same figure as the `.stage-vaky`
 *  transition, so his stride stops when he does. */
const WALK_MS = 900;

export function Process({ dict }: { dict: Dictionary }) {
  const { steps } = dict.process;
  const total = steps.length;
  const [index, setIndex] = useState(0);
  const [walking, setWalking] = useState(false);
  const stations = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const step = steps[index];
  const stationId = (i: number) => `${baseId}-station-${i}`;
  const panelId = `${baseId}-panel`;
  const pad = (n: number) => String(n).padStart(2, "0");

  const go = (to: number, focus = false) => {
    const next = Math.min(total - 1, Math.max(0, to));
    if (next === index) return;
    setIndex(next);
    setWalking(true);
    if (focus) stations.current[next]?.focus();
  };

  /* He walks for as long as the margin transition carries him, then takes
     up the station's pose. */
  useEffect(() => {
    if (!walking) return;
    const arrive = setTimeout(() => setWalking(false), WALK_MS);
    return () => clearTimeout(arrive);
  }, [walking, index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const to = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: total - 1,
    }[event.key];
    if (to === undefined) return;
    event.preventDefault();
    go(to, true);
  };

  return (
    <section className="px-rule">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<FlagIcon />} title={dict.process.title} />
        <p className="mt-3 max-w-lg text-muted">{dict.process.sub}</p>

        <div className="mt-10 max-w-3xl sm:mt-12">
          {/* The rail. Vaky's track is the ground line; the stations hang
              under it, spread edge to edge with the padding that puts each
              one's centre under his. */}
          <div
            className="vaky-track"
            style={{ "--stage-progress": total > 1 ? index / (total - 1) : 0 } as React.CSSProperties}
          >
            <Vaky
              direction="right"
              pose={walking ? "walk" : STATION_POSE[index]}
              scale={0.5}
              className="stage-vaky"
            />
          </div>

          <div
            role="tablist"
            aria-label={dict.process.title}
            onKeyDown={onKeyDown}
            className="flex justify-between px-[7px] pt-2 sm:px-[10px]"
          >
            {steps.map((entry, i) => {
              const selected = i === index;
              return (
                <button
                  key={entry.title}
                  ref={(node) => {
                    stations.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={stationId(i)}
                  aria-selected={selected}
                  aria-controls={panelId}
                  aria-label={`${pad(i + 1)} — ${entry.title}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  className={`px relative flex h-9 w-9 items-center justify-center border-2 bg-paper text-[1.25rem] leading-none transition-colors sm:h-11 sm:w-11 ${
                    selected ? "border-red text-red" : "border-ink text-ink hover:text-red"
                  }`}
                >
                  {/* the station's own tick up to the rail, so the row of
                      chips reads as stops on the line rather than a row of
                      keys */}
                  <span
                    aria-hidden="true"
                    className={`absolute -top-2.5 left-1/2 h-2 w-0.5 -translate-x-1/2 ${
                      selected ? "bg-red" : "bg-ink"
                    }`}
                  />
                  {pad(i + 1)}
                </button>
              );
            })}
          </div>

          {/* The window: one station at a time. */}
          <PixelWindow
            title={dict.process.counter
              .replace("{n}", String(index + 1))
              .replace("{total}", String(total))}
            className="mt-8 sm:mt-10"
          >
            <div
              role="tabpanel"
              id={panelId}
              aria-labelledby={stationId(index)}
              className="grid gap-6 p-5 sm:min-h-[20rem] sm:grid-cols-[1fr_auto] sm:gap-10 sm:p-7"
            >
              <div>
                <p className="px text-[1.25rem] leading-none text-red uppercase">{step.when}</p>
                <h3 className="headline mt-3 text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-4 max-w-prose leading-relaxed text-muted">{step.body}</p>

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    disabled={index === 0}
                    aria-label={dict.process.prev}
                    className="px px-btn inline-flex h-11 w-11 items-center justify-center bg-paper text-ink disabled:opacity-35"
                  >
                    <ArrowIcon className="w-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    disabled={index === total - 1}
                    aria-label={dict.process.next}
                    className="px px-btn inline-flex h-11 w-11 items-center justify-center bg-paper text-ink disabled:opacity-35"
                  >
                    <ArrowIcon className="w-4" />
                  </button>
                </div>
              </div>

              {/* The station's icon, large, on its dot-grid patch. Keyed so
                  the beat plays again on every turn of the window. */}
              <div
                key={index}
                aria-hidden="true"
                data-art={STATION_ART[index].name}
                className="stage-art px-grid hidden h-40 w-40 items-center justify-center border-2 border-ink text-ink sm:flex"
              >
                <span className="block w-[72px]">{STATION_ART[index].icon}</span>
              </div>
            </div>
          </PixelWindow>
        </div>
      </div>
    </section>
  );
}
