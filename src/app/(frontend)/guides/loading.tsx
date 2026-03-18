export default function GuidesLoading() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#003a47] min-h-[400px] pt-[77px] px-8">
        <div className="max-w-[1366px] mx-auto py-20 space-y-4">
          <div className="skeleton h-24 w-[280px]" />
          <div className="skeleton h-5 w-[312px]" />
        </div>
      </div>
      {/* Filters + carousel */}
      <div className="bg-[#014454] py-16 px-8">
        <div className="max-w-[1366px] mx-auto space-y-8">
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="skeleton aspect-[4/3] rounded-lg" />
            <div className="space-y-4 py-8">
              <div className="skeleton h-5 w-24" />
              <div className="skeleton h-12 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-10 w-36 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
