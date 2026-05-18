import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
        <h2 className="text-2xl font-bold text-white">No products found</h2>
        <p className="mt-3 text-slate-400">Try another search or check your Supabase product data.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
