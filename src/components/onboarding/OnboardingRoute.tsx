"use client";

import { useSyncExternalStore } from "react";
import type { Language, PackageId } from "@/lib/onboarding/schema";
import { Onboarding } from "./Onboarding";

/**
 * Reads the token out of the address bar.
 *
 * The site is a static export, so `/start/{token}/` has no page of its own —
 * `functions/start/[token].ts` answers it with this shell, and the URL the
 * browser is sitting on is the only place the token exists. It cannot be read
 * during the server build (there is no request) and it must not be read during
 * the first render either, or the markup React hydrates would not match the
 * markup it built. So: one paint of nothing, then the form.
 *
 * A path with no token — somebody who found `/start/form/` directly — yields
 * an empty string, which `Onboarding` treats as a link that does not work.
 */

function tokenFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const candidate = parts[1] ?? "";
  return candidate === "form" ? "" : candidate;
}

/* The address bar is an external store that never changes while this page is
   open: one client, one link, no client-side navigation. Subscribing is
   therefore a no-op, and the only thing that matters is that the build has a
   different answer (`null`) from the browser. */
const subscribe = () => () => {};
const readPath = () => window.location.pathname;
const noPath = () => null;

export function OnboardingRoute({
  packageNames,
}: {
  packageNames: Record<Language, Record<PackageId, string>>;
}) {
  const pathname = useSyncExternalStore(subscribe, readPath, noPath);

  if (pathname === null) return null;
  return <Onboarding token={tokenFromPath(pathname)} packageNames={packageNames} />;
}
