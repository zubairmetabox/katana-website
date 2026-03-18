import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/queries'
import { ProductCard } from '@/components/products/ProductCard'

export const metadata: Metadata = {
  title: 'Products',
  description: 'The Proven Edge — explore the full KATANA fishing lure collection.',
}

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts().catch(() => [])
  const featured = products.find((p) => p.featured) ?? products[0]

  return (
    <>
      {/* ── Hero: teal bg, featured product ── */}
      <section className="relative min-h-[700px] bg-[#014454] pt-[77px] overflow-hidden">
        <div className="max-w-[1366px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 min-h-[620px]">
          {/* Left text */}
          <div>
            <h1 className="font-futura-heavy text-white text-[91px] leading-tight mb-6">
              The{' '}
              <span className="font-cormorant font-semibold italic">Proven</span>{' '}
              Edge.
            </h1>

            {featured && (
              <>
                <p className="font-cormorant font-bold text-white text-[28px] uppercase mb-4">
                  {featured.tagline || featured.name}
                </p>
                <Link
                  href={`/products/${featured.slug}`}
                  className="inline-block font-futura-demi text-white text-[24px] uppercase tracking-widest
                    bg-white/10 border border-white/30 rounded-[4px] px-5 py-2 hover:bg-white/20 transition-colors"
                >
                  View More
                </Link>
              </>
            )}
          </div>

          {/* Right: featured product on pedestal */}
          <div className="flex justify-center items-center h-[400px] relative">
            {featured && typeof featured.heroImage === 'object' && featured.heroImage?.url ? (
              <Image
                src={(featured.heroImage as any).url}
                alt={(featured.heroImage as any).alt || featured.name}
                fill
                className="object-contain"
                placeholder={(featured.heroImage as any).blurDataURL ? 'blur' : 'empty'}
                blurDataURL={(featured.heroImage as any).blurDataURL ?? undefined}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 font-futura-book text-sm">
                [Featured product image]
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Product grid: teal-to-dark gradient ── */}
      <section className="bg-gradient-to-b from-[#00d9d0] to-[#133f4a] py-20 px-8">
        {products.length === 0 ? (
          <div className="max-w-[1366px] mx-auto text-center py-20">
            <p className="font-futura-book text-white/60 text-lg">
              No products yet — add some in the CMS.
            </p>
          </div>
        ) : (
          <div className="max-w-[1366px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                name={product.name}
                slug={product.slug}
                tagline={product.tagline ?? undefined}
                heroImage={
                  typeof product.heroImage === 'object'
                    ? {
                        url: (product.heroImage as any)?.url,
                        alt: (product.heroImage as any)?.alt,
                      }
                    : undefined
                }
                className={i % 3 === 1 ? 'mt-8' : ''}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
