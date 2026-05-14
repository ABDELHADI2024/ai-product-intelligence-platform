import type { Product } from '@/lib/products';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-slate-300">
        No products found yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
