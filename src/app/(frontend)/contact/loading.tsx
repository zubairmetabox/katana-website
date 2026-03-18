export default function ContactLoading() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#005a65] h-[680px] pt-[77px]" />
      {/* Cards */}
      <div className="bg-[#008290] py-20 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="skeleton rounded-[16px] h-[480px]" />
          <div className="skeleton rounded-[16px] h-[480px]" />
        </div>
      </div>
    </div>
  )
}
