'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { NAV_ITEMS } from '#/lib/constants'
import { usePathname } from 'next/navigation'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const NavItems = () => {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { selectedList, profile } = useEFPProfile()
  const itemUrl =
    pathname.split('?')[0]?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(profile?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase()

  return (
    <ul className='lg:flex hidden lg:gap-6 xl:gap-9 items-center'>
      {NAV_ITEMS.map((item, index) => (
        <li className='font-bold' key={`${item.name}`}>
          <Link
            prefetch={true}
            href={item.href(itemUrl)}
            className={clsx([
              'capitalize xl:text-xl lg:text-lg transition-colors',
              item.href(itemUrl) === pathname.toLowerCase()
                ? 'text-darkGrey'
                : 'text-grey hover:text-gray-500'
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
