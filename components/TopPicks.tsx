import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export default function TopPicks({ products }: { products: Product[] }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <h2>Top picks for you ✨</h2>
          <p>Discover the highest scoring smartphones right now.</p>
        </div>
        <Link href="/products">View all products →</Link>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={product.id || product.slug || index} product={product} rank={index + 1} />
        ))}
      </div>
    </section>
  )
}
