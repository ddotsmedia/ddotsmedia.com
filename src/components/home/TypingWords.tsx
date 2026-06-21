"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const WORDS = ["Websites", "Mobile Apps", "ERP Systems", "Custom Software", "Digital Solutions"];
const WIDEST = "Digital Solutions"; // reserves width to avoid layout shift

/** Typing/deleting word cycler with a blinking teal cursor + animated gradient. */
export function TypingWords() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = WORDS[i];
    let delay = deleting ? 45 : 95;
    if (!deleting && sub === word.length) delay = 1500; // hold when complete
    else if (deleting && sub === 0) delay = 350; // pause before next word

    const t = setTimeout(() => {
      if (!deleting && sub < word.length) setSub(sub + 1);
      else if (!deleting && sub === word.length) setDeleting(true);
      else if (deleting && sub > 0) setSub(sub - 1);
      else {
        setDeleting(false);
        setI((i + 1) % WORDS.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [sub, deleting, i, reduce]);

  // Reduced motion: show a representative word, statically.
  const shown = reduce ? WIDEST : WORDS[i].slice(0, sub);

  return (
    <span className="relative inline-grid text-left align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap font-semibold">
        {WIDEST}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        <span className="text-gradient-anim font-semibold">{shown}</span>
        {!reduce && (
          <span className="type-cursor ml-0.5 font-normal text-[var(--brand-teal)]">|</span>
        )}
      </span>
    </span>
  );
}
