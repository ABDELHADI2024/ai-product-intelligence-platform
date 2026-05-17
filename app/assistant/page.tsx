import ProductGrid from '@/components/ProductGrid';
import { getProducts, rankProductsForUseCase } from '@/lib/products';

export const dynamic = 'force-dynamic';

type AssistantPageProps = {
  searchParams: Promise<{
    use?: string;
    budget?: string;
  }>;
};

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const { use = 'balanced', budget } = await searchParams;
  const products = await getProducts(300);
  const recommendations = rankProductsForUseCase(products, use, budget ? Number(budget) : undefined).slice(0, 6);

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Guided AI Buyer Assistant</span>
        <h1>Find the right smartphone for your real needs</h1>
        <p>No paid AI API yet. This first assistant ranks smartphones using your Supabase scores.</p>

        <div className="assistant-chips">
          <a href="/assistant?use=balanced">Balanced</a>
          <a href="/assistant?use=camera">Best camera</a>
          <a href="/assistant?use=battery">Best battery</a>
          <a href="/assistant?use=gaming">Gaming</a>
          <a href="/assistant?use=value">Best value</a>
        </div>
      </section>

      <section className="section-shell">
        <div className="ai-summary">
          <strong>Recommendation logic</strong>
          <p>
            Current mode: <b>{use}</b>. The assistant filters by budget when provided and ranks by the most relevant score.
          </p>
        </div>

        <ProductGrid products={recommendations} />
      </section>
    </main>
  );
}
