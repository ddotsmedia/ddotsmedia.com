import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import type { Service } from "@/lib/data/services";

/** Service cards (3×2) linking to /services. Renders the provided list. */
export function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="bg-[#0d1420] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
              What We Do
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Services</h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-[var(--brand-teal)] hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-xl border border-[#1e2d42] border-l-[3px] border-l-[var(--brand-teal)] bg-[#111827] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_-14px_var(--brand-teal)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-teal)]/12 text-[var(--brand-teal)]">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-[var(--brand-teal)]">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">{s.description}</p>
                {s.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
