'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { Avatar } from 'ethereum-identity-kit'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const NavItems = () => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists, profile } = useEFPProfile()

  const itemUrl =
    selectedList === Number(lists?.primary_list) && pathname !== `/${selectedList}`
      ? userAddress?.toLowerCase()
      : (selectedList?.toString() ?? userAddress?.toLowerCase())

  return (
    <div className='flex items-center gap-[8vw] sm:flex-col sm:justify-start sm:gap-6'>
      {NAV_ITEMS.map((item) => {
        if (item.hiddenOnDisconnected && !userAddress) return null

        return (
          <Link
            key={item.name}
            className='group/nav-item z-10'
            href={item.href(itemUrl)}
            prefetch={true}
            onClick={(e) => {
              if ((item.name === 'profile' || item.name === 'feed') && !userAddress && openConnectModal) {
                e.preventDefault()
                openConnectModal()
              }
            }}
          >
            {item.name === 'profile' ? (
              <Avatar src={profile?.ens.avatar} address={userAddress} className='h-9 w-9' />
            ) : (
              <item.icon className='z-50 h-auto w-8 cursor-pointer transition-all group-hover/nav-item:scale-110' />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default NavItems
