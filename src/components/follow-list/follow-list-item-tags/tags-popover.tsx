import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Box, Flex, Popover } from '@radix-ui/themes'
import { Tag } from './tag'
import type { Address } from 'viem'
import { listOpAddTag, listOpRemoveTag, type ListOpTagOpParams } from '#/types/list-op'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useCart } from '#/contexts/cart-context'

interface TagsPopoverProps {
  address: Address
  isOpen: boolean
  onClose: () => void
  tags: string[]
}

export function TagsPopover({ address, tags }: TagsPopoverProps) {
  const isEditView = useIsEditView()
  const { removeAddTagFromCart, removeRemoveTagFromCart, addAddTagToCart, addRemoveTagToCart } =
    useCart()

  const handleClick = ({ address, tag }: ListOpTagOpParams) => {
    // If not in edit view, do nothing
    if (!isEditView) return

    // Remove the add tag from the cart if it exists
    removeAddTagFromCart({ address, tag })

    // Remove the remove tag from the cart if it exists
    removeRemoveTagFromCart({ address, tag })

    // Add the add tag to the cart if applicable
    addAddTagToCart({ address, tag })

    // Add the remove tag to the cart if applicable
    addRemoveTagToCart({ address, tag })
  }
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Box className='px-2 bg-white rounded-full cursor-pointer'>
          <DotsHorizontalIcon className='h-4 w-4' />
        </Box>
      </Popover.Trigger>
      <Popover.Content className='bg-white rounded-xl p-2 flex gap-2 mt-2 flex-wrap text-[#464646] font-semibold'>
        <Flex direction='column' gap='2'>
          {tags.map(tag => (
            <Tag
              address={address}
              key={tag}
              tag={tag}
              onClick={() => handleClick}
              className='border-[1px] border-gray-300'
            />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
