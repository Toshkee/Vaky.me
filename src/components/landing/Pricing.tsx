import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Pricing as a printed table: a heavy rule at the head, hairlines between the
 * rows, prices set in lining tabular figures so the euro amounts line up.
 * Each row is itself the WhatsApp link — no button repeated three times.
 */
export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="cijene" className="scroll-mt-4 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <h2 className="headline text-2xl sm:text-3xl">{dict.pricing.title}</h2>
          <p className="mt-3 max-w-xl text-muted">{dict.pricing.sub}</p>
        </Reveal>

        <div className="mt-7 border-t-2 border-ink">
          {dict.pricing.plans.map((plan) => (
            <a
              key={plan.name}
              href={whatsappLink(dict.contact.prefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid items-start gap-x-10 gap-y-3 border-b border-line py-6 transition-colors hover:bg-ink/[0.03] lg:grid-cols-[200px_minmax(0,1fr)_auto]"
            >
              <div className="lg:col-start-1 lg:row-start-1">
                <h3 className="headline flex flex-wrap items-center gap-x-3 gap-y-2 text-xl">
                  {plan.name}
                  {plan.badge && (
                    <span className="eyebrow inline-block bg-red px-2 py-0.5 text-white">
                      {plan.badge}
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{plan.tagline}</p>
              </div>

              <div className="lg:col-start-3 lg:row-start-1">
                <span className="headline tnum block text-3xl sm:text-4xl">{plan.price}</span>
              </div>

              <div className="lg:col-start-2 lg:row-start-1 lg:pt-1">
                <p className="max-w-lg text-sm leading-relaxed text-muted">
                  {plan.features.join(" · ")}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 space-y-1.5 text-sm leading-relaxed text-muted">
          <p>
            <span className="font-semibold text-ink">{dict.pricing.maintenance.title}</span>
            {", "}
            {dict.pricing.maintenance.body}
          </p>
          <p>
            {dict.pricing.addonsTitle}: {dict.pricing.addons.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
