import type { Address } from 'viem'
import type { FollowState } from '#/types/common'
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
export function useFollowState(address: Address, type: 'followers' | 'followings'): FollowState {
  const { followers, following } = useEFPProfile()

  const followerState = () => {
    if (!followers) return 'none'

    const follower = followers?.find(
      follower => follower?.address?.toLowerCase() === address?.toLowerCase()
    )
    if (!follower) return 'none'

    if (follower?.is_blocked) return 'blocks'
    if (follower.is_muted) return 'mutes'
    if (follower) return 'follows'

    return 'none'
  }

  const followingState = () => {
    if (!following) return 'none'

    const followingItem = following?.find(
      follower => follower?.data?.toLowerCase() === address?.toLowerCase()
    )
    if (!followingItem) return 'none'

    if (followingItem.tags.includes('Blocked')) return 'blocks'
    if (followingItem.tags.includes('Muted')) return 'mutes'

    return 'follows'
  }

  const followState = {
    followers: followerState,
    followings: followingState
  }[type]

  return followState()
}
