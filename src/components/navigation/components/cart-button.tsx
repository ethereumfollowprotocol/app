'use client'

import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { EFPActionIds, useTransactions } from 'ethereum-identity-kit'

import { cn } from '#/lib/utilities'
import { useCart } from '#/hooks/use-cart'
import CartIcon from 'public/assets/icons/ui/cart.svg'
import { formatNumber } from '#/utils/format/format-number'

const CartButton = () => {
  const { cart } = useCart()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { setTxModalOpen, txModalOpen, pendingTxs, setChangesOpen } = useTransactions()

  const changesCount = useMemo(() => {
    return cart.length + pendingTxs.filter((tx) => tx.id !== EFPActionIds.UpdateEFPList).length
  }, [cart, pendingTxs])

  if (!userAddress) return null

  return (
    <div
      className='group/cart-button relative z-10'
      onClick={(e) => {
        if (!userAddress && openConnectModal) {
          e.preventDefault()
          openConnectModal()
        } else {
          if (cart.length === 0 && pendingTxs.length > 0) setChangesOpen(false)
          setTxModalOpen(true)
        }
      }}
    >
      <div className={cn('cursor-point transition-transform hover:scale-110', txModalOpen && 'text-primary')}>
        <CartIcon className={cn('h-[34px] w-[34px] -translate-x-px')} />
        {changesCount === 0 ? null : (
          <span className='absolute -top-1.5 -right-1.5 flex h-6 w-fit min-w-6 items-center justify-center rounded-full bg-green-400 px-1 text-sm font-bold text-black sm:h-5 sm:min-w-5'>
            {formatNumber(changesCount)}
          </span>
        )}
      </div>
      <div className='absolute top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/cart-button:hidden group-hover/cart-button:opacity-100 sm:group-hover/cart-button:block starting:opacity-0'>
        <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
          {t('cart.title')}
        </p>
      </div>
    </div>
  )
}

export default CartButton
