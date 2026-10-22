export const dynamic = "force-dynamic";

import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { ProjectComparison } from "@/components/portfolio/ProjectComparison";

export const metadata = {
  title: "Compare Projects",
  description: "Compare 2-3 projects side-by-side to see their features, technologies, and details.",
};

export default async function CompareProjectsPage() {
  const payload = await getPayload({ config: configPromise });

  const projects = await payload.find({
    collection: "projects",
    limit: 1000,
  });

  return (
    <main className="min-h-screen bg-navy px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white sm:text-5xl">Compare Projects</h1>
          <p className="text-lg text-white/60">
            Select and compare projects side-by-side to view their details and technologies
          </p>
        </div>

        {/* Comparison Tool */}
        <ProjectComparison projects={projects.docs} />
      </div>
    </main>
  );
}
