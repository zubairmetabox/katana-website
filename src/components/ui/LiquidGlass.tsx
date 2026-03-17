'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Generates a radial displacement map where:
 *  - Center pixels: R=128, G=128 → no displacement (neutral)
 *  - Edge pixels: deviate from 128 based on the outward normal
 *    → convex-lens refraction, bending background inward at the glass edges
 */
function buildDisplacementMap(width: number, height: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(width, height)
  const d = img.data

  const cx = width / 2
  const cy = height / 2

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = (x - cx) / (cx || 1)   // –1 … +1
      const ny = (y - cy) / (cy || 1)
      const dist = Math.min(1, Math.hypot(nx, ny))
      const power = dist ** 2.5           // ramp up toward edge
      const mag = Math.max(0.001, dist)

      // Pull source pixels toward center → convex glass edge bending
      const r = 128 - (nx / mag) * power * 80
      const g = 128 - (ny / mag) * power * 80

      const i = (y * width + x) * 4
      d[i]     = Math.round(Math.max(0, Math.min(255, r)))
      d[i + 1] = Math.round(Math.max(0, Math.min(255, g)))
      d[i + 2] = 128
      d[i + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL()
}

interface LiquidGlassProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Backdrop blur in px (also used inside SVG filter). Default 24. */
  blur?: number
  /** Refraction displacement strength in px. Default 32. */
  strength?: number
}

/**
 * Apple-style Liquid Glass wrapper.
 *
 * Uses SVG feDisplacementMap on the backdrop for refraction (Chromium),
 * with a graceful CSS-only glassmorphism fallback for Safari / Firefox.
 */
export function LiquidGlass({
  children,
  className = '',
  style,
  blur = 24,
  strength = 32,
}: LiquidGlassProps) {
  const rawId = useId()
  const filterId = `lg-${rawId.replace(/:/g, 'x')}`
  const [dispUrl, setDispUrl] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    if (width > 0 && height > 0) {
      setDispUrl(buildDisplacementMap(Math.round(width), Math.round(height)))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* ── SVG filter definition (hidden) ─────────────────────────── */}
      <svg
        width={0}
        height={0}
        aria-hidden
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <defs>
          <filter
            id={filterId}
            x="0%" y="0%"
            width="100%" height="100%"
            colorInterpolationFilters="sRGB"
          >
            {/* 1. Optional displacement map for refraction */}
            {dispUrl && (
              <feImage
                href={dispUrl}
                x="0" y="0"
                width="100%" height="100%"
                preserveAspectRatio="none"
                result="map"
              />
            )}

            {/* 2. Displace backdrop pixels (creates the lens bend) */}
            <feDisplacementMap
              in="SourceGraphic"
              in2={dispUrl ? 'map' : 'SourceGraphic'}
              scale={dispUrl ? strength : 0}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            {/* 3. Blur */}
            <feGaussianBlur
              in="displaced"
              stdDeviation={blur}
              result="blurred"
            />

            {/* 4. Boost saturation for the vivid glass tint */}
            <feColorMatrix
              in="blurred"
              type="saturate"
              values="1.9"
              result="saturated"
            />

            {/* 5. Subtle brightness lift */}
            <feComponentTransfer in="saturated">
              <feFuncR type="linear" slope="1.08" />
              <feFuncG type="linear" slope="1.08" />
              <feFuncB type="linear" slope="1.08" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* ── Dark base — guarantees content is always legible ─────────── */}
      <div className="absolute inset-0" style={{ background: 'rgba(4, 18, 24, 0.55)' }} />

      {/* ── Backdrop layer (refraction + blur) ─────────────────────── */}
      {/*   Chromium: full SVG filter with displacement                */}
      {/*   Safari / Firefox: plain CSS backdrop-filter fallback       */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `url(#${filterId})`,
          /* Safari / Firefox graceful degradation */
          WebkitBackdropFilter: `blur(${blur}px) saturate(160%) brightness(0.65)`,
        }}
      />

      {/* ── Glass tint (diagonal white gradient) ───────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.09) 100%)',
        }}
      />

      {/* ── Specular top-edge highlight ─────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '45%',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* ── Bottom edge micro-glow ──────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '18%',
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* ── Inset border + outer drop shadow ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 0 0.5px rgba(255,255,255,0.45), 0 8px 32px rgba(0,0,0,0.35)',
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  )
}
