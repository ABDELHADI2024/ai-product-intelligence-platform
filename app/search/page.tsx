import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  const products = await getProducts(24);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Smart search preview</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Search smartphones by intent</h1>
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500" placeholder="Example: best smartphone for camera and battery under €500" />
          <p className="mt-4 text-sm text-slate-400">This is the visual foundation. Later this input will connect to semantic search, filters, and recommendation logic.</p>
        </div>
        <div className="mt-10"><ProductGrid products={products} /></div>
      </section>
    </main>
  );
}
