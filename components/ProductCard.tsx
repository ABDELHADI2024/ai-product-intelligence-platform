import Link from 'next/link'
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  Gamepad2,
  Sparkles,
} from 'lucide-react'
import {
  formatPrice,
  getProductName,
  Product,
  safeNumber,
  safeText,
} from '@/lib/products'

type ProductCardProps = {
  product: Product
  rank?: number
}

function scoreTone(value: string | number | null | undefined) {
  const score = safeNumber(value)

  if (score === null) return 'product-score-muted'
  if (score >= 88) return 'product-score-great'
  if (score >= 78) return 'product-score-good'
  if (score >= 68) return 'product-score-mid'
  return 'product-score-low'
}

function MiniScore({
  label,
  value,
  tone = 'cyan',
}: {
  label: string
  value?: string | number | null
  tone?: 'cyan' | 'green' | 'violet' | 'amber'
}) {
  const score = safeNumber(value)

  return (
    <div className={`top-pick-mini-score top-pick-mini-score-${tone}`}>
      <strong>{score === null ? '—' : Math.round(score)}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const name = getProductName(product)
  const globalScore = safeNumber(product.global_score)

  return (
    <article className="top-pick-card group">
      <div className="top-pick-glow" />

      <div className="top-pick-image-stage">
        <div className="top-pick-orbit" />

        {rank ? (
          <div className="top-pick-rank">#{rank}</div>
        ) : (
          <div className="top-pick-ai-chip">
            <Sparkles className="h-3.5 w-3.5" />
            AI scored
          </div>
        )}

        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={name}
            className="top-pick-image"
          />
        ) : (
          <div className="top-pick-no-image">No image</div>
        )}

        <div className={`top-pick-global-score ${scoreTone(product.global_score)}`}>
          {globalScore === null ? '—' : Math.round(globalScore)}
        </div>
      </div>

      <div className="top-pick-body">
        <div className="top-pick-meta">
          <span>{safeText(product.brand, 'Smartphone')}</span>
          <span>Global {globalScore === null ? '—' : Math.round(globalScore)}</span>
        </div>

        <h3 className="top-pick-title">{name}</h3>

        <div className="top-pick-price-row">
          <p>{formatPrice(product)}</p>
          <span>AI profile</span>
        </div>

        <p className="top-pick-summary">
          {safeText(
            product.content_summary_en,
            'AI-ready smartphone profile prepared for search, comparison, and recommendations.'
          )}
        </p>

        <div className="top-pick-scores">
          <MiniScore label="Camera" value={product.camera_score} tone="cyan" />
          <MiniScore label="Battery" value={product.battery_score} tone="green" />
          <MiniScore label="Gaming" value={product.gaming_score} tone="violet" />
        </div>

        <div className="top-pick-tags">
          <span>
            <Camera className="h-3.5 w-3.5" />
            Camera
          </span>
          <span>
            <BatteryCharging className="h-3.5 w-3.5" />
            Battery
          </span>
          <span>
            <Gamepad2 className="h-3.5 w-3.5" />
            Gaming
          </span>
        </div>

        <div className="top-pick-actions">
          {product.slug ? (
            <Link href={`/products/${product.slug}`} className="top-pick-primary">
              View
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}

          <Link
            href={`/compare?phones=${product.slug || ''}`}
            className="top-pick-secondary"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  )
}
