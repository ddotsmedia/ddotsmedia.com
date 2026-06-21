import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";

export function HomeCta() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[var(--brand-teal)]/30 px-6 py-16 text-center sm:px-12"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--brand-teal) 26%, var(--brand-navy)), var(--brand-navy))",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 90% at 50% 0%, color-mix(in srgb, var(--brand-teal) 28%, transparent), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Let&apos;s turn your idea into a product. Tell us what you need and we&apos;ll scope,
              design, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
              >
                Get Free Quote
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white/90 transition-colors hover:border-white/50"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
