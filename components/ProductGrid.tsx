import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="glass" style={{ borderRadius: 20, padding: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>
          No products found
        </h2>
        <p style={{ color: '#a89ec9', marginTop: '.75rem', fontSize: '.9rem' }}>
          Try a different search or check your Supabase data.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
