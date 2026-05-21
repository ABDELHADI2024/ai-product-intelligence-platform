import Link from 'next/link';
import { getDebugProductsSample, getProductName, formatScore } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function DebugDataPage() {
  const debug = await getDebugProductsSample();

  return (
    <main className="min-h-screen bg-[#020617] px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-cyan-300">
          ← Back home
        </Link>

        <h1 className="mt-8 text-4xl font-black">Witflag data debug</h1>
        <p className="mt-3 text-slate-400">
          This page checks whether Vercel can read your Supabase products table.
          It does not display any secret key value.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm text-slate-400">Supabase URL env</p>
            <p className="mt-2 text-2xl font-bold">
              {debug.status.hasUrl ? 'Present ✅' : 'Missing ❌'}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm text-slate-400">Supabase anon key env</p>
            <p className="mt-2 text-2xl font-bold">
              {debug.status.hasAnonKey ? 'Present ✅' : 'Missing ❌'}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm text-slate-400">Products visible to Vercel</p>
            <p className="mt-2 text-2xl font-bold">{debug.count}</p>
          </div>
        </section>

        {debug.error ? (
          <div className="mt-6 rounded-3xl border border-red-400/20 bg-red-400/10 p-5 text-red-100">
            <p className="font-bold">Supabase error</p>
            <p className="mt-2 text-sm">{debug.error}</p>
          </div>
        ) : null}

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
          <h2 className="text-2xl font-bold">Top sample products</h2>

          <div className="mt-5 space-y-3">
            {debug.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div>
                  <p className="font-semibold">{getProductName(product)}</p>
                  <p className="text-sm text-slate-400">
                    {product.slug} · {product.normalized_category}
                  </p>
                </div>
                <p className="font-bold text-cyan-200">
                  {formatScore(product.global_score)}
                </p>
              </div>
            ))}

            {debug.products.length === 0 ? (
              <p className="text-slate-400">No products returned.</p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
