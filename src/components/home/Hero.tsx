import Image from "next/image";
import Link from "next/link";
import type { Stat } from "@/lib/stats";
import { FourDotLogo } from "@/components/shared/FourDotLogo";
import { Reveal } from "@/components/shared/Reveal";
import { BrowserFrame } from "@/components/preview/BrowserFrame";
import { CountUp } from "./CountUp";
import { TypingWords } from "./TypingWords";

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Single soft teal accent behind the mockup */}
      <div className="pointer-events-none absolute right-[-4%] top-1/2 hidden h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[var(--brand-teal)]/15 blur-[100px] lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* ── Left: text ── */}
        <div className="text-center lg:text-left">
          <div className="badge-glow mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/70">
            <FourDotLogo size={18} />
            UAE-based software studio
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            We build <TypingWords />
            <br />
            that move your business forward.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60 lg:mx-0">
            Web apps, mobile apps, and custom ERP systems engineered for performance,
            built for the UAE market and beyond.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border-2 border-[var(--brand-teal)] px-7 py-3 font-semibold text-[var(--brand-teal)] transition-colors hover:bg-[var(--brand-teal)]/10"
            >
              View Our Work
            </Link>
          </div>

          {/* ── Stats ── */}
          {stats.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="text-3xl font-bold text-[var(--brand-teal)]">
                    <CountUp value={s.value} />
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: real product screenshot in a browser frame ── */}
        <Reveal delay={0.15} className="relative">
          <div className="rounded-xl shadow-[0_0_40px_rgba(42,154,164,0.3)] lg:[transform:perspective(1000px)_rotateY(-5deg)]">
            <BrowserFrame url="ddotsmediajobs.com">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/projects/ddotsmediajobs.png"
                  alt="Ddotsmedia Jobs — a live product we built"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-left-top"
                />
              </div>
            </BrowserFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
