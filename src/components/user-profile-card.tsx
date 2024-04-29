'use client'

import { Avatar, Badge, Box, Flex, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { type Address, isAddress } from 'viem'
import { useConnectedProfile } from '#/api/actions'
import { type StatsResponse, fetchUserProfile } from '#/api/requests'
import { FollowButton } from '#/components/follow-button'

interface Props {
  addressOrName: string
  stats: StatsResponse | undefined
}

export function UserProfileCard({ addressOrName, stats }: Props) {
  const { profile: connectedProfile } = useConnectedProfile()
  /////////////////////////////////////////////////////////////////////////////
  // followers for the user profile that is being viewed
  /////////////////////////////////////////////////////////////////////////////
  const { data: userProfileResponse } = useQuery({
    queryKey: ['profile', addressOrName],
    queryFn: () => fetchUserProfile({ addressOrName })
  })

  const address: Address | undefined = (
    userProfileResponse?.address || isAddress(addressOrName) ? addressOrName : undefined
  ) as Address
  const name: string | undefined = userProfileResponse?.ens?.name
  const avatar = userProfileResponse?.ens?.avatar

  if (!addressOrName) return null

  return (
    <Flex
      align='start'
      width='100%'
      height='100%'
      justify='center'
      mx='auto'
      className={clsx(['flex-col', 'bg-white/50 border-0 xl:w-60 lg:w-52 w-64 rounded-xl p-3'])}
    >
      <Badge>#{connectedProfile?.primaryList}</Badge>
      <Flex direction='column' justify='center' align='center' mx='auto' mt='3'>
        <Avatar
          src={avatar}
          radius='full'
          size='7'
          fallback={<Avatar src='/assets/gradient-circle.svg' radius='full' size='7' fallback='' />}
        />
        <Text size='5' className='font-bold' my='2'>
          {name}
        </Text>
        {address !== undefined && connectedProfile?.isFollowedBy(address) && (
          <Badge size='1' radius='full' className='8font-bold text-[8px] text-black mt-[-6] mb-2'>
            Follows you
          </Badge>
        )}
        <div className='mt-2 mb-8'>
          <FollowButton address={address} />
        </div>
      </Flex>
      <Flex className='text-center' justify='center' mx='auto' gap='8'>
        <Box>
          <Text size='5' className='font-bold' as='div'>
            {stats === undefined ? '?' : stats.following_count}
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Following
          </Text>
        </Box>
        <Box>
          <Text size='5' className='font-bold' as='div'>
            {stats === undefined ? '?' : stats.followers_count}
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Followers
          </Text>
        </Box>
      </Flex>
      <Flex justify='center' mx='auto' mt='5' mb='4' className='text-center'>
        <Box>
          <Text size='5' className='font-bold' as='div'>
            #1
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Leaderboard
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
