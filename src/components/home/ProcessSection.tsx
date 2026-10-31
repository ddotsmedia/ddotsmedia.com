import { Search, PenTool, Code2, Rocket, LifeBuoy, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import type { UIProcessStep } from "@/lib/fallbacks";

// Fallback steps used only when no CMS data is available
const FALLBACK_STEPS = [
  {
    num: "01",
    icon: Search as LucideIcon,
    label: "Discovery",
    description:
      "We learn your business, audience, and goals. Scope, timeline, and budget are agreed upfront — no surprises.",
  },
  {
    num: "02",
    icon: PenTool as LucideIcon,
    label: "Design",
    description:
      "Wire-frames and high-fidelity UI prototypes in your brand style. You approve before a single line of code is written.",
  },
  {
    num: "03",
    icon: Code2 as LucideIcon,
    label: "Build",
    description:
      "Iterative two-week sprints with live demos. Full-stack engineering, CI/CD pipelines, and automated tests.",
  },
  {
    num: "04",
    icon: Rocket as LucideIcon,
    label: "Launch",
    description:
      "Zero-downtime deployment, performance tuning, SEO basics, and a handover session so your team is confident.",
  },
  {
    num: "05",
    icon: LifeBuoy as LucideIcon,
    label: "Support",
    description:
      "Ongoing monitoring, updates, and clear SLAs. We stay reachable — not just until go-live.",
  },
];

interface Props {
  steps?: UIProcessStep[];
}

export function ProcessSection({ steps }: Props) {
  const displaySteps = (steps && steps.length > 0 ? steps : FALLBACK_STEPS).map((s, i) => ({
    num: String(i + 1).padStart(2, "0"),
    icon: s.icon,
    label: s.label,
    description: s.description,
  }));

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
              How We Work
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A clear path from idea to launch
            </h2>
            <p className="mt-4 text-base text-white/55">
              Five repeatable steps that keep every project on time, on budget, and on brief.
            </p>
          </div>
        </Reveal>

        {/* Step cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {displaySteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.07}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)]/50 hover:shadow-[0_0_32px_-12px_var(--brand-teal)]">
                {/* Faint step number watermark */}
                <span className="absolute right-4 top-3 select-none font-display text-5xl font-bold text-white/[0.04]">
                  {step.num}
                </span>
                {/* Icon */}
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-teal)]/25 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] transition-colors group-hover:border-[var(--brand-teal)]/50 group-hover:bg-[var(--brand-teal)]/15">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
