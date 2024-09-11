'use client'

import { useQuery } from '@tanstack/react-query'

import LoadingCell from '#/components/loaders/loading-cell'
import UserProfileCard from '#/components/user-profile-card'
import { fetchProfileDetails } from '#/api/fetchProfileDetails'
import { useTranslation } from 'react-i18next'

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

  const foundationAddresses: string[] =
    process.env.NEXT_PUBLIC_FOUNDATION_ADDRESSES?.split(' ') || []
  const { data: foundationProfiles, isLoading: foundationIsLoading } = useQuery({
    queryKey: ['follow protocol foundation', foundationAddresses],
    queryFn: async () => {
      if (!foundationAddresses) return []

      const data = await Promise.all(
        foundationAddresses?.map(async address => await fetchProfileDetails(address))
      )
      return data
    }
  })
  const foundationRoles = process.env.NEXT_PUBLIC_FOUNDATION_ROLES?.split(';').map(role =>
    role.replace(';', '')
  )

  const { t } = useTranslation()

  return (
    <>
      <h2 className='font-bold text-5xl'>{t('team')}</h2>
      <div className='flex flex-col w-full gap-16'>
        <div className='flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-start'>
          {teamProfiles?.map((profile, i) => (
            <div key={profile?.address} className='flex flex-col items-center gap-2'>
              {teamRoles && (
                <p className='text-lg font-bold text-zinc-500 dark:text-zinc-200'>{teamRoles[i]}</p>
              )}
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
        <div className='flex flex-col gap-10'>
          <h2 className='text-4xl font-bold'>Follow Protocol Foundation</h2>
          <div className='flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-start'>
            {foundationProfiles?.map((profile, i) => (
              <div key={profile?.address} className='flex flex-col items-center gap-2'>
                {foundationRoles && (
                  <p className='text-lg font-bold text-zinc-500 dark:text-zinc-200'>
                    {foundationRoles[i]}
                  </p>
                )}
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
            {foundationIsLoading &&
              foundationAddresses.map(address => (
                <div key={address} className='flex flex-col items-center gap-2'>
                  <LoadingCell className='rounded-lg h-7 w-52' />
                  <UserProfileCard
                    isResponsive={false}
                    isLoading={foundationIsLoading}
                    // x={records?.['com.twitter'] ?? ''}
                    // github={records?.['com.github'] ?? ''}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Members
