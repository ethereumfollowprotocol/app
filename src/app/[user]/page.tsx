'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { PROFILE_TABS } from '#/lib/constants'
import fetchUserProfile from '#/api/fetchProfile'
import type { ProfileTabType } from '#/types/common'
import SettingsIcon from 'public/assets/icons/settings.svg'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/profile-page-table'

interface Props {
  params: { user: string }
}

export default function UserPage({ params }: Props) {
  const { user } = params
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')

  const { t } = useTranslation('profile')

  const { data: profile } = useQuery({
    queryKey: ['profile', user],
    queryFn: async () => {
      if (!user) return null

      const fetchedProfile = await fetchUserProfile(user as Address)
      return fetchedProfile
    },
    staleTime: 20000
  })

  if (!profile) return null

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        profile={profile}
        title='following'
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        profile={profile}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <main className='flex min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-32 md:mt-40 lg:mt-48 px-4 lg:px-8'>
      <div className='flex flex-col w-full xl:w-fit items-center gap-4'>
        <UserProfileCard profile={profile} />
        <div className='flex flex-col gap-1 items-center'>
          <p className='font-semibold '>{t('block-mute')}</p>
          <div className='flex gap-1 cursor-pointer hover:opacity-80 transition-opacity'>
            <p className='font-semibold '>{t('settings')}</p>
            <Image src={SettingsIcon} alt='List settings' width={18} height={18} />
          </div>
        </div>
      </div>
      <UserProfilePageTable profile={profile} title='following' customClass='hidden md:flex' />
      <UserProfilePageTable profile={profile} title='followers' customClass='hidden md:flex' />
      <div className=' w-full mt-12 relative md:hidden'>
        <div className='w-full absolute -top-12 left-0'>
          {PROFILE_TABS.map(option => (
            <button
              key={option}
              onClick={() => setActiveTab(option)}
              className={`w-1/2 capitalize text-lg py-2 font-semibold glass-card border-2 border-gray-200 rounded-t-lg ${
                activeTab === option ? '' : 'bg-black/5'
              }`}
            >
              {t(option)}
            </button>
          ))}
        </div>
        {mobileActiveEl}
      </div>
    </main>
  )
}
