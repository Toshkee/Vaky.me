import Script from "next/script";
import { hasAnalytics, services } from "@/config/services";

/**
 * Umami, or nothing at all.
 *
 * Cookieless, so there is no consent banner to put in a visitor's way; it is
 * restricted to this domain in the Umami dashboard, honours Do Not Track, and
 * is told to ignore query strings so a campaign tag or a stray `?q=` never
 * becomes stored data. Without a website id configured this renders nothing
 * and the page makes no request.
 */
export function Analytics() {
  if (!hasAnalytics) return null;

  return (
    <Script
      src={services.umami.scriptUrl}
      data-website-id={services.umami.websiteId}
      data-do-not-track="true"
      data-exclude-search="true"
      strategy="afterInteractive"
    />
  );
}
