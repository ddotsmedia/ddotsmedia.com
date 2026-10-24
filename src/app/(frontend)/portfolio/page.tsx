export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project } from "@/payload-types";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PORTFOLIO } from "@/lib/data/portfolio";

/** Map static fallback data → Project shape so PortfolioGrid always works */
const STATIC_PROJECTS: Project[] = PORTFOLIO.map((item, i) => ({
  id: -(i + 1), // negative IDs signal static data
  liveUrl: item.url,
  title: item.title,
  slug: item.name,
  category: item.category,
  shortDescription: item.description,
  techStack: (item.tags ?? []).map((tech, j) => ({ tech, id: String(j) })),
  featured: i < 2, // first two shown as featured
  order: i,
  updatedAt: "2024-01-01T00:00:00.000Z",
  createdAt: "2024-01-01T00:00:00.000Z",
}));

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
    <main className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, color-mix(in srgb, var(--brand-teal) 30%, transparent), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            Our Work
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-6xl md:text-7xl">
            Portfolio
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
            Real software, real businesses — web apps, mobile apps, ERPs, and more built across the UAE and GCC.
          </p>
          <div className="mx-auto mt-10 grid max-w-xs grid-cols-3 gap-4 sm:max-w-sm">
            {[
              { value: "150+", label: "Projects" },
              { value: "80+", label: "Clients" },
              { value: "10+", label: "Years" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[var(--brand-teal)] sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PortfolioGrid projects={projects.length > 0 ? projects : STATIC_PROJECTS} />
        </div>
      </section>
    </main>
  );
}
