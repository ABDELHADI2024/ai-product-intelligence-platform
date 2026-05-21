import Link from 'next/link';
import {
  getComparisonVerdict,
  getComparisonWinners,
  getProductName,
  getProducts,
  getProductsBySlugs,
  safeNumber,
  formatPrice,
  Product,
} from '@/lib/products';
import ComparisonProductPicker from '@/components/ComparisonProductPicker';

export const dynamic = 'force-dynamic';

type ComparePageProps = {
  searchParams?: Promise<{ phones?: string }>;
};

function parseSelectedSlugs(value?: string): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 4);
}

const SCORE_ROWS = [
  { key: 'global_score',  label: 'Global Score',  icon: '🌐', color: '#a78bfa' },
  { key: 'camera_score',  label: 'Camera',         icon: '📸', color: '#22d3ee' },
  { key: 'battery_score', label: 'Battery',        icon: '🔋', color: '#4ade80' },
  { key: 'display_score', label: 'Display',        icon: '📺', color: '#6366f1' },
  { key: 'gaming_score',  label: 'Gaming',         icon: '🎮', color: '#fbbf24' },
  { key: 'value_score',   label: 'Value',          icon: '💰', color: '#f87171' },
] as const;

type ScoreRowKey = typeof SCORE_ROWS[number]['key'];

