import { PixelWindow } from "@/components/ui/PixelWindow";
import { TonyPlay } from "@/components/mascot/TonyPlay";
import { CheckIcon, MugIcon } from "./icons";

/**
 * The hero scene: Tony beside his monitor, watching a site get built.
 *
 * The screen plays the build once — statuses flip to OK one at a time, the
 * bar fills in chunks, BUILDING swaps to DEPLOYED — and then rests, because
 * the animation states in globals.css default to the finished picture and
 * only replay history when motion is allowed. The whole scene is decoration:
 * everything it says is said for real in the hero copy, so it is hidden from
 * assistive tech wholesale.
 *
 * Status strings stay in terminal English on both locales on purpose — they
 * are the machine talking, not the studio.
 */
const STATUSES = ["DESIGN", "MOBILE", "SEO", "ONLINE"];

export function Workstation() {
  return (
    <div aria-hidden="true" className="os-anim">
      <div className="tony-track flex items-end justify-center gap-3 border-b-2 sm:gap-6">
        {/* monitor, stand and desk — one column that ends on the ground line */}
        <div className="w-full max-w-[350px] min-w-0">
          <PixelWindow title="VIBELAB OS">
            <div className="p-4 sm:p-5">
              <p className="os-swap px text-[1.3rem] leading-none">
                <span className="os-build">
                  BUILDING WEBSITE<span className="os-caret">_</span>
                </span>
                <span className="os-done inline-flex items-center gap-2">
                  DEPLOYED
                  <CheckIcon className="w-4 text-ok" />
                </span>
              </p>

              <div className="os-bar mt-3">
                <div className="os-bar-fill" />
              </div>

              {/* Row order matters: the nth-child rules in globals.css give
                  each row its firing moment on the build timeline. */}
              <ul className="mt-4 grid gap-2.5">
                {STATUSES.map((name) => (
                  <li key={name} className="flex items-center gap-2.5">
                    <span className="os-led shrink-0" />
                    <span className="px text-[1.2rem] leading-none">{name}</span>
                    <span className="px-dashrule min-w-4 flex-1 opacity-60" />
                    <span className="os-ok px text-[1.2rem] leading-none text-ok">
                      OK
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </PixelWindow>

          {/* stand */}
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

        {/* Tony on the ground beside the desk, near desk height like the
            colleague he is. Clickable — the easter egg. Two sizes because the
            scene shares a row with him: on a phone he steps back a little so
            the monitor keeps its screen width. */}
        <TonyPlay
          direction="front"
          pose="idle"
          scale={0.44}
          className="shrink-0 sm:hidden"
        />
        <TonyPlay
          direction="front"
          pose="idle"
          scale={0.58}
          className="hidden shrink-0 sm:block"
        />
      </div>
    </div>
  );
}
