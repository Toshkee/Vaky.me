import type { Dictionary } from "@/i18n";
import { instagramLink, site } from "@/config/site";

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
      priceRange: "€100–€350",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "ME",
      },
      areaServed: { "@type": "Country", name: "Montenegro" },
      sameAs: [instagramLink()],
      makesOffer: dict.pricing.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.tagline,
        priceCurrency: "EUR",
        // "od €350" / "from €350" — the schema wants the number alone
        price: plan.price.replace(/[^0-9]/g, ""),
      })),
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
