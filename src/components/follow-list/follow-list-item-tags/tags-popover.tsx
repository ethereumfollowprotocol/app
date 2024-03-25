import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Box, Flex, Popover } from '@radix-ui/themes'
import { Tag } from './tag'
import type { Address } from 'viem'
import { listOpAddTag, type ListOpTagOpParams } from '#/types/list-op'
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
  const { removeCartItem } = useCart()

  const handleClick = ({ address, tag }: ListOpTagOpParams) => {
    // remove the tag from the cart if it exists
    if (isEditView) {
      removeCartItem(listOpAddTag(address, tag))
    }
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
            <Tag address={address} key={tag} tag={tag} onClick={() => handleClick} />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
