import * as React from 'react'
import { TeamCard } from './card.tsx'
import { Flex, Text } from '@radix-ui/themes'
import { getEnsProfile } from '#app/actions.ts'
import { teamAddresses } from '#lib/constants/index.ts'

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
