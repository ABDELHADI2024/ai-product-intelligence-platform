import CompareTable from '@/components/CompareTable';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const products = await getProducts(12);
  const compareProducts = products.slice(0, 4);

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Dynamic comparison</span>
        <h1>Compare smartphones side by side</h1>
        <p>Start with the top AI-scored smartphones. Later, users will be able to select any 2–4 products.</p>
      </section>

      <section className="section-shell">
        <CompareTable products={compareProducts} />
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Add more</span>
            <h2>Popular smartphones</h2>
          </div>
        </div>
        <ProductGrid products={products.slice(4, 12)} />
      </section>
    </main>
  );
}
