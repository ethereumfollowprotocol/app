'use client'

import { TeamCard } from './card.tsx'
import { getEnsProfile } from '#/app/actions.ts'
import { teamAddresses } from '#/lib/constants/index.ts'
import { useQuery } from '@tanstack/react-query'

export default function TeamPage() {
  const { data: efpTeam } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const data = await Promise.all(teamAddresses.map(getEnsProfile))
      return data
    }
  })

  return (
    <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <h2 className='font-bold text-5xl mb-5'>Team</h2>
      <div className='flex-col flex mx-auto lg:flex-row lg:gap-y-0 gap-y-6 space-x-0 md:space-x-12 align-middle justify-center items-center'>
        {efpTeam?.map(({ name, address, records, avatar }) => (
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
      </div>
    </main>
  )
}
