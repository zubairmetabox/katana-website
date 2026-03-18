'use client'

import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'

const HERO_VIDEO_URL = '/video-hero/katana-hero-scrub-31s.mp4'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Target time we want the video at — updated on every scroll event
    let targetTime = 0
    // Whether the video decoder is currently processing a seek
    let isSeeking = false

    function seek(time: number) {
      if (!video || !video.duration) return
      // Clamp and snap to nearest frame boundary (30 fps) to avoid jitter
      const fps = 30
      const clamped = Math.max(0, Math.min(time, video.duration))
      const snapped = Math.round(clamped * fps) / fps

      // Skip if change is less than one frame — avoids pointless re-decodes
      if (Math.abs(snapped - video.currentTime) < 1 / fps) return

      isSeeking = true
      video.currentTime = snapped
    }

    function onSeeked() {
      isSeeking = false
      // If scroll moved while we were decoding, seek to latest position now
      if (Math.abs(targetTime - video!.currentTime) > 1 / 30) {
        seek(targetTime)
      }
    }

    video.addEventListener('seeked', onSeeked)

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (!video.duration) return
      targetTime = progress * video.duration
      // Only issue a seek if the decoder is free
      if (!isSeeking) seek(targetTime)
    })

    return () => {
      unsubscribe()
      video.removeEventListener('seeked', onSeeked)
    }
  }, [scrollYProgress])

  return (
    <div
      ref={containerRef}
      className="relative h-[1200vh]"
    >
      <div className="sticky top-0 h-[100svh] bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="w-full max-w-[900px] max-h-[80vh] object-contain"
          muted
          playsInline
          preload="auto"
          onCanPlay={(e) => { e.currentTarget.pause() }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
