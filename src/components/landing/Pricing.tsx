import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { BrushCircle } from "@/components/brush/BrushCircle";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Pricing as a typographic table, not cards. The featured price gets a
 * hand-drawn red circle that draws itself as you scroll to it — the way a
 * good deal gets marked on a board.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="headline text-5xl sm:text-6xl">{dict.pricing.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{dict.pricing.sub}</p>
        </Reveal>

        <div className="mt-14">
          {dict.pricing.plans.map((plan) => {
            const featured = Boolean(plan.badge);
            return (
              <a
                key={plan.name}
                href={whatsappLink(dict.contact.prefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-start gap-x-10 gap-y-4 border-t border-line py-10 transition-colors last:border-b hover:bg-white/[0.025] sm:grid-cols-[1fr_auto] lg:grid-cols-[220px_1fr_auto]"
              >
                <div>
                  <h3 className="headline flex items-center gap-3 text-3xl">
                    {plan.name}
                    {plan.badge && (
                      <span className="inline-block -rotate-3 bg-red px-2 py-0.5 text-[11px] font-bold tracking-wide text-white not-italic">
                        {plan.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
                </div>

                <div className="lg:pt-1.5">
                  <p className="max-w-lg leading-relaxed text-muted">
                    {plan.features.join(" · ")}
                  </p>
                  <span className="sweep mt-3 inline-block text-sm font-semibold text-red-soft">
                    {dict.nav.cta} →
                  </span>
                </div>

                <div className="relative row-start-1 sm:col-start-2 sm:row-start-auto lg:col-start-3">
                  <span className="headline block text-5xl sm:text-6xl">
                    {plan.price}
                  </span>
                  {featured && (
                    <BrushCircle className="brush-draw pointer-events-none absolute -inset-x-6 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)] text-red" />
                  )}
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-muted">
          {dict.pricing.addonsTitle}: {dict.pricing.addons.join(" · ")}
        </p>
      </div>

      {/* the one solid red field on the page — recurring revenue deserves it */}
      <div className="bg-red">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
          <p className="headline text-3xl text-white sm:text-4xl">
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
