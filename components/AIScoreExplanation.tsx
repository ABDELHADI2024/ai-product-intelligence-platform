export default function AIScoreExplanation() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-transparent p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI scoring logic</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white">
          Witflag turns smartphone specs into decision-ready intelligence.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {['Camera', 'Battery', 'Display', 'Gaming', 'Value'].map((item) => (
            <div key={item} className="rounded-3xl bg-black/20 p-5">
              <p className="text-lg font-semibold text-white">{item}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Score used for recommendations, comparison, and buyer guidance.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
