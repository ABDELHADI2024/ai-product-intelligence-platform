import { Cpu, Menu, Search, Sparkles } from "lucide-react";
import { Button } from "./ui";

const navItems = ["Products", "Compare", "AI Guide", "Rankings"];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/72 backdrop-blur-2xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3" aria-label="Witflag home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Cpu size={21} />
          </div>
          <div>
            <div className="text-lg font-black tracking-[-0.04em]">Witflag</div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">AI Product Intel</div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-border bg-white/65 p-1 shadow-sm lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:bg-surface-2 hover:text-foreground">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-foreground transition hover:bg-surface-2" aria-label="Search">
            <Search size={18} />
          </button>
          <Button>
            <Sparkles size={17} /> Ask AI
          </Button>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
