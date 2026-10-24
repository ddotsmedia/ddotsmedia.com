import type { ServerProps } from 'payload'
import React from 'react'

/* ─── Category definitions ─────────────────────────────── */
type ItemType = 'collection' | 'global'
interface NavItem { slug: string; icon: string; label: string; type: ItemType }
interface NavCategory {
  id: string; label: string; icon: string; color: string
  defaultOpen?: boolean; items: NavItem[]
}

const CATEGORIES: NavCategory[] = [
  {
    id: 'portfolio', label: 'Portfolio', icon: '🏗️', color: '#2a9aa4', defaultOpen: true,
    items: [
      { slug: 'projects', icon: '🏗️', label: 'Projects', type: 'collection' },
    ],
  },
  {
    id: 'content', label: 'Content', icon: '✍️', color: '#818cf8', defaultOpen: true,
    items: [
      { slug: 'posts',            icon: '✍️', label: 'Blog Posts',       type: 'collection' },
      { slug: 'blog-categories',  icon: '🏷️', label: 'Blog Categories',  type: 'collection' },
    ],
  },
  {
    id: 'business', label: 'Business', icon: '💼', color: '#4caf7d', defaultOpen: true,
    items: [
      { slug: 'services',      icon: '⚙️', label: 'Services',       type: 'collection' },
      { slug: 'industries',    icon: '🏭', label: 'Industries',     type: 'collection' },
      { slug: 'pricing-tiers', icon: '💎', label: 'Pricing Tiers',  type: 'collection' },
      { slug: 'job-listings',  icon: '💼', label: 'Job Listings',   type: 'collection' },
    ],
  },
  {
    id: 'marketing', label: 'Marketing', icon: '📣', color: '#f5c842',
    items: [
      { slug: 'testimonials', icon: '💬', label: 'Testimonials', type: 'collection' },
      { slug: 'clients',      icon: '🤝', label: 'Clients',      type: 'collection' },
      { slug: 'awards',       icon: '🏆', label: 'Awards',       type: 'collection' },
      { slug: 'partners',     icon: '🌐', label: 'Partners',     type: 'collection' },
    ],
  },
  {
    id: 'crm', label: 'CRM & Leads', icon: '📬', color: '#f07c3a',
    items: [
      { slug: 'contact-submissions',    icon: '📩', label: 'Contact Leads', type: 'collection' },
      { slug: 'newsletter-subscribers', icon: '📧', label: 'Subscribers',   type: 'collection' },
    ],
  },
  {
    id: 'people', label: 'People', icon: '👥', color: '#34d399',
    items: [
      { slug: 'team-members', icon: '👥', label: 'Team Members', type: 'collection' },
      { slug: 'media',        icon: '🖼️', label: 'Media Library', type: 'collection' },
      { slug: 'faq-items',   icon: '❓', label: 'FAQ Items',     type: 'collection' },
      { slug: 'users',        icon: '👤', label: 'Admin Users',  type: 'collection' },
    ],
  },
  {
    id: 'settings', label: 'Site Settings', icon: '⚙️', color: '#60a5fa',
    items: [
      { slug: 'company-settings', icon: '🏢', label: 'Company',        type: 'global' },
      { slug: 'homepage-hero',    icon: '🌟', label: 'Homepage Hero',  type: 'global' },
      { slug: 'navigation',       icon: '🧭', label: 'Navigation',     type: 'global' },
      { slug: 'footer-settings',  icon: '📌', label: 'Footer',         type: 'global' },
      { slug: 'stats',            icon: '📊', label: 'Stats',          type: 'global' },
      { slug: 'trust-bar',        icon: '✅', label: 'Trust Bar',      type: 'global' },
      { slug: 'process-steps',    icon: '🔄', label: 'Process Steps',  type: 'global' },
      { slug: 'seo-defaults',     icon: '🔍', label: 'SEO Defaults',   type: 'global' },
    ],
  },
]

