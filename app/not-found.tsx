import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="empty">
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link className="btn btn-primary" href="/">Go home</Link>
    </section>
  )
}
