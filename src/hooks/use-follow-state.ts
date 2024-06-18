import type { Address } from 'viem'
import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { FollowState } from '#/types/common'
import fetchFollowingState from '#/api/fetchFollowingStatus'
import { useEFPProfile } from '#/contexts/efp-profile-context'

/**
 * @description
 * Hook for fetching the follow state between the connected user and a specified address.
 * This hook depends on the `useConnectedProfile` hook to access the current user's profile and
 * perform the follow state lookup. If the user's profile is not loaded or the address is not specified,
 * it defaults to 'none'.
 *
 * @param address - The address whose follow state is to be determined relative to the connected user's profile.
 * @param type - The type of followers or followings to check
 * @returns {FollowState: FollowState, isFollowStateLoading: boolean} - The follow state as a string, which can be 'follows', 'blocks', 'mutes', or 'none'
 * indicating the relationship status from the perspective of the connected user towards the specified address.
 */
const useFollowState = ({
  address,
  type
}: {
  address: Address
  type: 'followers' | 'followings'
}) => {
  const { followers, selectedList, followersIsLoading } = useEFPProfile()

  const { data: followingStatus, isLoading: isFollowingStatusLoading } = useQuery({
    queryKey: ['follow state', address, selectedList],
    queryFn: async () => {
      if (!address) return null

      const fetchedProfile = await fetchFollowingState({ address: address, list: selectedList })
      return fetchedProfile
    }
  })

  const followerState = useCallback((): FollowState => {
    if (!followers) return 'none'

    const follower = followers?.find(
      follower => follower?.address?.toLowerCase() === address?.toLowerCase()
    )
    if (!follower) return 'none'

    if (follower?.is_blocked) return 'blocks'
    if (follower.is_muted) return 'mutes'
    if (follower) return 'follows'

    return 'none'
  }, [followers, address])

  const followingState = useCallback((): FollowState => {
    if (!followingStatus) return 'none'

    if (followingStatus.state.is_blocked) return 'blocks'
    if (followingStatus.state.is_muted) return 'mutes'
    if (followingStatus.state.is_following) return 'follows'

    return 'none'
  }, [followingStatus])

  const followState = useMemo(
    () =>
      ({
        followers: followerState,
        followings: followingState
      })[type],
    [followerState, followingState, type]
  )

  const isFollowStateLoading = {
    followers: followersIsLoading,
    followings: isFollowingStatusLoading
  }[type]

  return {
    followState: followState(),
    isFollowStateLoading
  }
}

export default useFollowState
