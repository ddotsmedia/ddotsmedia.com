import { getPayloadClient, safeQuery } from "@/lib/payload";
import { mediaUrl } from "@/lib/media";
import { iconByName } from "@/lib/icons";
import { toSlug } from "@/lib/slugify";
import type { Service as UIService } from "@/lib/data/services";
import type { LucideIcon } from "lucide-react";

/* ---------- shared UI shapes (match the static fallback data) ---------- */
export type UITeamMember = { name: string; role: string; initials: string; accent: string; avatar?: string };
export type UIIndustry = { icon: LucideIcon; title: string; body: string };
export type UIPricing = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
};
export type UIFaq = { q: string; a: string };
export type UIProcessStep = { label: string; description: string; icon: LucideIcon };
export type UIAchievement = { value?: number; suffix?: string; text?: string; label: string };
export type UICompany = {
  companyName?: string | null;
  tagline?: string | null;
  heroHeading?: string | null;
  heroSubtext?: string | null;
  phone?: string | null;
  email?: string | null;
  whatsappNumber?: string | null;
  address?: string | null;
  officeHours?: string | null;
  responseTime?: string | null;
  socialLinks?: { linkedin?: string | null; twitter?: string | null; instagram?: string | null; github?: string | null } | null;
};

const ACCENTS = [
  "var(--brand-teal)",
  "var(--brand-accent-orange)",
  "var(--brand-accent-green)",
  "#3dbac6",
  "var(--brand-accent-yellow)",
];

/** Best-effort plain-text paragraphs from a Lexical richText value. */
function lexicalToParagraphs(rt: unknown): string[] {
  const root = (rt as { root?: { children?: unknown[] } })?.root;
  if (!root?.children) return [];
  const paras: string[] = [];
  for (const node of root.children as Array<{ children?: Array<{ text?: string }> }>) {
    const text = (node.children ?? []).map((c) => c.text ?? "").join("").trim();
    if (text) paras.push(text);
  }
  return paras;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const arr = <T,>(v: T[] | null | undefined): T[] => (Array.isArray(v) ? v : []);
const vals = (a: { value?: string | null }[] | null | undefined): string[] =>
  arr(a).map((x) => x.value ?? "").filter(Boolean);

/* ---------- loaders (empty / null => caller uses static fallback) ---------- */

export async function getServices(): Promise<UIService[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "services", sort: ["order"], limit: 50, depth: 1 });
    return res.docs.map((d): UIService => {
      const longDescription = lexicalToParagraphs(d.longDescription);
      return {
        slug: d.slug ?? toSlug(d.title ?? ""),
        title: d.title ?? "",
        description: d.shortDescription ?? "",
        icon: iconByName(d.icon),
        tech: vals(d.techStack),
        accent: d.color || "var(--brand-teal)",
        featured: !!d.screenshot,
        screenshot: mediaUrl(d.screenshot, "feature") ?? undefined,
        longDescription: longDescription.length ? longDescription : d.shortDescription ? [d.shortDescription] : [],
        features: vals(d.features),
      };
    });
  }, []);
}

export async function getTeam(): Promise<UITeamMember[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "team-members", sort: ["order"], limit: 50, depth: 1 });
    return res.docs.map((d, i): UITeamMember => ({
      name: d.name ?? "",
      role: d.role ?? "",
      initials: initialsOf(d.name ?? ""),
      accent: ACCENTS[i % ACCENTS.length],
      avatar: mediaUrl(d.avatar, "thumbnail") ?? undefined,
    }));
  }, []);
}

export async function getIndustries(): Promise<UIIndustry[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "industries", sort: ["order"], limit: 50 });
    return res.docs.map((d): UIIndustry => ({
      icon: iconByName(d.icon, iconByName("HeartPulse")),
      title: d.title ?? "",
      body: d.description ?? "",
    }));
  }, []);
}

export async function getPricing(): Promise<UIPricing[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "pricing-tiers", sort: ["order"], limit: 20 });
    return res.docs.map((d): UIPricing => ({
      name: d.name ?? "",
      price: d.price ?? "",
      blurb: d.priceLabel && d.priceLabel !== "Starting from" ? d.priceLabel : "",
      features: vals(d.features),
      popular: !!d.highlighted,
      ctaText: d.ctaText ?? "Contact for Details",
      ctaLink: d.ctaLink ?? "/contact",
    }));
  }, []);
}

export async function getFaqs(page: "services" | "about" | "general"): Promise<UIFaq[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "faq-items",
      where: { page: { equals: page } },
      sort: ["order"],
      limit: 50,
    });
    return res.docs.map((d): UIFaq => ({ q: d.question ?? "", a: d.answer ?? "" }));
  }, []);
}

export async function getProcessSteps(): Promise<UIProcessStep[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const g = await payload.findGlobal({ slug: "process-steps" });
    return arr(g.items).map((s): UIProcessStep => ({
      label: s.title ?? "",
      description: s.description ?? "",
      icon: iconByName(s.icon, iconByName("Search")),
    }));
  }, []);
}

export async function getTrustNames(): Promise<string[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const g = await payload.findGlobal({ slug: "trust-bar" });
    return arr(g.items).map((i) => i.name ?? "").filter(Boolean);
  }, []);
}

export async function getAchievements(): Promise<UIAchievement[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const g = await payload.findGlobal({ slug: "stats" });
    return arr(g.items).map((s): UIAchievement => ({
      value: typeof s.value === "number" ? s.value : undefined,
      suffix: s.suffix ?? "",
      label: s.label ?? "",
    }));
  }, []);
}

export async function getCompanySettings(): Promise<UICompany | null> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const g = await payload.findGlobal({ slug: "company-settings" });
    // Treat an all-empty global as "not configured" so callers use fallback.
    if (!g || (!g.companyName && !g.phone && !g.email && !g.heroHeading)) return null;
    return g as UICompany;
  }, null);
}
