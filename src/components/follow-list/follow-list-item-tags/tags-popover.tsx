import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Box, Flex, Popover } from '@radix-ui/themes'
import { Tag } from './tag'
import type { Address } from 'viem'

interface TagsPopoverProps {
  address: Address
  isOpen: boolean
  onClose: () => void
  tags: string[]
}

export function TagsPopover({ address, tags }: TagsPopoverProps) {
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
            <Tag address={address} key={tag} tag={tag} className='border-[1px] border-gray-300' />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
