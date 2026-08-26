import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { BeforeAfter } from "./BeforeAfter";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow flex items-center gap-2.5 text-red">
            {/* the flag: red field, gold border */}
            <span
              aria-hidden="true"
              className="inline-block h-3 w-[18px] rounded-[2px] border border-gold bg-red"
            />
            {dict.hero.eyebrow}
          </p>

          <h1 className="headline mt-5 text-[clamp(2.6rem,6.6vw,4.6rem)]">
            {dict.hero.titleA}{" "}
            <span className="text-red">{dict.hero.titleB}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{dict.hero.sub}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={whatsappLink(dict.contact.prefill)} external>
              {dict.hero.ctaPrimary}
            </Button>
            <a href="#radovi" className="sweep tap font-semibold">
              {dict.hero.ctaSecondary} ↓
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {dict.hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-red">
                  —
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <BeforeAfter dict={dict} />
      </div>

      {/* section divider drawn as a mountain ridgeline — Crna Gora, quietly */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        className="block h-8 w-full sm:h-11"
        fill="none"
      >
        <path
          d="M0 43 L170 43 L310 16 L430 34 L560 6 L700 38 L860 12 L1010 36 L1150 20 L1290 40 L1440 43"
          stroke="var(--color-line)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* the highest peak gets the flag's gold */}
        <path
          d="M430 34 L560 6 L700 38"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
}
