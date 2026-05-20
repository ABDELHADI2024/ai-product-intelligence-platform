import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatPrice, getProductName, Product, safeNumber, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type ProductCardProps = { product: Product };

function ScoreCell({
  value,
  label,
  color = '#22d3ee',
}: {
  value?: string | number | null;
  label: string;
  color?: string;
}) {
  const n = safeNumber(value);
  return (
    <div className="score-cell">
      <div className="sv" style={{ color }}>{n === null ? '—' : Math.round(n)}</div>
      <div className="sl">{label}</div>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getProductName(product);

  return (
    <article className="pcard gring">
      {/* Image */}
      <div className="pcard-img">
        <span className="tag tag-c" style={{ position: 'absolute', top: '.6rem', left: '.6rem', fontSize: '.6rem' }}>
          <Sparkles size={10} /> AI scored
        </span>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        ) : (
          <span style={{ fontSize: '.8rem', color: 'var(--t3)' }}>No image</span>
        )}
      </div>

      {/* Body */}
      <div className="pcard-body">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="pcard-brand">{safeText(product.brand, 'Smartphone')}</div>
            <div className="pcard-name line-clamp-2">{name}</div>
            <div className="pcard-price">{formatPrice(product)}</div>
          </div>
          <ScoreRing value={product.global_score} label="Global" size="sm" />
        </div>

        <p style={{ fontSize: '.75rem', color: 'var(--t2)', lineHeight: 1.6, margin: '.25rem 0' }} className="line-clamp-3">
          {safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison, and recommendations.')}
        </p>

        {/* Score cells */}
        <div className="scores-5" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          <ScoreCell value={product.camera_score}  label="Camera"  color="#22d3ee" />
          <ScoreCell value={product.battery_score} label="Battery" color="#a78bfa" />
          <ScoreCell value={product.gaming_score}  label="Gaming"  color="#fbbf24" />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '.5rem', marginTop: '.25rem' }}>
          {product.slug ? (
            <Link href={`/products/${product.slug}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: '.78rem', padding: '.55rem' }}>
              View <ArrowRight size={13} />
            </Link>
          ) : null}
          <Link href={`/compare?phones=${product.slug || ''}`} className="btn-ghost" style={{ borderRadius: 10, fontSize: '.78rem', padding: '.55rem .9rem' }}>
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
