import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import '@/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | KATANA Fishing Lures',
    default: 'KATANA Fishing Lures — When Instinct Meets Innovation',
  },
  description:
    'Premium fishing lures engineered in Mauritius. KATANA lures are designed for precision, built for the hunt.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://katana-website.vercel.app',
  ),
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
