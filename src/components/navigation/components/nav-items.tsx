'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { Avatar } from '#/components/avatar'
import { cn, truncateAddress } from '#/lib/utilities'

const NavItems = () => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists, profile } = useEFPProfile()

  const itemUrl =
    selectedList === Number(lists?.primary_list) && pathname !== `/${selectedList}`
      ? userAddress?.toLowerCase()
      : (selectedList?.toString() ?? userAddress?.toLowerCase())

  const profileAvatar = profile?.ens.avatar
  const profileName = profile?.ens.name

  return (
    <div className='flex items-center gap-[8vw] sm:flex-col sm:justify-start sm:gap-3'>
      {NAV_ITEMS.map((item) => {
        if (item.hiddenOnDisconnected && !userAddress) return null

        return (
          <Link
            key={item.name}
            className={cn(
              'group/nav-item z-10 rounded-sm p-1.5 transition-all',
              pathname === item.href(itemUrl) && 'bg-follow-button/30 text-follow-button'
            )}
            href={item.href(itemUrl)}
            prefetch={true}
            onClick={(e) => {
              if ((item.name === 'profile' || item.name === 'feed') && !userAddress && openConnectModal) {
                e.preventDefault()
                openConnectModal()
              }
            }}
          >
            {item.name === 'profile' && userAddress ? (
              <Avatar
                avatarUrl={profileAvatar}
                name={profileName || (truncateAddress(userAddress) as string)}
                size='w-9 h-9 hover:scale-110 transition-transform'
              />
            ) : (
              <item.icon className='z-50 h-auto w-9 cursor-pointer transition-all group-hover/nav-item:scale-110' />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default NavItems
