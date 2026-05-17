import CompareTable from '@/components/CompareTable';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = (await getProducts(4)).slice(0, 4);

  return (
    <main className="min-h-screen px-5 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Dynamic comparison</p>
          <h1 className="mt-3 text-5xl font-black">Compare smartphones side by side.</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Compare top smartphones by score, price, display, performance, battery, camera, and value. The next version will allow manual selection and SEO comparison URLs.
          </p>
        </div>

        <div className="mt-8">
          <CompareTable products={products} />
        </div>

        <div className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/5 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">AI verdict preview</p>
          <h2 className="mt-3 text-3xl font-black">Comparison intelligence is the next big layer.</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Witflag will calculate category winners for camera, battery, gaming, display, value, and final recommendation by buyer persona.
          </p>
        </div>
      </section>
    </main>
  );
}
