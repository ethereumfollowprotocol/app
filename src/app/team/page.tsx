'use client'

import fetchProfileDetails from '#/api/fetchProfileDetails'
import { UserProfileCard } from '#/components/user-profile-card'
import { useQuery } from '@tanstack/react-query'

const TeamPage = () => {
  const teamAddresses: string[] = process.env.NEXT_PUBLIC_TEAM_ADDRESSES?.split(' ') || []
  const { data: teamProfiles, isLoading: teamIsLoading } = useQuery({
    queryKey: ['team', teamAddresses],
    queryFn: async () => {
      if (!teamAddresses) return []

      const data = await Promise.all(
        teamAddresses?.map(async address => await fetchProfileDetails(address))
      )
      return data
    }
  })

  return (
    <main className='mx-auto flex min-h-full w-full flex-col pt-60 gap-12 items-center overflow-scroll mb-12 px-4 text-center'>
      <h2 className='font-bold text-5xl'>Team</h2>
      <div className='flex-col flex mx-auto lg:flex-row lg:gap-y-0 gap-y-6 space-x-0 md:space-x-12 align-middle justify-center items-center'>
        {teamProfiles?.map(profile => (
          <div key={profile.address}>
            <UserProfileCard
              profile={profile}
              // x={records?.['com.twitter'] ?? ''}
              // github={records?.['com.github'] ?? ''}
            />
          </div>
        ))}
        {teamIsLoading &&
          teamAddresses.map(address => (
            <UserProfileCard
              key={address}
              isLoading={teamIsLoading}
              // x={records?.['com.twitter'] ?? ''}
              // github={records?.['com.github'] ?? ''}
            />
          ))}
      </div>
    </main>
  )
}

export default TeamPage
