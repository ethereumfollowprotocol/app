'use client'
import Image from 'next/image'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useWalletClient } from 'wagmi'

import { LANGUAGES } from '#/lib/constants'
import useLanguage from '../hooks/useLanguage'
import { resolveEnsProfile } from '#/utils/ens'
import Wallet from 'public/assets/icons/wallet.svg'
import { cn, truncateAddress } from '#/lib/utilities'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import GreenCheck from 'public/assets/icons/check-green.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'

const ThemeSwitcher = lazy(() => import('../../theme-switcher'))

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
        className={cn(
          'z-50 px-1 transition-all border-[3px] gap-[6px] hover:scale-105 cursor-pointer flex justify-between items-center h-[60px] glass-card rounded-full w-fit sm:w-48 md:w-56',
          walletMenOpenu ? 'connect-button-open ' : 'connect-button'
        )}
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
            <IoIosArrowDown
              className={`${walletMenOpenu ? 'rotate-180' : ''} w-5 h-5 transition-transform mr-1`}
            />
          </>
        ) : (
          <div className='w-full sm:w-54 h-full flex items-center justify-center rounded-full'>
            <p className='hidden sm:block font-semibold text-lg text-nowrap px-1'>{t('connect')}</p>
            <Image
              src={Wallet}
              alt='Connect Wallet'
              width={30}
              height={32}
              className='bloxk sm:hidden mx-2'
            />
          </div>
        )}
      </button>
      {walletMenOpenu && (
        <div className='p-1 flex w-[190px] z-50 shadow-md border-[3px] rounded-lg dark:bg-darkGrey/80 bg-white/95 border-zinc-100 dark:border-zinc-500 absolute top-[120%] flex-col items-end right-0'>
          {lists?.lists && lists.lists.length > 0 && (
            <div ref={clickAwayListRef} className='w-full cursor-pointer group relative'>
              <div
                onClick={() => setListMenuOpen(!listMenuOpen)}
                className='flex justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
              >
                <FiArrowLeft className='text-xl' />
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
                <div className='flex flex-col gap-2 w-full min-w-[190px] max-h-[75vh] sm:max-h-[80vh] overflow-scroll border-[3px] rounded-lg bg-white/90 dark:bg-darkGrey/90 border-zinc-100 dark:border-zinc-500 p-1  shadow-md'>
                  <div
                    onClick={() => setListMenuOpen(false)}
                    className='flex sm:hidden justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20  dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
                  >
                    <FiArrowLeft className='text-xl' />
                    <p className=' font-semibold'>Back</p>
                  </div>
                  {lists?.lists?.map(list => (
                    <div
                      className='flex items-center relative p-3 pl-8 w-full gap-1 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20'
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
                        <p className='mb-0.5 text-sm italic text-nowrap font-medium text-zinc-400'>
                          - Primary
                        </p>
                      )}
                    </div>
                  ))}
                  <div
                    key={'new list'}
                    className='flex gap-2 p-3 pl-8 relative hover:bg-slate-100 dark:hover:bg-zinc-400/20 rounded-md'
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
                    <p className='text-nowrap font-semibold'>{t('mint new list')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={clickAwayLanguageRef} className='w-full cursor-pointer group relative'>
            <div
              onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
              className='flex justify-between p-3 rounded-md group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20 items-center w-full'
            >
              <FiArrowLeft className='text-xl' />
              <div className='flex gap-2'>
                <Image src={selectedLanguage?.icon || ''} alt='Language icon' width={24} />
                <p className='font-semibold '>{selectedLanguage?.language}</p>
              </div>
            </div>
            <div
              className={`absolute -right-[14.6%] sm:right-[95%] -top-[54px] sm:-top-[6px] ${
                languageMenOpenu ? 'block' : 'hidden'
              } group-hover:block pr-5`}
            >
              <div className='flex flex-col gap-2 min-w-[190px] bg-white/90 dark:bg-darkGrey/90 border-[3px] border-zinc-100 dark:border-zinc-500 p-1 rounded-lg shadow-md'>
                <div
                  onClick={() => setLanguageMenuOpen(false)}
                  className='flex sm:hidden justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/60 dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
                >
                  <FiArrowLeft className='w-8 font-bold' />
                  <p className=' font-semibold'>Back</p>
                </div>
                {LANGUAGES.map(lang => (
                  <div
                    className='p-3 pl-8 relative font-semibold rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-colors'
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
                      <Image src={lang.icon} alt='Language icon' width={24} />
                      <p>{lang.language}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Suspense
            fallback={
              <div className='flex justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'>
                <FiArrowLeft className='text-xl' />
                <div className='flex items-center justify-end gap-2'>
                  <p className='text-2xl'>
                    <HiOutlineDesktopComputer />
                  </p>
                  <p className='capitalize font-semibold'>{t('auto')}</p>
                </div>
              </div>
            }
          >
            <ThemeSwitcher connected={true} />
          </Suspense>
          <p
            className='text-red-500 p-3 text-right font-semibold w-full text-nowrap rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-opacity cursor-pointer'
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
