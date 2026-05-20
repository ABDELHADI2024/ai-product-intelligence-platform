import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Phones — Witflag Guides',
  description: 'Curated buying guides: best camera phones, battery phones, gaming phones, value picks.',
}

const GUIDES = [
  { slug: 'best-camera-phones', title: 'Best Camera Phones', sub: 'Ranked by Witflag camera scores.', icon: '📸', color: 'var(--orange)' },
  { slug: 'best-battery-phones', title: 'Best Battery Phones', sub: 'Ranked by Witflag battery scores.', icon: '🔋', color: 'var(--blue)' },
  { slug: 'best-gaming-phones', title: 'Best Gaming Phones', sub: 'Ranked by Witflag gaming scores.', icon: '🎮', color: 'var(--purple)' },
  { slug: 'best-value-phones', title: 'Best Value Phones', sub: 'Best overall experience per euro.', icon: '💰', color: 'var(--gold)' },
  { slug: 'best-phones-under-500', title: 'Best Phones Under €500', sub: 'Top-scored smartphones in budget range.', icon: '🏷️', color: 'var(--accent)' },
  { slug: 'best-foldable-phones', title: 'Best Foldable Phones', sub: 'Ranked foldable smartphones.', icon: '📲', color: 'var(--red)' },
]

export default function BestIndexPage() {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-label">Buying Guides</div>
        <h1 className="page-hero-title">Best Smartphones by Category</h1>
        <p className="page-hero-sub">Curated guides ranked by Witflag scores — structured product intelligence, not ads.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {GUIDES.map(g => (
          <Link
            key={g.slug}
            href={`/best/${g.slug}`}
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px',
              display: 'block',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 16 }}>{g.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>{g.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>{g.sub}</div>
            <div style={{ marginTop: 16, fontSize: 12, color: g.color, fontWeight: 600 }}>View guide →</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
