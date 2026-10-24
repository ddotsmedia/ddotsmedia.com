import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import type { UITestimonial } from "@/lib/fallbacks";

export function Testimonials({ items }: { items: UITestimonial[] }) {
  const data = items;

  return (
    <section className="relative overflow-hidden bg-[#0d1420] py-24">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, color-mix(in srgb, var(--brand-teal) 8%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            What our clients say
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/55">
            Real feedback from the businesses we&apos;ve helped build and grow.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.map((t, i) => (
            <Reveal key={`${t.author}-${i}`} delay={i * 0.08}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)]/40 hover:shadow-[0_0_36px_-16px_var(--brand-teal)]">
                {/* Decorative quote mark */}
                <Quote
                  className="absolute right-5 top-5 h-10 w-10 rotate-180 text-[var(--brand-teal)]/8"
                  aria-hidden
                />
                <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4"
                      style={{
                        color: "var(--brand-accent-yellow)",
                        fill: s < t.rating ? "var(--brand-accent-yellow)" : "transparent",
                      }}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/75">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-white/55">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
