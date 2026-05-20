import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Best Smartphones Guides | Witflag AI' };

const topics = [
  ['Camera', '/best/best-camera-phones', 'Best camera phones', 'Smartphones ranked by camera score and global intelligence.'],
  ['Battery', '/best/best-battery-phones', 'Best battery phones', 'Strong battery scores and daily reliability.'],
  ['Gaming', '/best/best-gaming-phones', 'Best gaming phones', 'Performance, display and battery balance.'],
  ['Value', '/best/best-value-phones', 'Best value phones', 'Best balance between price and experience.'],
  ['Budget', '/best/best-phones-under-500', 'Best phones under €500', 'Great phones for a mid-range budget.'],
  ['Foldable', '/best/best-foldable-phones', 'Best foldable phones', 'Foldables ranked by product intelligence.'],
];

export default function BestPage() {
  return <main className="surface-bg"><section className="page-hero"><div className="content-shell"><p className="ph-eyebrow">SEO intelligence pages</p><h1 className="ph-title">Best smartphone guides powered by product intelligence.</h1><p className="ph-sub">Google-friendly buying guides generated from your smartphone database.</p></div></section><section className="section content-shell"><div className="feature-grid">{topics.map(([badge, href, title, desc]) => <Link href={href} key={href} className="feature-card"><p className="ph-eyebrow">{badge}</p><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p></Link>)}</div></section></main>;
}
