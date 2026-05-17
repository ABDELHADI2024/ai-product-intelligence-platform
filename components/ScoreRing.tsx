import { safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value?: string | number | null;
  score?: string | number | null;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({
  value,
  score,
  label = 'Score',
  size = 'md',
}: ScoreRingProps) {
  const parsedScore = safeNumber(value ?? score);
  const finalScore = parsedScore ?? 0;
  const pct = Math.max(0, Math.min(100, finalScore));

  const dimensions = {
    sm: {
      box: 'h-20 w-20',
      svg: 72,
      radius: 28,
      stroke: 6,
      text: 'text-lg',
      label: 'text-[10px]',
    },
    md: {
      box: 'h-28 w-28',
      svg: 104,
      radius: 42,
      stroke: 8,
      text: 'text-2xl',
      label: 'text-xs',
    },
    lg: {
      box: 'h-36 w-36',
      svg: 132,
      radius: 54,
      stroke: 10,
      text: 'text-4xl',
      label: 'text-sm',
    },
  }[size];

  const circumference = 2 * Math.PI * dimensions.radius;
  const offset = circumference - (pct / 100) * circumference;

  const color =
    pct >= 85
      ? 'stroke-emerald-300'
      : pct >= 75
        ? 'stroke-cyan-300'
        : pct >= 65
          ? 'stroke-amber-300'
          : 'stroke-slate-400';

  const glow =
    pct >= 85
      ? 'shadow-emerald-500/20'
      : pct >= 75
        ? 'shadow-cyan-500/20'
        : pct >= 65
          ? 'shadow-amber-500/20'
          : 'shadow-slate-500/10';

  return (
    <div
      className={`relative flex ${dimensions.box} items-center justify-center rounded-full bg-white/[0.04] shadow-2xl ${glow}`}
      aria-label={`${label}: ${Math.round(pct)} out of 100`}
    >
      <svg
        width={dimensions.svg}
        height={dimensions.svg}
        viewBox={`0 0 ${dimensions.svg} ${dimensions.svg}`}
        className="-rotate-90"
      >
        <circle
          cx={dimensions.svg / 2}
          cy={dimensions.svg / 2}
          r={dimensions.radius}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={dimensions.stroke}
        />
        <circle
          cx={dimensions.svg / 2}
          cy={dimensions.svg / 2}
          r={dimensions.radius}
          fill="none"
          className={color}
          strokeWidth={dimensions.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className={`${dimensions.text} font-black text-white`}>
          {parsedScore === null ? '—' : Math.round(pct)}
        </p>
        <p className={`${dimensions.label} font-medium uppercase tracking-[0.2em] text-slate-400`}>
          {label}
        </p>
      </div>
    </div>
  );
}
