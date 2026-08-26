import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";

/** Icon-only WhatsApp button, mobile only — always in thumb's reach. */
export function WhatsAppFab({ dict }: { dict: Dictionary }) {
  return (
    <a
      href={whatsappLink(dict.contact.prefill)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp: ${dict.fab}`}
      className="fab-appear fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red text-white shadow-[0_8px_24px_rgba(22,22,26,0.28)] transition-transform active:scale-90 md:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
