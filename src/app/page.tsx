import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project } from "@/payload-types";
import { getStats } from "@/lib/stats";
import { getServices, getTrustNames, getTestimonials } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
// StatsRow is now consolidated into the Hero (stats below the CTAs).
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedScreenshots } from "@/components/home/FeaturedScreenshots";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
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
    getTestimonials(),
    getServices(),
    getTrustNames(),
  ]);

  return (
    <main className="min-h-screen bg-navy">
      <Hero stats={stats} />
      {trustNames.length > 0 && <TrustBar names={trustNames} />}
      {services.length > 0 && <ServicesOverview services={services} />}
      {featured.length > 0 ? (
        <FeaturedProjects projects={featured} />
      ) : (
        <FeaturedScreenshots />
      )}
      <WhyChooseUs />
      {testimonials.length > 0 && <Testimonials items={testimonials} />}
      <HomeCta />
    </main>
  );
}
