import Link from 'next/link';
import { Search, Sparkles, Zap } from 'lucide-react';
import SearchResultCard from '@/components/SearchResultCard';
import { getUseCaseLabel, smartSearchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

const quickSearches = [
  'best camera phone under 500',
  'battery under 300',
  'xiaomi gaming',
  'samsung camera',
  'foldable smartphone',
  'best value phone',
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = resolvedSearchParams.q || '';
  const { intent, results } = await smartSearchProducts(query, 24);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.22),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Smart search V1
          </div>

          <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            Search smartphones by need, not just by name.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Try natural phrases like “best camera under 500”, “battery phone”,
            “Xiaomi gaming”, or search directly by brand and model.
          </p>

          <form action="/search" className="mt-8 flex max-w-4xl flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/20 md:flex-row">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 text-cyan-300" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search: best camera phone under 500..."
                className="w-full bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickSearches.map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Search interpretation
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {query ? `Results for “${query}”` : 'Top smartphone results'}
              </h2>
              <p className="mt-2 text-slate-300">
                Intent: {getUseCaseLabel(intent.useCase)} · {intent.explanation}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300">
              <Zap className="h-4 w-4 text-cyan-300" />
              {results.length} ranked results
            </div>
          </div>
        </div>

        {results.length ? (
          <div className="space-y-5">
            {results.map((result, index) => (
              <SearchResultCard
                key={result.product.id}
                result={result}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
            <h2 className="text-2xl font-bold text-white">No results found</h2>
            <p className="mt-3 text-slate-400">
              Try a broader search like “camera”, “battery”, “gaming”, or a brand name.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
