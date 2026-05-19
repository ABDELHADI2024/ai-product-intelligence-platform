import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice, getProductName, Product, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type Props = { product: Product };

function ScoreCell({ value, label, color }: { value?: number | null; label: string; color?: string }) {
  return (
    <div className="score-cell">
      <div className="sv" style={color ? { color } : undefined}>{value ?? '—'}</div>
      <div className="sl">{label}</div>
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  const name = getProductName(product);

  return (
    <article className="pcard gring">
      {/* Image area */}
      <div className="pcard-img">
        <span className="tag tag-v" style={{ position: 'absolute', top: '.6rem', left: '.6rem', fontSize: '.6rem' }}>
          ✦ AI scored
        </span>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.6))',
              transition: 'transform .3s',
            }}
            className="group-hover:scale-105"
          />
        ) : (
          <div style={{ fontSize: '3rem' }}>📱</div>
        )}
      </div>

      {/* Body */}
      <div className="pcard-body">
        {/* Brand + name + price + ring */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.5rem' }}>
          <div style={{ minWidth: 0 }}>
            <div className="pcard-brand">{safeText(product.brand, 'Smartphone')}</div>
            <div className="pcard-name line-clamp-2">{name}</div>
            <div className="pcard-price" style={{ marginTop: '.35rem' }}>{formatPrice(product)}</div>
          </div>
          <ScoreRing value={product.global_score} size="sm" label="Global Score" />
        </div>

        {/* Summary */}
        <p style={{ fontSize: '.72rem', color: '#a89ec9', lineHeight: 1.55, marginTop: '.25rem' }} className="line-clamp-2">
          {safeText(product.content_summary_en, 'AI-scored product with full intelligence signals for comparison and recommendations.')}
        </p>

        {/* 5-score grid */}
        <div className="scores-5" style={{ marginTop: '.35rem' }}>
          <ScoreCell value={product.camera_score}      label="Camera"  color="#22d3ee" />
          <ScoreCell value={product.battery_score}     label="Battery" color="#a78bfa" />
          <ScoreCell value={product.display_score}     label="Display" color="#4ade80" />
          <ScoreCell value={product.gaming_score}      label="Gaming"  color="#fbbf24" />
          <ScoreCell value={product.value_score}       label="Value"   color="#6366f1" />
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '.5rem', marginTop: 'auto', paddingTop: '.5rem' }}>
          {product.slug && (
            <Link
              href={`/products/${product.slug}`}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: '.75rem', padding: '.5rem .5rem' }}
            >
              View Details <ArrowRight size={13} />
            </Link>
          )}
          <Link
            href={`/compare?phones=${product.slug || ''}`}
            className="btn-ghost"
            style={{ borderRadius: 10, fontSize: '.75rem', padding: '.5rem .85rem' }}
          >
            ⚖
          </Link>
        </div>
      </div>
    </article>
  );
}
