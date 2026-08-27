import type { Dictionary } from "@/i18n";
import { instagramDmLink } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "./icons";
import { ConceptRequest } from "./ConceptRequest";
import { Tony } from "@/components/mascot/Tony";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow text-red">{dict.hero.eyebrow}</p>

          <h1 className="headline mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
            {dict.hero.titleA} <span className="text-red">{dict.hero.titleB}</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{dict.hero.sub}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={instagramDmLink()} external>
              {dict.hero.ctaPrimary}
            </Button>
            <a href="#radovi" className="sweep tap font-semibold">
              {dict.hero.ctaSecondary} ↓
            </a>
          </div>

          <ul className="mt-7 grid max-w-lg gap-2 border-t border-line pt-4 text-sm sm:grid-cols-3 sm:gap-4">
            {dict.hero.proof.map((item) => (
              <li key={item} className="flex gap-2 leading-snug text-muted">
                <CheckIcon className="mt-1 w-4 shrink-0 text-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The window is the page's one piece of physical depth, so it is the
            one thing on the page he can plausibly stand on. He perches on its
            top edge rather than inside it, because the pane clips its own
            corners and would cut him in half.

            Only from lg up. Below that the grid stacks and the window's top
            edge is no longer empty space — it is the underside of the hero's
            proof list, and he lands on the copy. */}
        <div className="relative">
          <Tony
            pose="hop"
            scale={0.34}
            className="tony-perch right-8 hidden lg:block"
          />
          <ConceptRequest dict={dict} />
        </div>
      </div>
    </section>
  );
}
