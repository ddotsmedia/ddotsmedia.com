/** Ddotsmedia four-dot motif. */
export function FourDotLogo({ size = 28 }: { size?: number }) {
  const d = size * 0.34;
  const gap = size * 0.06;
  const dot = (color: string) => (
    <span style={{ width: d, height: d, backgroundColor: color }} className="rounded-full" />
  );
  return (
    <span
      className="inline-grid"
      style={{ gridTemplateColumns: `${d}px ${d}px`, gap, width: size, height: size }}
      aria-hidden
    >
      {dot("var(--brand-teal)")}
      {dot("var(--brand-accent-yellow)")}
      {dot("var(--brand-accent-orange)")}
      {dot("var(--brand-accent-green)")}
    </span>
  );
}
