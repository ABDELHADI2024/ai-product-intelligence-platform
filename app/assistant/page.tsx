export const metadata = {
  title: 'AI Assistant | Witflag',
  description: 'Ask Witflag for smartphone recommendations based on your needs.'
}

export default function AssistantPage() {
  return (
    <section className="page-title">
      <h1>AI buying assistant</h1>
      <p>Coming next: ask questions like “best camera phone under $800” or “compare iPhone and Samsung for gaming”.</p>
      <div className="content-card" style={{ marginTop: 24 }}>
        <h2>Suggested questions</h2>
        <p>Best camera phone?</p>
        <p>Best battery phone?</p>
        <p>Best value flagship?</p>
      </div>
    </section>
  )
}
