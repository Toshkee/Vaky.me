import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

/**
 * Generated rather than kept as a static file in public/ — the sitemap URL has
 * to track `site.url`, and a hand-maintained robots.txt silently kept pointing
 * at an old domain through a rename.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Each of these already carries a per-page noindex meta tag; disallowing
      // the crawl itself means a stray link never gets the page loaded at all.
      disallow: ["/admin/", "/start/", "/start/form/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
