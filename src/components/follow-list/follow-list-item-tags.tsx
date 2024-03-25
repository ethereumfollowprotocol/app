import { listOpAddTag } from '#/types/list-op'
import { DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Badge, Box, Flex, IconButton, Text } from '@radix-ui/themes'
import * as Select from '@radix-ui/react-select'
import type { Address } from 'viem'
import { useCallback, useEffect, useState } from 'react'
import { useCart } from '#/contexts/cart-context'
import useSuggestedTags from '#/hooks/use-suggested-tags'
import { usePathname } from 'next/navigation'

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
  const { addCartItem, getTagsFromCartByAddress, hasListOpAddTag, hasListOpRemoveTag } = useCart()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleAddTag = useCallback(
    (tag: string) => {
      console.log('Adding tag:', tag)
      addCartItem({ listOp: listOpAddTag(address, tag) })
      setSelectedTag(null) // Reset selected tag after adding
    },
    [address, addCartItem]
  )

  // Add tag to cart
  useEffect(() => {
    if (selectedTag) handleAddTag(selectedTag)
  }, [selectedTag, handleAddTag])

  const isEditor = pathname === '/editor'
  const isProfile = pathname === '/profile'
  const showCartTags = isEditor || isProfile
  const tags = showCartTags ? [...initialTags, ...getTagsFromCartByAddress(address)] : initialTags
  const getTagBgColor = ({ address, tag }: { address: Address; tag: string }) =>
    hasListOpAddTag({ address, tag })
      ? 'bg-lime-500'
      : hasListOpRemoveTag({ address, tag })
        ? 'bg-salmon-400'
        : 'bg-white'

  return (
    <Flex className={`flex w-full h-full gap-2 justify-start ${className}`}>
      {showAddTag && <AddTagDropdown address={address} setSelectedTag={setSelectedTag} />}
      {(isEditor ? tags : tags.slice(0, DEFAULT_NUM_TAGS_TO_SHOW)).map(tag => (
        <Tag key={tag} tag={tag} className={getTagBgColor({ address, tag })} />
      ))}
      {tags.length - 1 > DEFAULT_NUM_TAGS_TO_SHOW && (
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

function AddTagDropdown({
  address,
  tags: initialTags = [],
  setSelectedTag
}: {
  address: Address
  tags?: string[] // Optional initial tags to use in the dropdown
  setSelectedTag: (tag: string) => void
}) {
  const suggestedTags = useSuggestedTags(address)
  const tags = [...initialTags, ...suggestedTags]
  const [isEditingCustomTag, setIsEditingCustomTag] = useState(false)
  const [customTagValue, setCustomTagValue] = useState('')

  const handleCustomTagClick = () => {
    setIsEditingCustomTag(true)
  }

  const handleCustomTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTagValue(event.target.value)
  }

  const handleCustomTagSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const trimmedValue = customTagValue.trim()
      if (trimmedValue === '') return

      setSelectedTag(trimmedValue)
      setIsEditingCustomTag(false)
      setCustomTagValue('')
    }
  }

  return (
    <Select.Root
      defaultValue={tags[0]}
      onValueChange={setSelectedTag}
      onOpenChange={() => setIsEditingCustomTag(false)}
    >
      <Select.Trigger>
        <PlusIcon className='flex items-center w-5 h-5 text-black bg-grey rounded-full font-bold p-1' />
      </Select.Trigger>
      <Select.Content
        position='popper'
        className='bg-white rounded-xl p-2 flex gap-2 mt-2 flex-wrap text-[#464646] font-semibold'
      >
        {isEditingCustomTag ? (
          <input
            // biome-ignore lint/a11y/noAutofocus: user is intentionally clicking to get to the input
            autoFocus={true}
            type='text'
            value={customTagValue}
            onChange={handleCustomTagInputChange}
            onKeyDown={handleCustomTagSubmit}
            className='bg-grey rounded-xl p-2 focus:outline-none'
            placeholder='Enter custom tag'
          />
        ) : (
          <Box
            onClick={handleCustomTagClick}
            className='bg-grey rounded-xl flex gap-1 items-center p-2 cursor-pointer hover:ring-gray-500 hover:ring-[1px]'
          >
            <PlusIcon fontWeight='7' />
            <Text>Custom Tag</Text>
          </Box>
        )}
        {tags.map(tag => (
          <Select.Item
            key={tag}
            value={tag}
            className='bg-grey rounded-full p-1 cursor-pointer hover:ring-gray-500 hover:ring-[1px]'
          >
            {tag}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

function Tag({
  tag,
  className,
  onClick
}: { tag: string; className?: string; onClick?: () => void }) {
  return (
    <Badge
      key={tag}
      variant='solid'
      className={`text-black ${className}`}
      radius='full'
      onClick={onClick}
    >
      {tag}
    </Badge>
  )
}
