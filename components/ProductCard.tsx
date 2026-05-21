import Link from 'next/link'
import { ArrowRight, BarChart3, Cpu, Smartphone } from 'lucide-react'
import {
  formatPrice,
  getProductName,
  Product,
  productSlug,
  safeNumber,
  safeText,
  scoreLabel,
} from '@/lib/products'
import ScoreRing from './ScoreRing'

function MiniScore({ label, value }: { label: string; value?: string | number | null }) {
  const score = safeNumber(value)
  return (
    <div className="wf-mini-score">
      <strong>{score === null ? '—' : Math.round(score)}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const name = getProductName(product)
  const slug = productSlug(product)

  return (
    <article className="wf-product-card">
      <div className="wf-product-glow" />

      <div className="wf-product-media">
        {rank ? <div className="wf-rank">#{rank}</div> : <div className="wf-rank wf-rank-soft">AI</div>}
        <div className="wf-card-score">
          <ScoreRing value={product.global_score} size="sm" />
        </div>

        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={String(product.image_url)} alt={name} />
        ) : (
          <div className="wf-phone-ghost">
            <Smartphone size={58} />
          </div>
        )}
      </div>

      <div className="wf-product-body">
        <div className="wf-product-kicker">
          <span>{safeText(product.brand, 'Smartphone')}</span>
          <b>{scoreLabel(product.global_score)}</b>
        </div>

        <h3>{name}</h3>

        <p>{safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison, recommendations, and SEO product intelligence.')}</p>

        <div className="wf-chip-row">
          <span><Cpu size={13} /> {safeText(product.chipset, 'AI profile')}</span>
          <span>{formatPrice(product)}</span>
        </div>

        <div className="wf-mini-score-grid">
          <MiniScore label="Camera" value={product.camera_score} />
          <MiniScore label="Battery" value={product.battery_score} />
          <MiniScore label="Value" value={product.value_score} />
        </div>
      </div>

      <div className="wf-product-actions">
        <Link href={`/products/${slug}`} className="wf-card-action wf-card-action-primary">
          View details <ArrowRight size={15} />
        </Link>
        <Link href={`/compare?products=${slug}`} className="wf-card-action">
          <BarChart3 size={15} /> Compare
        </Link>
      </div>
    </article>
  )
}
