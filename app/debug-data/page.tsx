import PageHero from '@/components/PageHero'
import { getProducts, getProductName, safeNumber } from '@/lib/products'

export const metadata = { title: 'Debug Data', description: 'Supabase data debug page for Witflag.' }
export const revalidate = 0

export default async function DebugDataPage() {
  const products = await getProducts(20)
  return (
    <>
      <PageHero eyebrow="Data health" title="Supabase product data debug." text="Use this internal page to confirm product count, score availability, and basic data quality before deploying new UI changes." />
      <table className="wf-table">
        <thead><tr><th>Product</th><th>Brand</th><th>Slug</th><th>Global score</th></tr></thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id || product.slug || index}>
              <td>{getProductName(product)}</td>
              <td>{product.brand || '—'}</td>
              <td>{product.slug || '—'}</td>
              <td>{safeNumber(product.global_score) ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
