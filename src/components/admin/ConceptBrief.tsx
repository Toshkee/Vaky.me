"use client";

import { useState } from "react";
import { generateConcept } from "@/lib/admin/client";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { PromptBox } from "./PromptBox";

/**
 * The prompt for the free concept — step two of "Kako radimo", before the
 * client has agreed to anything.
 *
 * Nothing is stored: the enquiry and the notes are all it is made of, and
 * the version worth having is the one written after the latest note. It
 * lives in this panel only until the page is left.
 */
export function ConceptBrief({ leadId }: { leadId: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<ApiErrorCode | null>(null);

  async function generate() {
    setBusy(true);
    setCode(null);
    const answer = await generateConcept(leadId);
    setBusy(false);
    if (!answer.ok) {
      setCode(answer.code);
      return;
    }
    setContent(answer.data.content);
  }

  return (
    <PromptBox
      title="Brief za koncept"
      intro="Prompt za besplatan koncept iz upita i tvojih bilješki. Ne čuva se — napravi ga kad dodaš bilješke."
      action="Generiši brief za koncept"
      busyLabel="Pišem…"
      content={content}
      stamp="upravo generisan — nije sačuvan"
      empty="Brief za koncept još nije generisan."
      busy={busy}
      code={code}
      onGenerate={() => void generate()}
    />
  );
}
