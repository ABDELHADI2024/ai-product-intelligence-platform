import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={product.id || product.slug || index} product={product} rank={index + 1} />
      ))}
    </div>
  )
}
