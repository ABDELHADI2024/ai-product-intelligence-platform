import ProductCard from './ProductCard';
import BentoGrid from './BentoGrid';
import { Product } from '@/lib/products';

type ProductGridProps = {
  products: Product[];
  columns?: 2 | 3 | 4;
};

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div
        className="glass"
        style={{ borderRadius: 20, padding: '3rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: 48, marginBottom: '1rem' }}>📱</div>
        <h2
          style={{
            fontFamily: 'Syne,sans-serif',
            fontWeight: 900,
            fontSize: '1.4rem',
            color: '#fff',
            margin: 0,
          }}
        >
          No products found
        </h2>
        <p style={{ color: 'var(--t2)', marginTop: '.65rem', fontSize: '.88rem' }}>
          Try adjusting your filters or check back soon.
        </p>
      </div>
    );
  }

  return (
    <BentoGrid columns={columns}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </BentoGrid>
  );
}
