import { getProducts, safeText, formatScore, formatPrice } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = await getProducts(4);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Comparison engine preview</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Compare smartphones</h1>
        <p className="mt-4 max-w-2xl text-slate-300">This page will become the dynamic comparison system. For now, it previews how Supabase product records can be compared.</p>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045]">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.05] text-slate-300">
              <tr>
                <th className="p-4">Metric</th>
                {products.map((product) => <th key={product.id} className="p-4">{safeText(product.model || product.full_name)}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-300">
              {[
                ['Price', (p: typeof products[number]) => formatPrice(p.price_eur)],
                ['Global score', (p: typeof products[number]) => formatScore(p.global_score)],
                ['Camera score', (p: typeof products[number]) => formatScore(p.camera_score)],
                ['Battery score', (p: typeof products[number]) => formatScore(p.battery_score)],
                ['Display', (p: typeof products[number]) => safeText(p.screen_size)],
                ['Chipset', (p: typeof products[number]) => safeText(p.chipset)],
                ['Battery', (p: typeof products[number]) => p.battery_mah ? `${p.battery_mah}mAh` : 'Pending'],
              ].map(([label, getter]) => (
                <tr key={String(label)}>
                  <td className="p-4 font-semibold text-white">{String(label)}</td>
                  {products.map((product) => <td key={product.id} className="p-4">{(getter as (p: typeof product) => string)(product)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
