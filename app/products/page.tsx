import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(24);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Smartphone database</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Explore smartphones</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Browse Witflag product records connected to Supabase. Each product can be enriched with specs, scores, AI verdicts, and comparison intelligence.</p>
        <div className="mt-10"><ProductGrid products={products} /></div>
      </section>
    </main>
  );
}
