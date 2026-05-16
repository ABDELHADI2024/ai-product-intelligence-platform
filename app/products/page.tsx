import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(50);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/[0.04] p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Smartphone intelligence catalog</p>
          <h1 className="mt-3 text-5xl font-black">Explore AI-ready smartphones.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Browse smartphones enriched with structured specs, scores, product summaries, and decision signals for search, comparison, and recommendation workflows.
          </p>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
