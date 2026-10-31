'use client';

import { Reveal } from '@/components/shared/Reveal';

const team = [
  { name: 'Aneesh Kumar', role: 'Founder & CTO', initials: 'AK', color: 'from-blue-500 to-cyan-500' },
  { name: 'Sarah Johnson', role: 'Head of Design', initials: 'SJ', color: 'from-purple-500 to-pink-500' },
  { name: 'Rajesh Pillai', role: 'Lead Backend Engineer', initials: 'RP', color: 'from-green-500 to-emerald-500' },
  { name: 'Lisa Chen', role: 'Product Manager', initials: 'LC', color: 'from-orange-500 to-red-500' },
  { name: 'Ahmed Hassan', role: 'DevOps & Infrastructure', initials: 'AH', color: 'from-indigo-500 to-blue-500' },
  { name: 'Maya Desai', role: 'Senior Frontend Dev', initials: 'MD', color: 'from-pink-500 to-rose-500' },
];

export function TeamPreview() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <span className='text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]'>
            Our Team
          </span>
          <h2 className='mt-3 text-3xl md:text-4xl font-bold text-white'>
            Senior engineers with startup speed
          </h2>
          <p className='mt-4 text-white/55'>
            10+ years of collective experience shipping production systems. UAE-based, globally minded.
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4'>
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <div className='group text-center'>
                <div
                  className={`mx-auto mb-3 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-2xl transition-transform group-hover:scale-110`}
                >
                  {member.initials}
                </div>
                <h3 className='font-semibold text-white text-sm md:text-base'>{member.name}</h3>
                <p className='text-xs md:text-sm text-white/50 mt-1'>{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
