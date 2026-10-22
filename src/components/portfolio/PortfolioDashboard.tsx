"use client";

import type { Project } from "@/payload-types";

export function PortfolioDashboard({ projects }: { projects: Project[] }) {
  // Calculate key metrics
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  // Category breakdown
  const categoryCount: Record<string, number> = {};
  projects.forEach((p) => {
    const cat = p.category || "Web";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  // Tech stack frequency
  const techFrequency: Record<string, number> = {};
  projects.forEach((p) => {
    (p.techStack ?? []).forEach((t) => {
      if (t.tech) {
        techFrequency[t.tech] = (techFrequency[t.tech] || 0) + 1;
      }
    });
  });

  const topTechs = Object.entries(techFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  // Portfolio health score
  const hasImages = projects.filter((p) => p.coverImage).length;
  const hasTechStack = projects.filter((p) => (p.techStack ?? []).length > 0).length;
  const hasDescription = projects.filter((p) => p.shortDescription).length;
  const healthScore = Math.round(
    ((hasImages + hasTechStack + hasDescription) / (totalProjects * 3)) * 100
  );

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm text-white/60">Total Projects</div>
          <div className="mt-2 text-3xl font-bold text-white">{totalProjects}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm text-white/60">Featured Projects</div>
          <div className="mt-2 text-3xl font-bold text-[var(--brand-teal)]">{featuredProjects}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm text-white/60">Categories</div>
          <div className="mt-2 text-3xl font-bold text-white">{Object.keys(categoryCount).length}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm text-white/60">Technologies</div>
          <div className="mt-2 text-3xl font-bold text-white">{Object.keys(techFrequency).length}</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">Category Distribution</h2>
        <div className="space-y-3">
          {Object.entries(categoryCount)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => {
              const percentage = (count / totalProjects) * 100;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/80">{category}</span>
                    <span className="text-xs text-white/60">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[var(--brand-teal)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Top Technologies */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">Top Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {topTechs.map(([tech, count]) => (
            <div
              key={tech}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm"
            >
              <span className="text-white/80">{tech}</span>
              <span className="rounded bg-[var(--brand-teal)]/20 px-2 py-0.5 text-xs font-medium text-[var(--brand-teal)]">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Health */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">Portfolio Health Score</h2>
        <div className="space-y-4">
          {/* Overall Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Overall Completeness</span>
              <span className="text-2xl font-bold text-[var(--brand-teal)]">{healthScore}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--brand-teal)]"
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          {/* Detail Breakdown */}
          <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Images</span>
                <span className="text-sm font-semibold text-white">
                  {hasImages}/{totalProjects}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${(hasImages / totalProjects) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Tech Stack</span>
                <span className="text-sm font-semibold text-white">
                  {hasTechStack}/{totalProjects}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${(hasTechStack / totalProjects) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Descriptions</span>
                <span className="text-sm font-semibold text-white">
                  {hasDescription}/{totalProjects}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${(hasDescription / totalProjects) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {healthScore < 100 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-6">
          <h3 className="mb-3 font-semibold text-amber-200">Improvement Suggestions</h3>
          <ul className="space-y-2 text-sm text-amber-100/80">
            {hasImages < totalProjects && (
              <li>• Add cover images to {totalProjects - hasImages} project(s) for better visual appeal</li>
            )}
            {hasTechStack < totalProjects && (
              <li>• Add technology stacks to {totalProjects - hasTechStack} project(s) for filtering</li>
            )}
            {hasDescription < totalProjects && (
              <li>• Add descriptions to {totalProjects - hasDescription} project(s) to improve SEO</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
