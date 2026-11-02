import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, MapPin, Clock, Users } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Ddotsmedia team. We build web, mobile, and ERP products for clients across the UAE and GCC.",
};

const DEPT_LABELS: Record<string, string> = {
  engineering: "Engineering",
  design: "Design",
  "project-management": "Project Management",
  sales: "Sales",
  marketing: "Marketing",
  operations: "Operations",
};

const LOC_LABELS: Record<string, string> = {
  onsite: "On-site (UAE)",
  remote: "Remote",
  hybrid: "Hybrid",
};

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  freelance: "Freelance / Contract",
  internship: "Internship",
};

async function getJobs() {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "job-listings",
      where: { active: { equals: true } },
      sort: ["order"],
      limit: 50,
    });
    return res.docs;
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-navy">
      {/* HERO */}
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
            Careers
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-6xl">
            Build the UAE&apos;s Digital Future
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">
            We&apos;re a team of developers, designers, and project managers shipping real products
            for clients across the UAE and GCC. If you care about your craft, we&apos;d love to
            hear from you.
          </p>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {jobs.length === 0 ? (
            /* No open positions */
            <Reveal>
              <div className="rounded-2xl border border-[#1e2d42] bg-[#111827] px-8 py-16 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                  <Briefcase className="h-8 w-8" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-white">
                  No open positions right now
                </h2>
                <p className="mx-auto mt-3 max-w-md text-white/60">
                  We&apos;re not actively hiring at this moment, but we&apos;re always happy to
                  hear from talented people. Send your CV and we&apos;ll keep you in mind.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Send your CV →
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <Reveal key={job.id} delay={i * 0.06}>
                  <article className="rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_36px_-12px_var(--brand-teal)]">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">{job.title}</h2>
                        {job.shortDescription && (
                          <p className="mt-1 text-sm text-white/60">{job.shortDescription}</p>
                        )}
                      </div>
                      <Link
                        href="/contact"
                        className="shrink-0 rounded-lg border border-[var(--brand-teal)]/40 px-4 py-2 text-sm font-semibold text-[var(--brand-teal)] transition-colors hover:bg-[var(--brand-teal)] hover:text-white"
                      >
                        Apply →
                      </Link>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/50">
                      {job.department && (
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {DEPT_LABELS[job.department] ?? job.department}
                        </span>
                      )}
                      {job.locationType && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location
                            ? `${job.location} · ${LOC_LABELS[job.locationType] ?? job.locationType}`
                            : LOC_LABELS[job.locationType] ?? job.locationType}
                        </span>
                      )}
                      {job.employmentType && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {TYPE_LABELS[job.employmentType] ?? job.employmentType}
                        </span>
                      )}
                      {job.salaryRange && (
                        <span className="rounded-md bg-[var(--brand-teal)]/10 px-2 py-0.5 font-medium text-[var(--brand-teal)]">
                          {job.salaryRange}
                        </span>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="rounded-3xl border border-[var(--brand-teal)]/30 p-10 text-center"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--brand-teal) 20%, var(--brand-navy)), var(--brand-navy))",
              }}
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Don&apos;t see a fit?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/70">
                We&apos;re always open to hearing from skilled developers, designers, and PMs.
                Send us your work and tell us what you&apos;re looking for.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-teal)] px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Get in Touch →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
