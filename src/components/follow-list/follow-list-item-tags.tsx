import { useFollowState } from '#/hooks/use-follow-state'
import { DotsHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { Badge, Flex, IconButton } from '@radix-ui/themes'
import type { Address } from 'viem'

interface FollowListItemTagsProps {
  address: Address
  tags: Array<string>
  className?: string
}

export function FollowListItemTags({ address, tags, className = '' }: FollowListItemTagsProps) {
  const followState = useFollowState(address)
  return (
    <Flex className={`flex w-full h-full gap-2 justify-start ${className}`}>
      {followState === 'follows' && (
        <IconButton radius='full' variant='soft' size='1' className='w-5 h-5 text-black font-black'>
          <PlusIcon fontWeight={900} />
        </IconButton>
      )}
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
