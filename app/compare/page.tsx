import Link from 'next/link';
import MetricBox from '@/components/MetricBox';
import { getProducts, safeText } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = await getProducts(2);
  const [first, second] = products;

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-wide text-cyan-300">Dynamic comparison</p>
        <h1 className="mt-2 text-5xl font-bold text-white">Compare products</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          The first version compares the latest products from Supabase. Later this becomes a full AI comparison engine.
        </p>
      </div>

      {!first || !second ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-slate-300">
          Add at least two products to Supabase to unlock comparisons.
          <div className="mt-6">
            <Link className="text-cyan-300" href="/products">
              View products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {[first, second].map((product) => (
            <div key={product.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-3xl font-bold text-white">{safeText(product.full_name)}</h2>
              <p className="mt-2 text-slate-300">{safeText(product.content_summary_en)}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricBox label="Screen" value={product.screen_size} />
                <MetricBox label="Chipset" value={product.chipset} />
                <MetricBox label="Battery" value={product.battery_mah ? `${product.battery_mah}mAh` : null} />
                <MetricBox label="Global score" value={product.global_score} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
