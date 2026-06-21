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

export const TEAM_FALLBACK: UITeamMember[] = [
  { name: "Mohammed Al Rashid", role: "CEO", initials: "MA", accent: "var(--brand-teal)" },
  { name: "Priya Nair", role: "Lead Developer", initials: "PN", accent: "var(--brand-accent-orange)" },
  { name: "Omar Hassan", role: "UI/UX Designer", initials: "OH", accent: "var(--brand-accent-green)" },
  { name: "Aisha Karimi", role: "Project Manager", initials: "AK", accent: "#3dbac6" },
];

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

export const ACHIEVEMENTS_FALLBACK: UIAchievement[] = [
  { value: 150, suffix: "+", label: "Projects" },
  { value: 80, suffix: "+", label: "Clients" },
  { value: 50, suffix: "+", label: "Enterprise Apps" },
  { value: 9, suffix: "+", label: "Years" },
  { value: 12, suffix: "+", label: "Countries" },
  { text: "24/7", label: "Support" },
];

export const TESTIMONIALS_FALLBACK: UITestimonial[] = [
  {
    quote: "Ddotsmedia rebuilt our job portal and traffic doubled within three months. The team just gets the UAE market.",
    author: "Khalid Rahman",
    role: "Operations Director",
    company: "GulfHire",
    rating: 5,
  },
  {
    quote: "Their ERP cut our monthly closing from five days to one. Genuinely transformative for our finance team.",
    author: "Sara Al Mansoori",
    role: "CFO",
    company: "Al Noor Trading",
    rating: 5,
  },
  {
    quote: "Responsive, professional, and they actually understand local business. Easily our best development partner.",
    author: "Vikram Patel",
    role: "Founder",
    company: "DeltaRetail",
    rating: 5,
  },
];

export const TRUST_FALLBACK: string[] = [
  "Dubai Municipality",
  "ADNOC",
  "Sharjah Media City",
  "DubaiSME",
  "RAKEZ",
  "SHAMS",
  "Ajman Free Zone",
  "Dubai Silicon Oasis",
  "Abu Dhabi SME Hub",
  "UAE Ministry of Economy",
];
