import type { Stat } from "@/lib/stats";
import { CountUp } from "./CountUp";

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-bold text-[var(--brand-teal)] md:text-5xl">
              <CountUp value={s.value} />
              {s.suffix}
            </div>
            <div className="mt-2 text-sm text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
