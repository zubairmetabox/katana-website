export default function AboutLoading() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#007f8d] min-h-[640px] pt-[77px] px-8">
        <div className="max-w-[1366px] mx-auto py-16">
          <div className="skeleton h-28 w-[500px] mb-8" />
          <div className="skeleton h-12 w-[180px]" />
        </div>
      </div>
      {/* Story section */}
      <div className="bg-[#b3d4e3] py-24 px-8">
        <div className="max-w-[1366px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="skeleton h-20 w-[380px]" style={{ background: 'rgba(1,68,84,0.15)' }} />
            <div className="skeleton h-4 w-full" style={{ background: 'rgba(1,68,84,0.15)' }} />
            <div className="skeleton h-4 w-full" style={{ background: 'rgba(1,68,84,0.15)' }} />
            <div className="skeleton h-4 w-5/6" style={{ background: 'rgba(1,68,84,0.15)' }} />
            <div className="skeleton h-4 w-4/6" style={{ background: 'rgba(1,68,84,0.15)' }} />
          </div>
          <div className="skeleton h-[500px] rounded-lg" style={{ background: 'rgba(1,68,84,0.15)' }} />
        </div>
      </div>
    </div>
  )
}
