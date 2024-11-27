'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IoCartSharp } from 'react-icons/io5'

import { formatNumber } from '#/utils/format/format-number'
import HalloweenCart from 'public/assets/icons/halloween-cart.png'
import { cn } from '#/lib/utilities'

interface CartButtonProps {
  cartItemsCount: number
}

const CartButton: React.FC<CartButtonProps> = ({ cartItemsCount }) => {
  const pathname = usePathname()
  return (
    <Link href='/cart' passHref={true} legacyBehavior={true}>
      <div
        className={`glass-card border-[3px] border-grey h-[54px] group justify-center items-center w-[54px] transition-all cursor-pointer hover:border-opacity-100 hover:scale-110 relative flex rounded-full`}
      >
        <div
          className={cn(
            'w-[42px] absolute top-[3px] h-[42px] transition-all bg-followButton rounded-full',
            pathname === '/cart' ? 'opacity-100' : 'opacity-0'
          )}
        />
        <IoCartSharp className='group-hover:opacity-100 transition-opacity text-[28px] -translate-x-px halloween:hidden' />
        <Image
          src={HalloweenCart}
          alt='cart'
          width={32}
          height={32}
          className='halloween:block hidden'
        />
        {cartItemsCount === 0 ? null : (
          <span className='absolute -right-3 sm:-right-3 -top-3 sm:-top-3 flex h-6 sm:h-7 w-fit min-w-6 sm:min-w-7 items-center px-1 justify-center rounded-full bg-green-400 text-sm font-bold text-black'>
            {formatNumber(cartItemsCount)}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
