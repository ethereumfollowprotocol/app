import React from 'react'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { Avatar } from '#/components/avatar'
import LoadingCell from '#/components/loaders/loading-cell'
import Link from 'next/link'
import { truncateAddress } from 'ethereum-identity-kit'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'
import Image from 'next/image'
import DefaultHeader from 'public/assets/art/default-header.svg?url'

const ProfileSummaryCard = () => {
  const { profile, profileIsLoading, stats, statsIsLoading } = useEFPProfile()

  if (!profile && !profileIsLoading) return null

  return (
    <Link
      href={`/profile/${profile?.address}`}
      className='bg-neutral shadow-medium relative flex w-full flex-col items-center gap-4 rounded-sm p-4'
    >
      {profileIsLoading ? (
        <div>
          <LoadingCell className='absolute top-0 left-0 h-full w-full rounded-sm' />
          <div>
            <LoadingCell className='h-24 w-24' />
          </div>
        </div>
      ) : (
        profile && (
          <>
            <Image
              src={profile?.ens?.records?.header || DefaultHeader}
              alt='Profile Summary Card'
              width={100}
              height={100}
              className='absolute top-0 left-0 h-full w-full rounded-sm object-cover opacity-20'
            />
            <div className='group z-10 flex w-full gap-4'>
              <Avatar avatarUrl={profile.ens?.avatar} name={profile.ens?.name || profile.address} size='h-16 w-16' />
              <div className='flex w-full flex-col gap-2'>
                <div className='flex w-full items-center gap-4'>
                  <p className='text-2xl font-bold'>{profile.ens?.name || truncateAddress(profile.address)}</p>
                  <ArrowRight className='h-auto w-5 transition-all group-hover:translate-x-1.5' />
                </div>
                <div className='flex w-full gap-8'>
                  <div className='flex items-center gap-2'>
                    {statsIsLoading ? (
                      <LoadingCell className='h-3 w-5' />
                    ) : (
                      <p className='text-lg font-bold'>{stats?.following_count}</p>
                    )}
                    <p className='text-text-neutral'>Following</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    {statsIsLoading ? (
                      <LoadingCell className='h-3 w-5' />
                    ) : (
                      <p className='text-lg font-bold'>{stats?.followers_count}</p>
                    )}
                    <p className='text-text-neutral'>Followers</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </Link>
  )
}

export default ProfileSummaryCard
