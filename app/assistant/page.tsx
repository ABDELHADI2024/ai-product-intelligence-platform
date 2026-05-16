import Link from 'next/link';
import { BatteryCharging, Camera, Gamepad2, Sparkles, WalletCards } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

const questions = [
  { icon: WalletCards, title: 'Budget', text: 'Under €300, €300–€500, €500–€800, or premium?' },
  { icon: Camera, title: 'Camera priority', text: 'Photos, video, selfie, social media, or balanced use?' },
  { icon: BatteryCharging, title: 'Battery life', text: 'Daily use, travel, gaming, or heavy multitasking?' },
  { icon: Gamepad2, title: 'Performance', text: 'Casual apps, gaming, creator use, or long-term speed?' },
];

export default async function AssistantPage() {
  const products = await getProducts(6);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/[0.05] p-8 shadow-2xl shadow-black/20">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
              <Sparkles className="h-4 w-4" /> No-cost guided assistant MVP
            </div>
            <h1 className="mt-6 text-5xl font-black">AI Buyer Assistant.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              This is the first version of the Witflag assistant: a guided decision flow that will recommend smartphones using your Supabase scores and product intelligence.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/products" className="rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 hover:bg-white">
                Browse recommendations
              </Link>
              <Link href="/compare" className="rounded-2xl border border-white/10 px-6 py-4 font-bold hover:border-cyan-300/40">
                Compare phones
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {questions.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <item.icon className="h-8 w-8 text-cyan-300" />
                <h2 className="mt-5 text-2xl font-black">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Current recommendation pool</p>
            <h2 className="mt-2 text-4xl font-black">Smartphones ready for guided advice.</h2>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
