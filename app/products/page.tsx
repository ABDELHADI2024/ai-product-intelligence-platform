import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts(60);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <p className="text-sm uppercase tracking-wide text-cyan-300">Product database</p>
      <h1 className="mt-2 text-4xl font-bold text-white">All products</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Products are loaded from Supabase when environment variables are configured. Otherwise, a demo product appears so the website always works.
      </p>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
