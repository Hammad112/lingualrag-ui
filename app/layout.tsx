import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LingualRAG - Multilingual AI-Powered Document Understanding',
  description: 'Advanced RAG system for multilingual document retrieval and intelligent conversation in any language.',
  keywords: ['RAG', 'AI', 'Multilingual', 'Document Understanding', 'LLM', 'Search'],
  authors: [{ name: 'LingualRAG Team' }],
  icons: {
    icon: [
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'LingualRAG',
    description: 'Advanced RAG system for multilingual document retrieval',
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: 'LingualRAG',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} font-sans antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
