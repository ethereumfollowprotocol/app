import { useEffect, useState } from 'react'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'

const ScrollIndicator = () => {
  const [hideIndicator, setHideIndicator] = useState(false)

  useEffect(() => {
    if (window.innerHeight > 1050) {
      setHideIndicator(true)
      return
    }

    const handleScroll = () => {
      if (window.scrollY > 0) setHideIndicator(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className='scroll-indicator hidden transition-opacity xl:block'
      style={{
        opacity: hideIndicator ? 0 : 1,
      }}
    >
      <ArrowDown className='text-darkGrey text-6xl dark:text-[#aaa]' />
    </div>
  )
}

export default ScrollIndicator
