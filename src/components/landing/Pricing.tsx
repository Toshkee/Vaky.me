import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { BrushCircle } from "@/components/brush/BrushCircle";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Pricing as a typographic table, not cards. The featured price gets a
 * hand-drawn red circle that draws itself as you scroll to it — the way a
 * good deal gets marked on a board.
 *
 * Mobile order is name → tagline → price → what's included → CTA, so a price
 * is never read before the thing it belongs to.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <h2 className="headline text-4xl sm:text-6xl">{dict.pricing.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{dict.pricing.sub}</p>
        </Reveal>

        <div className="mt-10 sm:mt-14">
          {dict.pricing.plans.map((plan) => {
            const featured = Boolean(plan.badge);
            return (
              <a
                key={plan.name}
                href={whatsappLink(dict.contact.prefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-start gap-x-10 gap-y-4 border-t border-line py-9 transition-colors last:border-b hover:bg-white/[0.025] sm:py-10 lg:grid-cols-[210px_minmax(0,1fr)_auto]"
              >
                <div className="lg:col-start-1 lg:row-start-1">
                  <h3 className="headline flex flex-wrap items-center gap-x-3 gap-y-2 text-3xl">
                    {plan.name}
                    {plan.badge && (
                      <span className="inline-block -rotate-3 bg-red px-2 py-0.5 text-[11px] font-bold tracking-wide text-white not-italic">
                        {plan.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
                </div>

                {/* w-fit keeps the brush circle hugging the price, not the column */}
                <div className="relative w-fit lg:col-start-3 lg:row-start-1">
                  <span className="headline block text-4xl sm:text-6xl">{plan.price}</span>
                  {featured && (
                    <BrushCircle className="brush-draw pointer-events-none absolute -inset-x-5 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2.5rem)] text-red" />
                  )}
                </div>

                <div className="lg:col-start-2 lg:row-start-1 lg:pt-1.5">
                  <p className="max-w-lg leading-relaxed text-muted">
                    {plan.features.join(" · ")}
                  </p>
                  <span className="sweep mt-3 inline-block text-sm font-semibold text-red-soft">
                    {dict.nav.cta} →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted">
          {dict.pricing.addonsTitle}: {dict.pricing.addons.join(" · ")}
        </p>
      </div>

      {/* the one solid red field on the page — recurring revenue deserves it */}
      <div className="bg-red">
        <div className="mx-auto max-w-6xl px-5 py-11 sm:px-8 sm:py-14">
          <p className="headline text-2xl text-white sm:text-4xl">
            {dict.pricing.maintenance.title}
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/90">
            {dict.pricing.maintenance.body}
          </p>
        </div>
      </div>
    </section>
  );
}
