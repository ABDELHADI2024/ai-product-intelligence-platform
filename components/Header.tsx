import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">W</span>
          <span>WITFLAG</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/search">Search</Link>
          <Link href="/assistant">AI Assistant</Link>
        </nav>

        <div className="header-actions">
          <Link href="/compare" className="header-cta">Compare →</Link>
          <span className="header-pill">EN</span>
        </div>
      </div>
    </header>
  );
}
