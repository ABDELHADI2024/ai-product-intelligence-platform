import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <strong>WITFLAG AI</strong>
          <p>AI-powered smartphone intelligence platform. Score, compare, and decide with confidence.</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <Link href="/products">All Smartphones</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/search">Search</Link>
          <Link href="/assistant">AI Assistant</Link>
        </div>
        <div className="footer-col">
          <h4>Categories</h4>
          <Link href="/products?category=smartphones">Smartphones</Link>
          <Link href="/products?category=foldable-smartphones">Foldables</Link>
          <Link href="/assistant?use=camera">Best Camera</Link>
          <Link href="/assistant?use=gaming">Gaming Picks</Link>
        </div>
        <div className="footer-col">
          <h4>Scores</h4>
          <Link href="/assistant?use=value">Best Value</Link>
          <Link href="/assistant?use=battery">Best Battery</Link>
          <Link href="/assistant?use=balanced">Top Rated</Link>
          <Link href="/search">Smart Search</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Witflag AI · Data-driven smartphone intelligence</span>
        <span>AI Scores · Comparisons · Guided Buying</span>
      </div>
    </footer>
  );
}
