import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(30);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-wide text-cyan-300">Live database</p>
        <h1 className="mt-2 text-5xl font-bold text-white">Products</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Explore AI-ready consumer tech records from Supabase, prepared for semantic search, recommendations, comparisons, and RAG workflows.
        </p>
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
