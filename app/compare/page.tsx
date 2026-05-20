import Link from 'next/link';
import { GitCompare, Sparkles, Trophy } from 'lucide-react';
import BentoGrid from '@/components/BentoGrid';
import CompareScoreRadar from '@/components/CompareScoreRadar';
import ProductCard from '@/components/ProductCard';
import { getProductName, getProducts, safeNumber, safeText, type Product } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ComparePageProps = {
  searchParams?: Promise<{ phones?: string }>;
};

const scoreRows: { key: keyof Product; label: string }[] = [
  { key: 'global_score', label: 'Global AI score' },
  { key: 'camera_score', label: 'Camera' },
  { key: 'battery_score', label: 'Battery' },
  { key: 'display_score', label: 'Display' },
  { key: 'gaming_score', label: 'Gaming' },
  { key: 'value_score', label: 'Value' },
];

function selectProducts(products: Product[], phones?: string) {
  const slugs = (phones || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (!slugs.length) return products.slice(0, 3);
  const selected = slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean) as Product[];
  return selected.length ? selected.slice(0, 4) : products.slice(0, 3);
}

function winner(products: Product[], key: keyof Product) {
  return [...products].sort((a, b) => (safeNumber(b[key]) || 0) - (safeNumber(a[key]) || 0))[0];
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const sp = searchParams ? await searchParams : {};
  const products = await getProducts(300);
  const selected = selectProducts(products, sp.phones);
  const bestOverall = winner(selected, 'global_score');

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_34%)]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
            <GitCompare className="h-4 w-4" />
            Smartphone comparison
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            Compare phones with visual intelligence.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Compare real products from your Supabase database using score bars, AI-style verdicts, and side-by-side decision signals.
          </p>
          <div className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Current verdict</p>
                <p className="mt-2 text-xl font-bold">
                  {bestOverall ? `${getProductName(bestOverall)} is currently the strongest overall pick.` : 'Select phones to compare.'}
                </p>
              </div>
              <Link href="/products" className="rounded-full bg-cyan-400 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:bg-cyan-300">
                Add phones
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <BentoGrid>
          {selected.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </BentoGrid>

        <div className="mt-10">
          <CompareScoreRadar products={selected} />
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/25">
          <div className="border-b border-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Score matrix</p>
            <h2 className="mt-2 text-3xl font-black">Side-by-side details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-4 text-left text-sm text-slate-400">Signal</th>
                  {selected.map((product) => (
                    <th key={product.id} className="p-4 text-left text-sm text-white">{getProductName(product)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scoreRows.map((row) => {
                  const rowWinner = winner(selected, row.key);
                  return (
                    <tr key={row.label} className="border-b border-white/10 last:border-0">
                      <td className="p-4 font-bold text-cyan-200">{row.label}</td>
                      {selected.map((product) => {
                        const isWinner = rowWinner?.id === product.id;
                        return (
                          <td key={product.id} className="p-4">
                            <div className={`rounded-2xl border px-4 py-3 ${isWinner ? 'border-cyan-300/40 bg-cyan-300/10' : 'border-white/10 bg-white/[0.03]'}`}>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xl font-black">{safeText(product[row.key], '—')}</span>
                                {isWinner ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-300/10 px-2 py-1 text-xs font-bold text-cyan-200">
                                    <Trophy className="h-3 w-3" />
                                    Winner
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-cyan-300" />
            <div>
              <p className="font-bold text-white">Next AI layer</p>
              <p className="mt-1 text-sm text-slate-400">Later, the RAG chatbot will explain this comparison in natural language.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
