import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { BrowserFrame } from "@/components/preview/BrowserFrame";
import { ServiceSections } from "@/components/services/ServiceSections";
import { Industries } from "@/components/services/Industries";
import { PricingTeaser } from "@/components/services/PricingTeaser";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { getServices, getIndustries, getPricing, getFaqs, getProcessSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, custom software, UI/UX design, cloud & DevOps, and ERP systems — built for UAE businesses.",
};

const CARD =
  "group flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]";

function SectionHead({
  overline,
  title,
  subtext,
}: {
  overline: string;
  title: string;
  subtext?: string;
}) {
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

function AccentIcon({ icon: Icon, accent }: { icon: LucideIcon; accent: string }) {
  return (
    <span
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
      style={{
        color: accent,
        backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
        borderColor: `color-mix(in srgb, ${accent} 32%, transparent)`,
      }}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}

function TechBadges({ tech }: { tech: string[] }) {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default async function ServicesPage() {
  const [dbServices, dbIndustries, dbPricing, dbFaqs, dbSteps] = await Promise.all([
    getServices(),
    getIndustries(),
    getPricing(),
    getFaqs("services"),
    getProcessSteps(),
  ]);
  const serviceList = dbServices;
  const stepList = dbSteps;

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
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            What We Do
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-6xl md:text-7xl">
            Our Services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
            From first line of code to production and beyond — design, engineering, and
            infrastructure built for the UAE market and beyond.
          </p>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4">
            <div>
              <div className="text-3xl font-bold text-[var(--brand-teal)] sm:text-4xl">
                <CountUp value={150} />+
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brand-teal)] sm:text-4xl">
                <CountUp value={6} />
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">Core Services</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--brand-teal)] sm:text-4xl">Full-Stack</div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID */}
      {serviceList.length > 0 && (
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3">
            {serviceList.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={i * 0.07}
                className={cn(s.featured && "sm:col-span-2")}
              >
                {s.featured && s.screenshot ? (
                  <article className={cn(CARD, "overflow-hidden")}>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <AccentIcon icon={s.icon} accent={s.accent} />
                        <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                        {s.description}
                      </p>
                      <TechBadges tech={s.tech} />
                    </div>
                    <div className="mt-2 px-6 pb-6">
                      <BrowserFrame url={s.screenshotUrl}>
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={s.screenshot}
                            alt={`${s.title} — live project`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover object-left-top origin-top-left transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </BrowserFrame>
                    </div>
                  </article>
                ) : (
                  <article className={cn(CARD, "p-6")}>
                    <AccentIcon icon={s.icon} accent={s.accent} />
                    <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.description}</p>
                    <TechBadges tech={s.tech} />
                  </article>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 3. INDIVIDUAL SERVICE SECTIONS */}
      {serviceList.length > 0 && <ServiceSections services={serviceList} />}

      {/* 4. INDUSTRIES SERVED */}
      {dbIndustries.length > 0 && <Industries items={dbIndustries} />}

      {/* 5. PRICING TEASER */}
      {dbPricing.length > 0 && <PricingTeaser tiers={dbPricing} />}

      {/* 6. PROCESS FLOW */}
      {stepList.length > 0 && (
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            overline="How We Work"
            title="A clear path from idea to launch"
            subtext="A proven four-step process that keeps projects on track and stakeholders aligned."
          />
          <div className="mt-14 flex flex-col items-stretch gap-6 md:flex-row md:items-start md:justify-between">
            {stepList.map((step, i) => (
              <Fragment key={step.label}>
                <Reveal delay={i * 0.08} className="flex flex-1 flex-col items-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#1e2d42] bg-[#111827] text-[var(--brand-teal)]">
                    <step.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{step.label}</h3>
                  <p className="mt-1 max-w-[16rem] text-sm text-white/55">{step.description}</p>
                </Reveal>
                {i < stepList.length - 1 && (
                  <ChevronRight
                    aria-hidden
                    className="mx-auto hidden h-7 w-7 shrink-0 self-center text-white/25 md:block"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 7. FAQ */}
      {dbFaqs.length > 0 && (
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            overline="FAQ"
            title="Questions, answered"
            subtext="The things clients ask us most before getting started."
          />
          <FaqAccordion items={dbFaqs} />
        </div>
      </section>
      )}

      {/* 8. CTA BANNER */}
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
              Let&apos;s build something that moves your business forward.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Tell us what you need — we&apos;ll scope it, price it, and ship it.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
