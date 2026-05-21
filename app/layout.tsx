import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Witflag | AI-powered smartphone intelligence',
  description: 'Score, rank, compare, and discover smartphones using real product data and AI-native product intelligence.',
  metadataBase: new URL('https://witflag.com')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="site-shell">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
