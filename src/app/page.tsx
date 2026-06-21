import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project, Testimonial } from "@/payload-types";
import { getStats } from "@/lib/stats";
import { getServices, getTrustNames } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { StatsRow } from "@/components/home/StatsRow";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedScreenshots } from "@/components/home/FeaturedScreenshots";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { TechMarquee } from "@/components/home/TechMarquee";
import { HomeCta } from "@/components/home/HomeCta";

export const revalidate = 60; // ISR

export default async function Home() {
  const [stats, featured, testimonials, services, trustNames] = await Promise.all([
    getStats(),
    safeQuery(async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "projects",
        where: { featured: { equals: true } },
        sort: ["order", "-createdAt"],
        limit: 12,
        depth: 1,
      });
      return res.docs;
    }, [] as Project[]),
    safeQuery(async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({ collection: "testimonials", limit: 3, depth: 1 });
      return res.docs;
    }, [] as Testimonial[]),
    getServices(),
    getTrustNames(),
  ]);

  return (
    <main className="min-h-screen bg-navy">
      <Hero />
      <TrustBar names={trustNames} />
      <StatsRow stats={stats} />
      <ServicesOverview services={services} />
      {featured.length > 0 ? (
        <FeaturedProjects projects={featured} />
      ) : (
        <FeaturedScreenshots />
      )}
      <WhyChooseUs />
      <Testimonials items={testimonials} />
      <TechMarquee />
      <HomeCta />
    </main>
  );
}
