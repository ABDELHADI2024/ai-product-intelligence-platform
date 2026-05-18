import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Smartphone Catalog | Witflag AI',
  description: 'Browse AI-ready smartphones with scores, prices, summaries, and product intelligence signals.',
};

export default async function ProductsPage() {
  const products = await getProducts(300);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="premium-shell border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Smartphone catalog</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            Explore AI-ready smartphone data.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Browse the full Witflag smartphone database with product scores,
            summaries, prices, images, and comparison-ready fields.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="glass-card rounded-3xl p-5">
              <p className="text-3xl font-black">{products.length}</p>
              <p className="mt-1 text-sm text-slate-400">products loaded</p>
            </div>
            <div className="glass-card rounded-3xl p-5">
              <p className="text-3xl font-black">6</p>
              <p className="mt-1 text-sm text-slate-400">score signals</p>
            </div>
            <div className="glass-card rounded-3xl p-5">
              <p className="text-3xl font-black">AI</p>
              <p className="mt-1 text-sm text-slate-400">comparison-ready</p>
            </div>
            <div className="glass-card rounded-3xl p-5">
              <p className="text-3xl font-black">SEO</p>
              <p className="mt-1 text-sm text-slate-400">guide-ready</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
