import CompareTable from '@/components/CompareTable';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, safeText } from '@/lib/products';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = await getProducts(12);
  const compareProducts = products.slice(0, 4);

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Side-by-Side Comparison</span>
        <h1>Compare smartphones in detail</h1>
        <p>
          AI scores, key specs and pricing for up to 4 devices side by side. Winners are highlighted automatically.
        </p>
      </section>

      <section className="section-shell" style={{ paddingTop: 24 }}>
        {/* Compare product heads preview */}
        <div style={{
          display: 'flex',
          gap: 16,
          marginBottom: 24,
          padding: '20px 24px',
          border: '1px solid var(--border)',
          borderRadius: 18,
          background: 'var(--panel)',
          overflowX: 'auto',
        }}>
          {compareProducts.map((p) => (
            <div key={p.id} style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              border: '1px solid var(--border-strong)',
              borderRadius: 12,
              background: 'rgba(103,232,249,0.04)',
            }}>
              {p.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt={safeText(p.full_name, 'Phone')} style={{ height: 44, objectFit: 'contain' }} />
              )}
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {safeText(p.brand, 'Brand')}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                  {safeText(p.model, 'Phone')}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--cyan)' }}>
                {p.global_score ?? '—'}
              </div>
            </div>
          ))}
        </div>

        <CompareTable products={compareProducts} />
      </section>

      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Browse More</span>
            <h2>Popular smartphones</h2>
          </div>
          <Link href="/products" className="view-all-link">View all →</Link>
        </div>
        <ProductGrid products={products.slice(4, 12)} />
      </section>
    </main>
  );
}
