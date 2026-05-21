import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://witflag.com'),
  title: {
    default: 'Witflag — AI Smartphone Intelligence',
    template: '%s | Witflag'
  },
  description: 'AI-native smartphone intelligence platform for product search, comparisons, recommendations, scores, and buying guides.',
  openGraph: {
    title: 'Witflag — AI Smartphone Intelligence',
    description: 'Score, rank, compare, and discover smartphones using real product data and AI-native decision intelligence.',
    type: 'website'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="wf-app">
          <Header />
          <main className="wf-shell wf-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
