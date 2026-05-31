import Link from "next/link";
import type { Project } from "@/payload-types";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
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
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
