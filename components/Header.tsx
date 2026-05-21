import Link from 'next/link';
import { Search, Sun } from 'lucide-react';

const nav = [
  ['Products', '/products'],
  ['Compare', '/compare'],
  ['Guides', '/best'],
  ['About', '/about'],
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

        <div className="nav-actions">
          <form action="/search" method="GET" className="nav-search">
            <Search size={15} />
            <input name="q" placeholder="Search smartphones..." />
            <span className="kbd">⌘K</span>
          </form>
          <Link href="/assistant" className="theme-btn" aria-label="Ask assistant">
            <Sun size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
