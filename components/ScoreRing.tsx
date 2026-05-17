import { safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value: string | number | null | undefined;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({ value, label = 'Score', size = 'md' }: ScoreRingProps) {
  const score = safeNumber(value, 0);
  const radius = size === 'lg' ? 44 : size === 'sm' ? 26 : 34;
  const stroke = size === 'lg' ? 8 : size === 'sm' ? 5 : 7;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;
  const box = radius * 2;
  const textSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: box, height: box }}>
        <svg height={box} width={box} className="-rotate-90">
          <circle
            stroke="rgba(255,255,255,0.09)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="url(#scoreGradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textSize} font-black text-white`}>{score > 0 ? Math.round(score) : '—'}</span>
        </div>
      </div>
      <p className="text-center text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
    </div>
  );
}
