'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Package, Users, Phone, MapPin, BookOpen } from 'lucide-react'

// Desktop: overflow items not in the main notch nav (Figma 3:1345)
const desktopLinks = [
  { label: 'Guides', href: '/guides', Icon: BookOpen },
  { label: 'Where are we', href: '/where-are-we', Icon: MapPin },
]

// Mobile: full nav (Figma 3:548)
const mobileLinks = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'Product', href: '/products', Icon: Package },
  { label: 'About', href: '/about', Icon: Users },
  { label: 'Contact', href: '/contact', Icon: Phone },
  { label: 'Where are we', href: '/where-are-we', Icon: MapPin },
]

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: -6 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent click-outside backdrop */}
          <div className="fixed inset-0 z-[60]" onClick={onClose} />

          {/* ── Desktop overflow panel (≥1024px) ──────────────────
              Figma 3:1345 — 277×168px, rounded-[20px], #022730    */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ transformOrigin: 'top left' }}
            className="hidden lg:block fixed top-[90px] left-[118px] z-[70] w-[277px] bg-[#022730] rounded-[20px] overflow-hidden"
          >
            <nav className="flex flex-col gap-[22px] px-8 py-7">
              {desktopLinks.map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-[18px] text-white hover:text-[#89c4d6] transition-colors"
                >
                  <Icon size={22} strokeWidth={1.5} className="shrink-0" />
                  <span className="font-futura-book text-[30px] leading-none whitespace-nowrap">
                    {label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* ── Mobile panel (<1024px) ────────────────────────────
              Figma 3:548 — 181×232px, rounded-[13px], #022730    */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ transformOrigin: 'top left' }}
            className="lg:hidden fixed top-[55px] left-[12px] z-[70] w-[181px] bg-[#022730] rounded-[13px] overflow-hidden"
          >
            <nav className="flex flex-col gap-[10px] px-[22px] py-[18px]">
              {mobileLinks.map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-[14px] text-white hover:text-[#89c4d6] transition-colors"
                >
                  <Icon size={16} strokeWidth={1.5} className="shrink-0" />
                  <span className="font-futura-book text-[16px] leading-none whitespace-nowrap">
                    {label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
