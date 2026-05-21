import ProductCard from './ProductCard'
import { Product } from '@/lib/products'

type ProductGridProps = {
  products: Product[]
  limit?: number
}

export default function ProductGrid({ products, limit }: ProductGridProps) {
  const visibleProducts = limit ? products.slice(0, limit) : products

  if (!visibleProducts || visibleProducts.length === 0) {
    return (
      <div className="wf-empty-state">
        <h3>No products found</h3>
        <p>Try adjusting your search or connect Supabase product data.</p>
      </div>
    )
  }

  return (
    <div className="wf-product-grid">
      {visibleProducts.map((product, index) => (
        <ProductCard key={String(product.id || product.slug || product.full_name || index)} product={product} rank={index + 1} />
      ))}
    </div>
  )
}
