import { useMemo } from 'react'
import type { Address } from 'viem'
import { useSelectedProfile } from '#/contexts/selected-profile-context'

/**
 * Hook to retrieve the tags between the selected selectedProfile and a follower or following address.
 *
 * @param {Address} followerOrFollowingAddress The follower's or following's address to retrieve tags for.
 * @returns {string[]} An array of tags associated with the relationship, or an empty array if no tags are found.
 */
const useSelectedProfileTags = (followerOrFollowingAddress: Address): string[] => {
  const { selectedProfile } = useSelectedProfile()
  console.log('🦄 ~ useSelectedProfileTags ~ selectedProfile:', selectedProfile)

  return useMemo(() => {
    if (!selectedProfile) return []

    const followerOrFollowing =
      selectedProfile.getFollowerByAddress(followerOrFollowingAddress) ||
      selectedProfile.getFollowingByAddress(followerOrFollowingAddress)

    return followerOrFollowing?.tags || []
  }, [followerOrFollowingAddress, selectedProfile])
}

export default useSelectedProfileTags
