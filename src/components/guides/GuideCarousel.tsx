'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Guide {
  id: string
  title: string
  slug: string
  type: string
  excerpt?: string
  carouselImage?: { url?: string; alt?: string; blurDataURL?: string | null } | null
}

interface GuideCarouselProps {
  guides: Guide[]
}

const typeLabels: Record<string, string> = {
  technique: 'TECHNIQUE',
  biology: 'BIOLOGY',
  gear: 'GEAR',
  video: 'VIDEO',
}

export function GuideCarousel({ guides }: GuideCarouselProps) {
  const [current, setCurrent] = useState(0)

  if (guides.length === 0) {
    return (
      <div className="py-20 text-center text-white/40 font-futura-book">
        No guides yet — add some in the CMS.
      </div>
    )
  }

  const prev = () => setCurrent((c) => (c === 0 ? guides.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === guides.length - 1 ? 0 : c + 1))

  const guide = guides[current]!

  return (
    <div className="relative w-full min-h-[600px] flex">
      <AnimatePresence mode="wait">
        <motion.div
          key={guide.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="flex w-full"
        >
          {/* Left: carousel image (60%) */}
          <div className="relative w-[60%] min-h-[600px] overflow-hidden rounded-[10px]">
            {guide.carouselImage?.url ? (
              <Image
                src={guide.carouselImage.url}
                alt={guide.carouselImage.alt || guide.title}
                fill
                className="object-cover"
                priority
                placeholder={guide.carouselImage.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={guide.carouselImage.blurDataURL ?? undefined}
              />
            ) : (
              <div className="absolute inset-0 bg-[#002a35] flex items-center justify-center text-white/20 font-futura-book text-sm">
                [Carousel image]
              </div>
            )}
          </div>

          {/* Right: text (40%) */}
          <div className="w-[40%] flex flex-col justify-center px-12 py-8">
            {/* Type badge */}
            <span className="inline-block font-futura-demi text-[#00d9d0] text-sm uppercase tracking-widest mb-6">
              {typeLabels[guide.type] ?? guide.type.toUpperCase()}
            </span>

            {/* Title */}
            <h2 className="font-futura-demi text-[#d3d0c9] text-[63px] leading-tight mb-6">
              {guide.title.split(' ').map((word, i) => {
                // Italicize any word that looks like it needs emphasis (e.g., last word)
                return (
                  <span key={i}>
                    {i > 0 ? ' ' : ''}
                    {word}
                  </span>
                )
              })}
            </h2>

            {/* Excerpt */}
            {guide.excerpt && (
              <p className="font-futura-book text-[#d3d0c9] text-[20px] leading-relaxed mb-8">
                {guide.excerpt}
              </p>
            )}

            {/* Read More */}
            <Link
              href={`/guides/${guide.slug}`}
              className="font-futura-bold text-white text-sm uppercase tracking-widest hover:text-[#00d9d0] transition-colors"
            >
              Read More →
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows + dots */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <button
          onClick={prev}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous guide"
        >
          <ChevronUp size={20} className="text-white" />
        </button>

        {/* Dot indicators */}
        <div className="flex flex-col gap-2">
          {guides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-[#00d9d0] scale-125' : 'bg-white/30'
              }`}
              aria-label={`Go to guide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next guide"
        >
          <ChevronDown size={20} className="text-white" />
        </button>
      </div>
    </div>
  )
}
