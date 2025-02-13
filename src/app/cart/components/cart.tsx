'use client'

import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { lazy, Suspense, useMemo, useRef, useState } from 'react'

import Checkout from './checkout'
import { cn } from '#/lib/utilities'
import ImportModal from './import-modal'
import { useCart } from '#/hooks/use-cart'
import { Search } from '#/components/search'
import ClearCartModal from './clear-cart-modal'
import { useIsClient } from '@uidotdev/usehooks'
import { formatNumber } from '#/utils/format/format-number'
import Recommendations from '#/components/recommendations'
import FarcasterIcon from 'public/assets/icons/socials/farcaster.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import PrimaryButton from '#/components/buttons/primary-button'
import { DEFAULT_CHAIN, LIST_OP_LIMITS } from '#/lib/constants/chains'
import useStickyScroll from '#/components/home/hooks/use-sticky-scroll'
import { useActions } from '#/contexts/actions-context'

const CartItems = lazy(() => import('./cart-items'))

const Cart = () => {
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<'farcaster'>('farcaster')

  const isClient = useIsClient()
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { selectedList, roles } = useEFPProfile()
  const { cart } = useCart()
  const { setIsCheckingOut, isCheckingOut } = useActions()

  const containerRef = useRef<HTMLDivElement>(null)
  const { StickyScrollRef: SidebarRef, onScroll: onScrollSidebar } = useStickyScroll(140)

  const hasCreatedEfpList = !!selectedList
  const transactionsCount = useMemo(() => {
    let count = 0
    const splitSize = LIST_OP_LIMITS[roles?.listChainId || DEFAULT_CHAIN.id] || 1000

    for (let i = 0; i < cart.length; i += splitSize) {
      count += 1
    }

    if (selectedList === undefined) count += 1

    return count
  }, [cart, selectedList])

  return (
    <>
      {isConnected && isCheckingOut ? (
        <div className='px-2'>
          <Checkout setOpen={setIsCheckingOut} hasCreatedEfpList={hasCreatedEfpList} />
        </div>
      ) : (
        <div
          ref={containerRef}
          className={cn(
            'flex h-full w-full flex-col-reverse justify-center gap-4 overflow-y-auto px-2 pt-[6.75rem] pb-40 sm:pb-44 lg:px-8 xl:flex-row xl:gap-6 xl:pb-8',
            cart.length >= 30 && 'xl:pb-0'
          )}
          onScroll={(e) => {
            onScrollSidebar(e)
          }}
        >
          {importModalOpen && <ImportModal onClose={() => setImportModalOpen(false)} platform={selectedPlatform} />}
          {clearCartModalOpen && <ClearCartModal closeModal={() => setClearCartModalOpen(false)} />}
          <div
            className={cn(
              'glass-card border-grey mb-6 flex h-fit w-full flex-col gap-4 rounded-sm border-[3px] px-1 py-4 xl:w-1/3 xl:max-w-[600px]',
              cart.length > 30 && 'xl:sticky'
            )}
            ref={SidebarRef}
          >
            <div className='flex w-full items-center justify-between px-3 pt-2 sm:px-5'>
              <h1 className='text-left text-xl font-bold sm:text-3xl'>{t('editor title')}</h1>
              <div className='flex gap-1'>
                <p className='mr-1 text-right text-lg font-bold'>{t('import')}</p>
                <FarcasterIcon
                  width={30}
                  className='cursor-pointer rounded-sm transition-all hover:scale-110 hover:opacity-75'
                  onClick={() => {
                    setImportModalOpen(true)
                    setSelectedPlatform('farcaster')
                  }}
                />
              </div>
            </div>
            <Search size='w-full z-50 px-2 sm:px-4 pt-2' isEditor={true} />
            <Recommendations header={t('recommendations')} endpoint='recommended' limit={30} />
          </div>
          <div className={cn('relative top-0 flex h-fit w-full flex-col xl:w-2/3', cart.length >= 30 && 'xl:sticky')}>
            <Suspense
              fallback={
                <div className='flex flex-row items-center justify-between gap-2 px-3 md:px-4'>
                  <h3 className='xxs:w-2/3 text-left text-xl font-bold sm:text-3xl'>{t('cart unc-changes')}</h3>
                </div>
              }
            >
              <div className='glass-card border-grey flex h-fit w-full flex-col gap-3 rounded-sm border-[3px] px-1 pt-5 pb-2 sm:px-3 md:gap-4 md:px-4 md:pt-6 xl:absolute xl:top-0 xl:left-0'>
                <CartItems containerRef={containerRef} setClearCartModalOpen={setClearCartModalOpen} />
              </div>
            </Suspense>
          </div>
          {isClient && (
            <div
              className={cn(
                'fixed right-0 -bottom-1 w-full justify-end lg:right-[3vw] lg:bottom-[3vh] lg:w-fit',
                isClient && cart.length > 0 ? 'flex' : 'hidden'
              )}
            >
              <div className='xxs:gap-2 bg-neutral/50 border-grey glass-card bg-opacity-50 flex w-full items-center justify-between gap-1 rounded-t-xl border-[3px] border-b-0 px-3 py-4 shadow-xl sm:p-4 md:gap-6 md:rounded-b-xl md:border-b-[3px] lg:w-fit'>
                <div className='flex flex-col items-start gap-1'>
                  <div className='flex items-center gap-2'>
                    <p className='3xs:text-5xl text-4xl font-bold sm:text-6xl'>{formatNumber(cart.length)}</p>
                    <div className='3xs:text-base flex w-24 flex-col gap-0 text-left text-sm font-bold whitespace-break-spaces sm:w-28 sm:text-lg'>
                      {t('unc-changes')}
                    </div>
                  </div>
                  <p className='pl-2 text-base font-medium'>{`${formatNumber(transactionsCount)} ${
                    transactionsCount === 1 ? t('transaction') : t('transactions')
                  }`}</p>
                </div>
                <PrimaryButton
                  className='rounded-full px-4 text-xl'
                  onClick={() => {
                    if (!isConnected) {
                      if (openConnectModal) openConnectModal()
                      return
                    }

                    setIsCheckingOut(true)
                  }}
                  label={t('confirm')}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Cart
