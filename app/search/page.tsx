import ProductGrid from '@/components/ProductGrid';
import { searchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = params.q || '';
  const products = await searchProducts(query);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-wide text-cyan-300">Smart search</p>
        <h1 className="mt-2 text-5xl font-bold text-white">Search products</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Search by brand, model, category, or chipset. Semantic search will be added after embeddings are ready.
        </p>
      </div>

      <form className="mb-8 flex gap-3" action="/search">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search Huawei, Xiaomi, battery, smartphone..."
          className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white px-5 text-slate-950 outline-none"
        />
        <button className="rounded-2xl bg-cyan-500 px-6 font-semibold text-slate-950" type="submit">
          Search
        </button>
      </form>

      <ProductGrid products={products} />
    </main>
  );
}
