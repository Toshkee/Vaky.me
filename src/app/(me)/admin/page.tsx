import type { Metadata, Viewport } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

/**
 * Vaky's own screen: leads, projects, onboarding links and build briefs.
 *
 * The page ships no data. Everything on it arrives from /api/admin against the
 * session cookie, so a stranger who loads this route gets a password field and
 * nothing else. `noindex` because there is no reason for a login screen to be
 * in a search result, and one more reason not to advertise where it is.
 */
export const metadata: Metadata = {
  title: "Vaky Admin",
  robots: { index: false, follow: false },
};

/** The page ground is the warm paper, one step below the site's, so the
 *  phone's address bar is told separately or it frames the screen in a
 *  slightly lighter band. */
export const viewport: Viewport = {
  themeColor: "#f4f0e8",
};

export default function AdminPage() {
  return (
    /* globals.css sets the ground under this one attribute; everything below
       draws from the site's own tokens. */
    <div data-surface="admin" className="flex flex-1 flex-col">
      <noscript>
        <div className="shell py-10">
          <div className="border-2 border-ink bg-paper-2 p-5">
            <p className="leading-relaxed">
              Dashboard je aplikacija i bez JavaScripta ne može da se učita. Uključi JavaScript pa
              osvježi stranicu.
            </p>
          </div>
        </div>
      </noscript>

      <AdminApp />
    </div>
  );
}
