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
      { href: '/products', label: 'Products' },
      { href: '/search', label: 'Smart Search' },
      { href: '/compare', label: 'Compare' },
      { href: '/assistant', label: 'Guided Assistant' },
    ],
  },
  {
    title: 'Buying Guides',
    links: [
      { href: '/best', label: 'Best phones' },
      { href: '/best/best-camera-phones', label: 'Camera phones' },
      { href: '/best/best-battery-phones', label: 'Battery phones' },
      { href: '/best/best-value-phones', label: 'Value phones' },
    ],
  },
  {
    title: 'Brands',
    links: [
      { href: '/brands', label: 'All brands' },
      { href: '/brands/xiaomi', label: 'Xiaomi' },
      { href: '/brands/vivo', label: 'Vivo' },
      { href: '/brands/oneplus', label: 'OnePlus' },
    ],
  },
]

const highlights = [
  { icon: Layers3, label: 'Real product catalog' },
  { icon: Search, label: 'Smart discovery' },
  { icon: GitCompare, label: 'Comparison logic' },
  { icon: Trophy, label: 'SEO guides' },
  { icon: Building2, label: 'Brand intelligence' },
  { icon: Sparkles, label: 'AI-ready platform' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.13),transparent_38%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1420px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/25">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-black tracking-[-0.04em]">Witflag</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                  AI Smartphone Intelligence
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
              Smartphone discovery, comparison, guided recommendations, scores,
              and buying guides powered by structured product intelligence.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-300"
                  >
                    <Icon className="h-4 w-4 text-cyan-300" />
                    {item.label}
                  </div>
                )
              })}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="pt-2">
              <h3 className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                {group.title}
              </h3>

              <div className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-slate-400 transition hover:text-cyan-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Witflag. AI-native smartphone intelligence platform.
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-300" />
              Contact-ready
            </span>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <span>International-ready</span>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <span>Built on structured data</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
