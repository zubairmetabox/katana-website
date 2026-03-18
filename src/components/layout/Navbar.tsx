'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MobileMenu } from './MobileMenu'
import { LiquidGlass } from '@/components/ui/LiquidGlass'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'PRODUCT', href: '/products' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

// Notch SVG paths (viewBox units)
const NOTCH_DESKTOP =
  'M994 0C991.809 1.42618 988.767 3.91175 986.236 8.27178C981.493 16.435 983.074 23.4708 980.883 36.3743C979.922 42.1061 976.941 59.7229 966.925 69.6789C961.502 75.0577 955.699 76.5518 952.097 77H41.9032C38.3012 76.5382 32.4879 75.0577 27.0749 69.6789C17.0594 59.7364 14.0778 42.1061 13.1172 36.3743C10.926 23.4708 12.5069 16.435 7.76431 8.27178C5.24291 3.91175 2.19121 1.42618 0 0H144.44L849.55 0.0135959L993.99 0H994Z'
const NOTCH_MOBILE =
  'M206 0C204.495 0.835286 202.398 2.2869 200.663 4.8333C197.402 9.60173 198.489 13.7133 196.984 21.2552C196.323 24.6044 194.274 34.9036 187.384 40.7181C183.656 43.8647 179.664 44.7324 177.184 45H28.8165C26.3361 44.7324 22.3439 43.8647 18.6164 40.7181C11.7258 34.9036 9.67748 24.6044 9.01559 21.2552C7.51067 13.7133 8.59756 9.60173 5.3369 4.8333C3.60206 2.2869 1.50492 0.835286 0 0H206Z'

