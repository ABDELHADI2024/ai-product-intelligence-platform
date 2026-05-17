import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(48);
  const categories = [
    ['All', products.length],
    ['Camera', products.filter((p) => Number(p.camera_score || 0) >= 80).length],
    ['Battery', products.filter((p) => Number(p.battery_score || 0) >= 80).length],
    ['Gaming', products.filter((p) => Number(p.gaming_score || 0) >= 80).length],
    ['Value', products.filter((p) => Number(p.value_score || 0) >= 80).length],
  ];

  return (
    <main className="min-h-screen px-5 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Smartphone catalog</p>
          <h1 className="mt-3 text-5xl font-black">All AI-ready smartphones</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Browse the Witflag smartphone database with scores for camera, battery, display, gaming, value, and global recommendation fit.
          </p>
          <div className="mt-6 max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Categories</p>
            <div className="mt-4 space-y-2">
              {categories.map(([label, count]) => (
                <div key={String(label)} className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
                  <span>{label}</span>
                  <span className="text-cyan-300">{count}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4 text-sm leading-6 text-slate-400">
              Tip: use search for natural phrases like “best camera phone” or “battery under 500 euros”.
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-400">Showing top {products.length} smartphones by AI score</p>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">Sorted by global score</p>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </main>
  );
}
