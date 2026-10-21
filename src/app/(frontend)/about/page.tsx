import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  Globe2,
  Handshake,
  Lightbulb,
  MapPin,
  MessagesSquare,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { getTeam, getAchievements } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ddotsmedia is a Dubai-based IT company delivering web, software, mobile, and ERP solutions to businesses across the UAE and GCC.",
};

const CARD =
  "h-full rounded-2xl border border-[#1e2d42] bg-[#111827] transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]";

const STORY = [
  "Ddotsmedia began in Dubai in 2016 as a one-person freelance practice — a single developer taking on web projects for local businesses who needed something better than an off-the-shelf template.",
  "Word spread. As the projects grew more ambitious, so did the team: designers, mobile developers, and ERP specialists came on board, and what started as a freelance habit became a proper software studio.",
  "What set us apart was a focus on what UAE businesses actually need — WPS-compliant payroll, VAT-ready invoicing, Arabic-friendly interfaces, and systems that respect local compliance from day one.",
  "Today that same studio ships web, mobile, and ERP products for clients in 12+ countries — but we still build every project the way we built the very first one: carefully, and like it's our own.",
];

const VALUES: { icon: LucideIcon; title: string; body: string; accent: string }[] = [
  {
    icon: Award,
    title: "Quality First",
    body: "We treat every line of code as if it carries our name — because it does. Rigorous reviews and testing keep our work dependable. We'd rather ship a little later than ship something fragile.",
    accent: "var(--brand-teal)",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    body: "No jargon, no surprises, no disappearing acts. You get clear timelines, honest progress updates, and direct access to the people building your product. If something changes, you hear it from us first.",
    accent: "var(--brand-accent-orange)",
  },
  {
    icon: Handshake,
    title: "Client Partnership",
    body: "We're not a vendor you brief and forget — we're a partner invested in your outcome. We learn your business, challenge assumptions, and stay long after launch. Your success is how we measure ours.",
    accent: "var(--brand-accent-green)",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    body: "Technology never stands still, and neither do we. We continually adopt better tools, patterns, and practices so your product stays modern. Curiosity is part of the job description here.",
    accent: "#3dbac6",
  },
];

const PARTNERS = [
  "SHAMS Free Zone Licensed",
  "UAE Corporate Tax Compliant",
  "ISO-aligned Processes",
  "Certified Developers",
];

const CULTURE: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Globe2,
    title: "Remote-First Team",
    body: "Our team works across the Emirates and beyond, collaborating online so we can hire the best people regardless of location.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly Sprint Reviews",
    body: "Every week we demo progress, gather feedback, and re-plan — keeping projects transparent and on track.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    body: "We set aside time for learning, experiments, and knowledge-sharing, keeping our skills — and your product — current.",
  },
];

const TIMELINE = [
  { year: "2016", title: "Founded in Dubai", body: "Ddotsmedia opens its doors with a small web-development team." },
  { year: "2018", title: "Mobile & Flutter", body: "Launched our mobile practice, shipping cross-platform apps with Flutter." },
  { year: "2020", title: "ERP Division", body: "Started building custom ERP systems for inventory, HR, and accounting." },
  { year: "2022", title: "Abu Dhabi & Sharjah", body: "Expanded across the Emirates with new presence in Abu Dhabi and Sharjah." },
  { year: "2024", title: "150+ Projects", body: "Crossed 150 delivered projects for clients in 12 countries." },
];

const CITIES = [
  { city: "Dubai", tag: "Headquarters", body: "Our main studio and engineering hub." },
  { city: "Abu Dhabi", tag: "Office", body: "Serving government and enterprise clients in the capital." },
  { city: "Sharjah", tag: "Office", body: "Supporting SMEs and startups across the northern Emirates." },
];

function SectionHead({ overline, title, subtext }: { overline: string; title: string; subtext?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
        {overline}
      </span>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">{title}</h2>
      {subtext && <p className="mt-4 text-base text-white/60 sm:text-lg">{subtext}</p>}
    </div>
  );
}

