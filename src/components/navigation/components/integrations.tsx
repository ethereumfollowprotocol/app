import Link from 'next/link'
import React, { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'
import { TbAppsFilled, TbArrowRight } from 'react-icons/tb'

import { cn } from '#/lib/utilities'
import { INTEGRATIONS } from '#/lib/constants/integrations'

const Integrations: React.FC = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setTooltipOpen(false))

  return (
    <div className='relative group cursor-help' ref={clickAwayRef}>
      <div className='flex items-center gap-1' onClick={() => setTooltipOpen(!tooltipOpen)}>
        <TbAppsFilled className='text-4xl font-bold' />
        <p className='text-xl font-bold'>{INTEGRATIONS.length}</p>
      </div>
      <div
        className={cn(
          'group-hover:block absolute p-4 top-full -left-20 md:-left-6 w-68 h-full',
          tooltipOpen ? 'block' : 'hidden'
        )}
      >
        <div className='w-full rounded-lg border-grey border-[3px] bg-neutral p-3'>
          <p className='text-[20px] font-bold'>{INTEGRATIONS.length} Integrations</p>
          <p className='text-sm font-medium'>
            Connect your apps to your account to use them in your projects.
          </p>
          <Link
            href='/about'
            onClick={() => setTooltipOpen(false)}
            className='text-sm flex hover:scale-105 transition-all duration-300 items-center gap-1.5 font-medium mt-3'
          >
            <p className='text-base font-bold'>View Integrations</p>
            <TbArrowRight className='text-lg font-bold' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Integrations
