import { safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value?: string | number | null;
  score?: string | number | null;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

export default function ScoreRing({ value, score, size = 'md', label }: ScoreRingProps) {
  const parsed = safeNumber(value ?? score);
  const n = parsed ?? 0;
  const tier = n >= 90 ? 'great' : n >= 80 ? 'good' : n >= 70 ? 'mid' : 'low';

  return (
    <div className={`score-ring ${size} ${tier}`} aria-label={`${label || 'Score'} ${Math.round(n)} out of 100`}>
      {parsed === null ? '—' : Math.round(n)}
    </div>
  );
}
