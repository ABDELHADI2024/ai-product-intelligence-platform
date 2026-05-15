import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(50);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Smartphone catalog</p>
        <h1 className="mt-3 text-5xl font-black text-white">All smartphones</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Browse phones enriched with scores, specs, images, and AI-ready product intelligence fields from Supabase.
        </p>
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
