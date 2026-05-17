import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/search', label: 'Search' },
  { href: '/assistant', label: 'AI Assistant' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-black tracking-[0.25em] text-white">WITFLAG</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300">Smartphone AI</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-cyan-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200 hover:border-cyan-300/40 hover:text-cyan-200 sm:flex"
        >
          <Search className="h-4 w-4" />
          Search
        </Link>
      </div>
    </header>
  );
}
