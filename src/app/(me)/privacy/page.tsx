import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { site } from "@/config/site";
import { PrivacyPage } from "@/components/PrivacyPage";

const dict = dictionaries.me;

export const metadata: Metadata = {
  title: `${dict.privacy.title} — ${site.name}`,
  description: dict.privacy.intro,
  alternates: {
    canonical: "/privacy/",
    languages: {
      "sr-ME": "/privacy/",
      en: "/en/privacy/",
    },
  },
};

export default function Privacy() {
  return <PrivacyPage dict={dict} />;
}
