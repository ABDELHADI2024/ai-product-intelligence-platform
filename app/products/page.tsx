import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All Products | Witflag',
  description: 'Browse products with scores, prices, summaries, and structured product intelligence signals.',
};

const CATEGORIES = ['All Categories', 'Smartphones', 'Foldables'];

export default async function ProductsPage() {
  const products = await getProducts(300);

  return (
    <main>
      {/* Hero */}
      <div className="surface-bg page-hero" style={{ borderBottom: '1px solid rgba(124,58,237,.15)', padding: '3rem 2.5rem' }}>
        <div className="content-shell" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <span className="ph-eyebrow" style={{ color: '#a78bfa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            Catalog
          </span>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', margin: '0.5rem 0' }}>
            All Products
          </h1>
          <p className="ph-sub" style={{ color: 'var(--t2)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.6 }}>
            Browse and compare the best products using structured product intelligence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '.85rem', maxWidth: 600, marginTop: '2rem' }}>
            {[
              [products.length.toString(), 'Products loaded'],
              ['5', 'Score signals'],
              ['Smart', 'Comparison-ready'],
              ['Daily', 'Updates']
            ].map(([v, l]) => (
              <div key={l} className="metric" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: '1.2rem 1rem', textAlign: 'center' }}>
                <div className="mv" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne,sans-serif' }}>{v}</div>
                <div className="ml" style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <section style={{ padding: '2.5rem', background: 'var(--bg)' }}>
        <div className="content-shell" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

          {/* Sidebar */}
          <aside style={{ width: '220px', flexShrink: 0 }}>
            <div style={{ fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--t3)', fontWeight: 700, marginBottom: '1rem' }}>
              Categories
            </div>
            <div className="glass" style={{ borderRadius: 16, padding: '.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              {CATEGORIES.map((cat, i) => (
                <div 
                  key={cat} 
                  className={`cat-item${i === 0 ? ' active' : ''}`}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: 10,
                    fontSize: '0.85rem',
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? '#fff' : 'var(--t2)',
                    background: i === 0 ? 'rgba(124,58,237,0.15)' : 'transparent',
                    cursor: 'pointer',
                    marginBottom: '0.2rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div style={{ flex: 1, minWidth: 300 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div className="search-pill" style={{ flex: 1, maxWidth: 400, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.6rem 1rem' }}>
                <input 
                  placeholder="Filter products..." 
                  style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.85rem', color: 'var(--t2)' }}>
                <span>Sort by:</span>
                <select style={{ background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 10, padding: '.5rem 1rem', color: '#fff', fontSize: '.85rem', outline: 'none', cursor: 'pointer' }}>
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
