import React from 'react'
import type { Product } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

type BentoGridProps = {
  products?: Product[]
  children?: React.ReactNode
  className?: string
}

export default function BentoGrid({ products, children, className = '' }: BentoGridProps) {
  return (
    <div className={`product-grid ${className}`}>
      {products ? products.map((product) => (
        <ProductCard key={product.id} product={product} />
      )) : children}
    </div>
  )
}
