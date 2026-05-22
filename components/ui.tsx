import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold text-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_18px_48px_rgba(17,18,15,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_58px_rgba(17,18,15,0.24)] focus:outline-none focus:ring-4 focus:ring-accent/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <Badge className="mb-4 bg-accent/70">{eyebrow}</Badge>
      <h2 className="text-3xl font-black tracking-[-0.04em] text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted md:text-lg">{description}</p>
    </div>
  );
}

export function StatCard({ value, label, icon }: { value: string; label: string; icon?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-white/70 p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-2 text-foreground">{icon}</div>
      <div className="text-3xl font-black tracking-[-0.04em]">{value}</div>
      <div className="mt-1 text-sm font-medium text-muted">{label}</div>
    </div>
  );
}
