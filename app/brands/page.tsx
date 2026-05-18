import Link from 'next/link';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Smartphone Brands | Witflag AI',
  description: 'Browse smartphone brands ranked by product count and AI product intelligence data.',
};

function slugifyBrand(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function BrandsPage() {
  const products = await getProducts(300);
  const brandCounts = new Map<string, number>();

  products.forEach((product) => {
    if (!product.brand) return;
    brandCounts.set(product.brand, (brandCounts.get(product.brand) || 0) + 1);
  });

  const brands = Array.from(brandCounts.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.22),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
            Brand intelligence
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            Explore smartphone brands.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Brand pages help users and search engines explore your smartphone database by manufacturer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {brands.map(({ brand, count }) => (
            <Link
              key={brand}
              href={`/brands/${slugifyBrand(brand)}`}
              className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Brand</p>
              <h2 className="mt-4 text-3xl font-black text-white">{brand}</h2>
              <p className="mt-3 text-slate-400">{count} smartphones</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
