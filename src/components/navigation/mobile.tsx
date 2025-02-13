import React from 'react'
import Link from 'next/link'

import { Search } from '../search'
import Logo from 'public/assets/efp-logo.svg'
import NavItems from './components/nav-items'
import Hamburger from './components/hamburger'
import CartButton from './components/cart-button'
import WalletMenu from './components/wallet-menu'
import Integrations from './components/integrations'

const Mobile: React.FC = () => {
  return (
    <>
      <div className='fixed top-0 left-0 z-50 flex w-full justify-between p-4 sm:hidden'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol'>
            <Logo className='w-7 translate-x-1 transition-transform select-none hover:scale-110 sm:w-8' />
          </Link>
          <Search />
        </div>
        <div className='flex items-center gap-4'>
          <Integrations />
          <WalletMenu />
        </div>
      </div>
      <nav className='bg-neutral fixed bottom-0 left-0 z-50 flex w-full justify-center p-3 sm:hidden'>
        <div className='flex items-center gap-[8vw]'>
          <NavItems />
          <CartButton />
          <Hamburger />
        </div>
      </nav>
    </>
  )
}

export default Mobile
