export default function WhereAreWeLoading() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#003a47] min-h-[760px] pt-[77px]" />
      {/* Map + list */}
      <div className="bg-[#008290] py-20 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <div className="skeleton aspect-[16/9] rounded-lg" />
          <div className="space-y-4 pt-8">
            <div className="skeleton h-4 w-24" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-8 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
