import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const TIERS: {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  popular?: boolean;
}[] = [
  {
    name: "Starter",
    price: "AED 5,000",
    blurb: "For small sites & MVPs",
    features: ["Up to 5 pages / screens", "Responsive design", "Contact form & basic SEO", "~2 weeks delivery", "1 month support"],
  },
  {
    name: "Professional",
    price: "AED 15,000",
    blurb: "For growing products",
    popular: true,
    features: ["Custom web or mobile app", "CMS / admin panel", "API & 3rd-party integrations", "Auth & dashboards", "3 months support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For large-scale platforms",
    features: ["ERP & complex platforms", "Dedicated team", "SLA & priority support", "Cloud & DevOps setup", "Ongoing partnership"],
  },
];

export function PricingTeaser() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            Transparent Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Pricing that fits your stage
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Starting points to guide your budget — every project is quoted to scope.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-[#111827] p-7",
                  t.popular
                    ? "border-[var(--brand-teal)] shadow-[0_0_40px_-12px_var(--brand-teal)]"
                    : "border-[#1e2d42]",
                )}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--brand-teal)] px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                <p className="text-sm text-white/50">{t.blurb}</p>
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-widest text-white/40">Starting from</span>
                  <p className="text-3xl font-bold text-[var(--brand-teal)]">{t.price}</p>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-teal)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={cn(
                    "mt-7 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all",
                    t.popular
                      ? "bg-[var(--brand-teal)] text-white shadow-lg shadow-[var(--brand-teal)]/25 hover:-translate-y-0.5"
                      : "border border-white/20 text-white/90 hover:border-white/50",
                  )}
                >
                  Contact for Details
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
