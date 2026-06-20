import Link from "next/link";
import { PORTFOLIO } from "@/lib/data/portfolio";
import { ScreenshotCard } from "@/components/portfolio/ScreenshotCard";

/** Homepage preview shown when the Payload DB has no featured projects. */
export function FeaturedScreenshots() {
  const items = PORTFOLIO.slice(0, 3);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]">
              Featured Work
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Recent Projects</h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-[var(--brand-teal)] hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ScreenshotCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
