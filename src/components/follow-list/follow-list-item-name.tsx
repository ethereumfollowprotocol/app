import { Badge, Flex, Text } from '@radix-ui/themes'
import { Avatar } from '#/components/avatar'
import Link from 'next/link'
import type { Address } from 'viem'

interface FollowListItemNameProps {
  name: string
  address: Address
  showFollowsYouBadge: boolean
  avatarUrl?: string
  className?: string
}

export function Name({ name, address }: { name: string; address: Address }) {
  return (
    <Link href={`/${name || address}`}>
      <Text as='p' className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'>
        {name}
      </Text>
    </Link>
  )
}

export function FollowListItemName({
  name,
  address,
  showFollowsYouBadge,
  avatarUrl,
  className = ''
}: FollowListItemNameProps) {
  return (
    <Flex className={`gap-2 ${className}`}>
      <Avatar name={name} avatarUrl={avatarUrl} />
      <Flex direction='column' justify='center' align='start' className='tabular-nums'>
        <Name name={name} address={address} />
        {/* Badge will appear below the name, but the name stays centered */}
        {
          //showFollowsYouBadge &&
          <Badge
            size='1'
            radius='full'
            className='font-bold text-[8px] text-black self-start mt-[-12]'
          >
            Follows you
          </Badge>
        }
      </Flex>
    </Flex>
  )
}
