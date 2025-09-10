'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '#/lib/utilities'
import TopEightActivity from './top-eight-activity'
import UserProfile from '#/components/user-profile'
import QRCodeModal from '#/components/qr-code-modal'
import type { ProfileTabType } from '#/types/common'
import { useUserInfo } from '../hooks/use-user-info'
import ListSettings from '#/components/list-settings'
import BlockedMuted from '#/components/blocked-muted'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useUserScroll } from '../hooks/use-user-scroll'
import BackToTop from '#/components/buttons/back-to-top'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import UserProfilePageTable from '#/components/profile-page-table'

interface UserInfoProps {
  user: string
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const searchParams = useSearchParams()
  const initialQrCodeModalOpen = searchParams.get('modal') === 'qr_code'
  const initialBlockedOpen = searchParams.get('modal') === 'block_mute_list'
  const initialListSettingsOpen = searchParams.get('modal') === 'list_settings'
  const defaultParam = (searchParams.get('tab') as ProfileTabType) ?? 'following'

  const [listSettingsOpen, setListSettingsOpen] = useState(initialListSettingsOpen)
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(initialQrCodeModalOpen)
  const [isBlockedMutedOpen, setIsBlockedMutedOpen] = useState(initialBlockedOpen)
  const [activeTab, setActiveTab] = useState<ProfileTabType>(defaultParam)

  const {
    stats,
    qrCode,
    profile,
    listNum,
    followers,
    following,
    toggleTag,
    userIsList,
    profileList,
    followerTags,
    followersSort,
    followingSort,
    followingTags,
    refetchProfile,
    statsIsLoading,
    qrCodeIsLoading,
    profileIsLoading,
    isEndOfFollowing,
    isEndOfFollowers,
    setFollowingSort,
    setFollowersSort,
    setFollowersSearch,
    setFollowingSearch,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    followingTagsFilter,
    followersTagsFilter,
    followerTagsLoading,
    followingTagsLoading,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing,
    setFollowersTagsFilter,
    setFollowingTagsFilter,
  } = useUserInfo(user)
  const router = useRouter()
  const isMyProfile = useIsEditView()
  const { roles } = useEFPProfile()
  const { tableRef, TopEightRef, containerRef, isCommonFollowersModalOpen } = useUserScroll()

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') as ProfileTabType)
      if (searchParams.get('tags') === 'top8') {
        setFollowersTagsFilter(['top8'])
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (stats) {
      if (stats.following_count === 0 && stats.followers_count > 0) {
        setActiveTab('followers')
      }
    }
  }, [stats])

  const tableProps = {
    followers: {
      isLoading: followersIsLoading,
      results: followers,
      allTags: followerTags?.tagCounts,
      tagsLoading: followerTagsLoading,
      selectedTags: followersTagsFilter,
      toggleSelectedTags: toggleTag,
      setSelectedTags: setFollowersTagsFilter,
      sort: followersSort,
      setSort: setFollowersSort,
      isEndOfResults: isEndOfFollowers,
      setSearchFilter: setFollowersSearch,
      isFetchingMore: isFetchingMoreFollowers,
      fetchMore: () => fetchMoreFollowers(),
      title: 'followers' as ProfileTabType,
      canEditTags: false,
    },
    following: {
      isLoading: followingIsLoading,
      results: following,
      allTags: followingTags?.tagCounts,
      tagsLoading: followingTagsLoading,
      selectedTags: followingTagsFilter,
      toggleSelectedTags: toggleTag,
      setSelectedTags: setFollowingTagsFilter,
      sort: followingSort,
      setSort: setFollowingSort,
      isEndOfResults: isEndOfFollowing,
      setSearchFilter: setFollowingSearch,
      isFetchingMore: isFetchingMoreFollowing,
      fetchMore: () => fetchMoreFollowing(),
      title: 'following' as ProfileTabType,
      canEditTags: isMyProfile && roles?.isManager,
    },
  }

  const activeTableProps = tableProps[activeTab]

  useEffect(() => {
    const userPage = document.getElementById('user-page')
    if (userPage && userPage.scrollTop > (window.innerWidth > 1024 ? 300 : 750)) {
      userPage.scrollTo({ top: window.innerWidth > 1024 ? 300 : 750, behavior: 'instant' })
    }
  }, [activeTab, followersTagsFilter, followingTagsFilter, followersSort, followingSort])

  return (
    <>
      {qrCodeModalOpen && (
        <QRCodeModal
          onClose={() => {
            setQrCodeModalOpen(false)
            router.push(`/${user}`)
          }}
          isLoading={qrCodeIsLoading || !profile}
          qrCode={qrCode}
        />
      )}
      {isBlockedMutedOpen && (
        <BlockedMuted
          user={userIsList && listNum ? listNum.toString() : user}
          onClose={() => {
            setIsBlockedMutedOpen(false)
            router.push(`/${user}`)
          }}
        />
      )}
      {listSettingsOpen && profile && profileList && (
        <ListSettings
          selectedList={profileList}
          profile={profile}
          onClose={() => {
            setListSettingsOpen(false)
            router.push(`/${user}`)
          }}
        />
      )}
      <div
        id='user-page'
        className={cn(
          'relative mx-auto flex h-screen w-full flex-col items-center gap-4 overflow-y-auto px-0 pb-32 sm:pr-0 sm:pb-8 sm:pl-[70px] lg:gap-0 2xl:pl-20',
          isCommonFollowersModalOpen && 'overflow-hidden'
        )}
        ref={containerRef}
      >
        <div className='z-20 mt-20 w-full sm:mt-0 md:z-auto'>
          <UserProfile
            addressOrName={user}
            isMyProfile={isMyProfile}
            profileList={profileList}
            stats={stats}
            profile={profile}
            refetchProfile={refetchProfile}
            isLoading={profileIsLoading}
            isStatsLoading={statsIsLoading}
            openBlockModal={() => {
              setIsBlockedMutedOpen(true)
              router.push(`/${user}?modal=block_mute_list&ssr=false`)
            }}
            openQrCodeModal={() => setQrCodeModalOpen(true)}
            openListSettingsModal={() => setListSettingsOpen(true)}
          />
        </div>
        <div className='flex w-full max-w-[1920px] flex-col-reverse gap-4 px-4 md:-mt-28 lg:-mt-24 lg:flex-row xl:px-8'>
          <div className='z-20 h-fit w-full'>
            <UserProfilePageTable
              ref={tableRef}
              setActiveTab={(tab) => setActiveTab(tab as ProfileTabType)}
              {...activeTableProps}
            />
          </div>
          <div ref={TopEightRef} className='top-0 z-10 h-fit pb-4 lg:sticky'>
            <TopEightActivity
              user={user}
              isConnectedUserProfile={isMyProfile}
              followingListProps={tableProps.following}
            />
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  )
}

export default UserInfo
