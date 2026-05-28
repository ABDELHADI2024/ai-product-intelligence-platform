import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s — ProductIntel",
    default: "ProductIntel — AI-Powered Product Intelligence",
  },
  description:
    "Discover, compare, and choose the best tech with AI-powered product intelligence. Smart rankings, side-by-side comparisons, and personalized recommendations.",
  openGraph: {
    type: "website",
    siteName: "ProductIntel",
    locale: "en_US",
    title: "ProductIntel — AI-Powered Product Intelligence",
    description:
      "Discover, compare, and choose the best tech with AI-powered product intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductIntel — AI-Powered Product Intelligence",
    description:
      "Discover, compare, and choose the best tech with AI-powered product intelligence.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-black text-zinc-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
