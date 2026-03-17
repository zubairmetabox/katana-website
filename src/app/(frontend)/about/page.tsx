import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'KATANA was founded on a simple belief: that a superior process creates a superior product.',
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero: teal gradient ── */}
      <section className="relative min-h-[640px] overflow-hidden bg-gradient-to-b from-[#007f8d] to-[#015564] pt-[77px]">
        {/* KATANA watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span className="font-futura-heavy text-white/10 text-[22vw] uppercase leading-none tracking-tighter">
            KATANA
          </span>
        </div>

        <div className="relative max-w-[1366px] mx-auto px-8 py-16 flex items-start gap-8">
          {/* Left text */}
          <div className="flex-1">
            <h1 className="font-futura-medium text-[#e9f1f6] text-[75px] leading-tight mb-8">
              Every Edge{' '}
              <span className="font-cormorant">Has</span>{' '}
              a{' '}
              <span className="font-cormorant">Story</span>.
            </h1>

            <Link
              href="/contact"
              className="inline-block font-futura-bold text-[#e9f1f6] text-[18px] uppercase tracking-widest
                bg-white/10 border border-white/30 rounded-[4px] px-5 py-2 hover:bg-white/20 transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* Right: fish lure image (placeholder) */}
          <div className="hidden lg:block flex-shrink-0 w-[400px] h-[500px] relative">
            <div className="w-full h-full flex items-center justify-center text-white/20 font-futura-book text-sm">
              [Lure image — upload via CMS]
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand story: light blue ── */}
      <section className="bg-[#b3d4e3] py-24 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading + body */}
          <div>
            <h2 className="font-futura-medium text-[#014454] text-[87px] leading-tight mb-10">
              A{' '}
              <span className="font-cormorant font-bold">Sharper</span>{' '}
              Perspective
            </h2>
            <p className="font-futura-book text-[#014454] text-[25px] text-justify leading-relaxed">
              Katana was founded on a simple belief: that a superior process creates a superior
              product. We approach bait design from every angle, blending artistry with
              hydrodynamic science. Each lure is the result of meticulous engineering and
              relentless on-the-water testing, built not just to attract, but to provoke. Our
              mission is to craft tools of precision that instill confidence in every cast and
              trigger the most aggressive strikes.
            </p>
          </div>

          {/* Right: lure image */}
          <div className="flex justify-center items-center h-[500px] relative">
            <div className="w-full h-full flex items-center justify-center text-[#014454]/30 font-futura-book text-sm">
              [Lure / fish image — upload via CMS]
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
