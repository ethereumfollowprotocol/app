import React from 'react'
import Link from 'next/link'
import { TbAppsFilled } from 'react-icons/tb'
import { INTEGRATIONS } from '#/lib/constants/integrations'

const Integrations: React.FC = () => {
  return (
    <Link
      href='/integrations'
      className='flex items-center gap-1 hover:scale-110 transition-all duration-300'
    >
      <TbAppsFilled className='text-4xl font-bold' />
      <p className='text-xl font-bold'>{INTEGRATIONS.length}</p>
    </Link>
  )
}

export default Integrations
