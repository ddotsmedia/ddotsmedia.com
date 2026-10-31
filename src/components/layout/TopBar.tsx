import { Mail, MessageCircle, Phone } from "lucide-react";

const PHONE = "+971 50 937 9212";
const EMAIL = "hello@ddotsmedia.com";
const WA = "971509379212";

/** Slim sticky contact bar at the very top of every page. */
export function TopBar() {
  return (
    <div className="sticky top-0 z-50 flex h-9 w-full items-center border-b border-white/[0.06] bg-[#060b14]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:justify-center lg:gap-10 lg:px-8">
        <a
          href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-[var(--brand-teal)]"
        >
          <Phone className="h-3 w-3" />
          {PHONE}
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="hidden items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-[var(--brand-teal)] sm:inline-flex"
        >
          <Mail className="h-3 w-3" />
          {EMAIL}
        </a>
        <a
          href={`https://wa.me/${WA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--brand-accent-green)]/70 transition-colors hover:text-[var(--brand-accent-green)]"
        >
          <MessageCircle className="h-3 w-3" />
          <span className="hidden sm:inline">Chat on </span>WhatsApp
        </a>
      </div>
    </div>
  );
}
