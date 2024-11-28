'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import Menu from './menu'
import { EXTERNAL_LINKS, NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const NavItems = () => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists } = useEFPProfile()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setMobileMenuOpen(false)
  })

  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase()
  const itemIndex = EXTERNAL_LINKS.find(link => link.href === pathname)
    ? 4
    : NAV_ITEMS.findIndex(item => item.href(itemUrl) === pathname)

  return (
    <div ref={clickAwayRef} className='relative'>
      <div className='flex flex-row items-center z-40 relative gap-5 px-2.5 bg-neutral/80 backdrop-blur-xl h-[54px] border-[3px] border-grey rounded-full'>
        <div
          className='w-[42px] absolute top-[3px] h-[42px] duration-300 transition-all bg-followButton rounded-full'
          style={{
            left:
              itemIndex === -1 ? '100%' : `${itemIndex * 48 + (4 - Math.ceil(itemIndex / 3))}px`,
            opacity: itemIndex === -1 ? 0 : 1
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

              setMobileMenuOpen(false)
            }}
          >
            <item.icon className='text-7 w-7 h-7 font-bold z-50 hover:scale-110 transition-transform cursor-pointer' />
          </Link>
        ))}
        <div className='relative'>
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='flex hover:scale-110 w-7 cursor-pointer group relative transition-all pr-px items-center justify-center gap-[5px] flex-col'
          >
            <div className='w-6 h-1 rounded-full transition-all bg-text -translate-x-px'></div>
            <div className='w-6 h-1 rounded-full transition-all bg-text -translate-x-px'></div>
            <div className='w-6 h-1 rounded-full transition-all bg-text -translate-x-px'></div>
          </div>
        </div>
      </div>
      {mobileMenuOpen && <Menu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />}
    </div>
  )
}

export default NavItems
