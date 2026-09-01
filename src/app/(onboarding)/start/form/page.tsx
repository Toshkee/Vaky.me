import type { Metadata } from "next";
import { OnboardingRoute } from "@/components/onboarding/OnboardingRoute";
import { dictionaries } from "@/i18n";
import { onboardingCopy } from "@/i18n/onboarding";
import { PACKAGE_IDS, PACKAGE_PLAN_INDEX, type Language, type PackageId } from "@/lib/onboarding/schema";
import { emailLink, site } from "@/config/site";

/**
 * The shell every private onboarding link is served from.
 *
 * One built page, one URL per client: `functions/start/[token].ts` hands this
 * document back for `/start/{token}/` without rewriting a byte of it, and the
 * browser reads the token from its own address bar. That means the token never
 * touches the build, never lands in a cache key, and never appears in a file
 * anyone could enumerate.
 *
 * One route, both languages, for the same reason as before: switching language
 * mid-brief has to keep a half-filled form, which a navigation cannot.
 */

const copy = onboardingCopy.me;

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  robots: { index: false, follow: false },
};

/* The plan names come from the pricing table, which is the single source of
   truth for what a package is called. Resolved here, on the server, so the
   header chip can name the package without the landing dictionary being
   shipped to the browser for three words. */
function namesFor(language: Language): Record<PackageId, string> {
  const plans = dictionaries[language].pricing.plans;
  return PACKAGE_IDS.reduce(
    (names, id) => ({ ...names, [id]: plans[PACKAGE_PLAN_INDEX[id]].name }),
    {} as Record<PackageId, string>,
  );
}

const packageNames: Record<Language, Record<PackageId, string>> = {
  me: namesFor("me"),
  en: namesFor("en"),
};

export default function OnboardingFormPage() {
  return (
    <>
      {/* This form cannot work without JavaScript — it uploads files and saves
          drafts. Rather than a dead page, the two ways a client already talks
          to Vaky. */}
      <noscript>
        <div className="shell py-10">
          <div className="border-2 border-ink bg-paper-2 p-5">
            <p className="leading-relaxed">
              Za popunjavanje ovog upitnika potreban je JavaScript. Ako ne radi, javite nam se
              direktno — odgovorićemo isto.
            </p>
            <p className="mt-3 leading-relaxed">
              This form needs JavaScript. If it does not work, write to us directly instead.
            </p>
            <p className="mt-4 font-semibold">
              <a
                href={emailLink("Upitnik", "")}
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </noscript>

      <OnboardingRoute packageNames={packageNames} />
    </>
  );
}
