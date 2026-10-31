'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ─── Brand tokens ─────────────────────────────────────── */
const C = {
  teal:    '#2a9aa4',
  navy:    '#0a1626',
  card:    '#0d1b2a',
  card2:   '#0f2035',
  border:  '#1a2e42',
  yellow:  '#f5c842',
  orange:  '#f07c3a',
  green:   '#4caf7d',
  violet:  '#8b5cf6',
  blue:    '#60a5fa',
  rose:    '#f43f5e',
  text:    '#e2eaf3',
  muted:   '#7a94ab',
  bg:      '#080f1a',
}

/* ─── Collection metadata ──────────────────────────────── */
const COLS = [
  { slug: 'projects',               label: 'Projects',           icon: '🏗️', clr: '#2a9aa4' },
  { slug: 'posts',                  label: 'Blog Posts',         icon: '✍️', clr: '#818cf8' },
  { slug: 'services',               label: 'Services',           icon: '⚙️', clr: '#4caf7d' },
  { slug: 'testimonials',           label: 'Testimonials',       icon: '💬', clr: '#f5c842' },
  { slug: 'clients',                label: 'Clients',            icon: '🤝', clr: '#e879f9' },
  { slug: 'media',                  label: 'Media',              icon: '🖼️', clr: '#f07c3a' },
  { slug: 'team-members',           label: 'Team Members',       icon: '👥', clr: '#34d399' },
  { slug: 'faq-items',              label: 'FAQ Items',          icon: '❓', clr: '#60a5fa' },
  { slug: 'industries',             label: 'Industries',         icon: '🏭', clr: '#8b5cf6' },
  { slug: 'pricing-tiers',          label: 'Pricing Tiers',      icon: '💎', clr: '#f59e0b' },
  { slug: 'contact-submissions',    label: 'Contact Leads',      icon: '📩', clr: '#f07c3a' },
  { slug: 'newsletter-subscribers', label: 'Subscribers',        icon: '📧', clr: '#4caf7d' },
  { slug: 'blog-categories',        label: 'Blog Categories',    icon: '🏷️', clr: '#8b5cf6' },
  { slug: 'awards',                 label: 'Awards',             icon: '🏆', clr: '#f59e0b' },
  { slug: 'partners',               label: 'Partners',           icon: '🌐', clr: '#06b6d4' },
  { slug: 'job-listings',           label: 'Job Listings',       icon: '💼', clr: '#84cc16' },
  { slug: 'users',                  label: 'Users',              icon: '👤', clr: '#f43f5e' },
] as const

const GLOBALS = [
  { slug: 'company-settings', label: 'Company Settings', icon: '🏢' },
  { slug: 'stats',            label: 'Stats Numbers',    icon: '📊' },
  { slug: 'trust-bar',        label: 'Trust Bar',        icon: '✅' },
  { slug: 'process-steps',    label: 'Process Steps',    icon: '🔄' },
  { slug: 'homepage-hero',    label: 'Homepage Hero',    icon: '🌟' },
  { slug: 'navigation',       label: 'Navigation',       icon: '🧭' },
  { slug: 'footer-settings',  label: 'Footer Settings',  icon: '📌' },
  { slug: 'seo-defaults',     label: 'SEO Defaults',     icon: '🔍' },
] as const

type Doc = { id: string; email?: string; name?: string; createdAt?: string }