export default async function AboutPage() {
  const [dbTeam, dbAchievements] = await Promise.all([getTeam(), getAchievements()]);
  const teamData = dbTeam;
  const achData = dbAchievements;

  return (
    <main className="min-h-screen bg-navy">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, color-mix(in srgb, var(--brand-teal) 30%, transparent), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            About Us
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-6xl md:text-7xl">
            Building UAE&apos;s Digital Future
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">
            Ddotsmedia is a Dubai-based IT company delivering web development, custom software,
            mobile apps, and ERP systems to businesses across the UAE and the wider GCC.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-white/55">
            We pair deep technical expertise with a real understanding of local business — from
            WPS-compliant payroll to high-traffic platforms, we build solutions that keep working.
          </p>
        </div>
      </section>

      {/* 2. COMPANY STORY */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Our Story" title="From freelance roots to a full studio" />
          <div className="mt-10 space-y-5">
            {STORY.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-base leading-relaxed text-white/65">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Our Values" title="What we stand for" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <article className={cn(CARD, "flex gap-5 p-6")}>
                  <span
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      color: v.accent,
                      backgroundColor: `color-mix(in srgb, ${v.accent} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${v.accent} 32%, transparent)`,
                    }}
                  >
                    <v.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{v.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS / NUMBERS */}
      {achData.length > 0 && (
      <section
        className="relative overflow-hidden border-y border-[var(--brand-teal)]/20"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--brand-teal) 30%, var(--brand-navy)), var(--brand-navy))",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--brand-teal) 26%, transparent), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
          {achData.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.06} className="text-center">
              <div className="text-4xl font-bold text-white md:text-5xl">
                {typeof a.value === "number" ? (
                  <>
                    <CountUp value={a.value} />
                    {a.suffix}
                  </>
                ) : (
                  a.text
                )}
              </div>
              <div className="mt-2 text-sm text-white/80">{a.label}</div>
            </Reveal>
          ))}
        </div>
      </section>
      )}

      {/* 5. TEAM */}
      {teamData.length > 0 && (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Our Team" title="The people behind the work" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamData.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07}>
                <article className={cn(CARD, "flex flex-col items-center p-6 text-center")}>
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-full border text-xl font-bold"
                    style={{
                      color: m.accent,
                      backgroundColor: `color-mix(in srgb, ${m.accent} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${m.accent} 32%, transparent)`,
                    }}
                  >
                    {m.initials}
                  </span>
                  <h3 className="mt-4 font-semibold text-white">{m.name}</h3>
                  <p className="mt-1 text-sm text-[var(--brand-teal)]">{m.role}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 6. TIMELINE */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Our Journey" title="From a Dubai studio to the GCC" />
          <ol className="mt-14 border-l border-[#1e2d42] pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <li className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.6rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--brand-teal)] bg-navy">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-teal)]" />
                  </span>
                  <span className="text-sm font-bold text-[var(--brand-teal)]">{t.year}</span>
                  <h3 className="mt-1 text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{t.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. UAE PRESENCE */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="UAE Presence" title="Close to our clients" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CITIES.map((c, i) => (
              <Reveal key={c.city} delay={i * 0.08}>
                <article className={cn(CARD, "p-6")}>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[var(--brand-teal)]" />
                    <h3 className="text-lg font-semibold text-white">{c.city}</h3>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/40">
                    {c.tag}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PARTNERS & CERTIFICATIONS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Trust" title="Partners & Certifications" />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <div className="flex h-full items-center gap-3 rounded-xl border border-[#1e2d42] bg-[#111827] px-5 py-4">
                  <BadgeCheck className="h-6 w-6 shrink-0 text-[var(--brand-teal)]" />
                  <span className="text-sm font-medium text-white/80">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OFFICE / CULTURE */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Culture" title="How we work, day to day" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CULTURE.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className={cn(CARD, "p-6")}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <Link
              href="/careers"
              className="group flex h-full flex-col items-start rounded-3xl border border-[#1e2d42] bg-[#111827] p-8 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_40px_-12px_var(--brand-teal)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                <Users className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-white">Want to join our team?</h2>
              <p className="mt-2 text-sm text-white/60">
                We&apos;re always looking for talented people who care about their craft.
              </p>
              <span className="mt-5 text-sm font-semibold text-[var(--brand-teal)] group-hover:underline">
                View Careers →
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group relative flex h-full flex-col items-start overflow-hidden rounded-3xl border border-[var(--brand-teal)]/30 p-8 transition-transform duration-300 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--brand-teal) 26%, var(--brand-navy)), var(--brand-navy))",
              }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                <Rocket className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-white">Want to work with us?</h2>
              <p className="mt-2 text-sm text-white/70">
                Tell us about your project and we&apos;ll help you bring it to life.
              </p>
              <span className="mt-5 text-sm font-semibold text-white group-hover:underline">
                Get in Touch →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
