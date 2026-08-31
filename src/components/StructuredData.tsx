import type { Dictionary } from "@/i18n";
import { instagramLink, site } from "@/config/site";
import { PLAN_PACKAGES } from "@/lib/onboarding/schema";
import { PACKAGES } from "@/lib/packages";

/* What the studio charges, spanning the cheapest package to the entry price of
   the open-ended one — derived, so it cannot say €350 a year after the price
   list stopped doing so. The trailing "+" is what makes it honest: the top of
   the range is a floor, not a ceiling. */
const amounts = PLAN_PACKAGES.map((id) => PACKAGES[id].price.amount);
const openEnded = PLAN_PACKAGES.some((id) => PACKAGES[id].price.kind === "from");
const priceRange = `€${Math.min(...amounts)}–€${Math.max(...amounts)}${openEnded ? "+" : ""}`;

/**
 * JSON-LD for the studio itself and for the FAQ.
 *
 * This is what names the business to a search engine: without it, "VibeLab"
 * is just words in a <title>, and the rename leaves no trace Google can attach
 * to an entity. Everything here is derived from `site.ts` and the active
 * dictionary, so it cannot drift from what the page actually says.
 *
 * Renders on the server — a plain <script> tag, no client JS.
 */
export function StructuredData({ dict }: { dict: Dictionary }) {
  const url = dict.lang === "en" ? `${site.url}/en/` : `${site.url}/`;

  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#studio`,
      name: site.name,
      url: site.url,
      image: `${site.url}/og.png`,
      description: dict.meta.description,
      email: site.email,
      priceRange,
      // what the studio does, in the page's own language — the entity signal
      // behind "izrada sajtova Podgorica" and its English equivalents.
      // knowsAbout, not serviceType: schema.org puts serviceType on Service
      // only, and ProfessionalService descends from LocalBusiness, so a
      // serviceType here is an unrecognized property a validator flags and
      // Google ignores. The Service entities carry it below, per offer.
      knowsAbout: dict.meta.serviceTypes,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "ME",
      },
      areaServed: [
        { "@type": "City", name: site.city },
        { "@type": "Country", name: "Montenegro" },
      ],
      sameAs: [instagramLink()],
      makesOffer: dict.pricing.plans.map((plan, index) => {
        const { price } = PACKAGES[PLAN_PACKAGES[index]];
        return {
          "@type": "Offer",
          name: plan.name,
          description: plan.tagline,
          priceCurrency: "EUR",
          /* A starting price is not a price. Stating €600 flat for a package
             whose whole point is that the scope decides would be a promise
             the studio has not made — so it ships as a minimum instead, which
             is the thing schema.org has a field for. */
          ...(price.kind === "fixed"
            ? { price: String(price.amount) }
            : {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "EUR",
                  minPrice: price.amount,
                },
              }),
          itemOffered: {
            "@type": "Service",
            name: plan.name,
            serviceType: dict.meta.serviceTypes[0],
          },
        };
      }),
    },
    {
      "@type": "WebSite",
      "@id": `${url}#website`,
      url,
      name: site.name,
      inLanguage: dict.htmlLang,
      publisher: { "@id": `${site.url}/#studio` },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: dict.htmlLang,
      mainEntity: dict.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // the payload is built from our own config, never from user input
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
