import Link from 'next/link';
import { Search, Sparkles, Zap } from 'lucide-react';
import SearchResultCard from '@/components/SearchResultCard';
import { getUseCaseLabel, smartSearchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
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
    <main>
      {/* Hero */}
      <div className="hero-bg page-hero" style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}>
        <div className="content-shell">
          <span className="tag tag-c" style={{ marginBottom: '.85rem', display: 'inline-flex' }}>
            <Sparkles size={11} /> Smart Search
          </span>

          <h1>Search smartphones by need,<br />not just by name.</h1>

          <p className="ph-sub">
            Try natural phrases like "best camera under 500", "battery phone",
            "Xiaomi gaming", or search directly by brand and model.
          </p>

          {/* Search form */}
          <form action="/search" method="GET" style={{ marginTop: '1.5rem', maxWidth: 680 }}>
            <div className="glass" style={{ borderRadius: 18, padding: '.5rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '.75rem', paddingLeft: '.75rem' }}>
                <Search size={16} color="#a78bfa" style={{ flexShrink: 0 }} />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search: best camera phone under 500..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--t1)', fontFamily: 'Inter,sans-serif', fontSize: '.9rem', padding: '.6rem 0' }}
                />
              </div>
              <button type="submit" className="btn-cyan" style={{ flexShrink: 0 }}>
                Search
              </button>
            </div>
          </form>

          {/* Quick searches */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginTop: '1rem' }}>
            {quickSearches.map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="tag tag-v"
                style={{ fontSize: '.68rem' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <section style={{ padding: '2rem 0' }}>
        <div className="content-shell">
          {/* Intent card */}
          <div className="glass" style={{ borderRadius: 16, padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--c)', fontWeight: 600, marginBottom: '.25rem' }}>
                Search interpretation
              </div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                {query ? `Results for "${query}"` : 'Top smartphone results'}
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--t2)', marginTop: '.2rem' }}>
                Intent: {getUseCaseLabel(intent.useCase)} · {intent.explanation}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 999, padding: '.4rem .85rem', fontSize: '.78rem', color: 'var(--vl)' }}>
              <Zap size={13} color="#22d3ee" />
              {results.length} ranked results
            </div>
          </div>

          {results.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map((result, index) => (
                <SearchResultCard key={result.product.id} result={result} rank={index + 1} />
              ))}
            </div>
          ) : (
            <div className="glass" style={{ borderRadius: 20, padding: '3rem', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>No results found</h2>
              <p style={{ color: 'var(--t2)', marginTop: '.65rem', fontSize: '.88rem' }}>
                Try a broader search like "camera", "battery", "gaming", or a brand name.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
