import type { LucideIcon } from "lucide-react";
import { Cloud, Code, Globe, LayoutDashboard, Palette, Smartphone } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tech: string[];
  /** CSS color for the icon / accent line. */
  accent: string;
  /** Large bento blocks embed a live-site screenshot in a browser frame. */
  featured?: boolean;
  screenshot?: string;
  screenshotUrl?: string;
};

/** Static services showcase data (no DB). Order drives the bento layout. */
export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "High-performance web apps and platforms — server-rendered, SEO-ready, and built to scale with your business.",
    icon: Globe,
    tech: ["Next.js", "React", "Node.js", "Postgres"],
    accent: "var(--brand-teal)",
    featured: true,
    screenshot: "/projects/ddotsmediajobs.png",
    screenshotUrl: "ddotsmediajobs.com",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description: "Native-quality iOS & Android apps from a single codebase.",
    icon: Smartphone,
    tech: ["React Native", "Expo"],
    accent: "var(--brand-accent-orange)",
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    description: "Tailored internal tools and automations that fit how you actually work.",
    icon: Code,
    tech: ["TypeScript", "Python", "APIs"],
    accent: "var(--brand-accent-green)",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Clean, conversion-focused interfaces designed around real user journeys.",
    icon: Palette,
    tech: ["Figma", "Design Systems"],
    accent: "var(--brand-accent-yellow)",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Containerised deploys, CI/CD pipelines, and observability you can trust.",
    icon: Cloud,
    tech: ["Docker", "CI/CD", "Nginx"],
    accent: "#3dbac6",
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    description:
      "End-to-end ERP for inventory, sales, HR, and accounting — role-based dashboards and reporting in one place.",
    icon: LayoutDashboard,
    tech: ["Payload", "Postgres", "Dashboards"],
    accent: "var(--brand-teal)",
    featured: true,
    screenshot: "/projects/ddotsmediaerp.png",
    screenshotUrl: "ddotsmediaerp.com",
  },
];

export type ProcessStep = {
  label: string;
  description: string;
  icon: LucideIcon;
};
