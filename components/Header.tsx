import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="wf-header">
      <div className="wf-header-inner">
        <Link href="/" className="wf-logo">
          <div className="wf-logo-mark">W</div>
          <span>WITFLAG</span>
        </Link>

        <nav className="wf-nav">
          <Link href="/products">Products</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/best">Guides</Link>
          <Link href="/brands">Brands</Link>
        </nav>

        <div className="wf-header-right">
          <Link href="/search" className="wf-search-pill">
            <Search className="h-4 w-4" />
            <span>Search smartphones...</span>
            <kbd>⌘K</kbd>
          </Link>

          <Link href="/assistant" className="wf-theme-dot" aria-label="AI Assistant">
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
