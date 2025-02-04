'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import TopEight from '#/components/top-eight'
import QRCodeModal from '#/components/qr-code-modal'
import type { ProfileTabType } from '#/types/common'
import { useUserInfo } from '../hooks/use-user-info'
import ListSettings from '#/components/list-settings'
import BlockedMuted from '#/components/blocked-muted'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useUserScroll } from '../hooks/use-user-scroll'
import UserProfileCard from '#/components/user-profile-card'
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

  const [isSaving, setIsSaving] = useState(false)
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
  const { roles, selectedList } = useEFPProfile()
  const { tableRef, TopEightRef, containerRef, ProfileCardRef } = useUserScroll()

  const titleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (titleRef.current && !!searchParams.get('tab')) {
      titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(searchParams.get('tab') as ProfileTabType)
      if (searchParams.get('tags') === 'top8') {
        setFollowersTagsFilter(['top8'])
      }
    }
  }, [searchParams])

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
  }[activeTab]

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
          user={user}
          list={userIsList ? listNum : undefined}
          onClose={() => {
            setIsBlockedMutedOpen(false)
            router.push(`/${user}`)
          }}
          isManager={profileList === selectedList && roles?.isManager}
        />
      )}
      {listSettingsOpen && profile && profileList && (
        <ListSettings
          selectedList={profileList}
          isSaving={isSaving}
          profile={profile}
          setIsSaving={setIsSaving}
          onClose={() => {
            setListSettingsOpen(false)
            router.push(`/${user}`)
          }}
        />
      )}
      {!isSaving && (
        <div
          className='flex relative xl:h-screen flex-col xl:flex-row pt-[108px] sm:pt-[6.75rem] pb-8 xl:pb-0 overflow-y-auto xl:justify-center gap-4 px-4 lg:px-6 xl:px-8 w-full'
          ref={containerRef}
        >
          <div
            ref={ProfileCardRef}
            className='xl:sticky xl:h-fit xl:pb-4'
            style={{
              top: '0px',
            }}
          >
            <Suspense>
              <UserProfileCard
                profileList={profileList}
                stats={stats}
                profile={profile}
                refetchProfile={refetchProfile}
                isLoading={profileIsLoading}
                isStatsLoading={statsIsLoading}
                showMoreOptions={true}
                openBlockModal={() => {
                  setIsBlockedMutedOpen(true)
                  router.push(`/${user}?modal=block_mute_list`)
                }}
                openQrCodeModal={() => setQrCodeModalOpen(true)}
                openListSettingsModal={() => setListSettingsOpen(true)}
              />
            </Suspense>
          </div>
          <div className='xl:hidden'>
            <TopEight user={user} isConnectedUserProfile={isMyProfile} />
          </div>
          <div
            ref={titleRef}
            className='w-full xl:max-w-[800px] xl:sticky relative xl:top-0 h-fit'
            style={{
              scrollMarginTop: '100px',
            }}
          >
            <div className='xl:absolute xl:top-0 xl:left-0 w-full h-fit'>
              <UserProfilePageTable
                setActiveTab={(tab) => setActiveTab(tab as ProfileTabType)}
                ref={tableRef}
                {...tableProps}
              />
            </div>
          </div>
          <div
            ref={TopEightRef}
            className='sticky pb-4 h-fit hidden xl:block'
            style={{
              top: '0px',
            }}
          >
            <TopEight user={user} isConnectedUserProfile={isMyProfile} />
          </div>
        </div>
      )}
    </>
  )
}

export default UserInfo
