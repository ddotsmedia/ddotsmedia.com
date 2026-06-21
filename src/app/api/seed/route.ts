import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { SERVICES } from "@/lib/data/services";
import type { Service } from "@/payload-types";

export const dynamic = "force-dynamic";

/** Build a minimal Lexical richText value from plain paragraphs. */
type RichText = NonNullable<Service["longDescription"]>;
function richText(paragraphs: string[]): RichText {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [{ type: "text", text, format: 0, style: "", mode: "normal", detail: 0, version: 1 }],
      })),
    },
  } as RichText;
}

const SERVICE_META: Record<
  string,
  {
    icon: "Globe" | "Smartphone" | "Code" | "Palette" | "Cloud" | "LayoutDashboard";
    category: "web" | "mobile" | "software" | "design" | "devops" | "erp";
  }
> = {
  "web-development": { icon: "Globe", category: "web" },
  "mobile-apps": { icon: "Smartphone", category: "mobile" },
  "custom-software": { icon: "Code", category: "software" },
  "ui-ux-design": { icon: "Palette", category: "design" },
  "cloud-devops": { icon: "Cloud", category: "devops" },
  "erp-systems": { icon: "LayoutDashboard", category: "erp" },
};

const TEAM = [
  { name: "Mohammed Al Rashid", role: "CEO", order: 1 },
  { name: "Priya Nair", role: "Lead Developer", order: 2 },
  { name: "Omar Hassan", role: "UI/UX Designer", order: 3 },
  { name: "Aisha Karimi", role: "Project Manager", order: 4 },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How long does a project take?",
    answer:
      "Most websites take 2–4 weeks; mobile apps and ERP systems run 6–12 weeks depending on scope. We share a clear timeline before we start.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Primarily Next.js, React, React Native, Node.js, PostgreSQL, and Docker — chosen for performance and long-term maintainability.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Every project includes a support window, and we offer ongoing maintenance plans with monitoring, backups, and updates.",
  },
  {
    question: "Can you work with existing code?",
    answer:
      "Absolutely. We regularly audit, refactor, and extend existing codebases as well as build new products from scratch.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We scope each project and quote a fixed price or milestone-based plan. See our pricing tiers for typical starting points.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes — we're happy to sign an NDA before discussing any sensitive details of your project.",
  },
];

const INDUSTRIES: {
  title: string;
  icon: "HeartPulse" | "Building2" | "ShoppingCart" | "Landmark" | "GraduationCap" | "Truck";
  description: string;
}[] = [
  { title: "Healthcare", icon: "HeartPulse", description: "Clinics, pharmacies, and wellness platforms with booking and records." },
  { title: "Real Estate", icon: "Building2", description: "Listing portals, CRM, and lead management for agencies." },
  { title: "E-commerce & Retail", icon: "ShoppingCart", description: "Storefronts, POS, and inventory for online and in-store sales." },
  { title: "Government & PRO Services", icon: "Landmark", description: "Compliant portals and document workflows for the public sector." },
  { title: "Education", icon: "GraduationCap", description: "Learning platforms, student portals, and admissions systems." },
  { title: "Trading & Logistics", icon: "Truck", description: "Supply-chain, fleet, and warehouse management tools." },
];

