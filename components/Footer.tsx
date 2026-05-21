import Link from 'next/link'
import {
  BrainCircuit,
  Building2,
  GitCompare,
  Layers3,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react'

const columns = [
  {
    title: 'Platform',
    links: [
      { href: '/products', label: 'Products' },
      { href: '/search', label: 'Smart Search' },
      { href: '/compare', label: 'Compare' },
      { href: '/assistant', label: 'Assistant' },
    ],
  },
  {
    title: 'Guides',
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

const signals = [
  { icon: Layers3, label: 'Real catalog' },
  { icon: Search, label: 'Smart search' },
  { icon: GitCompare, label: 'Compare' },
  { icon: Trophy, label: 'SEO guides' },
  { icon: Building2, label: 'Brands' },
  { icon: Sparkles, label: 'AI-ready' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.13),transparent_42%)]" />

      <div className="relative mx-auto max-w-[1420px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/25">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
                  <BrainCircuit className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xl font-black tracking-[-0.05em]">Witflag</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                    AI Smartphone Intelligence
                  </p>
                </div>
              </Link>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                Smartphone discovery, comparison, guided recommendations, scores,
                and buying guides powered by structured product intelligence.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {signals.map((item) => {
                  const Icon = item.icon

                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-300"
                    >
                      <Icon className="h-4 w-4 text-cyan-300" />
                      {item.label}
                    </span>
                  )
                })}
              </div>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                  {column.title}
                </h3>

                <div className="mt-5 grid gap-3">
                  {column.links.map((link) => (
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

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Witflag. Built for structured smartphone intelligence.</p>
            <p>International-ready · Multi-currency-ready · RAG-ready later</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
