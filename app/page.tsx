import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts(8);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-grid">
          <div>
            <div className="eyebrow">AI Smartphone Intelligence Platform</div>
            <h1>
              AI-powered product intelligence for <span>smarter smartphone decisions</span>
            </h1>
            <p>
              Compare smartphones using structured specs, AI-ready scores, buying guidance,
              search, and data-driven recommendations.
            </p>

            <SearchBar />

            <div className="hero-stats">
              <div><strong>296</strong><span>Smartphones</span></div>
              <div><strong>6</strong><span>AI score signals</span></div>
              <div><strong>Live</strong><span>Supabase data</span></div>
              <div><strong>No-cost</strong><span>Guided assistant</span></div>
            </div>
          </div>

          <div className="hero-device-card">
            <div className="device-orbit" />
            <div className="hero-phone-stack">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="floating-phone">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image_url} alt={product.full_name || 'Phone'} />
                  ) : (
                    <span>📱</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Top rated</span>
            <h2>AI-scored smartphones</h2>
          </div>
          <Link href="/products">View all →</Link>
        </div>

        <ProductGrid products={products} />
      </section>

      <section className="section-shell">
        <div className="trust-strip">
          {[
            ['Performance', 'Chipset, RAM and daily speed signals'],
            ['Display', 'Screen type, refresh rate and comfort'],
            ['Camera', 'Photo and video profile'],
            ['Battery', 'Capacity and charging confidence'],
            ['Value', 'Price-to-spec intelligence'],
          ].map(([title, text]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
