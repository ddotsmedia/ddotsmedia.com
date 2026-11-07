import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/lib/data/services";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} in UAE — Ddotsmedia`;
  const description = `${service.description} Ddotsmedia delivers ${service.title.toLowerCase()} for businesses in Dubai, Sharjah, and across the UAE.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: "/og-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image"],
    },
  };
}

const CARD =
  "group flex h-full flex-col rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]";

function AccentIcon({ icon: Icon, accent }: { icon: LucideIcon; accent: string }) {
  return (
    <span
      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border"
      style={{
        color: accent,
        backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
        borderColor: `color-mix(in srgb, ${accent} 32%, transparent)`,
      }}
    >
      <Icon className="h-7 w-7" />
    </span>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-navy text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f33] via-navy to-navy" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[var(--brand-teal)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <AccentIcon icon={service.icon} accent={service.accent} />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {service.title}
              <span className="block text-2xl font-normal text-white/50 sm:text-3xl mt-2">
                in the UAE
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#1e2d42] bg-[#111827] px-4 py-1.5 text-sm text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-teal)]/90 hover:shadow-[0_0_24px_-6px_var(--brand-teal)]"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1e2d42] px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-[var(--brand-teal)] hover:text-white"
              >
                See Our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="space-y-5">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
                  What We Do
                </span>
                <div className="space-y-4">
                  {service.longDescription.map((para, i) => (
                    <p key={i} className="text-base text-white/70 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Features */}
            <Reveal delay={0.1}>
              <div className={CARD}>
                <span className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
                  What's Included
                </span>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: service.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      {others.length > 0 && (
        <section className="border-t border-[#1e2d42] py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <Reveal>
              <h2 className="mb-10 text-2xl font-bold text-white">Other Services</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <Link href={`/services/${s.slug}`} className={`${CARD} no-underline`}>
                    <AccentIcon icon={s.icon} accent={s.accent} />
                    <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-white/60">{s.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--brand-teal)]">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="border-t border-[#1e2d42] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to build something great?
            </h2>
            <p className="mt-4 text-base text-white/60">
              Free consultation. Fixed-price quotes. UAE-based team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-teal)] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-teal)]/90 hover:shadow-[0_0_24px_-6px_var(--brand-teal)]"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1e2d42] px-8 py-4 text-sm font-semibold text-white/80 hover:border-[var(--brand-teal)] hover:text-white transition-colors"
              >
                View Portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
