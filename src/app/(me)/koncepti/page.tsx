import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { site } from "@/config/site";
import { ConceptsPage } from "@/components/landing/ConceptsPage";

const dict = dictionaries.me;
const { conceptsPage } = dict.work;

export const metadata: Metadata = {
  title: conceptsPage.metaTitle,
  description: conceptsPage.description,
  alternates: {
    canonical: "/koncepti/",
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
    url: "/koncepti/",
    images: ["/og.png"],
  },
};

export default function Concepts() {
  return <ConceptsPage dict={dict} />;
}
