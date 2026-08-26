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
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
