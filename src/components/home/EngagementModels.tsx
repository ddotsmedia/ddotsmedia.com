'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';

const models = [
  {
    name: 'Fixed-Price Project',
    description: 'Scope, price, ship. Perfect for MVPs and defined deliverables.',
    price: 'Transparent pricing',
    timeline: '8-16 weeks',
    benefits: [
      'Detailed spec & timeline upfront',
      'Fixed-price guarantee',
      'Single point of contact',
      'Delivery within 2 weeks of launch',
    ],
    cta: 'Get a Quote',
    featured: false,
  },
  {
    name: 'Dedicated Team',
    description: 'Your exclusive team on retainer. Best for scaling products and ongoing development.',
    price: 'Predictable monthly cost',
    timeline: 'Ongoing',
    benefits: [
      'Full-stack team (design, backend, frontend)',
      'Sprint-based planning (weekly syncs)',
      '40 hours/week minimum commitment',
      'Unlimited revisions & iterations',
      'First response within 2 hours',
    ],
    cta: 'Schedule Consultation',
    featured: true,
  },
  {
    name: 'Staff Augmentation',
    description: 'Hire developers by the hour. Ideal for temporary scaling or backfill.',
    price: 'From AED 300/hour',
    timeline: 'Flexible',
    benefits: [
      'Vetted senior engineers',
      'No recruitment overhead',
      'Flexible hour commitment',
      'Managed by your team',
    ],
    cta: 'Browse Engineers',
    featured: false,
  },
];

export function EngagementModels() {
  return (
    <section className='py-24 bg-gradient-to-b from-transparent to-white/[0.02]'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <span className='text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]'>
            How We Work
          </span>
          <h2 className='mt-3 text-3xl md:text-4xl font-bold text-white'>
            Choose your engagement model
          </h2>
          <p className='mt-4 text-white/55'>
            Every project is different. Pick the model that fits your needs.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {models.map((model, i) => (
            <Reveal key={model.name} delay={i * 0.1}>
              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  model.featured
                    ? 'border-[var(--brand-teal)]/50 bg-gradient-to-br from-[var(--brand-teal)]/10 to-transparent md:scale-105 md:-translate-y-2'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className='p-8'>
                  {model.featured && (
                    <div className='inline-block mb-4 px-3 py-1 rounded-full bg-[var(--brand-teal)]/20 text-xs font-semibold text-[var(--brand-teal)]'>
                      Most Popular
                    </div>
                  )}

                  <h3 className='text-xl font-bold text-white'>{model.name}</h3>
                  <p className='mt-2 text-sm text-white/60'>{model.description}</p>

                  <div className='mt-6 space-y-2'>
                    <div>
                      <p className='text-xs uppercase tracking-wide text-white/40'>Price</p>
                      <p className='text-lg font-semibold text-white'>{model.price}</p>
                    </div>
                    <div>
                      <p className='text-xs uppercase tracking-wide text-white/40'>Timeline</p>
                      <p className='text-lg font-semibold text-white'>{model.timeline}</p>
                    </div>
                  </div>

                  <ul className='mt-6 space-y-3 border-t border-white/10 pt-6'>
                    {model.benefits.map((benefit) => (
                      <li key={benefit} className='flex items-start gap-3'>
                        <Check className='h-4 w-4 text-[var(--brand-teal)] flex-shrink-0 mt-0.5' />
                        <span className='text-sm text-white/70'>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href='/contact'
                    className={`mt-6 block rounded-full py-3 text-center font-semibold transition-all ${
                      model.featured
                        ? 'bg-[var(--brand-teal)] text-white hover:bg-[var(--brand-teal)]/90'
                        : 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5'
                    }`}
                  >
                    {model.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
