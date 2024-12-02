'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import Menu from './menu'
import { cn } from '#/lib/utilities'
import { EXTERNAL_LINKS, NAV_ITEMS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const NavItems = () => {
  const [isHoverOnSelectedItem, setIsHoverOnSelectedItem] = useState(false)
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
      <div className=' z-40 bg-neutral/80 backdrop-blur-xl flex items-center hover:scale-[1.025] hover:border-text transition-all h-[54px] border-[3px] border-grey rounded-full'>
        <div className='flex flex-row items-center z-40 relative hover:scale-[0.975] transition-all h-[54px]'>
          <div
            className={cn(
              'w-[42px] absolute top-[6px] h-[42px] border-[3px] border-transparent hover:scale-110 transition-transform bg-followButton rounded-full',
              isHoverOnSelectedItem && 'scale-110'
            )}
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
              <item.icon
                onMouseEnter={() =>
                  item.href(itemUrl) === pathname && setIsHoverOnSelectedItem(true)
                }
                onMouseLeave={() => setIsHoverOnSelectedItem(false)}
                className={cn(
                  'px-2.5 w-[48px] h-12 font-bold text-[28px] z-50 hover:scale-[1.15] transition-all cursor-pointer',
                  item.href(itemUrl) === pathname
                    ? 'text-black'
                    : 'text-text-neutral hover:text-text'
                )}
              />
            </Link>
          ))}
          <div className='relative'>
            <div
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='flex hover:scale-[1.2] w-[54px] px-3 cursor-pointer group/hamburger relative transition-all items-center justify-center gap-[5px] flex-col'
            >
              <div
                className={cn(
                  'w-6 h-1 rounded-full transition-all bg-text -translate-x-px',
                  itemIndex === 4 ? 'bg-black' : 'bg-text-neutral group-hover/hamburger:bg-text'
                )}
              ></div>
              <div
                className={cn(
                  'w-6 h-1 rounded-full transition-all bg-text -translate-x-px',
                  itemIndex === 4 ? 'bg-black' : 'bg-text-neutral group-hover/hamburger:bg-text'
                )}
              ></div>
              <div
                className={cn(
                  'w-6 h-1 rounded-full transition-all bg-text -translate-x-px',
                  itemIndex === 4 ? 'bg-black' : 'bg-text-neutral group-hover/hamburger:bg-text'
                )}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {mobileMenuOpen && <Menu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />}
    </div>
  )
}

export default NavItems
