'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { NAV_ITEMS } from '#/lib/constants'
import { usePathname } from 'next/navigation'

const NavItems = () => {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <ul className='lg:flex hidden lg:gap-6 xl:gap-9 items-center'>
      {NAV_ITEMS.map((item, index) => (
        <li className='font-bold' key={`${item.name}`}>
          <Link
            prefetch={true}
            href={item.href}
            className={clsx([
              'capitalize xl:text-xl lg:text-lg transition-colors',
              item.href === pathname ? 'text-darkGrey' : 'text-grey hover:text-gray-500'
            ])}
          >
            <span className='hidden sm:block text-nowrap'>{t(`navigation.${item.name}`)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavItems
