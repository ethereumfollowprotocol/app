'use client'

import { cn } from '#/lib/utilities'
import type { ReactNode } from 'react'

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

const BackgroundLights = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          'relative flex flex-col min-h-screen h-fit bg-transparent transition-bg',
          className
        )}
        {...props}
      >
        <div className='absolute top-0 left-0 inset-0 overflow-hidden'>
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              '[background-image:var(--white-gradient),var(--aurora)] dark:[background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] filter blur-[10px] invert dark:invert-0 after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:animate-lights after:[background-attachment:fixed] after:mix-blend-difference pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform',
              showRadialGradient &&
                '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]'
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  )
}

export default BackgroundLights
