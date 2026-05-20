import Link from 'next/link';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Smartphone Brands | Witflag AI',
  description: 'Browse smartphone brands ranked by product count and AI product intelligence data.',
};

function slugifyBrand(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function BrandsPage() {
  const products = await getProducts(300);
  const brandCounts = new Map<string, number>();

  products.forEach((product) => {
    if (!product.brand) return;
    brandCounts.set(product.brand, (brandCounts.get(product.brand) || 0) + 1);
  });

  const brands = Array.from(brandCounts.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <main>
      {/* Hero */}
      <div className="surface-bg page-hero" style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}>
        <div className="content-shell">
          <span className="ph-eyebrow">Brand Intelligence</span>
          <h1>Explore smartphone brands.</h1>
          <p className="ph-sub">
            Brand pages help users and search engines explore your smartphone database by manufacturer.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <div className="metric" style={{ minWidth: 120 }}>
              <div className="mv">{brands.length}</div>
              <div className="ml">Brands tracked</div>
            </div>
            <div className="metric" style={{ minWidth: 120 }}>
              <div className="mv">{products.length}</div>
              <div className="ml">Total smartphones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand grid */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="content-shell" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '.85rem' }}>
          {brands.map(({ brand, count }) => (
            <Link
              key={brand}
              href={`/brands/${slugifyBrand(brand)}`}
              className="brand-card gring"
            >
              <div className="bc-label">Brand</div>
              <div className="bc-name">{brand}</div>
              <div className="bc-count">{count} smartphone{count !== 1 ? 's' : ''}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
