'use client'
import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { HiOutlineWallet } from 'react-icons/hi2'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect, useWalletClient } from 'wagmi'

import { LANGUAGES } from '#/lib/constants'
import { Avatar } from '#/components/avatar'
import useLanguage from '../hooks/useLanguage'
import { resolveEnsProfile } from '#/utils/ens'
import { cn, truncateAddress } from '#/lib/utilities'
import ThemeSwitcher from '#/components/theme-switcher'
import LoadingCell from '#/components/loaders/loading-cell'
import GreenCheck from 'public/assets/icons/check-green.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const nullEnsProfile = {
  name: null,
  avatar: null
}

const ConnectButton = () => {
  const [listMenuOpen, setListMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [walletMenOpenu, setWalletMenuOpen] = useState(false)
  const [languageMenuSearch, setLanguageMenuSearch] = useState('')
  const { changeLanguage, languageMenOpenu, selectedLanguage, setLanguageMenuOpen } = useLanguage()

  const closeLanguageMenu = () => {
    setLanguageMenuOpen(false)
    setLanguageMenuSearch('')
  }

  const clickAwayWalletRef = useClickAway<HTMLDivElement>(_ => {
    setWalletMenuOpen(false)
    setListMenuOpen(false)
    setLanguageMenuOpen(false)
  })
  const clickAwayListRef = useClickAway<HTMLDivElement>(_ => {
    setListMenuOpen(false)
  })
  const clickAwayLanguageRef = useClickAway<HTMLDivElement>(_ => {
    setLanguageMenuOpen(false)
    setLanguageMenuSearch('')
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

  const { data: ensProfile, isLoading: ensProfileIsLoading } = useQuery({
    queryKey: ['ens-data', userAddress],
    queryFn: async () => {
      if (!userAddress) return nullEnsProfile

      const data = await resolveEnsProfile(userAddress)
      return data
    }
  })

  const regularLanguages = LANGUAGES.filter(lang => !lang.special).filter(lang =>
    languageMenuSearch
      ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
        lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
      : true
  )
  const specialLanguages = LANGUAGES.filter(lang => !!lang.special).filter(lang =>
    languageMenuSearch
      ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
        lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
      : true
  )

  return (
    <div ref={clickAwayWalletRef} className='relative'>
      <button
        type='button'
        className={cn(
          'z-50 px-1 pl-[3px] transition-all border-[3px] gap-[6px] hover:scale-105 cursor-pointer flex justify-between items-center h-[60px] glass-card rounded-full w-fit sm:w-48 md:w-60',
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
            <div className='flex items-center max-w-[87%] h-fit gap-[8px]'>
              {ensProfileIsLoading ? (
                <LoadingCell className='w-[47px] h-[47px] rounded-full' />
              ) : (
                <Avatar
                  avatarUrl={ensProfile?.avatar}
                  name={ensProfile?.name || userAddress}
                  size='w-[47px] h-[47px]'
                />
              )}
              <p className='font-bold hidden sm:block truncate text-lg'>
                {ensProfile?.name || truncateAddress(userAddress)}
              </p>
            </div>
            <IoIosArrowDown
              className={`${walletMenOpenu ? 'rotate-180' : ''} text-2xl transition-transform mr-1`}
            />
          </>
        ) : (
          <div className='w-full sm:w-60 h-full flex items-center justify-center rounded-full'>
            <p className='hidden sm:block font-bold text-lg px-1'>{t('connect')}</p>
            <HiOutlineWallet className='text-4xl w-[48px] translate-x-px block sm:hidden' />
          </div>
        )}
      </button>
      {walletMenOpenu && (
        <div
          className={cn(
            'flex w-[220px] overflow-x-hidden sm:overflow-visible z-50 h-fit shadow-md border-[3px] rounded-lg dark:bg-darkGrey bg-white border-zinc-200 dark:border-zinc-500 absolute top-[120%] flex-col items-end right-0',
            (languageMenOpenu || themeMenuOpen) && 'overflow-y-hidden'
          )}
        >
          <div
            className={cn(
              'flex flex-col w-full transition-all overflow-x-visible max-h-[75vh] sm:h-auto',
              languageMenOpenu || listMenuOpen || themeMenuOpen
                ? '-translate-x-[221px] sm:translate-x-0 sm:p-1'
                : 'p-1',
              languageMenOpenu
                ? `h-[${
                    (LANGUAGES.filter(lang =>
                      languageMenuSearch
                        ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
                          lang.englishLanguage
                            .toLowerCase()
                            .includes(languageMenuSearch.toLowerCase())
                        : true
                    ).length || 1) *
                      57 +
                    137 +
                    (specialLanguages.length > 0 ? 151 : 137)
                  }px]`
                : listMenuOpen
                  ? `h-[${(lists?.lists?.length || 0) * 56 + 111}px]`
                  : themeMenuOpen
                    ? 'h-[223px]'
                    : 'h-auto'
            )}
            style={{
              height: languageMenOpenu
                ? `${
                    (LANGUAGES.filter(lang =>
                      languageMenuSearch
                        ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
                          lang.englishLanguage
                            .toLowerCase()
                            .includes(languageMenuSearch.toLowerCase())
                        : true
                    ).length || 1) *
                      58 +
                    (specialLanguages.length > 0 && regularLanguages.length > 0 ? 151 : 134)
                  }px`
                : listMenuOpen
                  ? `${(lists?.lists?.length || 0) * 56 + 111}px`
                  : themeMenuOpen
                    ? '223px'
                    : 'auto'
            }}
          >
            <ThemeSwitcher
              connected={true}
              closeMenu={() => setWalletMenuOpen(false)}
              setExternalThemeMenuOpen={setThemeMenuOpen}
            />
            <div ref={clickAwayLanguageRef} className='w-full cursor-pointer group relative'>
              <div
                onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
                className='flex justify-between p-3 rounded-md group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20 items-center w-full'
              >
                <FiArrowLeft className='text-xl' />
                <div className='flex justify-end gap-2'>
                  <Image
                    src={selectedLanguage?.icon || ''}
                    alt='Language icon'
                    width={26}
                    className='rounded-md'
                  />
                  <p className='font-bold w-fit'>{selectedLanguage?.language}</p>
                </div>
              </div>
              <div
                className={`absolute -right-[224px] sm:right-[95%] -top-[52px] z-50 sm:-top-[6px] ${
                  languageMenOpenu ? 'block' : 'hidden'
                } group-hover:block sm:pr-6`}
              >
                <div className='flex overflow-scroll flex-col sm:grid max-h-[76vh] grid-cols-2 gap-2 gap-x-px w-[220px] sm:w-[450px] bg-transparent sm:bg-white sm:dark:bg-darkGrey border-[3px] border-zinc-200 dark:border-zinc-500 p-1 rounded-lg shadow-md'>
                  <div
                    onClick={closeLanguageMenu}
                    className='flex sm:hidden justify-between items-center w-full hover:bg-slate-100 dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
                  >
                    <FiArrowLeft className='text-xl font-bold' />
                    <p className=' font-bold'>Back</p>
                  </div>
                  <div className='sm:col-span-2 p-3 flex flex-col gap-3 items-center'>
                    <input
                      type='text'
                      placeholder='Search'
                      value={languageMenuSearch}
                      onChange={e => setLanguageMenuSearch(e.target.value)}
                      className='w-full px-4 py-2 border-[3px] border-zinc-200 transition-colors dark:border-zinc-500 dark:focus:border-zinc-300 rounded-md focus:border-darkGrey/80'
                    />
                    {LANGUAGES.filter(lang =>
                      languageMenuSearch
                        ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
                          lang.englishLanguage
                            .toLowerCase()
                            .includes(languageMenuSearch.toLowerCase())
                        : true
                    ).length === 0 && (
                      <div className='p-3'>
                        <p className='font-bold'>{t('search no results')}</p>
                      </div>
                    )}
                  </div>
                  {regularLanguages.map(lang => (
                    <div
                      className='py-3 pl-8 relative flex items-center font-bold rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-colors'
                      key={lang.language}
                      onClick={() => {
                        changeLanguage(lang)
                        closeLanguageMenu()
                        setWalletMenuOpen(false)
                      }}
                    >
                      {selectedLanguage && selectedLanguage.key === lang.key && (
                        <Image
                          src={GreenCheck}
                          alt='List selected'
                          width={16}
                          className='absolute left-2 top-[35%]'
                        />
                      )}
                      <div className='flex gap-2 pr-3'>
                        <Image
                          src={lang.icon}
                          alt='Language icon'
                          width={26}
                          className='rounded-md'
                        />
                        <p>{lang.language}</p>
                      </div>
                    </div>
                  ))}
                  {specialLanguages.length > 0 && regularLanguages.length > 0 && (
                    <div className='sm:col-span-2 px-3 py-1 sm:py-3 flex flex-col gap-3 items-center'>
                      <hr className='border-[1px] rounded-full border-zinc-300 dark:border-zinc-500 w-full' />
                    </div>
                  )}
                  {specialLanguages.map(lang => (
                    <div
                      className='py-3 pl-8 relative flex items-center font-bold rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-colors'
                      key={lang.language}
                      onClick={() => {
                        changeLanguage(lang)
                        closeLanguageMenu()
                        setWalletMenuOpen(false)
                      }}
                    >
                      {selectedLanguage && selectedLanguage.key === lang.key && (
                        <Image
                          src={GreenCheck}
                          alt='List selected'
                          width={16}
                          className='absolute left-2 top-[35%]'
                        />
                      )}
                      <div className='flex gap-2 pr-3'>
                        <Image
                          src={lang.icon}
                          alt='Language icon'
                          width={26}
                          className='rounded-md'
                        />
                        <p>{lang.language}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {lists?.lists && lists.lists.length > 0 && (
              <div ref={clickAwayListRef} className='w-full cursor-pointer group relative'>
                <div
                  onClick={() => setListMenuOpen(!listMenuOpen)}
                  className='flex justify-between items-center w-full group-hover:bg-slate-100 dark:group-hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
                >
                  <FiArrowLeft className='text-xl' />
                  <p className=' font-bold'>
                    {selectedList ? `${t('list')} #${selectedList}` : t('mint new list')}
                  </p>
                </div>
                <div
                  className={cn(
                    'absolute -right-[224px] w-full -top-[100px] h-full sm:pr-5 sm:right-[97.2%] group-hover:block min-w-[220px] sm:w-fit block z-50 sm:-top-[6px]',
                    lists?.lists && lists?.lists?.length > 0
                      ? listMenuOpen
                        ? 'block'
                        : 'hidden'
                      : 'hidden group-hover:hidden'
                  )}
                >
                  <div className='flex flex-col gap-2 w-full min-w-[220px] sm:max-h-[76vh] overflow-auto border-[3px] rounded-lg bg-transparent sm:bg-white sm:dark:bg-darkGrey border-zinc-200 dark:border-zinc-500 p-1 shadow-md'>
                    <div
                      onClick={() => setListMenuOpen(false)}
                      className='flex sm:hidden justify-between items-center w-full group:bg-slate-100 dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer'
                    >
                      <FiArrowLeft className='text-xl' />
                      <p className=' font-bold'>Back</p>
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
                        <div className='flex flex-wrap sm:flex-nowrap items-end gap-1'>
                          <p className='font-bold text-wrap'>{`${t('list')} #${list}`}</p>
                          {lists.primary_list === list && (
                            <p className='mb-0.5 text-sm italic text-nowrap font-medium text-zinc-400'>
                              - {t('primary')}
                            </p>
                          )}
                        </div>
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
                      <p className=' font-bold'>{t('mint new list')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <a href='https://discord.com/invite/ZUyG3mSXFD' target='_blank' rel='noreferrer'>
              <div className='flex justify-between items-center w-full hover:bg-slate-100   dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer font-semibold'>
                <FiExternalLink className='text-xl' />
                <div className='flex gap-2'>
                  <FaDiscord className='text-2xl mirror-x' />
                  <p className='capitalize'>Discord</p>
                </div>
              </div>
            </a>
            <p
              className='text-red-500 p-3 text-right font-bold w-full text-nowrap rounded-md hover:bg-slate-100 dark:hover:bg-zinc-400/20 transition-opacity cursor-pointer'
              onClick={() => {
                disconnect()
                setWalletMenuOpen(false)
              }}
            >
              {t('disconnect')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectButton
