import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

type ProductGridProps = { products: Product[] };

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="glass p-10 text-center">
        <h2 className="text-2xl font-bold">No products found</h2>
        <p className="mt-3 text-slate-400">Try another search or check your Supabase product data.</p>
      </div>
    );
  }

  return <div className="pgrid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
