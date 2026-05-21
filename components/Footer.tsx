import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="wf-footer">
      <div className="wf-shell wf-footer-inner">
        <p>Real data. Smarter decisions. Built for SEO, AEO, GEO, and AI-native product intelligence.</p>
        <div className="wf-footer-links">
          <Link href="/products">Products</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/assistant">Assistant</Link>
        </div>
      </div>
    </footer>
  )
}
