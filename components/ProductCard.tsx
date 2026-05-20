import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice, getProductName, Product, safeNumber, safeText } from '@/lib/products';
import ScoreRing from './ScoreRing';

type ProductCardProps = { product: Product };

function ScoreCell({ value, label }: { value?: string | number | null; label: string }) {
  const n = safeNumber(value);
  return (
    <div className="score-cell">
      <span className="sv">{n === null ? '—' : Math.round(n)}</span>
      <span className="sl">{label}</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getProductName(product);

  return (
    <article className="pcard">
      <div className="pcard-img">
        <span className="tag" style={{ position: 'absolute', top: 14, left: 14 }}>AI scored</span>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} />
        ) : (
          <div className="text-slate-600">No image</div>
        )}
      </div>

      <div className="pcard-body">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="pcard-brand">{safeText(product.brand, 'Smartphone')}</div>
            <h3 className="pcard-name line-clamp-2">{name}</h3>
            <div className="pcard-price">{formatPrice(product)}</div>
          </div>
          <ScoreRing value={product.global_score} size="sm" />
        </div>

        <p className="pcard-desc line-clamp-3">
          {safeText(product.content_summary_en, 'AI-scored smartphone profile prepared for search, comparison and recommendations.')}
        </p>

        <div className="scores-5">
          <ScoreCell value={product.camera_score} label="Camera" />
          <ScoreCell value={product.battery_score} label="Battery" />
          <ScoreCell value={product.display_score} label="Display" />
          <ScoreCell value={product.gaming_score} label="Gaming" />
          <ScoreCell value={product.value_score} label="Value" />
        </div>

        <div className="pcard-actions">
          {product.slug ? <Link href={`/products/${product.slug}`} className="btn-primary">View <ArrowRight className="h-4 w-4" /></Link> : null}
          <Link href={`/compare?phones=${product.slug || ''}`} className="btn-ghost">Compare</Link>
        </div>
      </div>
    </article>
  );
}
