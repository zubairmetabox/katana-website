export default function BecomeAResellerLoading() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#008290] min-h-[640px] pt-[77px] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="skeleton h-40 w-[500px] mx-auto" />
          <div className="skeleton h-8 w-64 mx-auto" />
        </div>
      </div>
      {/* Form */}
      <div className="bg-[#014454] py-20 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="skeleton h-10 w-64" />
            <div className="skeleton h-20 w-full" />
            <div className="skeleton rounded-[26px] h-[500px]" />
          </div>
          <div className="skeleton h-[600px] rounded-lg hidden lg:block" />
        </div>
      </div>
    </div>
  )
}
