import Link from 'next/link';
import { BarChart3, Search, Sparkles } from 'lucide-react';

const nav = [
  ['Browse', '/products'],
  ['Search', '/search'],
  ['Compare', '/compare'],
  ['Guides', '/best'],
];

export default function Header() {
  return (
    <header className="nav-wrap">
      <div className="content-shell nav-inner">
        <Link href="/" className="nav-brand">
          <div className="logo-mark">W</div>
          <div className="nav-brand-copy">
            <div className="nav-brand-title">Witflag</div>
            <div className="nav-brand-sub">AI Smartphone Intelligence</div>
          </div>
        </Link>

        <nav className="nav-links">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" className="btn-ghost" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <Link href="/compare" className="btn-ghost nav-compare" aria-label="Compare">
            <BarChart3 className="h-4 w-4" />
          </Link>
          <Link href="/assistant" className="nav-cta">
            <Sparkles className="h-4 w-4" />
            Ask AI
          </Link>
        </div>
      </div>
    </header>
  );
}
