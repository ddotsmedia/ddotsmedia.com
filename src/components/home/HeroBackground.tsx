"use client";

import { motion, useReducedMotion } from "motion/react";

/** Lightweight animated gradient-mesh: blurred brand-color blobs drifting. GPU-only. */
export function HeroBackground() {
  const reduce = useReducedMotion();
  const blobs = [
    { c: "var(--brand-teal)", x: "12%", y: "8%", s: 460 },
    { c: "var(--brand-accent-orange)", x: "72%", y: "0%", s: 380 },
    { c: "var(--brand-accent-green)", x: "60%", y: "55%", s: 420 },
    { c: "var(--brand-accent-yellow)", x: "20%", y: "60%", s: 300 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.span
          key={i}
          className="glow"
          style={{ background: b.c, left: b.x, top: b.y, width: b.s, height: b.s }}
          animate={
            reduce
              ? undefined
              : { x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.12, 0.95, 1] }
          }
          transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* navy vignette to keep text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent,var(--brand-navy)_75%)]" />
    </div>
  );
}
