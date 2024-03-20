import { listOpAddTag } from '#/types/list-op'
import { DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Badge, Flex, IconButton, Select } from '@radix-ui/themes'
import { useState } from 'react'
import type { Address } from 'viem'

interface FollowListItemTagsProps {
  address: Address
  className?: string
  showAddTag: boolean
  tags: string[]
}

export function FollowListItemTags({
  address,
  className = '',
  showAddTag = false,
  tags
}: FollowListItemTagsProps) {
  const [showAddTagDropdown, setShowAddTagDropdown] = useState(false)

  const handleAddTag = (tag: string) => {
    listOpAddTag(address, tag)
    listOpAddTag(address, 'dummy tag')
  }

  return (
    <Flex className={`flex w-full h-full gap-2 justify-start ${className}`}>
      {showAddTag && <AddTagButton onClick={() => setShowAddTagDropdown(!showAddTag)} />}
      {showAddTagDropdown && <AddTagDropdown handleAddTag={handleAddTag} />}
      {tags.map(tag => (
        <Badge key={tag} variant='solid' className='bg-white text-black' radius='full'>
          {tag}
        </Badge>
      ))}
      {tags.length > 2 && (
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

function AddTagButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      radius='full'
      variant='soft'
      size='1'
      className='w-5 h-5 text-black font-black'
      onClick={onClick}
    >
      <PlusIcon fontWeight={900} />
    </IconButton>
  )
}

function AddTagDropdown({
  handleAddTag
}: {
  handleAddTag: (tag: string) => void
}) {
  return (
    <Flex gap='3' align='center'>
      <Select.Root size='1' defaultValue='apple'>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value='apple'>Apple</Select.Item>
          <Select.Item value='orange'>Orange</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root size='2' defaultValue='apple'>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value='apple'>Apple</Select.Item>
          <Select.Item value='orange'>Orange</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root size='3' defaultValue='apple'>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value='apple'>Apple</Select.Item>
          <Select.Item value='orange'>Orange</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
