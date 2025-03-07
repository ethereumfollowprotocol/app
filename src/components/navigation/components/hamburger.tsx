import React, { useState } from 'react'
import { useClickAway, useIsClient } from '@uidotdev/usehooks'

import Menu from './menu'
import { cn } from '#/lib/utilities'

const Hamburger = () => {
  const [open, setOpen] = useState(false)

  const isClient = useIsClient()
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setOpen(false))

  const lineTransform = [
    'rotate-45 translate-y-2.5 sm:translate-y-0 sm:rotate-0 sm:bg-primary-selected',
    'translate-x-[100vw] sm:translate-x-0 sm:rotate-0 sm:bg-primary-selected',
    'rotate-[-45deg] -translate-y-2.5 sm:translate-y-0 sm:rotate-0 sm:bg-primary-selected',
  ]

  return (
    <div className='group/hamburger relative z-0 sm:z-50' ref={clickAwayRef}>
      <button onClick={() => setOpen(!open)} className='flex flex-col items-center justify-center gap-[7px] py-1.5'>
        {new Array(3).fill(0).map((_, index) => (
          <div
            key={index}
            className={cn(
              'bg-text h-[3px] w-7 rounded-full transition-all duration-300',
              open ? lineTransform[index] : ''
            )}
          ></div>
        ))}
      </button>
      {isClient && <Menu open={open} setOpen={setOpen} />}
    </div>
  )
}

export default Hamburger
