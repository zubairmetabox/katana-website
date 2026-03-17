'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileMenu } from './MobileMenu'

const desktopLinks = [
  { label: 'HOME', href: '/' },
  { label: 'PRODUCT', href: '/products' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[77px] transition-all duration-300',
          scrolled ? 'backdrop-blur-md bg-black/20' : 'bg-transparent',
        )}
      >
        <div className="relative flex items-center justify-between h-full px-6 max-w-[1366px] mx-auto">
          {/* Left: burger + desktop left links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center w-[47px] h-[34px] rounded-[15px] bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={18} className="text-white" />
            </button>

            {/* Desktop left nav links */}
            <nav className="hidden lg:flex items-center gap-10">
              {desktopLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-[20px] text-[#e9f1f6] hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: KATANA Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="relative h-[43px] w-[182px]">
              {/* Fallback text logo until SVG file is placed in /public/images/ */}
              <span className="font-futura-heavy text-white text-[28px] tracking-[0.25em] uppercase">
                KATANA
              </span>
            </div>
          </Link>

          {/* Right: desktop right links + cart icon */}
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-10">
              {desktopLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-[20px] text-[#e9f1f6] hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart / wishlist icon pill */}
            <button
              className="flex items-center justify-center w-[47px] h-[34px] rounded-[15px] bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Cart"
            >
              {/* Heart/cart icon from Figma — placeholder SVG */}
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16.5C10 16.5 1.5 11 1.5 5.5C1.5 3.01 3.51 1 6 1C7.48 1 8.81 1.69 9.68 2.77L10 3.17L10.32 2.77C11.19 1.69 12.52 1 14 1C16.49 1 18.5 3.01 18.5 5.5C18.5 11 10 16.5 10 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
