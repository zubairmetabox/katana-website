import type { Metadata } from 'next'
import { MapPin, Phone, Mail } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with KATANA — share your latest catch, ask about becoming a dealer, or get expert advice.',
}

export default function ContactPage() {
  return (
    <>
      {/* ── Hero: CONTACT over shark underwater image ── */}
      {/* PLACEHOLDER: will be replaced by Three.js animation */}
      <section className="relative h-[680px] overflow-hidden pt-[77px] bg-[#008290]">
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#005a65] to-[#002a35]" />

        {/* "CONTACT" watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-futura-heavy text-white/20 text-[22vw] uppercase leading-none tracking-tight">
            CONTACT
          </span>
        </div>
      </section>

      {/* ── Two-col cards ── */}
      <section className="bg-gradient-to-b from-[#008290] to-[#014454] py-20 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: glass info card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-[16px] p-12 flex flex-col gap-8">
            <div>
              <h2 className="font-futura-heavy text-white text-[60px] leading-tight">
                Get{' '}
              </h2>
              <h2 className="font-futura-heavy text-white text-[60px] leading-tight">
                <span className="font-cormorant font-bold">Hooked</span>{' '}Up
              </h2>
            </div>

            <p className="font-futura-book text-white text-[22px] leading-relaxed">
              Share your latest catch, ask about becoming a dealer, or get expert advice from our
              team. Drop us a line.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-white mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-futura-book text-white text-[27px]">Address</p>
                  <p className="font-futura-book text-white text-[22px]">Quatre Borne Street xxxx</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-white mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-futura-book text-white text-[27px]">Phone</p>
                  <p className="font-futura-book text-white text-[22px]">+230 1234567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-white mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-futura-book text-white text-[27px]">Mail</p>
                  <p className="font-futura-book text-white text-[22px]">katana@gmail.mu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: dark form card */}
          <div className="bg-[#141414] rounded-[16px] p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
