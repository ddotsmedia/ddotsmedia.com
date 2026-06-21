import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/payload-types";
import { mediaAlt, mediaUrl } from "@/lib/media";

const categoryColor: Record<string, string> = {
  Web: "var(--brand-teal)",
  iOS: "var(--brand-accent-orange)",
  Android: "var(--brand-accent-green)",
  Desktop: "var(--brand-accent-yellow)",
  ERP: "var(--brand-accent-orange)",
};

export function ProjectCard({ project }: { project: Project }) {
  // Use the landscape "feature" size (not the portrait "card" crop) so the full
  // width of the captured page shows; next/image downscales per `sizes`.
  const cover = mediaUrl(project.coverImage, "feature");
  const tags = (project.techStack ?? []).map((t) => t.tech).filter(Boolean).slice(0, 4);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-navy/40">
        {cover ? (
          <Image
            src={cover}
            alt={mediaAlt(project.coverImage) || project.title || "Project"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-left-top origin-top-left transition-transform duration-500 group-hover:scale-105"
            style={{ viewTransitionName: `project-cover-${project.id}` }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-white/15">
            {(project.title ?? "Project").slice(0, 2).toUpperCase()}
          </div>
        )}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur"
          style={{ backgroundColor: categoryColor[project.category ?? "Web"] ?? "var(--brand-teal)" }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[var(--brand-teal)]">
          {project.title}
        </h3>
        {project.shortDescription && (
          <p className="line-clamp-2 text-sm text-white/60">{project.shortDescription}</p>
        )}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
