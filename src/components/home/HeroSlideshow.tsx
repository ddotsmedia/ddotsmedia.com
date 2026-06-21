"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const PROJECTS = [
  { name: "Ddotsmedia Jobs", url: "ddotsmediajobs.com", image: "/projects/ddotsmediajobs.png" },
  { name: "Ddotsmedia ERP", url: "ddotsmediaerp.com", image: "/projects/ddotsmediaerp.png" },
  { name: "AyurConnect", url: "ayurconnect.com", image: "/projects/ayurconnect.png" },
  { name: "Gayathi", url: "gayathi.ae", image: "/projects/gayathi.png" },
  { name: "Ddotshop", url: "ddotshop.com", image: "/projects/ddotshop.png" },
  { name: "Milisa UH", url: "milisauh.ae", image: "/projects/milisauh.png" },
];

/** Auto-rotating browser mockup that crossfades through real project screenshots. */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex((i % PROJECTS.length + PROJECTS.length) % PROJECTS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % PROJECTS.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  const active = PROJECTS[index];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className="rounded-xl"
        style={{
          transform: "perspective(1200px) rotateY(-8deg)",
          boxShadow: "0 25px 60px rgba(42,154,164,0.25)",
        }}
      >
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111827]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-xs text-white/40">
              {active.url}
            </span>
          </div>

          {/* Stacked screenshots — all preloaded, only the active one is visible */}
          <div className="relative aspect-[16/10] bg-navy">
            {PROJECTS.map((p, i) => (
              <Image
                key={p.name}
                src={p.image}
                alt={`${p.name} — live project`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover object-left-top transition-opacity duration-300 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {PROJECTS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            aria-label={`Show ${p.url}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-[var(--brand-teal)]" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
