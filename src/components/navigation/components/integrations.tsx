import React from 'react'
import Link from 'next/link'
import { TbAppsFilled, TbArrowRight } from 'react-icons/tb'

import { INTEGRATIONS } from '#/lib/constants/integrations'

const Integrations: React.FC = () => {
  return (
    <div className='relative group cursor-help'>
      <div className='flex items-center gap-1.5'>
        <TbAppsFilled className='text-4xl font-bold' />
        <p className='text-xl font-bold'>{INTEGRATIONS.length}</p>
      </div>
      <div className='group-hover:block absolute pt-2 top-full -left-3 w-56 h-full hidden'>
        <div className='w-full glass-card rounded-lg border-grey border-[3px] bg-neutral/90 p-3 group-hover:block hidden'>
          <p className='text-[20px] font-bold'>{INTEGRATIONS.length} Integrations</p>
          <p className='text-sm font-medium'>
            Connect your apps to your account to use them in your projects.
          </p>
          <Link
            href='/about'
            className='text-sm flex hover:scale-105 transition-all duration-300 items-center gap-1.5 font-medium mt-2'
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
