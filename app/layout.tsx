import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageLoader } from '@/components/page-loader'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Henmasi Trading Enterprise | Industrial Electrical Supplies',
  description: 'Your trusted partner for industrial electrical supplies in Accra, Ghana. Quality cables, switches, circuit breakers, and more.',
  keywords: ['electrical supplies', 'industrial electronics', 'Ghana', 'Accra', 'cables', 'switches', 'circuit breakers'],
  verification: {
    google: "google777ed45b5738a583.html",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <PageLoader />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
