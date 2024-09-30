'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import type { Dispatch, SetStateAction } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import { NAV_ITEMS } from '#/lib/constants'
import { usePathname } from 'next/navigation'
import { useEFPProfile } from '#/contexts/efp-profile-context'

interface MobileMenuProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, setOpen }) => {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()
  const { address: userAddress } = useAccount()
  const { selectedList, lists } = useEFPProfile()
  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase()

  if (!open) return null

  return (
    <div className='bg-neutral p-1 gap-1 z-50 shadow-md border-[3px] rounded-md border-grey absolute top-[120%] flex flex-col items-end right-0'>
      {NAV_ITEMS.map(item => (
        <div className='font-bold w-full' key={`${item.name}`}>
          <Link
            prefetch={true}
            href={item.href(itemUrl)}
            className={cn([
              'capitalize xl:text-xl block lg:text-lg transition-colors p-3 w-full rounded-md hover:bg-navItem',
              item.href(itemUrl) === pathname.toLowerCase()
                ? 'text-text'
                : 'text-grey dark:text-zinc-300 hover:text-text'
            ])}
            onClick={e => {
              if (item.name === 'profile' && !userAddress && openConnectModal) {
                e.preventDefault()
                openConnectModal()
              } else setOpen(false)
            }}
          >
            <span className='block text-nowrap'>{t(`${item.name}`)}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MobileMenu
