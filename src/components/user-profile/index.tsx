import React from 'react'
import type { StatsResponse } from '#/types/requests'
import type { ProfileDetailsResponse } from '#/types/requests'
import Image from 'next/image'
import DefaultHeader from 'public/assets/art/default-header.svg?url'
import { cn, truncateAddress } from '#/lib/utilities'
import { Avatar } from '../avatar'
import Loading from './components/loading'
import Stats from './components/stats'
import MoreOptions from './components/more-options'
import CommonFollowers from '../user-profile-card/components/common-followers'
import FollowButton from '../follow-button'
import FollowsYou from '../follows-you'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useAccount } from 'wagmi'
import Socials from '../user-profile-card/components/socials'
import Links from '../user-profile-card/components/links'
import Achievements from '../user-profile-card/components/achievements'
import EnsLogo from 'public/assets/icons/socials/ens.svg'
import Link from 'next/link'

interface UserProfileCardProps {
  isMyProfile?: boolean
  profileList?: number | null
  profile?: ProfileDetailsResponse | null
  isLoading: boolean
  isStatsLoading?: boolean
  stats?: StatsResponse | null
  role?: string
  openBlockModal?: () => void
  openListSettingsModal?: () => void
  refetchProfile?: () => void
  refetchStats?: () => void
  openQrCodeModal?: () => void
  className?: string
}

const UserProfile: React.FC<UserProfileCardProps> = ({
  isMyProfile,
  profileList,
  profile,
  isLoading,
  isStatsLoading,
  stats,
  role,
  openBlockModal,
  openQrCodeModal,
  openListSettingsModal,
  refetchProfile,
  className,
}) => {
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()

  return isLoading ? (
    <Loading />
  ) : (
    profile && (
      <div className={cn('relative hidden w-full px-4 pt-12 pb-36 md:block xl:px-8', className)}>
        {role && <p className='absolute top-4 left-8 text-lg font-semibold italic'>{role}</p>}
        <MoreOptions
          address={profile.address}
          primaryList={Number(profile.primary_list)}
          profileList={profileList}
          isConnectedUserCard={Boolean(isMyProfile)}
          openBlockModal={openBlockModal}
          openQrCodeModal={openQrCodeModal}
          openListSettingsModal={openListSettingsModal}
          refetchData={refetchProfile}
        />
        <div className={cn('absolute right-8 bottom-30 flex flex-col items-end gap-3 pb-5', role && 'bottom-6')}>
          {profile.ens?.records?.status && (
            <p className='bg-nav-item shadow-small w-fit rounded-sm px-2 py-1 text-sm font-semibold italic'>
              &quot;{profile.ens.records.status}&quot;
            </p>
          )}
          <Achievements profile={profile} isLoading={isLoading} list={profileList} />
        </div>
        <div className='xs:gap-3 flex w-full items-start gap-2 sm:gap-4'>
          <Avatar
            avatarUrl={profile.ens?.avatar}
            name={profile.ens?.name || profile.address}
            size='lg:h-[125px] h-[100px] lg:w-[125px] w-[100px] my-0'
          />
          <div className='flex w-full flex-col gap-4'>
            <div className='xs:gap-3 flex w-full items-center gap-2 sm:gap-4'>
              <p className='max-w-summary-name truncate text-4xl leading-12 font-bold lg:text-5xl lg:leading-16'>
                {profile.ens?.name || truncateAddress(profile.address)}
              </p>
              {isMyProfile ? (
                <Link href={`https://app.ens.domains/${profile.ens.name}`} target='_blank'>
                  <button className='flex items-center gap-1 rounded-sm bg-[#0080BC] p-1.5 py-2 font-semibold text-white transition-all hover:scale-110 hover:bg-[#07A9F5]'>
                    <EnsLogo className='h-auto w-5' />
                    <p>Edit Profile</p>
                  </button>
                </Link>
              ) : (
                <FollowButton address={profile.address} />
              )}
              {userAddress && (
                <FollowsYou connectedAddress={userAddress} addressOrName={profile.address} list={selectedList} />
              )}
            </div>
            <div className='flex items-center justify-start gap-8 lg:-mt-1 lg:h-10'>
              <Stats
                address={profile.address}
                list={profileList === Number(profile.primary_list) ? undefined : profileList}
                stats={stats}
                isLoading={isStatsLoading}
              />
              <div className='hidden lg:block'>
                <CommonFollowers address={profile.address} />
              </div>
            </div>
            <p className='max-w-2/3 lg:max-w-1/2 lg:text-lg'>
              {profile.ens?.records?.description ? (
                profile.ens.records.description.split(' ').map((word) =>
                  word.includes('@') && word.includes('.') ? (
                    <a
                      key={word}
                      href={`https://efp.app/${word.replace('@', '')}`}
                      className='text-blue-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400'
                    >
                      {word}{' '}
                    </a>
                  ) : (
                    String(word) + ' '
                  )
                )
              ) : (
                <i>No bio set</i>
              )}
            </p>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
              <Socials profile={profile} />
              <Links profile={profile} />
            </div>
            <div className='block pt-1 lg:hidden'>
              <CommonFollowers address={profile.address} />
            </div>
          </div>
        </div>
        <div className='bg-neutral absolute top-0 left-0 -z-10 h-full w-full'>
          <Image
            src={profile?.ens?.records?.header || DefaultHeader}
            alt='Profile Summary Card'
            width={1440}
            height={1440}
            className='h-full w-full object-cover opacity-20'
          />
        </div>
      </div>
    )
  )
}

export default UserProfile
