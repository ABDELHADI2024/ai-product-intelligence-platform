'use client';

type ScoreRingProps = {
  value?: number | null;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

const SIZES = {
  sm: { outer: 44, r: 17, sw: 3.5, fontSize: '.75rem' },
  md: { outer: 60, r: 23, sw: 4,   fontSize: '.9rem'  },
  lg: { outer: 72, r: 28, sw: 5,   fontSize: '1.05rem' },
};

export default function ScoreRing({ value, size = 'md', label }: ScoreRingProps) {
  const score = value ?? 0;
  const { outer, r, sw, fontSize } = SIZES[size];
  const circ  = 2 * Math.PI * r;
  const dash  = Math.min(Math.max(score / 100, 0), 1) * circ;
  const id    = `sg-${r}-${score}`;

  const color =
    score >= 90 ? '#22d3ee' :
    score >= 80 ? '#a78bfa' :
    score >= 70 ? '#6366f1' : '#4a4168';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div style={{ position: 'relative', width: outer, height: outer, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          width={outer}
          height={outer}
          viewBox={`0 0 ${outer} ${outer}`}
          style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}
        >
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <circle
            cx={outer / 2} cy={outer / 2} r={r}
            fill="none"
            stroke="rgba(124,58,237,.18)"
            strokeWidth={sw}
          />
          <circle
            cx={outer / 2} cy={outer / 2} r={r}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={sw}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 900,
            fontSize,
            color: '#fff',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {score || '—'}
        </span>
      </div>
      {label && (
        <span style={{ fontSize: '.6rem', color: '#4a4168', fontWeight: 500 }}>{label}</span>
      )}
    </div>
  );
}
