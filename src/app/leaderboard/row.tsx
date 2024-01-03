import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { FollowButton } from '#/components/follow-button.tsx'
import { Box, Text, Flex, Table, Badge, Avatar } from '@radix-ui/themes'

interface Row {
  rank: number
  name: string
  following: number
  followers: number
  mutuals: number
  blockedMuted: number
}

export function TableRow({ rank, name, following, followers, mutuals, blockedMuted }: Row) {
  const rowNumber = (
    <React.Fragment>
      {rank === 1 ? (
        <img
          alt='1'
          src='/assets/leaderboard/1.png'
          width='40'
          className='mx-auto overflow-hidden select-none -mb-1'
        />
      ) : rank === 2 ? (
        <img alt='2' src='/assets/leaderboard/2.png' width='28' className='mx-auto select-none' />
      ) : rank === 3 ? (
        <img alt='3' src='/assets/leaderboard/3.png' width='23' className='mx-auto select-none' />
      ) : rank <= 10 ? (
        <Text size='7' as='p' className='font-bold w-min' mx='auto' my='auto'>
          {rank}
        </Text>
      ) : (
        <Text size='4' as='p' className='font-bold w-min' mx='auto' my='auto'>
          {rank}
        </Text>
      )}
    </React.Fragment>
  )

  return (
    <Table.Row align='center'>
      <Table.RowHeaderCell justify='center' className='pt-1 sm:pr-6 select-none'>
        <Box height='max-content' my='auto' className='tabular-nums text-right'>
          {rowNumber}
        </Box>
      </Table.RowHeaderCell>
      <Table.Cell data-name='name-column'>
        <Link href={`/${name}`}>
          <Flex gap='2' className='-mt-2'>
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
        <FollowButton text='Follow' pending />
      </Table.Cell>
    </Table.Row>
  )
}
