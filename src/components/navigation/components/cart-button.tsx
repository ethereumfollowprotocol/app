'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IoCartSharp } from 'react-icons/io5'

import { cn } from '#/lib/utilities'
import { useCart } from '#/contexts/cart-context'
import { formatNumber } from '#/utils/format/format-number'
import HalloweenCart from 'public/assets/icons/halloween-cart.png'

const CartButton = () => {
  const { totalCartItems } = useCart()

  const pathname = usePathname()
  return (
    <Link href='/cart'>
      <div className='border-[3px] bg-neutral/80 border-grey z-50 h-[54px] justify-center items-center w-[54px] transition-all backdrop-blur-xl cursor-pointer hover:scale-110 relative flex rounded-full'>
        <div
          className={cn(
            'w-[42px] absolute top-[3px] h-[42px] transition-all bg-followButton rounded-full',
            pathname === '/cart' ? 'opacity-100' : 'opacity-0'
          )}
        />
        <IoCartSharp className='transition-opacity text-[28px] -translate-x-px' />
        <Image
          src={HalloweenCart}
          alt='cart'
          width={32}
          height={32}
          className='halloween:block hidden'
        />
        {totalCartItems === 0 ? null : (
          <span className='absolute -right-3 sm:-right-3 -top-3 sm:-top-3 flex h-6 sm:h-7 w-fit min-w-6 sm:min-w-7 items-center px-1 justify-center rounded-full bg-green-400 text-sm font-bold text-black'>
            {formatNumber(totalCartItems)}
          </span>
        )}
      </div>
    </Link>
  )
}

export default CartButton
