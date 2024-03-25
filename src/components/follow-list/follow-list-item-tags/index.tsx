import { listOpAddTag, type ListOpTagOpParams } from '#/types/list-op'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import type { Address } from 'viem'
import { useCallback, useState } from 'react'
import { useCart } from '#/contexts/cart-context'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AddTagDropdown } from './add-tag-dropdown'
import { Tag } from './tag'

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
  const pathname = usePathname()
  const { removeCartItem, getTagsFromCartByAddress, hasListOpAddTag, hasListOpRemoveTag } =
    useCart()

  const [showAllTags, setShowAllTags] = useState(false)

  const isEditor = pathname === '/editor'
  const isProfile = pathname === '/profile'
  const canEditTags = isEditor || isProfile
  const allTags = canEditTags ? [...getTagsFromCartByAddress(address), ...initialTags] : initialTags
  const displayedTags = showAllTags ? allTags : allTags.slice(0, DEFAULT_NUM_TAGS_TO_SHOW)

  const handleRemoveTagFromCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      removeCartItem(listOpAddTag(address, tag))
    },
    [removeCartItem]
  )

  const getTagBgColor = ({ address, tag }: ListOpTagOpParams) =>
    hasListOpAddTag({ address, tag })
      ? 'bg-lime-500'
      : hasListOpRemoveTag({ address, tag })
        ? 'bg-salmon-400'
        : 'bg-white'

  return (
    <Flex className={`flex w-full h-full gap-2 justify-start ${className}`}>
      {showAddTag && <AddTagDropdown address={address} />}
      {displayedTags.map(tag => (
        <Tag
          address={address}
          key={address + tag}
          tag={tag}
          className={clsx(getTagBgColor({ address, tag }), canEditTags && 'cursor-pointer')}
          onClick={() => handleRemoveTagFromCart({ address, tag })}
        />
      ))}
      {!showAllTags && allTags.length > DEFAULT_NUM_TAGS_TO_SHOW && (
        <IconButton
          variant='soft'
          size='1'
          className='bg-white text-black font-extrabold rounded-lg h-4'
        >
          <DotsHorizontalIcon />
        </IconButton>
      )}
    </Flex>
  )
}
