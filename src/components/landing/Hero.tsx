import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { OsBadge } from "@/components/ui/OsBadge";
import { CheckIcon, SparkleIcon } from "./icons";
import { Workstation } from "./Workstation";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="mx-auto grid max-w-5xl gap-12 px-5 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div>
          <OsBadge>{dict.hero.eyebrow}</OsBadge>

          <h1 className="headline mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)]">
            {dict.hero.titleA} <span className="text-red">{dict.hero.titleB}</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed">{dict.hero.sub}</p>
          <p className="mt-3 max-w-md leading-relaxed text-muted">{dict.hero.offer}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
            <Button href="#koncept" arrow>
              {dict.hero.ctaPrimary}
            </Button>
            <Button href="#radovi" variant="secondary">
              {dict.hero.ctaSecondary}
            </Button>
          </div>

          <ul className="mt-8 grid max-w-lg gap-2 border-t border-line pt-4 text-sm sm:grid-cols-3 sm:gap-4">
            {dict.hero.proof.map((item) => (
              <li key={item} className="flex gap-2 leading-snug text-muted">
                <CheckIcon className="mt-1 w-4 shrink-0 text-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The workstation on its dot-grid patch, with two loose
            decorations pinned to the patch corners. */}
        <div className="px-grid relative px-3 pt-8 pb-0 sm:px-6 sm:pt-10">
          <SparkleIcon className="absolute top-2 left-4 w-4 text-red" />
          <SparkleIcon className="absolute top-8 right-8 w-3 text-ink" />
          <Workstation />
        </div>
      </div>
    </section>
  );
}
