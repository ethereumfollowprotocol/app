'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { Avatar } from '#/components/avatar'
import { cn, truncateAddress } from '#/lib/utilities'
import Hamburger from './hamburger'
import CartButton from './cart-button'
import { useQuery } from '@tanstack/react-query'
import { fetchAccount } from 'ethereum-identity-kit'
import LoadingCell from '#/components/loaders/loading-cell'

const NavItems = () => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists } = useEFPProfile()

  const itemUrl =
    selectedList === Number(lists?.primary_list) && pathname !== `/${selectedList}`
      ? userAddress?.toLowerCase()
      : (selectedList?.toString() ?? userAddress?.toLowerCase())

  const { data: account, isLoading: isLoadingAccount } = useQuery({
    queryKey: ['account', userAddress, selectedList],
    queryFn: async () => {
      if (!userAddress) return null
      return await fetchAccount(userAddress, selectedList)
    },
  })
  const profileAvatar = account?.ens.avatar
  const profileName = account?.ens.name

  return (
    <div className='flex w-full items-center justify-between sm:flex-col sm:justify-start sm:gap-3'>
      {NAV_ITEMS.map((item) => {
        if (item.hiddenOnDisconnected && !userAddress) return null

        return (
          <Link
            key={item.name}
            className={cn(
              'group/nav-item relative z-10 rounded-sm p-1.5 transition-all',
              pathname === item.href(itemUrl) && 'bg-primary/30 text-primary-selected'
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
              isLoadingAccount ? (
                <LoadingCell className='h-8 w-8 rounded-full sm:h-9 sm:w-9' />
              ) : (
                <Avatar
                  avatarUrl={profileAvatar}
                  name={profileName || (truncateAddress(userAddress) as string)}
                  size={cn(
                    'sm:w-9 w-8 sm:h-9 h-8 hover:scale-110 transition-transform',
                    pathname === item.href(itemUrl) && 'border-2 border-primary'
                  )}
                />
              )
            ) : (
              <item.icon className='z-50 h-auto w-8 cursor-pointer transition-all group-hover/nav-item:scale-110 sm:w-9' />
            )}
            <div className='absolute top-0 left-full hidden pl-6 opacity-0 transition-all transition-discrete group-hover/nav-item:hidden group-hover/nav-item:opacity-100 sm:group-hover/nav-item:block starting:opacity-0'>
              <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold capitalize'>
                {item.name}
              </p>
            </div>
          </Link>
        )
      })}
      {userAddress && (
        <div className='sm:hidden'>
          <CartButton />
        </div>
      )}
      <Hamburger />
    </div>
  )
}

export default NavItems
