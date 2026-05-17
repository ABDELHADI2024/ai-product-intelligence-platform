import ProductGrid from '@/components/ProductGrid';
import { getProducts, rankProductsForUseCase } from '@/lib/products';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type AssistantPageProps = {
  searchParams: Promise<{ use?: string; budget?: string }>;
};

const useCases = [
  { key: 'balanced', label: 'Best Overall', icon: '⭐', desc: 'Highest global AI score' },
  { key: 'camera', label: 'Best Camera', icon: '📸', desc: 'Top camera score' },
  { key: 'battery', label: 'Best Battery', icon: '🔋', desc: 'Longest battery life' },
  { key: 'gaming', label: 'Best Gaming', icon: '🎮', desc: 'Fastest chipset & GPU' },
  { key: 'value', label: 'Best Value', icon: '💰', desc: 'Most for your money' },
];

const budgets = [
  { label: 'Under €200', value: '200' },
  { label: 'Under €350', value: '350' },
  { label: 'Under €500', value: '500' },
  { label: 'Under €800', value: '800' },
  { label: 'Under €1200', value: '1200' },
  { label: 'No limit', value: '' },
];

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const { use = 'balanced', budget } = await searchParams;
  const products = await getProducts(300);
  const recommendations = rankProductsForUseCase(
    products,
    use,
    budget ? Number(budget) : undefined
  ).slice(0, 6);

  const activeCase = useCases.find((u) => u.key === use) ?? useCases[0];

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">AI Buyer Assistant</span>
        <h1>Find the perfect smartphone for your needs</h1>
        <p>
          No paid AI API — our assistant ranks {products.length}+ phones using real AI scores.
          Select your priority and budget to get personalized recommendations.
        </p>
      </section>

      <section className="assistant-layout">
        {/* Sidebar Panel */}
        <aside className="assistant-panel">
          <h2>🤖 Smart Finder</h2>
          <p>Choose your priority and budget. We rank by AI score — no guesswork.</p>

          <div className="assistant-section-title">1. What matters most?</div>
          <div className="assistant-chips">
            {useCases.map((uc) => (
              <Link
                key={uc.key}
                href={`/assistant?use=${uc.key}${budget ? `&budget=${budget}` : ''}`}
                className={`assistant-chip ${use === uc.key ? 'active' : ''}`}
              >
                <span className="assistant-chip-icon">{uc.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{uc.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--soft)' }}>{uc.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="assistant-section-title" style={{ marginTop: 20 }}>2. Your budget</div>
          <div className="budget-inputs">
            {budgets.map((b) => (
              <Link
                key={b.label}
                href={`/assistant?use=${use}${b.value ? `&budget=${b.value}` : ''}`}
                className={`budget-btn ${budget === b.value || (!budget && !b.value) ? 'active' : ''}`}
              >
                {b.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--soft)', lineHeight: 1.6 }}>
            💡 Powered by live Supabase AI scores. No OpenAI or paid API required.
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="recommendation-mode-banner">
            <span className="mode-icon">{activeCase.icon}</span>
            <div>
              <div className="mode-label">Current mode</div>
              <div className="mode-value">{activeCase.label}</div>
            </div>
            {budget && (
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Budget</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--violet)' }}>≤ €{budget}</div>
              </div>
            )}
            <div style={{ marginLeft: budget ? 0 : 'auto', textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Results</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--cyan)' }}>{recommendations.length} phones</div>
            </div>
          </div>

          {recommendations.length > 0 ? (
            <ProductGrid products={recommendations} />
          ) : (
            <div className="empty-state">
              <h3>No phones match your criteria</h3>
              <p style={{ marginTop: 8, marginBottom: 24 }}>
                Try raising your budget or changing your priority filter.
              </p>
              <Link href="/assistant" className="primary-button">Reset filters</Link>
            </div>
          )}

          <div style={{ marginTop: 28, padding: '20px 24px', border: '1px solid var(--border)', borderRadius: 16, background: 'rgba(8,14,32,0.6)' }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 6 }}>How scoring works</strong>
              Products are ranked by their <strong style={{ color: 'var(--cyan)' }}>{activeCase.label.toLowerCase().replace('best ', '')} score</strong> from our Supabase database.
              Scores are computed from structured specs including chipset, RAM, battery capacity, camera hardware and value index. Higher = better.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
