import type { Stat } from "@/lib/stats";
import { CountUp } from "./CountUp";

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#0d1420]">
      {/* Subtle teal radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 120% at 50% 100%, color-mix(in srgb, var(--brand-teal) 10%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.06] px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center px-6 py-14 text-center"
          >
            <div className="text-4xl font-bold text-[var(--brand-teal)] tabular-nums md:text-5xl">
              <CountUp value={s.value} />
              {s.suffix}
            </div>
            <div className="mt-2 text-sm font-medium text-white/60">{s.label}</div>
            {/* Accent dot */}
            <span className="mt-3 h-1 w-6 rounded-full bg-[var(--brand-teal)]/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
