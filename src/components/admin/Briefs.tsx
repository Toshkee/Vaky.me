"use client";

import { useState } from "react";
import { generateBrief, type BriefRow } from "@/lib/admin/client";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { PromptBox } from "./PromptBox";
import { When } from "./ui";

/**
 * The prompt that gets pasted into a coding session to build the site.
 *
 * The button asks the server to write it fresh from the answers, the notes
 * and the files as they stand right now. What was saved earlier is shown
 * until something newer is asked for, so opening the panel always has
 * something to read.
 */
export function Briefs({ projectId, briefs }: { projectId: string; briefs: readonly BriefRow[] }) {
  const saved = briefs[0] ?? null;
  const [fresh, setFresh] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<ApiErrorCode | null>(null);

  async function generate() {
    setBusy(true);
    setCode(null);
    const answer = await generateBrief(projectId);
    setBusy(false);
    if (!answer.ok) {
      setCode(answer.code);
      return;
    }
    setFresh(answer.data.content);
  }

  return (
    <PromptBox
      title="Brief za izradu"
      intro="Prompt za agenta koji gradi sajt: odgovori, fajlovi, bilješke i pravila kuće. Generiši ponovo poslije nove bilješke ili fajla."
      action="Generiši brief"
      busyLabel="Pišem…"
      content={fresh ?? saved?.content ?? null}
      stamp={
        fresh === null ? (
          <>
            sačuvan <When value={saved?.created_at ?? null} />
          </>
        ) : (
          "upravo generisan"
        )
      }
      empty="Brief još nije generisan."
      busy={busy}
      code={code}
      onGenerate={() => void generate()}
    />
  );
}
