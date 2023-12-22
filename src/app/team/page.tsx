import * as React from 'react'
import { getEnsProfile } from '#app/actions.ts'
import { teamAddresses } from '#lib/constants/index.ts'
import { FollowButton } from '#components/follow-button.tsx'
import { Avatar, Badge, Box, Flex, Text } from '@radix-ui/themes'

interface TeamMember {
  ens: string
  address: string
  x: string
  github: string
  avatar: string
}

export default async function TeamPage() {
  const efpTeam = await Promise.all(teamAddresses.map(getEnsProfile))

  return (
    <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <Text size='7' className='font-bold' mb='5'>
        Team
      </Text>
      <Flex
        mx='auto'
        className='flex-col lg:flex-row lg:gap-y-0 gap-y-6 space-x-0 md:space-x-12 align-middle justify-center items-center'
      >
        {efpTeam.map(({ name, address, records, avatar }) => (
          <div key={address}>
            <TeamCard
              ens={name}
              address={address}
              avatar={avatar}
              x={records['com.twitter'] ?? ''}
              github={records['com.github'] ?? ''}
            />
          </div>
        ))}
      </Flex>
    </main>
  )
}

function TeamCard(props: TeamMember) {
  const { ens, address, avatar, x, github } = props
  return (
    <Flex direction='column'>
      <Flex mx='auto' className='bg-white/70 border-0 max-w-80 w-[295px] min-w-60 rounded-xl p-3'>
        <Flex direction='column' align='start' width='100%' height='100%' justify='center'>
          <Badge>#132</Badge>
          <Flex direction='column' justify='center' align='center' mx='auto' mt='3'>
            <Avatar src={avatar} radius='full' size='7' fallback='' />
            <Text size='5' className='font-bold' my='2'>
              {ens}
            </Text>
            <Badge color='blue' radius='full' className='px-3' size='1'>
              Follows you
            </Badge>
            <Flex gap='3' className='' my='3'>
              <FollowButton text='Follow' />
            </Flex>
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
      <Box mt='4' className='space-x-6'>
        <a href={x} target='_blank' rel='noreferrer' className='my-auto'>
          <button type='button' className='bg-white invert rounded-full p-2'>
            <img className='' src='/assets/x.svg' alt='x.com icon' />
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
