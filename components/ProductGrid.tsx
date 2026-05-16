import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/products';

type ProductGridProps = { products: Product[] };

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center text-slate-300">
        No products found yet. Add smartphones to Supabase to unlock the intelligence grid.
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
