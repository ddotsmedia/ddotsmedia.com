"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "./BrowserFrame";

/**
 * Lazy iframe: only mounts on scroll-into-view, behind a "click to load" poster.
 * Sites that block framing (X-Frame-Options) still get a graceful link fallback.
 */
export function LiveEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // If the iframe hasn't reported load shortly after activation, assume it's blocked.
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setFailed((f) => f), 4000);
    return () => clearTimeout(t);
  }, [loaded]);

  let host = url;
  try {
    host = new URL(url).host;
  } catch {}

  return (
    <div ref={ref}>
      <BrowserFrame url={url}>
        <div className="relative aspect-[16/10] w-full">
          {!loaded && (
            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-navy/80 text-white transition-colors hover:bg-navy/60"
            >
              <span className="rounded-full bg-[var(--brand-teal)] px-6 py-2.5 text-sm font-semibold">
                ▶ Click to load live preview
              </span>
              <span className="text-xs text-white/50">{host}</span>
            </button>
          )}
          {inView && loaded && !failed && (
            <iframe
              src={url}
              title={`Live preview of ${host}`}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}
          {failed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy text-white">
              <p className="text-sm text-white/60">This site can&apos;t be embedded.</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--brand-teal)] px-5 py-2 text-sm font-semibold"
              >
                Open {host} ↗
              </a>
            </div>
          )}
        </div>
      </BrowserFrame>
    </div>
  );
}
