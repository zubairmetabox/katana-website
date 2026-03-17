import Link from 'next/link'
import Image from 'next/image'

const pageLinks = [
  { label: 'WHERE ARE WE', href: '/where-are-we' },
  { label: 'PRODUCT', href: '/products' },
  { label: 'CONTACT', href: '/contact' },
  { label: 'GUIDES', href: '/guides' },
  { label: 'ABOUT', href: '/about' },
  { label: 'HOME', href: '/' },
]

const socialLinks = [
  { label: 'INSTAGRAM', href: '#' },
  { label: 'FACEBOOK', href: '#' },
  { label: 'YOUTUBE', href: '#' },
  { label: 'TIKTOK', href: '#' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#014454] overflow-hidden">
      {/* Teal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#014454] via-[#014454] to-[#002a35] pointer-events-none" />

      <div className="relative max-w-[1366px] mx-auto px-8 pt-24 pb-16">
        {/* Headline */}
        <div className="text-center mb-8">
          <p className="font-futura-medium text-white text-[59px] leading-tight uppercase tracking-wide">
            WHEN{' '}
            <em className="font-cormorant not-italic italic text-white">INSTINCT</em>
          </p>
          <p className="font-futura-medium text-white text-[59px] leading-tight uppercase tracking-wide">
            MEETS{' '}
            <em className="font-cormorant not-italic italic text-white">INNOVATION</em>
          </p>
        </div>

        {/* Lure image — floats up */}
        <div className="flex justify-center -mt-8 mb-12 relative">
          <div className="relative w-[340px] h-[420px]">
            {/* Placeholder: replace src with actual lure image */}
            <div className="w-full h-full flex items-center justify-center text-white/20 text-sm font-futura-book">
              [Lure image]
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-3 gap-8 items-start">
          {/* Pages */}
          <div className="text-center">
            <p className="font-futura-demi text-white text-[10.31px] uppercase tracking-widest mb-6">
              PAGES
            </p>
            <ul className="flex flex-col gap-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-futura-bold text-white text-[25.57px] hover:text-[#00d9d0] transition-colors leading-tight block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: BECOME A RESELLER button */}
          <div className="flex items-end justify-center pb-4">
            <Link
              href="/become-a-reseller"
              className="font-futura-bold text-black text-sm uppercase tracking-widest bg-white rounded-full px-8 py-3 hover:bg-[#e9f1f6] transition-colors whitespace-nowrap"
            >
              BECOME A RESELLER
            </Link>
          </div>

          {/* Follow On */}
          <div className="text-center">
            <p className="font-futura-demi text-white text-[10.31px] uppercase tracking-widest mb-6">
              FOLLOW ON
            </p>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-futura-bold text-white text-[25.57px] hover:text-[#00d9d0] transition-colors leading-tight block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
