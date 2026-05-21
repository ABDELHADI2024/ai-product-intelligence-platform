import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/products';

export default function TopPicks({ products }: { products: Product[] }) {
  return (
    <section className="top-picks">
      <div className="section-head">
        <div>
          <h2>Top picks for you</h2>
          <p>Discover the highest scoring smartphones right now.</p>
        </div>
        <Link href="/products">View all products <ArrowRight size={14} /></Link>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={product.id || product.slug || index} product={product} rank={index + 1} />
        ))}
      </div>
    </section>
  );
}
