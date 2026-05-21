import Link from 'next/link'
import { BrainCircuit, Menu, Search, Sparkles } from 'lucide-react'

const nav = [
  { href: '/products', label: 'Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/guides', label: 'Guides' },
  { href: '/brands', label: 'Brands' },
]

export default function Header() {
  return (
    <header className="wf-header-wrap">
      <div className="wf-header">
        <Link href="/" className="wf-brand" aria-label="Witflag home">
          <span className="wf-logo"><BrainCircuit size={22} /></span>
          <span>
            <b>WITFLAG</b>
            <small>AI product intelligence</small>
          </span>
        </Link>

        <nav className="wf-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="wf-header-actions">
          <Link href="/search" className="wf-search-pill">
            <Search size={15} />
            <span>Search products</span>
            <kbd>⌘K</kbd>
          </Link>
          <Link href="/assistant" className="wf-ai-pill">
            <Sparkles size={15} /> Ask AI
          </Link>
          <button className="wf-mobile-menu" type="button" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
