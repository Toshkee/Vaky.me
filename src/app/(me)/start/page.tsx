import type { Metadata } from "next";
import { Onboarding } from "@/components/onboarding/Onboarding";
import type { PackageCard } from "@/components/onboarding/Gate";
import { dictionaries } from "@/i18n";
import { onboardingCopy } from "@/i18n/onboarding";
import { PACKAGE_IDS, PACKAGE_PLAN_INDEX, type Language } from "@/lib/onboarding/schema";
import { emailLink, instagramLink, site } from "@/config/site";

/**
 * The onboarding link VibeLab sends a client once a project is agreed.
 *
 * One route, both languages. The site's marketing pages are two builds — `/`
 * and `/en/` — because they are read by search engines, which need a URL per
 * language. This one is read by a person who was handed the link, and who may
 * have been handed the wrong language: switching it here has to keep a
 * half-filled form, which a navigation cannot. So the language is state, the
 * document's `lang` follows it, and the words for both are in the bundle.
 *
 * `noindex`, for the same reason the demo concepts are: this is a private
 * form for clients who have already bought, and a stranger landing on
 * "which package did we agree on?" from a search result is a worse first
 * impression than not being found at all. The landing page is the front door.
 */
const copy = onboardingCopy.me;

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  robots: { index: false, follow: false },
};

/* The plan names and prices come from the pricing table, which is the single
   source of truth for what a package is called and what it costs. They are
   resolved here, on the server, so the package chooser can show them without
   the whole landing dictionary being shipped to the browser for three names. */
function cardsFor(language: Language): PackageCard[] {
  return PACKAGE_IDS.map((id) => {
    const plan = dictionaries[language].pricing.plans[PACKAGE_PLAN_INDEX[id]];
    return { id, name: plan.name, price: plan.price, tagline: plan.tagline };
  });
}

const cards: Record<Language, PackageCard[]> = {
  me: cardsFor("me"),
  en: cardsFor("en"),
};

export default function StartPage() {
  return (
    <>
      {/* This form cannot work without JavaScript — it uploads files and saves
          drafts. Rather than a dead page, the two ways a client already talks
          to VibeLab. */}
      <noscript>
        <div className="shell py-10">
          <div className="border-2 border-ink bg-paper-2 p-5">
            <p className="leading-relaxed">
              Za popunjavanje ovog obrasca potreban je JavaScript. Ako ne radi, javite nam se
              direktno — odgovorićemo isto.
            </p>
            <p className="mt-3 leading-relaxed">
              This form needs JavaScript. If it does not work, write to us directly instead.
            </p>
            <p className="mt-4 font-semibold">
              <a href={instagramLink()} className="underline underline-offset-4">
                @{site.instagram}
              </a>
              {" · "}
              <a
                href={emailLink("Novi projekat", "")}
                className="underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </noscript>

      <Onboarding cards={cards} />
    </>
  );
}
