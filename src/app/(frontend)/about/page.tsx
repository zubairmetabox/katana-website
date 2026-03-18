import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'About',
  description:
    'KATANA was founded on a simple belief: that a superior process creates a superior product.',
}

export const revalidate = 60

async function getAboutPage() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'about-page', depth: 1 })
}

export default async function AboutPage() {
  const data = await getAboutPage()

  const heroImage = data.heroImage as Media | null | undefined
  const brandImage = data.brandImage as Media | null | undefined

  // Fall back to seeded local files if Blob not yet configured
  const heroSrc = heroImage?.url ?? '/seed-media/katana-about-fish-hero.jpg'
  const brandSrc = brandImage?.url ?? heroSrc

  const headline = data.heroHeadline ?? 'Every Edge Has a Story.'
  const brandHeading = data.brandHeading ?? 'A Sharper Perspective'
  const brandBody =
    data.brandBody ??
    'Katana was founded on a simple belief: that a superior process creates a superior product. We approach bait design from every angle, blending artistry with hydrodynamic science. Each lure is the result of meticulous engineering and relentless on-the-water testing, built not just to attract, but to provoke. Our mission is to craft tools of precision that instill confidence in every cast and trigger the most aggressive strikes.'

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

        {/* Fish / lure photo — right side, rotated */}
        {heroSrc && (
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
            <img
              src={heroSrc}
              alt={heroImage?.alt ?? 'Fish caught with a Katana lure'}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        {/* Headline + button */}
        <div className="relative z-10 max-w-[1366px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h1
            className="text-[#e9f1f6] leading-[1.08] mb-8 lg:mb-10"
            style={{ fontSize: 'clamp(42px, 6.5vw, 75px)', maxWidth: '520px' }}
          >
            {/* Split headline: Futura Medium / Cormorant alternating */}
            <span className="font-futura-medium">Every Edge</span>{' '}
            <span className="font-cormorant font-normal">Has</span>{' '}
            <span className="font-futura-medium">a</span>{' '}
            <span className="font-cormorant font-normal">Story</span>
            <span className="font-futura-medium">.</span>
          </h1>

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
          Desktop: text left, fish photo right
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
                {brandBody}
              </p>
            </div>

            {/* ── Right (desktop): brand image ── */}
            {brandSrc && (
              <div className="hidden lg:flex items-start justify-center pt-4">
                <div className="w-full max-w-[520px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brandSrc}
                    alt={brandImage?.alt ?? 'Fish caught with a Katana lure'}
                    className="w-full h-auto object-cover rounded"
                    style={{ aspectRatio: '3/4' }}
                  />
                </div>
              </div>
            )}

          </div>

          {/* ── Mobile: brand image below text, rotated ── */}
          {brandSrc && (
            <div className="lg:hidden mt-12 flex justify-center">
              <div
                className="w-[75%] max-w-[300px]"
                style={{ transform: 'rotate(-11.2deg)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brandSrc}
                  alt={brandImage?.alt ?? 'Fish caught with a Katana lure'}
                  className="w-full h-auto object-cover rounded"
                  style={{ aspectRatio: '300/535' }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
