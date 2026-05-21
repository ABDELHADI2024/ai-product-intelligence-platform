import Link from 'next/link'
import {
  BrainCircuit,
  Building2,
  GitCompare,
  Layers3,
  Menu,
  Search,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/products', label: 'Products', icon: Layers3 },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/assistant', label: 'Assistant', icon: Sparkles },
  { href: '/best', label: 'Best', icon: Trophy },
  { href: '/brands', label: 'Brands', icon: Building2 },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/72 text-white backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1420px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.12)] transition group-hover:border-cyan-300/50 group-hover:bg-cyan-300/15">
            <BrainCircuit className="h-7 w-7" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#020617] bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.85)]" />
          </div>

          <div>
            <p className="text-xl font-black tracking-[-0.05em] text-white">
              Witflag
            </p>
            <p className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300 sm:block">
              AI Smartphone Intelligence
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1.5 shadow-2xl shadow-black/20 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-100"
              >
                <Icon className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-300" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-200 sm:inline-flex"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            href="/assistant"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 text-sm font-black text-white shadow-[0_18px_45px_-22px_rgba(34,211,238,0.9)] transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="sm:hidden">AI</span>
          </Link>

          <details className="group relative lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-200 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
            </summary>

            <div className="absolute right-0 top-14 w-[min(86vw,360px)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl">
              <div className="grid gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-cyan-300" />
                        {item.label}
                      </span>
                      <span className="text-slate-600">→</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
