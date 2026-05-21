import Link from 'next/link'
import { formatPrice, getProductName, Product, productSlug, safeNumber } from '@/lib/products'

export default function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const name = getProductName(product)
  const score = safeNumber(product.global_score)

  return (
    <Link className="product-card" href={`/products/${productSlug(product)}`}>
      {rank ? <span className="rank-badge">{rank}</span> : null}
      <div className="product-image-wrap">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} />
        ) : (
          <div className="product-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="product-brand">{product.brand || 'Smartphone'}</div>
      <div className="product-name">{name}</div>
      <div className="product-bottom">
        <div className="product-price">{formatPrice(product)}</div>
        <div className="small-score">{score ?? '—'}</div>
      </div>
    </Link>
  )
}
