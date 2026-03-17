'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, ChevronDown } from 'lucide-react'

const types = ['All', 'Technique', 'Biology', 'Gear', 'Video']

export function GuideFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const currentType = searchParams.get('type') ?? 'All'
  const currentSearch = searchParams.get('q') ?? ''

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'All') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.push(`/guides?${params.toString()}`)
    })
  }

  return (
    <div className="flex items-center gap-4 mb-12">
      {/* Search input */}
      <div className="relative">
        <div className="flex items-center border border-white rounded-l-[7px] h-[47px] w-[323px]">
          <input
            type="text"
            defaultValue={currentSearch}
            placeholder="Search"
            className="flex-1 bg-transparent font-futura-book text-[#d3d0c9] text-[20px] px-4 outline-none placeholder:text-[#d3d0c9]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setParam('q', (e.target as HTMLInputElement).value)
              }
            }}
          />
        </div>
        {/* Teal search button */}
        <button
          className="absolute right-0 top-0 bottom-0 bg-[#01bcb8] rounded-r-[7px] px-4 font-futura-book text-black text-[20px]"
          onClick={(e) => {
            const input = (e.currentTarget.previousSibling as HTMLElement)?.querySelector('input')
            if (input) setParam('q', input.value)
          }}
        >
          Search
        </button>
      </div>

      {/* Filter dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-2 border border-white rounded-[7px] h-[47px] px-4 font-futura-book text-[#d3d0c9] text-[20px] min-w-[193px]"
        >
          <span>Filter By Type</span>
          <ChevronDown size={16} className={`ml-auto transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#014454] border border-white/20 rounded-[7px] z-20 overflow-hidden">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setParam('type', type)
                  setDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-3 font-futura-book text-[18px] hover:bg-white/10 transition-colors
                  ${currentType.toLowerCase() === type.toLowerCase() ? 'text-[#00d9d0]' : 'text-[#d3d0c9]'}`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
