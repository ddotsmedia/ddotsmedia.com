import { LifeBuoy, MapPin, Users, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const REASONS: { icon: LucideIcon; title: string; body: string; num: string }[] = [
  {
    num: "01",
    icon: MapPin,
    title: "UAE Market Experts",
    body: "Deep local knowledge — from WPS payroll to GCC compliance — so your product fits the market from day one.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Agile Delivery",
    body: "Ship in weeks, not months. Iterative sprints with regular demos mean you always see real progress.",
  },
  {
    num: "03",
    icon: Users,
    title: "Full-Stack Team",
    body: "Design, web, mobile, and DevOps under one roof — no hand-offs, one accountable team.",
  },
  {
    num: "04",
    icon: LifeBuoy,
    title: "Post-Launch Support",
    body: "We don't disappear at launch. Monitoring, updates, and clear SLAs keep your product running.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#0d1420] py-24">
      {/* Subtle glow accents */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(42,154,164,0.12), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(42,154,164,0.08), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Built to deliver, built to last
            </h2>
            <p className="mt-4 text-base text-white/55 sm:text-lg">
              A senior team, a proven process, and 10 years of building products across the GCC.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)]/60 hover:shadow-[0_0_40px_-16px_var(--brand-teal)]">
                {/* Number watermark */}
                <span className="absolute right-5 top-4 font-display text-5xl font-bold text-white/[0.04] select-none">
                  {r.num}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-teal)]/25 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] transition-colors group-hover:border-[var(--brand-teal)]/50 group-hover:bg-[var(--brand-teal)]/15">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
