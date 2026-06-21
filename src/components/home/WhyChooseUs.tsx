import { LifeBuoy, MapPin, Users, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MapPin,
    title: "UAE Market Experts",
    body: "Deep local knowledge — from WPS payroll to GCC compliance — so your product fits the market from day one.",
  },
  {
    icon: Zap,
    title: "Agile Delivery",
    body: "Ship in weeks, not months. Iterative sprints with regular demos mean you always see real progress.",
  },
  {
    icon: Users,
    title: "Full-Stack Team",
    body: "Design, web, mobile, and DevOps under one roof — no hand-offs, one accountable team.",
  },
  {
    icon: LifeBuoy,
    title: "Post-Launch Support",
    body: "We don't disappear at launch. Monitoring, updates, and clear SLAs keep your product running.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(135deg, #1e7a83, #2a9aa4)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Built to deliver, built to last
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
