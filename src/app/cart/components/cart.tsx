'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { FiTrash2 } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import Checkout from './checkout'
import ImportModal from './import-modal'
import { Search } from '#/components/search'
import ClearCartModal from './clear-cart-modal'
import { useCart } from '#/contexts/cart-context'
import { formatNumber } from '#/utils/formatNumber'
import { FollowList } from '#/components/follow-list'
import Recommendations from '#/components/recommendations'
import FarcasterIcon from 'public/assets/icons/farcaster.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { PrimaryButton } from '#/components/buttons/primary-button'
import { DEFAULT_CHAIN, LIST_OP_LIMITS } from '#/lib/constants/chain'
import { cn } from '#/lib/utilities'

const Cart = () => {
  const [isClient, setIsClient] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false)
  const [platform, setPlatform] = useState<'farcaster'>('farcaster')

  useEffect(() => {
    setIsClient(true)
  }, [])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { totalCartItems, cartAddresses, socialAddresses, cartItems } = useCart()

  const { selectedList, roles } = useEFPProfile()
  const hasCreatedEfpList = !!selectedList

  const profiles = useMemo(
    () =>
      isConnected
        ? cartAddresses.map(address => ({
            address,
            tags: []
          }))
        : [],
    [cartAddresses]
  )

  const socialProfiles = [
    {
      platform: 'farcaster',
      profiles: socialAddresses.farcaster.map(address => ({
        address,
        tags: []
      })),
      icon: FarcasterIcon
    }
    // {
    //   platform: 'lens',
    //   profiles: socialAddresses.lens.map(address => ({
    //     address,
    //     tags: []
    //   })),
    //   icon: LensIcon
    // }
  ]

  const transactionsCount = useMemo(() => {
    let count = 0
    const splitSize = LIST_OP_LIMITS[roles?.listChainId || DEFAULT_CHAIN.id] || 1000

    for (let i = 0; i < cartItems.length; i += splitSize) {
      count += 1
    }

    if (selectedList === undefined) count += 1

    return count
  }, [cartItems, selectedList])

  return (
    <>
      {isConnected && isCheckingOut ? (
        <div className='px-2'>
          <Checkout setOpen={setIsCheckingOut} hasCreatedEfpList={hasCreatedEfpList} />
        </div>
      ) : (
        <>
          {importModalOpen && (
            <ImportModal onClose={() => setImportModalOpen(false)} platform={platform} />
          )}
          {clearCartModalOpen && <ClearCartModal closeModal={() => setClearCartModalOpen(false)} />}
          <div className='flex flex-col glass-card gap-4 px-1 py-4 sm:p-4 h-fit rounded-2xl border-[3px] border-zinc-200 dark:border-zinc-500 xl:max-w-116 w-full xl:w-1/3'>
            <div className='w-full flex justify-between items-center px-4 sm:px-2 pt-2'>
              <h1 className='text-left text-xl sm:text-3xl font-bold'>{t('editor title')}</h1>
              <div className='flex gap-1'>
                <p className='text-lg font-bold mr-1'>{t('import')}</p>
                <Image
                  src={FarcasterIcon}
                  alt='Import from Farcaster'
                  width={30}
                  className='cursor-pointer rounded-lg hover:opacity-75 hover:scale-110 transition-all'
                  onClick={() => {
                    setImportModalOpen(true)
                    setPlatform('farcaster')
                  }}
                />
                {/* <Image
                  src={LensIcon}
                  alt='Import from Lens'
                  width={30}
                  className='cursor-pointer rounded-lg hover:opacity-75 hover:scale-110 transition-all'
                  onClick={() => {
                    setImportModalOpen(true)
                    setPlatform('lens')
                  }}
                /> */}
              </div>
            </div>
            <Search size='w-full z-50 px-2 pt-2' isEditor={true} />
            <Recommendations header={t('recommendations')} endpoint='recommended' limit={30} />
          </div>
          <div className='flex h-full flex-col glass-card rounded-2xl border-[3px] border-zinc-200 dark:border-zinc-500 gap-3 md:gap-4 md:py-6 pt-5 pb-2 px-1 sm:px-3 md:px-4 w-full xl:w-2/3'>
            <div className='flex justify-between gap-2 flex-row items-center px-3 md:px-4'>
              <h3 className='font-bold text-left text-xl sm:text-3xl xxs:w-2/3'>
                {t('cart unc-changes')}
              </h3>
              {isClient && totalCartItems > 0 && (
                <button
                  className='flex gap-2 cursor-pointer hover:scale-110 transition-transform items-center hover:opacity-80'
                  onClick={() => setClearCartModalOpen(true)}
                >
                  <p className='font-bold text-nowrap'>{t('clear cart')}</p>
                  <FiTrash2 className='text-xl' />
                </button>
              )}
            </div>
            {isClient && totalCartItems === 0 && (
              <div className='font-bold h-28 xl:h-80 px-4 justify-center flex text-lg items-center italic'>
                {t('empty cart')}
              </div>
            )}
            <FollowList
              isLoading={false}
              profiles={profiles}
              socialProfiles={socialProfiles}
              listClassName='rounded-xl gap-1 sm:gap-0'
              listItemClassName='rounded-xl md:p-4 p-1.5 sm:p-2'
              showTags={true}
              createListItem={!hasCreatedEfpList}
              canEditTags={roles?.isManager}
            />
          </div>
          {isClient && (
            <div
              className={cn(
                'fixed md:w-fit w-full top-[85vh] sm:top-[85vh] lg:top-[82.5vh] right-0 px-4 lg:right-[5vw] justify-end',
                isClient && totalCartItems > 0 ? 'flex' : 'hidden'
              )}
            >
              <div className='flex gap-6 w-full border-[3px] border-zinc-200 dark:border-zinc-500 lg:w-fit items-center p-4 bg-white/10 justify-between glass-card bg-opacity-50 shadow-xl rounded-xl'>
                <div className='flex flex-col gap-1 items-start'>
                  <div className='flex gap-2 items-center'>
                    <p className='text-6xl font-bold'>{formatNumber(totalCartItems)}</p>
                    <div className='flex flex-col w-28 font-bold text-lg text-left whitespace-break-spaces'>
                      {t('unc-changes')}
                    </div>
                  </div>
                  <p className='text-base pl-2 font-medium'>{`${formatNumber(transactionsCount)} ${
                    transactionsCount === 1 ? t('transaction') : t('transactions')
                  }`}</p>
                </div>
                <PrimaryButton
                  className='py-[14px] px-4 text-xl rounded-full'
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
        </>
      )}
    </>
  )
}

export default Cart
