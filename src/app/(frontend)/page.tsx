import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'KATANA Fishing Lures — When Instinct Meets Innovation',
  description:
    'Premium fishing lures engineered in Mauritius. Designed to provoke the most aggressive strikes.',
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero: PLACEHOLDER for Three.js scroll animation ── */}
      <section className="relative min-h-screen bg-black overflow-hidden pt-[45px] lg:pt-[77px]">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a20] to-black" />

        {/* Star particles placeholder */}
        <div className="absolute inset-0 pointer-events-none">
          {[5,15,25,35,45,55,65,75,85,95,10,20,30,40,50,60,70,80,90,3].map((left, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${left}%`,
                top: `${(left * 3 + i * 7) % 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-[1366px] mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 min-h-[calc(100vh-77px)]">
          {/* Left: text annotations */}
          <div className="space-y-6">
            <div>
              <h1 className="font-futura-heavy text-white text-[64px] md:text-[80px] leading-tight">
                Designed to Be<br />Hunted
              </h1>
              <p className="font-futura-book text-[#d3d0c9] text-[20px] mt-4 max-w-[320px] leading-relaxed">
                Strategic red eye accents that activate natural predatory response
              </p>
            </div>
          </div>

          {/* Right: product image with annotation callouts */}
          <div className="relative h-[500px]">
            {/* Placeholder: replace with actual product image */}
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-futura-book text-sm">
              [Hero lure image — PLACEHOLDER for Three.js animation]
            </div>

            {/* Annotation: Red eye */}
            <div className="absolute top-[25%] right-[10%] text-right">
              <p className="font-futura-book text-white text-sm leading-tight">
                Red eye, representing<br />sick fish
              </p>
            </div>

            {/* Annotation: VMC Hooks */}
            <div className="absolute bottom-[20%] right-[5%] text-right">
              <p className="font-futura-book text-white text-sm">VMC Hooks</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand section: teal gradient ── */}
      <section className="relative bg-gradient-to-b from-[#014454] to-[#002a35] py-24 px-8 overflow-hidden">
        {/* Background lure silhouette */}
        <div className="absolute inset-0 bg-[#014454]/50 pointer-events-none" />

        <div className="relative max-w-[1366px] mx-auto text-center">
          {/* Headline */}
          <h2 className="font-futura-medium text-white text-[59px] leading-tight uppercase mb-2">
            WHEN{' '}
            <em className="font-cormorant not-italic italic">INSTINCT</em>
          </h2>
          <h2 className="font-futura-medium text-white text-[59px] leading-tight uppercase">
            MEETS{' '}
            <em className="font-cormorant not-italic italic">INNOVATION</em>
          </h2>

          {/* Lure image */}
          <div className="flex justify-center mt-8 mb-6">
            <div className="relative w-[300px] h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-futura-book text-sm">
                [Brand lure image]
              </div>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-block font-futura-bold text-black text-sm uppercase tracking-widest bg-white rounded-full px-8 py-3 hover:bg-[#e9f1f6] transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </>
  )
}
