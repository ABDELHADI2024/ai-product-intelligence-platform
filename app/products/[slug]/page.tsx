import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { formatPrice, getProductBySlug, getProductName, productSlug, safeNumber, safeText, scoreLabel } from '@/lib/products'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  const name = getProductName(product)
  return {
    title: `${name} | Witflag`,
    description: product?.content_summary_en || `See scores, specs, and details for ${name}.`
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const name = getProductName(product)
  const global = safeNumber(product.global_score)

  const specs = [
    ['Global Score', global ?? '—'],
    ['Camera', safeNumber(product.camera_score) ?? '—'],
    ['Battery', safeNumber(product.battery_score) ?? '—'],
    ['Display', safeNumber(product.display_score) ?? '—'],
    ['Gaming', safeNumber(product.gaming_score) ?? '—'],
    ['Value', safeNumber(product.value_score) ?? '—'],
    ['Chipset', safeText(product.chipset)],
    ['Battery', product.battery_mah ? `${product.battery_mah} mAh` : '—'],
    ['Screen', safeText(product.screen_size)],
    ['Rear camera', safeText(product.rear_camera)]
  ]

  return (
    <section className="detail-grid">
      <div className="content-card">
        <div className="product-image-wrap" style={{ height: 260 }}>
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_url} alt={name} style={{ maxHeight: 250, maxWidth: '100%' }} />
          ) : (
            <div className="phone-mock" />
          )}
        </div>
      </div>
      <div className="content-card">
        <span className="badge">{product.brand || 'Smartphone'}</span>
        <h1 className="hero-title" style={{ fontSize: 48 }}>{name}</h1>
        <p className="price">{formatPrice(product)}</p>
        <p>{product.content_summary_en || 'Smartphone intelligence profile powered by Witflag scores.'}</p>
        <div className="score-card" style={{ position: 'static', margin: '18px 0' }}>
          <div className="score-ring">{global ?? '—'}</div>
          <div><span>Global Score</span><strong>{scoreLabel(global)}</strong></div>
        </div>
        <Link className="btn btn-primary" href={`/compare?phones=${productSlug(product)}`}>Compare this phone <ArrowRight size={16} /></Link>
        <div className="spec-grid">
          {specs.map(([label, value]) => (
            <div className="spec" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
