import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { searchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = params.q || '';
  const products = await searchProducts(query, 32);

  return (
    <main className="min-h-screen px-5 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Smart search</p>
          <h1 className="mt-3 text-5xl font-black">Find smartphones by intent.</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Search by brand, model, chipset, camera, battery, or buying use case. This first version uses your Supabase data and is ready for semantic search later.
          </p>
          <div className="mt-7 max-w-3xl">
            <SearchBar defaultValue={query} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                {query ? `Results for “${query}”` : 'Top AI-scored smartphones'}
              </p>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                {products.length} results
              </p>
            </div>
            <ProductGrid products={products} compact />
          </div>

          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">AI summary</p>
            <h2 className="mt-3 text-2xl font-black">How search works</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Today, Witflag searches your structured product database. Later, this page will combine keyword search, embeddings, reranking, and RAG explanations.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl bg-white/[0.04] p-4">1. Understand buyer intent</div>
              <div className="rounded-2xl bg-white/[0.04] p-4">2. Match specs and scores</div>
              <div className="rounded-2xl bg-white/[0.04] p-4">3. Rank by product intelligence</div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
