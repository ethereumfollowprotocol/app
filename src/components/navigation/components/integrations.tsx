import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbAppsFilled } from 'react-icons/tb'

import { INTEGRATIONS } from '#/lib/constants/integrations'
import { cn } from '#/lib/utilities'

const Integrations: React.FC = () => {
  const pathname = usePathname()
  const isSelected = pathname === '/integrations'

  return (
    <Link
      href='/integrations'
      className={cn('flex items-center gap-0.5 transition-all hover:scale-110', isSelected && 'text-text')}
    >
      <TbAppsFilled className='text-2xl font-bold' />
      <p className='text-lg font-bold'>{INTEGRATIONS.length}</p>
    </Link>
  )
}

export default Integrations
