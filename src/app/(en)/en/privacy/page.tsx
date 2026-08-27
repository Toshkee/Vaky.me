import type { Metadata } from "next";
import { dictionaries } from "@/i18n";
import { PrivacyPage } from "@/components/PrivacyPage";

const dict = dictionaries.en;

export const metadata: Metadata = {
  title: `${dict.privacy.title} — VibeLab`,
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
