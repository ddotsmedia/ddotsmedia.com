"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/payload-types";
import { mediaUrl, mediaAlt } from "@/lib/media";

export function ProjectComparison({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleProject = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else if (next.size < 3) {
      next.add(id);
    }
    setSelected(next);
  };

  const selectedProjects = projects.filter((p) => selected.has(String(p.id)));
  const canSelect = selected.size < 3;

  return (
    <div className="space-y-8">
      {/* Selection Instructions */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-2 text-xl font-semibold text-white">Select Projects to Compare</h2>
        <p className="text-sm text-white/60">
          Choose 2-3 projects to compare side-by-side. Click projects below to select or deselect.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-white/60">
            {selected.size} of 3 selected
          </span>
          {selected.size > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="text-xs text-[var(--brand-teal)] hover:underline"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      {/* Project Selection Grid */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Available Projects</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const isSelected = selected.has(String(project.id));
            const cover = mediaUrl(project.coverImage, "feature");

            return (
              <button
                key={project.id}
                onClick={() => {
                  if (isSelected) {
                    toggleProject(String(project.id));
                  } else if (canSelect) {
                    toggleProject(String(project.id));
                  }
                }}
                disabled={!isSelected && !canSelect}
                className={`group relative flex flex-col overflow-hidden rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-[var(--brand-teal)] bg-[var(--brand-teal)]/10 ring-2 ring-[var(--brand-teal)]/30"
                    : canSelect
                      ? "border-white/10 bg-white/[0.03] hover:border-white/20"
                      : "border-white/5 bg-white/[0.02] opacity-50"
                }`}
              >
                {/* Checkbox indicator */}
                <div className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-md border-2 border-white/20 bg-white/5">
                  {isSelected && (
                    <span className="text-sm font-bold text-[var(--brand-teal)]">✓</span>
                  )}
                </div>

                {/* Cover Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-navy/40">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={mediaAlt(project.coverImage) || project.title || "Project"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl font-bold text-white/15">
                      {(project.title ?? "Project").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-base font-semibold text-white group-hover:text-[var(--brand-teal)]">
                    {project.title}
                  </h3>
                  {project.shortDescription && (
                    <p className="line-clamp-2 text-xs text-white/60">{project.shortDescription}</p>
                  )}
                  <span className="mt-auto text-xs text-white/40">{project.category}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedProjects.length >= 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Comparison</h3>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="border-r border-white/10 px-4 py-3 text-left font-semibold text-white/80">
                    Property
                  </th>
                  {selectedProjects.map((project) => (
                    <th key={project.id} className="px-4 py-3 text-left font-semibold text-white">
                      {project.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Category */}
                <tr className="border-b border-white/10 hover:bg-white/[0.02]">
                  <td className="border-r border-white/10 px-4 py-3 font-medium text-white/60">
                    Category
                  </td>
                  {selectedProjects.map((project) => (
                    <td key={project.id} className="px-4 py-3 text-white/80">
                      {project.category || "Web"}
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr className="border-b border-white/10 hover:bg-white/[0.02]">
                  <td className="border-r border-white/10 px-4 py-3 font-medium text-white/60">
                    Description
                  </td>
                  {selectedProjects.map((project) => (
                    <td key={project.id} className="px-4 py-3 text-sm text-white/70">
                      {project.shortDescription || "—"}
                    </td>
                  ))}
                </tr>

                {/* Technologies */}
                <tr className="border-b border-white/10 hover:bg-white/[0.02]">
                  <td className="border-r border-white/10 px-4 py-3 font-medium text-white/60">
                    Technologies
                  </td>
                  {selectedProjects.map((project) => (
                    <td key={project.id} className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(project.techStack ?? []).map((t) => (
                          <span
                            key={t.tech}
                            className="inline-block rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/60"
                          >
                            {t.tech}
                          </span>
                        ))}
                        {(!project.techStack || project.techStack.length === 0) && (
                          <span className="text-xs text-white/40">None specified</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Date Created */}
                <tr className="border-b border-white/10 hover:bg-white/[0.02]">
                  <td className="border-r border-white/10 px-4 py-3 font-medium text-white/60">
                    Created
                  </td>
                  {selectedProjects.map((project) => (
                    <td key={project.id} className="px-4 py-3 text-white/80">
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                  ))}
                </tr>

                {/* Featured Status */}
                <tr className="border-b border-white/10 hover:bg-white/[0.02]">
                  <td className="border-r border-white/10 px-4 py-3 font-medium text-white/60">
                    Featured
                  </td>
                  {selectedProjects.map((project) => (
                    <td key={project.id} className="px-4 py-3 text-white/80">
                      {project.featured ? (
                        <span className="inline-block rounded-md bg-[var(--brand-teal)]/20 px-2 py-1 text-xs font-medium text-[var(--brand-teal)]">
                          ★ Featured
                        </span>
                      ) : (
                        <span className="text-xs text-white/40">Regular</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* View Project Links */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="border-r border-white/10 px-4 py-3 font-medium text-white/60">
                    Action
                  </td>
                  {selectedProjects.map((project) => (
                    <td key={project.id} className="px-4 py-3">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-block text-xs text-[var(--brand-teal)] hover:underline"
                      >
                        View Details →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedProjects.length < 2 && (
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-white/60">
            Select at least 2 projects to see the comparison table.
          </p>
        </div>
      )}
    </div>
  );
}
