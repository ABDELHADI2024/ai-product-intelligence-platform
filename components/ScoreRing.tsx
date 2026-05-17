import { safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value: number | string | null | undefined;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({ value, label = 'AI score', size = 'md' }: ScoreRingProps) {
  const score = Math.max(0, Math.min(100, safeNumber(value, 0)));
  const radius = size === 'lg' ? 54 : size === 'sm' ? 34 : 44;
  const stroke = size === 'lg' ? 10 : 8;
  const dimension = radius * 2 + stroke * 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={dimension} height={dimension} className="-rotate-90">
        <circle cx={dimension / 2} cy={dimension / 2} r={radius} stroke="rgba(148,163,184,0.18)" strokeWidth={stroke} fill="none" />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-black text-white">{score ? Math.round(score) : '—'}</div>
        <div className="text-[10px] uppercase tracking-widest text-slate-400">{label}</div>
      </div>
    </div>
  );
}
