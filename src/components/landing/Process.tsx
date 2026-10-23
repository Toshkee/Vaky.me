import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { MobileFold } from "./MobileFold";
import { ProcessStage } from "./ProcessStage";
import { SectionHead } from "./SectionHead";

/**
 * The road from the first message to a live site, as one short list on the
 * ink band — the page's one dark section before the close.
 *
 * Four steps: when it happens, what it is, what goes on. A reader skims four
 * titles in a glance and a search engine sees all of it; on a phone the
 * paragraph under each title is one tap away (see MobileFold). From lg up the
 * same four steps play as a film beside the list, and the step on screen
 * lights in it (see ProcessStage).
 */
export function Process({ dict }: { dict: Dictionary }) {
  const { steps } = dict.process;

  return (
    <section className="on-ink bg-ink text-paper">
      <div className="shell py-20 sm:py-28">
        <SectionHead title={dict.process.title} sub={dict.process.sub} tone="ink" />

        <ProcessStage motion={dict.motion} handle={site.instagram}>
          <ol className="divide-y divide-ink-2 border-y border-ink-2">
            {steps.map((step, i) => (
              <li key={step.title} className="process-step py-6 sm:py-8">
                <MobileFold
                  label={step.title}
                  head={
                    <div className="grid grid-cols-[2.75rem_1fr] items-start gap-x-5 sm:grid-cols-[3rem_1fr] sm:gap-x-7">
                      <span
                        aria-hidden="true"
                        className="process-num tnum mt-0.5 flex size-11 items-center justify-center rounded-full text-lg font-semibold sm:size-12"
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold tracking-[0.12em] text-sun uppercase">{step.when}</p>
                        <h3 className="headline mt-2 text-2xl sm:text-3xl">{step.title}</h3>
                      </div>
                    </div>
                  }
                >
                  {/* Indented by the number column and its gap, so it sits
                      under the title. */}
                  <p className="mt-3 max-w-prose pl-16 leading-relaxed text-muted-dark sm:pl-[4.75rem] sm:text-lg">
                    {step.body}
                  </p>
                </MobileFold>
              </li>
            ))}
          </ol>
        </ProcessStage>
      </div>
    </section>
  );
}
