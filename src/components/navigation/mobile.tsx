import React from 'react'
import Link from 'next/link'

import { Search } from '../search'
import NavItems from './components/nav-items'
import WalletMenu from './components/wallet-menu'
import Integrations from './components/integrations'
import Logo from 'public/assets/efp-logo.svg'
import Bell from 'public/assets/icons/ui/bell.svg'

const Mobile: React.FC = () => {
  return (
    <>
      <div className='background-blur bg-neutral/10 fixed top-0 left-0 z-50 flex w-full justify-between p-4 sm:hidden'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol'>
            <Logo className='w-7 translate-x-1 transition-transform select-none hover:scale-110 sm:w-8' />
          </Link>
          <Search />
        </div>
        <div className='flex items-center gap-3'>
          <Integrations />
          <Bell className='h-auto w-9 cursor-pointer transition-transform hover:scale-110' />
          <WalletMenu />
        </div>
      </div>
      <nav className='bg-neutral shadow-mobile fixed bottom-0 left-0 z-50 flex w-full justify-center p-3 px-4 sm:hidden'>
        <NavItems />
      </nav>
    </>
  )
}

export default Mobile
