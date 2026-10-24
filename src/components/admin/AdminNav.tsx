import type { ServerProps } from 'payload'
import React from 'react'

/* ─── Icon / colour lookup ─────────────────────────────── */
const COL_META: Record<string, { icon: string; clr: string; label: string }> = {
  'projects':               { icon: '🏗️', clr: '#2a9aa4', label: 'Projects'            },
  'posts':                  { icon: '✍️', clr: '#818cf8', label: 'Blog Posts'           },
  'services':               { icon: '⚙️', clr: '#4caf7d', label: 'Services'             },
  'testimonials':           { icon: '💬', clr: '#f5c842', label: 'Testimonials'         },
  'clients':                { icon: '🤝', clr: '#e879f9', label: 'Clients'              },
  'media':                  { icon: '🖼️', clr: '#f07c3a', label: 'Media'               },
  'team-members':           { icon: '👥', clr: '#34d399', label: 'Team Members'         },
  'faq-items':              { icon: '❓', clr: '#60a5fa', label: 'FAQ Items'            },
  'industries':             { icon: '🏭', clr: '#8b5cf6', label: 'Industries'           },
  'pricing-tiers':          { icon: '💎', clr: '#f59e0b', label: 'Pricing Tiers'        },
  'contact-submissions':    { icon: '📩', clr: '#f07c3a', label: 'Contact Leads'        },
  'newsletter-subscribers': { icon: '📧', clr: '#4caf7d', label: 'Subscribers'          },
  'blog-categories':        { icon: '🏷️', clr: '#8b5cf6', label: 'Blog Categories'     },
  'awards':                 { icon: '🏆', clr: '#f59e0b', label: 'Awards'               },
  'partners':               { icon: '🌐', clr: '#06b6d4', label: 'Partners'             },
  'job-listings':           { icon: '💼', clr: '#84cc16', label: 'Job Listings'         },
  'users':                  { icon: '👤', clr: '#f43f5e', label: 'Users'                },
}

const GLOB_META: Record<string, { icon: string; clr: string; label: string }> = {
  'company-settings': { icon: '🏢', clr: '#2a9aa4', label: 'Company Settings' },
  'stats':            { icon: '📊', clr: '#818cf8', label: 'Stats Numbers'    },
  'trust-bar':        { icon: '✅', clr: '#4caf7d', label: 'Trust Bar'        },
  'process-steps':    { icon: '🔄', clr: '#f5c842', label: 'Process Steps'    },
  'homepage-hero':    { icon: '🌟', clr: '#e879f9', label: 'Homepage Hero'    },
  'navigation':       { icon: '🧭', clr: '#60a5fa', label: 'Navigation'       },
  'footer-settings':  { icon: '📌', clr: '#8b5cf6', label: 'Footer Settings'  },
  'seo-defaults':     { icon: '🔍', clr: '#34d399', label: 'SEO Defaults'     },
}

/* ─── Shared CSS injected once ─────────────────────────── */
const CSS = `
.adm-nav { font-family: system-ui,-apple-system,BlinkMacSystemFont,sans-serif; }
.adm-nav a { display:flex; align-items:center; gap:9px; padding:6px 16px; text-decoration:none; border-left:2px solid transparent; transition:background .14s,border-color .14s; }
.adm-nav a:hover { background:rgba(42,154,164,.11); border-left-color:#2a9aa4; }
.adm-nav a:hover .adm-lbl { color:#e2eaf3; }
.adm-lbl { font-size:12px; color:#7a94ab; transition:color .14s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.adm-icon { font-size:14px; width:18px; text-align:center; flex-shrink:0; }
.adm-sec { padding:10px 16px 4px; color:#7a94ab; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
.adm-dash { padding:10px 16px !important; border-left:none !important; border-bottom:1px solid #1a2e42; margin-bottom:6px; font-size:13px !important; font-weight:700; color:#2a9aa4 !important; }
.adm-dash:hover { background:rgba(42,154,164,.08) !important; }
`

/* ─── Main Nav (server component) ──────────────────────── */
export async function AdminNav(props: ServerProps) {
  const { payload, visibleEntities } = props
  if (!payload?.config) return null

  const { collections, globals } = payload.config

  const cols = (collections ?? []).filter(c =>
    !visibleEntities || (visibleEntities.collections as string[]).includes(c.slug)
  )
  const globs = (globals ?? []).filter(g =>
    !visibleEntities || (visibleEntities.globals as string[]).includes(g.slug)
  )

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <nav className="adm-nav">

        {/* Dashboard shortcut */}
        <a href="/admin" className="adm-dash">
          <span className="adm-icon">⬡</span>
          <span>Dashboard</span>
        </a>

        {/* Collections */}
        <div className="adm-sec">Collections</div>
        {cols.map(c => {
          const m = COL_META[c.slug] ?? { icon: '📁', clr: '#7a94ab', label: c.slug }
          return (
            <a key={c.slug} href={`/admin/collections/${c.slug}`}>
              <span className="adm-icon">{m.icon}</span>
              <span className="adm-lbl">{m.label}</span>
            </a>
          )
        })}

        {/* Globals */}
        <div className="adm-sec" style={{ marginTop: 8 }}>Globals</div>
        {globs.map(g => {
          const m = GLOB_META[g.slug] ?? { icon: '⚙️', clr: '#7a94ab', label: g.slug }
          return (
            <a key={g.slug} href={`/admin/globals/${g.slug}`}>
              <span className="adm-icon">{m.icon}</span>
              <span className="adm-lbl">{m.label}</span>
            </a>
          )
        })}

      </nav>
    </>
  )
}
