'use client'

import { useQuery } from '@tanstack/react-query'
import fetchProfileDetails from '#/api/fetchProfileDetails'
import UserProfileCard from '#/components/user-profile-card'

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
  const teamRoles = process.env.NEXT_PUBLIC_TEAM_ROLES?.split(',').map(role =>
    role.replace(',', '')
  )

  return (
    <main className='mx-auto flex min-h-full w-full flex-col pt-60 gap-12 items-center overflow-scroll mb-12 px-4 text-center'>
      <h2 className='font-bold text-5xl'>Team</h2>
      <div className='flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-center'>
        {teamProfiles?.map((profile, i) => (
          <div key={profile?.address} className='flex flex-col items-center gap-2'>
            {teamRoles && <p className='font-semibold text-xl italic'>{teamRoles[i]}</p>}
            <UserProfileCard
              isResponsive={false}
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
              isResponsive={false}
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
