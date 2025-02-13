import React, { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

import Menu from './menu'

const Hamburger = () => {
  const [open, setOpen] = useState(false)
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setOpen(false))

  return (
    <div className='group/hamburger relative z-50' ref={clickAwayRef}>
      <button onClick={() => setOpen(!open)} className='flex flex-col items-center justify-center gap-[7px] py-1.5'>
        {new Array(3).fill(0).map((_, index) => (
          <div key={index} className='bg-text h-[3px] w-7 rounded-full transition-all'></div>
        ))}
      </button>
      <Menu open={open} setOpen={setOpen} />
    </div>
  )
}

export default Hamburger
