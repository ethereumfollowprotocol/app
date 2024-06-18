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
 * @returns {FollowState} - The follow state as a string, which can be 'follows', 'blocks', 'mutes', or 'none'
 * indicating the relationship status from the perspective of the connected user towards the specified address.
 */
export function useFollowState({
  address,
  type
}: {
  address: Address
  type: 'followers' | 'followings'
}): FollowState {
  const { followers, selectedList } = useEFPProfile()

  const { data: followingStatus } = useQuery({
    queryKey: ['follow button', address, selectedList],
    queryFn: async () => {
      if (!address) return null

      const fetchedProfile = await fetchFollowingState({ address: address, list: selectedList })
      return fetchedProfile
    },
    refetchInterval: 60000,
    staleTime: 10000
  })

  const followerState = useCallback(() => {
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

  const followingState = useCallback(() => {
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

  return followState()
}
