import { getPayloadClient, safeQuery } from "@/lib/payload";
import { mediaUrl } from "@/lib/media";
import { iconByName } from "@/lib/icons";
import { toSlug } from "@/lib/slugify";
import { SERVICES } from "@/lib/data/services";
import type { Service as UIService } from "@/lib/data/services";
import {
  TEAM_FALLBACK,
  INDUSTRIES_FALLBACK,
  PRICING_FALLBACK,
  FAQ_SERVICES_FALLBACK,
  PROCESS_FALLBACK,
  ACHIEVEMENTS_FALLBACK,
  TESTIMONIALS_FALLBACK,
  TRUST_FALLBACK,
  type UITeamMember,
  type UIIndustry,
  type UIPricing,
  type UIFaq,
  type UIProcessStep,
  type UIAchievement,
  type UITestimonial,
} from "@/lib/fallbacks";

export type {
  UITeamMember,
  UIIndustry,
  UIPricing,
  UIFaq,
  UIProcessStep,
  UIAchievement,
  UITestimonial,
};

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

/* ----------------------------------------------------------------------------
 * Loaders. Semantics:
 *   - DB reachable + data        -> the real array
 *   - DB reachable + empty       -> []  (caller hides the section)
 *   - DB UNREACHABLE (throws)    -> the static fallback (safety net only)
 * -------------------------------------------------------------------------- */

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
  }, SERVICES);
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
  }, TEAM_FALLBACK);
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
  }, INDUSTRIES_FALLBACK);
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
  }, PRICING_FALLBACK);
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
  }, page === "services" ? FAQ_SERVICES_FALLBACK : []);
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
  }, PROCESS_FALLBACK);
}

export async function getTrustNames(): Promise<string[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const g = await payload.findGlobal({ slug: "trust-bar" });
    return arr(g.items).map((i) => i.name ?? "").filter(Boolean);
  }, TRUST_FALLBACK);
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
  }, ACHIEVEMENTS_FALLBACK);
}

export async function getTestimonials(): Promise<UITestimonial[]> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "testimonials", sort: ["-createdAt"], limit: 3, depth: 1 });
    return res.docs.map((t): UITestimonial => ({
      quote: t.quote ?? "",
      author: t.author ?? "",
      role: t.role ?? "",
      company: t.company ?? "",
      rating: 5,
    }));
  }, TESTIMONIALS_FALLBACK);
}

export async function getCompanySettings(): Promise<UICompany | null> {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const g = await payload.findGlobal({ slug: "company-settings" });
    if (!g || (!g.companyName && !g.phone && !g.email && !g.heroHeading)) return null;
    return g as UICompany;
  }, null);
}
