import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const allProducts = await getProducts(120);
  const products =
    category && category !== 'all'
      ? allProducts.filter((product) => product.normalized_category === category)
      : allProducts;

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Smartphone catalog</span>
        <h1>Browse and compare the best AI-scored smartphones</h1>
        <p>Explore live smartphone records from Supabase with scores, images, summaries and comparison-ready specs.</p>
        <SearchBar />
      </section>

      <section className="catalog-layout">
        <aside className="sidebar-card">
          <h3>Categories</h3>
          <a href="/products">All smartphones</a>
          <a href="/products?category=smartphones">Smartphones</a>
          <a href="/products?category=foldable-smartphones">Foldable smartphones</a>
          <div className="sidebar-note">More categories can be activated later.</div>
        </aside>

        <div>
          <div className="catalog-toolbar">
            <span>{products.length} products</span>
            <span>Sorted by AI score</span>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
