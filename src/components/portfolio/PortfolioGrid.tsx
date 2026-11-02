"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/payload-types";
import { ProjectCard } from "./ProjectCard";

const FILTERS = ["All", "Web", "Mobile", "Desktop", "ERP"] as const;
type Filter = (typeof FILTERS)[number];
type SortOption = "featured" | "newest" | "oldest" | "name";

const matches = (p: Project, f: Filter): boolean => {
  if (f === "All") return true;
  if (f === "Mobile") return p.category === "iOS" || p.category === "Android";
  return p.category === f;
};

const extractTechs = (projects: Project[]): string[] => {
  const techs = new Set<string>();
  projects.forEach((p) => {
    (p.techStack ?? []).forEach((t) => {
      if (t.tech) techs.add(t.tech);
    });
  });
  return Array.from(techs).sort();
};

const sortProjects = (projects: Project[], sort: SortOption): Project[] => {
  const copy = [...projects];
  switch (sort) {
    case "featured":
      return copy.sort((a, b) => {
        if (a.featured === b.featured) return (b.order ?? 0) - (a.order ?? 0);
        return a.featured ? -1 : 1;
      });
    case "newest":
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "oldest":
      return copy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case "name":
      return copy.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
    default:
      return copy;
  }
};

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allTechs = useMemo(() => extractTechs(projects), [projects]);

  const filtered = useMemo(() => {
    const result = projects.filter((p) => {
      if (!matches(p, active)) return false;
      if (search) {
        const term = search.toLowerCase();
        if (!(p.title ?? "").toLowerCase().includes(term) && !(p.shortDescription ?? "").toLowerCase().includes(term)) return false;
      }
      if (selectedTechs.size > 0) {
        const projTechs = (p.techStack ?? []).map((t) => t.tech).filter(Boolean);
        if (!Array.from(selectedTechs).some((t) => projTechs.includes(t))) return false;
      }
      return true;
    });
    return sortProjects(result, sort);
  }, [active, search, sort, selectedTechs, projects]);

  const featured = useMemo(() => filtered.filter((p) => p.featured), [filtered]);
  const regular = useMemo(() => filtered.filter((p) => !p.featured), [filtered]);

  const toggleTech = (tech: string) => {
    const next = new Set(selectedTechs);
    if (next.has(tech)) next.delete(tech); else next.add(tech);
    setSelectedTechs(next);
  };

  return (
    <>
      <div className="mb-8">
        <input type="text" placeholder="Search projects..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[var(--brand-teal)] focus:outline-none" />
      </div>
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${active === f ? "bg-[var(--brand-teal)] text-white" : "border border-white/10 bg-white/[0.03] text-white/60 hover:text-white"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none">
              <option value="featured">Featured First</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
              <button onClick={() => setViewMode("grid")} title="Grid"
                className={`px-3 py-1 rounded text-xs font-medium ${viewMode === "grid" ? "bg-[var(--brand-teal)] text-white" : "text-white/60"}`}>Grid</button>
              <button onClick={() => setViewMode("list")} title="List"
                className={`px-3 py-1 rounded text-xs font-medium ${viewMode === "list" ? "bg-[var(--brand-teal)] text-white" : "text-white/60"}`}>List</button>
            </div>
          </div>
        </div>
        {allTechs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTechs.slice(0, 12).map((tech) => (
              <button key={tech} onClick={() => toggleTech(tech)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${selectedTechs.has(tech) ? "bg-[var(--brand-teal)] text-white" : "border border-white/10 bg-white/5 text-white/60 hover:text-white"}`}>
                {tech}
              </button>
            ))}
            {allTechs.length > 12 && <span className="text-xs text-white/40 px-2 py-1.5">+{allTechs.length - 12} more</span>}
          </div>
        )}
      </div>
      <div className="mb-6 flex items-center justify-between text-sm text-white/60">
        <span>{filtered.length} {filtered.length === 1 ? "project" : "projects"}{search && ` matching "${search}"`}</span>
        {(search || selectedTechs.size > 0 || active !== "All") && (
          <button onClick={() => { setSearch(""); setActive("All"); setSelectedTechs(new Set()); }}
            className="text-[var(--brand-teal)] hover:underline">Clear filters</button>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-2 text-white/40">No projects found</p>
          <button onClick={() => { setSearch(""); setActive("All"); setSelectedTechs(new Set()); }}
            className="text-sm text-[var(--brand-teal)] hover:underline">Show all</button>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-4 text-2xl font-bold text-white">Featured</h2>
              <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                {featured.map((p) => <ProjectCard key={p.id} project={p} viewMode={viewMode} />)}
              </div>
            </div>
          )}
          {regular.length > 0 && (
            <div>
              {featured.length > 0 && <h2 className="mb-4 text-2xl font-bold text-white">All Projects</h2>}
              <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                {regular.map((p) => <ProjectCard key={p.id} project={p} viewMode={viewMode} />)}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
