export default function ProductsLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="bg-[#014454] min-h-[700px] pt-[77px] px-8">
        <div className="max-w-[1366px] mx-auto py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="skeleton h-24 w-[320px]" />
            <div className="skeleton h-8 w-[200px]" />
            <div className="skeleton h-12 w-[160px]" />
          </div>
          <div className="skeleton aspect-square rounded-lg max-h-[400px]" />
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="bg-[#014454] py-20 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`space-y-3 ${i % 3 === 1 ? 'mt-8' : ''}`}>
              <div className="skeleton aspect-square rounded-lg" />
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
