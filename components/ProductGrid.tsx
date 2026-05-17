import ProductCard from './ProductCard';
import { Product } from '@/lib/products';

type ProductGridProps = { products: Product[] };

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: 48, marginBottom: 14 }}>📱</div>
        <h3>No products found</h3>
        <p style={{ marginTop: 8, color: 'var(--muted)' }}>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
