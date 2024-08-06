'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import Checkout from './components/checkout'
import { Search } from '#/components/search'
import { useCart } from '#/contexts/cart-context'
import Trash from 'public/assets/icons/trash.svg'
import ImportModal from './components/importModal'
import LensIcon from 'public/assets/icons/lens.svg'
import { FollowList } from '#/components/follow-list'
import ClearCartModal from './components/clear-cart-modal'
import Recommendations from '#/components/recommendations'
import { PrimaryButton } from '#/components/primary-button'
import FarcasterIcon from 'public/assets/icons/farcaster.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'

export default function EditorPage() {
  const [isClient, setIsClient] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false)
  const [platform, setPlatform] = useState<'farcaster' | 'lens'>('farcaster')

  useEffect(() => {
    setIsClient(true)
  }, [])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const { isConnected } = useAccount()
  const { t } = useTranslation('editor')
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
    },
    {
      platform: 'lens',
      profiles: socialAddresses.lens.map(address => ({
        address,
        tags: []
      })),
      icon: LensIcon
    }
  ]

  const transactionsCount = useMemo(() => {
    let count = 0
    const splitSize = 100

    for (let i = 0; i < cartItems.length; i += splitSize) {
      count += 1
    }

    if (selectedList === undefined) count += 1

    return count
  }, [cartItems, selectedList])

  return (
    <main
      suppressHydrationWarning={true}
      className='flex flex-col-reverse xl:flex-row gap-4 min-h-full h-full w-full items-center xl:items-start justify-center text-center xl:gap-6 pt-4 pb-40 mt-[108px] sm:mt-28 lg:mt-32 xl:mt-36 px-2 lg:px-8'
    >
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
          <div className='flex flex-col glass-card gap-6 px-3 py-4 sm:p-6 h-fit rounded-2xl border-2 border-gray-200 xl:max-w-116 w-full xl:w-1/3'>
            <div className='w-full flex justify-between items-center'>
              <h1 className='text-left text-3xl font-semibold hidden xl:block'>{t('title')}</h1>
              <div className='flex gap-1'>
                <p className='text-lg font-semibold mr-1'>Import</p>
                <Image
                  src={FarcasterIcon}
                  alt='Import from Farcaster'
                  width={30}
                  className='cursor-pointer rounded-lg hover:opacity-75 transition-opacity'
                  onClick={() => {
                    setImportModalOpen(true)
                    setPlatform('farcaster')
                  }}
                />
                <Image
                  src={LensIcon}
                  alt='Import from Lens'
                  width={30}
                  className='cursor-pointer rounded-lg hover:opacity-75 transition-opacity'
                  onClick={() => {
                    setImportModalOpen(true)
                    setPlatform('lens')
                  }}
                />
              </div>
            </div>
            <Search size='w-full z-50' isEditor={true} />
            <Recommendations header={t('recommendations')} endpoint='recommended' />
          </div>
          <div className='flex h-full flex-col glass-card rounded-2xl border-2 border-gray-200 gap-3 md:gap-4 md:py-8 pt-5 pb-2 px-1 sm:px-3 md:px-4 w-full xl:w-2/3'>
            <div className='flex justify-between gap-2 flex-row items-center px-3 md:px-4'>
              <h3 className='font-bold text-left text-xl sm:text-2xl'>{t('unc-changes')}</h3>
              {totalCartItems > 0 && (
                <button
                  className='flex gap-2 cursor-pointer items-center hover:opacity-70'
                  onClick={() => setClearCartModalOpen(true)}
                >
                  <p className='font-semibold text-nowrap'>Clear Cart</p>
                  <Image src={Trash} alt='empty cart' width={18} height={20} />
                </button>
              )}
            </div>
            {isClient && totalCartItems === 0 && (
              <div className='font-semibold h-28 xl:h-80 px-4 justify-center flex text-lg items-center italic text-darkGrey'>
                {t('empty cart')}
              </div>
            )}
            <FollowList
              isLoading={false}
              profiles={profiles}
              socialProfiles={socialProfiles}
              listClassName='rounded-xl gap-1 sm:gap-0'
              listItemClassName='rounded-xl md:p-4 p-1.5 sm:p-2 hover:bg-white/80'
              showTags={true}
              createListItem={!hasCreatedEfpList}
              canEditTags={roles?.isManager}
            />
          </div>
          {isClient && totalCartItems > 0 && (
            <div className='fixed md:w-fit w-full top-[85vh] sm:top-[85vh] lg:top-[82.5vh] right-0 px-4 lg:right-[5vw] flex justify-end'>
              <div className='flex gap-6 w-full border-[1px] border-gray-200 lg:w-fit items-center p-4 bg-white/10 justify-between glass-card bg-opacity-50 shadow-xl rounded-xl'>
                <div className='flex flex-col gap-1 items-start'>
                  <div className='flex gap-2 items-center'>
                    <p className='text-6xl font-bold'>{totalCartItems}</p>
                    <div className='flex flex-col font-bold text-lg text-left whitespace-break-spaces'>
                      {t('unc-changes')}
                    </div>
                  </div>
                  <p className='text-base pl-2 font-medium'>{`${transactionsCount} ${
                    transactionsCount === 1 ? t('transaction') : t('transactions')
                  }`}</p>
                </div>
                <PrimaryButton
                  className='py-[14px] px-4 text-xl font-medium rounded-full'
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
          <h1 className='text-center text-4xl font-semibold mb-6 xl:hidden'>{t('title')}</h1>
        </>
      )}
    </main>
  )
}
