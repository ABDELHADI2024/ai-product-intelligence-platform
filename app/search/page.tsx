import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductName, safeText, searchProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type SearchPageProps = { searchParams?: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = searchParams ? await searchParams : {};
  const q = sp.q || '';
  const results = await searchProducts(q, 48);

  return (
    <main className="surface-bg">
      <section className="page-hero"><div className="content-shell"><p className="ph-eyebrow">Smart search</p><h1 className="ph-title">Search smartphones by need, not only by name.</h1><p className="ph-sub">Try queries like “best camera phone under 500”, “Xiaomi gaming”, or “battery phone”.</p><SearchBar defaultValue={q} size="large" /></div></section>
      <section className="section content-shell">
        <div className="section-head"><div><p className="ph-eyebrow">{results.length} results</p><h2 className="section-title">{q ? `Results for “${q}”` : 'Top smartphone results'}</h2></div></div>
        <div className="list-grid">
          {results.map((p, index) => (
            <article key={p.id} className="list-card">
              <div className="list-img">{p.image_url ? <img src={p.image_url} alt={getProductName(p)} /> : <span>No image</span>}</div>
              <div><p className="pcard-brand">#{index + 1} · {safeText(p.brand, 'Smartphone')}</p><h3 className="text-2xl font-black mt-2">{getProductName(p)}</h3><p className="mt-2 text-slate-400 line-clamp-2">{safeText(p.content_summary_en, 'Matched by Witflag product intelligence.')}</p><p className="mt-3 font-bold text-violet-200">{formatPrice(p)}</p><div className="mt-4 flex gap-3">{p.slug ? <Link className="btn-primary" href={`/products/${p.slug}`}>View</Link> : null}<Link className="btn-ghost" href={`/compare?phones=${p.slug || ''}`}>Compare</Link></div></div>
              <ScoreRing value={p.global_score} size="md" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
