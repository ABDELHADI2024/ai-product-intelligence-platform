import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(96);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 card-glow">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Smartphone catalog</p>
        <h1 className="mt-4 text-5xl font-black text-white">AI-ready smartphone database</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Browse smartphones enriched with scores, summaries, images and decision-ready product intelligence.
        </p>
      </section>

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
