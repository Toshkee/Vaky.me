import type { Dictionary } from "@/i18n";
import { BendLine, BendLines } from "./BendLines";
import { PlusIcon } from "./icons";
import { SceneLabel } from "./SectionHead";

/**
 * Native <details> rows: keyboard, screen readers and find-in-page work
 * without a line of script. The title stays put beside the list from lg up,
 * so a long open answer never leaves the reader without a heading. The
 * dividers between the questions lean toward a mouse passing over them.
 */
export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SceneLabel name={dict.film.scenes.faq} />
          <h2 className="display mt-4 text-poster-lg">{dict.faq.title}</h2>
        </div>

        <BendLines className="border-t border-line-strong">
          {dict.faq.items.map((item) => (
            <div key={item.q} className="relative">
              <details className="faq-item">
                <summary className="flex items-center gap-5 py-5 text-base font-semibold sm:text-lg">
                  <span className="flex-1">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="faq-toggle flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink"
                  >
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pr-14 pb-7 leading-relaxed text-muted">{item.a}</p>
              </details>
              <BendLine />
            </div>
          ))}
        </BendLines>
      </div>
    </section>
  );
}
