'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import type { UIFaq } from '@/lib/content';

export function FaqSchema({ items }: { items: UIFaq[] }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  if (!items.length) return null;

  // Render FAQ schema as JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Visible FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]">
                Questions?
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                Frequently asked
              </h2>
              <p className="mt-4 text-white/55">
                Everything you need to know about our process and services.
              </p>
            </div>

            <div className="space-y-3">
              {items.map((item, i) => (
                <Reveal key={`${item.q}-${i}`} delay={i * 0.05}>
                  <button
                    onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
                    className="w-full text-left px-5 py-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-white">{item.q}</p>
                      <ChevronDown
                        className={`h-5 w-5 text-[var(--brand-teal)] transition-transform flex-shrink-0 ${
                          expanded[i] ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {expanded[i] && (
                      <p className="mt-3 text-white/70 text-sm leading-relaxed">{item.a}</p>
                    )}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
