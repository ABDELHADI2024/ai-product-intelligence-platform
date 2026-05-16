import ProductGrid from '@/components/ProductGrid';
import { Brain, Search } from 'lucide-react';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  const products = await getProducts(50);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8">
            <Search className="h-10 w-10 text-cyan-300" />
            <h1 className="mt-5 text-5xl font-black">Smartphone search.</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              This page is ready for semantic search. For now, it displays the live Supabase smartphone catalog. Next, we will connect natural-language filtering by budget, battery, camera, and gaming priorities.
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-8">
            <Brain className="h-10 w-10 text-cyan-300" />
            <h2 className="mt-5 text-3xl font-black">Future query examples</h2>
            <div className="mt-5 space-y-3 text-slate-300">
              <p className="rounded-2xl bg-slate-950/50 p-4">“Best smartphone for camera and battery under €500”</p>
              <p className="rounded-2xl bg-slate-950/50 p-4">“Good phone for TikTok, WhatsApp, and travel”</p>
              <p className="rounded-2xl bg-slate-950/50 p-4">“Compare gaming phones with strong battery life”</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
