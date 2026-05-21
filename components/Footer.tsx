import Link from 'next/link'
import {
  BrainCircuit,
  Building2,
  GitCompare,
  Layers3,
  Mail,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react'

const footerGroups = [
  {
    title: 'Platform',
    links: [
      { href: '/products',  label: 'Products'        },
      { href: '/search',    label: 'Smart Search'     },
      { href: '/compare',   label: 'Compare'          },
      { href: '/assistant', label: 'Guided Assistant' },
    ],
  },
  {
    title: 'Buying Guides',
    links: [
      { href: '/best',                     label: 'Best phones'    },
      { href: '/best/best-camera-phones',  label: 'Camera phones'  },
      { href: '/best/best-battery-phones', label: 'Battery phones' },
      { href: '/best/best-value-phones',   label: 'Value phones'   },
    ],
  },
  {
    title: 'Brands',
    links: [
      { href: '/brands',         label: 'All brands' },
      { href: '/brands/xiaomi',  label: 'Xiaomi'     },
      { href: '/brands/vivo',    label: 'Vivo'       },
      { href: '/brands/oneplus', label: 'OnePlus'    },
    ],
  },
]

const highlights = [
  { icon: Layers3,    label: 'Real product catalog' },
  { icon: Search,     label: 'Smart discovery'      },
  { icon: GitCompare, label: 'Comparison logic'     },
  { icon: Trophy,     label: 'SEO guides'           },
  { icon: Building2,  label: 'Brand intelligence'   },
  { icon: Sparkles,   label: 'AI-ready platform'    },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617] text-white">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.11),transparent_40%)]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1420px] px-4 py-10 sm:px-6 lg:px-8">

        {/* ── Main grid ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">

          {/* Brand card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-black tracking-[-0.04em]">Witflag</p>
                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  AI Smartphone Intelligence
                </p>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Smartphone discovery, comparison, guided recommendations, scores, and buying
              guides — powered by structured product intelligence.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] font-bold text-slate-400"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[11px] font-black uppercase tracking-[0.20em] text-cyan-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-slate-500 transition hover:text-cyan-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Witflag. AI-native smartphone intelligence platform.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-cyan-400" />
              Contact-ready
            </span>
            <span>International-ready</span>
            <span>Built on structured data</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
