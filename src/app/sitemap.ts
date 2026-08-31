import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Demo sites, /start/, /start/form/, and /admin/ are intentionally excluded —
  // they carry robots noindex and are also disallowed in robots.ts.
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
  ];
}
