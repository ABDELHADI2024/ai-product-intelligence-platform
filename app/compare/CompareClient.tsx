'use client'
import { Fragment, useState, useEffect, type CSSProperties } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { safeNumber, safeText, formatPrice } from '@/lib/products'

const SCORE_ROWS = [
  { key: 'global_score', label: '🌐 Global Score', emoji: '🌐' },
  { key: 'camera_score', label: '📸 Camera', emoji: '📸' },
  { key: 'battery_score', label: '🔋 Battery', emoji: '🔋' },
  { key: 'display_score', label: '📺 Display', emoji: '📺' },
  { key: 'gaming_score', label: '🎮 Gaming', emoji: '🎮' },
  { key: 'value_score', label: '💰 Value', emoji: '💰' },
]

export default function CompareClient({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selected, setSelected] = useState<string[]>(() => {
    const raw = searchParams.get('phones') ?? ''
    return raw ? raw.split(',').filter(Boolean).slice(0, 4) : []
  })

  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = selected.length ? `?phones=${selected.join(',')}` : ''
    router.replace(`/compare${q}`, { scroll: false })
  }, [selected, router])

  const toggle = (slug: string) => {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      if (prev.length >= 4) return prev
      return [...prev, slug]
    })
  }

  const selectedProducts = selected
    .map(s => allProducts.find(p => p.slug === s))
    .filter(Boolean) as Product[]

  const filtered = (search.trim()
    ? allProducts.filter(p =>
        (p.full_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.brand ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : allProducts
  ).slice(0, 30)

  // Best per row
  const best: Record<string, number> = {}
  if (selectedProducts.length > 1) {
    SCORE_ROWS.forEach(row => {
      const vals = selectedProducts.map((p, i) => ({ i, v: safeNumber((p as Record<string, unknown>)[row.key] as string | number | null) ?? -1 }))
      const maxVal = Math.max(...vals.map(v => v.v))
      if (maxVal > 0) {
        const bestIdx = vals.find(v => v.v === maxVal)!.i
        best[row.key] = bestIdx
      }
    })
  }

  const bestOverall = selectedProducts.length > 1
    ? selectedProducts.reduce((acc, p, i) => {
        const score = safeNumber(p.global_score) ?? 0
        return score > (safeNumber(selectedProducts[acc]?.global_score) ?? 0) ? i : acc
      }, 0)
    : -1

  return (
    <div className="page">
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Comparison Engine</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 8 }}>
          Compare smartphones <br /><span style={{ color: 'var(--accent)' }}>score by score.</span>
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 15 }}>
          Select up to 4 smartphones. Witflag ranks camera, battery, gaming, display, value, and global scores.
        </p>
        {selected.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-3)' }}>
            Comparing: <span style={{ color: 'var(--accent)' }}>{selectedProducts.map(p => safeText(p.full_name || p.model)).join(' vs ')}</span>
          </div>
        )}
      </div>

      {/* Product picker */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Select smartphones</h2>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Choose up to 4 products</span>
          {selected.length > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={() => setSelected([])}>Clear all</button>
          )}
          <div className="search-wrap" style={{ marginLeft: 'auto', width: 220 }}>
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              className="search-input"
              placeholder="Filter products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingTop: 8, paddingBottom: 8, fontSize: 13 }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, maxHeight: 360, overflowY: 'auto', padding: 4 }}>
          {filtered.map(p => {
            const isSelected = selected.includes(p.slug ?? '')
            const score = safeNumber(p.global_score)
            return (
              <button
                key={p.id}
                onClick={() => toggle(safeText(p.slug))}
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
                {p.image_url && (
                  <Image src={p.image_url} alt={safeText(p.full_name)} width={36} height={36} style={{ objectFit: 'contain', flexShrink: 0 }} unoptimized />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginBottom: 2 }}>{p.brand}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: isSelected ? 'var(--accent)' : 'var(--text)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {safeText(p.full_name || p.model)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                    {formatPrice(p.price_eur)} {score !== null ? `· ${score}` : ''}
                  </div>
                </div>
                {isSelected && <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Comparison table */}
      {selectedProducts.length >= 2 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Score Breakdown</h2>
          <div
            className="compare-grid"
            style={{ '--cols': selectedProducts.length } as CSSProperties}
          >
            {/* Header row */}
            <div className="compare-cell compare-label-cell" style={{ background: 'var(--bg-3)', fontWeight: 700, fontSize: 12, color: 'var(--text-3)', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
              Product
            </div>
            {selectedProducts.map((p, i) => (
              <div key={p.id} className="compare-cell compare-header-cell" style={{
                background: i === bestOverall ? 'var(--accent-glow)' : 'var(--bg-2)',
                borderBottom: '1px solid var(--border)',
                borderRight: i < selectedProducts.length - 1 ? '1px solid var(--border)' : undefined,
              }}>
                {p.image_url && (
                  <Image src={p.image_url} alt={safeText(p.full_name)} width={40} height={40} style={{ objectFit: 'contain', margin: '0 auto 8px' }} unoptimized />
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: i === bestOverall ? 'var(--accent)' : 'var(--text)', lineHeight: 1.3 }}>
                  {safeText(p.full_name || p.model)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{formatPrice(p.price_eur)}</div>
                {i === bestOverall && <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🏆 Best overall</div>}
              </div>
            ))}

            {/* Score rows */}
            {SCORE_ROWS.map(row => {
              const vals = selectedProducts.map(p => safeNumber((p as Record<string, unknown>)[row.key] as string | number | null))
              if (vals.every(v => v === null)) return null
              return (
                <Fragment key={row.key}>
                  <div key={row.key + '-label'} className="compare-cell compare-label-cell" style={{ borderRight: '1px solid var(--border)' }}>
                    {row.label}
                  </div>
                  {selectedProducts.map((p, i) => {
                    const val = safeNumber((p as Record<string, unknown>)[row.key] as string | number | null)
                    const isBest = best[row.key] === i
                    return (
                      <div key={`${p.id}-${row.key}`} className={`compare-cell${isBest ? ' compare-best' : ''}`} style={{
                        fontWeight: isBest ? 800 : 500,
                        background: isBest ? 'var(--accent-glow)' : undefined,
                        borderRight: i < selectedProducts.length - 1 ? '1px solid var(--border)' : undefined,
                      }}>
                        {val ?? '—'}
                        {isBest && <span style={{ fontSize: 10, marginLeft: 4 }}>✓</span>}
                      </div>
                    )
                  })}
                </Fragment>
              )
            })}
          </div>

          {/* AI Summary */}
          <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 10 }}>🤖 AI Summary</div>
            <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 12 }}>
              {selectedProducts[bestOverall]
                ? `${safeText(selectedProducts[bestOverall].full_name || selectedProducts[bestOverall].model)} leads with the highest global score. If price/value matters most, compare the value scores above.`
                : 'Select 2 or more products to see a comparison summary.'}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {SCORE_ROWS.slice(1).map(row => {
                const bIdx = best[row.key]
                if (bIdx === undefined) return null
                const bp = selectedProducts[bIdx]
                return (
                  <div key={row.key} style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    <span style={{ fontWeight: 700 }}>{row.label}:</span>{' '}
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{safeText(bp?.full_name || bp?.model)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {selectedProducts.length < 2 && (
        <div className="empty">
          <div className="empty-icon">⚖️</div>
          <div className="empty-title">Select 2 to 4 smartphones to compare</div>
          <p>Tap any product card above to add it to the comparison.</p>
        </div>
      )}
    </div>
  )
}
