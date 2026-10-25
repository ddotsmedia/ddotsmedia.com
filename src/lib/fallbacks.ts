import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Code,
  GraduationCap,
  HeartPulse,
  Landmark,
  Palette,
  Rocket,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";

/**
 * Static fallback datasets — used ONLY as a safety net when the database is
 * unreachable (a loader's query throws). When the DB is reachable and a
 * collection is intentionally empty, loaders return [] and the page hides the
 * section instead of showing this data.
 */

export type UITeamMember = { name: string; role: string; initials: string; accent: string; avatar?: string };
export type UIIndustry = { icon: LucideIcon; title: string; body: string };
export type UIPricing = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaLink?: string;
};
export type UIFaq = { q: string; a: string };
export type UIProcessStep = { label: string; description: string; icon: LucideIcon };
export type UIAchievement = { value?: number; suffix?: string; text?: string; label: string };
export type UITestimonial = { quote: string; author: string; role: string; company: string; rating: number };

// Empty until team members are added via Payload CMS admin
export const TEAM_FALLBACK: UITeamMember[] = [];

export const INDUSTRIES_FALLBACK: UIIndustry[] = [
  { icon: HeartPulse, title: "Healthcare", body: "Clinics, pharmacies, and wellness platforms with booking and records." },
  { icon: Building2, title: "Real Estate", body: "Listing portals, CRM, and lead management for agencies." },
  { icon: ShoppingCart, title: "E-commerce & Retail", body: "Storefronts, POS, and inventory for online and in-store sales." },
  { icon: Landmark, title: "Government & PRO Services", body: "Compliant portals and document workflows for the public sector." },
  { icon: GraduationCap, title: "Education", body: "Learning platforms, student portals, and admissions systems." },
  { icon: Truck, title: "Trading & Logistics", body: "Supply-chain, fleet, and warehouse management tools." },
];

export const PRICING_FALLBACK: UIPricing[] = [
  {
    name: "Starter",
    price: "AED 5,000",
    blurb: "For small sites & MVPs",
    features: ["Up to 5 pages / screens", "Responsive design", "Contact form & basic SEO", "~2 weeks delivery", "1 month support"],
  },
  {
    name: "Professional",
    price: "AED 15,000",
    blurb: "For growing products",
    popular: true,
    features: ["Custom web or mobile app", "CMS / admin panel", "API & 3rd-party integrations", "Auth & dashboards", "3 months support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For large-scale platforms",
    features: ["ERP & complex platforms", "Dedicated team", "SLA & priority support", "Cloud & DevOps setup", "Ongoing partnership"],
  },
];

export const FAQ_SERVICES_FALLBACK: UIFaq[] = [
  {
    q: "How long does a project take?",
    a: "Most websites take 2–4 weeks; mobile apps and ERP systems run 6–12 weeks depending on scope. We share a clear timeline before we start.",
  },
  {
    q: "What technologies do you use?",
    a: "Primarily Next.js, React, React Native, Node.js, PostgreSQL, and Docker — chosen for performance and long-term maintainability.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Every project includes a support window, and we offer ongoing maintenance plans with monitoring, backups, and updates.",
  },
  {
    q: "Can you work with existing code?",
    a: "Absolutely. We regularly audit, refactor, and extend existing codebases as well as build new products from scratch.",
  },
  {
    q: "How does pricing work?",
    a: "We scope each project and quote a fixed price or milestone-based plan. The pricing section above shows typical starting points.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — we're happy to sign an NDA before discussing any sensitive details of your project.",
  },
];

export const PROCESS_FALLBACK: UIProcessStep[] = [
  { label: "Discover", description: "We map your goals, users, and constraints.", icon: Search },
  { label: "Design", description: "Wireframes and UI that put the user first.", icon: Palette },
  { label: "Develop", description: "Clean, tested, production-grade code.", icon: Code },
  { label: "Deploy", description: "Ship, monitor, and iterate with confidence.", icon: Rocket },
];

export const ACHIEVEMENTS_FALLBACK: UIAchievement[] = [];

export const TESTIMONIALS_FALLBACK: UITestimonial[] = [];

export const TRUST_FALLBACK: string[] = [];
