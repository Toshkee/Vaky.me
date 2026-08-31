/**
 * Serves the onboarding form shell at /start/{token}.
 *
 * The site is a static export, so a path with a token in it cannot be built
 * ahead of time — this function answers it instead, by handing back the
 * static shell at /start/form/ unchanged. The token never reaches this code's
 * logic at all: the browser reads it from its own address bar and exchanges
 * it with /api/onboarding/context, which is where validity actually gets
 * decided. Keeping this function dumb keeps every trust decision in one
 * place.
 *
 * The one thing checked here is the token's *shape*. A crawler poking
 * /start/whatever gets a redirect to the informational /start/ page rather
 * than an app shell that would only tell it "this link doesn't work".
 *
 * This lives outside functions/api/ on purpose — the api middleware stamps
 * `Cache-Control: no-store` and CORS headers meant for JSON, not for a page.
 */

const TOKEN = /^[A-Za-z0-9_-]{28,40}$/;

type Env = { ASSETS: Fetcher };

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const token = String(context.params.token ?? "");
  const origin = new URL(context.request.url).origin;

  if (!TOKEN.test(token)) {
    return Response.redirect(`${origin}/start/`, 302);
  }

  const shell = await context.env.ASSETS.fetch(`${origin}/start/form/`);
  /* A fresh Response, so a status like 304 from the asset layer (a stale
     conditional request) cannot leak through to a URL it was never about. */
  const headers = new Headers(shell.headers);
  headers.set("X-Robots-Tag", "noindex");
  return new Response(shell.body, { status: shell.ok ? 200 : shell.status, headers });
};
