import Link from 'next/link'

const pages = [
  { label: 'WHERE ARE WE', href: '/where-are-we' },
  { label: 'PRODUCT', href: '/products' },
  { label: 'CONTACT', href: '/contact' },
  { label: 'GUIDES', href: '/guides' },
  { label: 'ABOUT', href: '/about' },
  { label: 'HOME', href: '/' },
]

const socials = [
  { label: 'INSTAGRAM', href: '#' },
  { label: 'FACEBOOK', href: '#' },
  { label: 'YOUTUBE', href: '#' },
  { label: 'TIKTOK', href: '#' },
]

// Exact SVG clip shapes from Figma
const FOOTER_DESKTOP_PATH =
  'M1321.19 66.41V657C1321.19 668.9 1311.54 678.54 1299.65 678.54H1147.06C1141.11 678.54 1136.29 683.36 1136.29 689.31C1136.29 695.26 1131.47 700.08 1125.52 700.08H195.66C189.71 700.08 184.89 695.26 184.89 689.31C184.89 683.36 180.07 678.54 174.12 678.54H32.31C14.47 678.54 0 664.07 0 646.23V55.64C0 43.75 9.64 34.1 21.54 34.1H507.56C513.51 34.1 518.33 29.28 518.33 23.33V10.77C518.33 4.82 523.15 0 529.1 0H792.09C798.04 0 802.86 4.82 802.86 10.77V23.33C802.86 29.28 807.68 34.1 813.63 34.1H1288.89C1306.73 34.1 1321.2 48.57 1321.2 66.41H1321.19Z'

const FOOTER_MOBILE_PATH =
  'M355.226 60.7979V601.479C355.226 612.374 352.632 621.199 349.435 621.199H308.408C306.809 621.199 305.513 625.612 305.513 631.059C305.513 636.506 304.217 640.919 302.617 640.919H52.6068C51.0071 640.919 49.7111 636.506 49.7111 631.059C49.7111 625.612 48.4152 621.199 46.8154 621.199H8.68714C3.89053 621.199 0 607.952 0 591.619V50.9381C0 40.0528 2.59189 31.2183 5.79143 31.2183H136.467C138.067 31.2183 139.363 26.8056 139.363 21.3585V9.85986C139.363 4.41268 140.659 0 142.258 0H212.968C214.568 0 215.864 4.41268 215.864 9.85986V21.3585C215.864 26.8056 217.16 31.2183 218.76 31.2183H346.542C351.339 31.2183 355.229 44.4655 355.229 60.7979H355.226Z'

