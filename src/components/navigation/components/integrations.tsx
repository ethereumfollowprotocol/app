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
      href="/integrations"
      className={cn(
        'flex items-center gap-1 text-text-neutral hover:text-text pr-1 hover:scale-110 transition-all',
        isSelected && 'text-text'
      )}
    >
      <TbAppsFilled className="text-4xl font-bold" />
      <p className="text-xl font-bold">{INTEGRATIONS.length}</p>
    </Link>
  )
}

export default Integrations
