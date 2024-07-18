'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { PROFILE_TABS } from '#/lib/constants'
import type { ProfileTabType } from '#/types/common'
import BlockedMuted from '#/components/blocked-muted'
import ListSettings from '../../components/list-settings'
import SettingsIcon from 'public/assets/icons/settings.svg'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { UserProfilePageTable } from '#/components/profile-page-table'

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [listSettingsOpen, setListSettingsOpen] = useState(false)
  const [isBlockedMutedOpen, setIsBlockedMutedOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')

  const { t } = useTranslation('profile')
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    if (openConnectModal) openConnectModal()
  }, [])

  const {
    roles,
    profile,
    selectedList,
    profileIsLoading,
    following,
    followers,
    followingTags,
    followingTagsLoading,
    followingTagsFilter,
    toggleTag,
    followersSort,
    followingSort,
    setFollowersSort,
    setFollowingSort,
    followingIsLoading,
    followersIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isEndOfFollowers,
    isEndOfFollowing,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing
  } = useEFPProfile()

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        isLoading={followingIsLoading}
        results={following}
        allTags={followingTags?.tagCounts}
        tagsLoading={followingTagsLoading}
        selectedTags={followingTagsFilter}
        toggleSelectedTags={toggleTag}
        sort={followingSort}
        setSort={setFollowingSort}
        isEndOfResults={isEndOfFollowing}
        isFetchingMore={isFetchingMoreFollowing}
        fetchMore={() => fetchMoreFollowing()}
        canEditTags={roles?.isManager}
        title='following'
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        isLoading={followersIsLoading}
        results={followers}
        toggleSelectedTags={toggleTag}
        sort={followersSort}
        setSort={setFollowersSort}
        isEndOfResults={isEndOfFollowers}
        isFetchingMore={isFetchingMoreFollowers}
        fetchMore={() => fetchMoreFollowers()}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <>
      {isBlockedMutedOpen && profile && selectedList && (
        <BlockedMuted
          profile={profile}
          list={selectedList}
          onClose={() => setIsBlockedMutedOpen(false)}
          isManager={roles?.isManager}
        />
      )}
      {listSettingsOpen && profile && selectedList && (
        <ListSettings
          selectedList={selectedList}
          isSaving={isSaving}
          profile={profile}
          setIsSaving={setIsSaving}
          onClose={() => setListSettingsOpen(false)}
        />
      )}
      {!isSaving && (
        <main className='flex pb-8 min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-24 sm:mt-28 lg:mt-32 xl:mt-40 px-4 lg:px-8'>
          <div className='flex flex-col w-full xl:w-fit items-center gap-4'>
            <UserProfileCard
              profileList={selectedList}
              hideFollowButton={true}
              profile={profile}
              following={following}
              isLoading={profileIsLoading}
            />
            <div className='flex flex-col gap-1 items-center'>
              <p
                onClick={() => setIsBlockedMutedOpen(true)}
                className='font-semibold cursor-pointer hover:opacity-80 transition-opacity'
              >
                {t('block-mute')}
              </p>
              {selectedList && (
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
            results={following}
            allTags={followingTags?.tagCounts}
            tagsLoading={followingTagsLoading}
            selectedTags={followingTagsFilter}
            toggleSelectedTags={toggleTag}
            sort={followingSort}
            setSort={setFollowingSort}
            isEndOfResults={isEndOfFollowing}
            isFetchingMore={isFetchingMoreFollowing}
            fetchMore={() => fetchMoreFollowing()}
            canEditTags={roles?.isManager}
            title='following'
            customClass='hidden xl:flex xl:max-w-[520px] 2xl:max-w-[40%]'
          />
          <UserProfilePageTable
            isLoading={followersIsLoading}
            results={followers}
            toggleSelectedTags={toggleTag}
            sort={followersSort}
            setSort={setFollowersSort}
            isEndOfResults={isEndOfFollowers}
            isFetchingMore={isFetchingMoreFollowers}
            fetchMore={() => fetchMoreFollowers()}
            title='followers'
            customClass='hidden xl:flex xl:max-w-[520px] 2xl:max-w-[40%]'
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
