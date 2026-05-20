import Link from 'next/link';
import { Trophy } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, safeNumber, Product } from '@/lib/products';

export const dynamic = 'force-dynamic';

type BestSlugPageProps = { params: Promise<{ slug: string }> };

/* ──────────────────────────────────────────────
   Config map: slug → display metadata + sort key
────────────────────────────────────────────── */
interface GuideConfig {
  title: string;
  eyebrow: string;
  description: string;
  badge: string;
  sortKey: keyof Product;
  maxPrice?: number;
}

const GUIDE_MAP: Record<string, GuideConfig> = {
  'best-camera-phones': {
    title: 'Best Camera Phones',
    eyebrow: 'Camera Intelligence',
    description:
      'Smartphones ranked by camera score, image potential, display quality, and global product intelligence.',
    badge: 'Camera',
    sortKey: 'camera_score',
  },
  'best-battery-phones': {
    title: 'Best Battery Phones',
    eyebrow: 'Battery Intelligence',
    description:
      'Find smartphones with strong battery scores, endurance potential, and daily reliability signals.',
    badge: 'Battery',
    sortKey: 'battery_score',
  },
  'best-gaming-phones': {
    title: 'Best Gaming Phones',
    eyebrow: 'Gaming Intelligence',
    description:
      'Performance-first smartphones ranked by gaming score, chipset signals, display, and battery balance.',
    badge: 'Gaming',
    sortKey: 'gaming_score',
  },
  'best-value-phones': {
    title: 'Best Value Phones',
    eyebrow: 'Value Intelligence',
    description:
      'Smartphones that balance price, global score, and practical everyday strengths.',
    badge: 'Value',
    sortKey: 'value_score',
  },
  'best-phones-under-500': {
    title: 'Best Phones Under €500',
    eyebrow: 'Budget Intelligence',
    description:
      'AI-ranked smartphones focused on strong value and practical specs under a mid-range budget.',
    badge: 'Budget',
    sortKey: 'global_score',
    maxPrice: 500,
  },
  'best-foldable-phones': {
    title: 'Best Foldable Phones',
    eyebrow: 'Foldable Intelligence',
    description:
      'Foldable smartphones ranked by global score and structured product intelligence signals.',
    badge: 'Foldable',
    sortKey: 'global_score',
  },
};

function sortByScore(products: Product[], key: keyof Product): Product[] {
  return [...products].sort((a, b) => {
    const av = safeNumber(a[key] as string | number | null) ?? -1;
    const bv = safeNumber(b[key] as string | number | null) ?? -1;
    return bv - av;
  });
}

export default async function BestSlugPage({ params }: BestSlugPageProps) {
  const { slug } = await params;
  const config = GUIDE_MAP[slug];

  /* Unknown slug — simple not-found state */
  if (!config) {
    return (
      <main style={{ padding: '5rem 1.5rem', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>🔍</div>
        <span className="tag tag-v" style={{ marginBottom: '.75rem' }}>Not Found</span>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', margin: '.75rem 0' }}>
          Guide not found
        </h1>
        <p style={{ color: 'var(--t2)', marginBottom: '1.5rem', fontSize: '.9rem' }}>
          This buying guide does not exist yet. Check the full list below.
        </p>
        <Link className="btn-primary" href="/best">← All buying guides</Link>
      </main>
    );
  }

  /* Fetch + filter + sort */
  let products = await getProducts(300);

  if (config.maxPrice) {
    products = products.filter((p) => {
      const price = safeNumber(p.price_eur as string | number | null);
      return price !== null && price <= config.maxPrice!;
    });
  }

  if (slug === 'best-foldable-phones') {
    products = products.filter(
      (p) =>
        p.normalized_category?.toLowerCase().includes('foldable') ||
        p.full_name?.toLowerCase().includes('fold') ||
        p.full_name?.toLowerCase().includes('flip')
    );
  }

  const ranked = sortByScore(products, config.sortKey).slice(0, 24);

  return (
    <main>
      {/* ── HERO ── */}
      <div
        className="hero-bg page-hero"
        style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}
      >
        <div className="content-shell">
          <span className="ph-eyebrow">{config.eyebrow}</span>
          <h1>{config.title}</h1>
          <p className="ph-sub">{config.description}</p>

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <div className="metric" style={{ minWidth: 100 }}>
              <div className="mv">{ranked.length}</div>
              <div className="ml">Products ranked</div>
            </div>
            <div className="metric" style={{ minWidth: 100 }}>
              <div className="mv">
                <Trophy size={18} color="#fbbf24" />
              </div>
              <div className="ml">Score-ranked</div>
            </div>
            {config.maxPrice && (
              <div className="metric" style={{ minWidth: 100 }}>
                <div className="mv">€{config.maxPrice}</div>
                <div className="ml">Max price</div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '.6rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/best" className="btn-ghost" style={{ borderRadius: 12, fontSize: '.8rem' }}>
              ← All guides
            </Link>
            <Link href="/compare" className="btn-primary" style={{ borderRadius: 12, fontSize: '.8rem' }}>
              ⚖️ Compare these phones
            </Link>
          </div>
        </div>
      </div>

      {/* ── RANKED GRID ── */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="content-shell">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '.5rem',
            }}
          >
            <div>
              <span className="tag tag-v sec-label" style={{ marginBottom: '.4rem' }}>
                {config.badge}
              </span>
              <div className="sec-title">Ranked by {config.badge} score</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--vl)' }}>
              Full catalog →
            </Link>
          </div>

          {ranked.length > 0 ? (
            <ProductGrid products={ranked} />
          ) : (
            <div
              className="glass"
              style={{ borderRadius: 20, padding: '3rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: 48, marginBottom: '1rem' }}>📱</div>
              <h2
                style={{
                  fontFamily: 'Syne,sans-serif',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  color: '#fff',
                }}
              >
                No products available yet
              </h2>
              <p style={{ color: 'var(--t2)', marginTop: '.65rem', fontSize: '.88rem' }}>
                Check back soon as new products are added to the database.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
