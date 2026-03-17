import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getGuides } from '@/lib/queries'
import { GuideCarousel } from '@/components/guides/GuideCarousel'
import { GuideFilters } from '@/components/guides/GuideFilters'

export const metadata: Metadata = {
  title: 'Guides',
  description: 'KATANA fishing guides — techniques, biology, gear advice and more.',
}

export const revalidate = 60

type SearchParams = Promise<{ type?: string; q?: string }>

export default async function GuidesPage({ searchParams }: { searchParams: SearchParams }) {
  const { type, q } = await searchParams

  const allGuides = await getGuides().catch(() => [])

  // Filter client-side (search + type)
  const filtered = allGuides.filter((guide) => {
    const matchesType = !type || type === 'All' || guide.type.toLowerCase() === type.toLowerCase()
    const matchesSearch =
      !q ||
      guide.title.toLowerCase().includes(q.toLowerCase()) ||
      (guide.excerpt ?? '').toLowerCase().includes(q.toLowerCase())
    return matchesType && matchesSearch
  })

  const carouselGuides = filtered.map((g) => ({
    id: String(g.id),
    title: g.title,
    slug: g.slug,
    type: g.type,
    excerpt: g.excerpt ?? undefined,
    carouselImage:
      g.carouselImage && typeof g.carouselImage === 'object'
        ? { url: (g.carouselImage as any).url, alt: (g.carouselImage as any).alt }
        : null,
  }))

  return (
    <>
      {/* ── Hero: underwater lure banner ── */}
      <section className="relative min-h-[1000px] overflow-hidden pt-[77px] bg-[#003a47]">
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#003a47] to-[#001820]" />

        <div className="relative max-w-[1366px] mx-auto px-8 py-20">
          <h1 className="font-futura-demi text-white text-[87px] leading-none mb-6">
            Guides
          </h1>
          <p className="font-futura-book text-[#a1d4e1] text-[20px] leading-relaxed max-w-[312px]">
            Expert tips, biology insights, and gear guides to help you fish smarter.
          </p>
        </div>
      </section>

      {/* ── Filters + Carousel ── */}
      <section className="bg-[#014454] py-16 px-8">
        <div className="max-w-[1366px] mx-auto">
          <Suspense>
            <GuideFilters />
          </Suspense>

          {/* Vertical carousel */}
          <div className="pr-20">
            <GuideCarousel guides={carouselGuides} />
          </div>
        </div>
      </section>
    </>
  )
}
