'use client'

import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion'

import { cn } from '#/lib/utilities'

export const HeroHighlight = ({
  children,
  className,
  containerClassName
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const { resolvedTheme } = useTheme()

  const [previusScrollY, setPreviousScrollY] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY
  }: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTarget) return
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const handleScroll = useCallback(() => {
    const { scrollY } = window

    setPreviousScrollY(scrollY)
    mouseY.set(
      mouseY.get() + (scrollY - (previusScrollY || scrollY))
      // mouseY.get() + (scrollY > innerHeight ? scrollY - (innerHeight - mouseY.get()) : scrollY)
    )
  }, [previusScrollY])

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      className={cn(
        'relative h-full min-h-screen w-full m-0 p-0 group/background',
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className={cn(
          'absolute inset-0 top-0 z-0 left-0 h-full w-full pointer-events-none',
          isClient ? 'opacity-100' : 'opacity-10'
        )}
        style={{
          backgroundRepeat: 'repeat',
          backgroundImage:
            resolvedTheme === 'dark'
              ? 'url(assets/art/background-dot.svg'
              : 'url(assets/art/background-dot-light.svg)'
        }}
      />
      <motion.div
        transition={{ duration: 0.5 }}
        className='pointer-events-none top-0 z-0 left-0 absolute h-full w-full inset-0 opacity-0 transition-all duration-500 group-hover/background:opacity-100'
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,

          backgroundImage: 'url(assets/art/background-dot-color.svg)',
          backgroundRepeat: 'repeat'
        }}
      />
      {/* <div
        className='fixed top-0 waves-bg w-screen h-screen left-0 z-40'
        style={{
          backgroundImage: `url(assets/art/waves-background.svg)`
        }}
      /> */}
      <div className={cn('relative z-50', className)}>{children}</div>
    </div>
  )
}
