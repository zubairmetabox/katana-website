'use client'

import Link from 'next/link'
import { X, Home, Package, Users, Phone, MapPin, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const mobileLinks = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'Product', href: '/products', Icon: Package },
  { label: 'About', href: '/about', Icon: Users },
  { label: 'Contact', href: '/contact', Icon: Phone },
  { label: 'Where Are We', href: '/where-are-we', Icon: MapPin },
  { label: 'Guides', href: '/guides', Icon: BookOpen },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 bottom-0 z-[70] w-[320px] max-w-[85vw] bg-[#002030] flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between h-[77px] px-6">
              <span className="font-futura-bold text-white text-sm uppercase tracking-widest">Menu</span>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
              {mobileLinks.map(({ label, href, Icon }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="flex items-center gap-4 py-4 border-b border-white/10 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#00d9d0]/20 transition-colors">
                      <Icon size={18} className="text-[#00d9d0]" />
                    </div>
                    <span className="font-futura-bold text-white text-[18px] uppercase tracking-wider group-hover:text-[#00d9d0] transition-colors">
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 py-8">
              <Link
                href="/become-a-reseller"
                onClick={onClose}
                className="block w-full text-center font-futura-bold text-black text-sm uppercase tracking-widest bg-white rounded-full py-3 hover:bg-[#e9f1f6] transition-colors"
              >
                Become a Reseller
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
