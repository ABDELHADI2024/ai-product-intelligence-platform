import Link from 'next/link'
import type { Metadata } from 'next'
import { getProducts, safeNumber, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BentoGrid from '@/components/BentoGrid'

export const metadata: Metadata = {
  title: 'Witflag — AI Smartphone Intelligence',
  description: 'Structured product intelligence for smartphones. Score-based comparison, recommendations, and buying guides.',
}

export const revalidate = 3600

const GUIDE_CARDS = [
  { slug: 'best-camera-phones', label: 'Best camera phones', sub: 'Ranked by Witflag scores.', icon: '📸' },
  { slug: 'best-battery-phones', label: 'Best battery phones', sub: 'Ranked by Witflag scores.', icon: '🔋' },
  { slug: 'best-gaming-phones', label: 'Best gaming phones', sub: 'Ranked by Witflag scores.', icon: '🎮' },
  { slug: 'best-value-phones', label: 'Best value phones', sub: 'Ranked by Witflag scores.', icon: '💰' },
]

const FEATURE_LIST = [
  { icon: '🤖', title: 'Score-based intelligence', body: '5 metrics scored using structured product data.' },
  { icon: '🔍', title: 'Smart search', body: 'Natural language search across the full catalog.' },
  { icon: '⚖️', title: 'Product comparison', body: 'Compare up to 4 products side by side.' },
  { icon: '🔄', title: 'Daily updates', body: 'New products and data updated every day.' },
  { icon: '🛡️', title: 'Trusted insights', body: 'Objective analysis for smarter buying.' },
  { icon: '🌐', title: 'Global platform', body: 'Multi-currency product data from worldwide sources.' },
]

export default async function HomePage() {
  const products = await getProducts(60)
  const topProducts = products.slice(0, 6)
  const featured = products[0]

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span>●</span> Live from Supabase
        </div>
        <h1 className="hero-title">
          Structured product<br />
          <span>intelligence</span><br />
          for smarter buying.
        </h1>
        <p className="hero-sub">
          We score, rank, and compare smartphones using structured product data — so you can buy with confidence.
        </p>
        <div className="stat-row">
          <div className="stat-pill"><strong>{products.length}+</strong> Products</div>
          <div className="stat-pill"><strong>5</strong> Score metrics</div>
          <div className="stat-pill"><strong>Daily</strong> Updated</div>
          <div className="stat-pill"><strong>Real</strong> Supabase data</div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <Link href="/products" className="btn btn-primary">Browse Products</Link>
          <Link href="/compare" className="btn btn-ghost">Compare Now</Link>
        </div>

        {/* Featured product card */}
        {featured && (
          <div style={{
            marginTop: 48,
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            maxWidth: 560,
          }}>
            <span style={{ fontSize: 24 }}>📱</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                {featured.brand} · New Release
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>
                {featured.full_name || featured.model}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                {formatPrice(featured)} &nbsp;·&nbsp; {safeNumber(featured.global_score) ?? '—'} global score
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>
                {safeNumber(featured.global_score)}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                Global Score
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Guide cards */}
      <section style={{ marginBottom: 60 }}>
        <div className="section-header">
          <h2 className="section-title">Top Scored</h2>
          <Link href="/best" className="section-link">View all guides →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {GUIDE_CARDS.map(g => (
            <Link
              key={g.slug}
              href={`/best/${g.slug}`}
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '18px 20px',
                display: 'block',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{g.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{g.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{g.sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* What scores mean */}
      <section style={{ marginBottom: 60 }}>
        <div className="section-header">
          <h2 className="section-title">Scores You Can Trust</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {[
            { label: 'Performance', sub: 'Raw power and speed', color: 'var(--blue)' },
            { label: 'Display', sub: 'Screen quality and refresh rate', color: 'var(--purple)' },
            { label: 'Camera', sub: 'Photo and video quality', color: 'var(--orange)' },
            { label: 'Battery', sub: 'Battery life and charging', color: 'var(--accent)' },
            { label: 'Value', sub: 'Best experience for your money', color: 'var(--gold)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 18px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, marginBottom: 10 }} />
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live products bento */}
      <section style={{ marginBottom: 60 }}>
        <div className="section-header">
          <h2 className="section-title">Live Smartphones from Supabase</h2>
          <Link href="/products" className="section-link">View catalog →</Link>
        </div>
        <BentoGrid products={topProducts} />
      </section>

      {/* Product grid preview */}
      <section style={{ marginBottom: 60 }}>
        <div className="section-header">
          <h2 className="section-title">Top Rated</h2>
          <Link href="/products" className="section-link">View all →</Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 6).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Feature list */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {FEATURE_LIST.map(f => (
            <div key={f.title} style={{ display: 'flex', gap: 14, padding: '18px 20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.5 }}>{f.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
