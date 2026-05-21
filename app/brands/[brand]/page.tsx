import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, safeNumber, Product } from '@/lib/products';

export const dynamic = 'force-dynamic';

type BrandPageProps = { params: Promise<{ brand: string }> };

function slugifyBrand(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function averageScore(products: Product[]): number | null {
  const scores = products
    .map((p) => safeNumber(p.global_score as string | number | null))
    .filter((v): v is number => v !== null);
  if (!scores.length) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params;

  const allProducts = await getProducts(300);

  /* Find matching brand (case-insensitive slug match) */
  const matchingBrand = allProducts
    .map((p) => p.brand)
    .filter((b): b is string => Boolean(b))
    .find((b) => slugifyBrand(b) === brandSlug);

  if (!matchingBrand) {
    return (
      <main style={{ padding: '5rem 1.5rem', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>🏷️</div>
        <span className="tag tag-v" style={{ marginBottom: '.75rem' }}>Not Found</span>
        <h1
          style={{
            fontFamily: 'Syne,sans-serif',
            fontWeight: 900,
            fontSize: '1.8rem',
            color: '#fff',
            margin: '.75rem 0',
          }}
        >
          Brand not found
        </h1>
        <p style={{ color: 'var(--t2)', marginBottom: '1.5rem', fontSize: '.9rem' }}>
          This brand does not exist in our database yet.
        </p>
        <Link className="btn-primary" href="/brands">← All brands</Link>
      </main>
    );
  }

  const brandProducts = allProducts.filter((p) => p.brand === matchingBrand);
  const avg = averageScore(brandProducts);

  /* Category breakdown */
  const categoryMap = new Map<string, number>();
  brandProducts.forEach((p) => {
    const cat = p.normalized_category || 'Smartphone';
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });
  const categories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <main>
      {/* ── HERO ── */}
      <div
        className="surface-bg page-hero"
        style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}
      >
        <div className="content-shell">
          <span className="ph-eyebrow">Brand Intelligence</span>
          <h1>{matchingBrand}</h1>
          <p className="ph-sub">
            All {matchingBrand} smartphones ranked by structured product intelligence scores.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <div className="metric" style={{ minWidth: 100 }}>
              <div className="mv">{brandProducts.length}</div>
              <div className="ml">Smartphones</div>
            </div>
            {avg !== null && (
              <div className="metric" style={{ minWidth: 100 }}>
                <div className="mv">{avg}</div>
                <div className="ml">Avg global score</div>
              </div>
            )}
            {categories.length > 1 && (
              <div className="metric" style={{ minWidth: 100 }}>
                <div className="mv">{categories.length}</div>
                <div className="ml">Categories</div>
              </div>
            )}
          </div>

          {/* Category pills */}
          {categories.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '.4rem',
                marginTop: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {categories.map(([cat, count]) => (
                <span key={cat} className="tag tag-v" style={{ fontSize: '.68rem' }}>
                  {cat} ({count})
                </span>
              ))}
            </div>
          )}

          <div
            style={{ display: 'flex', gap: '.6rem', marginTop: '1.25rem', flexWrap: 'wrap' }}
          >
            <Link
              href="/brands"
              className="btn-ghost"
              style={{ borderRadius: 12, fontSize: '.8rem' }}
            >
              ← All brands
            </Link>
            <Link
              href="/compare"
              className="btn-primary"
              style={{ borderRadius: 12, fontSize: '.8rem' }}
            >
              ⚖️ Compare
            </Link>
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="content-shell">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '.5rem',
            }}
          >
            <div>
              <span className="tag tag-c sec-label" style={{ marginBottom: '.4rem' }}>
                Live Data
              </span>
              <div className="sec-title">{matchingBrand} Smartphones</div>
            </div>
            <Link
              href="/products"
              style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--vl)' }}
            >
              Full catalog →
            </Link>
          </div>

          <ProductGrid products={brandProducts} />
        </div>
      </section>
    </main>
  );
}