/* ─── helpers ──────────────────────────────────────────── */
function timeAgo(iso?: string): string {
  if (!iso) return ''
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  const m = Math.floor(secs / 60); if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60);   if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/* ─── Animated counter ─────────────────────────────────── */
function Count({ n, loading }: { n: number; loading: boolean }) {
  const [disp, setDisp] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    if (loading || n === 0) { setDisp(n); return }
    const start = Date.now(), dur = 600
    const step = () => {
      const t = Math.min((Date.now() - start) / dur, 1)
      setDisp(Math.round(t * n))
      if (t < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [n, loading])
  return <>{loading ? '—' : disp.toLocaleString()}</>
}

/* ─── Main Dashboard ────────────────────────────────────── */
export function DashboardView() {
  const [counts,   setCounts]   = useState<Record<string, number>>({})
  const [contacts, setContacts] = useState<Doc[]>([])
  const [subs,     setSubs]     = useState<Doc[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    void (async () => {
      const countRes = await Promise.all(
        COLS.map(c =>
          fetch(`/api/${c.slug}?limit=0&depth=0`)
            .then(r => r.json())
            .then((d: { totalDocs?: number }) => [c.slug, d.totalDocs ?? 0] as const)
            .catch(() => [c.slug, 0] as const)
        )
      )
      const nc: Record<string, number> = {}
      countRes.forEach(([s, n]) => { nc[s] = n })
      setCounts(nc)

      const [cData, sData] = await Promise.all([
        fetch('/api/contact-submissions?limit=5&sort=-createdAt&depth=0').then(r => r.json()).catch(() => ({ docs: [] })),
        fetch('/api/newsletter-subscribers?limit=5&sort=-createdAt&depth=0').then(r => r.json()).catch(() => ({ docs: [] })),
      ])
      setContacts((cData as { docs?: Doc[] }).docs ?? [])
      setSubs((sData as { docs?: Doc[] }).docs ?? [])
      setLoading(false)
    })()
  }, [])

  const totalContent = (counts['projects'] ?? 0) + (counts['posts'] ?? 0) + (counts['services'] ?? 0)
  const totalLeads   = counts['contact-submissions'] ?? 0
  const totalSubs    = counts['newsletter-subscribers'] ?? 0
  const totalTeam    = counts['team-members'] ?? 0
  const maxCount     = Math.max(...Object.values(counts), 1)

  const bg      = C.bg
  const dateStr = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

  return (
    <div style={{ fontFamily:'system-ui,-apple-system,BlinkMacSystemFont,sans-serif', background:bg, minHeight:'100vh', color:C.text }}>

      {/* ── HERO ── */}
      <div style={{
        background:`linear-gradient(135deg, ${C.navy} 0%, #0c1f32 60%, #0a1a2a 100%)`,
        borderBottom:`1px solid ${C.border}`, padding:'32px 40px 28px', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-100, right:-80,  width:320, height:320, borderRadius:'50%', background:`${C.teal}10`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:250, height:250, borderRadius:'50%', background:`${C.teal}08`, pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:C.teal, boxShadow:`0 0 10px ${C.teal}`, display:'inline-block' }} />
              <span style={{ color:C.muted, fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', fontWeight:600 }}>
                ddotsmedia Technologies · Admin Panel
              </span>
            </div>
            <h1 style={{ margin:0, fontSize:26, fontWeight:700, color:C.text, lineHeight:1.25 }}>
              {getGreeting()}, Admin 👋
            </h1>
            <p style={{ margin:'6px 0 0', color:C.muted, fontSize:13 }}>{dateStr}</p>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
            <QBtn href="/admin/collections/projects/create" label="+ Project"  bg={C.teal}    />
            <QBtn href="/admin/collections/posts/create"    label="+ Blog Post" bg="#818cf8"  />
            <QBtn href="/admin/collections/media/create"    label="+ Media"    bg={C.orange}  />
            <QBtn href="/" label="↗ Live Site" bg={C.border} />
          </div>
        </div>

        {/* Key metrics */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14, marginTop:26, position:'relative', zIndex:1 }}>
          {[
            { label:'Content Items', val:totalContent, icon:'📝', clr:'#818cf8' },
            { label:'Contact Leads', val:totalLeads,   icon:'📩', clr:C.orange  },
            { label:'Subscribers',   val:totalSubs,    icon:'📧', clr:C.green   },
            { label:'Team Members',  val:totalTeam,    icon:'👥', clr:'#34d399' },
          ].map(m => (
            <div key={m.label} style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${m.clr}25`, borderRadius:10, padding:'15px 18px', backdropFilter:'blur(8px)' }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{m.icon}</div>
              <div style={{ fontSize:22, fontWeight:700, color:m.clr, lineHeight:1 }}>
                <Count n={m.val} loading={loading} />
              </div>
              <div style={{ color:C.muted, fontSize:12, marginTop:5 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding:'28px 40px 48px', display:'flex', flexDirection:'column', gap:32 }}>

        {/* Collections */}
        <Sec title="Collections" sub={`17 content types — ${loading ? '…' : Object.values(counts).reduce((a,b)=>a+b,0).toLocaleString()} total documents`}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:10 }}>
            {COLS.map(col => (
              <ColCard key={col.slug} col={col} count={counts[col.slug] ?? 0} loading={loading} />
            ))}
          </div>
        </Sec>

        {/* Globals + Recent */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          <Sec title="Globals" sub="Site-wide configuration">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {GLOBALS.map(g => <GlobCard key={g.slug} g={g} />)}
            </div>
          </Sec>

          <Sec title="Recent Activity" sub="Latest leads & signups">
            {loading ? <p style={{ color:C.muted, fontSize:13, padding:'16px 0' }}>Loading…</p> : (
              <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                {contacts.slice(0,4).map(c => (
                  <ActRow key={`c-${c.id}`} icon="📩" clr={C.orange}
                    label={(c as unknown as Record<string,string>)['name'] ?? c.email ?? 'Contact'}
                    sub="Contact submission"
                    href={`/admin/collections/contact-submissions/${c.id}`}
                    time={c.createdAt} />
                ))}
                {subs.slice(0,3).map(s => (
                  <ActRow key={`s-${s.id}`} icon="📧" clr={C.green}
                    label={s.email ?? 'Subscriber'}
                    sub="Newsletter signup"
                    href={`/admin/collections/newsletter-subscribers/${s.id}`}
                    time={s.createdAt} />
                ))}
                {contacts.length === 0 && subs.length === 0 &&
                  <p style={{ color:C.muted, fontSize:12, padding:'16px 0' }}>No recent activity yet.</p>}
              </div>
            )}
          </Sec>
        </div>

        {/* Quick actions */}
        <Sec title="Quick Actions" sub="Common tasks at a click">
          <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
            {[
              { label:'New Project',      href:'/admin/collections/projects/create',            clr:C.teal    },
              { label:'New Blog Post',    href:'/admin/collections/posts/create',               clr:'#818cf8' },
              { label:'Add Service',      href:'/admin/collections/services/create',            clr:C.green   },
              { label:'Add Client',       href:'/admin/collections/clients/create',             clr:'#e879f9' },
              { label:'Upload Media',     href:'/admin/collections/media/create',               clr:C.orange  },
              { label:'Add Team Member',  href:'/admin/collections/team-members/create',        clr:'#34d399' },
              { label:'New Testimonial',  href:'/admin/collections/testimonials/create',        clr:C.yellow  },
              { label:'Post a Job',       href:'/admin/collections/job-listings/create',        clr:'#84cc16' },
              { label:'Edit Hero',        href:'/admin/globals/homepage-hero',                  clr:'#e879f9' },
              { label:'Edit Navigation',  href:'/admin/globals/navigation',                     clr:C.blue    },
              { label:'Company Settings', href:'/admin/globals/company-settings',               clr:C.teal    },
              { label:'SEO Defaults',     href:'/admin/globals/seo-defaults',                   clr:'#fb923c' },
              { label:'View Live Site',   href:'/',                                              clr:C.border  },
            ].map(a => <Pill key={a.href} {...a} />)}
          </div>
        </Sec>

        {/* Score bars */}
        <Sec title="Content Overview" sub="Fill rate by collection">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 32px' }}>
            {COLS.filter(c => c.slug !== 'media').slice(0, 12).map(col => (
              <ScoreBar key={col.slug} label={col.label} clr={col.clr}
                count={counts[col.slug] ?? 0} max={maxCount} loading={loading}
                href={`/admin/collections/${col.slug}`} />
            ))}
          </div>
        </Sec>

        <div style={{ textAlign:'center', paddingTop:16, borderTop:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, fontSize:11 }}>
            ddotsmedia Technologies · Payload CMS v3.85 · Next.js 15
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-components ─────────────────────────────────────── */

function Sec({ title, sub, children }: { title:string; sub:string; children:React.ReactNode }) {
  return (
    <div>
      <div style={{ marginBottom:14 }}>
        <h2 style={{ margin:0, fontSize:15, fontWeight:700, color:C.text }}>{title}</h2>
        <p style={{ margin:'3px 0 0', fontSize:12, color:C.muted }}>{sub}</p>
      </div>
      {children}
    </div>
  )
}

function ColCard({ col, count, loading }: { col:typeof COLS[number]; count:number; loading:boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={`/admin/collections/${col.slug}`} style={{
      background: hov ? `${col.clr}10` : C.card,
      border:`1px solid ${hov ? col.clr : C.border}`,
      borderRadius:12, display:'block', textDecoration:'none', padding:'15px 16px',
      transform: hov ? 'translateY(-2px)' : 'none', transition:'all .18s',
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        <span style={{ fontSize:22 }}>{col.icon}</span>
        <span style={{ fontSize:13, fontWeight:700, color:col.clr, background:`${col.clr}18`, padding:'2px 9px', borderRadius:20, lineHeight:'1.7' }}>
          <Count n={count} loading={loading} />
        </span>
      </div>
      <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{col.label}</div>
      <div style={{ color:C.muted, fontSize:11, marginTop:3 }}>/{col.slug}</div>
    </a>
  )
}

function GlobCard({ g }: { g:typeof GLOBALS[number] }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={`/admin/globals/${g.slug}`} style={{
      background: hov ? `${C.teal}12` : C.card,
      border:`1px solid ${hov ? C.teal : C.border}`,
      borderRadius:8, display:'flex', alignItems:'center', gap:10,
      padding:'11px 13px', textDecoration:'none', transition:'all .18s',
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontSize:17 }}>{g.icon}</span>
      <span style={{ fontSize:12, fontWeight:600, color:C.text }}>{g.label}</span>
    </a>
  )
}

function ActRow({ icon, clr, label, sub, href, time }: { icon:string; clr:string; label:string; sub:string; href:string; time?:string }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} style={{
      background:C.card, border:`1px solid ${hov ? clr : C.border}`,
      borderRadius:8, display:'flex', alignItems:'center', gap:11,
      padding:'9px 13px', textDecoration:'none', transition:'border-color .15s',
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width:30, height:30, borderRadius:7, background:`${clr}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:12, fontWeight:600, color:C.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</div>
        <div style={{ color:C.muted, fontSize:11 }}>{sub}</div>
      </div>
      <div style={{ color:C.muted, fontSize:11, flexShrink:0 }}>{timeAgo(time)}</div>
    </a>
  )
}

function QBtn({ href, label, bg }: { href:string; label:string; bg:string }) {
  return (
    <a href={href} style={{
      display:'inline-flex', alignItems:'center', padding:'8px 16px',
      background:`${bg}22`, border:`1px solid ${bg}55`,
      borderRadius:8, color: bg === C.border ? C.muted : bg,
      textDecoration:'none', fontSize:13, fontWeight:600,
    }}>{label}</a>
  )
}

function Pill({ label, href, clr }: { label:string; href:string; clr:string }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} style={{
      display:'inline-flex', alignItems:'center', padding:'7px 15px',
      border:`1px solid ${hov ? clr : `${clr}40`}`,
      borderRadius:20, fontSize:12, fontWeight:600,
      color: hov ? '#fff' : clr, background: hov ? clr : `${clr}12`,
      textDecoration:'none', transition:'all .18s',
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{label}</a>
  )
}

function ScoreBar({ label, clr, count, max, loading, href }: { label:string; clr:string; count:number; max:number; loading:boolean; href:string }) {
  const pct = max > 0 ? (count / max) * 100 : 0
  return (
    <a href={href} style={{ textDecoration:'none', display:'block' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:12, color:C.text, fontWeight:500 }}>{label}</span>
        <span style={{ fontSize:12, color:clr, fontWeight:700 }}>{loading ? '—' : count}</span>
      </div>
      <div style={{ height:5, background:C.border, borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:clr, borderRadius:3, transition:'width .8s ease' }} />
      </div>
    </a>
  )
}
