import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export const metadata: Metadata = {
  title: {
    default: "HyperEVM Portal - Explore the Growing Ecosystem",
    template: "%s | HyperEVM Portal"
  },
  description: "Discover innovative projects building on HyperEVM. From DeFi protocols to NFT marketplaces, explore the future of decentralized applications with comprehensive project listings, analytics, and ecosystem insights.",
  keywords: [
    "HyperEVM",
    "blockchain",
    "DeFi",
    "NFT",
    "decentralized applications",
    "cryptocurrency",
    "smart contracts",
    "ecosystem",
    "Web3",
    "dApps"
  ],
  authors: [{ name: "HyperEVM Team" }],
  creator: "HyperEVM Foundation",
  publisher: "HyperEVM Portal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portal.hyperevm.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portal.hyperevm.org',
    title: 'HyperEVM Portal - Explore the Growing Ecosystem',
    description: 'Discover innovative projects building on HyperEVM. From DeFi protocols to NFT marketplaces, explore the future of decentralized applications.',
    siteName: 'HyperEVM Portal',
    images: [
      {
        url: 'https://hyperfoundation.org/landing/blob_green.gif',
        width: 1200,
        height: 630,
        alt: 'HyperEVM Portal - Ecosystem Explorer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyperEVM Portal - Explore the Growing Ecosystem',
    description: 'Discover innovative projects building on HyperEVM. From DeFi protocols to NFT marketplaces, explore the future of decentralized applications.',
    images: ['https://hyperfoundation.org/landing/blob_green.gif'],
    creator: '@HyperEVM',
    site: '@HyperEVM',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "https://hyperfoundation.org/landing/blob_green.gif", sizes: "32x32", type: "image/gif" },
      { url: "https://hyperfoundation.org/landing/blob_green.gif", sizes: "16x16", type: "image/gif" }
    ],
    shortcut: "https://hyperfoundation.org/landing/blob_green.gif",
    apple: [
      { url: "https://hyperfoundation.org/landing/blob_green.gif", sizes: "180x180", type: "image/gif" }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: "https://hyperfoundation.org/landing/blob_green.gif",
        color: '#000000',
      },
    ],
  },
  manifest: '/manifest.json',
  generator: 'Next.js',
  applicationName: 'HyperEVM Portal',
  referrer: 'origin-when-cross-origin',
  category: 'technology',
  classification: 'Blockchain Ecosystem Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://hyperfoundation.org" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://hyperfoundation.org" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://hyperfoundation.org/landing/blob_green.gif"
          as="image"
          type="image/gif"
        />
        
        {/* Additional meta tags for better mobile experience */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HyperEVM Portal" />
        <meta name="application-name" content="HyperEVM Portal" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "HyperEVM Portal",
              "description": "Explore the growing ecosystem of projects building on HyperEVM",
              "url": "https://portal.hyperevm.org",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://portal.hyperevm.org/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}