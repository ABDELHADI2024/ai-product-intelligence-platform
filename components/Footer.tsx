import Link from 'next/link'

const links = [
  { href: '/products', label: 'Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/guides', label: 'Guides' },
]

export default function Footer() {
  return (
    <footer className="wf-footer">
      <div className="wf-shell wf-footer-inner">
        <div>
          <div className="wf-footer-brand">WITFLAG</div>
          <p>AI-native product intelligence for faster buying decisions, search, comparison, SEO, AEO, and GEO.</p>
        </div>
        <nav className="wf-footer-links" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
