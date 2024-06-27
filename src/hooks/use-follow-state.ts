import { useMemo } from 'react'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import type { FollowState } from '#/types/common'
import fetchFollowState from '#/api/fetchFollowState'
import { useEFPProfile } from '#/contexts/efp-profile-context'

type FollowStateType = 'follower' | 'following'

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
  type: FollowStateType
}) => {
  const { selectedList } = useEFPProfile()

  const { 
    data: followerStatus,
    isLoading: isFollowerStatusLoading,
    isRefetching: isFollowerStateRefetching
  } = useQuery({
    queryKey: ['follower state', address, selectedList],
    queryFn: async () => {
      if (!address) return null

      const fetchedStatus = await fetchFollowState({
        address: address,
        list: selectedList,
        type: 'follower'
      })

      return fetchedStatus
    }
  })

  const {
    data: followingStatus,
    isLoading: isFollowingStatusLoading,
    isRefetching: isFollowingStatusRefetching
  } = useQuery({
    queryKey: ['follow state', address, selectedList],
    queryFn: async () => {
      if (!address) return null

      const fetchedProfile = await fetchFollowingState({ address: address, list: selectedList })
      return fetchedProfile
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })

  const followState = useMemo((): FollowState => {
    const selectedStatus = type === 'following' ? followingStatus : followerStatus
    if (!selectedStatus) return 'none'

    if (selectedStatus.state.is_blocked) return 'blocks'
    if (selectedStatus.state.is_muted) return 'mutes'
    if (selectedStatus.state.is_following) return 'follows'

    return 'none'
  }, [followerStatus, followingStatus, type])

  const isFollowStateLoading = {
    followers: isFollowerStatusLoading || isFollowerStateRefetching,
    followings: isFollowingStatusLoading || isFollowingStatusRefetching
  }[type]

  const followerTag = {
    blocks: {
      text: 'blocks you',
      className: 'text-darkGray'
    },
    mutes: {
      text: 'mutes you',
      className: 'text-darkGray'
    },
    follows: {
      text: 'follows you',
      className: 'text-darkGray'
    },
    none: {
      text: '',
      className: 'hidden text-darkGray'
    }
  }[followState]

  return {
    followState,
    followerTag,
    isFollowStateLoading
  }
}

export default useFollowState
