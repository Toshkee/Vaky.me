"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { VakyPlay } from "@/components/mascot/VakyPlay";
import type { SiteBuildCopy } from "@/components/motion/SiteBuild";
import { CheckIcon, MugIcon } from "./icons";

const loadScreen = () => import("@/components/motion/SiteBuildPlayer");
const SiteBuildPlayer = dynamic(loadScreen, { ssr: false });

/**
 * The hero scene: Vaky beside his monitor, building a site.
 *
 * It waits until it is actually on screen, then runs the checks one at a time
 * while Vaky works — and stops one short. The last line, ONLINE, is the
 * visitor's to trigger: the screen offers a DEPLOY button and waits there for
 * as long as it takes. Clicking it sweeps the bar, lights ONLINE and puts
 * SITE LIVE on screen, and Vaky jumps.
 *
 * The sequence is state rather than CSS keyframes because it is genuinely a
 * state machine now — it pauses on an input. Only the transitions between
 * those states are CSS, which is what makes them free to drop under
 * reduced-motion: there the checks are simply already done when the scene is
 * reached, and the click resolves instantly.
 *
 * The monitor shows the site itself being made: a Remotion composition
 * (components/motion/SiteBuild) that the phases play a stretch at a time, so
 * the page on screen and the status lights below it always agree. Its code
 * is fetched when the desk comes into view, and the build waits for it — up
 * to a moment, never for good — so the first block and the first light land
 * together.
 *
 * Status strings stay in terminal English on both locales on purpose — they
 * are the machine talking, not the studio.
 */
const STATUSES = ["DESIGN", "MOBILE", "SEO", "ONLINE"];

/** How many statuses the build does on its own. The last one waits for DEPLOY. */
const BUILT = STATUSES.length - 1;

export type Phase = "idle" | "building" | "ready" | "deploying" | "online";

const SCREEN: Record<Phase, string> = {
  idle: "STANDBY",
  building: "BUILDING WEBSITE",
  ready: "READY TO DEPLOY",
  deploying: "DEPLOYING",
  online: "SITE LIVE",
};

const quiet = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The longest the build waits for the screen's code before starting without it. */
const SCREEN_WAIT = 1500;

export function Workstation({ screen }: { screen: SiteBuildCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const after = (ms: number, run: () => void) => {
    timers.current.push(setTimeout(run, ms));
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let gone = false;

    // The build starts when the desk is actually on screen, and only ever
    // once — so the visitor sees it happen rather than arriving after it did.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setSeen(true);

        if (quiet()) {
          setLit(BUILT);
          setPhase("ready");
          return;
        }

        const waited = new Promise((resolve) => after(SCREEN_WAIT, () => resolve(null)));
        Promise.race([loadScreen(), waited])
          .catch(() => {})
          .then(() => {
            if (gone) return;
            setPhase("building");
            for (let i = 1; i <= BUILT; i++) after(i * 620, () => setLit(i));
            after(BUILT * 620 + 500, () => setPhase("ready"));
          });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);

    const running = timers.current;
    return () => {
      gone = true;
      observer.disconnect();
      running.forEach(clearTimeout);
    };
  }, []);

  function deploy() {
    if (phase !== "ready") return;
    if (quiet()) {
      setLit(STATUSES.length);
      setPhase("online");
      return;
    }
    setPhase("deploying");
    after(900, () => {
      setLit(STATUSES.length);
      setPhase("online");
    });
  }

  const deployed = phase === "deploying" || phase === "online";
  const progress = deployed ? 100 : (lit / STATUSES.length) * 100;

  /* Vaky's shift: he watches the desk while the build runs, glances around
     while the machine waits on the visitor, and jumps when the site goes up. */
  const vaky =
    phase === "online"
      ? ({ direction: "front", pose: "jump" } as const)
      : phase === "ready"
        ? ({ direction: "front", pose: "look" } as const)
        : phase === "idle"
          ? ({ direction: "left", pose: "stand" } as const)
          : ({ direction: "left", pose: "work" } as const);

  return (
    <div ref={ref} className="os-anim">
      <div className="vaky-track flex items-end justify-center gap-3 border-b-2 sm:gap-6">
        {/* monitor, stand and desk — one column that ends on the ground line */}
        <div className="w-full max-w-[350px] min-w-0">
          <PixelWindow title="VAKY OS">
            <div className="p-4 sm:p-5">
              <p aria-hidden="true" className="px text-[1.125rem] leading-none">
                {SCREEN[phase]}
                {phase === "online" ? (
                  <CheckIcon className="ml-2 inline-block w-4 align-[-2px] text-ok" />
                ) : (
                  <span className="os-caret">_</span>
                )}
              </p>

              <div aria-hidden="true" className="os-bar mt-3">
                <div className="os-bar-fill" style={{ width: `${progress}%` }} />
              </div>

              {/* The screen is sized before its code arrives, and shows the
                  dot grid until then, so nothing shifts when it does. */}
              <div aria-hidden="true" className="px-grid mt-4 aspect-[612/384] border-2 border-ink bg-paper">
                {seen && <SiteBuildPlayer phase={phase} copy={screen} />}
              </div>

              <ul aria-hidden="true" className="mt-4 grid gap-2.5">
                {STATUSES.map((name, i) => (
                  <li key={name} className="flex items-center gap-2.5">
                    <span className={`os-led shrink-0 ${i < lit ? "" : "os-led--off"}`} />
                    <span className="px text-[1rem] leading-none">{name}</span>
                    <span className="px-dashrule min-w-4 flex-1 opacity-60" />
                    <span
                      className={`px text-[1rem] leading-none text-ok ${
                        i < lit ? "" : "invisible"
                      }`}
                    >
                      OK
                    </span>
                  </li>
                ))}
              </ul>

              {/* The row is always here so the window never changes height —
                  it just happens to hold a button for one phase of the run. */}
              <div className="mt-4 flex min-h-11 items-center justify-center">
                {phase === "ready" && (
                  <button
                    type="button"
                    onClick={deploy}
                    className="px px-btn px-btn--primary os-deploy inline-flex min-h-11 items-center bg-red px-6 text-[1.0625rem] text-white hover:bg-red-deep"
                  >
                    DEPLOY
                  </button>
                )}
              </div>
            </div>
          </PixelWindow>

          {/* stand */}
          <div aria-hidden="true">
            <div className="mx-auto h-3 w-10 bg-ink" />
            <div className="mx-auto h-1.5 w-24 bg-ink" />

            {/* desk: top, mug on it, two legs down to the ground line */}
            <div className="relative">
              <MugIcon className="absolute right-8 -top-6 w-6 text-ink" />
              <div className="h-2.5 bg-ink" />
              <div className="flex justify-between px-2">
                <div className="h-6 w-2.5 bg-ink" />
                <div className="h-6 w-2.5 bg-ink" />
              </div>
            </div>
          </div>
        </div>

        {/* Vaky on the ground beside the desk, near desk height like the
            colleague he is. Clickable — the easter egg. Two sizes because the
            scene shares a row with him: on a phone he steps back a little so
            the monitor keeps its screen width. */}
        <VakyPlay {...vaky} jumps={2} scale={0.44} className="shrink-0 sm:hidden" />
        <VakyPlay {...vaky} jumps={2} scale={0.58} className="hidden shrink-0 sm:block" />
      </div>
    </div>
  );
}
