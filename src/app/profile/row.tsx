import Link from 'next/link'
import * as React from 'react'
import { FollowButton } from '#components/follow-button.tsx'
import { Avatar, Badge, Flex, Table, Text } from '@radix-ui/themes'

export function TableRow({ name }: { name: string }) {
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
