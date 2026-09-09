import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { dictionaries } from "@/i18n";
import { tradePath } from "@/components/landing/TradePage";
import { tradeKeys } from "@/lib/trades";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Demo sites, /start/, /start/form/, and /admin/ are intentionally excluded —
  // they carry robots noindex and are also disallowed in robots.ts.
  const trades = tradeKeys.flatMap((key) =>
    [dictionaries.me, dictionaries.en].map((dict) => ({
      url: `${site.url}${tradePath(dict, key)}`,
      changeFrequency: "monthly" as const,
      priority: dict.lang === "en" ? 0.6 : 0.7,
    })),
  );

  return [
    {
      url: `${site.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/en/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${site.url}/en/privacy/`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...trades,
  ];
}
