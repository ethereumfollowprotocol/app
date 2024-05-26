'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { NAV_ITEMS } from '#/lib/constants'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
  open: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open }) => {
  const pathname = usePathname()
  const { t } = useTranslation()

  if (!open) return null

  return (
    <div className=' bg-white/90  glass-card px-3 py-2 gap-1 z-50 shadow-md border-2 rounded-md border-gray-200 absolute top-[120%] flex flex-col items-end right-0'>
      {NAV_ITEMS.map(item => (
        <div className='font-bold' key={`${item.name}`}>
          <Link
            prefetch={true}
            href={item.href}
            className={clsx([
              'capitalize xl:text-xl lg:text-lg transition-colors',
              pathname === item.href ? 'text-darkGrey' : 'text-grey hover:text-gray-500'
            ])}
          >
            <span className='block'>{t(`navigation.${item.name}`)}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MobileMenu
