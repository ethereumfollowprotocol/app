import { useEffect, useRef, useState } from 'react'

import type { ProfileListProfile } from '..'
import { yieldToMain } from '#/utils/yield-to-main'
import { useCart } from '#/contexts/cart-context'
import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'
import { extractAddressAndTag, isTagListOp } from '#/utils/list-ops'

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
    cartItems,
    setCartItems,
    getTagsFromCartByAddress,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
  } = useCart()

  const address = profiles?.[0]?.address
  const tags = profiles.flatMap(({ tags }) => tags)
  const tagsFromCart = address ? getTagsFromCartByAddress(address) : []
  // const addressListOpsInCart = address
  //   ? cartItems.filter(
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

  // useEffect(() => {
  //   if (addressListOpsInCart.length > 0) {
  //     setDisplayedTags(initialDisplayedTags())
  //   }
  // }, [addressListOpsInCart])

  const addTag = async (tag: string) => {
    if (!displayedTags.includes(tag)) {
      addRecentTag(tag)
      setDisplayedTags((prevTags) => [...prevTags, tag])
      await yieldToMain()

      const newCartItems = profiles.map(({ address }) => ({
        listOp: listOpAddTag(address, tag),
        import: platform,
      }))

      setCartItems([...cartItems, ...newCartItems])
    }
  }

  const removeTag = async (tag: string) => {
    if (!address) return null

    const addresses = profiles.map(({ address }) => address.toLowerCase())

    if (hasListOpAddTag({ address, tag })) {
      setDisplayedTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag))

      await yieldToMain()

      return setCartItems((oldCartItems) =>
        oldCartItems.filter(
          (item) =>
            !(isTagListOp(item.listOp)
              ? addresses.includes(extractAddressAndTag(item.listOp).address.toLowerCase()) &&
                extractAddressAndTag(item.listOp).tag === tag
              : false)
        )
      )
    }

    if (hasListOpRemoveTag({ address, tag }))
      return setCartItems((oldCartItems) =>
        oldCartItems.filter(
          (item) =>
            !(isTagListOp(item.listOp)
              ? addresses.includes(extractAddressAndTag(item.listOp).address.toLowerCase()) &&
                extractAddressAndTag(item.listOp).tag === tag
              : false)
        )
      )

    const newCartItems = profiles.map(({ address }) => ({
      listOp: listOpRemoveTag(address, tag),
      import: platform,
    }))

    setCartItems([...cartItems, ...newCartItems])
  }

  const addCustomTag = () => {
    if (customTagInput.length === 0) return

    setCustomTagInput('')
    addTag(customTagInput)
  }

  const isBeingRemoved = address ? hasListOpRemoveRecord(address) : false
  const isBeingRestricted =
    address && (hasListOpAddTag({ address, tag: 'block' }) || hasListOpAddTag({ address, tag: 'mute' }))
  const isBeingUnrestricted =
    address && (hasListOpRemoveTag({ address, tag: 'block' }) || hasListOpRemoveTag({ address, tag: 'mute' }))

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
