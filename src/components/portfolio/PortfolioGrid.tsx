"use client";

import { useState } from "react";
import type { Project } from "@/payload-types";
import { ProjectCard } from "./ProjectCard";

const FILTERS = ["All", "Web", "Mobile", "Desktop", "ERP"] as const;
type Filter = (typeof FILTERS)[number];

const matches = (p: Project, f: Filter): boolean => {
  if (f === "All") return true;
  if (f === "Mobile") return p.category === "iOS" || p.category === "Android";
  return p.category === f;
};

/** Client filter over server-loaded data. No fetching here. */
export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");
  const filtered = projects.filter((p) => matches(p, active));

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              active === f
                ? "bg-[var(--brand-teal)] text-white shadow-lg shadow-[var(--brand-teal)]/25"
                : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-white/40">No projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
