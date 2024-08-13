'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useWalletClient } from 'wagmi'

import { LANGUAGES } from '#/lib/constants'
import useLanguage from '../hooks/useLanguage'
import { resolveEnsProfile } from '#/utils/ens'
import { truncateAddress } from '#/lib/utilities'
import Wallet from 'public/assets/icons/wallet.svg'
import ArrowLeft from 'public/assets/icons/arrow-left.svg'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import GreenCheck from 'public/assets/icons/check-green.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'

const nullEnsProfile = {
  name: null,
  avatar: null
}

const ConnectButton = () => {
  const [walletMenOpenu, setWalletMenuOpen] = useState(false)
  const [listMenuOpen, setListMenuOpen] = useState(false)
  const { changeLanguage, languageMenOpenu, selectedLanguage, setLanguageMenuOpen } = useLanguage()

  const clickAwayWalletRef = useClickAway<HTMLDivElement>(_ => {
    setWalletMenuOpen(false)
  })
  const clickAwayListRef = useClickAway<HTMLDivElement>(_ => {
    setListMenuOpen(false)
  })
  const clickAwayLanguageRef = useClickAway<HTMLDivElement>(_ => {
    setLanguageMenuOpen(false)
  })

  const { t } = useTranslation()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { selectedList, lists, setSelectedList } = useEFPProfile()
  const { address: userAddress, isConnected, connector } = useAccount()
  const { isLoading: isLoadingWalletClient, data: walletClient } = useWalletClient()

  useEffect(() => {
    if (
      isConnected &&
      userAddress !== undefined &&
      connector !== undefined &&
      !isLoadingWalletClient &&
      !walletClient
    ) {
      disconnect()
    }
  }, [connector, walletClient, isLoadingWalletClient])

  const { data: ensProfile } = useQuery({
    queryKey: ['ens-data', userAddress],
    queryFn: async () => {
      if (!userAddress) return nullEnsProfile

      const data = await resolveEnsProfile(userAddress)
      return data
    }
  })

  return (
    <div ref={clickAwayWalletRef} className='relative'>
      <button
        type='button'
        className={`z-50 px-1 ${
          walletMenOpenu ? 'connect-button-open' : 'connect-button'
        } transition-colors border-2 gap-[6px] cursor-pointer flex justify-between items-center h-[60px] glass-card rounded-full w-fit sm:w-56`}
        onClick={() =>
          userAddress
            ? setWalletMenuOpen(!walletMenOpenu)
            : openConnectModal
              ? openConnectModal()
              : null
        }
      >
        {userAddress ? (
          <>
            <div className='flex items-center max-w-[85%] h-fit gap-[12px]'>
              <Image
                src={ensProfile?.avatar || DefaultAvatar}
                alt='ENS Avatar'
                width={50}
                height={50}
                className='rounded-full'
                unoptimized={true}
              />
              <p className='font-semibold hidden sm:block truncate text-lg'>
                {ensProfile?.name || truncateAddress(userAddress)}
              </p>
            </div>
            <Image
              src={ArrowDown}
              alt='Open button'
              className={`${walletMenOpenu ? 'rotate-180' : ''} transition-transform w-4 mr-1`}
            />
          </>
        ) : (
          <div className='w-full sm:w-54 h-full flex items-center justify-center rounded-full'>
            <p className='hidden xxs:block font-semibold text-lg text-nowrap px-1 text-black'>
              {t('connect')}
            </p>
            <Image
              src={Wallet}
              alt='Connect Wallet'
              width={30}
              height={32}
              className='bloxk xxs:hidden mx-2'
            />
          </div>
        )}
      </button>
      {walletMenOpenu && (
        <div className='p-1 flex w-[190px] z-50 shadow-md border-2 rounded-lg bg-white/95 border-gray-200 absolute top-[120%] flex-col items-end right-0'>
          {lists?.lists && lists.lists.length > 0 && (
            <div ref={clickAwayListRef} className='w-full cursor-pointer group relative'>
              <div
                onClick={() => setListMenuOpen(!listMenuOpen)}
                className='flex justify-between items-center w-full group-hover:bg-slate-100 p-3 rounded-md transition-opacity cursor-pointer'
              >
                {lists?.lists && lists?.lists?.length > 0 ? (
                  <Image src={ArrowLeft} alt='Show lists' />
                ) : (
                  <div></div>
                )}
                <p className=' font-semibold'>
                  {selectedList ? `${t('list')} #${selectedList}` : t('mint new list')}
                </p>
              </div>
              <div
                className={`absolute -right-[14.6%] sm:right-[97.2%] group-hover:block min-w-[190px] block z-50 -top-[6px] ${
                  lists?.lists && lists?.lists?.length > 0
                    ? listMenuOpen
                      ? 'block'
                      : 'hidden'
                    : 'hidden group-hover:hidden'
                } pr-5`}
              >
                <div className='flex flex-col gap-2 glass-card w-full min-w-[190px] max-h-[75vh] sm:max-h-[80vh] overflow-scroll border-2 rounded-lg bg-white/90 border-gray-200 p-1  shadow-md'>
                  <div
                    onClick={() => setListMenuOpen(false)}
                    className='flex sm:hidden justify-between items-center w-full group-hover:bg-slate-100 p-3 rounded-md transition-opacity cursor-pointer'
                  >
                    {lists?.lists && lists?.lists?.length > 0 ? (
                      <Image src={ArrowLeft} alt='Show lists' />
                    ) : (
                      <div></div>
                    )}
                    <p className=' font-semibold'>Back</p>
                  </div>
                  {lists?.lists?.map(list => (
                    <div
                      className='flex items-center relative p-3 pl-8 w-full gap-1 text-darkGrey rounded-md hover:bg-slate-100'
                      key={list}
                      onClick={() => {
                        localStorage.setItem('selected-list', list)
                        setSelectedList(Number(list))
                        setListMenuOpen(false)
                        setWalletMenuOpen(false)
                      }}
                    >
                      {selectedList === Number(list) && (
                        <Image
                          src={GreenCheck}
                          alt='List selected'
                          width={16}
                          className='absolute left-2 top-[17px]'
                        />
                      )}
                      <p className='text-nowrap font-semibold'>{`${t('list')} #${list}`}</p>
                      {lists.primary_list === list && (
                        <p className='mb-0.5 text-sm italic text-nowrap font-medium text-gray-400'>
                          - Primary
                        </p>
                      )}
                    </div>
                  ))}
                  <div
                    key={'new list'}
                    className='flex gap-2 p-3 pl-8 relative hover:bg-slate-100 rounded-md'
                    onClick={() => {
                      localStorage.setItem('selected-list', 'new list')
                      setSelectedList(undefined)
                      setListMenuOpen(false)
                      setWalletMenuOpen(false)
                    }}
                  >
                    {selectedList === undefined && (
                      <Image
                        src={GreenCheck}
                        alt='List selected'
                        width={16}
                        className='absolute left-2 top-[17px]'
                      />
                    )}
                    <p className='text-darkGrey text-nowrap font-semibold'>{t('mint new list')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={clickAwayLanguageRef} className='w-full cursor-pointer group relative'>
            <div
              onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
              className='flex justify-between p-3 rounded-md group-hover:bg-slate-100 items-center w-full'
            >
              <Image src={ArrowLeft} alt='Show languages' />
              <div className='flex gap-2'>
                <Image
                  src={selectedLanguage?.icon || ''}
                  alt='Language icon'
                  width={24}
                  height={8}
                />
                <p className='font-semibold '>{selectedLanguage?.language}</p>
              </div>
            </div>
            <div
              className={`absolute -right-[14.6%] sm:right-[95%] -top-[54px] sm:-top-[6px] ${
                languageMenOpenu ? 'block' : 'hidden'
              } group-hover:block pr-5`}
            >
              <div className='flex flex-col gap-2 min-w-[190px] glass-card bg-white/90 border-2 border-gray-200 p-1 rounded-lg shadow-md'>
                <div
                  onClick={() => setLanguageMenuOpen(false)}
                  className='flex sm:hidden justify-between items-center w-full group-hover:bg-slate-100 p-3 rounded-md transition-opacity cursor-pointer'
                >
                  {lists?.lists && lists?.lists?.length > 0 ? (
                    <Image src={ArrowLeft} alt='Show lists' />
                  ) : (
                    <div></div>
                  )}
                  <p className=' font-semibold'>Back</p>
                </div>
                {LANGUAGES.map(lang => (
                  <div
                    className=' text-darkGrey p-3 pl-8 relative font-semibold rounded-md hover:bg-slate-100 transition-colors'
                    key={lang.language}
                    onClick={() => {
                      changeLanguage(lang)
                      setWalletMenuOpen(false)
                    }}
                  >
                    {selectedLanguage && selectedLanguage.key === lang.key && (
                      <Image
                        src={GreenCheck}
                        alt='List selected'
                        width={16}
                        className='absolute left-2 top-[17px]'
                      />
                    )}
                    <div className='flex gap-2 pr-3'>
                      <Image src={lang.icon} alt='Language icon' width={24} height={8} />
                      <p>{lang.language}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p
            className='text-red-500 p-3 text-right font-semibold w-full text-nowrap rounded-md hover:bg-slate-100 transition-opacity cursor-pointer'
            onClick={() => {
              disconnect()
              setWalletMenuOpen(false)
            }}
          >
            {t('disconnect')}
          </p>
        </div>
      )}
    </div>
  )
}

export default ConnectButton
