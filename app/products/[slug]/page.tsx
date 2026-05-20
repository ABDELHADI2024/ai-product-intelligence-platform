import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, formatScore, getProductBySlug, getProductName, safeText, splitList } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductDetailProps = { params: Promise<{ slug: string }> };

function SpecBox({ label, value }: { label: string; value?: string | number | null }) {
  return <div className="spec-box"><div className="spec-label">{label}</div><div className="spec-value">{safeText(value, 'Coming soon')}</div></div>;
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const name = product ? getProductName(product) : 'Smartphone';
  return { title: `${name} | Witflag AI`, description: product?.content_summary_en || `AI product intelligence page for ${name}.` };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const name = getProductName(product);
  const pros = splitList(product.pros_en);
  const cons = splitList(product.cons_en);

  const scores = [
    ['Camera', product.camera_score], ['Battery', product.battery_score], ['Display', product.display_score], ['Gaming', product.gaming_score], ['Value', product.value_score],
  ];

  return (
    <main className="surface-bg">
      <section className="detail-hero content-shell">
        <div className="breadcrumb"><Link href="/products">Products</Link><span className="bc-sep">/</span><span>{name}</span></div>
        <div className="detail-grid mt-6">
          <div className="detail-media">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={name} />
            ) : <div className="text-slate-600">No image</div>}
          </div>
          <div className="detail-info">
            <p className="ph-eyebrow">{safeText(product.brand, 'Smartphone')}</p>
            <h1 className="detail-title">{name}</h1>
            <div className="detail-price">{formatPrice(product)}</div>
            <p className="detail-summary">{safeText(product.content_summary_en, 'AI-ready smartphone profile prepared for search, comparison and recommendations.')}</p>
            <div className="mt-6 flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <ScoreRing value={product.global_score} size="lg" />
              <div><p className="text-sm uppercase tracking-[.24em] text-violet-300">Global AI Score</p><p className="mt-1 text-2xl font-black">{formatScore(product.global_score)}</p></div>
            </div>
            <div className="detail-specs">
              <SpecBox label="Display" value={product.screen_size} />
              <SpecBox label="Chipset" value={product.chipset} />
              <SpecBox label="Battery" value={product.battery_mah ? `${product.battery_mah} mAh` : null} />
              <SpecBox label="Storage" value={product.storage || product.ram} />
            </div>
          </div>
        </div>
      </section>

      <section className="section content-shell">
        <div className="section-head"><div><p className="ph-eyebrow">Score breakdown</p><h2 className="section-title">Decision signals.</h2></div></div>
        <div className="feature-grid">
          {scores.map(([label, value]) => <div key={label as string} className="feature-card"><ScoreRing value={value} label={label as string} /><h3 className="mt-4 font-bold">{label}</h3></div>)}
        </div>
      </section>

      <section className="section content-shell">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass p-6"><h2 className="text-2xl font-black">Pros</h2><ul className="mt-4 grid gap-3 text-slate-300">{(pros.length ? pros : ['Strong product intelligence profile']).map((p) => <li key={p}>✓ {p}</li>)}</ul></div>
          <div className="glass p-6"><h2 className="text-2xl font-black">Cons</h2><ul className="mt-4 grid gap-3 text-slate-300">{(cons.length ? cons : ['More benchmark validation may be needed']).map((c) => <li key={c}>• {c}</li>)}</ul></div>
        </div>
      </section>
    </main>
  );
}
