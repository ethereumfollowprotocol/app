import { useMemo } from 'react'
import type { Address } from 'viem'
import { useProfile } from '#/api/actions'

/**
 * Hook to retrieve tags between a specified user and a follower or following address.
 *
 * @param {Object} params Parameters for the hook.
 * @param {Address | undefined} params.address The user's address.
 * @param {Address} params.followerOrFollowingAddress The follower's or following's address to retrieve tags for.
 * @returns {string[]} An array of tags associated with the relationship, or an empty array if no tags are found.
 */
const useTags = ({
  address,
  followerOrFollowingAddress
}: { address: Address | undefined; followerOrFollowingAddress: Address }): string[] => {
  const profile = useProfile(address)

  return useMemo(() => {
    if (!address || !profile) return []

    const followerOrFollowing =
      profile.getFollowerByAddress(followerOrFollowingAddress) ||
      profile.getFollowingByAddress(followerOrFollowingAddress)

    return followerOrFollowing?.tags || []
  }, [address, followerOrFollowingAddress, profile])
}

export default useTags
