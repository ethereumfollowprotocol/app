'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'

import useUser from './hooks/useUser'
import { PROFILE_TABS } from '#/lib/constants'
import type { ProfileTabType } from '#/types/common'
import ListSettings from '#/components/list-settings'
import BlockedMuted from '#/components/blocked-muted'
import SettingsIcon from 'public/assets/icons/settings.svg'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { UserProfilePageTable } from '#/components/profile-page-table'

interface Props {
  params: { user: string }
}

export default function UserPage({ params }: Props) {
  const { user } = params
  const searchParams = useSearchParams()
  const initialBlockedOpen = searchParams.get('modal') === 'blocked'

  const [isSaving, setIsSaving] = useState(false)
  const [listSettingsOpen, setListSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')
  const [isBlockedMutedOpen, setIsBlockedMutedOpen] = useState(initialBlockedOpen)

  const router = useRouter()
  const { t } = useTranslation('profile')
  const { roles, selectedList } = useEFPProfile()
  const { address: connectedUserAddress } = useAccount()

  const {
    listNum,
    profile,
    followers,
    following,
    toggleTag,
    userIsList,
    followerTags,
    followersSort,
    followingSort,
    followingTags,
    profileIsLoading,
    isEndOfFollowing,
    isEndOfFollowers,
    setFollowingSort,
    setFollowersSort,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    followingTagsFilter,
    followersTagsFilter,
    followerTagsLoading,
    followingTagsLoading,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing
  } = useUser(user)

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
        title='following'
        canEditTags={
          Number(userIsList ? listNum : profile?.primary_list) === selectedList && roles?.isManager
        }
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        isLoading={followersIsLoading}
        results={followers}
        allTags={followerTags?.tagCounts}
        tagsLoading={followerTagsLoading}
        selectedTags={followersTagsFilter}
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
      {isBlockedMutedOpen && profile && (
        <BlockedMuted
          profile={profile}
          list={profile.primary_list ?? undefined}
          onClose={() => {
            setIsBlockedMutedOpen(false)
            router.push(`/${user}`)
          }}
          isManager={
            Number(userIsList ? listNum : profile?.primary_list) === selectedList &&
            roles?.isManager
          }
        />
      )}
      {listSettingsOpen && profile && (userIsList ? listNum : profile.primary_list) && (
        <ListSettings
          // @ts-ignore
          selectedList={
            userIsList
              ? (listNum as number)
              : profile?.primary_list
                ? Number(profile?.primary_list)
                : undefined
          }
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
              profileList={
                userIsList
                  ? listNum
                  : profile?.primary_list
                    ? Number(profile?.primary_list)
                    : undefined
              }
              profile={profile}
              following={following}
              isLoading={profileIsLoading}
              showMoreOptions={
                profile?.address?.toLowerCase() !== connectedUserAddress?.toLowerCase()
              }
            />
            <div className='flex flex-col gap-1 items-center'>
              <p
                onClick={() => {
                  setIsBlockedMutedOpen(true)
                  router.push(`/${user}?modal=blocked`)
                }}
                className='font-semibold cursor-pointer hover:opacity-80 transition-opacity'
              >
                {t('block-mute')}
              </p>
              {(profile?.primary_list || userIsList) && (
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
            canEditTags={
              Number(userIsList ? listNum : profile?.primary_list) === selectedList &&
              roles?.isManager
            }
            title='following'
            customClass='hidden xl:flex xl:max-w-[520px] 2xl:max-w-[40%]'
          />
          <UserProfilePageTable
            isLoading={followersIsLoading}
            results={followers}
            allTags={followerTags?.tagCounts}
            tagsLoading={followerTagsLoading}
            selectedTags={followersTagsFilter}
            toggleSelectedTags={toggleTag}
            sort={followersSort}
            setSort={setFollowersSort}
            isEndOfResults={isEndOfFollowers}
            isFetchingMore={isFetchingMoreFollowers}
            fetchMore={() => fetchMoreFollowers()}
            title='followers'
            customClass='hidden xl:flex xl:max-w-[520px] 2xl:max-w-[40%]'
          />
          <div className='w-full mt-12 relative xl:hidden'>
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
