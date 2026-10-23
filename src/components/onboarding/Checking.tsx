import type { OnboardingCopy } from "@/i18n/onboarding";
import { Frame } from "@/components/ui/Frame";
import { BrandMark } from "@/components/BrandWordmark";

/**
 * The studio's mark, and one line, while the link is being checked.
 *
 * Its own component because two different moments need the identical frame:
 * the server build, which cannot read the token out of the address bar and so
 * has nothing else to paint, and the first render in the browser, which is
 * waiting on the API. A client sent a private link should never meet a blank
 * page on either — least of all on the one route the studio asked them to
 * open, over a phone connection, after the work was already agreed.
 */
export function Checking({
  copy,
  message,
  onRetry,
}: {
  copy: OnboardingCopy;
  message: string;
  /** Present only once something has actually failed. */
  onRetry?: () => void;
}) {
  return (
    <Frame>
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <BrandMark className="size-10 shrink-0 motion-safe:animate-pulse" />
          <p role="status" className="text-lg font-semibold">
            {message}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="btn mt-5 inline-flex min-h-12 items-center bg-transparent px-5 py-3 text-ink hover:bg-ink hover:text-paper"
          >
            {copy.upload.retry}
          </button>
        )}
      </div>
    </Frame>
  );
}
