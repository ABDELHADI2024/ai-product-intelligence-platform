import React from 'react'
import type { Product } from '@/lib/products'
import ProductCard from './ProductCard'

type BentoGridProps = {
  children?: React.ReactNode
  className?: string
  columns?: 2 | 3 | 4
  products?: Product[]
}

export default function BentoGrid({
  children,
  className = '',
  columns = 3,
  products,
}: BentoGridProps) {
  const columnClass =
    columns === 4
      ? 'bento-grid-4'
      : columns === 2
        ? 'bento-grid-2'
        : 'bento-grid-3'

  return (
    <div className={`bento-grid ${columnClass} ${className}`}>
      {products
        ? products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              rank={index + 1}
            />
          ))
        : children}
    </div>
  )
}
