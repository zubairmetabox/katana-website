import type { Metadata } from 'next'
import { ResellerForm } from '@/components/forms/ResellerForm'

export const metadata: Metadata = {
  title: 'Become a Reseller',
  description: 'Interested in becoming an official Katana dealer? Start the conversation.',
}

export default function BecomeAResellerPage() {
  return (
    <>
      {/* ── Hero: teal gradient + "Partner with Precision" ── */}
      {/* PLACEHOLDER: will be replaced by Three.js animation */}
      <section className="relative min-h-[640px] overflow-hidden bg-gradient-to-b from-[#008290] to-[#014454] pt-[77px]">
        {/* KATANA watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-futura-heavy text-white/10 text-[20vw] uppercase leading-none tracking-tighter">
            KATANA
          </span>
        </div>

        <div className="relative max-w-[1366px] mx-auto px-8 py-20 text-center">
          <h1 className="font-futura-heavy text-white leading-none">
            <span className="block text-[191px] leading-[0.85]">Partner</span>
            <span className="font-cormorant font-light text-[40px] tracking-[20px] block mt-4">
              with Precision
            </span>
          </h1>

          {/* Lure hero image placeholder */}
          <div className="mt-12 flex justify-center">
            <div className="w-[400px] h-[300px] flex items-center justify-center text-white/20 font-futura-book text-sm">
              [Hero lure image — upload via CMS]
            </div>
          </div>

          {/* BECOME A RESELLER badge */}
          <div className="mt-6">
            <span className="inline-block font-futura-bold text-white text-[22px] uppercase tracking-widest
              bg-white/10 border border-white/30 rounded-[3px] px-6 py-2">
              BECOME A RESELLER
            </span>
          </div>
        </div>
      </section>

      {/* ── Form section ── */}
      <section className="bg-gradient-to-b from-[#014454] to-[#002a35] py-20 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: form */}
          <div>
            <h2 className="font-futura-heavy text-white text-[40px] mb-4">
              Partner With Precision
            </h2>
            <p className="font-futura-book text-white text-[24px] mb-10 leading-relaxed max-w-[530px]">
              Interested in becoming an official Katana dealer? Start the conversation by
              providing a few key details below.
            </p>

            {/* Form card */}
            <div className="bg-black/16 backdrop-blur-sm rounded-[26px] p-10">
              <ResellerForm />
            </div>
          </div>

          {/* Right: second lure image */}
          <div className="hidden lg:flex items-center justify-center h-[600px]">
            <div className="w-full h-full flex items-center justify-center text-white/20 font-futura-book text-sm">
              [Second lure image — upload via CMS]
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
