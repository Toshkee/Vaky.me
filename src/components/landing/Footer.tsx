import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { instagramLink, site } from "@/config/site";
import { HeartIcon } from "./icons";

export function Footer({ dict }: { dict: Dictionary }) {
  const home = dict.lang === "en" ? "/en/" : "/";

  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-6 text-sm text-muted sm:px-8">
        <Link href={home} className="flex items-center gap-2.5" aria-label="VibeLab">
          <Image
            src="/tony-head.png"
            alt=""
            width={94}
            height={96}
            className="h-6 w-auto shrink-0"
          />
          <span>
            © {new Date().getFullYear()} {site.name} — {site.city},{" "}
            {dict.lang === "en" ? "Montenegro" : "Crna Gora"}
          </span>
        </Link>
        <p className="hidden items-center gap-2 md:flex">
          {dict.footer.tagline}
          <HeartIcon className="w-3.5 text-red" />
        </p>
        <a
          href={instagramLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          @{site.instagram}
        </a>
      </div>
    </footer>
  );
}
