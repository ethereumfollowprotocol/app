import React from 'react'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'

import NavItems from './components/nav-items'
import CartButton from './components/cart-button'
import { cn } from '#/lib/utilities'
import { useCart } from '#/contexts/cart-context'
import { useActions } from '#/contexts/actions-context'

const Mobile: React.FC = () => {
  const pathname = usePathname()
  const { totalCartItems } = useCart()
  const { isCheckingOut } = useActions()
  const { address: userAddress } = useAccount()

  return (
    <nav
      className={cn(
        'fixed mx-auto bottom-6 z-50 flex justify-center w-full lg:hidden',
        pathname === '/cart' && totalCartItems > 0 && !isCheckingOut && 'bottom-28 sm:bottom-32'
      )}
    >
      <div className='flex items-center gap-1.5'>
        <NavItems />
        {userAddress && <CartButton />}
      </div>
    </nav>
  )
}

export default Mobile
