import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'All Products | Witflag AI',
  description: 'Browse AI-scored products with scores, prices, summaries, and product intelligence signals.',
};

const CATEGORIES = ['All Categories','Smartphones','Laptops','Headphones','Tablets','Smartwear','Cameras','More'];

export default async function ProductsPage() {
  const products = await getProducts(300);

  return (
    <main>
      {/* Hero */}
      <section className="surface-bg" style={{ borderBottom: '1px solid rgba(124,58,237,.15)', padding: '3rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <span className="tag tag-v" style={{ marginBottom: '.75rem' }}>Catalog</span>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', margin: '.5rem 0 .75rem', letterSpacing: '-.03em' }}>
            All Products
          </h1>
          <p style={{ color: '#a89ec9', fontSize: '.95rem', maxWidth: 480 }}>
            Browse and compare the best products scored by our AI.
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', maxWidth: 600, marginTop: '1.75rem' }}>
            {[[products.length.toString(),'Products loaded'],['6','Score signals'],['AI','Comparison-ready'],['SEO','Guide-ready']].map(([v,l]) => (
              <div key={l} className="metric">
                <div className="mv">{v}</div>
                <div className="ml">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: '2rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: '1.5rem' }}>

          {/* Sidebar */}
          <aside style={{ width: 200, flexShrink: 0 }}>
            <div style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#4a4168', fontWeight: 600, marginBottom: '.6rem' }}>
              Categories
            </div>
            <div className="glass" style={{ borderRadius: 14, padding: '.5rem' }}>
              {CATEGORIES.map((cat, i) => (
                <button key={cat} className={`cat-item${i === 0 ? ' active' : ''}`}>
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div style={{ flex: 1 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="search-pill" style={{ flex: 1, maxWidth: 360 }}>
                <input placeholder="Search products..." />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.78rem', color: '#a89ec9' }}>
                Sort by:
                <select
                  style={{
                    background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.2)',
                    borderRadius: 8, padding: '.35rem .75rem', color: '#a89ec9',
                    fontSize: '.78rem', outline: 'none', cursor: 'pointer',
                  }}
                >
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
