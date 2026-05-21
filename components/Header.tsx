import Link from 'next/link'
import { Search, Sun } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header site-shell">
      <div className="nav-card">
        <Link href="/" className="logo-wrap" aria-label="Witflag home">
          <span className="logo-mark">W</span>
          <span>WITFLAG</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/products">Products</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/best/best-camera-phones">Guides</Link>
          <Link href="/about">About</Link>
        </nav>

        <form className="header-search" action="/search">
          <Search size={15} />
          <input name="q" placeholder="Search smartphones..." aria-label="Search smartphones" />
          <kbd>⌘K</kbd>
        </form>

        <button className="icon-btn" aria-label="Theme preview" type="button">
          <Sun size={16} />
        </button>
      </div>
    </header>
  )
}
