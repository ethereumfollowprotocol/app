import { useIsClient } from '@uidotdev/usehooks'
import { useCallback, useEffect, useRef } from 'react'

export const useUserScroll = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const TopEightRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isClient = useIsClient()
  const isCommonFollowersModalOpen = isClient ? !!document?.querySelector('.common-followers-modal-container') : false

  const handleWheel = useCallback((event: WheelEvent) => {
    const commonFollowersModalEl = document?.querySelector('.common-followers-modal-container')

    if (commonFollowersModalEl) return

    if (tableRef.current) {
      // Adjust the scroll position of the div
      tableRef.current.scrollTop += event.deltaY
      tableRef.current.scrollLeft += event.deltaX
    }

    if (containerRef.current) {
      // Adjust the scroll position of the div
      containerRef.current.scrollTop += event.deltaY
      containerRef.current.scrollLeft += event.deltaX
    }

    if (TopEightRef.current) {
      const topEightHeight = TopEightRef.current.scrollHeight
      const topEightOverflow = window.innerHeight - topEightHeight - 16
      if (window.innerWidth >= 1024) TopEightRef.current.style.top = `${topEightOverflow >= 0 ? 0 : topEightOverflow}px`
      else TopEightRef.current.style.top = '0px'
    }
  }, [])

  useEffect(() => {
    // Attach the wheel event listener to the window
    containerRef.current?.addEventListener('wheel', handleWheel)

    // Cleanup function to remove the event listener
    return () => {
      containerRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return { tableRef, TopEightRef, containerRef, isCommonFollowersModalOpen }
}
