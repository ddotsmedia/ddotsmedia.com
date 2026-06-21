import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { BrowserFrame } from "@/components/preview/BrowserFrame";
import type { Service } from "@/lib/data/services";
import { cn } from "@/lib/utils";

/** Full-width alternating deep-dive section per service. Renders the given list. */
export function ServiceSections({ services }: { services: Service[] }) {
  const items = services;
  return (
    <div id="service-details">
      {items.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.slug}
            className={cn("py-20", flip ? "bg-white/[0.02]" : "")}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
              {/* Visual */}
              <Reveal className={cn(flip && "lg:order-2")}>
                {s.screenshot ? (
                  <BrowserFrame url={s.screenshotUrl}>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={s.screenshot}
                        alt={`${s.title} — live project`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-left-top"
                      />
                    </div>
                  </BrowserFrame>
                ) : (
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-[#1e2d42] bg-[#111827]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{
                        background: `radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, ${s.accent} 22%, transparent), transparent)`,
                      }}
                    />
                    <s.icon className="relative h-24 w-24" style={{ color: s.accent }} />
                  </div>
                )}
              </Reveal>

              {/* Content */}
              <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{
                    color: s.accent,
                    backgroundColor: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${s.accent} 32%, transparent)`,
                  }}
                >
                  <s.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{s.title}</h2>

                <div className="mt-4 space-y-3">
                  {s.longDescription.map((p, p_i) => (
                    <p key={p_i} className="text-sm leading-relaxed text-white/65">
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: s.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex rounded-full bg-[var(--brand-teal)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
                >
                  Get a Quote
                </Link>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
