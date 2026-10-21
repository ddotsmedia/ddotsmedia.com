import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project } from "@/payload-types";
import { getServices, getAchievements, getCompanySettings } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
// StatsRow is now consolidated into the Hero (stats below the CTAs).
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedScreenshots } from "@/components/home/FeaturedScreenshots";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HomeCta } from "@/components/home/HomeCta";

export const revalidate = 60; // ISR

export default async function Home() {
  const [stats, featured, services, cs] = await Promise.all([
    getAchievements(),
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
    getServices(),
    getCompanySettings(),
  ]);

  return (
    <main className="min-h-screen bg-navy">
      <Hero
        stats={stats}
        ctaText={cs?.ctaButtonText || "Get a Free Quote"}
        ctaLink={cs?.ctaButtonLink || "/contact"}
      />
      {services.length > 0 && <ServicesOverview services={services} />}
      {featured.length > 0 ? (
        <FeaturedProjects projects={featured} />
      ) : (
        <FeaturedScreenshots />
      )}
      <WhyChooseUs />
      <HomeCta />
    </main>
  );
}
