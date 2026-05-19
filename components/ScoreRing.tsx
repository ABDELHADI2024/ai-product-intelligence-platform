'use client';

type ScoreRingProps = {
  value?: string | number | null;
  score?: string | number | null;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

const SIZES = {
  sm: { outer: 44, r: 17, sw: 3.5, fontSize: '.75rem' },
  md: { outer: 60, r: 23, sw: 4, fontSize: '.9rem' },
  lg: { outer: 72, r: 28, sw: 5, fontSize: '1.05rem' },
};

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function ScoreRing({
  value,
  score,
  size = 'md',
  label,
}: ScoreRingProps) {
  const parsedScore = toNumber(value ?? score);
  const finalScore = parsedScore ?? 0;

  const { outer, r, sw, fontSize } = SIZES[size];
  const circ = 2 * Math.PI * r;
  const dash = Math.min(Math.max(finalScore / 100, 0), 1) * circ;
  const id = `sg-${r}-${finalScore}`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
      aria-label={label ? `${label}: ${finalScore} out of 100` : `${finalScore} out of 100`}
    >
      <div
        style={{
          position: 'relative',
          width: outer,
          height: outer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={outer}
          height={outer}
          viewBox={`0 0 ${outer} ${outer}`}
          style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}
        >
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          <circle
            cx={outer / 2}
            cy={outer / 2}
            r={r}
            fill="none"
            stroke="rgba(124,58,237,.18)"
            strokeWidth={sw}
          />

          <circle
            cx={outer / 2}
            cy={outer / 2}
            r={r}
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
          {parsedScore === null ? '—' : Math.round(finalScore)}
        </span>
      </div>

      {label && (
        <span style={{ fontSize: '.6rem', color: '#94a3b8', fontWeight: 600 }}>
          {label}
        </span>
      )}
    </div>
  );
}
