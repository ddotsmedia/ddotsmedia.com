"use client";

import { useEffect, useRef, useState } from "react";

/** Muted autoplay loop screen-recording; only loads source on scroll-into-view. */
export function PreviewVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      autoPlay
      playsInline
      preload="none"
      className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/40"
    >
      {inView && <source src={src} />}
    </video>
  );
}
