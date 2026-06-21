"use client";

import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const SERVICES = ["Web", "Mobile", "Software", "ERP", "UI/UX", "DevOps", "Other"];

const QUICK = [
  { label: "I need a Website", service: "Web" },
  { label: "I need a Mobile App", service: "Mobile" },
  { label: "I need Custom Software", service: "Software" },
];

const FIELD =
  "w-full rounded-lg border border-[#1e2d42] bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--brand-teal)]";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const pickService = (service: string) => {
    setForm((f) => ({ ...f, service }));
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--brand-accent-green)]/40 bg-[var(--brand-accent-green)]/10 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-[var(--brand-accent-green)]" />
        <h3 className="mt-4 text-xl font-semibold text-white">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-white/65">
          Thanks for reaching out — we&apos;ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/90 transition-colors hover:border-white/40"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div id="contact-form" ref={rootRef} className="scroll-mt-28">
      <div className="mb-4 rounded-2xl border border-[#1e2d42] bg-[#111827] p-4 sm:p-5">
        <p className="mb-3 text-sm text-white/55">Quick inquiry — pick one to get started:</p>
        <div className="flex flex-wrap gap-2">
          {QUICK.map((q) => (
            <button
              key={q.service}
              type="button"
              onClick={() => pickService(q.service)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                form.service === q.service
                  ? "border-[var(--brand-teal)] bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]"
                  : "border-[#1e2d42] bg-white/[0.03] text-white/70 hover:border-[var(--brand-teal)]/60",
              )}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-[#1e2d42] bg-[#111827] p-6 sm:p-8"
      >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-white/70">
            Name <span className="text-[var(--brand-teal)]">*</span>
          </label>
          <input id="name" name="name" required value={form.name} onChange={update("name")} className={FIELD} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-white/70">
            Email <span className="text-[var(--brand-teal)]">*</span>
          </label>
          <input id="email" name="email" type="email" required value={form.email} onChange={update("email")} className={FIELD} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm text-white/70">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={update("phone")} className={FIELD} placeholder="+971 …" />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm text-white/70">Service</label>
          <select id="service" name="service" value={form.service} onChange={update("service")} className={FIELD}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[#111827]">{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm text-white/70">
          Message <span className="text-[var(--brand-teal)]">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} value={form.message} onChange={update("message")} className={FIELD} placeholder="Tell us about your project…" />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white shadow-lg shadow-[var(--brand-teal)]/25 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      </form>
    </div>
  );
}
