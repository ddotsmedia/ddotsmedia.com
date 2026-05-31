import type { ReactNode } from "react";

/** Realistic desktop browser chrome around children. */
export function BrowserFrame({ url, children }: { url?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1a1f2e] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        {url && (
          <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-xs text-white/40">
            {url}
          </span>
        )}
      </div>
      <div className="bg-navy">{children}</div>
    </div>
  );
}
