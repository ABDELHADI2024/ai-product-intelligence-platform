import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  const products = await getProducts(50);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Smart search</p>
        <h1 className="mt-3 text-5xl font-black text-white">Search by smartphone need</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          This first version shows all phones. Next we will add filters for camera, battery, gaming, price, and natural-language semantic search.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['best camera', 'long battery', 'gaming', 'under €500', 'best value'].map((tag) => (
            <span key={tag} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
