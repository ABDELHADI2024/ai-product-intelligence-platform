import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All Products | Witflag AI',
  description: 'Browse AI-scored products with scores, prices, summaries, and product intelligence signals.',
};

const CATEGORIES = ['All Categories', 'Smartphones', 'Foldables'];

export default async function ProductsPage() {
  const products = await getProducts(300);

  return (
    <main>
      {/* Hero */}
      <div className="surface-bg page-hero" style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}>
        <div className="content-shell">
          <span className="ph-eyebrow">Catalog</span>
          <h1>All Products</h1>
          <p className="ph-sub">Browse and compare the best products scored by our AI.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.85rem', maxWidth: 560, marginTop: '1.5rem' }}>
            {[[products.length.toString(),'Products loaded'],['6','Score signals'],['AI','Comparison-ready'],['SEO','Guide-ready']].map(([v,l]) => (
              <div key={l} className="metric">
                <div className="mv">{v}</div>
                <div className="ml">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <section style={{ padding: '2rem 0' }}>
        <div className="content-shell" style={{ display: 'flex', gap: '1.5rem' }}>

          {/* Sidebar */}
          <aside style={{ width: 190, flexShrink: 0 }}>
            <div style={{ fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--t3)', fontWeight: 600, marginBottom: '.5rem' }}>
              Categories
            </div>
            <div className="glass" style={{ borderRadius: 14, padding: '.4rem' }}>
              {CATEGORIES.map((cat, i) => (
                <div key={cat} className={`cat-item${i === 0 ? ' active' : ''}`}>
                  {cat}
                </div>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div className="search-pill" style={{ flex: 1, maxWidth: 340 }}>
                <input placeholder="Filter products..." />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--t2)' }}>
                Sort by:
                <select style={{ background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 8, padding: '.3rem .65rem', color: 'var(--t2)', fontSize: '.78rem', outline: 'none', cursor: 'pointer' }}>
                  <option>Top Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </main>
  );
}
