import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getProducts, buildRecommendations, safeNumber, safeText, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProductBySlug(slug)
  if (!p) return { title: 'Product not found' }
  return {
    title: safeText(p.full_name || p.model),
    description: safeText(p.content_summary_en) || `${safeText(p.brand)} ${safeText(p.model)} — Witflag product intelligence.`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const allProducts = await getProducts(300)
  const recs = buildRecommendations(
    allProducts.filter((item) => item.id !== product.id),
    'balanced',
    null,
    3
  ).map((item) => item.product)

  const name = safeText(product.full_name || product.model)
  const brand = safeText(product.brand)
  const price = formatPrice(product)
  const summary = safeText(product.content_summary_en)
  const global = safeNumber(product.global_score)
  const camera = safeNumber(product.camera_score)
  const battery = safeNumber(product.battery_score)
  const gaming = safeNumber(product.gaming_score)
  const value = safeNumber(product.value_score)
  const display = safeNumber(product.display_score)

  const scores = [
    { label: 'Global', val: global, color: 'var(--accent)' },
    { label: 'Camera', val: camera, color: 'var(--orange)' },
    { label: 'Battery', val: battery, color: 'var(--blue)' },
    { label: 'Gaming', val: gaming, color: 'var(--purple)' },
    { label: 'Value', val: value, color: 'var(--gold)' },
    { label: 'Display', val: display, color: 'var(--red)' },
  ].filter(s => s.val !== null)

  const specs: [string, string][] = [
    ['Brand', brand],
    ['Chipset', safeText(product.chipset)],
    ['Screen', safeText(product.screen_size)],
    ['Battery', product.battery_mah ? `${product.battery_mah} mAh` : ''],
    ['Camera', safeText(product.rear_camera)],
    ['Category', safeText(product.normalized_category || product.product_type)],
  ].filter(([, v]) => v) as [string, string][]

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Link href="/products" style={{ color: 'var(--accent)' }}>Products</Link>
        <span>›</span>
        <span>{brand}</span>
        <span>›</span>
        <span style={{ color: 'var(--text-2)' }}>{name}</span>
      </div>

      {/* Hero */}
      <div className="product-hero">
        <div className="product-image-box">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={name}
              width={400}
              height={400}
              style={{ objectFit: 'contain', maxHeight: 320 }}
              unoptimized
            />
          ) : (
            <div style={{ fontSize: 64, opacity: 0.3 }}>📱</div>
          )}
        </div>

        <div className="product-meta">
          <div className="product-brand-label">{brand}</div>
          <h1 className="product-title">{name}</h1>

          <div className="product-price-row">
            {price && <div className="product-price">{price}</div>}
            {global !== null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--accent-glow)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 99 }}>
                <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 15 }}>{global}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Witflag score</span>
              </div>
            )}
          </div>

          {summary && (
            <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 24 }}>{summary}</p>
          )}

          {/* Score boxes */}
          {scores.length > 0 && (
            <div className="scores-grid" style={{ marginBottom: 24 }}>
              {scores.map(s => (
                <div key={s.label} className="score-box">
                  <div className="score-box-val" style={{ color: s.color }}>{s.val}</div>
                  <div className="score-box-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Score bars */}
          {scores.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Score breakdown</div>
              <div className="score-bar-wrap" style={{ gap: 8 }}>
                {scores.map(s => (
                  <div key={s.label} className="score-bar-row">
                    <div className="score-bar-label">{s.label}</div>
                    <div className="score-bar-track">
                      <div className="score-bar-fill" style={{ width: `${s.val}%`, background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }} />
                    </div>
                    <div className="score-bar-val">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href={`/compare?phones=${product.slug}`} className="btn btn-primary">
              ⚖️ Compare
            </Link>
            <Link href="/search" className="btn btn-ghost">
              🔍 Find similar
            </Link>
          </div>
        </div>
      </div>

      {/* Specs table */}
      {specs.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>Key Specifications</h2>
          <table className="spec-table">
            <tbody>
              {specs.map(([label, val]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name,
            brand: { '@type': 'Brand', name: brand },
            description: summary,
            image: product.image_url,
            offers: safeNumber(product.price_eur) !== null ? {
              '@type': 'Offer',
              price: safeNumber(product.price_eur),
              priceCurrency: 'EUR',
            } : undefined,
          })
        }}
      />

      {/* Recommendations */}
      {recs.length > 0 && (
        <section>
          <div className="section-header">
            <h2 className="section-title">Similar Products</h2>
            <Link href="/products" className="section-link">View all →</Link>
          </div>
          <div className="product-grid">
            {recs.map(r => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </div>
  )
}
