import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { formatPrice, getProductName, getProducts, safeNumber, scoreLabel } from '@/lib/products'

export const metadata = { title: 'Compare Smartphones', description: 'Compare smartphones side by side using AI-ready product scores.' }
export const revalidate = 3600

export default async function ComparePage() {
  const products = (await getProducts(6)).slice(0, 4)
  const winner = products[0]
  const rows = [
    ['Global score', 'global_score'],
    ['Camera', 'camera_score'],
    ['Battery', 'battery_score'],
    ['Gaming', 'gaming_score'],
    ['Performance', 'performance_score'],
    ['Value', 'value_score'],
    ['Price', 'price'],
    ['Chipset', 'chipset'],
    ['Battery size', 'battery_mah']
  ] as const

  return (
    <>
      <PageHero eyebrow="Comparison engine" title="Compare devices like an intelligence platform." text="A clean comparison page that can evolve into scoring winners, buying recommendations, and AI-generated explanations." />
      {winner ? <div className="wf-chat-card" style={{ marginBottom: 16 }}><strong><Trophy size={16} /> Current top pick: {getProductName(winner)}</strong><p>Global score {safeNumber(winner.global_score) ?? '—'} — {scoreLabel(winner.global_score)}.</p></div> : null}
      <div style={{ overflowX: 'auto' }}>
        <table className="wf-table">
          <thead>
            <tr><th>Signal</th>{products.map((p) => <th key={p.id || p.slug}>{getProductName(p)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(([label, key]) => (
              <tr key={label}>
                <td><strong>{label}</strong></td>
                {products.map((p) => {
                  const value = key === 'price' ? formatPrice(p) : key === 'battery_mah' && p[key] ? `${p[key]} mAh` : p[key]
                  const numeric = key.endsWith('_score') ? safeNumber(value as any) : null
                  return <td key={`${p.id}-${label}`}>{numeric === null ? (value || '—') : `${Math.round(numeric)} · ${scoreLabel(numeric)}`}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="wf-cta-row"><Link className="wf-btn wf-btn-primary" href="/assistant">Ask AI to choose <ArrowRight size={15} /></Link><Link className="wf-btn wf-btn-ghost" href="/products">Browse products</Link></div>
    </>
  )
}
