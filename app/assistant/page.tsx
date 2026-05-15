import Link from 'next/link';
import { Bot, Camera, BatteryCharging, Gamepad2, BadgeEuro } from 'lucide-react';
import AssistantQuestionCard from '@/components/AssistantQuestionCard';
import RecommendationCard from '@/components/RecommendationCard';
import { getProducts, safeNumber } from '@/lib/products';

export const dynamic = 'force-dynamic';

function sortByScore(products: Awaited<ReturnType<typeof getProducts>>, key: 'camera_score' | 'battery_score' | 'gaming_score' | 'value_score' | 'global_score') {
  return [...products].sort((a, b) => safeNumber(b[key]) - safeNumber(a[key]));
}

export default async function AssistantPage() {
  const products = await getProducts(20);
  const bestOverall = sortByScore(products, 'global_score').slice(0, 3);
  const bestCamera = sortByScore(products, 'camera_score')[0];
  const bestBattery = sortByScore(products, 'battery_score')[0];
  const bestGaming = sortByScore(products, 'gaming_score')[0];
  const bestValue = sortByScore(products, 'value_score')[0];

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Bot className="h-4 w-4" />
              Witflag AI Buyer Assistant
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
              Find the right smartphone without confusion.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This first assistant version uses your Supabase product scores to guide buyers by camera, battery, gaming, value, and overall fit. Later it can become a full RAG assistant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950">
                Browse smartphones
              </Link>
              <Link href="/compare" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white">
                Compare phones
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/20">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Assistant flow</p>
            <div className="mt-6 space-y-4">
              <AssistantQuestionCard
                title="1. What is your budget?"
                description="The assistant starts by filtering realistic options."
                options={['Under €300', '€300–€500', '€500–€800', 'Premium']}
              />
              <AssistantQuestionCard
                title="2. What matters most?"
                description="It then ranks phones by the buyer's real need."
                options={['Camera', 'Battery', 'Gaming', 'Value', 'Balanced']}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <Camera className="h-6 w-6 text-cyan-300" />
            <p className="mt-4 text-sm text-slate-400">Best camera</p>
            <p className="mt-1 font-semibold text-white">{bestCamera?.full_name || 'Coming soon'}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <BatteryCharging className="h-6 w-6 text-green-300" />
            <p className="mt-4 text-sm text-slate-400">Best battery</p>
            <p className="mt-1 font-semibold text-white">{bestBattery?.full_name || 'Coming soon'}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <Gamepad2 className="h-6 w-6 text-purple-300" />
            <p className="mt-4 text-sm text-slate-400">Best gaming</p>
            <p className="mt-1 font-semibold text-white">{bestGaming?.full_name || 'Coming soon'}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <BadgeEuro className="h-6 w-6 text-yellow-300" />
            <p className="mt-4 text-sm text-slate-400">Best value</p>
            <p className="mt-1 font-semibold text-white">{bestValue?.full_name || 'Coming soon'}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Recommended now</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Top smartphone matches</h2>
          </div>
          <Link href="/products" className="text-sm text-cyan-200">View all</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {bestOverall.map((product, index) => (
            <RecommendationCard
              key={product.id}
              product={product}
              rank={index + 1}
              reason="Strong overall match based on global score, value, battery, display, and camera profile."
            />
          ))}
        </div>
      </section>
    </main>
  );
}
