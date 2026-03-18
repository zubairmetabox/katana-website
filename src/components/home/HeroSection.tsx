'use client'

import { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'

const HERO_VIDEO_URL = '/video-hero/katana-hero-scrub-31s.mp4'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })

  useEffect(() => {
    let rafId = 0
    let latestProgress = 0

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      latestProgress = progress
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const video = videoRef.current
        if (!video || !video.duration) return
        const target = latestProgress * video.duration
        // fastSeek is less precise but dramatically smoother for scrubbing
        if (typeof video.fastSeek === 'function') {
          video.fastSeek(target)
        } else {
          video.currentTime = target
        }
      })
    })

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId)
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
