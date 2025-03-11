import { useRef } from 'react'

const useStickyScroll = (bottomOffset = 0, topOffset = 0) => {
  const StickyScrollRef = useRef<HTMLDivElement>(null)

  let scrollTopSidebar = 0
  const onScroll = (eventElement: HTMLDivElement) => {
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
      stickyScroll.style.top = `${topOffset}px`
      return
    }

    // Scroll up
    if (scrollTopSidebar > eventElement.scrollTop) {
      if (stickyScrollTop >= 0) stickyScroll.style.top = `${topOffset}px`
      else
        stickyScroll.style.top = `${
          Number(stickyScroll.style.top.replace('px', '')) + (scrollTopSidebar - eventElement.scrollTop)
        }px`
    }

    // Scroll down
    if (scrollTopSidebar < eventElement.scrollTop) {
      if (stickyScrollTop < viewportHeight - stickyScrollHeight + 120)
        stickyScroll.style.top = `${viewportHeight - bottomOffset - stickyScrollHeight}px`
      else
        stickyScroll.style.top = `${
          Number(stickyScroll.style.top.replace('px', '')) - (eventElement.scrollTop - scrollTopSidebar)
        }px`
    }

    scrollTopSidebar = eventElement.scrollTop
  }

  return { StickyScrollRef, onScroll }
}

export default useStickyScroll
