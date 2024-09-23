'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
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

  const handleScroll = () => {
    const { scrollX, scrollY } = window

    mouseX.set(mouseX.get() - scrollX)
    mouseY.set(mouseY.get() - scrollY)
  }

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        'relative h-full min-h-screen bg-white dark:bg-darkGrey w-full m-0 p-0 group/background',
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className={cn(
          'absolute inset-0 top-0 left-0 h-full w-full pointer-events-none',
          isClient ? 'opacity-100' : 'opacity-20'
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
        className='pointer-events-none top-0 left-0 absolute h-full w-full inset-0 opacity-0 transition-all duration-500 group-hover/background:opacity-100'
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

      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  )
}
