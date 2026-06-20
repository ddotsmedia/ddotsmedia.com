import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

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
        </div>
      </section>

      {/* 2. SPLIT: form (3/5) + info (2/5) */}
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

              {/* Dubai map (dark-filtered) */}
              <div className="overflow-hidden rounded-2xl border border-[#1e2d42]">
                <iframe
                  title="Ddotsmedia — Dubai"
                  src="https://maps.google.com/maps?q=Dubai,UAE&z=11&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full"
                  style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
