import { formatScore, safeNumber, scoreLabel } from '@/lib/products'

type ScoreRingProps = {
  value?: string | number | null
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export default function ScoreRing({ value, size = 'md', label }: ScoreRingProps) {
  const score = safeNumber(value)
  const normalized = score === null ? 0 : Math.max(0, Math.min(100, Math.round(score)))

  return (
    <div className={`wf-score-ring wf-score-ring-${size}`} style={{ ['--score' as string]: normalized }} aria-label={`Score ${formatScore(value)}`}>
      <span>{formatScore(value)}</span>
      {label ? <small>{label}</small> : <em>{scoreLabel(value)}</em>}
    </div>
  )
}
