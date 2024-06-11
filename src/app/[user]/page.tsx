'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'

import useUser from './hooks/useUser'
import { PROFILE_TABS } from '#/lib/constants'
import type { ProfileTabType } from '#/types/common'
import ListSettings from '#/components/list-settings'
import SettingsIcon from 'public/assets/icons/settings.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/profile-page-table'

interface Props {
  params: { user: string }
}

export default function UserPage({ params }: Props) {
  const { user } = params
  const [isSaving, setIsSaving] = useState(false)
  const [listSettingsOpen, setListSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')

  const { roles } = useEFPProfile()
  const { t } = useTranslation('profile')
  const { address: connectedUserAddress } = useAccount()

  const {
    profile,
    followers,
    following,
    profileIsLoading,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing
  } = useUser(user)

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        isLoading={followingIsLoading}
        following={following}
        followers={followers}
        isFetchingMore={isFetchingMoreFollowing}
        fetchMore={() => fetchMoreFollowing()}
        title='following'
        canEditTags={profile?.address?.toLowerCase() === connectedUserAddress?.toLowerCase()}
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        isLoading={followersIsLoading}
        following={following}
        followers={followers}
        isFetchingMore={isFetchingMoreFollowers}
        fetchMore={() => fetchMoreFollowers()}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <>
      {listSettingsOpen && profile && (
        <ListSettings
          isSaving={isSaving}
          profile={profile}
          setIsSaving={setIsSaving}
          onClose={() => setListSettingsOpen(false)}
        />
      )}
      {!isSaving && (
        <main className='flex pb-8 min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-32 md:mt-40 lg:mt-48 px-4 lg:px-8'>
          <div className='flex flex-col w-full xl:w-fit items-center gap-4'>
            <UserProfileCard profile={profile} following={following} isLoading={profileIsLoading} />
            <div className='flex flex-col gap-1 items-center'>
              <p className='font-semibold '>{t('block-mute')}</p>
              {profile?.primary_list && (
                <div
                  className='flex gap-1 cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => setListSettingsOpen(true)}
                >
                  <p className='font-semibold '>{t('settings')}</p>
                  <Image src={SettingsIcon} alt='List settings' width={18} height={18} />
                </div>
              )}
            </div>
          </div>
          <UserProfilePageTable
            isLoading={followingIsLoading}
            following={following}
            followers={followers}
            isFetchingMore={isFetchingMoreFollowing}
            fetchMore={() => fetchMoreFollowing()}
            canEditTags={roles?.isManager}
            title='following'
            customClass='hidden xl:flex'
          />
          <UserProfilePageTable
            isLoading={followersIsLoading}
            following={following}
            followers={followers}
            isFetchingMore={isFetchingMoreFollowers}
            fetchMore={() => fetchMoreFollowers()}
            title='followers'
            customClass='hidden xl:flex'
          />
          <div className=' w-full mt-12 relative xl:hidden'>
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
      )}
    </>
  )
}
