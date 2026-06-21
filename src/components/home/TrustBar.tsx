/** Infinite CSS marquee of client/partner names (pauses on reduced-motion). */
export function TrustBar({ names }: { names: string[] }) {
  const list = names;
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        Trusted by businesses across the UAE
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[...list, ...list].map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-[#1e2d42] bg-[#111827] px-5 py-2 text-sm font-medium text-white/70"
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
