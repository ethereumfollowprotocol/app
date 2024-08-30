import { useEffect, useState } from 'react'

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
      className='scroll-indicator xl:block hidden transition-opacity duration-300'
      style={{
        opacity: hideIndicator ? 0 : 1
      }}
    ></div>
  )
}

export default ScrollIndicator
