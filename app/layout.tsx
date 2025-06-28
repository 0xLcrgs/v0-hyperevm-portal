import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "HyperEVM Portal - Discover the Growing Ecosystem",
  description: "Explore innovative projects, DeFi protocols, NFT marketplaces, and infrastructure tools building on HyperEVM. Discover the future of decentralized applications.",
  keywords: ["HyperEVM", "DeFi", "NFT", "blockchain", "ecosystem", "dApps", "cryptocurrency"],
  authors: [{ name: "HyperEVM Team" }],
  creator: "HyperEVM",
  publisher: "HyperEVM",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portal.hyperevm.org",
    title: "HyperEVM Portal - Discover the Growing Ecosystem",
    description: "Explore innovative projects building on HyperEVM",
    siteName: "HyperEVM Portal",
    images: [
      {
        url: "https://hyperfoundation.org/landing/blob_green.gif",
        width: 1200,
        height: 630,
        alt: "HyperEVM Portal"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperEVM Portal - Discover the Growing Ecosystem",
    description: "Explore innovative projects building on HyperEVM",
    images: ["https://hyperfoundation.org/landing/blob_green.gif"]
  },
  icons: {
    icon: [
      { url: "https://hyperfoundation.org/landing/blob_green.gif", sizes: "32x32" },
      { url: "https://hyperfoundation.org/landing/blob_green.gif", sizes: "16x16" }
    ],
    shortcut: "https://hyperfoundation.org/landing/blob_green.gif",
    apple: "https://hyperfoundation.org/landing/blob_green.gif",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover"
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  generator: 'Next.js',
  applicationName: 'HyperEVM Portal',
  referrer: 'origin-when-cross-origin',
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://hyperfoundation.org" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://hyperfoundation.org" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="https://hyperfoundation.org/landing/blob_green.gif" 
          as="image"
          type="image/gif"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}