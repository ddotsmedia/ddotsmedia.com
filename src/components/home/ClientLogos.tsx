'use client';

const clients = [
  { name: 'Gayathi', initials: 'GA', color: 'bg-cyan-500' },
  { name: 'AyurConnect', initials: 'AC', color: 'bg-orange-500' },
  { name: 'Ddots Jobs', initials: 'DJ', color: 'bg-blue-500' },
  { name: 'Ddots Realty', initials: 'DR', color: 'bg-emerald-500' },
  { name: 'Coffee Beans', initials: 'CB', color: 'bg-yellow-500' },
  { name: 'Milestones', initials: 'MC', color: 'bg-red-500' },
  { name: 'Kayakalp', initials: 'KV', color: 'bg-green-500' },
  { name: 'Ddots Shop', initials: 'DS', color: 'bg-pink-500' },
  { name: 'Synergy', initials: 'SB', color: 'bg-indigo-500' },
  { name: 'UAE Malayalees', initials: 'UM', color: 'bg-purple-500' },
  { name: 'Abu Dhabi Mal', initials: 'AM', color: 'bg-violet-500' },
  { name: 'Health Portal', initials: 'HP', color: 'bg-teal-500' },
  { name: 'Medicore', initials: 'MC', color: 'bg-fuchsia-500' },
  { name: 'Bayrotna', initials: 'BR', color: 'bg-rose-500' },
  { name: 'Ddots HR', initials: 'HR', color: 'bg-lime-500' },
  { name: 'Mialisauh', initials: 'MS', color: 'bg-sky-500' },
  { name: 'Milstonm', initials: 'ML', color: 'bg-amber-500' },
  { name: 'Doctor Network', initials: 'DN', color: 'bg-slate-500' },
  { name: 'ERP System', initials: 'ER', color: 'bg-stone-500' },
  { name: 'AI Tools Hub', initials: 'AT', color: 'bg-zinc-500' },
  { name: 'Domain Monitor', initials: 'DM', color: 'bg-neutral-500' },
  { name: 'Venale', initials: 'VL', color: 'bg-cyan-600' },
  { name: 'Suqly', initials: 'SQ', color: 'bg-blue-600' },
  { name: 'FinTech', initials: 'FT', color: 'bg-green-600' },
  { name: 'Analytics', initials: 'AD', color: 'bg-orange-600' },
  { name: 'CMS Hub', initials: 'CH', color: 'bg-red-600' },
  { name: 'Social Network', initials: 'SN', color: 'bg-purple-600' },
  { name: 'Learning App', initials: 'LA', color: 'bg-pink-600' },
  { name: 'Travel Portal', initials: 'TP', color: 'bg-yellow-600' },
  { name: 'Real Estate AI', initials: 'RA', color: 'bg-indigo-600' },
];

export function ClientLogos() {
  return (
    <section className='py-20 bg-white/2 border-y border-white/10'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h3 className='text-lg font-semibold text-white/70'>Trusted by 500+ Companies</h3>
          <p className='text-sm text-white/50 mt-2'>Building solutions across industries</p>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4'>
          {clients.map((client) => (
            <div
              key={client.name}
              className={`${client.color} w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm text-center p-2 transition-transform hover:scale-110`}
              title={client.name}
            >
              <span className='line-clamp-2'>{client.initials}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
