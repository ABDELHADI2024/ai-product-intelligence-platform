import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Witflag — AI Product Intelligence Platform",
  description:
    "AI-native product intelligence platform for semantic search, recommendations, comparisons, and consumer tech discovery."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
