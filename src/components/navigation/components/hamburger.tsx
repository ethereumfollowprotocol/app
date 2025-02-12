import React, { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

import Menu from './menu'

const Hamburger = () => {
  const [open, setOpen] = useState(false)
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setOpen(false))

  return (
    <div className='group/hamburger relative z-50' ref={clickAwayRef}>
      <button onClick={() => setOpen(!open)} className='flex flex-col items-center justify-center gap-[5px]'>
        {new Array(3).fill(0).map((_, index) => (
          <div key={index} className='bg-text h-1 w-6 rounded-full transition-all'></div>
        ))}
      </button>
      <Menu open={open} setOpen={setOpen} />
    </div>
  )
}

export default Hamburger
