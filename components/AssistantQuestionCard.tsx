type AssistantQuestionCardProps = {
  title: string;
  description: string;
  options: string[];
};

export default function AssistantQuestionCard({
  title,
  description,
  options,
}: AssistantQuestionCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {options.map((option) => (
          <span
            key={option}
            className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}
