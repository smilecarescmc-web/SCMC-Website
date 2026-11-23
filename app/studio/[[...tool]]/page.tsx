'use client'

import { useEffect, useRef } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      let node = e.target as HTMLElement | null
      while (node && node !== el) {
        const style = window.getComputedStyle(node)
        const canScrollY =
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          node.scrollHeight > node.clientHeight
        if (canScrollY) {
          const atTop = node.scrollTop <= 0 && e.deltaY < 0
          const atBottom =
            node.scrollTop + node.clientHeight >= node.scrollHeight - 1 && e.deltaY > 0
          if (!atTop && !atBottom) return
        }
        node = node.parentElement
      }
      window.scrollBy({ top: e.deltaY, behavior: 'auto' })
    }

    el.addEventListener('wheel', handleWheel, { passive: true, capture: true })
    return () => el.removeEventListener('wheel', handleWheel, { capture: true })
  }, [])

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow: auto !important;
          height: auto !important;
        }
      `}</style>
      <div
        ref={wrapperRef}
        style={{ height: '88vh', width: '100%', overflow: 'hidden', position: 'relative' }}
      >
        <NextStudio config={config} />
      </div>
    </>
  )
}