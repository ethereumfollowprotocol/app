import * as React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { FollowButton } from 'src/components/follow-button.tsx'
import { Avatar, Badge, Box, Flex, IconButton, Text } from '@radix-ui/themes'

const efpTeam = [
  {
    ens: 'brantly.eth',
    address: '0x983110309620D911731Ac0932219af06091b6744',
    x: 'https://x.com/BrantlyMillegan',
    github: 'https://github.com/BrantlyMillegan',
    efp: ''
  },
  {
    ens: 'cory.eth',
    address: '0xBdB41BfF7E828E2DC2d15EB67257455db818F1DC',
    x: 'https://x.com/cory_eth',
    github: 'https://github.com/stoooops',
    efp: ''
  },
  {
    ens: 'esm.eth',
    address: '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83',
    x: 'https://x.com/awkroot',
    github: 'https://github.com/o-az',
    efp: ''
  }
] satisfies Array<TeamMember>

interface TeamMember {
  ens: string
  address: string
  x: string
  github: string
  efp: string
}

export default async function TeamPage() {
  return (
    <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <Text size='7' className='font-bold' mb='5'>
        Team
      </Text>
      <Flex
        mx='auto'
        className='flex-col lg:flex-row lg:gap-y-0 gap-y-6 space-x-0 md:space-x-12 align-middle justify-center items-center'
      >
        {efpTeam.map(({ ens, address, efp, x, github }) => (
          <div key={ens}>
            <TeamCard ens={ens} address={address} github={github} x={x} efp={efp} />
          </div>
        ))}
      </Flex>
    </main>
  )
}

function TeamCard(props: TeamMember) {
  const { ens, address, efp, x, github } = props
  return (
    <Flex direction='column'>
      <Flex mx='auto' className='bg-white/70 border-0 max-w-80 w-[295px] min-w-60 rounded-xl p-3'>
        <Flex direction='column' align='start' width='100%' height='100%' justify='center'>
          <Badge>#132</Badge>
          <Flex direction='column' justify='center' align='center' mx='auto' mt='3'>
            <Avatar
              src={`https://metadata.ens.domains/mainnet/avatar/${ens}`}
              radius='full'
              size='7'
              fallback=''
            />
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
