import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Pricing as a typographic table, not cards. The featured plan is marked by
 * its red badge alone — no decoration over the numbers.
 *
 * Mobile order is name → tagline → price → what's included → CTA, so a price
 * is never read before the thing it belongs to.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="headline text-3xl sm:text-5xl">{dict.pricing.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{dict.pricing.sub}</p>
        </Reveal>

        <div className="mt-8 sm:mt-12">
          {dict.pricing.plans.map((plan) => {
            return (
              <a
                key={plan.name}
                href={whatsappLink(dict.contact.prefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-start gap-x-10 gap-y-4 border-t border-line py-8 transition-colors last:border-b hover:bg-ink/[0.025] sm:py-9 lg:grid-cols-[220px_minmax(0,1fr)_auto]"
              >
                <div className="lg:col-start-1 lg:row-start-1">
                  <h3 className="headline flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl">
                    {plan.name}
                    {plan.badge && (
                      <span className="eyebrow inline-block bg-red px-2 py-1 text-white">
                        {plan.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
                </div>

                <div className="lg:col-start-3 lg:row-start-1">
                  <span className="headline block text-3xl sm:text-5xl">{plan.price}</span>
                </div>

                <div className="lg:col-start-2 lg:row-start-1 lg:pt-1">
                  <p className="max-w-lg leading-relaxed text-muted">
                    {plan.features.join(" · ")}
                  </p>
                  <span className="sweep mt-3 inline-block text-sm font-semibold text-red">
                    {dict.nav.cta} →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <p className="mt-7 text-sm leading-relaxed text-muted">
          {dict.pricing.addonsTitle}: {dict.pricing.addons.join(" · ")}
        </p>
      </div>

      {/* the one solid red field on the page — recurring revenue deserves it */}
      <div className="bg-red">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <p className="headline text-2xl text-white sm:text-3xl">
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
