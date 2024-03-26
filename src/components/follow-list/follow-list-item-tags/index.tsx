import { listOpAddTag, type ListOpTagOpParams } from '#/types/list-op'
import { Flex } from '@radix-ui/themes'
import type { Address } from 'viem'
import { useCallback, useState } from 'react'
import { useCart } from '#/contexts/cart-context'
import { AddTagDropdown } from './add-tag-dropdown'
import { Tag } from './tag'
import { TagsPopover } from './tags-popover'
import { useIsEditView } from '#/hooks/use-is-edit-view'

interface FollowListItemTagsProps {
  address: Address
  className?: string
  showAddTag: boolean
  tags: string[]
}

const DEFAULT_NUM_TAGS_TO_SHOW = 2

export function FollowListItemTags({
  address,
  className = '',
  showAddTag,
  tags: initialTags
}: FollowListItemTagsProps) {
  const isEditView = useIsEditView()
  const { removeCartItem, getTagsFromCartByAddress } = useCart()

  const [showAllTags, setShowAllTags] = useState(false)
  const allTags = isEditView
    ? [...new Set([...getTagsFromCartByAddress(address), ...initialTags])]
    : initialTags
  const displayedTags = showAllTags ? allTags : allTags.slice(0, DEFAULT_NUM_TAGS_TO_SHOW)

  const handleRemoveTagFromCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      removeCartItem(listOpAddTag(address, tag))
    },
    [removeCartItem]
  )

  return (
    <Flex className={`flex w-full h-full gap-2 justify-start ${className}`}>
      {showAddTag && <AddTagDropdown address={address} />}
      {displayedTags.map(tag => (
        <Tag
          address={address}
          key={address + tag}
          tag={tag}
          onClick={() => handleRemoveTagFromCart({ address, tag })}
        />
      ))}
      {allTags.length > 2 && (
        <TagsPopover
          address={address}
          isOpen={showAllTags}
          onClose={() => setShowAllTags(false)}
          tags={allTags}
        />
      )}
    </Flex>
  )
}
