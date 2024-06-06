'use client'

import { useAccount } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import Legend from './components/legend'
import Checkout from './components/checkout'
import { Search } from '#/components/search'
import { useCart } from '#/contexts/cart-context'
import { FollowList } from '#/components/follow-list'
import Recommendations from '#/components/recommendations'
import { PrimaryButton } from '#/components/primary-button'
import { useEFPProfile } from '#/contexts/efp-profile-context'

export default function EditorPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const { isConnected } = useAccount()
  const { t } = useTranslation('editor')
  const { openConnectModal } = useConnectModal()
  const { totalCartItems, cartAddresses } = useCart()

  const { profile: connectedProfile } = useEFPProfile()
  const hasCreatedEfpList = !!connectedProfile?.primary_list

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

  return (
    <main
      suppressHydrationWarning={true}
      className='flex flex-col-reverse xl:flex-row gap-4 min-h-full h-full w-full items-center xl:items-start justify-center text-center pt-10 xl:gap-6 pb-40 mt-20 md:mt-28 xl:mt-40 px-2 lg:px-8'
    >
      {isConnected && isCheckingOut ? (
        <div className='px-2'>
          <Checkout setOpen={setIsCheckingOut} hasCreatedEfpList={hasCreatedEfpList} />
        </div>
      ) : (
        <>
          <div className='flex flex-col glass-card gap-6 px-3 py-4 sm:p-6 h-fit rounded-2xl border-2 border-gray-200 xl:max-w-116 w-full xl:w-1/3'>
            <h1 className='text-left text-3xl font-semibold hidden xl:block'>{t('title')}</h1>
            <Search size='w-full z-50' isEditor={true} />
            <Recommendations header={t('recommendations')} />
          </div>
          <div className='flex h-full flex-col glass-card rounded-2xl border-2 border-gray-200 gap-3 md:gap-4 md:py-8 py-6 px-1 sm:px-3 md:px-4 w-full xl:w-2/3'>
            <div className='flex sm:justify-between flex-col gap-2 sm:flex-row sm:items-center px-3 md:px-4'>
              <h3 className='font-bold text-left text-2xl'>{t('unc-changes')}</h3>
              <Legend />
            </div>
            <FollowList
              isLoading={false}
              profiles={profiles}
              listClassName='rounded-xl gap-1 sm:gap-0'
              listItemClassName='rounded-xl md:p-4 p-1.5 sm:p-2 hover:bg-white/80'
              showTags={true}
              createListItem={!hasCreatedEfpList}
              canEditTags={true}
            />
          </div>
          {isClient && totalCartItems > 0 && (
            <div className='fixed w-full top-[85vh] lg:top-[85vh] right-0 px-4 lg:right-[5vw] flex justify-end'>
              <div className='flex gap-6 w-full border-[1px] border-gray-200 lg:w-fit items-center p-4 bg-white/10 justify-between glass-card bg-opacity-50 shadow-xl rounded-xl'>
                <div className='flex gap-2 items-center'>
                  <p className='text-6xl font-bold'>{totalCartItems}</p>
                  <div className='flex flex-col text-lg text-left'>
                    <p className='font-bold'>{t('unconfirmed')}</p>
                    <p className='font-bold'>{t('changes')}</p>
                  </div>
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
