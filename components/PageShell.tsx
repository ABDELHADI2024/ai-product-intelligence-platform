export default function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="wf-main"><div className="wf-shell">{children}</div></main>
}
