'use client'
import { useState, useMemo } from 'react'
import type { Product } from '@/lib/products'
import { safeNumber } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Smartphones', value: 'smartphones' },
  { label: 'Foldables', value: 'foldables' },
]

const SORTS = [
  { label: 'Top Rated', value: 'score' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
]

function safeDate(value: unknown): number {
  if (typeof value !== 'string' && typeof value !== 'number') return 0
  const time = new Date(value).getTime()
  return Number.isFinite(time) ? time : 0
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('score')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'all') {
      list = list.filter(p => {
        const cat = (p.normalized_category ?? '').toLowerCase()
        if (category === 'foldables') return cat.includes('fold') || (p.product_type ?? '').toLowerCase().includes('fold')
        return cat.includes(category) || (p.product_type ?? '').toLowerCase().includes(category)
      })
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        (p.full_name ?? '').toLowerCase().includes(q) ||
        (p.brand ?? '').toLowerCase().includes(q) ||
        (p.model ?? '').toLowerCase().includes(q)
      )
    }

    list.sort((a, b) => {
      if (sort === 'score') return (safeNumber(b.global_score) ?? 0) - (safeNumber(a.global_score) ?? 0)
      if (sort === 'price_asc') return (safeNumber(a.price_eur) ?? 0) - (safeNumber(b.price_eur) ?? 0)
      if (sort === 'price_desc') return (safeNumber(b.price_eur) ?? 0) - (safeNumber(a.price_eur) ?? 0)
      if (sort === 'newest') return safeDate(b.created_at) - safeDate(a.created_at)
      return 0
    })

    return list
  }, [products, category, sort, search])

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Catalog</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 8 }}>All Products</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 15 }}>
          Browse and compare the best products scored by structured product intelligence.
        </p>
        <div className="stat-row" style={{ marginTop: 20 }}>
          <div className="stat-pill"><strong>{products.length}</strong> Products loaded</div>
          <div className="stat-pill"><strong>6</strong> Score signals</div>
          <div className="stat-pill" style={{ color: 'var(--accent)' }}>Comparison-ready</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28 }}>
        <div className="filter-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              className={`filter-tab${category === c.value ? ' active' : ''}`}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search-wrap" style={{ width: 220 }}>
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              className="search-input"
              placeholder="Filter…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingTop: 9, paddingBottom: 9 }}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 14px', fontSize: 13, color: 'var(--text)', outline: 'none', cursor: 'pointer' }}
          >
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--text-3)' }}>
        Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
      </div>

      <ProductGrid products={filtered} />
    </div>
  )
}
