/**
 * Third-party services the site can use, all of them optional.
 *
 * Every value here is public by design — a form endpoint, a Turnstile site
 * key, a website id. Provider secrets (the Turnstile secret key, any API
 * token) live in the provider's own dashboard and never in `NEXT_PUBLIC_*`,
 * in this repository, or in the exported HTML.
 *
 * Unset means off. With no form endpoint the concept form sends the same
 * prefilled email it always has; with no website id no analytics script is
 * ever requested. Nothing here is required to run or deploy the site.
 */
export const services = {
  /** Basin form endpoint, e.g. https://usebasin.com/f/xxxxxxxx */
  formEndpoint: process.env.NEXT_PUBLIC_BASIN_FORM_ENDPOINT ?? "",
  /** Cloudflare Turnstile site key. The secret key is stored in Basin. */
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
  umami: {
    websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "",
    scriptUrl: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? "https://cloud.umami.is/script.js",
  },
  /**
   * Cloudflare Web Analytics is switched on in the Cloudflare dashboard, not
   * here — Cloudflare injects its beacon into the response on the way out, so
   * no code in this repository can tell whether it is running. This flag only
   * tells the privacy page the truth about it. Set it to "on" while that
   * feature is enabled at Cloudflare; clear it when it is turned off.
   */
  cloudflareAnalytics: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS === "on",
} as const;

export const hasFormBackend = services.formEndpoint.length > 0;
export const hasTurnstile = services.turnstileSiteKey.length > 0;
export const hasAnalytics = services.umami.websiteId.length > 0;
export const hasCloudflareAnalytics = services.cloudflareAnalytics;
