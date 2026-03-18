import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'KATANA was founded on a simple belief: that a superior process creates a superior product.',
}

export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — teal gradient, headline, rotated lure image
          Figma 3:330 (desktop) / 3:1225 (mobile)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-[#007f8d] to-[#015564] pt-[45px] lg:pt-[77px]"
        style={{ minHeight: 'clamp(600px, 70vw, 930px)' }}
      >
        {/* KATANA watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-futura-heavy text-white/10 text-[clamp(80px,18vw,260px)] uppercase leading-none tracking-tighter">
            KATANA
          </span>
        </div>

        {/* Lure / product photo — right side, rotated, CMS image */}
        {/* Desktop: large, bleeds right edge; mobile: smaller, centered-right */}
        <div
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            right: 'clamp(-120px, -5vw, -40px)',
            top: 'clamp(60px, 8vw, 160px)',
            width: 'clamp(280px, 45vw, 680px)',
            transform: 'rotate(-14.5deg)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div
            className="w-full bg-white/5 rounded"
            style={{ aspectRatio: '800/1422' }}
          >
            <div className="w-full h-full flex items-center justify-center text-white/10 font-futura-book text-xs">
              [Lure photo — upload via CMS]
            </div>
          </div>
        </div>

        {/* Headline + button */}
        <div className="relative z-10 max-w-[1366px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          {/* Headline — Futura Medium + Cormorant Regular for "Has" / "Story" */}
          <h1
            className="text-[#e9f1f6] leading-[1.08] mb-8 lg:mb-10"
            style={{ fontSize: 'clamp(42px, 6.5vw, 75px)', maxWidth: '520px' }}
          >
            <span className="font-futura-medium">Every Edge</span>{' '}
            <span className="font-cormorant font-normal">Has</span>{' '}
            <span className="font-futura-medium">a</span>{' '}
            <span className="font-cormorant font-normal">Story</span>
            <span className="font-futura-medium">.</span>
          </h1>

          {/* "Contact us" — glass pill from Figma */}
          <Link
            href="/contact"
            className="inline-block font-futura-bold text-[#e9f1f6] uppercase rounded-[4px] px-5 py-[6px] hover:bg-white/20 transition-colors"
            style={{
              fontSize: 'clamp(14px, 1.8vw, 22px)',
              background: 'rgba(217,217,217,0.20)',
            }}
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BRAND STORY — light blue #b3d4e3
          Desktop: text left, fish photo right (overflows from hero)
          Mobile:  text full-width, fish photo below rotated
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#b3d4e3] overflow-hidden">
        <div className="max-w-[1366px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* ── Left: heading + body ── */}
            <div>
              <h2
                className="font-futura-medium text-[#014454] leading-[1.05] mb-8 lg:mb-10"
                style={{ fontSize: 'clamp(42px, 7vw, 87px)' }}
              >
                A{' '}
                <span className="font-cormorant font-bold">Sharper</span>{' '}
                Perspective
              </h2>

              <p
                className="font-futura-book text-[#014454] text-justify leading-relaxed"
                style={{ fontSize: 'clamp(16px, 1.8vw, 25px)' }}
              >
                Katana was founded on a simple belief: that a superior process
                creates a superior product. We approach bait design from every
                angle, blending artistry with hydrodynamic science. Each lure is
                the result of meticulous engineering and relentless on-the-water
                testing, built not just to attract, but to provoke. Our mission
                is to craft tools of precision that instill confidence in every
                cast and trigger the most aggressive strikes.
              </p>
            </div>

            {/* ── Right (desktop): fish / lure photo ── */}
            {/* Mobile: hidden here, shown below rotated */}
            <div className="hidden lg:flex items-start justify-center pt-4">
              <div className="w-full max-w-[520px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div
                  className="w-full rounded bg-[#014454]/10 flex items-center justify-center font-futura-book text-[#014454]/30 text-sm"
                  style={{ aspectRatio: '3/4' }}
                >
                  [Fish / lure photo — upload via CMS]
                </div>
              </div>
            </div>

          </div>

          {/* ── Mobile: fish photo below text, rotated ── */}
          <div className="lg:hidden mt-12 flex justify-center">
            <div
              className="w-[75%] max-w-[300px]"
              style={{ transform: 'rotate(-11.2deg)' }}
            >
              <div
                className="w-full rounded bg-[#014454]/10 flex items-center justify-center font-futura-book text-[#014454]/30 text-xs"
                style={{ aspectRatio: '300/535' }}
              >
                [Fish photo]
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
