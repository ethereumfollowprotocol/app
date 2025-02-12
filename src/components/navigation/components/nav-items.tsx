'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import Hamburger from './hamburger'
import { NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const NavItems = () => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists } = useEFPProfile()

  const itemUrl =
    selectedList === Number(lists?.primary_list) && pathname !== `/${selectedList}`
      ? userAddress?.toLowerCase()
      : (selectedList?.toString() ?? userAddress?.toLowerCase())

  return (
    <div className='flex flex-col items-center gap-4'>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.name}
          className='group/nav-item z-10 px-0.5'
          href={item.href(itemUrl)}
          prefetch={true}
          onClick={(e) => {
            if ((item.name === 'profile' || item.name === 'feed') && !userAddress && openConnectModal) {
              e.preventDefault()
              openConnectModal()
            }
          }}
        >
          <item.icon className='z-50 h-12 w-12 cursor-pointer px-2 text-[28px] font-bold transition-all group-hover/nav-item:scale-110' />
        </Link>
      ))}
      <Hamburger />
    </div>
  )
}

export default NavItems
