import Image from 'next/image'
import Link from 'next/link'
import { getProducts, safeNumber, safeText, formatPrice } from '@/lib/products'

export const metadata = {
  title: 'Witflag | AI Product Intelligence Platform',
  description: 'AI-powered smartphone discovery, comparison, scoring, and recommendations.',
}

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = []

  try {
    products = await getProducts()
  } catch {
    products = []
  }

  const topProducts = products
    .filter((product) => Boolean(product?.slug))
    .sort((a, b) => (safeNumber(b.global_score) ?? 0) - (safeNumber(a.global_score) ?? 0))
    .slice(0, 8)

  return (
    <main className="page">
      <section style={{ padding: '48px 0 32px' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>
          AI Product Intelligence
        </div>

        <h1 style={{ maxWidth: 780, fontSize: 'clamp(42px, 8vw, 84px)', lineHeight: 0.95, letterSpacing: '-0.06em', marginBottom: 20 }}>
          Find the right smartphone with intelligent scores.
        </h1>

        <p style={{ maxWidth: 620, color: 'var(--text-2)', fontSize: 17, lineHeight: 1.7, marginBottom: 28 }}>
          Compare camera, battery, gaming, display, value, and global performance in one clean AI-native experience.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/compare" className="btn btn-primary">
            Compare smartphones
          </Link>
          <Link href="#top-picks" className="btn btn-ghost">
            View top picks
          </Link>
        </div>
      </section>

      <section id="top-picks" style={{ padding: '24px 0 56px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
              Top picks for you
            </div>
            <h2 style={{ fontSize: 28, letterSpacing: '-0.03em' }}>Best ranked products</h2>
          </div>
          <Link href="/compare" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>
            Open comparison →
          </Link>
        </div>

        {topProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 16 }}>
            {topProducts.map((product) => {
              const score = safeNumber(product.global_score)
              const name = safeText(product.full_name || product.model || product.slug)

              return (
                <Link
                  key={product.id ?? product.slug}
                  href={`/products/${product.slug}`}
                  style={{
                    display: 'block',
                    padding: 18,
                    minHeight: 250,
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 700, marginBottom: 4 }}>
                        {safeText(product.brand || 'Smartphone')}
                      </div>
                      <h3 style={{ color: 'var(--text)', fontSize: 16, lineHeight: 1.35, letterSpacing: '-0.02em' }}>{name}</h3>
                    </div>
                    {score !== null && (
                      <div style={{ minWidth: 46, height: 46, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'var(--accent-glow)', color: 'var(--accent)', fontWeight: 900 }}>
                        {score}
                      </div>
                    )}
                  </div>

                  <div style={{ height: 105, display: 'grid', placeItems: 'center', marginBottom: 14 }}>
                    {product.image_url ? (
                      <Image src={product.image_url} alt={name} width={105} height={105} style={{ objectFit: 'contain' }} unoptimized />
                    ) : (
                      <div style={{ fontSize: 52 }}>📱</div>
                    )}
                  </div>

                  <div style={{ color: 'var(--text-2)', fontSize: 13, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span>{formatPrice(product)}</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>View details</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon">📱</div>
            <div className="empty-title">No products found</div>
            <p>Check your Supabase data or environment variables.</p>
          </div>
        )}
      </section>
    </main>
  )
}
