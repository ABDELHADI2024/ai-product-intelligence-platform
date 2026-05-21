import type { CSSProperties } from 'react'
import { safeNumber, scoreLabel } from '@/lib/products'

export default function ScoreRing({ value, compact = false }: { value?: string | number | null; compact?: boolean }) {
  const score = safeNumber(value)
  const display = score === null ? '—' : Math.round(score)
  const style = { ['--score' as string]: score ?? 0 } as CSSProperties
  return (
    <div className={compact ? 'product-score-ring' : 'wf-score-ring'} style={style} title={scoreLabel(score)}>
      <span>{display}</span>
    </div>
  )
}
