import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { LandingPage } from "@/components/landing/LandingPage";

const dict = dictionaries.me;

export const metadata: Metadata = {
  title: dict.meta.title,
  description: dict.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      "sr-ME": "/",
      en: "/en/",
    },
  },
  openGraph: {
    // repeated from the layout's sharedMetadata: Next merges metadata
    // shallowly, so a page-level openGraph replaces the layout's whole
    // object and would otherwise drop og:site_name and og:type
    siteName: "VibeLab",
    type: "website",
    title: dict.meta.title,
    description: dict.meta.description,
    url: "/",
    images: ["/og.png"],
  },
};

export default function Home() {
  return <LandingPage dict={dict} />;
}
