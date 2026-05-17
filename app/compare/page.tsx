import Link from 'next/link';
import { GitCompare } from 'lucide-react';
import { getProducts, safeText, formatScore, formatPrice } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams?: Promise<{ a?: string; b?: string }>;
};

export default async function ComparePage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const products = await getProducts(80);
  const selectedA = products.find((p) => p.slug === params.a) || products[0];
  const selectedB = products.find((p) => p.slug === params.b) || products[1] || products[0];
  const selected = [selectedA, selectedB].filter(Boolean);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 card-glow">
        <div className="flex items-center gap-3 text-cyan-300">
          <GitCompare className="h-7 w-7" />
          <p className="text-sm font-bold uppercase tracking-[0.28em]">Comparison engine</p>
        </div>
        <h1 className="mt-5 text-5xl font-black text-white">Compare smartphones by intelligence signals</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          First version: compare two smartphones by price, core specs and AI-ready scores. Later: SEO comparison pages and AI verdicts.
        </p>
      </section>

      <form className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 md:grid-cols-[1fr_1fr_auto]">
        <select name="a" defaultValue={selectedA?.slug || ''} className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white">
          {products.map((product) => <option key={product.id} value={product.slug || ''}>{product.full_name}</option>)}
        </select>
        <select name="b" defaultValue={selectedB?.slug || ''} className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white">
          {products.map((product) => <option key={product.id} value={product.slug || ''}>{product.full_name}</option>)}
        </select>
        <button className="rounded-2xl bg-cyan-300 px-6 font-black text-slate-950 hover:bg-white">Compare</button>
      </form>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {selected.map((product) => (
          <div key={product.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-start gap-5">
              <div className="flex h-36 w-32 shrink-0 items-center justify-center rounded-3xl bg-slate-950 p-4">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={safeText(product.full_name, 'Product')} className="max-h-full object-contain" />
                ) : null}
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{product.full_name}</h2>
                <p className="mt-2 text-cyan-300">{formatPrice(product.price_eur)}</p>
                <Link href={`/products/${product.slug}`} className="mt-3 inline-block text-sm font-bold text-cyan-300 hover:text-white">View profile →</Link>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                ['Global', formatScore(product.global_score)],
                ['Camera', formatScore(product.camera_score)],
                ['Battery', formatScore(product.battery_score)],
                ['Gaming', formatScore(product.gaming_score)],
                ['Display', formatScore(product.display_score)],
                ['Value', formatScore(product.value_score)],
                ['Screen', safeText(product.screen_size)],
                ['Chipset', safeText(product.chipset)],
                ['Battery capacity', product.battery_mah ? `${product.battery_mah}mAh` : 'Coming soon'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between rounded-2xl bg-white/[0.04] p-4 text-sm">
                  <span className="text-slate-400">{label}</span>
                  <span className="max-w-[60%] text-right font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
