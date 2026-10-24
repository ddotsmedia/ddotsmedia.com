import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const PROMISES = [
  "Free consultation",
  "Fixed-price quotes",
  "Reply within 2 hours",
];

export function HomeCta() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[var(--brand-teal)]/25 px-6 py-16 text-center sm:px-12"
          style={{
            background: "var(--brand-navy)",
          }}
        >
          {/* Glow top */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--brand-teal) 60%, transparent), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 70% at 50% 0%, color-mix(in srgb, var(--brand-teal) 22%, transparent), transparent)",
            }}
          />
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
              Start Today
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Ready to build something great?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Tell us what you need — we&apos;ll scope it, price it, and ship it on time.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-white/55">
              {PROMISES.map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--brand-teal)]" />
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-all hover:-translate-y-0.5 hover:shadow-[var(--brand-teal)]/40"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white/90 transition-colors hover:border-white/50"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
