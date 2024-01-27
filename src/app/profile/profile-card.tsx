import { getEnsProfile } from '#/app/actions.ts'
import { Avatar, Badge, Box, Flex, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import type { Stats } from './actions'

interface Props {
  addressOrName: string
  stats: Stats | undefined
}

export async function ProfileCard({ addressOrName, stats }: Props) {
  if (!addressOrName) return null

  const { address, name, avatar } = await getEnsProfile(addressOrName)
  return (
    <Flex
      align='start'
      width='100%'
      height='100%'
      justify='center'
      mx='auto'
      className={clsx(['flex-col', 'bg-white/50 border-0 xl:w-60 lg:w-52 w-64 rounded-xl p-3'])}
    >
      <Badge>#TODO</Badge>
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
            #??
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Leaderboard
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
