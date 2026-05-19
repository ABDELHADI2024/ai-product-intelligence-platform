import Link from 'next/link';
import { BrainCircuit, Search, Sparkles } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/search', label: 'Search' },
  { href: '/compare', label: 'Compare' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/best', label: 'Best' },
  { href: '/brands', label: 'Brands' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300">
            <BrainCircuit className="h-6 w-6" />
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-white">WITFLAG</p>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
              AI Smartphone Intelligence
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-violet-500/15 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="hidden rounded-full border border-white/10 bg-white/[0.05] p-3 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-200 sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            href="/assistant"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            <Sparkles className="h-4 w-4" />
            Assistant
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-3 lg:hidden">
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
