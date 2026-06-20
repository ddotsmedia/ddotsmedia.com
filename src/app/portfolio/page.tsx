import type { Metadata } from "next";
import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project } from "@/payload-types";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ScreenshotCard } from "@/components/portfolio/ScreenshotCard";
import { PORTFOLIO } from "@/lib/data/portfolio";

export const revalidate = 60; // ISR

export const metadata: Metadata = {
  title: "Portfolio — Ddotsmedia",
  description:
    "Real software we've built for UAE businesses — web apps, mobile apps, desktop tools, and ERP systems.",
};

export default async function PortfolioPage() {
  const projects = await safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "projects",
      sort: ["order", "-createdAt"],
      limit: 100,
      depth: 1,
    });
    return res.docs;
  }, [] as Project[]);

  return (
    <main className="min-h-screen bg-navy pt-28">
      <section className="border-b border-white/10 pb-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]">
            Our Work
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">Portfolio</h1>
          <p className="mx-auto max-w-xl text-lg text-white/60">
            Real solutions we&apos;ve built for real businesses.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <PortfolioGrid projects={projects} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PORTFOLIO.map((item, i) => (
                <ScreenshotCard key={item.name} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
