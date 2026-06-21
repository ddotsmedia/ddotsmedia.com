import Link from "next/link";
import { ChevronDown, Code2 } from "lucide-react";
import type { Stat } from "@/lib/stats";
import { FourDotLogo } from "@/components/shared/FourDotLogo";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "./CountUp";
import { TypingWords } from "./TypingWords";
import { cn } from "@/lib/utils";

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-28">
      {/* ── Animated background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-grid absolute inset-0" />
        <div
          className="hero-glow absolute -right-[12%] -top-[14%] h-[620px] w-[620px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand-teal) 38%, transparent), transparent 70%)",
          }}
        />

        {/* Floating decorative shapes (hidden on small screens) */}
        <Code2
          className="hero-float absolute left-[8%] top-[26%] hidden h-16 w-16 text-[var(--brand-teal)] opacity-[0.14] sm:block"
          strokeWidth={1.2}
        />
        <span className="hero-float-slow absolute right-[12%] top-[20%] hidden h-20 w-20 rotate-12 rounded-2xl border border-[var(--brand-accent-orange)] opacity-[0.12] sm:block" />
        <span className="hero-float absolute left-[18%] bottom-[16%] hidden h-3 w-3 rounded-full bg-[var(--brand-accent-green)] opacity-20 sm:block" />
        <span className="hero-float-slow absolute right-[20%] bottom-[22%] hidden h-12 w-12 rotate-45 border-2 border-[var(--brand-accent-yellow)] opacity-[0.12] sm:block" />
        <span className="hero-float absolute right-[30%] top-[40%] hidden h-2.5 w-2.5 rounded-full bg-[var(--brand-teal)] opacity-25 lg:block" />

        {/* Navy vignette keeps text legible */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent,var(--brand-navy)_78%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="badge-glow mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/70">
          <FourDotLogo size={18} />
          UAE-based software studio
        </div>

        <h1 className="text-display text-white">
          We build <TypingWords />
          <br />
          that move your business forward.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          Web apps, mobile apps, and custom ERP systems engineered for performance,
          built for the UAE market and beyond.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-shimmer rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/15 px-7 py-3 font-semibold text-white/90 transition-all hover:border-[var(--brand-teal)] hover:shadow-[0_0_28px_-8px_var(--brand-teal)]"
          >
            View Our Work
          </Link>
        </div>

        {/* ── Stats row (staggered count-up, separators) ── */}
        {stats.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.1}
                className={cn("text-center", i > 0 && "sm:border-l sm:border-white/10")}
              >
                <div className="text-3xl font-bold text-[var(--brand-teal)] md:text-4xl">
                  <CountUp value={s.value} />
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs text-white/55 sm:text-sm">{s.label}</div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ChevronDown aria-hidden className="scroll-bounce h-6 w-6 text-white/40" />
      </div>
    </section>
  );
}
