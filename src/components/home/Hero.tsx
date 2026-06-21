import Link from "next/link";
import type { Stat } from "@/lib/stats";
import { FourDotLogo } from "@/components/shared/FourDotLogo";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "./CountUp";
import { TypingWords } from "./TypingWords";
import { HeroSlideshow } from "./HeroSlideshow";

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[-6%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(42,154,164,0.2), transparent 70%)" }}
        />
        <div
          className="absolute left-[-8%] top-[-12%] h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(240,124,58,0.12), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-10 md:px-8">
        {/* ── Left: text ── */}
        <div className="text-center md:text-left">
          <div className="badge-glow mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/70">
            <FourDotLogo size={18} />
            UAE-based software studio
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-[3.25rem]">
            We build <TypingWords />
            <br />
            that move your business forward.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60 md:mx-0">
            Web apps, mobile apps, and custom ERP systems engineered for performance,
            built for the UAE market and beyond.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border-2 border-white/30 px-7 py-3 font-semibold text-white transition-colors hover:border-white"
            >
              View Our Work
            </Link>
          </div>

          {/* ── Inline stats ── */}
          {stats.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-6 md:justify-start">
              {stats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="text-3xl font-bold text-[var(--brand-teal)] md:text-4xl">
                    <CountUp value={s.value} />
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: rotating browser mockup slideshow (desktop only) ── */}
        <Reveal delay={0.15} className="hidden md:block">
          <HeroSlideshow />
        </Reveal>
      </div>
    </section>
  );
}
