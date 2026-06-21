import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

/** Brand glyphs — lucide-react no longer ships social/brand icons. */
type IconProps = { className?: string };
const LinkedInIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);
const XIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const GitHubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ddotsmedia — web, software, mobile, and ERP solutions for the UAE and GCC. Offices in Dubai, Abu Dhabi, and Sharjah.",
};

const INFO = [
  { icon: Mail, label: "Email", value: "hello@ddotsmedia.com", href: "mailto:hello@ddotsmedia.com" },
  { icon: Phone, label: "Phone", value: "+971 50 937 9212", href: "tel:+971509379212" },
  { icon: MapPin, label: "Location", value: "Dubai · Abu Dhabi · Sharjah", href: undefined },
];

const METHODS: { icon: LucideIcon; label: string; value: string; href: string; external?: boolean }[] = [
  { icon: Phone, label: "Call us", value: "+971 50 937 9212", href: "tel:+971509379212" },
  { icon: Mail, label: "Email us", value: "hello@ddotsmedia.com", href: "mailto:hello@ddotsmedia.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Instant chat", href: "https://wa.me/971509379212", external: true },
  { icon: Building2, label: "Office visit", value: "Dubai · by appointment", href: "#contact-form" },
];

const SOCIAL: { icon: ComponentType<IconProps>; label: string; href: string }[] = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: XIcon, label: "Twitter / X", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: GitHubIcon, label: "GitHub", href: "#" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-36 pb-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, color-mix(in srgb, var(--brand-teal) 30%, transparent), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            Contact Us
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-6xl md:text-7xl">
            Let&apos;s Build Together
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
            Tell us about your project and we&apos;ll get back to you within one business day.
          </p>
          <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 px-4 py-1.5 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-[var(--brand-accent-green)]" />
            We typically respond within 2 hours during UAE business hours (Sun–Thu, 9AM–6PM GST).
          </p>
        </div>
      </section>

      {/* 2. CONTACT METHODS STRIP */}
      <section className="pb-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {METHODS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <a
                href={m.href}
                {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full items-start gap-4 rounded-2xl border border-[#1e2d42] bg-[#111827] p-5 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_30px_-12px_var(--brand-teal)]"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                  <m.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{m.label}</p>
                  <p className="mt-1 font-medium text-white">{m.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. SPLIT: form (3/5) + info (2/5) */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {INFO.map((item) => {
                const inner = (
                  <article className="flex items-start gap-4 rounded-2xl border border-[#1e2d42] bg-[#111827] p-5 transition-all duration-300 hover:border-[var(--brand-teal)] hover:shadow-[0_0_30px_-12px_var(--brand-teal)]">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                        {item.label}
                      </p>
                      <p className="mt-1 font-medium text-white">{item.value}</p>
                    </div>
                  </article>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/971509379212"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[var(--brand-accent-green)]/30 bg-[var(--brand-accent-green)]/10 p-5 transition-all duration-300 hover:border-[var(--brand-accent-green)] hover:shadow-[0_0_30px_-12px_var(--brand-accent-green)]"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-accent-green)]/20 text-[var(--brand-accent-green)]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">Chat on WhatsApp</p>
                  <p className="text-sm text-white/60">Fastest way to reach us</p>
                </div>
              </a>

              {/* Office hours */}
              <div className="rounded-2xl border border-[#1e2d42] bg-[#111827] p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                    <Clock className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-white">Office Hours</h3>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-white/55">Sun – Thu</dt>
                    <dd className="font-medium text-white">9:00 AM – 6:00 PM GST</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/55">Fri – Sat</dt>
                    <dd className="text-white/70">Closed</dd>
                  </div>
                </dl>
                <p className="mt-4 flex items-start gap-2 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/50">
                  <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand-teal)]" />
                  Emergency support is available 24/7 for existing clients. International client? GST is
                  UTC+4 — we&apos;ll schedule around your timezone.
                </p>
              </div>

              {/* UAE map (dark-styled) */}
              <div className="relative overflow-hidden rounded-2xl border border-[#1e2d42]">
                <iframe
                  title="Ddotsmedia — offices across the UAE"
                  src="https://maps.google.com/maps?q=United%20Arab%20Emirates&z=8&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full"
                  style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1626] via-[#0a1626]/80 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">3 offices across the UAE</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {["Dubai", "Abu Dhabi", "Sharjah"].map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 rounded-full border border-[var(--brand-teal)]/30 bg-[var(--brand-teal)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand-teal)]"
                      >
                        <MapPin className="h-3 w-3" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. SOCIAL LINKS */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-white/10 pt-10 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/55">Follow our work across the web.</p>
          <div className="flex gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#1e2d42] bg-[#111827] text-white/70 transition-all duration-300 hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
