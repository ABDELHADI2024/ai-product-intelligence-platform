import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const products = await getProducts(60);
  const q = (searchParams.q || '').toLowerCase();
  const filtered = q
    ? products.filter((p) => `${p.full_name} ${p.brand} ${p.model} ${p.chipset}`.toLowerCase().includes(q))
    : products;

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <p className="text-sm uppercase tracking-wide text-cyan-300">Smart search MVP</p>
      <h1 className="mt-2 text-4xl font-bold text-white">Search products</h1>
      <form className="mt-8 flex max-w-2xl gap-3">
        <input name="q" defaultValue={searchParams.q || ''} placeholder="Search phone, brand, chipset..." className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-white outline-none focus:border-cyan-300" />
        <button className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Search</button>
      </form>
      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </main>
  );
}
