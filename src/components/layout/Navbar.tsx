'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
      {/* Header — transparent background; the notch panel carries the dark bg */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center h-[45px] lg:h-[77px] max-w-[1366px] mx-auto px-4 lg:px-6">

          {/* ── Burger pill ── */}
          <button
            onClick={() => setMobileOpen(true)}
            className="shrink-0 flex items-center justify-center
                       w-[30px] h-[21px] lg:w-[47px] lg:h-[34px]
                       rounded-[11px] lg:rounded-[15px]
                       bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Open menu"
          >
            {/* Hamburger lines */}
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true" className="lg:hidden">
              <rect width="16" height="1.5" rx="0.75" fill="white" />
              <rect y="4.75" width="16" height="1.5" rx="0.75" fill="white" />
              <rect y="9.5" width="16" height="1.5" rx="0.75" fill="white" />
            </svg>
            <svg width="20" height="13" viewBox="0 0 20 13" fill="none" aria-hidden="true" className="hidden lg:block">
              <rect width="20" height="1.8" rx="0.9" fill="white" />
              <rect y="5.6" width="20" height="1.8" rx="0.9" fill="white" />
              <rect y="11.2" width="20" height="1.8" rx="0.9" fill="white" />
            </svg>
          </button>

          {/* ── Center notch panel ── */}
          <div
            className={cn(
              // Layout: fills the space between the two pills
              'flex-1 self-stretch mx-3 lg:mx-4',
              // Shape: the "notch" — dark panel, rounded on all corners
              'rounded-[15px] lg:rounded-[20px]',
              // Background + scroll blur
              'transition-all duration-300',
              scrolled
                ? 'bg-[#111111]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                : 'bg-[#111111]',
              // Flex layout for inner content
              'flex items-center overflow-hidden',
            )}
          >
            {/* Left nav links — desktop only */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-12 pl-8 xl:pl-14 shrink-0">
              {desktopLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter font-normal text-[18px] xl:text-[20px] text-[#e9f1f6] hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* KATANA Logo — always centered */}
            <Link
              href="/"
              className="flex-1 flex items-center justify-center"
              aria-label="KATANA — Home"
            >
              {/* Replace the span below with <Image> once logo file is in /public/images/ */}
              <span className="font-futura-heavy text-white text-[20px] lg:text-[28px] tracking-[0.2em] lg:tracking-[0.25em] uppercase select-none">
                KATANA
              </span>
            </Link>

            {/* Right nav links — desktop only */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-12 pr-8 xl:pr-14 shrink-0">
              {desktopLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter font-normal text-[18px] xl:text-[20px] text-[#e9f1f6] hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Cart / wishlist pill ── */}
          <button
            className="shrink-0 flex items-center justify-center
                       w-[30px] h-[21px] lg:w-[47px] lg:h-[34px]
                       rounded-[11px] lg:rounded-[15px]
                       bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Wishlist"
          >
            {/* Heart icon */}
            <svg width="13" height="12" viewBox="0 0 20 18" fill="none" aria-hidden="true" className="lg:hidden">
              <path d="M10 16.5C10 16.5 1.5 11 1.5 5.5C1.5 3.01 3.51 1 6 1C7.48 1 8.81 1.69 9.68 2.77L10 3.17L10.32 2.77C11.19 1.69 12.52 1 14 1C16.49 1 18.5 3.01 18.5 5.5C18.5 11 10 16.5 10 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true" className="hidden lg:block">
              <path d="M10 16.5C10 16.5 1.5 11 1.5 5.5C1.5 3.01 3.51 1 6 1C7.48 1 8.81 1.69 9.68 2.77L10 3.17L10.32 2.77C11.19 1.69 12.52 1 14 1C16.49 1 18.5 3.01 18.5 5.5C18.5 11 10 16.5 10 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