/* ─── Styles ───────────────────────────────────────────── */
const CSS = `
  .adm-nav {
    font-family: system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
    background: #070e18;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #1a2e42 transparent;
  }
  .adm-nav::-webkit-scrollbar { width:4px }
  .adm-nav::-webkit-scrollbar-track { background:transparent }
  .adm-nav::-webkit-scrollbar-thumb { background:#1a2e42; border-radius:2px }

  /* ── Logo / brand header ── */
  .adm-brand {
    display:flex; align-items:center; gap:10px;
    padding:18px 16px 14px;
    border-bottom: 1px solid #111d2b;
    text-decoration:none;
  }
  .adm-brand-dot {
    width:28px; height:28px; border-radius:6px;
    background: linear-gradient(135deg,#2a9aa4 0%,#0f5f66 100%);
    display:flex; align-items:center; justify-content:center;
    font-size:14px; font-weight:800; color:#fff; flex-shrink:0;
  }
  .adm-brand-name { font-size:13px; font-weight:700; color:#e2eaf3; letter-spacing:.02em; }
  .adm-brand-sub  { font-size:10px; color:#4a6880; letter-spacing:.04em; }

  /* ── Dashboard link ── */
  .adm-dash-link {
    display:flex; align-items:center; gap:10px;
    margin:10px 10px 4px; padding:8px 10px; border-radius:8px;
    background: linear-gradient(135deg,rgba(42,154,164,.18) 0%,rgba(15,95,102,.12) 100%);
    border:1px solid rgba(42,154,164,.25);
    text-decoration:none; transition:all .15s;
  }
  .adm-dash-link:hover { background:rgba(42,154,164,.28); border-color:rgba(42,154,164,.45); }
  .adm-dash-icon { font-size:16px; }
  .adm-dash-text { font-size:12px; font-weight:700; color:#2a9aa4; letter-spacing:.03em; }

  /* ── Category group ── */
  .adm-cat { border:none; }
  .adm-cat + .adm-cat { margin-top:2px; }

  .adm-cat-summary {
    list-style:none; cursor:pointer; user-select:none;
    display:flex; align-items:center; gap:8px;
    padding:7px 14px 7px 12px;
    border-left:2px solid transparent;
    transition:background .13s, border-color .13s;
    outline:none;
  }
  .adm-cat-summary::-webkit-details-marker { display:none }
  .adm-cat-summary:hover { background:rgba(255,255,255,.04); }
  .adm-cat[open] > .adm-cat-summary { border-left-color: var(--cc); }

  .adm-cat-emoji { font-size:13px; width:18px; text-align:center; flex-shrink:0; }
  .adm-cat-label {
    flex:1; font-size:10px; font-weight:700; letter-spacing:.1em;
    text-transform:uppercase; color:#4a6880; transition:color .13s;
  }
  .adm-cat[open] > .adm-cat-summary .adm-cat-label { color: var(--cc); }
  .adm-cat-summary:hover .adm-cat-label { color:#7a94ab; }

  .adm-cat-arrow {
    font-size:11px; color:#2a3f55; transition:transform .2s, color .13s;
    display:inline-block;
  }
  .adm-cat[open] > .adm-cat-summary .adm-cat-arrow {
    transform:rotate(90deg); color: var(--cc);
  }

  /* ── Category items wrapper ── */
  .adm-cat-items {
    border-left: 2px solid var(--cc-dim, #111d2b);
    margin-left:20px;
    padding:2px 0 6px;
  }

  /* ── Nav item ── */
  .adm-item {
    display:flex; align-items:center; gap:9px;
    padding:6px 14px 6px 10px; text-decoration:none;
    border-radius:0 6px 6px 0; margin:1px 6px 1px 0;
    transition:background .12s;
    position:relative;
  }
  .adm-item:hover { background:rgba(255,255,255,.06); }
  .adm-item:hover .adm-item-label { color:#e2eaf3; }
  .adm-item-icon { font-size:13px; width:16px; text-align:center; flex-shrink:0; opacity:.8; }
  .adm-item-label { flex:1; font-size:12px; color:#6a8499; transition:color .12s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .adm-item-count {
    font-size:10px; font-weight:700; min-width:18px; height:16px;
    padding:0 5px; border-radius:8px;
    display:flex; align-items:center; justify-content:center;
    background:rgba(255,255,255,.07); color:#4a6880;
    letter-spacing:.02em;
  }
  .adm-item-global {
    font-size:9px; padding:1px 4px; border-radius:3px;
    background:rgba(96,165,250,.12); color:#60a5fa; letter-spacing:.04em;
  }

  /* ── Divider ── */
  .adm-divider { height:1px; background:#111d2b; margin:6px 12px; }
`

/* ─── Helpers ──────────────────────────────────────────── */
async function safeCount(payload: ServerProps['payload'], slug: string): Promise<number> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = await (payload as any).count({ collection: slug })
    return r?.totalDocs ?? 0
  } catch { return -1 }
}

/* ─── Component ────────────────────────────────────────── */
export async function AdminNav(props: ServerProps) {
  const { payload } = props
  if (!payload?.config) return null

  /* Fetch counts for all collection items in parallel */
  const allCollectionItems = CATEGORIES.flatMap(c => c.items.filter(i => i.type === 'collection'))
  const countResults = await Promise.all(
    allCollectionItems.map(item => safeCount(payload, item.slug))
  )
  const counts: Record<string, number> = {}
  allCollectionItems.forEach((item, idx) => { counts[item.slug] = countResults[idx] })

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav className="adm-nav">

        {/* Brand header */}
        <a href="/admin" className="adm-brand">
          <div className="adm-brand-dot">D</div>
          <div>
            <div className="adm-brand-name">Ddotsmedia</div>
            <div className="adm-brand-sub">ADMIN PANEL</div>
          </div>
        </a>

        {/* Dashboard quick-link */}
        <a href="/admin" className="adm-dash-link">
          <span className="adm-dash-icon">⬡</span>
          <span className="adm-dash-text">Dashboard</span>
        </a>

        <div className="adm-divider" style={{ margin:'8px 10px' }} />

        {/* Categorized sections */}
        {CATEGORIES.map(cat => (
          <details
            key={cat.id}
            className="adm-cat"
            open={cat.defaultOpen ?? false}
            style={{ ['--cc' as string]: cat.color, ['--cc-dim' as string]: cat.color + '30' }}
          >
            <summary className="adm-cat-summary">
              <span className="adm-cat-emoji">{cat.icon}</span>
              <span className="adm-cat-label">{cat.label}</span>
              <span className="adm-cat-arrow">›</span>
            </summary>

            <div className="adm-cat-items">
              {cat.items.map(item => {
                const href = item.type === 'collection'
                  ? `/admin/collections/${item.slug}`
                  : `/admin/globals/${item.slug}`
                const count = counts[item.slug]
                return (
                  <a key={item.slug} href={href} className="adm-item">
                    <span className="adm-item-icon">{item.icon}</span>
                    <span className="adm-item-label">{item.label}</span>
                    {item.type === 'global' && (
                      <span className="adm-item-global">G</span>
                    )}
                    {item.type === 'collection' && count >= 0 && (
                      <span className="adm-item-count">{count}</span>
                    )}
                  </a>
                )
              })}
            </div>
          </details>
        ))}

        {/* Bottom spacer */}
        <div style={{ height: 24 }} />
      </nav>
    </>
  )
}
