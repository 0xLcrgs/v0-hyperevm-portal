import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HyperEVM Portal",
  description: "Explore the growing ecosystem of projects building on HyperEVM",
  metadataBase: new URL("https://hyperevm-portal.vercel.app/"),
  openGraph: {
    url: "https://hyperevm-portal.vercel.app/",
    type: "website",
    title: "HyperEVM Portal",
    description: "Explore the growing ecosystem of projects building on HyperEVM",
    images: [
      {
        url: "https://hyperfoundation.org/landing/blob_green.gif",
        width: 1200,
        height: 630,
        alt: "HyperEVM Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperEVM Portal",
    description: "Explore the growing ecosystem of projects building on HyperEVM",
    images: ["https://hyperfoundation.org/landing/blob_green.gif"],
  },
  icons: {
    icon: "https://hyperfoundation.org/landing/blob_green.gif",
    shortcut: "https://hyperfoundation.org/landing/blob_green.gif",
    apple: "https://hyperfoundation.org/landing/blob_green.gif",
  },
    generator: 'v0.app'
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
