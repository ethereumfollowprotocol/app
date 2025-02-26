'use client'

import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import { useCart } from '#/hooks/use-cart'
import { formatNumber } from '#/utils/format/format-number'
import CartIcon from 'public/assets/icons/ui/cart.svg'
import { useTranslation } from 'react-i18next'
import { useTransactions } from '@encrypteddegen/identity-kit'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const CartButton = () => {
  const { cart } = useCart()
  const { t } = useTranslation()
  const { roles } = useEFPProfile()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { setTxModalOpen, txModalOpen, nonce, selectedChainId } = useTransactions()

  console.log('efp', roles?.listSlot, roles?.listChainId)
  console.log('eik', nonce, selectedChainId)

  if (!userAddress) return null

  return (
    <div
      className='group/cart-button relative z-10'
      onClick={(e) => {
        if (!userAddress && openConnectModal) {
          e.preventDefault()
          openConnectModal()
        } else {
          setTxModalOpen(true)
        }
      }}
    >
      <div className={cn('transition-transform hover:scale-110', txModalOpen && 'text-primary')}>
        <CartIcon className={cn('h-8 w-8 sm:h-9 sm:w-9')} />
        {cart.length === 0 ? null : (
          <span className='absolute -top-1.5 -right-1.5 flex h-6 w-fit min-w-6 items-center justify-center rounded-full bg-green-400 px-1 text-sm font-bold text-black sm:h-5 sm:min-w-5'>
            {formatNumber(cart.length)}
          </span>
        )}
      </div>
      <div className='absolute top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/cart-button:hidden group-hover/cart-button:opacity-100 sm:group-hover/cart-button:block starting:opacity-0'>
        <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
          {t('cart')}
        </p>
      </div>
    </div>
  )
}

export default CartButton
