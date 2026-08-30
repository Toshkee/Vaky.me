import { site } from "../../src/config/site";
import { withSecurityHeaders } from "../../server/onboarding/http";

/**
 * The headers every API response gets.
 *
 * `public/_headers` is a Pages *static asset* mechanism — it sets the CSP and
 * the rest on the exported HTML, and it does not reach a Function's response at
 * all. Pages also answers Functions with `Access-Control-Allow-Origin: *`
 * unless told otherwise. Without this file the brief API would be readable
 * cross-origin from any page on the internet, and the route that hands back a
 * client's uploaded file would be served without `nosniff`.
 *
 * It lives under `api/` rather than at the root of `functions/` for a reason
 * worth keeping: a middleware at the root makes Pages route `/*` through the
 * Worker, so every page of the marketing site would be a Function invocation —
 * and would come back with the `Cache-Control: no-store` meant for this API.
 * Scoped here, the generated route is `/api/*` and static pages are served as
 * static pages. Check `_routes.json` after `npm run build:functions` if this
 * file ever moves.
 */
export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  return withSecurityHeaders(response, site.url);
};
