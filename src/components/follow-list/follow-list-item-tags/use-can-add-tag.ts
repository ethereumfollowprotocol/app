/**
 * @description Check if the user can add a tag for the given profile
 * The user can add a tag if they are following the profile and the profile is not their own
 * @param {Address} profileAddress - The address of the profile to check
 * @returns {boolean} - Whether the user can add a tag for that profile
 *
 */
import { useMemo } from 'react'
import type { Address } from 'viem'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useEFPProfile } from '#/contexts/efp-profile-context'

const useCanAddTag = (profileAddress: Address) => {
  const isEditView = useIsEditView()
  const { profile, following } = useEFPProfile()

  return useMemo(() => {
    const isFollowing = !!following?.find(follower => follower.data === profileAddress)

    // User can add a tag for the specified profile if it's the user's own profile/editor page, and they are following the profileAddress
    if (isEditView && isFollowing) return true

    // If the profile is not the user's own profile/editor page, the user can add a tag if they are following the profileAddress
    if (isFollowing) return true

    // Otherwise, the user cannot add a tag
    return false
  }, [profile, profileAddress, isEditView])
}

export default useCanAddTag
