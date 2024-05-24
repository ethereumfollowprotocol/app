'use client'

import Image from 'next/image'
import { useState } from 'react'
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'
import { fetchUserStats, fetchUserFollowers, fetchUserFollowing } from '#/api/requests'
import { getEnsProfile } from '#/app/actions.ts'
import { formatAddressOrName } from '#/lib/utilities'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/profile-page-table'
import type { ProfileTabType } from '#/types/common'
import { PROFILE_TABS } from '#/lib/constants'
import SettingsIcon from '/public/assets/icons/settings.svg'

interface Props {
  params: { user: string }
}

export default function UserPage({ params }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')

  const { data: ensProfile } = useQuery({
    queryKey: ['user', params.user],
    queryFn: async () => getEnsProfile(formatAddressOrName(params.user))
  })

  // const searchParams: any = {}
  // const followingQuery = searchParams['following-query'] || ''
  // const followingFilter = searchParams['following-filter'] || 'follower count'

  // const followersQuery = searchParams['followers-query'] || ''
  // const followersFilter = searchParams['followers-filter'] || 'follower count'

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['followers', ensProfile?.address],
    queryFn: () => fetchUserFollowers(ensProfile?.address)
    // staleTime: 12000000
  })
  queryClient.prefetchQuery({
    queryKey: ['following', ensProfile?.address],
    queryFn: () => fetchUserFollowing(ensProfile?.address)
    // staleTime: 12000000
  })

  const { data: stats } = useQuery({
    queryKey: ['profile', 'stats', ensProfile?.address],
    queryFn: () => fetchUserStats(ensProfile?.address)
    // staleTime: 12000000
  })

  if (!ensProfile?.address) return null

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        addressOrName={ensProfile.address}
        title='following'
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        addressOrName={ensProfile.address}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <main className='flex min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-32 md:mt-40 lg:mt-48 px-4 lg:px-8'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex flex-col w-full xl:w-fit items-center gap-4'>
          <UserProfileCard profile={ensProfile} stats={stats?.stats} />
          <div className='flex flex-col gap-1 items-center'>
            <p className='font-semibold '>Block/Mute Lists</p>
            <div className='flex gap-1 cursor-pointer hover:opacity-80 transition-opacity'>
              <p className='font-semibold '>List Settings</p>
              <Image src={SettingsIcon} alt='List settings' width={18} height={18} />
            </div>
          </div>
        </div>
        <UserProfilePageTable
          addressOrName={ensProfile.address}
          title='following'
          customClass='hidden md:flex'
        />
        <UserProfilePageTable
          addressOrName={ensProfile.address}
          title='followers'
          customClass='hidden md:flex'
        />
        <div className=' w-full mt-12 relative md:hidden'>
          <div className='w-full absolute -top-12 left-0'>
            {PROFILE_TABS.map(option => (
              <button
                key={option}
                onClick={() => setActiveTab(option)}
                className={`w-1/2 capitalize text-lg py-2 font-semibold glass-card border-2 border-gray-200 rounded-t-lg ${
                  activeTab === option ? '' : 'bg-black/5'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {mobileActiveEl}
        </div>
      </HydrationBoundary>
    </main>
  )
}
