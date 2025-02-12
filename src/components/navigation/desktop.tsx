import Link from 'next/link'
import Image from 'next/image'

import { Search } from '../search'
import Logo from 'public/assets/efp-logo.svg'
import NavItems from './components/nav-items.tsx'
import WalletMenu from './components/wallet-menu.tsx'
import CartButton from './components/cart-button.tsx'
import Integrations from './components/integrations.tsx'
import EIKLogo from 'public/assets/eik-light.svg'

const Desktop = () => {
  return (
    <nav className='bg-neutral flex h-screen w-20 flex-col items-center justify-between py-4 shadow-xl'>
      <div className='flex flex-col items-center justify-between gap-8'>
        <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol'>
          <Image
            src={Logo}
            priority={true}
            className='w-8 transition-transform select-none hover:scale-110'
            alt='Ethereum Follow Protocol Logo'
          />
        </Link>
        <div className='flex flex-col items-center justify-end gap-4'>
          <WalletMenu />
          <Search />
          <CartButton />
          <hr className='border-grey border-text-neutral border-px w-10' />
          <NavItems />
        </div>
      </div>
      <div className='flex flex-col items-center justify-end gap-4'>
        <Integrations />
        <Image src={EIKLogo} alt='Ethereum Identity Kit' className='w-14' />
      </div>
    </nav>
  )
}

export default Desktop
