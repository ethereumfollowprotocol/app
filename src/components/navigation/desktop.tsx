import Link from 'next/link'
import { useWindowSize } from '@uidotdev/usehooks'

import { Search } from '../search'
import Logo from 'public/assets/efp-logo.svg'
import NavItems from './components/nav-items.tsx'
import WalletMenu from './components/wallet-menu.tsx'
import CartButton from './components/cart-button.tsx'
import Notifications from './components/notifications'
import Integrations from './components/integrations.tsx'
import PoweredByEIK from './components/powered-by-eik.tsx'

const Desktop = () => {
  const { width } = useWindowSize()
  const isMobile = width && width < 640

  if (isMobile) return null

  return (
    <nav className='bg-neutral shadow-large fixed top-0 left-0 z-50 hidden h-screen w-[70px] flex-col items-center justify-between py-4 sm:flex 2xl:w-20'>
      <div className='flex flex-col items-center justify-between gap-6'>
        <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol'>
          <Logo className='w-8 translate-x-1 transition-transform select-none hover:scale-110' />
        </Link>
        <div className='flex flex-col items-center justify-end gap-4'>
          <WalletMenu />
          <Search />
          <Notifications />
          <CartButton />
          <hr className='border-text-neutral mb-1 w-10 rounded-full border-[1px]' />
          <NavItems />
        </div>
      </div>
      <div className='flex flex-col items-center justify-end gap-4'>
        <Integrations />
        <PoweredByEIK />
      </div>
    </nav>
  )
}

export default Desktop
