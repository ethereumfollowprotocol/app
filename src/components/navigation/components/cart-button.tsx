'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { IoCartSharp } from 'react-icons/io5'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import { useCart } from '#/hooks/use-cart'
import { formatNumber } from '#/utils/format/format-number'
import HalloweenCart from 'public/assets/icons/halloween-cart.png'

const CartButton = () => {
  const pathname = usePathname()
  const { cart } = useCart()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <Link
      href='/cart'
      onClick={(e) => {
        if (!userAddress && openConnectModal) {
          e.preventDefault()
          openConnectModal()
        }
      }}
    >
      <div
        className={cn(
          'border-[3px] bg-neutral/80 group z-50 h-[54px] justify-center items-center w-[54px] transition-all backdrop-blur-xl cursor-pointer hover:scale-110 relative flex rounded-full border-grey hover:border-text'
        )}
      >
        <div
          className={cn(
            'w-[44px] absolute top-[2px] h-[44px] bg-followButton rounded-full',
            pathname === '/cart' ? 'opacity-100' : 'opacity-0'
          )}
        />
        <IoCartSharp
          className={cn(
            'text-[28px] -translate-x-px transition-all',
            pathname === '/cart' ? 'text-black' : 'text-text-neutral group-hover:text-text'
          )}
        />
        <Image src={HalloweenCart} alt='cart' width={32} height={32} className='halloween:block hidden' />
        {cart.length === 0 ? null : (
          <span className='absolute -right-3 sm:-right-3 -top-3 sm:-top-3 flex h-6 sm:h-7 w-fit min-w-6 sm:min-w-7 items-center px-1 justify-center rounded-full bg-green-400 text-sm font-bold text-black'>
            {formatNumber(cart.length)}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
