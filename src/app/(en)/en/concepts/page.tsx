import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { site } from "@/config/site";
import { ConceptsPage } from "@/components/landing/ConceptsPage";

const dict = dictionaries.en;
const { conceptsPage } = dict.work;

export const metadata: Metadata = {
  title: conceptsPage.metaTitle,
  description: conceptsPage.description,
  alternates: {
    canonical: "/en/concepts/",
    languages: {
      "sr-ME": "/koncepti/",
      en: "/en/concepts/",
    },
  },
  openGraph: {
    // repeated in full: Next merges openGraph shallowly
    siteName: site.name,
    type: "website",
    title: conceptsPage.metaTitle,
    description: conceptsPage.description,
    url: "/en/concepts/",
    images: ["/og.png"],
  },
};

export default function ConceptsEn() {
  return <ConceptsPage dict={dict} />;
}
