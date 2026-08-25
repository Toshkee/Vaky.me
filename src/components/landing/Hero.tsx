import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { PaintedButton } from "@/components/brush/PaintedButton";
import { BeforeAfter } from "./BeforeAfter";

/**
 * Load choreography: headline lines rise out of masks (0.1s / 0.25s),
 * sub → CTAs → trust fade up behind them, the panel enters last and its
 * wipe sweep starts at 1.25s (timed in globals.css).
 */
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-28">
        <div>
          <h1 className="headline text-[clamp(2.6rem,10vw,6.8rem)]">
            <span className="mask-line">
              <span className="mask-rise" style={{ "--d": "0.1s" } as React.CSSProperties}>
                {dict.hero.titleA}
              </span>
            </span>
            <span className="mask-line">
              <span
                className="mask-rise text-red"
                style={{ "--d": "0.25s" } as React.CSSProperties}
              >
                {dict.hero.titleB}
              </span>
            </span>
          </h1>

          <p
            className="load-fade mt-7 max-w-md text-lg leading-relaxed text-muted"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            {dict.hero.sub}
          </p>

          <div
            className="load-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ "--d": "0.62s" } as React.CSSProperties}
          >
            <PaintedButton
              href={whatsappLink(dict.contact.prefill)}
              external
              className="text-lg"
            >
              {dict.hero.ctaPrimary}
            </PaintedButton>
            <a href="#radovi" className="sweep font-semibold text-white">
              {dict.hero.ctaSecondary} ↓
            </a>
          </div>

          <p
            className="load-fade mt-10 text-sm text-muted"
            style={{ "--d": "0.74s" } as React.CSSProperties}
          >
            {dict.hero.trust.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="mx-2.5 font-bold text-red-bright">/</span>}
                {t}
              </span>
            ))}
          </p>
        </div>

        <div className="load-fade" style={{ "--d": "0.9s" } as React.CSSProperties}>
          <BeforeAfter dict={dict} />
        </div>
      </div>
    </section>
  );
}
