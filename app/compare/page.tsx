import Link from 'next/link';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProductName, getProducts, getProductsBySlugs, safeText } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ComparePageProps = { searchParams?: Promise<{ phones?: string }> };

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const sp = searchParams ? await searchParams : {};
  const slugs = (sp.phones || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);
  const selected = slugs.length ? await getProductsBySlugs(slugs) : (await getProducts(4));
  const rows = [
    ['Price', (p: any) => formatPrice(p)], ['Global', (p: any) => safeText(p.global_score, '—')], ['Camera', (p: any) => safeText(p.camera_score, '—')], ['Battery', (p: any) => safeText(p.battery_score, '—')], ['Display', (p: any) => safeText(p.display_score, '—')], ['Gaming', (p: any) => safeText(p.gaming_score, '—')], ['Value', (p: any) => safeText(p.value_score, '—')], ['Chipset', (p: any) => safeText(p.chipset, '—')], ['Battery mAh', (p: any) => safeText(p.battery_mah, '—')]
  ] as const;

  return (
    <main className="surface-bg">
      <section className="page-hero"><div className="content-shell"><p className="ph-eyebrow">Dynamic comparison</p><h1 className="ph-title">Compare smartphones side by side.</h1><p className="ph-sub">Compare global score, camera, battery, gaming, value, specs and price.</p></div></section>
      <section className="section content-shell">
        <div className="grid gap-4 md:grid-cols-4">{selected.map(p => <div key={p.id} className="glass p-5 text-center">{p.image_url ? <img src={p.image_url} alt={getProductName(p)} className="mx-auto h-40 object-contain" /> : null}<h3 className="mt-4 font-black">{getProductName(p)}</h3><div className="mt-4 flex justify-center"><ScoreRing value={p.global_score} /></div>{p.slug ? <Link className="btn-primary mt-4" href={`/products/${p.slug}`}>View</Link> : null}</div>)}</div>
        <div className="glass mt-6 overflow-x-auto p-4"><table className="w-full min-w-[720px] text-sm"><tbody>{rows.map(([label, fn]) => <tr key={label} className="border-b border-white/10"><th className="py-4 pr-4 text-left text-slate-400">{label}</th>{selected.map(p => <td key={p.id + label} className="px-4 py-4 font-semibold">{fn(p)}</td>)}</tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
