import Link from 'next/link'
import { ArrowRight, BarChart3, Smartphone } from 'lucide-react'
import { formatPrice, getProductName, Product, productSlug, safeNumber, safeText } from '@/lib/products'
import ScoreRing from './ScoreRing'

function MiniScore({ label, value }: { label: string; value?: string | number | null }) {
  const score = safeNumber(value)
  return (
    <div className="mini-score">
      <strong>{score === null ? '—' : Math.round(score)}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const name = getProductName(product)
  const slug = productSlug(product)

  return (
    <article className="product-card">
      <div className="product-card-inner">
        <div className="product-media">
          {rank ? <div className="product-rank">{rank}</div> : <div className="product-badge">AI scored</div>}
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_url} alt={name} />
          ) : (
            <div className="wf-phone-placeholder" aria-hidden="true" />
          )}
        </div>

        <div className="product-body">
          <div className="product-meta">
            <div>
              <div className="product-brand">{safeText(product.brand, 'Smartphone')}</div>
              <h3 className="product-title">{name}</h3>
              <div className="product-price">{formatPrice(product)}</div>
            </div>
            <ScoreRing value={product.global_score} compact />
          </div>

          <p className="product-summary">
            {safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison, and recommendations.')}
          </p>

          <div className="product-mini-scores">
            <MiniScore label="Camera" value={product.camera_score} />
            <MiniScore label="Battery" value={product.battery_score} />
            <MiniScore label="Gaming" value={product.gaming_score} />
          </div>
        </div>

        <div className="product-actions">
          <Link className="product-action product-action-primary" href={`/products/${slug}`}>
            View <ArrowRight size={14} />
          </Link>
          <Link className="product-action" href={`/compare?add=${slug}`}>
            <BarChart3 size={14} /> Compare
          </Link>
        </div>
      </div>
    </article>
  )
}
