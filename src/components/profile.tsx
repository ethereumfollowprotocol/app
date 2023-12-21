import type { EnsProfile } from '#lib/types.ts'
import { Flex, Badge, Avatar, Box, Text } from '@radix-ui/themes'

export function ProfileCard({
  profile
}: { profile?: Pick<EnsProfile, 'address' | 'avatar' | 'name'> }) {
  if (!profile) return null
  const { address, avatar, name } = profile
  return (
    <Flex mx='auto' className='bg-white/70 border-0 max-w-80 w-[265px] min-w-60 rounded-xl p-3'>
      <Flex direction='column' align='start' width='100%' height='100%' justify='center'>
        <Badge>#132</Badge>
        <Flex direction='column' justify='center' align='center' mx='auto' mt='3'>
          <Avatar src={avatar} radius='full' size='7' fallback='' />
          <Text size='5' className='font-bold' my='2'>
            {name}
          </Text>
        </Flex>
        <Flex justify='center' mx='auto' className='text-center' gap='8'>
          <Box>
            <Text size='5' className='font-bold' as='div'>
              203
            </Text>
            <Text size='2' className='font-bold text-gray-400' as='div'>
              Following
            </Text>
          </Box>
          <Box>
            <Text size='5' className='font-bold' as='div'>
              1.1k
            </Text>
            <Text size='2' className='font-bold text-gray-400' as='div'>
              Followers
            </Text>
          </Box>
        </Flex>
        <Flex justify='center' mx='auto' mt='5' mb='4' className='text-center'>
          <Box>
            <Text size='5' className='font-bold' as='div'>
              #53
            </Text>
            <Text size='2' className='font-bold text-gray-400' as='div'>
              Leaderboard
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
