import React from 'react'
import { usePathname } from 'next/navigation'

import { cn } from '#/lib/utilities'
import NavItems from './components/nav-items'
import CartButton from './components/cart-button'
import { useCart } from '#/hooks/use-cart'
import { useActions } from '#/contexts/actions-context'

const Mobile: React.FC = () => {
  const { cart } = useCart()
  const pathname = usePathname()
  const { isCheckingOut } = useActions()

  return (
    <nav
      className={cn(
        'fixed mx-auto bottom-6 z-50 flex justify-center w-full lg:hidden',
        pathname === '/cart' && cart.length > 0 && !isCheckingOut && 'bottom-28 sm:bottom-32'
      )}
    >
      <div className='flex items-center gap-1.5'>
        <NavItems />
        <CartButton />
      </div>
    </nav>
  )
}

export default Mobile
