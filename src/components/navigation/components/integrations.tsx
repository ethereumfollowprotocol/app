import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '#/lib/utilities'
import Apps from 'public/assets/icons/ui/apps.svg'
import { INTEGRATIONS } from '#/lib/constants/integrations'
import { useTranslation } from 'react-i18next'
import { useGlassTheme } from '#/hooks/use-glass-theme'

const Integrations: React.FC = () => {
  const { t } = useTranslation()
  const { getTooltipClass } = useGlassTheme()
  const pathname = usePathname()
  const isSelected = pathname === '/integrations'

  return (
    <Link href='/integrations' className={cn('group/integrations relative', isSelected && 'text-primary-selected')}>
      <div className='flex items-center gap-0.5 transition-all hover:scale-110'>
        <Apps className='h-7 w-7 font-bold' />
        <p className='text-lg font-bold'>{INTEGRATIONS.length}</p>
      </div>
      <div className='absolute -top-2 left-full hidden pl-6 opacity-0 transition-all transition-discrete group-hover/integrations:hidden group-hover/integrations:opacity-100 sm:group-hover/integrations:block starting:opacity-0'>
        <p className={`${getTooltipClass()} text-text px-4 py-2 text-lg font-semibold capitalize`}>
          {t('integrations')}
        </p>
      </div>
    </Link>
  )
}

export default Integrations
