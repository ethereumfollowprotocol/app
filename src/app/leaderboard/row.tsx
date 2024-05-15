import { Avatar, Badge, Box, Flex, Table, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import type { Address } from 'viem'
import { FollowButton } from '#/components/follow-button'

interface Row {
  address: Address
  rank: number
  name: string
  following: number
  followers: number
  mutuals: number
  blockedMuted: number
  status: 'followed' | 'blocked' | 'muted' | 'none'
}

export function TableRow({
  address,
  rank,
  name,
  following,
  followers,
  mutuals,
  blockedMuted,
  status
}: Row) {
  const rankedAs = rank <= 3 ? 'top-three' : rank <= 10 ? 'top-ten' : 'regular'
  const rankNumber = {
    'top-three': (
      <img
        alt={`${rank}`}
        src={`/assets/leaderboard/${rank}.png`}
        width={38 - (rank > 1 ? rank * 5 : 0)}
        className='mx-auto overflow-hidden select-none -mb-1 pointer-events-none'
      />
    ),
    'top-ten': (
      <Text size='7' as='p' className='font-bold w-min' mx='auto' my='auto'>
        {rank}
      </Text>
    ),
    regular: (
      <Text size='4' as='p' className='font-bold w-min' mx='auto' my='auto'>
        {rank}
      </Text>
    )
  }[rankedAs]

  return (
    <Table.Row align='center' className='h-[75px]'>
      <Table.RowHeaderCell justify='center' className='sm:pr-6 select-none'>
        <Box height='max-content' my='auto' className='tabular-nums text-right'>
          {rankNumber}
        </Box>
      </Table.RowHeaderCell>
      <Table.Cell data-name='name-column'>
        <Link href={`/${name}`}>
          <Flex gap='2' className='-mt-2'>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}`}
              fallback=''
              my='auto'
              size='4'
              radius='full'
            />
            <Flex direction='column' className='text-left' justify='start' align='start'>
              <Text as='p' className='font-bold sm:text-lg text-sm hover:text-pink-400'>
                {name}
              </Text>
              <Badge size='1' radius='full' className='font-bold text-[10px] bg-grey text-darkGrey'>
                Follows you
              </Badge>
            </Flex>
          </Flex>
        </Link>
      </Table.Cell>
      <Table.Cell data-name='following-column'>
        <Box className='text-center'>
          <Text className='font-bold text-sm sm:text-lg'>{following}</Text>
        </Box>
      </Table.Cell>
      <Table.Cell data-name='followers-column'>
        <Box className='text-center'>
          <Text className='font-bold text-sm sm:text-lg'>{followers}</Text>
        </Box>
      </Table.Cell>
      <Table.Cell data-name='mutuals-column'>
        <Box className='text-center'>
          <Text className='font-bold text-sm sm:text-lg'>{mutuals}</Text>
        </Box>
      </Table.Cell>
      <Table.Cell data-name='blocked-muted-column'>
        <Box className='text-center'>
          <Text className='font-bold text-sm sm:text-lg'>{blockedMuted}</Text>
        </Box>
      </Table.Cell>
      <Table.Cell
        className={clsx([rank === 1 ? 'mt-5' : 'mt-2', 'flex lg:ml-6'])}
        data-name='action-column'
      >
        <FollowButton address={address} />
      </Table.Cell>
    </Table.Row>
  )
}
