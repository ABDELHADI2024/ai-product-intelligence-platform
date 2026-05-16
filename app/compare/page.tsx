import Link from 'next/link';
import { GitCompare, Trophy } from 'lucide-react';
import ScoreRing from '@/components/ScoreRing';
import { formatPrice, getProducts, safeText } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = await getProducts(2);
  const [first, second] = products;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8">
          <GitCompare className="h-10 w-10 text-cyan-300" />
          <h1 className="mt-5 text-5xl font-black">Dynamic smartphone comparison.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Compare smartphones by decision value: camera, battery, display, performance, price, and AI recommendation fit.
          </p>
        </div>

        {first && second ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.55fr_1fr]">
            <ComparePhone product={first} />
            <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-8 text-center">
              <Trophy className="h-12 w-12 text-cyan-300" />
              <h2 className="mt-5 text-3xl font-black">AI verdict preview</h2>
              <p className="mt-4 text-slate-300">
                The final comparison engine will explain winners by use case, not only by raw specs.
              </p>
            </div>
            <ComparePhone product={second} />
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-slate-300">
            Add at least two smartphones to Supabase to activate comparison preview.
          </div>
        )}
      </section>
    </main>
  );
}

type ComparePhoneProps = { product: NonNullable<Awaited<ReturnType<typeof getProducts>>[number]> };

function ComparePhone({ product }: ComparePhoneProps) {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{safeText(product.brand)}</p>
          <h2 className="mt-2 text-3xl font-black">{safeText(product.full_name || product.model)}</h2>
          <p className="mt-2 text-xl font-bold text-cyan-200">{formatPrice(product.price_eur)}</p>
        </div>
        <ScoreRing score={product.global_score} />
      </div>
      <div className="mt-6 flex h-72 items-center justify-center rounded-[2rem] bg-slate-950 p-6 ring-1 ring-white/10">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={safeText(product.full_name)} className="max-h-full object-contain" />
        ) : null}
      </div>
      <div className="mt-6 grid gap-3 text-sm">
        <Row label="Display" value={product.screen_size} />
        <Row label="Chipset" value={product.chipset} />
        <Row label="Battery" value={product.battery_mah ? `${product.battery_mah} mAh` : null} />
      </div>
      <Link href={`/products/${product.slug}`} className="mt-6 block rounded-2xl bg-cyan-300 px-5 py-3 text-center font-black text-slate-950 hover:bg-white">
        View details
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex justify-between gap-4 rounded-2xl bg-slate-950/60 p-4">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-bold text-white">{safeText(value)}</span>
    </div>
  );
}
