'use client'

import { useMemo, useState } from 'react'
import { formatPrice, getProductName, Product, safeNumber } from '@/lib/products'

const rows: { key: keyof Product; label: string }[] = [
  { key: 'global_score', label: 'Global Score' },
  { key: 'camera_score', label: 'Camera' },
  { key: 'battery_score', label: 'Battery' },
  { key: 'display_score', label: 'Display' },
  { key: 'gaming_score', label: 'Gaming' },
  { key: 'value_score', label: 'Value' }
]

export default function CompareClient({ products }: { products: Product[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(products.slice(0, 2).map((p, i) => String(p.id || p.slug || i)))

  const selected = useMemo(() => {
    return selectedIds
      .map((id) => products.find((p, i) => String(p.id || p.slug || i) === id))
      .filter(Boolean) as Product[]
  }, [products, selectedIds])

  function toggle(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      if (current.length >= 4) return current
      return [...current, id]
    })
  }

  return (
    <div>
      <div className="product-list" style={{ marginBottom: 22 }}>
        {products.slice(0, 8).map((product, index) => {
          const id = String(product.id || product.slug || index)
          const active = selectedIds.includes(id)
          return (
            <button className="product-card" key={id} onClick={() => toggle(id)} type="button" style={{ textAlign: 'left', borderColor: active ? 'rgba(34,211,238,.72)' : undefined, cursor: 'pointer' }}>
              <span className="rank-badge">{index + 1}</span>
              <div className="product-image-wrap">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={getProductName(product)} />
                ) : (
                  <div className="product-placeholder" aria-hidden="true" />
                )}
              </div>
              <div className="product-brand">{product.brand || 'Smartphone'}</div>
              <div className="product-name">{getProductName(product)}</div>
              <div className="product-bottom">
                <div className="product-price">{formatPrice(product)}</div>
                <div className="small-score">{safeNumber(product.global_score) ?? '—'}</div>
              </div>
            </button>
          )
        })}
      </div>

      {selected.length < 2 ? (
        <div className="empty">Select 2 to 4 smartphones to compare.</div>
      ) : (
        <div className="compare-grid">
          {selected.map((product) => (
            <div className="compare-panel" key={product.id || product.slug}>
              <h2>{getProductName(product)}</h2>
              <p className="price">{formatPrice(product)}</p>
              {rows.map((row) => (
                <div className="score-row" key={String(row.key)}>
                  <span>{row.label}</span>
                  <strong>{safeNumber(product[row.key] as string | number | null) ?? '—'}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
