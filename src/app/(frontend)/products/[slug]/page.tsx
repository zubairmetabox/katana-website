import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/queries'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.tagline ?? `KATANA ${product.name} fishing lure`,
  }
}

export const revalidate = 60

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const heroImage = typeof product.heroImage === 'object' ? product.heroImage as any : null
  const gallery = Array.isArray(product.galleryImages) ? product.galleryImages : []

  return (
    <>
      {/* ── Hero: teal-to-dark gradient, KATANA watermark, lure image ── */}
      {/* PLACEHOLDER: will be replaced by Three.js 3D model */}
      <section className="relative min-h-[700px] bg-gradient-to-b from-[#00d9d0] to-[#133f4a] pt-[77px] overflow-hidden">
        {/* KATANA watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span className="font-futura-heavy text-white/10 text-[22vw] uppercase leading-none tracking-tighter">
            KATANA
          </span>
        </div>

        <div className="relative max-w-[1366px] mx-auto px-8 py-16 flex flex-col lg:flex-row items-center gap-8 min-h-[600px]">
          {/* Left text */}
          <div className="lg:w-1/3">
            <p className="font-futura-demi text-white text-[16px] uppercase tracking-widest mb-3">
              PRODUCT NAME
            </p>
            <h1 className="font-futura-heavy text-white text-[48px] leading-tight mb-4">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="font-cormorant font-bold text-white text-[28px]">{product.tagline}</p>
            )}
          </div>

          {/* Center: lure image */}
          <div className="flex-1 flex justify-center items-center h-[400px] relative">
            {heroImage?.url ? (
              <Image
                src={heroImage.url}
                alt={heroImage.alt || product.name}
                fill
                className="object-contain"
                priority
                placeholder={(heroImage as any).blurDataURL ? 'blur' : 'empty'}
                blurDataURL={(heroImage as any).blurDataURL ?? undefined}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 font-futura-book text-sm">
                [Hero lure image]
              </div>
            )}
          </div>

          {/* Right: description excerpt */}
          {product.tagline && (
            <div className="lg:w-1/4">
              <p className="font-futura-book text-white text-[21px] leading-relaxed">
                {product.tagline}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Specs section ── */}
      <section className="bg-gradient-to-b from-[#133f4a] to-[#014454] py-20 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: specs table */}
          <div>
            <div className="border-b border-white/10 py-6 grid grid-cols-[200px_1fr] gap-4">
              <span className="font-futura-book text-[#dadada] text-[21px]">Measurement range</span>
              <span className="font-futura-book text-[#dadada] text-[21px]">
                {product.measurementRange ?? '—'}
              </span>
            </div>

            <div className="border-b border-white/10 py-6 grid grid-cols-[200px_1fr] gap-4">
              <span className="font-futura-book text-black text-[21px]">Product Description</span>
              <span className="font-futura-book text-white text-[21px] leading-relaxed">
                {/* Lexical rich text would be rendered here */}
                {product.tagline ?? 'Full description coming soon.'}
              </span>
            </div>

            <div className="border-b border-white/10 py-6 grid grid-cols-[200px_1fr] gap-4 items-start">
              <span className="font-futura-book text-[#dadada] text-[21px]">Fish Attract</span>
              <div className="flex flex-wrap gap-3">
                {product.fishAttract && product.fishAttract.length > 0 ? (
                  product.fishAttract.map((f: { name?: string | null }, i) => (
                    <span key={i} className="font-futura-book text-white text-[21px]">
                      {f.name}
                    </span>
                  ))
                ) : (
                  <span className="font-futura-book text-[#dadada] text-[21px]">—</span>
                )}
              </div>
            </div>

            <div className="border-b border-white/10 py-6 grid grid-cols-[200px_1fr] gap-4">
              <span className="font-futura-book text-[#dadada] text-[21px]">Dimension</span>
              <span className="font-futura-book text-[#dadada] text-[21px]">
                {product.dimensions ?? '—'}
              </span>
            </div>

            <div className="py-6 grid grid-cols-[200px_1fr] gap-4 items-center">
              <span className="font-futura-book text-[#dadada] text-[21px]">Color</span>
              <div className="flex gap-2">
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((c: { hex?: string | null; name?: string | null }, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: c.hex ?? '#888' }}
                      title={c.name ?? undefined}
                    />
                  ))
                ) : (
                  <span className="font-futura-book text-[#dadada] text-[21px]">—</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: second lure image */}
          <div className="flex justify-center items-center h-[500px] relative">
            {gallery[0] && typeof gallery[0].image === 'object' && (gallery[0].image as any)?.url ? (
              <Image
                src={(gallery[0].image as any).url}
                alt={(gallery[0].image as any).alt || product.name}
                fill
                className="object-contain"
                placeholder={(gallery[0].image as any).blurDataURL ? 'blur' : 'empty'}
                blurDataURL={(gallery[0].image as any).blurDataURL ?? undefined}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 font-futura-book text-sm">
                [Gallery image]
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
