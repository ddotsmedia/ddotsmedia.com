import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const INDUSTRIES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: HeartPulse, title: "Healthcare", body: "Clinics, pharmacies, and wellness platforms with booking and records." },
  { icon: Building2, title: "Real Estate", body: "Listing portals, CRM, and lead management for agencies." },
  { icon: ShoppingCart, title: "E-commerce & Retail", body: "Storefronts, POS, and inventory for online and in-store sales." },
  { icon: Landmark, title: "Government & PRO Services", body: "Compliant portals and document workflows for the public sector." },
  { icon: GraduationCap, title: "Education", body: "Learning platforms, student portals, and admissions systems." },
  { icon: Truck, title: "Trading & Logistics", body: "Supply-chain, fleet, and warehouse management tools." },
];

export function Industries({ items }: { items?: { icon: LucideIcon; title: string; body: string }[] }) {
  const data = items && items.length ? items : INDUSTRIES;
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            Industries
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Industries We Serve
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                  <ind.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{ind.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{ind.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
