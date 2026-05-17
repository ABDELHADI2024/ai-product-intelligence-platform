import { Search } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { searchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const q = params.q || '';
  const products = await searchProducts(q, 60);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 card-glow">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Smart search</p>
        <h1 className="mt-4 text-5xl font-black text-white">Search smartphones by need</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          First version: fast Supabase search by brand, model, chipset and content. Later: semantic search and RAG.
        </p>
        <form className="mt-8 flex max-w-2xl gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <Search className="h-5 w-5 text-cyan-300" />
            <input name="q" defaultValue={q} placeholder="Try: camera, Xiaomi, battery, Snapdragon..." className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" />
          </div>
          <button className="rounded-2xl bg-cyan-300 px-6 font-black text-slate-950 hover:bg-white">Search</button>
        </form>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">{q ? `Results for “${q}”` : 'Top smartphones'}</h2>
            <p className="mt-2 text-slate-400">{products.length} products found</p>
          </div>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
