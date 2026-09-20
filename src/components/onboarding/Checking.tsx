import type { OnboardingCopy } from "@/i18n/onboarding";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Vaky } from "@/components/mascot/Vaky";

/**
 * Vaky at the desk while the link is being checked.
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
    <PixelWindow title="VAKY OS">
      <div className="p-5 sm:p-8">
        <div className="vaky-ground flex items-end gap-3">
          <Vaky direction="right" pose="work" scale={0.24} />
          <p role="status" className="mb-2 text-lg font-semibold">
            {message}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px px-btn mt-5 inline-flex min-h-12 items-center bg-paper px-5 py-3 text-[1.0625rem] text-ink transition-colors hover:text-red"
          >
            {copy.upload.retry}
          </button>
        )}
      </div>
    </PixelWindow>
  );
}