function ScoreBar({
  value,
  max,
  color,
  isWinner,
}: {
  value: number | null;
  max: number;
  color: string;
  isWinner: boolean;
}) {
  const pct = value !== null && max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flex: 1 }}>
      <div
        style={{
          flex: 1,
          height: 8,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: 999,
            background: isWinner
              ? `linear-gradient(90deg, ${color}, ${color}cc)`
              : `${color}66`,
            transition: 'width .4s ease',
            boxShadow: isWinner ? `0 0 8px ${color}88` : 'none',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: 'Syne,sans-serif',
          fontWeight: 900,
          fontSize: '.85rem',
          color: isWinner ? color : 'var(--t2)',
          minWidth: 28,
          textAlign: 'right',
        }}
      >
        {value !== null ? Math.round(value) : '—'}
      </div>
      {isWinner && (
        <span
          className="tag tag-c"
          style={{ fontSize: '.55rem', padding: '.15rem .4rem', flexShrink: 0 }}
        >
          ✓ Best
        </span>
      )}
    </div>
  );
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedSlugs = parseSelectedSlugs(resolvedSearchParams.phones);

  const [popularProducts, selectedProducts] = await Promise.all([
    getProducts(24),
    selectedSlugs.length ? getProductsBySlugs(selectedSlugs) : Promise.resolve([]),
  ]);

  const productsForComparison: Product[] =
    selectedProducts.length >= 2 ? selectedProducts : popularProducts.slice(0, 3);

  const activeSlugs = productsForComparison.map((p) => p.slug || '').filter(Boolean);
  const verdict = getComparisonVerdict(productsForComparison);
  const winners = getComparisonWinners(productsForComparison);

  // Build winner map: scoreKey → winning product id
  const winnerMap = new Map<string, string | undefined>();
  winners.forEach((w) => {
    if (w.winner?.id) winnerMap.set(w.key, w.winner.id);
  });

  return (
    <main>
      {/* ── HERO ── */}
      <div
        className="surface-bg page-hero"
        style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}
      >
        <div className="content-shell">
          <span className="ph-eyebrow">Comparison Engine</span>
          <h1>
            Compare smartphones
            <br />
            score by score.
          </h1>
          <p className="ph-sub">
            Select up to four smartphones. Witflag ranks camera, battery,
            gaming, display, value, and global scores with a clear winner label.
          </p>

          {/* Active comparison strip */}
          <div
            className="glass"
            style={{
              borderRadius: 14,
              padding: '.85rem 1.25rem',
              marginTop: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ fontSize: '.7rem', color: 'var(--t3)' }}>Comparing</span>
            <span
              style={{
                fontFamily: 'Syne,sans-serif',
                fontWeight: 800,
                color: 'var(--c)',
                fontSize: '.92rem',
              }}
            >
              {productsForComparison.map(getProductName).join(' vs ')}
            </span>
          </div>
        </div>
      </div>

      {/* ── PRODUCT PICKER ── */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid rgba(124,58,237,.08)' }}>
        <div className="content-shell">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '1.1rem',
              flexWrap: 'wrap',
              gap: '.5rem',
            }}
          >
            <div>
              <span className="tag tag-v" style={{ marginBottom: '.4rem', display: 'inline-flex' }}>
                Select smartphones
              </span>
              <div
                style={{
                  fontFamily: 'Syne,sans-serif',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#fff',
                  marginTop: '.25rem',
                }}
              >
                Choose up to 4 products
              </div>
            </div>
            <p style={{ fontSize: '.78rem', color: 'var(--t2)' }}>
              Tip: click a card to add or remove it from comparison.
            </p>
          </div>
          <ComparisonProductPicker products={popularProducts} selectedSlugs={activeSlugs} />
        </div>
      </section>

      {/* ── SCORE COMPARISON BARS ── */}
      <section style={{ padding: '2.5rem 0', borderBottom: '1px solid rgba(124,58,237,.08)' }}>
        <div className="content-shell">
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="tag tag-c" style={{ marginBottom: '.4rem', display: 'inline-flex' }}>
              AI Score Breakdown
            </span>
            <div
              style={{
                fontFamily: 'Syne,sans-serif',
                fontWeight: 900,
                fontSize: '1.35rem',
                color: '#fff',
                marginTop: '.25rem',
              }}
            >
              Visual score comparison
            </div>
          </div>

          {/* Product header columns */}
          <div
            className="glass"
            style={{ borderRadius: 20, padding: '1.5rem', overflow: 'hidden' }}
          >
            {/* Column headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `160px repeat(${productsForComparison.length}, 1fr)`,
                gap: '1rem',
                marginBottom: '1.25rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(124,58,237,.12)',
              }}
            >
              <div />
              {productsForComparison.map((p) => {
                const isOverallWinner = verdict.bestOverall?.id === p.id;
                return (
                  <div key={p.id} style={{ textAlign: 'center' }}>
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={getProductName(p)}
                        style={{
                          height: 70,
                          maxWidth: '100%',
                          objectFit: 'contain',
                          margin: '0 auto .5rem',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: 70,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                        }}
                      >
                        📱
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: 'Syne,sans-serif',
                        fontWeight: 800,
                        fontSize: '.82rem',
                        color: '#fff',
                        lineHeight: 1.2,
                      }}
                    >
                      {getProductName(p)}
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'var(--t2)', marginTop: '.2rem' }}>
                      {formatPrice(p)}
                    </div>
                    {isOverallWinner && (
                      <span
                        className="tag tag-g"
                        style={{ marginTop: '.4rem', fontSize: '.6rem' }}
                      >
                        🏆 Best overall
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Score rows */}
            {SCORE_ROWS.map(({ key, label, icon, color }) => {
              const max = Math.max(
                ...productsForComparison.map((p) => safeNumber(p[key as ScoreRowKey]) ?? 0),
                1
              );
              const winnerId = winnerMap.get(key);

              return (
                <div
                  key={key}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `160px repeat(${productsForComparison.length}, 1fr)`,
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '.6rem 0',
                    borderBottom: '1px solid rgba(124,58,237,.07)',
                  }}
                >
                  {/* Label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>{icon}</span>
                    <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--t2)' }}>
                      {label}
                    </span>
                  </div>

                  {/* Score bars */}
                  {productsForComparison.map((p) => {
                    const val = safeNumber(p[key as ScoreRowKey]);
                    const isWinner = winnerId === p.id && val !== null;
                    return (
                      <ScoreBar
                        key={p.id}
                        value={val}
                        max={max}
                        color={color}
                        isWinner={isWinner}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI VERDICT ── */}
      <section style={{ padding: '2rem 0 3rem' }}>
        <div className="content-shell">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {/* Best overall */}
            <div className="verdict-card">
              <h3>🏆 Best Overall</h3>
              <p>
                {verdict.bestOverall
                  ? `${getProductName(verdict.bestOverall)} leads with the highest global score.`
                  : 'Select products to see verdict.'}
              </p>
              {verdict.bestOverall && (
                <Link
                  href={`/products/${verdict.bestOverall.slug}`}
                  className="btn-cyan"
                  style={{ marginTop: '.85rem', borderRadius: 10, fontSize: '.78rem', padding: '.5rem 1.1rem', display: 'inline-flex' }}
                >
                  View details →
                </Link>
              )}
            </div>

            {/* Summary */}
            <div className="ai-summary">
              <div
                style={{
                  fontFamily: 'Syne,sans-serif',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '.75rem',
                  fontSize: '.95rem',
                }}
              >
                🤖 AI Summary
              </div>
              <p style={{ fontSize: '.83rem', color: 'var(--t2)', lineHeight: 1.65, margin: 0 }}>
                {verdict.summary}
              </p>
            </div>
          </div>

          {/* Winner chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
            {[
              { label: '📸 Best Camera',  product: verdict.bestCamera  },
              { label: '🔋 Best Battery', product: verdict.bestBattery },
              { label: '🎮 Best Gaming',  product: verdict.bestGaming  },
              { label: '📺 Best Display', product: verdict.bestDisplay },
              { label: '💰 Best Value',   product: verdict.bestValue   },
            ].map(({ label, product }) =>
              product ? (
                <div
                  key={label}
                  className="glass"
                  style={{ borderRadius: 999, padding: '.4rem 1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}
                >
                  <span style={{ fontSize: '.72rem', color: 'var(--t3)' }}>{label}:</span>
                  <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--c)' }}>
                    {getProductName(product)}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
