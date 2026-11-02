/** Infinite CSS marquee of client/partner names (pauses on reduced-motion). */
export function TrustBar({ names }: { names: string[] }) {
  const list = names;
  return (
    <section className="border-y border-white/[0.06] bg-[#0d1420] py-10">
      <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35">
        Trusted by businesses across the UAE & GCC
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-3">
          {[...list, ...list].map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-[#1e2d42] bg-[#111827] px-5 py-2 text-sm font-medium text-white/60 transition-colors hover:border-[var(--brand-teal)]/40 hover:text-white/85"
              aria-hidden={i >= list.length}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
