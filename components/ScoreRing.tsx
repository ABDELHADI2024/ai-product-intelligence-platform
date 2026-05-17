import { safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value?: string | number | null;
  score?: string | number | null;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({ value, score, label, size = 'md' }: ScoreRingProps) {
  const finalScore = safeNumber(value ?? score, 0);
  const pct = Math.max(0, Math.min(100, finalScore));

  const color =
    pct >= 90 ? '#34d399' :
    pct >= 80 ? '#67e8f9' :
    pct >= 70 ? '#fbbf24' :
    '#f87171';

  const dim = size === 'lg' ? 92 : size === 'sm' ? 48 : 66;
  const thickness = size === 'lg' ? 8 : size === 'sm' ? 5 : 6;
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 14 : 18;

  return (
    <div className="score-ring-wrap">
      <div
        className="score-ring"
        style={{
          width: dim,
          height: dim,
          background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
          boxShadow: pct > 0 ? `0 0 16px ${color}40` : 'none',
        }}
      >
        <div
          className="score-ring-core"
          style={{
            width: dim - thickness * 2,
            height: dim - thickness * 2,
            fontSize,
          }}
        >
          {pct > 0 ? Math.round(pct) : '—'}
        </div>
      </div>
      {label ? <span className="score-ring-label">{label}</span> : null}
    </div>
  );
}
