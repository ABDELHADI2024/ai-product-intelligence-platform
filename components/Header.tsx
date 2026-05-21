import Link from 'next/link'
import { Search, Sparkles, SunMedium } from 'lucide-react'

const nav = [
  { href: '/products', label: 'Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/search', label: 'Search' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/best/best-camera-phones', label: 'Guides' }
]

export default function Header() {
  return (
    <header className="wf-header-wrap">
      <div className="wf-header">
        <Link href="/" className="wf-brand" aria-label="Witflag home">
          <span className="wf-logo">W</span>
          <span>WITFLAG</span>
        </Link>

        <nav className="wf-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="wf-actions">
          <Link className="wf-search-pill" href="/search">
            <span><Search size={14} /> Search smartphones...</span>
            <span className="wf-kbd">⌘K</span>
          </Link>
          <Link className="wf-icon-btn" href="/assistant" aria-label="AI assistant">
            <Sparkles size={17} />
          </Link>
          <span className="wf-icon-btn" aria-label="Theme preview"><SunMedium size={16} /></span>
        </div>
      </div>
    </header>
  )
}
