import { getPayloadClient, safeQuery } from "@/lib/payload";
import type { Project } from "@/payload-types";
import { getServices, getAchievements, getCompanySettings, getTestimonials, getProcessSteps } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedScreenshots } from "@/components/home/FeaturedScreenshots";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustryVerticals } from "@/components/home/IndustryVerticals";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HomeCta } from "@/components/home/HomeCta";
import { Testimonials } from "@/components/home/Testimonials";

export const revalidate = 60; // ISR — revalidate every 60 s

export default async function Home() {
  const [stats, featured, services, cs, testimonials, processSteps] = await Promise.all([
    getAchievements(),
    safeQuery(async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "projects",
        where: { featured: { equals: true }, published: { equals: true } },
        sort: ["order", "-createdAt"],
        limit: 12,
        depth: 1,
      });
      return res.docs;
    }, [] as Project[]),
    getServices(),
    getCompanySettings(),
    getTestimonials(),
    getProcessSteps(),
  ]);

  return (
    <main className="min-h-screen bg-navy">
      <Hero
        stats={stats}
        ctaText={cs?.ctaButtonText || "Get a Free Quote"}
        ctaLink={cs?.ctaButtonLink || "/contact"}
      />
      <ClientLogos />
      <TechMarquee />
      {services.length > 0 && <ServicesOverview services={services} />}
      {featured.length > 0 ? (
        <FeaturedProjects projects={featured} />
      ) : (
        <FeaturedScreenshots />
      )}
      <ProcessSection steps={processSteps} />
      <IndustryVerticals />
      <WhyChooseUs />
      {testimonials.length > 0 && <Testimonials items={testimonials} />}
      <HomeCta promises={cs?.ctaPromises?.map((p) => p.text).filter(Boolean) ?? []} />
    </main>
  );
}
