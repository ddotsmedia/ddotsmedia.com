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
  /** 3–4 paragraph deep-dive for the individual service section. */
  longDescription: string[];
  /** 6 capability bullets. */
  features: string[];
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
    longDescription: [
      "We build fast, reliable web applications that hold up under real traffic — from marketing sites to complex SaaS platforms. Every build is server-rendered for SEO and speed.",
      "Our stack centres on Next.js and React with a typed Node and Postgres backend, so your product stays maintainable long after launch.",
      "Whether you need a customer portal, a booking system, or a high-traffic job board, we engineer for performance, accessibility, and growth.",
    ],
    features: [
      "Server-side rendering & SEO",
      "Responsive, mobile-first UI",
      "Secure auth & role-based access",
      "REST & GraphQL APIs",
      "Postgres data modelling",
      "CI/CD & monitoring",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description: "Native-quality iOS & Android apps from a single codebase.",
    icon: Smartphone,
    tech: ["React Native", "Expo"],
    accent: "var(--brand-accent-orange)",
    longDescription: [
      "Reach your customers on iOS and Android with a single, maintainable codebase — native-quality apps without doubling your budget.",
      "From offline-first data sync to push notifications and in-app payments, we cover the features modern mobile users expect.",
      "We handle the full lifecycle: design, build, store submission, and ongoing updates.",
    ],
    features: [
      "iOS & Android from one codebase",
      "Offline-first data sync",
      "Push notifications",
      "In-app payments",
      "App Store & Play submission",
      "Crash reporting & analytics",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    description: "Tailored internal tools and automations that fit how you actually work.",
    icon: Code,
    tech: ["TypeScript", "Python", "APIs"],
    accent: "var(--brand-accent-green)",
    longDescription: [
      "Off-the-shelf tools rarely fit exactly how your business runs. We build bespoke internal systems and automations around your real workflows.",
      "From data pipelines to admin dashboards and third-party integrations, we replace spreadsheets and manual steps with software that scales.",
      "Every solution is documented and handed over cleanly, so your team stays in control.",
    ],
    features: [
      "Workflow automation",
      "Custom admin dashboards",
      "Third-party integrations",
      "Data import & migration",
      "Role-based permissions",
      "Documentation & handover",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Clean, conversion-focused interfaces designed around real user journeys.",
    icon: Palette,
    tech: ["Figma", "Design Systems"],
    accent: "var(--brand-accent-yellow)",
    longDescription: [
      "Great products start with great design. We craft clean, intuitive interfaces that turn visitors into customers.",
      "Our process is research-led — we map real user journeys, prototype in Figma, and validate before a line of code is written.",
      "You get a reusable design system so your product stays consistent as it grows.",
    ],
    features: [
      "User research & journeys",
      "Wireframes & prototypes",
      "Figma design systems",
      "Accessibility (WCAG)",
      "Conversion-focused UI",
      "Design-to-dev handoff",
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Containerised deploys, CI/CD pipelines, and observability you can trust.",
    icon: Cloud,
    tech: ["Docker", "CI/CD", "Nginx"],
    accent: "#3dbac6",
    longDescription: [
      "Ship confidently with infrastructure that's automated, observable, and secure. We containerise your apps and wire up reliable deploy pipelines.",
      "From zero-downtime releases to monitoring and backups, we keep your systems running so your team can focus on product.",
      "We work with Docker, Nginx, and major cloud providers, tuned for cost and performance.",
    ],
    features: [
      "Dockerised deployments",
      "CI/CD pipelines",
      "Zero-downtime releases",
      "Monitoring & alerting",
      "Automated backups",
      "Cost optimisation",
    ],
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
    longDescription: [
      "Run your whole operation from one place. Our ERP solutions unify inventory, sales, HR, and accounting with role-based dashboards.",
      "We tailor modules to your processes — WPS-compliant payroll, multi-branch inventory, and real-time reporting included.",
      "Replace disconnected spreadsheets with a single source of truth your whole team can trust.",
    ],
    features: [
      "Inventory & stock control",
      "Sales & invoicing",
      "HR & WPS payroll",
      "Accounting & ledgers",
      "Role-based dashboards",
      "Real-time reporting",
    ],
  },
];

export type ProcessStep = {
  label: string;
  description: string;
  icon: LucideIcon;
};
