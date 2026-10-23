import type { ReactNode } from "react";
import { BrandMark } from "@/components/BrandWordmark";

/**
 * A line from the studio, set as a message: the mark as the sender, the
 * words in an ink bubble. Used where the brief speaks to the client in the
 * first person — "it's fine not to know", "done, I'll be in touch".
 */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <BrandMark className="size-9 shrink-0" />
      <p className="say max-w-sm px-4 py-3 text-[0.9375rem] leading-snug font-medium">{children}</p>
    </div>
  );
}
