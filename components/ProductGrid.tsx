import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
  compact?: boolean;
};

export default function ProductGrid({ products, compact = false }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center text-slate-300">
        No smartphones found yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}
