import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Smartphone Catalog | Witflag AI', description: 'Browse AI-ready smartphones with scores, prices and product intelligence signals.' };

export default async function ProductsPage() {
  const products = await getProducts(300);
  return (
    <main className="surface-bg">
      <section className="page-hero">
        <div className="content-shell">
          <p className="ph-eyebrow">Smartphone catalog</p>
          <h1 className="ph-title">Explore AI-ready smartphone data.</h1>
          <p className="ph-sub">Browse the full Witflag smartphone database with product scores, summaries, prices, images, and comparison-ready fields.</p>
          <div className="metric-grid mt-8">
            <div className="metric"><div className="metric-value">{products.length}</div><div className="metric-label">products loaded</div></div>
            <div className="metric"><div className="metric-value">6</div><div className="metric-label">score signals</div></div>
            <div className="metric"><div className="metric-value">AI</div><div className="metric-label">comparison-ready</div></div>
            <div className="metric"><div className="metric-value">SEO</div><div className="metric-label">guide-ready</div></div>
          </div>
        </div>
      </section>
      <section className="section content-shell"><ProductGrid products={products} /></section>
    </main>
  );
}
