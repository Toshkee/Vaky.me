import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { ConceptRequest } from "./ConceptRequest";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow text-red">{dict.hero.eyebrow}</p>

          <h1 className="headline mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
            {dict.hero.titleA} <span className="text-red">{dict.hero.titleB}</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{dict.hero.sub}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={whatsappLink(dict.contact.prefill)} external>
              {dict.hero.ctaPrimary}
            </Button>
            <a href="#radovi" className="sweep tap font-semibold">
              {dict.hero.ctaSecondary} ↓
            </a>
          </div>
        </div>

        <ConceptRequest dict={dict} />
      </div>
    </section>
  );
}
