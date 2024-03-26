/**
 * @description Check if the user can add a tag for the given profile
 * The user can add a tag if they are following the profile and the profile is not their own
 * @param {Address} profileAddress - The address of the profile to check
 * @returns {boolean} - Whether the user can add a tag for that profile
 *
 */
import { useConnectedProfile } from '#/api/actions'
import { DEFAULT_PROFILE_ADDRESS_FOR_TESTING } from '#/app/efp/types'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useMemo } from 'react'
import type { Address } from 'viem'

const useCanAddTag = (profileAddress: Address) => {
  const isEditView = useIsEditView()
  // TODO use connected address only
  const { profile } = useConnectedProfile(DEFAULT_PROFILE_ADDRESS_FOR_TESTING)

  return useMemo(() => {
    const isFollowing = profile?.hasFollowingByAddress(profileAddress)

    // User can add a tag for the specified profile if it's the user's own profile/editor page, and they are following the profileAddress
    if (isEditView && isFollowing) return true

    // If the profile is not the user's own profile/editor page, the user can add a tag if they are following the profileAddress
    if (isFollowing) return true

    // Otherwise, the user cannot add a tag
    return false
  }, [profile, profileAddress, isEditView])
}

export default useCanAddTag
