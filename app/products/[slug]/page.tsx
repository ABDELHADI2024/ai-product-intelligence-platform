import Link from 'next/link';
import MetricBox from '@/components/MetricBox';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductBySlug, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailPageProps = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main style={{ padding: '96px 24px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📱</div>
        <span className="eyebrow">Not Found</span>
        <h1 style={{ marginTop: 12, marginBottom: 12 }}>Smartphone not found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28 }}>This product does not exist in our database yet.</p>
        <Link className="primary-button" href="/products">← Back to products</Link>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);
  const name = safeText(product.full_name, product.model || 'Smartphone');

  return (
    <main>
      {/* PRODUCT HERO */}
      <section className="product-hero">
        {/* Image Panel */}
        <div className="product-media-panel">
          <div className="image-stage">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={name} />
            ) : (
              <div style={{ fontSize: 80, opacity: 0.3 }}>📱</div>
            )}
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link href="/compare" className="secondary-button" style={{ flex: 1, justifyContent: 'center' }}>
              ⚖️ Compare
            </Link>
            <Link href="/assistant" className="ghost-button" style={{ flex: 1, justifyContent: 'center' }}>
              🤖 Assistant
            </Link>
          </div>
        </div>

        {/* Info Panel */}
        <div className="product-info-panel">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/products">Smartphones</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{safeText(product.brand, 'Brand')}</span>
          </div>

          <div className="product-brand-tag">
            {safeText(product.brand, 'Smartphone')}
          </div>
          <h1>{name}</h1>

          <div className="product-price">
            <span className="price-main">{formatPrice(product)}</span>
            <span className="price-note">Market price</span>
          </div>

          <div className="global-score-row">
            <ScoreRing value={product.global_score} size="lg" />
            <div>
              <div className="global-score-label">
                Global AI Score
                <strong>{safeText(product.global_score, '—')} / 100</strong>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: 'var(--muted)' }}>
              <span>📸 Camera: <strong style={{ color: 'var(--text)' }}>{safeText(product.camera_score, '—')}</strong></span>
              <span>🔋 Battery: <strong style={{ color: 'var(--text)' }}>{safeText(product.battery_score, '—')}</strong></span>
              <span>💰 Value: <strong style={{ color: 'var(--text)' }}>{safeText(product.value_score, '—')}</strong></span>
            </div>
          </div>

          <p className="product-summary">
            {safeText(product.content_summary_en, 'A premium smartphone with strong AI-scored performance across all key metrics.')}
          </p>

          <div className="product-actions">
            <Link href="/compare" className="primary-button">⚖️ Add to Compare</Link>
            <Link href="/assistant" className="secondary-button">🤖 Get Recommendations</Link>
          </div>
        </div>

        {/* Key Specs */}
        <div className="key-spec-card">
          <h3>Key Specifications</h3>
          <MetricBox
            label="Display"
            value={product.screen_size}
            helper={`${safeText(product.screen_type, 'LCD')} · ${safeText(product.refresh_rate, '')}`}
          />
          <MetricBox
            label="Chipset"
            value={product.chipset}
            helper={`${safeText(product.ram, 'RAM')} RAM`}
          />
          <MetricBox
            label="Storage"
            value={product.storage}
            helper={`${safeText(product.ram, '')} RAM · ${safeText(product.storage, '')} Storage`}
          />
          <MetricBox
            label="Battery"
            value={product.battery_mah ? `${product.battery_mah}mAh` : null}
          />
          <MetricBox
            label="Rear Camera"
            value={product.rear_camera}
            helper={`Score: ${safeText(product.camera_score, '—')}`}
          />
          <MetricBox
            label="Front Camera"
            value={product.front_camera}
          />
          <MetricBox
            label="Resolution"
            value={product.resolution}
          />
        </div>
      </section>

      {/* SCORES + VERDICT */}
      <section className="section-shell detail-grid" style={{ paddingTop: 0 }}>
        <div>
          <div className="wide-card" style={{ marginBottom: 20 }}>
            <h2>AI Scores Breakdown</h2>
            <div className="score-row">
              <ScoreRing value={product.global_score} label="Global" size="lg" />
              <ScoreRing value={product.camera_score} label="Camera" size="md" />
              <ScoreRing value={product.battery_score} label="Battery" size="md" />
              <ScoreRing value={product.display_score} label="Display" size="md" />
              <ScoreRing value={product.gaming_score} label="Gaming" size="md" />
              <ScoreRing value={product.value_score} label="Value" size="md" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="list-card positive">
              <h3>✅ Pros</h3>
              <ul>
                {(pros.length ? pros : ['Strong AI-scored performance']).map((item) => (
                  <li key={item}>
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="list-card negative">
              <h3>⚠️ Cons</h3>
              <ul>
                {(cons.length ? cons : ['Some specs may need validation']).map((item) => (
                  <li key={item}>
                    <span>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className="verdict-card">
            <h2>🤖 AI Verdict</h2>
            <p>
              {safeText(
                product.expert_opinion_en,
                'Witflag evaluates this smartphone using camera, battery, display, gaming and value signals to produce a comprehensive AI score.'
              )}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
