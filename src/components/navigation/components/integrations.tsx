import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '#/lib/utilities'
import Apps from 'public/assets/icons/ui/apps.svg'
import { INTEGRATIONS } from '#/lib/constants/integrations'

const Integrations: React.FC = () => {
  const pathname = usePathname()
  const isSelected = pathname === '/integrations'

  return (
    <Link
      href='/integrations'
      className={cn('flex items-center gap-0.5 transition-all hover:scale-110', isSelected && 'text-text')}
    >
      <Apps className='h-7 w-7 font-bold' />
      <p className='text-lg font-bold'>{INTEGRATIONS.length}</p>
    </Link>
  )
}

export default Integrations
