const TECH = [
  "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Flutter", "Docker",
  "Nginx", "Python", "Tailwind", "AWS", "Prisma", "MongoDB", "Redis",
];

/** Infinite reverse marquee of technology badges. */
export function TechMarquee() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        Our Technology Stack
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-reverse gap-3">
          {[...TECH, ...TECH].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#1e2d42] bg-[#111827] px-4 py-2 text-sm font-medium text-white/70"
              aria-hidden={i >= TECH.length}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-teal)]" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
