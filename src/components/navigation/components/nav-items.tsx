'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const NavItems = () => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists } = useEFPProfile()

  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase()

  return (
    <div className='flex flex-row items-center relative gap-4 px-[9px] glass-card h-12 border-[3px] border-grey rounded-full'>
      <div
        className='w-9 absolute top-[3px] h-9 transition-all bg-followButton rounded-full'
        style={{
          left: `${NAV_ITEMS.findIndex(item => item.href(itemUrl) === pathname) * 40 + 3}px`
        }}
      />
      {NAV_ITEMS.map(item => (
        <Link
          key={item.name}
          prefetch={true}
          className='z-10'
          href={item.href(itemUrl)}
          onClick={e => {
            if (
              (item.name === 'profile' || item.name === 'feed') &&
              !userAddress &&
              openConnectModal
            ) {
              e.preventDefault()
              openConnectModal()
            }
          }}
        >
          <item.icon className='text-2xl w-6 h-6 font-bold z-10 hover:scale-[1.2] transition-transform cursor-pointer' />
        </Link>
      ))}
    </div>
  )
}

export default NavItems
