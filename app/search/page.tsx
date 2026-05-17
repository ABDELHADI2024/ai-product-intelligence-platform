import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { searchProducts } from '@/lib/products';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type SearchPageProps = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const results = await searchProducts(q, 40);

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Smart Search</span>
        <h1>
          {q ? (
            <>Results for &ldquo;<span style={{ color: 'var(--cyan)' }}>{q}</span>&rdquo;</>
          ) : (
            'Search the smartphone intelligence database'
          )}
        </h1>
        <p>
          Search by brand, model, chipset, category or price range. Ranked by AI score relevance.
        </p>
        <SearchBar defaultValue={q} placeholder="Try: Samsung 5G under €500, best camera phone..." />

        {!q && (
          <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['iPhone 15', 'Samsung Galaxy', 'Snapdragon 8', 'Best camera', 'Under 300'].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="filter-chip"
              >
                {term}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section-shell">
        {q ? (
          <div className="ai-summary">
            <div className="ai-summary-header">
              <span className="ai-badge">🤖 AI Summary</span>
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>{results.length} results found</span>
            </div>
            <p>
              Showing <strong style={{ color: 'var(--text)' }}>{results.length}</strong> smartphones matching{' '}
              <strong style={{ color: 'var(--cyan)' }}>&quot;{q}&quot;</strong>. Results are ranked by
              AI global score — the best match for your search appears first.
            </p>
          </div>
        ) : null}

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : q ? (
          <div className="empty-state">
            <h3>No results for &ldquo;{q}&rdquo;</h3>
            <p style={{ marginTop: 8, marginBottom: 20 }}>
              Try a different brand, model name, or chipset. Or let our AI Assistant help you find the right phone.
            </p>
            <Link href="/assistant" className="primary-button">Try AI Assistant →</Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
