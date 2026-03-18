import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getGuideBySlug, getGuides } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const guides = await getGuides()
    return guides.map((g) => ({ slug: g.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)
  if (!guide) return { title: 'Guide Not Found' }
  return {
    title: guide.title,
    description: guide.excerpt ?? `KATANA guide: ${guide.title}`,
  }
}

export const revalidate = 60

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)
  if (!guide) notFound()

  const heroImage = typeof guide.heroImage === 'object' ? guide.heroImage as any : null

  return (
    <>
      {/* ── Hero image ── */}
      {heroImage?.url && (
        <section className="relative h-[500px] overflow-hidden pt-[77px]">
          <Image
            src={heroImage.url}
            alt={heroImage.alt || guide.title}
            fill
            className="object-cover"
            priority
            placeholder={(heroImage as any).blurDataURL ? 'blur' : 'empty'}
            blurDataURL={(heroImage as any).blurDataURL ?? undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        </section>
      )}

      {/* ── Article body ── */}
      <section className="bg-[#014454] py-20 px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Type badge */}
          <span className="inline-block font-futura-demi text-[#00d9d0] text-sm uppercase tracking-widest mb-4">
            {guide.type}
          </span>

          {/* Title */}
          <h1 className="font-futura-demi text-white text-[56px] leading-tight mb-6">
            {guide.title}
          </h1>

          {/* Date */}
          {guide.publishedAt && (
            <p className="font-futura-book text-[#a1d4e1] text-[16px] mb-8">
              {formatDate(guide.publishedAt)}
            </p>
          )}

          {/* Excerpt */}
          {guide.excerpt && (
            <p className="font-futura-book text-[#d3d0c9] text-[20px] leading-relaxed mb-10 border-l-4 border-[#00d9d0] pl-6">
              {guide.excerpt}
            </p>
          )}

          {/* Content: Lexical rich text placeholder */}
          <div className="font-futura-book text-[#d3d0c9] text-[20px] leading-relaxed prose prose-invert max-w-none">
            {/* TODO: render Payload Lexical rich text here */}
            <p>Full article content will appear here once rendered from Payload Lexical.</p>
          </div>
        </div>
      </section>
    </>
  )
}