export function Footer() {
  return (
    <>
      {/* Clip-path defs */}
      <svg width={0} height={0} aria-hidden style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="footer-desktop-clip" clipPathUnits="objectBoundingBox">
            <path transform={`scale(${1 / 1322}, ${1 / 701})`} d={FOOTER_DESKTOP_PATH} />
          </clipPath>
          <clipPath id="footer-mobile-clip" clipPathUnits="objectBoundingBox">
            <path transform={`scale(${1 / 356}, ${1 / 641})`} d={FOOTER_MOBILE_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* ════════════════ DESKTOP ════════════════ */}
      {/* Fixed height 701px matches Figma. Width scales. Positions are % of 1322 (x) and px (y). */}
      <footer
        className="hidden md:block relative mx-3 mb-3 overflow-hidden"
        style={{ height: 701 }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ clipPath: 'url(#footer-desktop-clip)' }}
        >
          <div className="absolute inset-0 bg-[#022730]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/footer-lure.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        {/* ── Headline — centered, Figma y=121 from shape top ── */}
        <div
          className="absolute left-0 right-0 text-center"
          style={{ top: 121 }}
        >
          <p className="font-futura-medium text-white text-[59px] leading-[1.28] uppercase">
            WHEN{' '}
            <em className="font-cormorant not-italic italic">INSTINCT</em>
          </p>
          <p className="font-futura-medium text-white text-[59px] leading-[1.28] uppercase">
            MEETS{' '}
            <em className="font-cormorant not-italic italic">INNOVATION</em>
          </p>
        </div>

        {/* ── Left column — text-centered at x=13.97%, PAGES y=319, links y=338 ── */}
        <div
          className="absolute text-center"
          style={{ left: '13.97%', top: 319, transform: 'translateX(-50%)' }}
        >
          <p className="font-futura-demi text-[#7aabb8] text-[11px] uppercase tracking-[0.18em] mb-[6px]">
            PAGES
          </p>
          <nav className="flex flex-col">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="font-futura-bold text-white text-[25.5px] leading-[1.29] uppercase hover:text-[#89c4d6] transition-colors whitespace-nowrap"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Right column — text-centered at x=85.92%, FOLLOW ON y=348, links y=371 ── */}
        <div
          className="absolute text-center"
          style={{ left: '85.92%', top: 348, transform: 'translateX(-50%)' }}
        >
          <p className="font-futura-demi text-[#7aabb8] text-[11px] uppercase tracking-[0.18em] mb-[6px]">
            FOLLOW ON
          </p>
          <nav className="flex flex-col">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-futura-bold text-white text-[25.5px] leading-[1.29] uppercase hover:text-[#89c4d6] transition-colors whitespace-nowrap"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Button — centered, Figma y=600 from shape top ── */}
        <div
          className="absolute left-0 right-0 flex justify-center"
          style={{ top: 600 }}
        >
          <Link
            href="/become-a-reseller"
            className="font-futura-bold text-black text-[16.4px] uppercase bg-white px-8 py-3 hover:bg-[#e9f1f6] transition-colors whitespace-nowrap"
            style={{ borderRadius: 8 }}
          >
            BECOME A RESELLER
          </Link>
        </div>
      </footer>

      {/* ════════════════ MOBILE (<768px) ════════════════ */}
      {/* Shape: 356×641. All positions are % (x) and px (y) within that space. */}
      <footer
        className="md:hidden relative mx-3 mb-3 overflow-hidden"
        style={{ height: 641 }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ clipPath: 'url(#footer-mobile-clip)' }}
        >
          <div className="absolute inset-0 bg-[#022730]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/footer-lure.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        {/* PAGES — mirrored left at x=23%, top=88px */}
        <div
          className="absolute text-center"
          style={{ left: '23%', top: 88, transform: 'translateX(-50%)' }}
        >
          <p className="font-futura-demi text-[#7aabb8] text-[10px] uppercase tracking-[0.15em] mb-[6px]">
            PAGES
          </p>
          <nav className="flex flex-col">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="font-futura-bold text-white text-[19px] leading-[1.3] uppercase hover:text-[#89c4d6] transition-colors whitespace-nowrap"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* FOLLOW ON — Figma x=77%, top=88px */}
        <div
          className="absolute text-center"
          style={{ left: '77%', top: 88, transform: 'translateX(-50%)' }}
        >
          <p className="font-futura-demi text-[#7aabb8] text-[10px] uppercase tracking-[0.15em] mb-[6px]">
            FOLLOW ON
          </p>
          <nav className="flex flex-col">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-futura-bold text-white text-[19px] leading-[1.3] uppercase hover:text-[#89c4d6] transition-colors whitespace-nowrap"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Headline — Figma y=278px, centered */}
        <div
          className="absolute left-0 right-0 text-center"
          style={{ top: 278 }}
        >
          <p className="font-futura-medium text-white text-[38px] leading-[1.28] uppercase">
            WHEN{' '}
            <em className="font-cormorant not-italic italic">INSTINCT</em>
          </p>
          <p className="font-futura-medium text-white text-[38px] leading-[1.28] uppercase">
            MEETS{' '}
            <em className="font-cormorant not-italic italic">INNOVATION</em>
          </p>
        </div>

        {/* Button — Figma y=530px, centered, w=169px h=35px */}
        <div
          className="absolute left-0 right-0 flex justify-center"
          style={{ top: 530 }}
        >
          <Link
            href="/become-a-reseller"
            className="font-futura-bold text-black text-[13px] uppercase bg-white hover:bg-[#e9f1f6] transition-colors whitespace-nowrap"
            style={{ borderRadius: 8, padding: '9px 20px' }}
          >
            BECOME A RESELLER
          </Link>
        </div>
      </footer>
    </>
  )
}