const PRICING = [
  {
    name: "Starter",
    price: "AED 5,000",
    priceLabel: "Starting from",
    highlighted: false,
    order: 1,
    features: [
      "Up to 5 pages / screens",
      "Responsive mobile-first design",
      "Contact form & basic SEO",
      "~2 weeks delivery",
      "1 month support",
    ],
  },
  {
    name: "Professional",
    price: "AED 15,000",
    priceLabel: "Starting from",
    highlighted: true,
    order: 2,
    features: [
      "Custom web or mobile app",
      "CMS / admin panel",
      "API & third-party integrations",
      "Authentication & dashboards",
      "Performance optimisation",
      "3 months support",
      "Priority response",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceLabel: "Contact us",
    highlighted: false,
    order: 3,
    features: [
      "ERP & complex platforms",
      "Dedicated team",
      "SLA & priority support",
      "Cloud & DevOps setup",
      "Security & compliance review",
      "Ongoing partnership",
    ],
  },
];

const TESTIMONIALS = [
  {
    author: "Ahmed Al Mansouri",
    role: "CEO",
    company: "TechVentures Dubai",
    quote:
      "Ddotsmedia delivered our platform ahead of schedule and exceeded every expectation. A genuine technology partner, not just a vendor.",
  },
  {
    author: "Sarah Johnson",
    role: "Founder",
    company: "StartupAE",
    quote:
      "From idea to launch, the team was professional, responsive, and deeply skilled. Our app has been flawless since day one.",
  },
  {
    author: "Khalid Ibrahim",
    role: "CTO",
    company: "Gulf Solutions LLC",
    quote:
      "Their ERP transformed how we operate. Reliable, well-architected, and supported every step of the way. Highly recommended.",
  },
];

const STATS_ITEMS = [
  { label: "Projects", value: 150, suffix: "+" },
  { label: "Clients", value: 80, suffix: "+" },
  { label: "Enterprise Apps", value: 50, suffix: "+" },
  { label: "Years", value: 9, suffix: "+" },
  { label: "Countries", value: 12, suffix: "+" },
  { label: "Support", value: 24, suffix: "/7" },
];

const TRUST_NAMES = [
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

const PROCESS = [
  { title: "Discover", description: "We map your goals, users, and constraints.", icon: "Search" as const },
  { title: "Design", description: "Wireframes and UI that put the user first.", icon: "Palette" as const },
  { title: "Develop", description: "Clean, tested, production-grade code.", icon: "Code" as const },
  { title: "Deploy", description: "Ship, monitor, and iterate with confidence.", icon: "Rocket" as const },
];

const COMPANY = {
  companyName: "Ddotsmedia IT Solutions",
  tagline: "We build software that moves business forward.",
  phone: "+971 50 937 9212",
  email: "hello@ddotsmedia.com",
  whatsappNumber: "971509379212",
  address: "Dubai · Abu Dhabi · Sharjah, UAE",
  officeHours: "Sun-Thu 9:00 AM - 6:00 PM GST",
  responseTime: "within 2 hours",
  socialLinks: { linkedin: "#", twitter: "#", instagram: "#", github: "#" },
};

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (key !== (process.env.SEED_KEY || "seed123")) {
    return NextResponse.json({ error: "Unauthorized. Pass ?key=…" }, { status: 401 });
  }

  const result: Record<string, string> = {};
  try {
    const payload = await getPayloadClient();

    // 1. SERVICES
    if ((await payload.count({ collection: "services" })).totalDocs > 0) {
      result.services = "skipped (not empty)";
    } else {
      for (let i = 0; i < SERVICES.length; i++) {
        const s = SERVICES[i];
        const meta = SERVICE_META[s.slug] ?? { icon: "Globe" as const, category: "web" as const };
        await payload.create({
          collection: "services",
          data: {
            title: s.title,
            slug: s.slug,
            icon: meta.icon,
            category: meta.category,
            color: s.accent,
            shortDescription: s.description,
            longDescription: richText(s.longDescription),
            features: s.features.map((value) => ({ value })),
            techStack: s.tech.map((value) => ({ value })),
            order: i + 1,
          },
        });
      }
      result.services = `seeded ${SERVICES.length}`;
    }

    // 2. TEAM MEMBERS
    if ((await payload.count({ collection: "team-members" })).totalDocs > 0) {
      result.teamMembers = "skipped (not empty)";
    } else {
      for (const m of TEAM) await payload.create({ collection: "team-members", data: m });
      result.teamMembers = `seeded ${TEAM.length}`;
    }

    // 3. FAQ ITEMS (page=services)
    if ((await payload.count({ collection: "faq-items" })).totalDocs > 0) {
      result.faqItems = "skipped (not empty)";
    } else {
      for (let i = 0; i < FAQS.length; i++) {
        await payload.create({
          collection: "faq-items",
          data: { ...FAQS[i], page: "services", order: i + 1 },
        });
      }
      result.faqItems = `seeded ${FAQS.length}`;
    }

    // 4. INDUSTRIES
    if ((await payload.count({ collection: "industries" })).totalDocs > 0) {
      result.industries = "skipped (not empty)";
    } else {
      for (let i = 0; i < INDUSTRIES.length; i++) {
        await payload.create({ collection: "industries", data: { ...INDUSTRIES[i], order: i + 1 } });
      }
      result.industries = `seeded ${INDUSTRIES.length}`;
    }

    // 5. PRICING TIERS
    if ((await payload.count({ collection: "pricing-tiers" })).totalDocs > 0) {
      result.pricingTiers = "skipped (not empty)";
    } else {
      for (const t of PRICING) {
        await payload.create({
          collection: "pricing-tiers",
          data: {
            name: t.name,
            price: t.price,
            priceLabel: t.priceLabel,
            highlighted: t.highlighted,
            order: t.order,
            ctaText: "Contact for Details",
            ctaLink: "/contact",
            features: t.features.map((value) => ({ value })),
          },
        });
      }
      result.pricingTiers = `seeded ${PRICING.length}`;
    }

    // 7. TESTIMONIALS (collection has no rating field — UI renders 5 stars)
    if ((await payload.count({ collection: "testimonials" })).totalDocs > 0) {
      result.testimonials = "skipped (not empty)";
    } else {
      for (const t of TESTIMONIALS) await payload.create({ collection: "testimonials", data: t });
      result.testimonials = `seeded ${TESTIMONIALS.length}`;
    }

    // 6. GLOBALS — seed only when empty
    const company = await payload.findGlobal({ slug: "company-settings" });
    if (company?.companyName) {
      result.companySettings = "skipped (not empty)";
    } else {
      await payload.updateGlobal({ slug: "company-settings", data: COMPANY });
      result.companySettings = "seeded";
    }

    const stats = await payload.findGlobal({ slug: "stats" });
    if (stats?.items?.length) {
      result.stats = "skipped (not empty)";
    } else {
      await payload.updateGlobal({ slug: "stats", data: { items: STATS_ITEMS } });
      result.stats = `seeded ${STATS_ITEMS.length}`;
    }

    const trust = await payload.findGlobal({ slug: "trust-bar" });
    if (trust?.items?.length) {
      result.trustBar = "skipped (not empty)";
    } else {
      await payload.updateGlobal({ slug: "trust-bar", data: { items: TRUST_NAMES.map((name) => ({ name })) } });
      result.trustBar = `seeded ${TRUST_NAMES.length}`;
    }

    const process = await payload.findGlobal({ slug: "process-steps" });
    if (process?.items?.length) {
      result.processSteps = "skipped (not empty)";
    } else {
      await payload.updateGlobal({ slug: "process-steps", data: { items: PROCESS } });
      result.processSteps = `seeded ${PROCESS.length}`;
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message, result },
      { status: 500 },
    );
  }
}
