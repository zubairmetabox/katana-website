'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function NavigationProgress() {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      setIsNavigating(false)
      setIsFinishing(true)
      previousPathname.current = pathname

      const t = setTimeout(() => setIsFinishing(false), 400)
      return () => clearTimeout(t)
    }
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return
      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        href !== pathname &&
        !target.hasAttribute('download') &&
        target.target !== '_blank'
      ) {
        setIsNavigating(true)
        setIsFinishing(false)
      }
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  if (!isNavigating && !isFinishing) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none">
      <div className={`h-full ${isFinishing ? 'nav-progress-finish' : 'nav-progress'}`} />
    </div>
  )
}
