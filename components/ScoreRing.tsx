type ScoreRingProps = {
  value?: string | number | null;
  score?: string | number | null;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
};

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;

  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

const sizeMap = {
  sm: {
    wrap: 'h-20 w-20',
    svg: 72,
    radius: 28,
    stroke: 6,
    score: 'text-lg',
    label: 'text-[10px]',
  },
  md: {
    wrap: 'h-28 w-28',
    svg: 104,
    radius: 42,
    stroke: 8,
    score: 'text-2xl',
    label: 'text-xs',
  },
  lg: {
    wrap: 'h-36 w-36',
    svg: 132,
    radius: 54,
    stroke: 10,
    score: 'text-4xl',
    label: 'text-sm',
  },
};

export default function ScoreRing({
  value,
  score,
  size = 'md',
  label = 'Score',
  className = '',
}: ScoreRingProps) {
  const parsed = toNumber(value ?? score);
  const finalScore = parsed ?? 0;
  const pct = Math.max(0, Math.min(100, finalScore));
  const cfg = sizeMap[size];

  const circumference = 2 * Math.PI * cfg.radius;
  const offset = circumference - (pct / 100) * circumference;

  const stroke =
    pct >= 85
      ? 'stroke-emerald-300'
      : pct >= 75
        ? 'stroke-cyan-300'
        : pct >= 65
          ? 'stroke-amber-300'
          : 'stroke-slate-400';

  return (
    <div
      className={`relative flex ${cfg.wrap} items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/20 ${className}`}
      aria-label={`${label}: ${Math.round(pct)} out of 100`}
    >
      <svg
        width={cfg.svg}
        height={cfg.svg}
        viewBox={`0 0 ${cfg.svg} ${cfg.svg}`}
        className="-rotate-90"
      >
        <circle
          cx={cfg.svg / 2}
          cy={cfg.svg / 2}
          r={cfg.radius}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={cfg.stroke}
        />
        <circle
          cx={cfg.svg / 2}
          cy={cfg.svg / 2}
          r={cfg.radius}
          fill="none"
          className={stroke}
          strokeWidth={cfg.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className={`${cfg.score} font-black text-white`}>
          {parsed === null ? '—' : Math.round(pct)}
        </p>
        {label ? (
          <p className={`${cfg.label} font-semibold uppercase tracking-[0.18em] text-slate-400`}>
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}
