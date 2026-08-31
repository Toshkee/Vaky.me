"use client";

import { useState, type FormEvent } from "react";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { getMe, login } from "@/lib/admin/client";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { apiText, inputClass, primaryButtonClass } from "./ui";

/**
 * The way in. The password is never in this bundle and never compared here —
 * the field is posted, the server decides, and what comes back is a cookie or
 * nothing.
 *
 * A successful POST is re-checked with `getMe` before the dashboard is shown.
 * The cookie is what every later request depends on, so proving it actually
 * stuck is cheaper than a screen full of views failing one by one.
 */
export function Login({ onIn }: { onIn: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  /* 401 is how the endpoint answers a wrong password, so on this one screen
     the `session` code means "not that password" rather than "you were
     signed out". */
  const message = (code: ApiErrorCode) =>
    code === "session" ? "Pogrešna lozinka." : apiText(code);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !password) return;

    setBusy(true);
    setProblem(null);

    const attempt = await login(password);
    if (!attempt.ok) {
      setBusy(false);
      setProblem(message(attempt.code));
      return;
    }

    const session = await getMe();
    setBusy(false);
    if (!session.ok) {
      setProblem(message(session.code));
      return;
    }

    setPassword("");
    onIn();
  }

  return (
    <main className="shell flex w-full flex-1 items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <PixelWindow title="Vaky Admin">
          <form onSubmit={submit} className="grid gap-4 p-5">
            <h1 className="headline text-xl">Prijava</h1>

            <div className="grid gap-1">
              <label htmlFor="admin-password" className="eyebrow text-muted">
                Lozinka
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            </div>

            <button type="submit" disabled={busy} aria-busy={busy} className={primaryButtonClass}>
              {busy ? "Provjeravam…" : "Prijavi se"}
            </button>

            {/* Mounted while empty as well, so a failure is announced when it
                arrives instead of appearing in a region nothing is watching. */}
            <p
              role="status"
              className={problem ? "text-sm leading-relaxed font-semibold text-red" : undefined}
            >
              {problem}
            </p>
          </form>
        </PixelWindow>
      </div>
    </main>
  );
}
