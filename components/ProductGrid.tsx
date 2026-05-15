import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/products';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-slate-400">
        No smartphones found yet. Add products in Supabase to start building the intelligence layer.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
