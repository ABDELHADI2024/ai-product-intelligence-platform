import Link from 'next/link'
import {
  BrainCircuit,
  GitCompare,
  Layers3,
  Search,
  Sparkles,
  Trophy,
  Building2,
  Menu,
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/78 shadow-[0_12px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1420px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 shadow-[0_0_34px_rgba(34,211,238,0.12)] transition group-hover:border-cyan-300/45 group-hover:bg-cyan-300/15">
            <BrainCircuit className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-[#020617] bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
          </div>

          <div className="leading-none">
            <p className="text-lg font-black tracking-[-0.04em] text-white">
              Witflag
            </p>
            <p className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300 sm:block">
              AI Smartphone Intelligence
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1.5 lg:flex">
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
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-200 sm:inline-flex"
            aria-label="Search"
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

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-2 lg:hidden">
        <nav className="mx-auto flex max-w-[1420px] gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-bold text-slate-300"
              >
                <Icon className="h-4 w-4 text-cyan-300" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
