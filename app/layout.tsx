import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// The idb package will be automatically imported by next-lite

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HyperEVM Portal",
  description: "Explore the growing ecosystem of projects building on HyperEVM",
  icons: {
    icon: "https://hyperfoundation.org/landing/blob_green.gif",
    shortcut: "https://hyperfoundation.org/landing/blob_green.gif",
    apple: "https://hyperfoundation.org/landing/blob_green.gif",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
