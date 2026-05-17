import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import ScoreRing from '@/components/ScoreRing';
import { getProducts, rankProductsForUseCase } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const all = await getProducts(300);
  const topRated = all.slice(0, 8);
  const topCamera = rankProductsForUseCase(all, 'camera').slice(0, 4);
  const topBattery = rankProductsForUseCase(all, 'battery').slice(0, 4);
  const topValue = rankProductsForUseCase(all, 'value').slice(0, 4);
  const heroPhones = all.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-glow hero-glow-three" />

        <div className="hero-grid">
          <div>
            <span className="eyebrow">AI Smartphone Intelligence Platform</span>
            <h1>
              Make smarter phone decisions with{' '}
              <span className="grad">AI-scored intelligence</span>
            </h1>
            <p className="hero-subtitle">
              We analyze, score and rank every smartphone across 5 AI signals —
              camera, battery, display, gaming and value — so you buy with confidence.
            </p>

            <SearchBar hero placeholder="Search brand, model, chipset, price range..." />

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>{all.length}+</strong>
                <span>Smartphones</span>
              </div>
              <div className="hero-stat">
                <strong>5</strong>
                <span>AI Score Signals</span>
              </div>
              <div className="hero-stat">
                <strong>Live</strong>
                <span>Supabase Data</span>
              </div>
              <div className="hero-stat">
                <strong>Free</strong>
                <span>Guided Assistant</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-device-card">
              <div className="device-grid-lines" />
              <div className="device-orbit-outer" />
              <div className="device-orbit-inner" />
              <div className="hero-phone-stack">
                {heroPhones.map((p) => (
                  <div key={p.id} className="floating-phone">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.full_name || 'Phone'} />
                    ) : (
                      <div className="phone-placeholder">📱</div>
                    )}
                  </div>
                ))}
              </div>
              {heroPhones[0] && (
                <div className="hero-score-badge">
                  <ScoreRing value={heroPhones[0].global_score} size="sm" />
                  <div>
                    <div style={{ color: 'var(--muted)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Global AI Score</div>
                    <strong style={{ color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>
                      {heroPhones[0].global_score ?? '—'}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TOP RATED */}
      <section className="section-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Top Rated</span>
            <h2>Highest AI-scored smartphones</h2>
          </div>
          <Link href="/products" className="view-all-link">View all →</Link>
        </div>
        <ProductGrid products={topRated} />
      </section>

      {/* AI TRUST STRIP */}
      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div className="trust-strip">
          {([
            ['📸', 'Camera Score', 'Photo & video quality and versatility'],
            ['🔋', 'Battery Score', 'Capacity, charging speed & longevity'],
            ['🖥️', 'Display Score', 'Screen type, refresh rate & brightness'],
            ['🎮', 'Gaming Score', 'Chipset power & thermal performance'],
            ['💰', 'Value Score', 'Price-to-specification intelligence'],
          ] as const).map(([icon, title, text]) => (
            <div key={title} className="trust-item">
              <div className="trust-icon">{icon}</div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BEST CAMERA */}
      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Category Pick</span>
            <h2>📸 Camera Champions</h2>
          </div>
          <Link href="/assistant?use=camera" className="view-all-link">See all →</Link>
        </div>
        <ProductGrid products={topCamera} />
      </section>

      {/* BATTERY + VALUE */}
      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Category Pick</span>
                <h2>🔋 Battery Life</h2>
              </div>
              <Link href="/assistant?use=battery" className="view-all-link">All →</Link>
            </div>
            <ProductGrid products={topBattery} />
          </div>
          <div>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Category Pick</span>
                <h2>💰 Best Value</h2>
              </div>
              <Link href="/assistant?use=value" className="view-all-link">All →</Link>
            </div>
            <ProductGrid products={topValue} />
          </div>
        </div>
      </section>

      {/* CTA CARDS */}
      <section className="section-shell" style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Link href="/assistant" style={{
            display: 'flex', alignItems: 'center', gap: 20,
            padding: '32px 28px',
            border: '1px solid var(--border-strong)', borderRadius: 22,
            background: 'linear-gradient(135deg, rgba(103,232,249,0.07), rgba(60,165,250,0.04))',
          }}>
            <span style={{ fontSize: 42 }}>🤖</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 6 }}>AI Buyer Assistant</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>Answer a few questions. Get your perfect match, ranked by AI scores.</div>
            </div>
          </Link>
          <Link href="/compare" style={{
            display: 'flex', alignItems: 'center', gap: 20,
            padding: '32px 28px',
            border: '1px solid var(--border)', borderRadius: 22,
            background: 'linear-gradient(135deg, rgba(167,139,250,0.06), rgba(8,14,32,0.5))',
          }}>
            <span style={{ fontSize: 42 }}>⚖️</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Side-by-Side Compare</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>Compare up to 4 smartphones across all specs and AI scores instantly.</div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
