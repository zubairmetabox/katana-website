// Home page loading skeleton
export default function HomeLoading() {
  return (
    <div className="bg-black">
      {/* Hero: tall scroll container */}
      <div className="skeleton h-screen w-full rounded-none" />
      {/* Brand section */}
      <div className="bg-[#014454] py-24 px-8">
        <div className="max-w-[1366px] mx-auto text-center space-y-6">
          <div className="skeleton h-16 w-[420px] mx-auto" />
          <div className="skeleton h-16 w-[480px] mx-auto" />
          <div className="skeleton h-[300px] w-[300px] mx-auto mt-8" />
          <div className="skeleton h-12 w-[200px] mx-auto rounded-full" />
        </div>
      </div>
    </div>
  )
}
