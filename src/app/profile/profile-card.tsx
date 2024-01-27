import { getEnsProfile } from '#/app/actions.ts';
import { Avatar, Badge, Box, Flex, Text } from '@radix-ui/themes';
import clsx from 'clsx';

export async function ProfileCard({ addressOrName }: { addressOrName: string }) {
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
      <Badge>#132</Badge>
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
            203
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Following
          </Text>
        </Box>
        <Box>
          <Text size='5' className='font-bold' as='div'>
            1.1k
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Followers
          </Text>
        </Box>
      </Flex>
      <Flex justify='center' mx='auto' mt='5' mb='4' className='text-center'>
        <Box>
          <Text size='5' className='font-bold' as='div'>
            #53
          </Text>
          <Text size='2' className='font-bold text-gray-500' as='div'>
            Leaderboard
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
