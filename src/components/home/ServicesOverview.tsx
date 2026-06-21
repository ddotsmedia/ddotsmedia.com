import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/lib/data/services";

/** 6 service cards (3×2) linking to /services. */
export function ServicesOverview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]">
              What We Do
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Services</h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-[var(--brand-teal)] hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{
                    color: s.accent,
                    backgroundColor: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${s.accent} 32%, transparent)`,
                  }}
                >
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-[var(--brand-teal)]">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">{s.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
