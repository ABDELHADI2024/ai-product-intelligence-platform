import Link from 'next/link';
import { BatteryCharging, Camera, Gem, Send, Sparkles } from 'lucide-react';
import { type UseCase } from '@/lib/products';

type AssistantChatPreviewProps = {
  use: UseCase;
  budget?: number | null;
};

const chips: {
  label: string;
  href: string;
  icon: typeof Sparkles;
}[] = [
  {
    label: 'Under €500',
    href: '/assistant?use=value&budget=500',
    icon: Gem,
  },
  {
    label: 'Pro camera',
    href: '/assistant?use=camera&budget=800',
    icon: Camera,
  },
  {
    label: 'Long battery',
    href: '/assistant?use=battery&budget=500',
    icon: BatteryCharging,
  },
];

function profileSentence(use: UseCase, budget?: number | null) {
  const priority = {
    balanced: 'a balanced smartphone',
    camera: 'a camera-first smartphone',
    battery: 'a battery-first smartphone',
    gaming: 'a gaming-first smartphone',
    value: 'the best value smartphone',
  }[use];

  return `You are looking for ${priority}${budget ? ` under €${budget}` : ''}.`;
}

export default function AssistantChatPreview({
  use,
  budget,
}: AssistantChatPreviewProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-[#09090B] shadow-[0_0_45px_rgba(34,211,238,0.12)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-white">Guided Assistant</h3>
          <p className="text-xs text-slate-500">Score-based MVP · Real data</p>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-slate-300">
            Hi. I can help you choose a smartphone using real Witflag scores.
            What matters most to you?
          </div>
        </div>

        <div className="ml-12 flex flex-wrap gap-2">
          {chips.map((chip) => {
            const Icon = chip.icon;

            return (
              <Link
                key={chip.href}
                href={chip.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <Icon className="h-3.5 w-3.5" />
                {chip.label}
              </Link>
            );
          })}
        </div>

        <div className="flex justify-end gap-4">
          <div className="max-w-[85%] rounded-2xl rounded-tr-none border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-50">
            {profileSentence(use, budget)}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-slate-300">
            I ranked the best matches below using camera, battery, gaming,
            value, display, and global score signals.
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 bg-zinc-950 p-4">
        <div className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-500">
          Real chatbot/RAG comes later...
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
