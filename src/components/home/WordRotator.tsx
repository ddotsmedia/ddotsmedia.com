"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const WORDS = ["Web Apps", "Mobile Apps", "ERP Systems", "Desktop Apps"];

/** Clean animated word-rotator. SSR shows the first word so it's never empty. */
export function WordRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-grid">
      {/* invisible sizer = widest word, prevents layout shift */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        Desktop Apps
      </span>
      <span className="col-start-1 row-start-1 overflow-hidden text-[var(--brand-teal)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[i]}
            className="inline-block"
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
