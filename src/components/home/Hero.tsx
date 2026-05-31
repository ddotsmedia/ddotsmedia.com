import Link from "next/link";
import { FourDotLogo } from "@/components/shared/FourDotLogo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--brand-teal) 35%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/70">
          <FourDotLogo size={18} />
          UAE-based software studio
        </div>
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          We build software that{" "}
          <span className="text-[var(--brand-teal)]">moves business forward</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          Web apps, mobile apps, and custom ERP systems engineered for performance,
          built for the UAE market and beyond.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/15 px-7 py-3 font-semibold text-white/90 transition-colors hover:border-white/40"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
