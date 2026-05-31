"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up. `value` is the real number rendered server-side (children),
 * so the correct figure shows even with JS disabled — this only animates it.
 */
export function CountUp({ value, durationMs = 1400 }: { value: number; durationMs?: number }) {
  const [display, setDisplay] = useState(value); // SSR + no-JS = final value
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;

    const run = (start: number) => (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(run(start));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          setDisplay(0);
          raf = requestAnimationFrame((now) => run(now)(now));
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
