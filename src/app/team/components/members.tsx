'use client'

import { useQuery } from '@tanstack/react-query'

import LoadingCell from '#/components/loaders/loading-cell'
import UserProfileCard from '#/components/user-profile-card'
import { fetchProfileDetails } from '#/api/fetchProfileDetails'

const Members = () => {
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
  const teamRoles = process.env.NEXT_PUBLIC_TEAM_ROLES?.split(';').map(role =>
    role.replace(';', '')
  )

  return (
    <div className='flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-center'>
      {teamProfiles?.map((profile, i) => (
        <div key={profile?.address} className='flex flex-col items-center gap-2'>
          {teamRoles && <p className='text-lg font-bold text-zinc-500'>{teamRoles[i]}</p>}
          <UserProfileCard
            isResponsive={false}
            profile={profile}
            profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
            showMoreOptions={true}
            // x={records?.['com.twitter'] ?? ''}
            // github={records?.['com.github'] ?? ''}
          />
        </div>
      ))}
      {teamIsLoading &&
        teamAddresses.map(address => (
          <div key={address} className='flex flex-col items-center gap-2'>
            <LoadingCell className='rounded-lg h-7 w-52' />
            <UserProfileCard
              isResponsive={false}
              isLoading={teamIsLoading}
              // x={records?.['com.twitter'] ?? ''}
              // github={records?.['com.github'] ?? ''}
            />
          </div>
        ))}
    </div>
  )
}

export default Members
