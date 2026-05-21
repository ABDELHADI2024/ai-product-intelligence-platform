import Link from 'next/link';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductBySlug, safeNumber, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailPageProps = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main style={{ padding: '5rem 1.5rem', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>📱</div>
        <span className="tag tag-v" style={{ marginBottom: '.75rem' }}>Not Found</span>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', margin: '.75rem 0' }}>
          Smartphone not found
        </h1>
        <p style={{ color: 'var(--t2)', marginBottom: '1.5rem', fontSize: '.9rem' }}>
          This product does not exist in our database yet.
        </p>
        <Link className="btn-primary" href="/products">← Back to products</Link>
      </main>
    );
  }

  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);
  const name = safeText(product.full_name, product.model || 'Smartphone');

  const globalScore  = safeNumber(product.global_score);
  const cameraScore  = safeNumber(product.camera_score);
  const batteryScore = safeNumber(product.battery_score);
  const displayScore = safeNumber(product.display_score);
  const gamingScore  = safeNumber(product.gaming_score);
  const valueScore   = safeNumber(product.value_score);

  return (
    <main>
      {/* ── DETAIL HERO ── */}
      <div className="hero-bg" style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}>
        <div className="detail-hero">

          {/* Left — image */}
          <div className="detail-media">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={name} />
            ) : (
              <div style={{ fontSize: 64, opacity: .3 }}>📱</div>
            )}
            <div style={{ display: 'flex', gap: '.5rem', width: '100%' }}>
              <Link href="/compare" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: '.75rem', padding: '.5rem' }}>
                ⚖️ Compare
              </Link>
              <Link href="/assistant" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: '.75rem', padding: '.5rem' }}>
                🤖 Assistant
              </Link>
            </div>
          </div>

          {/* Center — info */}
          <div className="detail-info">
            {/* Breadcrumb */}
            <div className="bc">
              <Link href="/">Home</Link>
              <span className="bc-sep">/</span>
              <Link href="/products">Smartphones</Link>
              <span className="bc-sep">/</span>
              <span>{safeText(product.brand, 'Brand')}</span>
            </div>

            <span className="tag tag-v" style={{ alignSelf: 'flex-start' }}>
              {safeText(product.normalized_category, 'Smartphone')}
            </span>

            <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#fff', margin: '.25rem 0', letterSpacing: '-.02em', lineHeight: 1.1 }}>
              {name}
            </h1>

            <div>
              <div className="detail-price">{formatPrice(product)}</div>
              <div className="detail-price-note">Market price</div>
            </div>

            {/* Global score + quick scores */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '.25rem' }}>
              <ScoreRing value={product.global_score} label="Global" size="md" />
              <div>
                <div style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '.4rem' }}>Quick scores</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem', fontSize: '.78rem', color: 'var(--t2)' }}>
                  <span>📸 Camera: <strong style={{ color: '#fff' }}>{cameraScore !== null ? Math.round(cameraScore) : '—'}</strong></span>
                  <span>🔋 Battery: <strong style={{ color: '#fff' }}>{batteryScore !== null ? Math.round(batteryScore) : '—'}</strong></span>
                  <span>💰 Value: <strong style={{ color: '#fff' }}>{valueScore !== null ? Math.round(valueScore) : '—'}</strong></span>
                </div>
              </div>
            </div>

            <p className="detail-summary">
              {safeText(product.content_summary_en, 'A premium smartphone with strong AI-scored performance across all key metrics.')}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              <Link href="/compare" className="btn-primary">⚖️ Add to Compare</Link>
              <Link href="/assistant" className="btn-ghost">🤖 Get Recommendations</Link>
            </div>
          </div>

          {/* Right — key specs */}
          <div className="detail-specs">
            <h3>Key Specifications</h3>

            {[
              { icon: '📺', label: 'Display',    val: product.screen_size,   sub: `${safeText(product.screen_type,'LCD')} · ${safeText(product.refresh_rate,'')}` },
              { icon: '⚡', label: 'Chipset',    val: product.chipset,       sub: `${safeText(product.ram,'')} RAM` },
              { icon: '💾', label: 'Storage',    val: product.storage,       sub: `${safeText(product.ram,'')} RAM` },
              { icon: '🔋', label: 'Battery',    val: product.battery_mah ? `${product.battery_mah} mAh` : null, sub: '' },
              { icon: '📸', label: 'Rear Cam',   val: product.rear_camera,   sub: `Score: ${cameraScore !== null ? Math.round(cameraScore) : '—'}` },
              { icon: '🤳', label: 'Front Cam',  val: product.front_camera,  sub: '' },
              { icon: '🖥',  label: 'Resolution', val: product.resolution,    sub: '' },
            ].map(({ icon, label, val, sub }) => (
              <div key={label} className="spec-row">
                <div className="spec-icon">{icon}</div>
                <div>
                  <div className="spec-label">{label}</div>
                  {sub ? <div style={{ fontSize: '.62rem', color: 'var(--t3)', marginTop: '.1rem' }}>{sub}</div> : null}
                </div>
                <div className="spec-val">{safeText(val, '—')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCORES + PROS/CONS + VERDICT ── */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid rgba(124,58,237,.1)', padding: '2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Score rings row */}
          <div style={{ marginBottom: '1.75rem' }}>
            <span className="sec-label tag tag-v" style={{ marginBottom: '.75rem', display: 'inline-flex' }}>AI Scores Breakdown</span>
            <div className="score-row-flex" style={{ marginTop: '.75rem' }}>
              <ScoreRing value={product.global_score}  label="Global"   size="lg" />
              <ScoreRing value={product.camera_score}  label="Camera"   size="md" />
              <ScoreRing value={product.battery_score} label="Battery"  size="md" />
              <ScoreRing value={product.display_score} label="Display"  size="md" />
              <ScoreRing value={product.gaming_score}  label="Gaming"   size="md" />
              <ScoreRing value={product.value_score}   label="Value"    size="md" />
            </div>
          </div>

          {/* Score detail cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: '.6rem', marginBottom: '1.75rem' }}>
            {[
              { label: 'Global',  val: globalScore,  color: '#a78bfa' },
              { label: 'Camera',  val: cameraScore,  color: '#22d3ee' },
              { label: 'Battery', val: batteryScore, color: '#4ade80' },
              { label: 'Display', val: displayScore, color: '#6366f1' },
              { label: 'Gaming',  val: gamingScore,  color: '#fbbf24' },
              { label: 'Value',   val: valueScore,   color: '#f87171' },
            ].map(({ label, val, color }) => (
              <div key={label} className="score-cell">
                <div className="sv" style={{ color }}>{val !== null ? Math.round(val) : '—'}</div>
                <div className="sl">{label}</div>
              </div>
            ))}
          </div>

          {/* Pros / Cons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="list-card positive">
              <h3>✅ Pros</h3>
              <ul>
                {(pros.length ? pros : ['Strong AI-scored performance']).map((item) => (
                  <li key={item}><span>✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="list-card negative">
              <h3>⚠️ Cons</h3>
              <ul>
                {(cons.length ? cons : ['Some specs may need validation']).map((item) => (
                  <li key={item}><span>•</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Verdict */}
          <div className="verdict-card">
            <h3>🤖 AI Verdict</h3>
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
