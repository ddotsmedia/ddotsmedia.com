'use client';

import { Briefcase, Heart, ShoppingCart, Brain, Users, Building2, Book, Home } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';

const verticals = [
  {
    icon: Briefcase,
    title: 'Job Portals',
    description: 'Recruitment platforms connecting talent with opportunities',
    projects: ['Ddots Jobs', 'Ddots Media Jobs'],
    metric: '50K+ active users',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Medical platforms and health information systems',
    projects: ['AyurConnect', 'Kayakalp Vaidyasala', 'Health Portal'],
    metric: '100K+ monthly visits',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Online stores and marketplace solutions',
    projects: ['Coffee Beans World', 'Ddots Shop', 'Venale'],
    metric: '$2M+ annual GMV',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Machine learning and intelligent automation',
    projects: ['AI Tools Hub', 'Domain Monitor', 'Analytics Dashboard'],
    metric: '1M+ API calls/month',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'CRM & Business',
    description: 'Customer management and business automation',
    projects: ['Gayathi', 'Synergy Business', 'Ddots HR'],
    metric: '200+ enterprise clients',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Property management and real estate platforms',
    projects: ['Ddots Realty', 'Real Estate AI'],
    metric: '5K+ properties listed',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Book,
    title: 'Education',
    description: 'Learning platforms and educational tools',
    projects: ['Milstonm Typing', 'Learning Hub', 'Training Portal'],
    metric: '10K+ students trained',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Home,
    title: 'Community',
    description: 'Social networks and community platforms',
    projects: ['UAE Malayalees', 'Abu Dhabi Malayalees'],
    metric: '25K+ members',
    color: 'from-pink-500 to-pink-600',
  },
];

export function IndustryVerticals() {
  return (
    <section className='py-24 bg-white/[0.02] border-y border-white/10'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <span className='text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]'>
            Industry Expertise
          </span>
          <h2 className='mt-3 text-3xl md:text-4xl font-bold text-white'>
            Verticals We Master
          </h2>
          <p className='mt-4 text-white/55'>
            Deep experience across industries. Real results for real businesses.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {verticals.map((vertical, i) => {
            const Icon = vertical.icon;
            return (
              <Reveal key={vertical.title} delay={i * 0.05}>
                <div className='group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.05]'>
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${vertical.color} text-white`}>
                    <Icon className='w-6 h-6' />
                  </div>
                  <h3 className='mt-4 font-bold text-white text-lg'>{vertical.title}</h3>
                  <p className='mt-2 text-sm text-white/60'>{vertical.description}</p>

                  <div className='mt-5 pt-5 border-t border-white/10'>
                    <p className='text-xs uppercase tracking-wider text-white/40 font-semibold'>Projects</p>
                    <ul className='mt-2 space-y-1'>
                      {vertical.projects.map((project) => (
                        <li key={project} className='text-sm text-white/70'>
                          • {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='mt-4 pt-4 border-t border-white/10'>
                    <p className='text-xs font-bold text-[var(--brand-teal)]'>{vertical.metric}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
