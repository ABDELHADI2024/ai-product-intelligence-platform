type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  action?: string;
};

export default function SearchBar({ defaultValue = '', placeholder = 'Search a smartphone, brand, chipset...', action = '/search' }: SearchBarProps) {
  return (
    <form action={action} className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-2 shadow-2xl shadow-black/20 sm:flex-row">
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
      />
      <button className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 hover:from-cyan-200 hover:to-blue-400">
        Smart search
      </button>
    </form>
  );
}
