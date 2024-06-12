'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useAccount, useDisconnect } from 'wagmi'
import { useClickAway } from '@uidotdev/usehooks'
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'

import { LANGUAGES } from '#/lib/constants'
import useLanguage from '../hooks/useLanguage'
import { truncateAddress } from '#/lib/utilities'
import ArrowLeft from 'public/assets/icons/arrow-left.svg'
import { resolveENSProfile } from '#/utils/resolveAddress'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'

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
  const { address: userAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { selectedList, lists, setSelectedList } = useEFPProfile()

  const { data: ensProfile } = useQuery({
    queryKey: ['ens-data', userAddress],
    queryFn: async () => {
      if (!userAddress) return nullEnsProfile

      const data = await resolveENSProfile(userAddress)
      return data
    }
  })

  return (
    <div ref={clickAwayWalletRef} className='relative'>
      <button
        type='button'
        // className='bg-gradient-to-br p-[2px] from-yellow to-pink cursor-pointer h-12 rounded-full w-40'
        className='border-[#FFC057] z-50 hover:bg-[#FFC057]/10 px-1 transition-colors border-2 gap-[6px] cursor-pointer flex justify-between items-center h-12 glass-card rounded-full w-fit sm:w-48'
        onClick={() =>
          userAddress && openAccountModal
            ? setWalletMenuOpen(!walletMenOpenu)
            : openConnectModal
              ? openConnectModal()
              : null
        }
      >
        {userAddress ? (
          <>
            <Image
              src={ensProfile?.avatar || DefaultAvatar}
              alt='ENS Avatar'
              width={36}
              height={36}
              className='rounded-full'
              unoptimized={true}
            />
            <p className='font-semibold hidden sm:block truncate text-sm'>
              {ensProfile?.name || truncateAddress(userAddress)}
            </p>
            <Image
              src={ArrowDown}
              alt='Open button'
              className={`${walletMenOpenu ? 'rotate-180' : ''} transition-transform w-4 mr-1`}
            />
          </>
        ) : (
          <div className='w-full h-full flex items-center justify-center  rounded-full'>
            <p className='font-semibold text-nowrap px-1 text-black'>{t('navigation.connect')}</p>
          </div>
        )}
      </button>
      {walletMenOpenu && (
        <div className='p-3 flex gap-1.5 w-fit z-50 shadow-md border-2 rounded-lg bg-white/95 border-gray-200 absolute top-[120%] flex-col items-end right-0'>
          <div ref={clickAwayListRef} className='w-full cursor-pointer group relative'>
            <div
              onClick={() => setListMenuOpen(!listMenuOpen)}
              className='flex justify-between items-center w-full hover:opacity-80 transition-opacity cursor-pointer'
            >
              <Image src={ArrowLeft} alt='Show lists' />
              <p className=' font-semibold'>
                {selectedList ? `List #${selectedList}` : 'Mint new List'}
              </p>
            </div>
            <div
              className={`absolute right-[100%] -top-3 ${
                listMenuOpen ? 'block' : 'hidden'
              } group-hover:block pr-5`}
            >
              <div className='flex flex-col gap-2 glass-card bg-white/90 border-2 border-gray-200 px-4 py-2 rounded-lg shadow-md'>
                <p
                  className=' text-darkGrey text-nowrap font-semibold hover:text-gray-500 transition-colors'
                  key={'new list'}
                  onClick={() => {
                    setSelectedList(undefined)
                    setListMenuOpen(false)
                  }}
                >
                  Mint new List
                </p>
                {lists?.lists?.map(list => (
                  <p
                    className=' text-darkGrey text-nowrap font-semibold hover:text-gray-500 transition-colors'
                    key={list}
                    onClick={() => {
                      setSelectedList(list)
                      setListMenuOpen(false)
                    }}
                  >
                    List #{list}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div ref={clickAwayLanguageRef} className='w-full cursor-pointer group relative'>
            <div
              onClick={() => setLanguageMenuOpen(!languageMenOpenu)}
              className='flex justify-between items-center w-full'
            >
              <Image
                src={ArrowLeft}
                alt='Show languages'
                className='group-hover:opacity-80 transition-opacity'
              />
              <p className='group-hover:opacity-80 transition-opacity font-semibold'>
                {selectedLanguage?.language}
              </p>
            </div>
            <div
              className={`absolute right-[100%] -top-2 ${
                languageMenOpenu ? 'block' : 'hidden'
              } group-hover:block pr-5`}
            >
              <div className='flex flex-col gap-2 glass-card bg-white/90 border-2 border-gray-200 px-4 py-2 rounded-lg shadow-md'>
                {LANGUAGES.map(lang => (
                  <p
                    className=' text-darkGrey font-semibold hover:text-gray-500 transition-colors'
                    key={lang.language}
                    onClick={() => changeLanguage(lang)}
                  >
                    {lang.language}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <p
            className='text-red-500 font-semibold w-full text-nowrap hover:text-opacity-75 transition-opacity cursor-pointer'
            onClick={() => {
              disconnect()
              setWalletMenuOpen(false)
            }}
          >
            {t('navigation.disconnect')}
          </p>
        </div>
      )}
    </div>
  )
}

export default ConnectButton
