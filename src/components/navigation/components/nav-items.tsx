'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { NAV_ITEMS } from '#/lib/constants'
import { usePathname } from 'next/navigation'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useConnectModal } from '@rainbow-me/rainbowkit'

const NavItems = () => {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists } = useEFPProfile()
  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase()

  return (
    <ul className='lg:flex hidden lg:gap-6 xl:gap-9 items-center'>
      {NAV_ITEMS.map(item => (
        <li className='font-bold hover:scale-110 transition-transform' key={`${item.name}`}>
          <Link
            prefetch={true}
            href={item.href(itemUrl)}
            className={clsx([
              'capitalize xl:text-xl lg:text-lg transition-all',
              item.name === 'profile' && !userAddress
                ? 'text-grey hover:text-darkGrey'
                : item.href(itemUrl) === pathname.toLowerCase()
                  ? 'text-darkGrey'
                  : 'text-grey hover:text-darkGrey'
            ])}
            onClick={e => {
              if (item.name === 'profile' && !userAddress && openConnectModal) {
                e.preventDefault()
                openConnectModal()
              }
            }}
          >
            <span className='hidden sm:block text-nowrap'>{t(`${item.name}`)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavItems
