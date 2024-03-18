import { Badge, Flex, Text } from '@radix-ui/themes'
import { Avatar } from '#/components/avatar'
import Link from 'next/link'
import type { Address } from 'viem'
import { truncateAddress } from '#/lib/utilities'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string
  className?: string
  name?: string
  showFollowsYouBadge: boolean
}

export function Name({ name, address }: { name: string; address: Address }) {
  return (
    <Link href={`/${name || address}`}>
      <Text as='p' className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'>
        {name || truncateAddress(address)}
      </Text>
    </Link>
  )
}

export function FollowListItemName({
  address,
  name,
  showFollowsYouBadge,
  avatarUrl,
  className = ''
}: FollowListItemNameProps) {
  return (
    <Flex className={`gap-2 ${className}`}>
      <Avatar name={name || address} avatarUrl={avatarUrl} />
      <Flex direction='column' justify='center' align='start' className='tabular-nums'>
        <Name name={name || address} address={address} />
        {/* Badge will appear below the name, but the name stays centered */}
        {
          //showFollowsYouBadge &&
          <Badge
            size='1'
            radius='full'
            className='font-bold text-[8px] self-start mt-[-14] bg-[#CDCDCD] text-[#333333]'
          >
            Follows you
          </Badge>
        }
      </Flex>
    </Flex>
  )
}
