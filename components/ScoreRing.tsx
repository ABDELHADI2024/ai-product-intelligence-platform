import { safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value?: string | number | null;
  score?: string | number | null;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({ value, score, label, size = 'md' }: ScoreRingProps) {
  const finalScore = safeNumber(value ?? score, 0);
  const percentage = Math.max(0, Math.min(100, finalScore));
  const color = percentage >= 90 ? '#22c55e' : percentage >= 80 ? '#84cc16' : percentage >= 70 ? '#f59e0b' : '#ef4444';
  const dimension = size === 'lg' ? 86 : size === 'sm' ? 46 : 62;

  return (
    <div className="score-ring-wrap">
      <div
        className="score-ring"
        style={{
          width: dimension,
          height: dimension,
          background: `conic-gradient(${color} ${percentage * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div className="score-ring-core" style={{ width: dimension - 10, height: dimension - 10 }}>
          {percentage > 0 ? Math.round(percentage) : '—'}
        </div>
      </div>
      {label ? <span className="score-ring-label">{label}</span> : null}
    </div>
  );
}
