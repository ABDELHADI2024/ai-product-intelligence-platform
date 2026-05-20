import React from 'react';
import type { Product } from '@/lib/products';
import ProductCard from './ProductCard';

type BentoGridProps = {
  children?: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
  products?: Product[];
};

export default function BentoGrid({
  children,
  className = '',
  columns = 3,
  products,
}: BentoGridProps) {
  const columnClass =
    columns === 4
      ? 'xl:grid-cols-4'
      : columns === 2
        ? 'xl:grid-cols-2'
        : 'xl:grid-cols-3';

  return (
    <div
      className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 ${columnClass} ${className}`}
    >
      {products
        ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : children}
    </div>
  );
}
