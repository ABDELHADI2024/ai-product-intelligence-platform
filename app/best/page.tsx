import SEOTopicCard from '@/components/SEOTopicCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Best Smartphones Guides | Witflag AI',
  description: 'Explore AI-ranked smartphone buying guides for camera, battery, gaming, value, and budget decisions.',
};

const topics = [
  ['Camera',   '/best/best-camera-phones',    'Best camera phones',          'Smartphones ranked by camera score, image potential, display quality, and global product intelligence.'],
  ['Battery',  '/best/best-battery-phones',   'Best battery phones',         'Find smartphones with strong battery scores, endurance potential, and daily reliability signals.'],
  ['Gaming',   '/best/best-gaming-phones',    'Best gaming phones',          'Performance-first smartphones ranked by gaming score, chipset signals, display, and battery balance.'],
  ['Value',    '/best/best-value-phones',     'Best value phones',           'Smartphones that balance price, global score, and practical everyday strengths.'],
  ['Budget',   '/best/best-phones-under-500', 'Best phones under €500',      'AI-ranked smartphones focused on strong value and practical specs under a mid-range budget.'],
  ['Foldable', '/best/best-foldable-phones',  'Best foldable phones',        'Foldable smartphones ranked by global score and product intelligence signals.'],
] as const;

export default function BestGuidesPage() {
  return (
    <main>
      {/* Hero */}
      <div className="hero-bg page-hero" style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}>
        <div className="content-shell">
          <span className="ph-eyebrow">SEO Intelligence Pages</span>
          <h1>Best smartphone guides powered<br />by product intelligence.</h1>
          <p className="ph-sub">
            These pages transform your product database into Google-friendly buying guides ranked by Witflag scores.
          </p>
        </div>
      </div>

      {/* Cards */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="content-shell" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.85rem' }}>
          {topics.map(([badge, href, title, description]) => (
            <SEOTopicCard key={href} href={href} title={title} description={description} badge={badge} />
          ))}
        </div>
      </section>
    </main>
  );
}
