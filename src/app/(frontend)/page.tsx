import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'

export const metadata: Metadata = {
  title: 'KATANA Fishing Lures — When Instinct Meets Innovation',
  description:
    'Premium fishing lures engineered in Mauritius. Designed to provoke the most aggressive strikes.',
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero: scroll-scrubbed video ── */}
      <HeroSection />

      {/* ── Brand section: teal gradient ── */}
      <section className="relative bg-gradient-to-b from-[#014454] to-[#002a35] py-24 px-8 overflow-hidden">
        {/* Background lure silhouette */}
        <div className="absolute inset-0 bg-[#014454]/50 pointer-events-none" />

        <div className="relative max-w-[1366px] mx-auto text-center">
          {/* Headline */}
          <h2 className="font-futura-medium text-white text-[59px] leading-tight uppercase mb-2">
            WHEN{' '}
            <em className="font-cormorant not-italic italic">INSTINCT</em>
          </h2>
          <h2 className="font-futura-medium text-white text-[59px] leading-tight uppercase">
            MEETS{' '}
            <em className="font-cormorant not-italic italic">INNOVATION</em>
          </h2>

          {/* Lure image */}
          <div className="flex justify-center mt-8 mb-6">
            <div className="relative w-[300px] h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-futura-book text-sm">
                [Brand lure image]
              </div>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-block font-futura-bold text-black text-sm uppercase tracking-widest bg-white rounded-full px-8 py-3 hover:bg-[#e9f1f6] transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </>
  )
}
