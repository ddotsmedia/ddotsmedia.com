import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Heart, MapPin, Target, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ddotsmedia is a Dubai-based IT company delivering web, software, mobile, and ERP solutions to businesses across the UAE and GCC.",
};

const CARD =
  "h-full rounded-2xl border border-[#1e2d42] bg-[#111827] transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]";

const PILLARS: { icon: LucideIcon; title: string; body: string; accent: string }[] = [
  {
    icon: Target,
    title: "Mission",
    body: "To help UAE businesses grow by building reliable, high-performance software they can depend on.",
    accent: "var(--brand-teal)",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "To be the GCC's most trusted partner for digital products — from web to ERP.",
    accent: "#3dbac6",
  },
  {
    icon: Heart,
    title: "Values",
    body: "Craftsmanship, transparency, and long-term partnerships over quick wins.",
    accent: "var(--brand-accent-green)",
  },
];

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 80, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 12, suffix: "+", label: "Countries Served" },
];

const TEAM = [
  { name: "Mohammed Al Rashid", role: "CEO", initials: "MA", accent: "var(--brand-teal)" },
  { name: "Priya Nair", role: "Lead Developer", initials: "PN", accent: "var(--brand-accent-orange)" },
  { name: "Omar Hassan", role: "UI/UX Designer", initials: "OH", accent: "var(--brand-accent-green)" },
  { name: "Aisha Karimi", role: "Project Manager", initials: "AK", accent: "#3dbac6" },
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

export default function AboutPage() {
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

      {/* 2. MISSION / VISION / VALUES */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className={cn(CARD, "p-6")}>
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{
                      color: p.accent,
                      backgroundColor: `color-mix(in srgb, ${p.accent} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${p.accent} 32%, transparent)`,
                    }}
                  >
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS STRIP */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="text-4xl font-bold text-[var(--brand-teal)] md:text-5xl">
                <CountUp value={s.value} />
                {s.suffix}
              </div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. TEAM */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead overline="Our Team" title="The people behind the work" />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
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

      {/* 5. TIMELINE */}
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

      {/* 7. CTA BANNER */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#1e2d42] bg-[#111827] px-6 py-14 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--brand-teal) 22%, transparent), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Let&apos;s build what&apos;s next, together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Tell us about your project — we&apos;ll help you scope, design, and ship it.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
