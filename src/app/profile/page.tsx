'use client'

import clsx from 'clsx'
import * as React from 'react'
import { useAccount } from 'wagmi'
import { ProfileCard } from '#components/profile.tsx'
import { useEnsProfile } from '#hooks/use-ens-profile.ts'
import { FollowButton } from '#components/follow-button.tsx'
import {
  Avatar,
  Badge,
  Box,
  DropdownMenu,
  Flex,
  Grid,
  IconButton,
  Select,
  Table,
  Text
} from '@radix-ui/themes'
import Link from 'next/link'
import { DropdownMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

const profiles = [
  {
    rank: 1,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 2,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 3,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 4,
    name: 'dcj.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 5,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 6,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 7,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 8,
    name: 'dcj.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 9,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 10,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 11,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 12,
    name: 'dcj.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 13,
    name: 'dr3a.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 14,
    name: 'anon.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 15,
    name: 'dragonite.eth',
    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  },
  {
    rank: 16,
    name: 'dcj.eth',

    following: '12.4k',
    followers: '495',
    mutuals: '495',
    blockedMuted: '495'
  }
]

export default function ProfilePage() {
  const account = useAccount()

  // const { data } = useEnsProfile(account?.address ?? '')

  // if (!account.isConnected) {
  //   return (
  //     <Text size='6' as='p' mx='auto' align='center' mt='9' weight='bold'>
  //       Connect your wallet to see your EFP profile
  //     </Text>
  //   )
  // }

  return (
    <main className='mx-auto flex min-h-full h-full w-full flex-col items-center text-center p-4'>
      <Flex
        width='100%'
        height='100%'
        justify='center'
        gap='3'
        mx='auto'
        className='lg:flex-row justify-center flex-col min-h-full lg:max-w-[1400px] max-w-2xl  border-kournikova-50'
      >
        <Box height='100%' width='min-content' p='2' mx='auto' className=' border-green-300'>
          <ProfileCard
            profile={{
              name: 'esm.eth',
              avatar: 'https://euc.li/esm.eth',
              address: '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83'
            }}
          />
        </Box>
        <Box height='100%' width='100%' p='2' mx='auto' className=' border-green-300'>
          <Flex mb='2' justify='between'>
            <Box className='space-x-2'>
              <Text my='auto' weight='bold'>
                Following
              </Text>
              <IconButton variant='solid' radius='full' size='2' className='bg-white'>
                <MagnifyingGlassIcon fontSize='16px' color='gray' />
              </IconButton>
            </Box>
            <Box>
              <Select.Root
                defaultValue={'follower-count'}
                value={'follower-count'}
                onValueChange={newValue => console.log(newValue)}
              >
                <Select.Trigger
                  variant='soft'
                  className='rounded-lg bg-white/70 p-4 font-semibold !border-none text-sm ml-2'
                />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value='follower-count'>Follower Count</Select.Item>
                    <Select.Item value='latest-first'>Latest first</Select.Item>
                    <Select.Item value='earliest-first'>Earliest first</Select.Item>
                    <Select.Item value='alphabetical'>Alphabetical</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
          <Table.Root size='2' variant='ghost' className='bg-white/50 rounded-xl py-4'>
            <Table.Header hidden>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Text as='p' className='sm:ml-6'>
                    Action
                  </Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {profiles.map((entry, index) => (
                <TableRow key={`${entry.name}-${index}`} name={entry.name} />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Box height='100%' width='100%' p='2' mx='auto' className=' border-green-300'>
          <Flex mb='2' justify='between'>
            <Box className='space-x-2'>
              <Text my='auto' weight='bold'>
                Followers
              </Text>
              <IconButton variant='solid' radius='full' size='2' className='bg-white'>
                <MagnifyingGlassIcon fontSize='16px' color='gray' />
              </IconButton>
            </Box>
            <Box>
              <Select.Root
                defaultValue={'follower-count'}
                value={'follower-count'}
                onValueChange={newValue => console.log(newValue)}
              >
                <Select.Trigger
                  variant='soft'
                  className='rounded-lg bg-white/70 p-4 font-semibold !border-none text-sm ml-2'
                />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value='follower-count'>Follower Count</Select.Item>
                    <Select.Item value='latest-first'>Latest first</Select.Item>
                    <Select.Item value='earliest-first'>Earliest first</Select.Item>
                    <Select.Item value='alphabetical'>Alphabetical</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
          <Table.Root size='2' variant='ghost' className='bg-white/50 rounded-xl py-4'>
            <Table.Header hidden>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Text as='p' className='sm:ml-6'>
                    Action
                  </Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {profiles.map((entry, index) => (
                <TableRow key={`${entry.name}-${index}`} name={entry.name} />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </main>
  )
}

function TableRow({ name }: { name: string }) {
  return (
    <Table.Row align='center' className='w-full'>
      <Table.Cell width='100%' pl='4' data-name='name-column'>
        <Link href={`/${name}`}>
          <Flex gap='2' className=''>
            <Avatar
              src={`https://metadata.ens.domains/mainnet/avatar/${name}`}
              fallback=''
              my='auto'
              size='4'
              radius='full'
            />
            <Flex direction='column' className='text-left' justify='start' align='start'>
              <Text as='p' className='font-bold sm:text-lg text-sm hover:text-pink-400'>
                {name}
              </Text>
              <Badge
                size='1'
                radius='full'
                className='font-bold text-[10px] bg-[#CDCDCD] text-[#333333]'
              >
                Follows you
              </Badge>
            </Flex>
          </Flex>
        </Link>
      </Table.Cell>

      <Table.Cell pr='4' data-name='action-column'>
        <FollowButton text='Unfollow' pending />
      </Table.Cell>
    </Table.Row>
  )
}
