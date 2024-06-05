'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import type { ProfileTabType } from '#/types/common'
import SettingsIcon from 'public/assets/icons/settings.svg'
import fetchProfileDetails from '#/api/fetchProfileDetails'
import fetchProfileFollowers from '#/api/fetchProfileFollowers'
import fetchProfileFollowing from '#/api/fetchProfileFollowing'
import { UserProfileCard } from '#/components/user-profile-card'
import { FETCH_LIMIT_PARAM, PROFILE_TABS } from '#/lib/constants'
import { UserProfilePageTable } from '#/components/profile-page-table'
import type { FollowerResponse, FollowingResponse } from '#/api/requests'
import { useAccount } from 'wagmi'

interface Props {
  params: { user: string }
}

export default function UserPage({ params }: Props) {
  const { user } = params
  const [activeTab, setActiveTab] = useState<ProfileTabType>('following')

  const { address: connectedUserAddress } = useAccount()
  const { t } = useTranslation('profile')

  const { data: profile, isLoading: profileIsLoading } = useQuery({
    queryKey: ['profile', user],
    queryFn: async () => {
      if (!user) return null

      const fetchedProfile = await fetchProfileDetails(user)
      return fetchedProfile
    },
    staleTime: 20000
  })

  const {
    data: fetchedFollowers,
    isLoading: followersIsLoading,
    fetchNextPage: fetchMoreFollowers,
    isFetchingNextPage: isFetchingMoreFollowers
  } = useInfiniteQuery({
    queryKey: ['followers', user],
    queryFn: async ({ pageParam = 0 }) => {
      if (!user)
        return {
          followers: [],
          nextPageParam: pageParam
        }

      const fetchedFollowers = await fetchProfileFollowers({
        addressOrName: user,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })
      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    staleTime: 120000
  })

  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing
  } = useInfiniteQuery({
    queryKey: ['following', user],
    queryFn: async ({ pageParam = 0 }) => {
      if (!user)
        return {
          following: [],
          nextPageParam: pageParam
        }

      const fetchedFollowers = await fetchProfileFollowing({
        addressOrName: user,
        limit: FETCH_LIMIT_PARAM,
        pageParam
      })
      return fetchedFollowers
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    staleTime: 120000
  })

  const followers = fetchedFollowers
    ? fetchedFollowers.pages.reduce(
        (acc, el) => [...acc, ...el.followers],
        [] as FollowerResponse[]
      )
    : []

  const following = fetchedFollowing
    ? fetchedFollowing.pages.reduce(
        (acc, el) => [...acc, ...el.following],
        [] as FollowingResponse[]
      )
    : []

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        isLoading={followingIsLoading}
        following={following}
        followers={followers}
        isFetchingMore={isFetchingMoreFollowing}
        fetchMore={() => fetchMoreFollowing()}
        title='following'
        canEditTags={profile?.address.toLowerCase() === connectedUserAddress?.toLowerCase()}
        customClass='border-t-0 rounded-t-none'
      />
    ),
    followers: (
      <UserProfilePageTable
        isLoading={followersIsLoading}
        following={following}
        followers={followers}
        isFetchingMore={isFetchingMoreFollowers}
        fetchMore={() => fetchMoreFollowers()}
        title='followers'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <main className='flex pb-8 min-h-full w-full justify-between xl:justify-center gap-y-4 flex-col xl:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-32 md:mt-40 lg:mt-48 px-4 lg:px-8'>
      <div className='flex flex-col w-full xl:w-fit items-center gap-4'>
        <UserProfileCard profile={profile} following={following} isLoading={profileIsLoading} />
        <div className='flex flex-col gap-1 items-center'>
          <p className='font-semibold '>{t('block-mute')}</p>
          <div className='flex gap-1 cursor-pointer hover:opacity-80 transition-opacity'>
            <p className='font-semibold '>{t('settings')}</p>
            <Image src={SettingsIcon} alt='List settings' width={18} height={18} />
          </div>
        </div>
      </div>
      <UserProfilePageTable
        isLoading={followingIsLoading}
        following={following}
        followers={followers}
        isFetchingMore={isFetchingMoreFollowing}
        fetchMore={() => fetchMoreFollowing()}
        title='following'
        canEditTags={profile?.address.toLowerCase() === connectedUserAddress?.toLowerCase()}
        customClass='hidden xl:flex'
      />
      <UserProfilePageTable
        isLoading={followersIsLoading}
        following={following}
        followers={followers}
        isFetchingMore={isFetchingMoreFollowers}
        fetchMore={() => fetchMoreFollowers()}
        title='followers'
        customClass='hidden xl:flex'
      />
      <div className=' w-full mt-12 relative xl:hidden'>
        <div className='w-full absolute -top-12 left-0'>
          {PROFILE_TABS.map(option => (
            <button
              key={option}
              onClick={() => setActiveTab(option)}
              className={`w-1/2 capitalize text-lg py-2 font-semibold glass-card border-2 border-gray-200 rounded-t-lg ${
                activeTab === option ? '' : 'bg-black/5'
              }`}
            >
              {t(option)}
            </button>
          ))}
        </div>
        {mobileActiveEl}
      </div>
    </main>
  )
}
