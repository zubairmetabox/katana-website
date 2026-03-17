'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'PRODUCT', href: '/products' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[45px] lg:h-[77px]">
        <div className="relative h-full max-w-[1366px] mx-auto">

          {/* ════════════════ DESKTOP ════════════════ */}
          <div className="hidden lg:flex items-center h-full">

            {/* Left zone — burger */}
            <div className="flex-1 flex justify-center">
              <button
                onClick={() => setMobileOpen(true)}
                className="flex items-center justify-center w-[47px] h-[34px] rounded-[15px] bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Open menu"
              >
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" aria-hidden="true">
                  <rect width="20" height="2" rx="1" fill="white" />
                  <rect y="5.5" width="20" height="2" rx="1" fill="white" />
                  <rect y="11" width="20" height="2" rx="1" fill="white" />
                </svg>
              </button>
            </div>

            {/* Center — notch panel (scales between icons, capped at 994px) */}
            <div className="relative flex-1 max-w-[994px] h-full shrink-0">
              {/* SVG notch background — stretches horizontally to fill the flex item */}
              <svg
                viewBox="0 0 994 77"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <path
                  d="M994 0C991.809 1.42618 988.767 3.91175 986.236 8.27178C981.493 16.435 983.074 23.4708 980.883 36.3743C979.922 42.1061 976.941 59.7229 966.925 69.6789C961.502 75.0577 955.699 76.5518 952.097 77H41.9032C38.3012 76.5382 32.4879 75.0577 27.0749 69.6789C17.0594 59.7364 14.0778 42.1061 13.1172 36.3743C10.926 23.4708 12.5069 16.435 7.76431 8.27178C5.24291 3.91175 2.19121 1.42618 0 0H144.44L849.55 0.0135959L993.99 0H994Z"
                  fill="#332929"
                  fillOpacity="0.2"
                />
              </svg>

              {/* Nav content layered over SVG */}
              <div className="relative z-10 flex items-center h-full px-[60px]">
                {/* Left links */}
                <nav className="flex items-center gap-[100px] shrink-0">
                  {navLinks.slice(0, 2).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-inter font-normal text-[20px] text-[#e9f1f6] hover:text-white transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* KATANA logo — centered */}
                <Link href="/" className="flex-1 flex items-center justify-center" aria-label="KATANA Home">
                  {/* Swap <span> for <Image> once logo SVG is in /public/images/ */}
                  <span className="font-futura-heavy text-white text-[28px] tracking-[0.25em] uppercase select-none">
                    KATANA
                  </span>
                </Link>

                {/* Right links */}
                <nav className="flex items-center gap-[100px] shrink-0">
                  {navLinks.slice(2).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-inter font-normal text-[20px] text-[#e9f1f6] hover:text-white transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right zone — cart / wishlist */}
            <div className="flex-1 flex justify-center">
              <button
                className="flex items-center justify-center w-[47px] h-[34px] rounded-[15px] bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Wishlist"
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
                  <path
                    d="M10 16.5C10 16.5 1.5 11 1.5 5.5C1.5 3.01 3.51 1 6 1C7.48 1 8.81 1.69 9.68 2.77L10 3.17L10.32 2.77C11.19 1.69 12.52 1 14 1C16.49 1 18.5 3.01 18.5 5.5C18.5 11 10 16.5 10 16.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ════════════════ MOBILE ════════════════ */}
          <div className="flex lg:hidden items-center h-full">

            {/* Left zone — burger */}
            <div className="flex-1 flex items-center pl-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="flex items-center justify-center w-[30px] h-[21px] rounded-[11px] bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Open menu"
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <rect width="14" height="1.5" rx="0.75" fill="white" />
                  <rect y="4.25" width="14" height="1.5" rx="0.75" fill="white" />
                  <rect y="8.5" width="14" height="1.5" rx="0.75" fill="white" />
                </svg>
              </button>
            </div>

            {/* Center — mobile notch (fixed 206×45) */}
            <div className="relative w-[206px] h-[45px] shrink-0">
              <svg
                viewBox="0 0 206 45"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <path
                  d="M206 0C204.495 0.835286 202.398 2.2869 200.663 4.8333C197.402 9.60173 198.489 13.7133 196.984 21.2552C196.323 24.6044 194.274 34.9036 187.384 40.7181C183.656 43.8647 179.664 44.7324 177.184 45H28.8165C26.3361 44.7324 22.3439 43.8647 18.6164 40.7181C11.7258 34.9036 9.67748 24.6044 9.01559 21.2552C7.51067 13.7133 8.59756 9.60173 5.3369 4.8333C3.60206 2.2869 1.50492 0.835286 0 0H206Z"
                  fill="black"
                  fillOpacity="0.2"
                />
              </svg>
              <Link
                href="/"
                className="absolute inset-0 flex items-center justify-center"
                aria-label="KATANA Home"
              >
                <span className="font-futura-heavy text-white text-[18px] tracking-[0.2em] uppercase select-none">
                  KATANA
                </span>
              </Link>
            </div>

            {/* Right zone — cart */}
            <div className="flex-1 flex items-center justify-end pr-4">
              <button
                className="flex items-center justify-center w-[30px] h-[21px] rounded-[11px] bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Wishlist"
              >
                <svg width="14" height="12" viewBox="0 0 20 18" fill="none" aria-hidden="true">
                  <path
                    d="M10 16.5C10 16.5 1.5 11 1.5 5.5C1.5 3.01 3.51 1 6 1C7.48 1 8.81 1.69 9.68 2.77L10 3.17L10.32 2.77C11.19 1.69 12.52 1 14 1C16.49 1 18.5 3.01 18.5 5.5C18.5 11 10 16.5 10 16.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
