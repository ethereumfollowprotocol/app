'use client'

import { useTranslation } from 'react-i18next'

import { TEAM_ROLES, TEAM_ADDRESSES, FOUNDATION_ROLES, FOUNDATION_ADDRESSES } from '#/lib/constants/team'
import { useMembers } from '../hooks/use-members'
import LoadingCell from '#/components/loaders/loading-cell'
import UserProfileCard from '#/components/user-profile-card'
import { Suspense } from 'react'
import UserProfile from '#/components/user-profile'

const Members = () => {
  const {
    teamProfiles,
    teamStats,
    foundationProfiles,
    foundationStats,
    teamIsLoading,
    teamStatsIsLoading,
    foundationIsLoading,
    foundationStatsIsLoading,
  } = useMembers()

  const { t } = useTranslation()

  return (
    <>
      <div className='flex flex-col gap-4 pl-4 md:pl-12'>
        <h1 className='text-5xl font-bold'>{t('team')}</h1>
        <p className='w-full max-w-[615px] text-lg'>
          Committed to bringing identity onchain with the Ethereum identity stack, we&apos;re building Ethereum Follow
          Protocol and Ethereum Identity Kit.
        </p>
      </div>
      <div className='flex w-full flex-col gap-16'>
        <div className='flex w-full flex-col items-start justify-center gap-6 md:gap-0'>
          {teamProfiles?.map((profile, i) => (
            <div key={profile?.address} className='flex w-full flex-col items-center gap-2'>
              <p className='text-lg font-bold text-zinc-500 md:hidden dark:text-zinc-200'>{TEAM_ROLES[i]}</p>
              <UserProfileCard
                isResponsive={false}
                profile={profile}
                stats={teamStats?.[i]}
                isStatsLoading={teamStatsIsLoading}
                profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                showMoreOptions={true}
                className='md:hidden'
                // x={records?.['com.twitter'] ?? ''}
                // github={records?.['com.github'] ?? ''}
              />
              <UserProfile
                isMyProfile={false}
                role={TEAM_ROLES[i]}
                profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                stats={teamStats?.[i]}
                profile={profile}
                refetchProfile={() => {}}
                isLoading={teamIsLoading}
                isStatsLoading={teamStatsIsLoading}
                className='hidden pt-14 pb-12 md:flex'
              />
            </div>
          ))}
          {teamIsLoading &&
            TEAM_ADDRESSES.map((address) => (
              <div key={address} className='flex flex-col items-center gap-2'>
                <LoadingCell className='h-7 w-52 rounded-sm' />
                <Suspense>
                  <UserProfileCard
                    isResponsive={false}
                    isLoading={teamIsLoading}
                    // x={records?.['com.twitter'] ?? ''}
                    // github={records?.['com.github'] ?? ''}
                  />
                </Suspense>
              </div>
            ))}
        </div>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-4 pl-4 md:pl-12'>
            <h2 className='text-2xl font-bold sm:text-4xl'>Follow Protocol Foundation</h2>
            <p className='w-full max-w-[615px] sm:text-lg'>
              Committed to bringing identity onchain with the Ethereum identity stack, we&apos;re building Ethereum
              Follow Protocol and Ethereum Identity Kit.
            </p>
          </div>
          <div className='flex w-full flex-col items-start justify-center gap-6 align-middle md:gap-0'>
            {foundationProfiles?.map((profile, i) => (
              <div key={profile?.address} className='flex w-full flex-col items-center gap-2'>
                <p className='text-lg font-bold text-zinc-500 md:hidden dark:text-zinc-200'>{FOUNDATION_ROLES[i]}</p>
                <UserProfileCard
                  isResponsive={false}
                  profile={profile}
                  stats={foundationStats?.[i]}
                  isStatsLoading={foundationStatsIsLoading}
                  profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                  showMoreOptions={true}
                  className='md:hidden'
                  // x={records?.['com.twitter'] ?? ''}
                  // github={records?.['com.github'] ?? ''}
                />
                <UserProfile
                  isMyProfile={false}
                  role={FOUNDATION_ROLES[i]}
                  profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                  stats={foundationStats?.[i]}
                  profile={profile}
                  refetchProfile={() => {}}
                  isLoading={foundationIsLoading}
                  isStatsLoading={foundationStatsIsLoading}
                  className='hidden pt-14 pb-12 md:flex'
                />
              </div>
            ))}
            {foundationIsLoading &&
              FOUNDATION_ADDRESSES.map((address) => (
                <div key={address} className='flex flex-col items-center gap-2'>
                  <LoadingCell className='h-7 w-52 rounded-sm' />
                  <Suspense>
                    <UserProfileCard
                      isResponsive={false}
                      isLoading={foundationIsLoading}
                      // x={records?.['com.twitter'] ?? ''}
                      // github={records?.['com.github'] ?? ''}
                    />
                  </Suspense>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Members
