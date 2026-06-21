"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a project take?",
    a: "Most websites take 2–4 weeks; mobile apps and ERP systems run 6–12 weeks depending on scope. We share a clear timeline before we start.",
  },
  {
    q: "What technologies do you use?",
    a: "Primarily Next.js, React, React Native, Node.js, PostgreSQL, and Docker — chosen for performance and long-term maintainability.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Every project includes a support window, and we offer ongoing maintenance plans with monitoring, backups, and updates.",
  },
  {
    q: "Can you work with existing code?",
    a: "Absolutely. We regularly audit, refactor, and extend existing codebases as well as build new products from scratch.",
  },
  {
    q: "How does pricing work?",
    a: "We scope each project and quote a fixed price or milestone-based plan. The pricing section above shows typical starting points.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — we're happy to sign an NDA before discussing any sensitive details of your project.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-[#1e2d42] bg-[#111827]">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-medium text-white">{f.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[var(--brand-teal)] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
