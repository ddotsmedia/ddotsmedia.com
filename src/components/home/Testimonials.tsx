import { Star } from "lucide-react";
import type { Testimonial } from "@/payload-types";
import { Reveal } from "@/components/shared/Reveal";

type Item = { quote: string; author: string; role: string; company: string; rating: number };

const FALLBACK: Item[] = [
  {
    quote: "Ddotsmedia rebuilt our job portal and traffic doubled within three months. The team just gets the UAE market.",
    author: "Khalid Rahman",
    role: "Operations Director",
    company: "GulfHire",
    rating: 5,
  },
  {
    quote: "Their ERP cut our monthly closing from five days to one. Genuinely transformative for our finance team.",
    author: "Sara Al Mansoori",
    role: "CFO",
    company: "Al Noor Trading",
    rating: 5,
  },
  {
    quote: "Responsive, professional, and they actually understand local business. Easily our best development partner.",
    author: "Vikram Patel",
    role: "Founder",
    company: "DeltaRetail",
    rating: 5,
  },
];

export function Testimonials({ items }: { items: Testimonial[] }) {
  const data: Item[] =
    items.length > 0
      ? items.slice(0, 3).map((t) => ({
          quote: t.quote,
          author: t.author,
          role: t.role ?? "",
          company: t.company ?? "",
          rating: 5,
        }))
      : FALLBACK;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            What our clients say
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.map((t, i) => (
            <Reveal key={`${t.author}-${i}`} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6">
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
