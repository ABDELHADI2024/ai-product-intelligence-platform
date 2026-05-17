import Link from 'next/link';
import ScoreRing from './ScoreRing';
import { formatPrice, Product, safeText } from '@/lib/products';

type RecommendationCardProps = {
  product: Product;
  reason?: string;
  rank?: number;
};

export default function RecommendationCard({ product, reason, rank }: RecommendationCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card-image">
        {rank ? <div className="product-card-category">#{rank} match</div> : null}
        <div className="product-card-score">
          <ScoreRing value={product.global_score} size="sm" />
        </div>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={safeText(product.full_name, 'Smartphone')} />
        ) : (
          <div className="phone-placeholder">📱</div>
        )}
      </div>

      <div className="product-card-body">
        <p className="product-brand">{safeText(product.brand, 'Brand')}</p>
        <h3>{safeText(product.full_name, product.model || 'Smartphone')}</h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 8 }}>
          {reason || safeText(product.expert_opinion_en, 'Recommended based on Witflag AI scores.')}
        </p>
        <div className="product-card-meta">
          <span className="product-price-tag">{formatPrice(product)}</span>
          <span>{safeText(product.battery_mah, '—')}mAh</span>
        </div>
      </div>
    </Link>
  );
}
