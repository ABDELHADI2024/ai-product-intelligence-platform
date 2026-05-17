import Link from 'next/link';
import ScoreRing from './ScoreRing';
import { formatPrice, getCategoryLabel, Product, safeText } from '@/lib/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const name = safeText(product.full_name, `${safeText(product.brand, '')} ${safeText(product.model, '')}`.trim());

  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card-image">
        <div className="product-card-category">{getCategoryLabel(product.normalized_category)}</div>
        <div className="product-card-score">
          <ScoreRing value={product.global_score} size="sm" />
        </div>

        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} />
        ) : (
          <div className="phone-placeholder">📱</div>
        )}
      </div>

      <div className="product-card-body">
        <p className="product-brand">{safeText(product.brand, 'Brand')}</p>
        <h3>{name}</h3>

        <div className="product-card-meta">
          <span>{formatPrice(product)}</span>
          <span>{safeText(product.battery_mah, 'Battery')}mAh</span>
        </div>

        <div className="mini-metrics">
          <div>
            <strong>{safeText(product.camera_score, '—')}</strong>
            <span>Camera</span>
          </div>
          <div>
            <strong>{safeText(product.battery_score, '—')}</strong>
            <span>Battery</span>
          </div>
          <div>
            <strong>{safeText(product.value_score, '—')}</strong>
            <span>Value</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
