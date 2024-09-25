'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '#/lib/utilities'
import useUser from '../hooks/useUser'
import TopEight from '#/components/top-eight'
import { PROFILE_TABS } from '#/lib/constants'
import type { ProfileTabType } from '#/types/common'
import ListSettings from '#/components/list-settings'
import BlockedMuted from '#/components/blocked-muted'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import { UserProfilePageTable } from '#/components/profile-page-table'

interface UserInfoProps {
  user: string
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const searchParams = useSearchParams()
  const initialBlockedOpen = searchParams.get('modal') === 'blockmutelists'
  const defaultParam = (searchParams.get('tab') as ProfileTabType) ?? 'following'

  const [isSaving, setIsSaving] = useState(false)
  const [listSettingsOpen, setListSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileTabType>(defaultParam)
  const [isBlockedMutedOpen, setIsBlockedMutedOpen] = useState(initialBlockedOpen)

  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()

  const isLoadPage = pathname === '/loading'

  const {
    roles,
    stats: profileStats,
    profile: profileProfile,
    selectedList,
    following: profileFollowing,
    followers: profileFollowers,
    toggleTag: profileToggleTag,
    followerTags: profileFollowerTags,
    followingSort: profileFollowingSort,
    followersSort: profileFollowersSort,
    followingTags: profileFollowingTags,
    isEndOfFollowers: profileIsEndOfFollowers,
    isEndOfFollowing: profileIsEndOfFollowing,
    statsIsLoading: profileStatsIsLoading,
    profileIsLoading: profileProfileIsLoading,
    setFollowersSort: profileSetFollowersSort,
    setFollowingSort: profileSetFollowingSort,
    setFollowersSearch: profileSetFollowersSearch,
    setFollowingSearch: profileSetFollowingSearch,
    followingIsLoading: profileFollowingIsLoading,
    followersIsLoading: profileFollowersIsLoading,
    fetchMoreFollowers: profileFetchMoreFollowers,
    fetchMoreFollowing: profileFetchMoreFollowing,
    followingTagsFilter: profileFollowingTagsFilter,
    followersTagsFilter: profileFollowersTagsFilter,
    followerTagsLoading: profileFollowerTagsLoading,
    followingTagsLoading: profileFollowingTagsLoading,
    setFollowingTagsFilter: profileSetFollowingTagsFilter,
    setFollowersTagsFilter: profileSetFollowersTagsFilter,
    isFetchingMoreFollowers: profileIsFetchingMoreFollowers,
    isFetchingMoreFollowing: profileIsFetchingMoreFollowing
  } = useEFPProfile()

  const isMyProfile = useIsEditView()

  const {
    listNum,
    stats: userStats,
    profile: userProfile,
    followers: userFollowers,
    following: userFollowing,
    toggleTag: userToggleTag,
    userIsList,
    followerTags: userFollowerTags,
    followersSort: userFollowerSort,
    followingSort: userFollowingSort,
    followingTags: userFollowingTags,
    profileIsLoading: userProfileIsLoading,
    isEndOfFollowing: userIsEndOfFollowing,
    isEndOfFollowers: userIsEndOfFollowers,
    setFollowingSort: userSetFollowingSort,
    setFollowersSort: userSetFollowerSort,
    setFollowersSearch: userSetFollowersSearch,
    setFollowingSearch: userSetFollowingSearch,
    statsIsLoading: userStatsIsLoading,
    followersIsLoading: userFollowersIsLoading,
    followingIsLoading: userFollowingIsLoading,
    fetchMoreFollowers: userFetchMoreFollowers,
    fetchMoreFollowing: userFetchMoreFollowing,
    followingTagsFilter: userFollowingTagsFilter,
    followersTagsFilter: userFollowersTagsFilter,
    followerTagsLoading: userFollowerTagsLoading,
    followingTagsLoading: userFollowingTagsLoading,
    isFetchingMoreFollowers: userIsFetchingMoreFollowers,
    isFetchingMoreFollowing: userIsFetchingMoreFollowing,
    setFollowersTagsFilter: userSetFollowersTagsFilter,
    setFollowingTagsFilter: userSetFollowingTagsFilter
  } = useUser(user)

  const stats = isMyProfile ? profileStats : userStats
  const statsIsLoading = isLoadPage || (isMyProfile ? profileStatsIsLoading : userStatsIsLoading)
  const profile: ProfileDetailsResponse | null | undefined = isMyProfile
    ? profileProfile
    : userProfile
  const profileIsLoading =
    isLoadPage || (isMyProfile ? profileProfileIsLoading : userProfileIsLoading)
  const following = isMyProfile ? profileFollowing : userFollowing
  const followers = isMyProfile ? profileFollowers : userFollowers
  const followingTags = isMyProfile ? profileFollowingTags : userFollowingTags
  const followingTagsLoading =
    isLoadPage || (isMyProfile ? profileFollowingTagsLoading : userFollowingTagsLoading)
  const followingTagsFilter = isMyProfile ? profileFollowingTagsFilter : userFollowingTagsFilter
  const followersTagsFilter = isMyProfile ? profileFollowersTagsFilter : userFollowersTagsFilter
  const toggleTag = isMyProfile ? profileToggleTag : userToggleTag
  const followersSort = isMyProfile ? profileFollowersSort : userFollowerSort
  const followingSort = isMyProfile ? profileFollowingSort : userFollowingSort
  const setFollowersSort = isMyProfile ? profileSetFollowersSort : userSetFollowerSort
  const setFollowingSort = isMyProfile ? profileSetFollowingSort : userSetFollowingSort
  const setFollowingSearch = isMyProfile ? profileSetFollowingSearch : userSetFollowingSearch
  const setFollowersSearch = isMyProfile ? profileSetFollowersSearch : userSetFollowersSearch
  const followingIsLoading =
    isLoadPage || (isMyProfile ? profileFollowingIsLoading : userFollowingIsLoading)
  const followersIsLoading =
    isLoadPage || (isMyProfile ? profileFollowersIsLoading : userFollowersIsLoading)
  const fetchMoreFollowers = isMyProfile ? profileFetchMoreFollowers : userFetchMoreFollowers
  const fetchMoreFollowing = isMyProfile ? profileFetchMoreFollowing : userFetchMoreFollowing
  const isEndOfFollowers = isMyProfile ? profileIsEndOfFollowers : userIsEndOfFollowers
  const isEndOfFollowing = isMyProfile ? profileIsEndOfFollowing : userIsEndOfFollowing
  const followerTagsLoading =
    isLoadPage || (isMyProfile ? profileFollowerTagsLoading : userFollowerTagsLoading)
  const followerTags = isMyProfile ? profileFollowerTags : userFollowerTags
  const setFollowingTagsFilter = isMyProfile
    ? profileSetFollowingTagsFilter
    : userSetFollowingTagsFilter
  const setFollowersTagsFilter = isMyProfile
    ? profileSetFollowersTagsFilter
    : userSetFollowersTagsFilter
  const isFetchingMoreFollowers = isMyProfile
    ? profileIsFetchingMoreFollowers
    : userIsFetchingMoreFollowers
  const isFetchingMoreFollowing = isMyProfile
    ? profileIsFetchingMoreFollowing
    : userIsFetchingMoreFollowing

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        key={'following'}
        isLoading={followingIsLoading}
        results={following}
        allTags={followingTags?.tagCounts}
        tagsLoading={followingTagsLoading}
        selectedTags={followingTagsFilter}
        toggleSelectedTags={toggleTag}
        setSelectedTags={setFollowingTagsFilter}
        sort={followingSort}
        setSort={setFollowingSort}
        isEndOfResults={isEndOfFollowing}
        setSearchFilter={setFollowingSearch}
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
        key={'followers'}
        isLoading={followersIsLoading}
        results={followers}
        allTags={followerTags?.tagCounts}
        tagsLoading={followerTagsLoading}
        selectedTags={followersTagsFilter}
        setSelectedTags={setFollowersTagsFilter}
        toggleSelectedTags={toggleTag}
        sort={followersSort}
        setSort={setFollowersSort}
        setSearchFilter={setFollowersSearch}
        isEndOfResults={isEndOfFollowers}
        isFetchingMore={isFetchingMoreFollowers}
        fetchMore={() => fetchMoreFollowers()}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  const titleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (titleRef.current && !!searchParams.get('tab')) {
      titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(searchParams.get('tab') as ProfileTabType)
    }
  }, [searchParams])

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
        <>
          <div className='flex flex-col w-full xl:w-fit items-center gap-6'>
            <UserProfileCard
              profileList={
                userIsList
                  ? listNum
                  : profile?.primary_list
                    ? Number(profile?.primary_list)
                    : undefined
              }
              stats={stats}
              profile={profile}
              isLoading={profileIsLoading}
              isStatsLoading={statsIsLoading}
              showMoreOptions={true}
              openBlockModal={() => {
                setIsBlockedMutedOpen(true)
                router.push(`/${user}?modal=blockmutelists`)
              }}
              openListSettingsModal={() => setListSettingsOpen(true)}
            />
            <TopEight user={user} isConnectedUserProfile={isMyProfile} />
          </div>
          <UserProfilePageTable
            isLoading={followingIsLoading}
            results={following}
            allTags={followingTags?.tagCounts}
            tagsLoading={followingTagsLoading}
            selectedTags={followingTagsFilter}
            toggleSelectedTags={toggleTag}
            setSelectedTags={setFollowingTagsFilter}
            sort={followingSort}
            setSort={setFollowingSort}
            isEndOfResults={isEndOfFollowing}
            isFetchingMore={isFetchingMoreFollowing}
            fetchMore={() => fetchMoreFollowing()}
            setSearchFilter={setFollowingSearch}
            canEditTags={
              Number(userIsList ? listNum : profile?.primary_list) === selectedList &&
              roles?.isManager
            }
            title='following'
            customClass='hidden xl:flex xl:max-w-[520px] z-10 2xl:max-w-[40%]'
          />
          <UserProfilePageTable
            isLoading={followersIsLoading}
            results={followers}
            allTags={followerTags?.tagCounts}
            tagsLoading={followerTagsLoading}
            selectedTags={followersTagsFilter}
            toggleSelectedTags={toggleTag}
            setSelectedTags={setFollowersTagsFilter}
            sort={followersSort}
            setSort={setFollowersSort}
            isEndOfResults={isEndOfFollowers}
            isFetchingMore={isFetchingMoreFollowers}
            fetchMore={() => fetchMoreFollowers()}
            setSearchFilter={setFollowersSearch}
            title='followers'
            customClass='hidden xl:flex xl:max-w-[520px] 2xl:max-w-[40%]'
          />
          <div
            ref={titleRef}
            className='w-full pt-14 relative xl:hidden'
            style={{
              scrollMarginTop: '100px'
            }}
          >
            <div className='w-full absolute top-[7px] left-0 flex justify-between'>
              {PROFILE_TABS.map(option => (
                <button
                  key={option}
                  onClick={() => setActiveTab(option)}
                  className={cn(
                    'w-1/2 capitalize text-lg py-2 font-bold glass-selector border-[3px] border-zinc-200 dark:border-zinc-500 rounded-t-xl',
                    activeTab === option
                      ? 'border-b-0'
                      : 'dark:bg-zinc-600/80 bg-zinc-200/80 text-zinc-500/50 dark:text-zinc-400'
                  )}
                >
                  {t(option)}
                </button>
              ))}
            </div>
            {mobileActiveEl}
          </div>
        </>
      )}
    </>
  )
}

export default UserInfo
