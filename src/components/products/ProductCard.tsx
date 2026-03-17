import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  name: string
  slug: string
  tagline?: string
  heroImage?: {
    url?: string
    alt?: string
  }
  className?: string
}

export function ProductCard({ name, slug, tagline, heroImage, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className={cn(
        'group block rounded-[10px] overflow-hidden bg-[#014454] hover:scale-[1.02] transition-transform duration-300',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#002a35]">
        {heroImage?.url ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 font-futura-book text-sm">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        {tagline && (
          <p className="font-cormorant font-bold text-white text-[18px] mb-1 uppercase tracking-wider">
            {tagline}
          </p>
        )}
        <h3 className="font-futura-demi text-white text-[22px] uppercase tracking-wide">
          {name}
        </h3>
        <p className="font-futura-book text-[#00d9d0] text-sm mt-2 uppercase tracking-widest group-hover:underline">
          View More →
        </p>
      </div>
    </Link>
  )
}
