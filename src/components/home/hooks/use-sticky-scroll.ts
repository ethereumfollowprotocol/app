import { useRef } from "react";

const useStickyScroll = (bottomOffset = 0) => {
  const StickyScrollRef = useRef<HTMLDivElement>(null);

  let scrollTopSidebar = 0;
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const stickyScroll = StickyScrollRef.current;
    if (!stickyScroll) return;

    if (window.innerWidth < 1280) {
      stickyScroll.style.top = "0px";
      return;
    }

    const stickyScrollHeight = stickyScroll.scrollHeight + 65;
    const stickyScrollTop = stickyScroll.getBoundingClientRect().top || 0;
    const viewportHeight = window.innerHeight;

    if (stickyScrollHeight + 108 < viewportHeight) {
      stickyScroll.style.top = "0px";
      return;
    }

    if (scrollTopSidebar > e.currentTarget.scrollTop) {
      if (stickyScrollTop >= 70) stickyScroll.style.top = "0px";
      else
        stickyScroll.style.top = `${
          Number(stickyScroll.style.top.replace("px", "")) +
          (scrollTopSidebar - e.currentTarget.scrollTop)
        }px`;
    }

    if (scrollTopSidebar < e.currentTarget.scrollTop) {
      if (stickyScrollTop < viewportHeight - stickyScrollHeight + 120)
        stickyScroll.style.top = `${viewportHeight - bottomOffset - stickyScrollHeight}px`;
      else
        stickyScroll.style.top = `${
          Number(stickyScroll.style.top.replace("px", "")) -
          (e.currentTarget.scrollTop - scrollTopSidebar)
        }px`;
    }

    scrollTopSidebar = e.currentTarget.scrollTop;
  };

  return { StickyScrollRef, onScroll };
};

export default useStickyScroll;
