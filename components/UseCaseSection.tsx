import { BatteryCharging, Camera, Gamepad2, BadgeEuro, Sparkles } from 'lucide-react';

const useCases = [
  {
    icon: Camera,
    title: 'Best for camera',
    description: 'Rank phones by camera score, sensor profile, video needs, and creator use cases.',
  },
  {
    icon: BatteryCharging,
    title: 'Best for battery',
    description: 'Find smartphones with strong battery scores, capacity, and charging profile.',
  },
  {
    icon: Gamepad2,
    title: 'Best for gaming',
    description: 'Compare chipset, refresh rate, RAM, cooling profile, and gaming score.',
  },
  {
    icon: BadgeEuro,
    title: 'Best value',
    description: 'Balance price, scores, specs, and long-term usefulness for budget buyers.',
  },
];

export default function UseCaseSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-200">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI use cases</p>
          <h2 className="text-3xl font-bold text-white">Choose by what matters, not only specs.</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {useCases.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
