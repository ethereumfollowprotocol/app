import React from 'react'
import { useAccount } from 'wagmi'

import NavItems from './components/nav-items'
import CartButton from './components/cart-button'

const Mobile: React.FC = () => {
  const { address: userAddress } = useAccount()

  return (
    <nav className='fixed mx-auto bottom-4 z-50 flex justify-center w-full lg:hidden'>
      <div className='flex items-center gap-1.5'>
        <NavItems />
        {userAddress && <CartButton />}
      </div>
    </nav>
  )
}

export default Mobile
