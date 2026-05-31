import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project } from "@/payload-types";
import { getStats } from "@/lib/stats";
import { Hero } from "@/components/home/Hero";
import { StatsRow } from "@/components/home/StatsRow";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

export const revalidate = 60; // ISR

export default async function Home() {
  const [stats, featured] = await Promise.all([
    getStats(),
    safeQuery(async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "projects",
        where: { featured: { equals: true } },
        sort: ["order", "-createdAt"],
        limit: 6,
        depth: 1,
      });
      return res.docs;
    }, [] as Project[]),
  ]);

  return (
    <main className="min-h-screen bg-navy">
      <Hero />
      <StatsRow stats={stats} />
      <FeaturedProjects projects={featured} />
    </main>
  );
}
