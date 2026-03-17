import type { Metadata } from 'next'
import { getRetailers } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Where Are We',
  description: 'Find KATANA fishing lures at a retailer near you.',
}

export const revalidate = 60

export default async function WhereAreWePage() {
  const retailers = await getRetailers().catch(() => [])

  return (
    <>
      {/* ── Hero: underwater fish school banner ── */}
      {/* PLACEHOLDER: will be replaced by video background */}
      <section className="relative min-h-[760px] bg-gradient-to-b from-[#003a47] to-[#001820] pt-[77px] overflow-hidden flex items-end">
        {/* Placeholder for underwater video/image */}
        <div className="absolute inset-0 bg-[#003a47]/80" />

        <div className="relative max-w-[1366px] mx-auto px-8 pb-20 w-full">
          <h1 className="font-futura-demi text-[#e9f1f6] text-[90px] leading-tight">
            Where Are
            <br />
            We?
          </h1>
        </div>
      </section>

      {/* ── Map + retailer list ── */}
      <section className="bg-gradient-to-b from-[#008290] to-[#014454] py-20 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* Map: PLACEHOLDER — static Mauritius map image */}
          {/* Data-ready: retailers are fetched and ready for Leaflet integration */}
          <div className="relative">
            <div className="w-full aspect-[1366/809] rounded-lg overflow-hidden bg-[#002a35] flex items-center justify-center">
              <div className="text-center text-white/30 font-futura-book text-sm p-8">
                <p className="text-2xl mb-2">[MAP PLACEHOLDER]</p>
                <p>Mauritius map with {retailers.length} retailer pins</p>
                <p className="mt-2 text-xs">Replace with Leaflet map component</p>
                <p className="mt-1 text-xs">Retailers data is ready: {retailers.map(r => r.name).join(', ') || 'No retailers yet'}</p>
              </div>
            </div>
          </div>

          {/* Retailer list sidebar */}
          <div>
            <p className="font-futura-book text-[#a1d4e1] text-[16px] uppercase tracking-widest mb-4">
              RETAILERS
            </p>
            <div className="flex flex-col">
              {retailers.length === 0 ? (
                <p className="font-futura-book text-white/40 text-sm">
                  No retailers yet — add some in the CMS.
                </p>
              ) : (
                retailers.map((retailer, i) => (
                  <div
                    key={retailer.id}
                    className="py-3 border-b border-white/10 last:border-0"
                  >
                    <p
                      className={
                        i === 0
                          ? 'font-futura-bold text-white text-[24px]'
                          : 'font-futura-bold text-[#a1d4e1] text-[19px]'
                      }
                    >
                      {retailer.name}
                    </p>
                    {retailer.region && (
                      <p className="font-futura-book text-[#a1d4e1]/60 text-[14px]">
                        {retailer.region}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
