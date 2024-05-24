'use client'

import Image from 'next/image'
import { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'

import {
  // fetchUserStats,
  fetchUserFollowers,
  fetchUserFollowing
  // type StatsResponse
} from '#/api/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { UserProfileCard } from '#/components/user-profile-card'
import { UserProfilePageTable } from '#/components/profile-page-table'

import { PROFILE_TABS } from '#/lib/constants'
import type { ProfileTabType } from '#/types/common'
import SettingsIcon from 'public/assets/icons/settings.svg'

interface Props {
  searchParams: {
    'following-query'?: string
    'following-filter'?: string
    'followers-query'?: string
    'followers-filter'?: string
  }
}

export default function ProfilePage({ searchParams }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')
  const { profile } = useEFPProfile()

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['followers', profile?.address],
    queryFn: () => fetchUserFollowers(profile?.address)
    // staleTime: 1200000
  })
  queryClient.prefetchQuery({
    queryKey: ['following', profile?.address],
    queryFn: () => fetchUserFollowing(profile?.address)
    // staleTime: 1200000
  })

  if (!profile?.address) return null

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        addressOrName={profile?.address}
        title='following'
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        addressOrName={profile?.address}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <main className='flex min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-32 md:mt-40 lg:mt-48 px-4 lg:px-8'>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <div className='flex flex-col w-full xl:w-fit items-center gap-4'>
        <UserProfileCard profile={profile.ens} stats={profile.stats} />
        <div className='flex flex-col gap-1 items-center'>
          <p className='font-semibold '>Block/Mute Lists</p>
          <div className='flex gap-1 cursor-pointer hover:opacity-80 transition-opacity'>
            <p className='font-semibold '>List Settings</p>
            <Image src={SettingsIcon} alt='List settings' width={18} height={18} />
          </div>
        </div>
      </div>
      <UserProfilePageTable
        addressOrName={profile?.address}
        title='following'
        customClass='hidden md:flex'
      />
      <UserProfilePageTable
        addressOrName={profile?.address}
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
      {/* </HydrationBoundary> */}
    </main>
  )
}
