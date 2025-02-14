import { useRef } from 'react'

const useStickyScroll = (bottomOffset = 0) => {
  const StickyScrollRef = useRef<HTMLDivElement>(null)

  let scrollTopSidebar = 0
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const stickyScroll = StickyScrollRef.current
    if (!stickyScroll) return

    // Disable sticky scroll on tablet/mobile
    if (window.innerWidth < 1024) {
      stickyScroll.style.top = '0px'
      return
    }

    const stickyScrollHeight = stickyScroll.scrollHeight + 65
    const stickyScrollTop = stickyScroll.getBoundingClientRect().top || 0
    const viewportHeight = window.innerHeight

    // Disable sticky scroll if element is smaller than viewport
    if (stickyScrollHeight < viewportHeight) {
      stickyScroll.style.top = '0px'
      return
    }

    // Scroll up
    if (scrollTopSidebar > e.currentTarget.scrollTop) {
      if (stickyScrollTop >= 0) stickyScroll.style.top = '0px'
      else
        stickyScroll.style.top = `${
          Number(stickyScroll.style.top.replace('px', '')) + (scrollTopSidebar - e.currentTarget.scrollTop)
        }px`
    }

    // Scroll down
    if (scrollTopSidebar < e.currentTarget.scrollTop) {
      if (stickyScrollTop < viewportHeight - stickyScrollHeight + 120)
        stickyScroll.style.top = `${viewportHeight - bottomOffset - stickyScrollHeight}px`
      else
        stickyScroll.style.top = `${
          Number(stickyScroll.style.top.replace('px', '')) - (e.currentTarget.scrollTop - scrollTopSidebar)
        }px`
    }

    scrollTopSidebar = e.currentTarget.scrollTop
  }

  return { StickyScrollRef, onScroll }
}

export default useStickyScroll
