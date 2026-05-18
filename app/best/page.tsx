import SEOTopicCard from '@/components/SEOTopicCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Best Smartphones Guides | Witflag AI',
  description: 'Explore AI-ranked smartphone buying guides for camera, battery, gaming, value, and budget decisions.',
};

const topics = [
  ['Camera', '/best/best-camera-phones', 'Best camera phones', 'Smartphones ranked by camera score, image potential, display quality, and global product intelligence.'],
  ['Battery', '/best/best-battery-phones', 'Best battery phones', 'Find smartphones with strong battery scores, endurance potential, and daily reliability signals.'],
  ['Gaming', '/best/best-gaming-phones', 'Best gaming phones', 'Performance-first smartphones ranked by gaming score, chipset signals, display, and battery balance.'],
  ['Value', '/best/best-value-phones', 'Best value phones', 'Smartphones that balance price, global score, and practical everyday strengths.'],
  ['Budget', '/best/best-phones-under-500', 'Best phones under €500', 'AI-ranked smartphones focused on strong value and practical specs under a mid-range budget.'],
  ['Foldable', '/best/best-foldable-phones', 'Best foldable phones', 'Foldable smartphones ranked by global score and product intelligence signals.'],
] as const;

export default function BestGuidesPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.22),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
            SEO intelligence pages
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            Best smartphone guides powered by product intelligence.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            These pages transform your product database into Google-friendly buying guides ranked by Witflag scores.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map(([badge, href, title, description]) => (
            <SEOTopicCard key={href} href={href} title={title} description={description} badge={badge} />
          ))}
        </div>
      </section>
    </main>
  );
}
