import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { ens_beautify } from '@adraffy/ens-normalize'
import { truncateAddress, isLinkValid } from '@encrypteddegen/identity-kit'

import { Avatar } from '#/components/avatar'
import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'
import DefaultHeader from 'public/assets/art/default-header.svg?url'

const ProfileSummaryCard = () => {
  const { t } = useTranslation()
  const { profile, profileIsLoading, stats, statsIsLoading, lists, selectedList } = useEFPProfile()

  if (!profile && !profileIsLoading) return null

  const profileUrl =
    selectedList === Number(lists?.primary_list)
      ? profile?.address?.toLowerCase()
      : (selectedList?.toString() ?? profile?.address?.toLowerCase())

  return (
    <Link
      href={`/${profileUrl}`}
      className='bg-neutral shadow-medium relative flex w-full flex-col items-center gap-4 rounded-sm p-3 sm:p-4'
    >
      {profileIsLoading ? (
        <>
          <LoadingCell className='absolute top-0 left-0 h-full w-full rounded-sm' />
          <div className='group xs:gap-3 z-10 flex w-full gap-2 sm:gap-4'>
            <LoadingCell className='h-14 w-14 rounded-full sm:h-16 sm:w-16' />
            <div className='flex flex-col gap-1.5 sm:gap-2'>
              <div className='xs:gap-3 flex w-full items-center gap-2 sm:gap-4'>
                <LoadingCell className='h-7 w-48 rounded-sm' />
                <ArrowRight className='h-auto w-5 transition-all group-hover:translate-x-1.5' />
              </div>
              <div className='xs:gap-6 flex w-full gap-4 sm:gap-8'>
                <div className='flex items-center gap-2'>
                  <LoadingCell className='h-5 w-8 rounded-sm sm:h-6 sm:w-10' />

                  <p className='text-text-neutral'>Following</p>
                </div>
                <div className='flex items-center gap-2'>
                  <LoadingCell className='h-5 w-8 rounded-sm sm:h-6 sm:w-10' />
                  <p className='text-text-neutral'>Followers</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        profile?.address && (
          <>
            <Image
              src={isLinkValid(profile?.ens?.records?.header) ? profile?.ens?.records?.header : DefaultHeader}
              alt='Profile Summary Card'
              width={400}
              height={400}
              className='absolute top-0 left-0 h-full w-full rounded-sm object-cover opacity-20'
            />
            <div className='group xs:gap-3 z-10 flex w-full gap-2 sm:gap-4'>
              <Avatar
                avatarUrl={profile.ens?.avatar}
                name={profile.ens?.name || profile.address}
                size='sm:h-16 h-14 sm:w-16 w-14'
              />
              <div className='flex w-full flex-col gap-1 sm:gap-1.5'>
                <div className='xs:gap-3 flex w-full items-center gap-2 sm:gap-4'>
                  <p className='max-w-summary-name truncate text-xl font-bold sm:text-2xl'>
                    {profile.ens?.name ? ens_beautify(profile.ens?.name) : truncateAddress(profile.address)}
                  </p>
                  <ArrowRight className='h-auto w-5 transition-all group-hover:translate-x-1.5' />
                </div>
                <div className='xs:gap-6 flex w-full gap-4 sm:gap-8'>
                  <div className='flex items-center gap-2'>
                    {statsIsLoading ? (
                      <LoadingCell className='h-3 w-5' />
                    ) : (
                      <p className='text-lg font-bold'>{formatNumber(stats?.following_count || 0)}</p>
                    )}
                    <p className='text-text-neutral'>{t('following')}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    {statsIsLoading ? (
                      <LoadingCell className='h-3 w-5' />
                    ) : (
                      <p className='text-lg font-bold'>{formatNumber(stats?.followers_count || 0)}</p>
                    )}
                    <p className='text-text-neutral'>{t('followers')}</p>
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
