import { FollowButton } from '#/components/follow-button.tsx'
import { ImageWithFallback } from '#/components/image-with-fallback.tsx'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'

export interface TeamMember {
  ens: string
  address: string
  x: string
  github: string
  avatar: string
}

export function TeamCard(props: TeamMember) {
  const { ens, address, avatar, x, github } = props
  return (
    <Flex direction='column'>
      <Flex mx='auto' className='bg-white/70 border-0 max-w-80 w-[295px] min-w-60 rounded-xl p-3'>
        <Flex direction='column' align='start' width='100%' height='100%' justify='center'>
          <Badge>#1</Badge>
          <Flex direction='column' justify='center' align='center' mx='auto' mt='3'>
            <ImageWithFallback
              src={avatar}
              width={100}
              height={100}
              className='rounded-full'
              alt='avatar'
            />
            <Text size='5' className='font-bold' my='2'>
              {ens}
            </Text>
            <Badge color='blue' radius='full' className='px-3' size='1'>
              TODO1
            </Badge>
            <Flex gap='3' className='' my='3'>
              <FollowButton text='Follow' />
            </Flex>
          </Flex>
          <Flex justify='center' mx='auto' className='text-center' gap='8'>
            <Box>
              <Text size='5' className='font-bold' as='div'>
                TODO2
              </Text>
              <Text size='2' className='font-bold text-gray-400' as='div'>
                Following
              </Text>
            </Box>
            <Box>
              <Text size='5' className='font-bold' as='div'>
                TODO3
              </Text>
              <Text size='2' className='font-bold text-gray-400' as='div'>
                Followers
              </Text>
            </Box>
          </Flex>
          <Flex justify='center' mx='auto' mt='5' mb='4' className='text-center'>
            <Box>
              <Text size='5' className='font-bold' as='div'>
                TODO4
              </Text>
              <Text size='2' className='font-bold text-gray-400' as='div'>
                Leaderboard
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box mt='4' className='space-x-6'>
        <a href={x} target='_blank' rel='noreferrer' className='my-auto'>
          <button type='button' className='bg-white invert rounded-full p-2'>
            <img src='/assets/x.svg' alt='x.com icon' />
          </button>
        </a>
        <a href={github} target='_blank' rel='noreferrer' className='my-auto'>
          <button type='button' className='bg-white invert rounded-full p-2'>
            <img src='/assets/github.svg' alt='github icon' />
          </button>
        </a>
      </Box>
    </Flex>
  )
}
