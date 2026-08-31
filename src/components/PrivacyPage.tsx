import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { hasAnalytics, hasCloudflareAnalytics, hasTurnstile } from "@/config/services";
import { site } from "@/config/site";
import { Footer } from "@/components/landing/Footer";
import { BrandWordmark } from "@/components/BrandWordmark";

/**
 * The privacy note, built from the same dictionary as the rest of the site and
 * from what this build actually switched on: a section about a form backend,
 * a spam check or an analytics script only appears when that service is
 * configured. A page that lists tools the site does not use is as wrong as one
 * that hides tools it does.
 */
export function PrivacyPage({ dict }: { dict: Dictionary }) {
  const enabled = {
    always: true,
    /* The enquiry form is part of the site now rather than a service that can
       be switched off, so its section is always true — kept as its own key so
       the dictionary still reads as one section per thing that happens. */
    form: true,
    turnstile: hasTurnstile,
    analytics: hasAnalytics,
    cloudflare: hasCloudflareAnalytics,
  };
  const sections = dict.privacy.sections.filter(
    (section) => enabled[section.when as keyof typeof enabled],
  );

  const home = dict.lang === "en" ? "/en/" : "/";

  /* The landing masthead's own nav is all in-page anchors, which point at
     nothing here. This page gets the mark and the way back instead. */
  return (
    <>
      <header className="border-b-2 border-ink">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Link href={home} className="tap shrink-0">
            <BrandWordmark className="text-[1.85rem] leading-none sm:text-[2rem]" />
          </Link>
          <Link
            href={dict.lang === "en" ? "/privacy/" : "/en/privacy/"}
            className="tap font-bold transition-colors hover:text-red"
            aria-label={dict.lang === "en" ? "Crnogorski" : "English"}
          >
            {dict.nav.langLabel}
          </Link>
        </div>
      </header>
      <main>
        <div className="shell py-12 sm:py-16">
          <p className="eyebrow text-muted">{dict.privacy.updated}</p>
          <h1 className="headline mt-3 text-[clamp(2rem,4vw,3rem)]">{dict.privacy.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{dict.privacy.intro}</p>

          <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8">
            {sections.map((section) => (
              <section key={section.title} className="max-w-2xl">
                <h2 className="headline text-xl sm:text-2xl">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-line pt-5">
            <Link
              href={home}
              className="font-semibold underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red"
            >
              ← {site.name}
            </Link>
          </p>
        </div>
      </main>
      <Footer dict={dict} />
    </>
  );
}
