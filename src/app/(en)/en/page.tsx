import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { LandingPage } from "@/components/landing/LandingPage";

const dict = dictionaries.en;

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  alternates: {
    canonical: "/en/",
    languages: {
      "sr-ME": "/",
      en: "/en/",
    },
  },
  openGraph: {
    title: dict.meta.title,
    description: dict.meta.description,
    url: "/en/",
    images: ["/og.png"],
  },
};

export default function HomeEn() {
  return <LandingPage dict={dict} />;
}
