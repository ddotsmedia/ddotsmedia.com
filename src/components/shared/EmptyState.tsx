import Link from "next/link";
import { FourDotLogo } from "./FourDotLogo";

export function EmptyState({
  title,
  message,
  cta,
}: {
  title: string;
  message: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
      <FourDotLogo size={40} />
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-white/50">{message}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-6 rounded-full bg-[var(--brand-teal)] px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
