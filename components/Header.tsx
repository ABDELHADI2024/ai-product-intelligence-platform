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

const navItems = [
  { href: '/products',  label: 'Products',  icon: Layers3    },
  { href: '/search',    label: 'Search',    icon: Search     },
  { href: '/compare',   label: 'Compare',   icon: GitCompare },
  { href: '/assistant', label: 'Assistant', icon: Sparkles   },
  { href: '/best',      label: 'Best',      icon: Trophy     },
  { href: '/brands',    label: 'Brands',    icon: Building2  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/80 shadow-[0_8px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1420px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.12)] transition group-hover:border-cyan-300/45 group-hover:bg-cyan-300/15">
            <BrainCircuit className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#020617] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
          </div>
          <div className="leading-none">
            <p className="text-base font-black tracking-[-0.04em] text-white">Witflag</p>
            <p className="mt-0.5 hidden text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300 sm:block">
              AI Smartphone Intelligence
            </p>
          </div>
        </Link>

        {/* ── Desktop nav pill (lg+) ── */}
        <nav className="ml-4 hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold text-slate-400 transition hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              <Icon className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-cyan-300" />
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Right: Search + CTA + mobile details menu ── */}
        <div className="ml-auto flex items-center gap-2">

          {/* Search icon button */}
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-200 sm:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* AI Assistant CTA */}
          <Link
            href="/assistant"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 text-sm font-black text-white shadow-[0_14px_38px_-18px_rgba(34,211,238,0.95)] transition hover:-translate-y-px"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="sm:hidden">AI</span>
          </Link>

          {/* ── Mobile menu via native <details> (no JS needed) ── */}
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-200 [&::-webkit-details-marker]:hidden">
              {/* Hamburger icon drawn with spans — no extra package needed */}
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span className="block h-px w-4 rounded-full bg-current" />
                <span className="block h-px w-4 rounded-full bg-current" />
                <span className="block h-px w-2.5 rounded-full bg-current" />
              </span>
            </summary>

            {/* Dropdown panel */}
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 rounded-2xl border border-white/10 bg-[#030d1f]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  {label}
                </Link>
              ))}
            </div>
          </details>

        </div>
      </div>
    </header>
  )
}
