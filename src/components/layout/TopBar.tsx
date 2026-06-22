import { MessageCircle, Phone } from "lucide-react";

/** Slim sticky contact bar at the very top of every page. */
export function TopBar() {
  return (
    <div className="sticky top-0 z-50 flex h-9 w-full items-center border-b border-white/5 bg-[#0d1117]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:justify-center lg:gap-10 lg:px-8">
        <a
          href="tel:+971509379212"
          className="inline-flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-[var(--brand-teal)]"
        >
          <Phone className="h-3.5 w-3.5" />
          +971 50 937 9212
        </a>
        <a
          href="https://wa.me/971509379212"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-[var(--brand-teal)]"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Chat with us
        </a>
      </div>
    </div>
  );
}
