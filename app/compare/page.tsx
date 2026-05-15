import Link from 'next/link';
import { getProducts, formatPrice, formatScore, safeText } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = (await getProducts(4)).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Dynamic comparison</p>
        <h1 className="mt-3 text-5xl font-black text-white">Compare smartphones</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          First version: side-by-side intelligence table from Supabase scores. Later: user-selected comparison and AI verdict.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="p-4">Metric</th>
              {products.map((product) => (
                <th key={product.id} className="min-w-44 p-4">
                  <Link href={`/products/${product.slug}`} className="text-white hover:text-cyan-200">
                    {safeText(product.full_name, product.model || 'Smartphone')}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {[
              ['Price', ...products.map((p) => formatPrice(p.price_eur))],
              ['Global score', ...products.map((p) => formatScore(p.global_score))],
              ['Camera score', ...products.map((p) => formatScore(p.camera_score))],
              ['Battery score', ...products.map((p) => formatScore(p.battery_score))],
              ['Gaming score', ...products.map((p) => formatScore(p.gaming_score))],
              ['Display', ...products.map((p) => safeText(p.screen_size))],
              ['Chipset', ...products.map((p) => safeText(p.chipset))],
              ['Battery', ...products.map((p) => safeText(p.battery_mah))],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-white/5 last:border-0">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className={index === 0 ? 'p-4 font-semibold text-white' : 'p-4'}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
