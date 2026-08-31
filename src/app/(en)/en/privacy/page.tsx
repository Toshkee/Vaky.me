import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { site } from "@/config/site";
import { PrivacyPage } from "@/components/PrivacyPage";

const dict = dictionaries.en;

export const metadata: Metadata = {
  title: `${dict.privacy.title} — ${site.name}`,
  description: dict.privacy.intro,
  alternates: {
    canonical: "/en/privacy/",
    languages: {
      "sr-ME": "/privacy/",
      en: "/en/privacy/",
    },
  },
};

export default function PrivacyEn() {
  return <PrivacyPage dict={dict} />;
}
