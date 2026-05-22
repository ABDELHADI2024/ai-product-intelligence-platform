import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui";

export function SearchPanel() {
  return (
    <section id="products" className="container-shell py-10">
      <div className="glass-card rounded-[2rem] p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-3 rounded-full border border-border bg-white px-5 py-4">
            <Search size={20} className="text-muted" />
            <input
              aria-label="Search products"
              className="w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted"
              placeholder="Search: best camera phone under $900, compact laptop for travel..."
            />
          </label>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-4 text-sm font-black text-foreground transition hover:bg-surface-2">
            <Filter size={17} /> Filters
          </button>
          <Button className="py-4">
            <SlidersHorizontal size={17} /> Smart Search
          </Button>
        </div>
      </div>
    </section>
  );
}
