import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Stat } from "@/lib/stats";
import { FourDotLogo } from "@/components/shared/FourDotLogo";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "./CountUp";
import { TypingWords } from "./TypingWords";

const CODE_BARS = [
  { w: "55%", c: "var(--brand-accent-orange)" },
  { w: "82%", c: "var(--brand-teal)", indent: true },
  { w: "44%", c: "var(--brand-accent-green)", indent: true },
  { w: "68%", c: "rgba(255,255,255,0.3)" },
  { w: "50%", c: "var(--brand-accent-yellow)", indent: true },
  { w: "76%", c: "var(--brand-teal)" },
  { w: "38%", c: "var(--brand-accent-orange)", indent: true },
];

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-28">
      {/* ── Animated background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Base navy vignette — sits BEHIND the decorations so it never covers them */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent,var(--brand-navy)_85%)]" />

        <div className="hero-grid absolute inset-0" />

        {/* Teal glow (right) + amber glow (left) for depth — both breathe */}
        <div
          className="hero-glow absolute -right-[10%] -top-[12%] h-[760px] w-[760px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand-teal) 55%, transparent), transparent 68%)",
          }}
        />
        <div
          className="hero-glow absolute -left-[14%] top-[30%] h-[600px] w-[600px] rounded-full [animation-delay:-4.5s]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand-accent-orange) 42%, transparent), transparent 70%)",
          }}
        />

        {/* Floating tech shapes (≥6, hidden on mobile, more on large) */}
        <span className="hero-float absolute left-[7%] top-[28%] hidden font-mono text-7xl font-bold text-[var(--brand-teal)] opacity-30 sm:block">
          {"{ }"}
        </span>
        <span className="hero-float-slow absolute left-[14%] bottom-[16%] hidden font-mono text-6xl font-bold text-[var(--brand-accent-orange)] opacity-30 sm:block">
          {"</>"}
        </span>
        <span className="hero-float absolute right-[12%] top-[12%] hidden font-mono text-7xl font-bold text-[var(--brand-accent-green)] opacity-[0.35] sm:block">
          {"+"}
        </span>
        <span className="hero-float-slow absolute right-[9%] bottom-[15%] hidden h-20 w-20 rotate-12 rounded-xl border-2 border-[var(--brand-accent-yellow)] opacity-30 sm:block" />
        <span className="hero-float absolute left-[24%] top-[58%] hidden h-28 w-28 rounded-full border-2 border-[var(--brand-teal)] opacity-30 lg:block" />
        <span
          className="hero-float-slow absolute right-[30%] top-[46%] hidden opacity-30 lg:block"
          style={{
            width: 0,
            height: 0,
            borderLeft: "34px solid transparent",
            borderRight: "34px solid transparent",
            borderBottom: "58px solid var(--brand-accent-orange)",
          }}
        />

        {/* Tilted code mockup (desktop only) — colored bars suggesting code */}
        <div className="absolute right-[-3%] top-1/2 hidden w-[380px] -translate-y-1/2 lg:block">
          <div className="hero-mockup rounded-xl border border-white/10 bg-[#0d1626]/85 opacity-90 shadow-2xl shadow-black/60">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="space-y-3 p-6">
              {CODE_BARS.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  {b.indent && <span className="h-2.5 w-5 shrink-0" />}
                  <span
                    className="h-2.5 rounded-full"
                    style={{ width: b.w, backgroundColor: b.c, opacity: 0.7 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
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

        {/* ── Stats row (teal accent bar, large numbers, staggered count-up) ── */}
        {stats.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.1}
                className="border-l-2 border-[var(--brand-teal)]/50 pl-4 text-left"
              >
                <div className="text-4xl font-bold text-[var(--brand-teal)] md:text-5xl">
                  <CountUp value={s.value} />
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ChevronDown aria-hidden className="scroll-bounce h-8 w-8 text-white" />
      </div>
    </section>
  );
}
