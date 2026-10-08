import type { Dictionary } from "@/i18n";
import { CaseFacts } from "./ProjectCase";
import { PhoneBody } from "./PhoneFrame";

/**
 * A client app that is live but private, shown instead of linked: what it
 * replaced and what it does, beside three of its screens. It sits above the
 * live sites at full width — the sites come as a pair, and an app told in
 * three screens needs room that one phone in a half column does not have.
 *
 * Nothing here opens anything. The phones are pictures, not links, and the
 * note under the text says why, so nobody is left looking for the button.
 * Below sm the screens are a row that swipes; from sm up all three stand side
 * by side.
 */
export function AppCase({ dict }: { dict: Dictionary }) {
  const { app } = dict.work;

  return (
    <article className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-16">
      <div className="min-w-0">
        <p className="eyebrow text-red">
          {app.label}
          <span aria-hidden="true" className="text-muted"> · </span>
          <span className="text-muted">{app.tag}</span>
        </p>
        <h3 className="headline mt-2 text-2xl sm:text-3xl">{app.name}</h3>
        <CaseFacts facts={app} dict={dict} />
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{app.note}</p>
      </div>

      {/* Focusable because below sm it scrolls, and a row that scrolls has to
          be reachable without a pointer. */}
      <ul
        aria-label={app.screensLabel}
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
      >
        {app.screens.map((screen) => (
          <li key={screen.slug} className="w-38 shrink-0 snap-start sm:w-auto">
            <figure>
              <PhoneBody screenClassName="aspect-[360/779]">
                <picture>
                  <source type="image/avif" srcSet={`/work/${screen.slug}.avif`} />
                  <img
                    src={`/work/${screen.slug}.webp`}
                    alt={screen.alt}
                    width={720}
                    height={1558}
                    loading="lazy"
                    decoding="async"
                    className="phone-page"
                  />
                </picture>
              </PhoneBody>
              <figcaption className="eyebrow mt-3 text-center text-muted">{screen.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </article>
  );
}
