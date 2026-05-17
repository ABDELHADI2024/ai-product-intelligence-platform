import CompareTable from '@/components/CompareTable';
import ComparisonProductPicker from '@/components/ComparisonProductPicker';
import { getProducts, getProductsBySlugs, getProductName } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ComparePageProps = {
  searchParams?: Promise<{
    phones?: string;
  }>;
};

function parseSelectedSlugs(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedSlugs = parseSelectedSlugs(resolvedSearchParams.phones);

  const [popularProducts, selectedProducts] = await Promise.all([
    getProducts(24),
    selectedSlugs.length ? getProductsBySlugs(selectedSlugs) : Promise.resolve([]),
  ]);

  const productsForComparison =
    selectedProducts.length >= 2 ? selectedProducts : popularProducts.slice(0, 3);

  const activeSlugs =
    selectedProducts.length >= 2
      ? selectedProducts.map((product) => product.slug || '').filter(Boolean)
      : productsForComparison.map((product) => product.slug || '').filter(Boolean);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
            Dynamic comparison engine
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            Compare smartphones with score-based intelligence.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Select up to four smartphones and Witflag will compare global,
            camera, battery, gaming, display, and value scores with a clear
            verdict.
          </p>

          <div className="mt-8 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <p className="text-sm text-slate-300">
              Current comparison:{' '}
              <span className="font-semibold text-cyan-200">
                {productsForComparison.map(getProductName).join(' vs ')}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
              Select smartphones
            </p>
            <h2 className="mt-2 text-3xl font-bold">Choose up to four products</h2>
          </div>
          <p className="text-sm text-slate-400">
            Tip: click a product card to add or remove it from the comparison.
          </p>
        </div>

        <ComparisonProductPicker
          products={popularProducts}
          selectedSlugs={activeSlugs}
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <CompareTable products={productsForComparison} />
      </section>
    </main>
  );
}