// objectBoundingBox scale factors so the clip scales with element size
// desktop: viewBox 994×77 → scale(1/994, 1/77)
// mobile:  viewBox 206×45 → scale(1/206, 1/45)
const DESKTOP_SCALE = `scale(${1 / 994}, ${1 / 77})`
const MOBILE_SCALE  = `scale(${1 / 206}, ${1 / 45})`

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── Clip-path + filter defs (hidden) ────────────────────── */}
      <svg width={0} height={0} aria-hidden style={{ position: 'fixed', pointerEvents: 'none' }}>
        <defs>
          {/* Desktop notch clip — objectBoundingBox so it scales with the div */}
          <clipPath id="notch-desktop-clip" clipPathUnits="objectBoundingBox">
            <path transform={DESKTOP_SCALE} d={NOTCH_DESKTOP} />
          </clipPath>
          {/* Mobile notch clip */}
          <clipPath id="notch-mobile-clip" clipPathUnits="objectBoundingBox">
            <path transform={MOBILE_SCALE} d={NOTCH_MOBILE} />
          </clipPath>

          {/* Liquid glass backdrop filter for the notch */}
          <filter id="notch-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blurred" />
            <feColorMatrix in="blurred" type="saturate" values="1.6" result="saturated" />
            {/* Darken the blurred backdrop so content is always readable */}
            <feComponentTransfer in="saturated">
              <feFuncR type="linear" slope="0.55" />
              <feFuncG type="linear" slope="0.60" />
              <feFuncB type="linear" slope="0.65" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <header className="fixed top-0 left-0 right-0 z-50 h-[45px] lg:h-[77px]">
        <div className="relative h-full max-w-[1366px] mx-auto">

          {/* ════════════════ DESKTOP ════════════════ */}
          <div className="hidden lg:flex items-center h-full">

            {/* Left zone — burger pill */}
            <div className="w-[186px] shrink-0 flex items-center justify-center">
              <LiquidGlass
                className="w-[47px] h-[34px] rounded-[15px] cursor-pointer"
                blur={20}
                strength={28}
              >
                <button
                  onClick={() => setMobileOpen(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <svg width="29" height="16" viewBox="0 0 29 16" fill="none" aria-hidden>
                    <path d="M4.70801 7.91602H23.9561M1.5 1.5H27.1641M7.91602 14.332H20.748" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                  </svg>
                </button>
              </LiquidGlass>
            </div>

            {/* Center — notch panel */}
            <div className="relative flex-1 max-w-[994px] h-full shrink-0">

              {/* Glass backdrop clipped to notch shape */}
              <div
                className="absolute inset-0"
                style={{ clipPath: 'url(#notch-desktop-clip)' }}
              >
                {/* Dark base — guarantees legibility on any background */}
                <div className="absolute inset-0" style={{ background: 'rgba(4, 18, 24, 0.72)' }} />
                {/* Blur + refraction layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    backdropFilter: 'url(#notch-glass)',
                    WebkitBackdropFilter: 'blur(18px) saturate(160%) brightness(0.6)',
                  }}
                />
                {/* Glass white tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
                  }}
                />
                {/* Specular top highlight */}
                <div
                  className="absolute inset-x-0 top-0"
                  style={{
                    height: '40%',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />
              </div>

              {/* SVG border stroke on top */}
              <svg
                viewBox="0 0 994 77"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
              >
                <path
                  d={NOTCH_DESKTOP}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              </svg>

              {/* Nav content */}
              <div className="relative z-10 flex items-center h-full px-[60px]">
                <nav className="flex items-center gap-[78px] shrink-0">
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

                <Link href="/" className="flex-1 flex items-center justify-center" aria-label="KATANA Home">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/katana-logo.png"
                    alt="KATANA"
                    width={148}
                    height={35}
                    style={{ objectFit: 'contain' }}
                  />
                </Link>

                <nav className="flex items-center gap-[78px] shrink-0">
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

            {/* Right zone — partner pill */}
            <div className="w-[186px] shrink-0 flex items-center justify-center">
              <LiquidGlass
                className="w-[47px] h-[34px] rounded-[15px]"
                blur={20}
                strength={28}
              >
                <Link
                  href="/become-a-reseller"
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Become a reseller"
                >
                  <svg width="29" height="19" viewBox="0 0 29 19" fill="none" aria-hidden>
                    <path d="M28.2988 6.40278L24.0577 1.13974C23.5448 0.503599 22.8151 0.105219 22.0032 0.0179552C21.1957 -0.0693088 20.3831 0.172881 19.7552 0.677495L18.6776 1.54634C18.0763 2.03072 17.7082 2.69785 17.5856 3.40481H11.8242C11.6788 3.40481 11.5359 3.41746 11.3974 3.44086C11.2811 2.72061 10.9099 2.03894 10.2984 1.54634L9.21961 0.676862C8.59295 0.172248 7.78354 -0.0693088 6.9735 0.0173229C6.1603 0.104587 5.43121 0.502966 4.91711 1.13974L0.677846 6.40151C0.164379 7.03765 -0.0702225 7.83568 0.0183063 8.64824C0.10557 9.46144 0.503317 10.1899 1.14009 10.704L2.21825 11.5729C2.7608 12.0092 3.44184 12.2501 4.13679 12.2501C4.47257 12.2501 4.80012 12.1957 5.10934 12.092L12.9618 18.3706C13.4658 18.7557 14.0931 18.9682 14.7267 18.9682C14.8115 18.9682 14.8962 18.9644 14.9797 18.9568C15.5462 18.9062 16.0932 18.6887 16.539 18.3314L24.2113 12.1932C24.4149 12.2356 24.6249 12.2665 24.838 12.2665C25.5329 12.2665 26.2152 12.0161 26.7572 11.5804L27.8353 10.7072C28.4714 10.1937 28.8705 9.46271 28.9558 8.65014C29.0463 7.83884 28.8123 7.03892 28.2988 6.40278ZM2.34788 9.20724C2.11201 9.0169 1.96404 8.74563 1.93179 8.444C1.89891 8.14237 1.98617 7.84643 2.17588 7.60993L6.41514 2.34879C6.60611 2.11229 6.87676 1.96496 7.17839 1.93144C7.21886 1.92701 7.25996 1.92512 7.2998 1.92512C7.55843 1.92512 7.812 2.01491 8.01182 2.17616L9.09061 3.04501C9.57815 3.43833 9.65593 4.15478 9.26197 4.64232L5.02208 9.90345C4.64204 10.3758 3.90029 10.4574 3.42603 10.0755L2.34788 9.20724ZM21.3436 12.0199C21.1362 12.1862 20.8415 12.1856 20.6348 12.018L16.0882 8.33586C15.7328 8.04878 15.2889 7.89259 14.833 7.89512L11.8249 7.91029C11.4493 7.91029 11.1483 7.59665 11.1483 7.22103V6.01894C11.1483 5.64332 11.4499 5.34675 11.8249 5.34675H17.3434C17.5141 5.34675 17.6741 5.42327 17.7816 5.5548L22.0152 10.7514C22.1094 10.8691 22.1549 11.0189 22.1385 11.1682C22.1233 11.318 22.0468 11.4552 21.9304 11.5501L21.3436 12.0199ZM27.0461 8.44463C27.0126 8.74626 26.8659 9.0169 26.6294 9.20724L25.5513 10.0761C25.347 10.2405 25.1017 10.3271 24.8405 10.3271C24.4933 10.3271 24.1702 10.1722 23.954 9.90409L19.7147 4.64232C19.3226 4.15478 19.3985 3.43833 19.8867 3.04501L20.9636 2.17679C21.1653 2.01491 21.4182 1.92512 21.6769 1.92512C21.7161 1.92512 21.7584 1.92701 21.7983 1.93144C22.0999 1.96432 22.3699 2.11229 22.5603 2.34816L26.8002 7.61056C26.9918 7.84643 27.0778 8.14237 27.0461 8.44463Z" fill="white"/>
                  </svg>
                </Link>
              </LiquidGlass>
            </div>
          </div>

          {/* ════════════════ MOBILE ════════════════ */}
          <div className="flex lg:hidden items-center h-full">

            {/* Left — burger pill */}
            <div className="flex-1 flex items-center pl-4">
              <LiquidGlass className="w-[30px] h-[21px] rounded-[11px]" blur={16} strength={20}>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <svg width="17" height="10" viewBox="0 0 29 16" fill="none" aria-hidden>
                    <path d="M4.70801 7.91602H23.9561M1.5 1.5H27.1641M7.91602 14.332H20.748" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                  </svg>
                </button>
              </LiquidGlass>
            </div>

            {/* Center — mobile notch */}
            <div className="relative w-[206px] h-[45px] shrink-0">
              {/* Glass backdrop clipped to notch */}
              <div
                className="absolute inset-0"
                style={{ clipPath: 'url(#notch-mobile-clip)' }}
              >
                <div className="absolute inset-0" style={{ background: 'rgba(4, 18, 24, 0.72)' }} />
                <div
                  className="absolute inset-0"
                  style={{
                    backdropFilter: 'url(#notch-glass)',
                    WebkitBackdropFilter: 'blur(18px) saturate(160%) brightness(0.6)',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
                  }}
                />
                <div
                  className="absolute inset-x-0 top-0"
                  style={{
                    height: '40%',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />
              </div>

              {/* Border stroke */}
              <svg
                viewBox="0 0 206 45"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
              >
                <path d={NOTCH_MOBILE} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              </svg>

              <Link
                href="/"
                className="absolute inset-0 flex items-center justify-center z-10"
                aria-label="KATANA Home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/katana-logo.png"
                  alt="KATANA"
                  width={103}
                  height={25}
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>

            {/* Right — partner pill */}
            <div className="flex-1 flex items-center justify-end pr-4">
              <LiquidGlass className="w-[30px] h-[21px] rounded-[11px]" blur={16} strength={20}>
                <Link
                  href="/become-a-reseller"
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Become a reseller"
                >
                  <svg width="17" height="11" viewBox="0 0 29 19" fill="none" aria-hidden>
                    <path d="M28.2988 6.40278L24.0577 1.13974C23.5448 0.503599 22.8151 0.105219 22.0032 0.0179552C21.1957 -0.0693088 20.3831 0.172881 19.7552 0.677495L18.6776 1.54634C18.0763 2.03072 17.7082 2.69785 17.5856 3.40481H11.8242C11.6788 3.40481 11.5359 3.41746 11.3974 3.44086C11.2811 2.72061 10.9099 2.03894 10.2984 1.54634L9.21961 0.676862C8.59295 0.172248 7.78354 -0.0693088 6.9735 0.0173229C6.1603 0.104587 5.43121 0.502966 4.91711 1.13974L0.677846 6.40151C0.164379 7.03765 -0.0702225 7.83568 0.0183063 8.64824C0.10557 9.46144 0.503317 10.1899 1.14009 10.704L2.21825 11.5729C2.7608 12.0092 3.44184 12.2501 4.13679 12.2501C4.47257 12.2501 4.80012 12.1957 5.10934 12.092L12.9618 18.3706C13.4658 18.7557 14.0931 18.9682 14.7267 18.9682C14.8115 18.9682 14.8962 18.9644 14.9797 18.9568C15.5462 18.9062 16.0932 18.6887 16.539 18.3314L24.2113 12.1932C24.4149 12.2356 24.6249 12.2665 24.838 12.2665C25.5329 12.2665 26.2152 12.0161 26.7572 11.5804L27.8353 10.7072C28.4714 10.1937 28.8705 9.46271 28.9558 8.65014C29.0463 7.83884 28.8123 7.03892 28.2988 6.40278ZM2.34788 9.20724C2.11201 9.0169 1.96404 8.74563 1.93179 8.444C1.89891 8.14237 1.98617 7.84643 2.17588 7.60993L6.41514 2.34879C6.60611 2.11229 6.87676 1.96496 7.17839 1.93144C7.21886 1.92701 7.25996 1.92512 7.2998 1.92512C7.55843 1.92512 7.812 2.01491 8.01182 2.17616L9.09061 3.04501C9.57815 3.43833 9.65593 4.15478 9.26197 4.64232L5.02208 9.90345C4.64204 10.3758 3.90029 10.4574 3.42603 10.0755L2.34788 9.20724ZM21.3436 12.0199C21.1362 12.1862 20.8415 12.1856 20.6348 12.018L16.0882 8.33586C15.7328 8.04878 15.2889 7.89259 14.833 7.89512L11.8249 7.91029C11.4493 7.91029 11.1483 7.59665 11.1483 7.22103V6.01894C11.1483 5.64332 11.4499 5.34675 11.8249 5.34675H17.3434C17.5141 5.34675 17.6741 5.42327 17.7816 5.5548L22.0152 10.7514C22.1094 10.8691 22.1549 11.0189 22.1385 11.1682C22.1233 11.318 22.0468 11.4552 21.9304 11.5501L21.3436 12.0199ZM27.0461 8.44463C27.0126 8.74626 26.8659 9.0169 26.6294 9.20724L25.5513 10.0761C25.347 10.2405 25.1017 10.3271 24.8405 10.3271C24.4933 10.3271 24.1702 10.1722 23.954 9.90409L19.7147 4.64232C19.3226 4.15478 19.3985 3.43833 19.8867 3.04501L20.9636 2.17679C21.1653 2.01491 21.4182 1.92512 21.6769 1.92512C21.7161 1.92512 21.7584 1.92701 21.7983 1.93144C22.0999 1.96432 22.3699 2.11229 22.5603 2.34816L26.8002 7.61056C26.9918 7.84643 27.0778 8.14237 27.0461 8.44463Z" fill="white"/>
                  </svg>
                </Link>
              </LiquidGlass>
            </div>
          </div>

        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
