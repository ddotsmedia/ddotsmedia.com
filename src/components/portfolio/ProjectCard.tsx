import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/payload-types";
import { mediaAlt, mediaUrl } from "@/lib/media";

const categoryMeta: Record<string, { color: string; bg: string; label: string }> = {
  Web:     { color: "var(--brand-teal)",          bg: "rgba(20,184,166,0.15)",  label: "🌐 Web" },
  iOS:     { color: "var(--brand-accent-orange)",  bg: "rgba(249,115,22,0.15)", label: "📱 iOS" },
  Android: { color: "var(--brand-accent-green)",   bg: "rgba(34,197,94,0.15)",  label: "🤖 Android" },
  Desktop: { color: "var(--brand-accent-yellow)",  bg: "rgba(234,179,8,0.15)",  label: "🖥️ Desktop" },
  ERP:     { color: "var(--brand-accent-orange)",  bg: "rgba(249,115,22,0.15)", label: "⚙️ ERP" },
};

export function ProjectCard({
  project,
  viewMode = "grid",
}: {
  project: Project;
  viewMode?: "grid" | "list";
}) {
  const cover = mediaUrl(project.coverImage, "feature");
  const tags = (project.techStack ?? []).map((t) => t.tech).filter(Boolean).slice(0, 4);
  const cat = categoryMeta[project.category ?? "Web"] ?? categoryMeta.Web;
  const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;

  /* ── GRID VIEW ──────────────────────────────────────────── */
  if (viewMode === "grid") {
    return (
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300
          hover:-translate-y-2 hover:border-white/20"
        style={{
          "--cat-color": cat.color,
        } as React.CSSProperties}
      >
        {/* Glow ring on hover */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `0 0 0 1.5px ${cat.color}55, 0 8px 40px ${cat.color}22` }}
        />

        {/* Top accent bar (category color) */}
        <span
          className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: cat.color }}
        />

        {/* Screenshot area */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#0a1628]">
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
            <div
              className="flex h-full items-center justify-center text-5xl font-bold"
              style={{ color: `${cat.color}30` }}
            >
              {(project.title ?? "Project").slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Hover overlay — slides up from bottom */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
            <span className="translate-y-4 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
              View Case Study →
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="translate-y-4 rounded-full px-3.5 py-1.5 text-xs font-medium text-white transition-all duration-300 group-hover:translate-y-0"
                style={{ background: cat.color, transitionDelay: "40ms" }}
              >
                ↗ Visit Live Site
              </a>
            )}
          </div>

          {/* Category badge */}
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.color}40` }}
          >
            {cat.label}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-base font-semibold text-white transition-colors duration-200 group-hover:text-[var(--brand-teal)]">
            {project.title}
          </h3>
          {project.shortDescription && (
            <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
              {project.shortDescription}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-end justify-between pt-3">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/45 transition-colors duration-200 group-hover:bg-white/8 group-hover:text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {year && (
              <span className="ml-2 flex-shrink-0 text-[10px] font-medium text-white/25">
                {year}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  /* ── LIST VIEW ──────────────────────────────────────────── */
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300
        hover:border-white/20"
      style={{
        "--cat-color": cat.color,
        boxShadow: undefined,
      } as React.CSSProperties}
    >
      {/* Left accent bar */}
      <span
        className="w-[3px] flex-shrink-0 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
        style={{ background: cat.color }}
      />

      {/* Thumbnail */}
      <div className="relative w-52 flex-shrink-0 overflow-hidden bg-[#0a1628]">
        {cover ? (
          <Image
            src={cover}
            alt={mediaAlt(project.coverImage) || project.title || "Project"}
            fill
            sizes="210px"
            className="object-cover object-left-top transition-transform duration-500 group-hover:scale-110"
            style={{ viewTransitionName: `project-cover-${project.id}` }}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-3xl font-bold"
            style={{ color: `${cat.color}25` }}
          >
            {(project.title ?? "Project").slice(0, 2).toUpperCase()}
          </div>
        )}
        {/* overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-2 p-4 pl-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span
              className="inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.label}
            </span>
            <h3 className="text-base font-semibold text-white transition-colors duration-200 group-hover:text-[var(--brand-teal)]">
              {project.title}
            </h3>
          </div>
          {year && <span className="flex-shrink-0 text-[10px] text-white/25">{year}</span>}
        </div>

        {project.shortDescription && (
          <p className="line-clamp-2 text-sm text-white/55">{project.shortDescription}</p>
        )}

        <div className="flex items-center justify-between gap-3">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span
            className="ml-auto flex-shrink-0 translate-x-2 text-xs font-medium opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            style={{ color: cat.color }}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
