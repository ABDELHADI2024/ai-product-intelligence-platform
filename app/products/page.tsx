import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { getProducts } from '@/lib/products';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

const categories = [
  { label: 'All Smartphones', value: 'all' },
  { label: 'Smartphones', value: 'smartphones' },
  { label: 'Foldables', value: 'foldable-smartphones' },
];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const allProducts = await getProducts(300);
  const products =
    category && category !== 'all'
      ? allProducts.filter((p) => p.normalized_category === category)
      : allProducts;

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Smartphone Catalog</span>
        <h1>Browse {allProducts.length}+ AI-scored smartphones</h1>
        <p>
          Every product is scored across 5 AI signals. Filter, sort and find your ideal device.
        </p>
        <SearchBar placeholder="Search brand, model, chipset..." />
      </section>

      <section className="catalog-layout">
        <aside className="sidebar-card">
          <h3>Categories</h3>
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === 'all' ? '/products' : `/products?category=${cat.value}`}
              className={`sidebar-link ${(!category && cat.value === 'all') || category === cat.value ? 'active' : ''}`}
            >
              {cat.label}
              <span className="sidebar-count">
                {cat.value === 'all'
                  ? allProducts.length
                  : allProducts.filter((p) => p.normalized_category === cat.value).length}
              </span>
            </Link>
          ))}

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <h3>Quick Picks</h3>
            {[
              ['Best Camera', '/assistant?use=camera'],
              ['Best Battery', '/assistant?use=battery'],
              ['Best Value', '/assistant?use=value'],
              ['Best Gaming', '/assistant?use=gaming'],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="sidebar-link">
                {label}
              </Link>
            ))}
          </div>
        </aside>

        <div>
          <div className="catalog-toolbar">
            <span className="catalog-count">
              Showing <strong>{products.length}</strong> smartphones · Sorted by AI Score
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {categories.slice(1).map((cat) => (
                <Link
                  key={cat.value}
                  href={`/products?category=${cat.value}`}
                  className={`filter-chip ${category === cat.value ? 'active' : ''}`}
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/products"
                className={`filter-chip ${!category || category === 'all' ? 'active' : ''}`}
              >
                All
              </Link>
            </div>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
