import type { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

type ProductGridProps = {
  products: Product[];
  highlight?: 'camera' | 'battery' | 'gaming' | 'value' | 'balanced';
};

export default function ProductGrid({ products, highlight = 'balanced' }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center text-slate-300">
        No smartphones found yet. Add products in Supabase to activate this section.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} highlight={highlight} />
      ))}
    </div>
  );
}
