'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import { safeNumber, safeText, formatPrice } from '@/lib/products'

const SCORE_ROWS = [
  { key: 'global_score', label: '🌐 Global Score' },
  { key: 'camera_score', label: '📸 Camera' },
  { key: 'battery_score', label: '🔋 Battery' },
  { key: 'display_score', label: '📺 Display' },
  { key: 'gaming_score', label: '🎮 Gaming' },
  { key: 'value_score', label: '💰 Value' },
] as const

export default function CompareClient({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selected, setSelected] = useState<string[]>(() => {
    const raw = searchParams.get('phones') ?? ''
    return raw.split(',').map((item) => item.trim()).filter(Boolean).slice(0, 4)
  })

  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = selected.length ? `?phones=${selected.join(',')}` : ''
    router.replace(`/compare${q}`, { scroll: false })
  }, [selected, router])

  const toggle = (slug: string) => {
    if (!slug) return

    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((item) => item !== slug)
      if (prev.length >= 4) return prev
      return [...prev, slug]
    })
  }

  const selectedProducts = useMemo(
    () => selected.map((slug) => allProducts.find((product) => product.slug === slug)).filter(Boolean) as Product[],
    [allProducts, selected],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    return (q
      ? allProducts.filter((product) => {
          const name = `${product.full_name ?? ''} ${product.model ?? ''} ${product.brand ?? ''}`.toLowerCase()
          return name.includes(q)
        })
      : allProducts
    )
      .filter((product) => Boolean(product.slug))
      .slice(0, 30)
  }, [allProducts, search])

  const best: Record<string, number> = {}

  if (selectedProducts.length > 1) {
    SCORE_ROWS.forEach((row) => {
      const vals = selectedProducts.map((product, index) => ({
        index,
        value: safeNumber((product as Record<string, unknown>)[row.key] as string | number | null) ?? -1,
      }))

      const maxVal = Math.max(...vals.map((item) => item.value))
      if (maxVal > 0) {
        const bestItem = vals.find((item) => item.value === maxVal)
        if (bestItem) best[row.key] = bestItem.index
      }
    })
  }

  const bestOverall = selectedProducts.length > 1
    ? selectedProducts.reduce((bestIndex, product, index) => {
        const score = safeNumber(product.global_score) ?? 0
        const currentBestScore = safeNumber(selectedProducts[bestIndex]?.global_score) ?? 0
        return score > currentBestScore ? index : bestIndex
      }, 0)
    : -1

  return (
    <div className="page">
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
          Comparison Engine
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 8 }}>
          Compare smartphones <br />
          <span style={{ color: 'var(--accent)' }}>score by score.</span>
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 15 }}>
          Select up to 4 smartphones. Witflag ranks camera, battery, gaming, display, value, and global scores.
        </p>
        {selectedProducts.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-3)' }}>
            Comparing:{' '}
            <span style={{ color: 'var(--accent)' }}>
              {selectedProducts.map((product) => safeText(product.full_name || product.model)).join(' vs ')}
            </span>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Select smartphones</h2>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Choose up to 4 products</span>
          {selected.length > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={() => setSelected([])} type="button">
              Clear all
            </button>
          )}
          <div className="search-wrap" style={{ marginLeft: 'auto', width: 220 }}>
            <input
              type="text"
              className="search-input"
              placeholder="Filter products…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ paddingTop: 8, paddingBottom: 8, fontSize: 13 }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, maxHeight: 360, overflowY: 'auto', padding: 4 }}>
          {filtered.map((product) => {
            const slug = safeText(product.slug)
            const isSelected = selected.includes(slug)
            const score = safeNumber(product.global_score)
            const name = safeText(product.full_name || product.model)

            return (
              <button
                key={product.id ?? slug}
                onClick={() => toggle(slug)}
                type="button"
                style={{
                  background: isSelected ? 'var(--accent-glow)' : 'var(--bg-2)',
                  border: `1px solid ${isSelected ? 'rgba(74,222,128,0.4)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {product.image_url && (
                  <Image src={product.image_url} alt={name} width={36} height={36} style={{ objectFit: 'contain', flexShrink: 0 }} unoptimized />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginBottom: 2 }}>{product.brand}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: isSelected ? 'var(--accent)' : 'var(--text)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                    {formatPrice(product)} {score !== null ? `· ${score}` : ''}
                  </div>
                </div>
                {isSelected && <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {selectedProducts.length >= 2 ? (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Score Breakdown</h2>
          <div className="compare-grid" style={{ '--cols': selectedProducts.length } as React.CSSProperties}>
            <div className="compare-cell compare-label-cell" style={{ background: 'var(--bg-3)', fontWeight: 700, fontSize: 12, color: 'var(--text-3)', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
              Product
            </div>

            {selectedProducts.map((product, index) => {
              const name = safeText(product.full_name || product.model)

              return (
                <div key={product.id ?? product.slug} className="compare-cell compare-header-cell" style={{
                  background: index === bestOverall ? 'var(--accent-glow)' : 'var(--bg-2)',
                  borderBottom: '1px solid var(--border)',
                  borderRight: index < selectedProducts.length - 1 ? '1px solid var(--border)' : undefined,
                }}>
                  {product.image_url && (
                    <Image src={product.image_url} alt={name} width={40} height={40} style={{ objectFit: 'contain', margin: '0 auto 8px' }} unoptimized />
                  )}
                  <div style={{ fontSize: 12, fontWeight: 700, color: index === bestOverall ? 'var(--accent)' : 'var(--text)', lineHeight: 1.3 }}>
                    {name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{formatPrice(product)}</div>
                  {index === bestOverall && <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🏆 Best overall</div>}
                </div>
              )
            })}

            {SCORE_ROWS.map((row) => {
              const vals = selectedProducts.map((product) => safeNumber((product as Record<string, unknown>)[row.key] as string | number | null))
              if (vals.every((value) => value === null)) return null

              return (
                <Fragment key={row.key}>
                  <div className="compare-cell compare-label-cell" style={{ borderRight: '1px solid var(--border)' }}>
                    {row.label}
                  </div>
                  {selectedProducts.map((product, index) => {
                    const value = safeNumber((product as Record<string, unknown>)[row.key] as string | number | null)
                    const isBest = best[row.key] === index

                    return (
                      <div key={`${product.id ?? product.slug}-${row.key}`} className={`compare-cell${isBest ? ' compare-best' : ''}`} style={{
                        fontWeight: isBest ? 800 : 500,
                        background: isBest ? 'var(--accent-glow)' : undefined,
                        borderRight: index < selectedProducts.length - 1 ? '1px solid var(--border)' : undefined,
                      }}>
                        {value ?? '—'}
                        {isBest && <span style={{ fontSize: 10, marginLeft: 4 }}>✓</span>}
                      </div>
                    )
                  })}
                </Fragment>
              )
            })}
          </div>

          <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 10 }}>🤖 AI Summary</div>
            <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 12 }}>
              {selectedProducts[bestOverall]
                ? `${safeText(selectedProducts[bestOverall].full_name || selectedProducts[bestOverall].model)} leads with the highest global score. If price/value matters most, compare the value scores above.`
                : 'Select 2 or more products to see a comparison summary.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="empty">
          <div className="empty-icon">⚖️</div>
          <div className="empty-title">Select 2 to 4 smartphones to compare</div>
          <p>Tap any product card above to add it to the comparison.</p>
        </div>
      )}
    </div>
  )
}
