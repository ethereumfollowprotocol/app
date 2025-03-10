import { useEffect, useRef, useState } from 'react'

import { useCart } from '#/hooks/use-cart'
import type { ProfileListProfile } from '..'
import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

export const useTagsDropdown = (
  profiles: ProfileListProfile[],
  platform?: ImportPlatformType,
  canEditTags?: boolean,
  isBlockedList?: boolean
) => {
  const [customTagInput, setCustomTagInput] = useState('')
  const tagInputRef = useRef<HTMLInputElement>(null)

  const { recentTags, addRecentTag } = useEFPProfile()
  const {
    addToCart,
    removeFromCart,
    getTagsFromCartByAddress,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
  } = useCart()

  // Take the first address for checking cart states for all social profiles
  const address = profiles?.[0]?.address
  const tags = profiles.flatMap(({ tags }) => tags)
  const tagsFromCart = address ? getTagsFromCartByAddress(address) : []
  // const addressListOpsInCart = address
  //   ? cart.filter(
  //       item => item.listOp.data.slice(0, 42).toLowerCase() === address.toLowerCase()
  //     )
  //   : []

  const initialDisplayedTags = () => {
    return [
      ...new Set(
        [...tags, ...(canEditTags ? tagsFromCart : [])].filter((tag) =>
          isBlockedList ? ['block', 'mute'].includes(tag) : true
        )
      ),
    ]
  }
  const [displayedTags, setDisplayedTags] = useState<string[]>(initialDisplayedTags())

  const addTag = async (tag: string) => {
    if (!canEditTags || !address) return

    if (!displayedTags.includes(tag)) {
      addRecentTag(tag)
      setDisplayedTags((prevTags) => [...prevTags, tag])

      addToCart([listOpAddTag(address, tag)])
    }
  }

  const removeTag = async (tag: string) => {
    if (!address || !canEditTags) return null

    if (hasListOpAddTag(address, tag)) {
      setDisplayedTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag))
      return removeFromCart([listOpAddTag(address, tag)])
    }

    if (hasListOpRemoveTag(address, tag)) return removeFromCart([listOpRemoveTag(address, tag)])

    addToCart([listOpRemoveTag(address, tag)])
  }

  const addCustomTag = () => {
    if (customTagInput.length === 0) return

    setCustomTagInput('')
    addTag(customTagInput)
  }

  const isBeingRemoved = address ? hasListOpRemoveRecord(address) : false
  const isBeingRestricted = address && (hasListOpAddTag(address, 'block') || hasListOpAddTag(address, 'mute'))
  const isBeingUnrestricted = address && (hasListOpRemoveTag(address, 'block') || hasListOpRemoveTag(address, 'mute'))

  useEffect(() => {
    if (!isBeingRemoved || isBeingUnrestricted) return setDisplayedTags(initialDisplayedTags())

    tagsFromCart.forEach((tag) => {
      removeTag(tag)
    })
  }, [isBeingRemoved, isBeingRestricted, isBeingUnrestricted])

  return {
    customTagInput,
    setCustomTagInput,
    tagInputRef,
    addCustomTag,
    removeTag,
    addTag,
    displayedTags,
    recentTags,
  }
}
