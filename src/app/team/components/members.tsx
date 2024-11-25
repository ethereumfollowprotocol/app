'use client'

import { useTranslation } from 'react-i18next'

import {
  TEAM_ROLES,
  TEAM_ADDRESSES,
  FOUNDATION_ROLES,
  FOUNDATION_ADDRESSES
} from '#/lib/constants/team'
import { useMembers } from '../hooks/use-members'
import LoadingCell from '#/components/loaders/loading-cell'
import UserProfileCard from '#/components/user-profile-card'

const Members = () => {
  const {
    teamProfiles,
    teamStats,
    foundationProfiles,
    foundationStats,
    teamIsLoading,
    teamStatsIsLoading,
    foundationIsLoading,
    foundationStatsIsLoading
  } = useMembers()

  const { t } = useTranslation()

  return (
    <>
      <h2 className='font-bold text-4xl'>{t('team')}</h2>
      <div className='flex flex-col w-full gap-16'>
        <div className='flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-start'>
          {teamProfiles?.map((profile, i) => (
            <div key={profile?.address} className='flex flex-col items-center gap-2'>
              <p className='text-lg font-bold text-zinc-500 dark:text-zinc-200'>{TEAM_ROLES[i]}</p>
              <UserProfileCard
                isResponsive={false}
                profile={profile}
                stats={teamStats?.[i]}
                isStatsLoading={teamStatsIsLoading}
                profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                showMoreOptions={true}
                // x={records?.['com.twitter'] ?? ''}
                // github={records?.['com.github'] ?? ''}
              />
            </div>
          ))}
          {teamIsLoading &&
            TEAM_ADDRESSES.map(address => (
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
                <p className='text-lg font-bold text-zinc-500 dark:text-zinc-200'>
                  {FOUNDATION_ROLES[i]}
                </p>
                <UserProfileCard
                  isResponsive={false}
                  profile={profile}
                  stats={foundationStats?.[i]}
                  isStatsLoading={foundationStatsIsLoading}
                  profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                  showMoreOptions={true}
                  // x={records?.['com.twitter'] ?? ''}
                  // github={records?.['com.github'] ?? ''}
                />
              </div>
            ))}
            {foundationIsLoading &&
              FOUNDATION_ADDRESSES.map(address => (
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
