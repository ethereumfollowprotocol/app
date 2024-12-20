import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import useUser from './use-user-profile'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import { fetchProfileQRCode } from '#/api/profile/fetch-profile-qr-code'

export const useUserInfo = (user: string) => {
  const pathname = usePathname()
  const isMyProfile = useIsEditView()
  const isLoadPage = pathname === '/loading'

  const {
    stats: profileStats,
    profile: profileProfile,
    refetchProfile: profileRefetchProfile,
    fetchFreshProfile: profileFetchFreshProfile,
    setFetchFreshProfile: profileSetFetchFreshProfile,
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
    isFetchingMoreFollowing: profileIsFetchingMoreFollowing,
  } = useEFPProfile()

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
    refetchProfile: userRefetchProfile,
    statsIsLoading: userStatsIsLoading,
    profileIsLoading: userProfileIsLoading,
    isEndOfFollowing: userIsEndOfFollowing,
    isEndOfFollowers: userIsEndOfFollowers,
    setFollowingSort: userSetFollowingSort,
    setFollowersSort: userSetFollowerSort,
    fetchFreshProfile: userFetchFreshProfile,
    setFollowersSearch: userSetFollowersSearch,
    setFollowingSearch: userSetFollowingSearch,
    followersIsLoading: userFollowersIsLoading,
    followingIsLoading: userFollowingIsLoading,
    fetchMoreFollowers: userFetchMoreFollowers,
    fetchMoreFollowing: userFetchMoreFollowing,
    followingTagsFilter: userFollowingTagsFilter,
    followersTagsFilter: userFollowersTagsFilter,
    followerTagsLoading: userFollowerTagsLoading,
    setFetchFreshProfile: userSetFetchFreshProfile,
    followingTagsLoading: userFollowingTagsLoading,
    isFetchingMoreFollowers: userIsFetchingMoreFollowers,
    isFetchingMoreFollowing: userIsFetchingMoreFollowing,
    setFollowersTagsFilter: userSetFollowersTagsFilter,
    setFollowingTagsFilter: userSetFollowingTagsFilter,
  } = useUser(user)

  const stats = isMyProfile ? profileStats : userStats
  const statsIsLoading = isLoadPage || (isMyProfile ? profileStatsIsLoading : userStatsIsLoading)
  const profile: ProfileDetailsResponse | null | undefined = isMyProfile ? profileProfile : userProfile
  const profileIsLoading = isLoadPage || (isMyProfile ? profileProfileIsLoading : userProfileIsLoading)
  const following = isMyProfile ? profileFollowing : userFollowing
  const followers = isMyProfile ? profileFollowers : userFollowers
  const followingTags = isMyProfile ? profileFollowingTags : userFollowingTags
  const followingTagsLoading = isLoadPage || (isMyProfile ? profileFollowingTagsLoading : userFollowingTagsLoading)
  const followingTagsFilter = isMyProfile ? profileFollowingTagsFilter : userFollowingTagsFilter
  const followersTagsFilter = isMyProfile ? profileFollowersTagsFilter : userFollowersTagsFilter
  const toggleTag = isMyProfile ? profileToggleTag : userToggleTag
  const followersSort = isMyProfile ? profileFollowersSort : userFollowerSort
  const followingSort = isMyProfile ? profileFollowingSort : userFollowingSort
  const setFollowersSort = isMyProfile ? profileSetFollowersSort : userSetFollowerSort
  const setFollowingSort = isMyProfile ? profileSetFollowingSort : userSetFollowingSort
  const setFollowingSearch = isMyProfile ? profileSetFollowingSearch : userSetFollowingSearch
  const setFollowersSearch = isMyProfile ? profileSetFollowersSearch : userSetFollowersSearch
  const followingIsLoading = isLoadPage || (isMyProfile ? profileFollowingIsLoading : userFollowingIsLoading)
  const followersIsLoading = isLoadPage || (isMyProfile ? profileFollowersIsLoading : userFollowersIsLoading)
  const fetchMoreFollowers = isMyProfile ? profileFetchMoreFollowers : userFetchMoreFollowers
  const fetchMoreFollowing = isMyProfile ? profileFetchMoreFollowing : userFetchMoreFollowing
  const isEndOfFollowers = isMyProfile ? profileIsEndOfFollowers : userIsEndOfFollowers
  const isEndOfFollowing = isMyProfile ? profileIsEndOfFollowing : userIsEndOfFollowing
  const followerTagsLoading = isLoadPage || (isMyProfile ? profileFollowerTagsLoading : userFollowerTagsLoading)
  const followerTags = isMyProfile ? profileFollowerTags : userFollowerTags
  const setFollowingTagsFilter = isMyProfile ? profileSetFollowingTagsFilter : userSetFollowingTagsFilter
  const setFollowersTagsFilter = isMyProfile ? profileSetFollowersTagsFilter : userSetFollowersTagsFilter
  const isFetchingMoreFollowers = isMyProfile ? profileIsFetchingMoreFollowers : userIsFetchingMoreFollowers
  const isFetchingMoreFollowing = isMyProfile ? profileIsFetchingMoreFollowing : userIsFetchingMoreFollowing

  const profileList = userIsList
    ? (listNum as number)
    : profile?.primary_list
      ? Number(profile?.primary_list)
      : undefined

  const { data: qrCode, isLoading: qrCodeIsLoading } = useQuery({
    queryKey: ['qrCode', profile],
    queryFn: async () => (profile?.address ? await fetchProfileQRCode(profile.address) : null),
  })

  const refetchProfile = () => {
    if (isMyProfile)
      if (profileFetchFreshProfile) profileRefetchProfile()
      else profileSetFetchFreshProfile(true)
    else if (userFetchFreshProfile) userRefetchProfile()
    else userSetFetchFreshProfile(true)
  }

  return {
    listNum,
    profileList,
    userIsList,
    stats,
    qrCode,
    qrCodeIsLoading,
    refetchProfile,
    statsIsLoading,
    profile,
    profileIsLoading,
    following,
    followers,
    followingTags,
    followingTagsLoading,
    followingTagsFilter,
    followersTagsFilter,
    toggleTag,
    followersSort,
    followingSort,
    setFollowersSort,
    setFollowingSort,
    setFollowingSearch,
    setFollowersSearch,
    followingIsLoading,
    followersIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    isEndOfFollowers,
    isEndOfFollowing,
    followerTagsLoading,
    followerTags,
    setFollowingTagsFilter,
    setFollowersTagsFilter,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing,
  }
}
