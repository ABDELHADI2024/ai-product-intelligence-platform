import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { searchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const results = await searchProducts(q, 40);

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Smart search</span>
        <h1>{q ? `Search results for "${q}"` : 'Search the smartphone intelligence database'}</h1>
        <p>Search by brand, model, chipset, category or buying intent. Semantic search will be added later.</p>
        <SearchBar defaultValue={q} />
      </section>

      <section className="section-shell">
        {q ? (
          <div className="ai-summary">
            <strong>AI summary</strong>
            <p>Results are ranked using available smartphone scores, product content and structured data.</p>
          </div>
        ) : null}
        <ProductGrid products={results} />
      </section>
    </main>
  );
}
