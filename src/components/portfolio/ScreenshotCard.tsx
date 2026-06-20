"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion, useReducedMotion } from "motion/react";
import type { PortfolioItem } from "@/lib/data/portfolio";

const categoryColor: Record<PortfolioItem["category"], string> = {
  Web: "var(--brand-teal)",
  iOS: "var(--brand-accent-orange)",
  Android: "var(--brand-accent-green)",
  Desktop: "var(--brand-accent-yellow)",
  ERP: "var(--brand-accent-orange)",
};

/** Live-site screenshot inside a tilting macOS-style browser frame. */
export function ScreenshotCard({ item, index }: { item: PortfolioItem; index: number }) {
  const reduce = useReducedMotion();
  const host = item.url.replace(/^https?:\/\//, "").replace(/\/+$/, "");

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : (index % 6) * 0.08,
      }}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.12}
        glarePosition="all"
        glareBorderRadius="16px"
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        scale={1.02}
        transitionSpeed={900}
        tiltEnable={!reduce}
        className="group h-full"
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-2xl border border-white/10 bg-[#1a1f2e] shadow-2xl shadow-black/40 transition-shadow duration-300 hover:shadow-[0_24px_60px_-15px_var(--brand-teal)]"
        >
          {/* macOS browser chrome — stays on top, screenshot clips below */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-xs text-white/40">
              {host}
            </span>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-navy">
            <Image
              src={item.image}
              alt={`${item.title} — live site screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur"
              style={{ backgroundColor: categoryColor[item.category] }}
            >
              {item.category}
            </span>
          </div>

          <div className="flex flex-col gap-2 p-5">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[var(--brand-teal)]">
              {item.title}
            </h3>
            <p className="line-clamp-2 text-sm text-white/60">{item.description}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </a>
      </Tilt>
    </motion.div>
  );
}
